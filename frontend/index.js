import React, {useState} from 'react';
import {cursor} from '@airtable/blocks';
import {ViewType} from '@airtable/blocks/models';
import {
    initializeBlock,
    useBase,
    useRecords,
    useRecordById,
    useLoadable,
    useWatchable,
    Box,
    Text,
    TextButton,
    Dialog,
    Link,
    Heading,
} from '@airtable/blocks/ui';

var getPreviewUrlForRecord = require("./getPreviewUrlForRecord.js")
var getPreviewUrlForTable = require("./getPreviewUrlForTable.js")


const log = console.log

function UrlPreviewBlock() {

    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [selectedFieldId, setSelectedFieldId] = useState(null);

    const base = useBase();
    const USER = base.getTableByName('user');

    let Pubkey = USER.getFieldByName('pubkey');
    const records = useRecords(USER, {fields: [Pubkey]});
    log(records)
    let data = records.map(record => ({
      pubkey: record.getCellValueAsString(Pubkey),
    }));

    useLoadable(cursor);

    useWatchable(cursor, ['selectedRecordIds', 'selectedFieldIds'], () => {

        if (cursor.selectedRecordIds.length > 0) {
            // There might be multiple selected records. We'll use the first
            // one.
            setSelectedRecordId(cursor.selectedRecordIds[0]);
        }
        if (cursor.selectedFieldIds.length > 0) {
            // There might be multiple selected fields. We'll use the first
            // one.
            setSelectedFieldId(cursor.selectedFieldIds[0]);
        }
    });


    useWatchable(cursor, ['activeTableId', 'activeViewId'], () => {
        setSelectedRecordId(null);
        setSelectedFieldId(null);
    });

    const table = base.getTableByIdIfExists(cursor.activeTableId);

    // table is briefly null when switching to a newly created table.
    if (!table) {
        return null;
    }

    return (
        <RecordPreview
            base={base}
            table={table}
            pubkey={data[0].pubkey}
            selectedRecordId={selectedRecordId}
            selectedFieldId={selectedFieldId}
        />
    );
}

// Shows a preview, or a message about what the user should do to see a preview.
function RecordPreview({base,table,pubkey,selectedRecordId, selectedFieldId}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // We use getFieldByIdIfExists because the field might be deleted.
    const selectedField = selectedFieldId ? table.getFieldByIdIfExists(selectedFieldId) : null;


    const selectedRecord = useRecordById(table, selectedRecordId ? selectedRecordId : '', {
        fields: [selectedField],
    });


    useWatchable(cursor, ['activeTableId', 'activeViewId']);

    // This button is re-used in two states so it's pulled out in a constant here.

    const getHelp = (
        <TextButton size="small" marginTop={3} onClick={() => setIsDialogOpen(true)}>
        <Link
            href="https://docs.flow.black/"
            target="_blank"
        >
            Need help?
        </Link>
        </TextButton>
    );

    let content;
    if (
        cursor.activeViewId === null || // activeViewId is briefly null when switching views
        table.getViewById(cursor.activeViewId).type !== ViewType.GRID
    ) {
        content = (
            <Container>
                <Text>Switch to a table to see Stats</Text>
            </Container>
        );
    } else if (
        ( selectedRecord === null ||
        selectedField === null ) && (
        table.name == 'campaign' ||
        table.name == 'account' ||
        table.name == 'lander' ||
        table.name == 'source' ||
        table.name == 'domain' ||
        table.name == 'lander' ||
        table.name == 'flow' ||
        table.name == 'offer' )
    ) {

      const previewUrl = getPreviewUrlForTable(base,table,pubkey);

        content = (
            <Container>
            <iframe
                key={previewUrl}
                style={{flex: 'auto', width: '100%'}}
                src={previewUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
            </Container>
          );

    } else if (
        // selectedRecord will be null on block initialization, after
        // the user switches table or view, or if it was deleted.
        selectedRecord === null ||
        // The selected field may have been deleted.
        selectedField === null
    ) {
        content = (
            <Container>
                <Text>Select</Text>
                {getHelp}
            </Container>
        );
    } else {
        // Using getCellValueAsString guarantees we get a string back.  If
        // we use getCellValue, we might get back numbers, booleans, or
        // arrays depending on the field type.
        const previewUrl = getPreviewUrlForRecord(pubkey,table,selectedRecord, selectedField);


        // In this case, the FIELD_NAME field of the currently selected
        // record either contains no URL, or contains a URL that cannot be
        // resolved to a supported preview.
        if (!previewUrl) {
            content = (
                <Container>
                  <Text>Select {table.name} column</Text>
                    {getHelp}
                </Container>
            );
        } else {
            content = (
                <Container>
                    <iframe

                        key={previewUrl}
                        style={{flex: 'auto', width: '100%'}}
                        src={previewUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </Container>
            );
        }
    }

    return (
        <React.Fragment>
            {content}

        </React.Fragment>
    );
}

// Container element which takes up the full viewport and centers its children.
function Container({children}) {
    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            {children}
        </Box>
    );
}





initializeBlock(() => <UrlPreviewBlock />);
