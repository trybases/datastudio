"use strict";

var _react = _interopRequireWildcard(require("react"));

var _blocks = require("@airtable/blocks");

var _models = require("@airtable/blocks/models");

var _ui = require("@airtable/blocks/ui");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getPreviewUrlForRecord = require("./getPreviewUrlForRecord.js");

var getPreviewUrlForTable = require("./getPreviewUrlForTable.js");

const log = console.log;

function UrlPreviewBlock() {
  const [selectedRecordId, setSelectedRecordId] = (0, _react.useState)(null);
  const [selectedFieldId, setSelectedFieldId] = (0, _react.useState)(null);
  const base = (0, _ui.useBase)();
  const USER = base.getTableByName('user');
  let Pubkey = USER.getFieldByName('pubkey');
  const records = (0, _ui.useRecords)(USER, {
    fields: [Pubkey]
  });
  log(records);
  let data = records.map(record => ({
    pubkey: record.getCellValueAsString(Pubkey)
  }));
  (0, _ui.useLoadable)(_blocks.cursor);
  (0, _ui.useWatchable)(_blocks.cursor, ['selectedRecordIds', 'selectedFieldIds'], () => {
    if (_blocks.cursor.selectedRecordIds.length > 0) {
      // There might be multiple selected records. We'll use the first
      // one.
      setSelectedRecordId(_blocks.cursor.selectedRecordIds[0]);
    }

    if (_blocks.cursor.selectedFieldIds.length > 0) {
      // There might be multiple selected fields. We'll use the first
      // one.
      setSelectedFieldId(_blocks.cursor.selectedFieldIds[0]);
    }
  });
  (0, _ui.useWatchable)(_blocks.cursor, ['activeTableId', 'activeViewId'], () => {
    setSelectedRecordId(null);
    setSelectedFieldId(null);
  });
  const table = base.getTableByIdIfExists(_blocks.cursor.activeTableId); // table is briefly null when switching to a newly created table.

  if (!table) {
    return null;
  }

  return _react.default.createElement(RecordPreview, {
    base: base,
    table: table,
    pubkey: data[0].pubkey,
    selectedRecordId: selectedRecordId,
    selectedFieldId: selectedFieldId
  });
} // Shows a preview, or a message about what the user should do to see a preview.


function RecordPreview({
  base,
  table,
  pubkey,
  selectedRecordId,
  selectedFieldId
}) {
  const [isDialogOpen, setIsDialogOpen] = (0, _react.useState)(false); // We use getFieldByIdIfExists because the field might be deleted.

  const selectedField = selectedFieldId ? table.getFieldByIdIfExists(selectedFieldId) : null;
  const selectedRecord = (0, _ui.useRecordById)(table, selectedRecordId ? selectedRecordId : '', {
    fields: [selectedField]
  });
  (0, _ui.useWatchable)(_blocks.cursor, ['activeTableId', 'activeViewId']); // This button is re-used in two states so it's pulled out in a constant here.

  const getHelp = _react.default.createElement(_ui.TextButton, {
    size: "small",
    marginTop: 3,
    onClick: () => setIsDialogOpen(true)
  }, _react.default.createElement(_ui.Link, {
    href: "https://docs.flow.black/",
    target: "_blank"
  }, "Need help?"));

  let content;

  if (_blocks.cursor.activeViewId === null || // activeViewId is briefly null when switching views
  table.getViewById(_blocks.cursor.activeViewId).type !== _models.ViewType.GRID) {
    content = _react.default.createElement(Container, null, _react.default.createElement(_ui.Text, null, "Switch to a table to see Stats"));
  } else if ((selectedRecord === null || selectedField === null) && (table.name == 'campaign' || table.name == 'account' || table.name == 'lander' || table.name == 'source' || table.name == 'domain' || table.name == 'lander' || table.name == 'flow' || table.name == 'offer')) {
    const previewUrl = getPreviewUrlForTable(base, table, pubkey);
    content = _react.default.createElement(Container, null, _react.default.createElement("iframe", {
      key: previewUrl,
      style: {
        flex: 'auto',
        width: '100%'
      },
      src: previewUrl,
      frameBorder: "0",
      allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true
    }));
  } else if ( // selectedRecord will be null on block initialization, after
  // the user switches table or view, or if it was deleted.
  selectedRecord === null || // The selected field may have been deleted.
  selectedField === null) {
    content = _react.default.createElement(Container, null, _react.default.createElement(_ui.Text, null, "Select"), getHelp);
  } else {
    // Using getCellValueAsString guarantees we get a string back.  If
    // we use getCellValue, we might get back numbers, booleans, or
    // arrays depending on the field type.
    const previewUrl = getPreviewUrlForRecord(pubkey, table, selectedRecord, selectedField); // In this case, the FIELD_NAME field of the currently selected
    // record either contains no URL, or contains a URL that cannot be
    // resolved to a supported preview.

    if (!previewUrl) {
      content = _react.default.createElement(Container, null, _react.default.createElement(_ui.Text, null, "Select ", table.name, " column"), getHelp);
    } else {
      content = _react.default.createElement(Container, null, _react.default.createElement("iframe", {
        key: previewUrl,
        style: {
          flex: 'auto',
          width: '100%'
        },
        src: previewUrl,
        frameBorder: "0",
        allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      }));
    }
  }

  return _react.default.createElement(_react.default.Fragment, null, content);
} // Container element which takes up the full viewport and centers its children.


function Container({
  children
}) {
  return _react.default.createElement(_ui.Box, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }, children);
}

(0, _ui.initializeBlock)(() => _react.default.createElement(UrlPreviewBlock, null));