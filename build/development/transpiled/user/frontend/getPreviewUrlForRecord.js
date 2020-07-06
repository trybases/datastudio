"use strict";

function getPreviewUrlForRecord(pubkey, table, record, field) {
  const url = record.getCellValueAsString(field);

  if (!url) {
    return null;
  } // Try to extract the preview URL from the URL using regular expression
  // based helper functions for each service we support.


  if (table.name == 'campaign' && field.name == 'campaign') {
    let Campaign = table.getFieldByName('campaign');
    const campaign = record.getCellValueAsString(Campaign);
    const statsPreview = campaignStats(pubkey, table, field, campaign);

    if (statsPreview) {
      return statsPreview;
    }
  }

  if (table.name == 'account' && field.name == 'account') {
    let Account = table.getFieldByName('account');
    const account = record.getCellValueAsString(Account);
    const statsPreview = accountStats(pubkey, table, field, account);

    if (statsPreview) {
      return statsPreview;
    }
  }

  if (table.name == 'domain' && field.name == 'name') {
    let Domain = table.getFieldByName('name');
    const domain = record.getCellValueAsString(Domain);
    const statsPreview = domainStats(pubkey, table, field, domain);

    if (statsPreview) {
      return statsPreview;
    }
  }

  if (table.name == 'source' && field.name == 'name') {
    let Source = table.getFieldByName('name');
    const source = record.getCellValueAsString(Source);
    const statsPreview = sourceStats(pubkey, table, field, source);

    if (statsPreview) {
      return statsPreview;
    }
  } //Lander
  //Flow
  //offer


  return null;
}

function campaignStats(pubkey, table, field, campaign) {
  if (campaign.length >= 2) {
    var params = {
      "ds23.pubkey": pubkey,
      "ds23.campaign": campaign
    };
    var paramsAsString = JSON.stringify(params);
    var encodedParams = encodeURIComponent(paramsAsString);
    return `https://datastudio.google.com/embed/reporting/398a484b-448c-4478-9a92-af3b8c2e1e18/page/6bgDB/?params=${encodedParams}`;
  }

  return null;
}

function accountStats(pubkey, table, field, account) {
  if (account.length >= 2) {
    var params = {
      "ds23.pubkey": pubkey,
      "ds23.account": account
    };
    var paramsAsString = JSON.stringify(params);
    var encodedParams = encodeURIComponent(paramsAsString);
    return `https://datastudio.google.com/embed/reporting/398a484b-448c-4478-9a92-af3b8c2e1e18/page/6bgDB/?params=${encodedParams}`;
  }

  return null;
}

function landerStats(pubkey, table, field, lander) {
  if (lander.length >= 1) {
    var params = {
      "ds23.pubkey": pubkey,
      "ds23.lander": lander
    };
    var paramsAsString = JSON.stringify(params);
    var encodedParams = encodeURIComponent(paramsAsString);
    return `https://datastudio.google.com/embed/reporting/398a484b-448c-4478-9a92-af3b8c2e1e18/page/6bgDB/?params=${encodedParams}`;
  }

  return null;
}

function domainStats(pubkey, table, field, domain) {
  if (domain.length >= 2) {
    var params = {
      "ds23.pubkey": pubkey,
      "ds23.domain": domain
    };
    var paramsAsString = JSON.stringify(params);
    var encodedParams = encodeURIComponent(paramsAsString);
    return `https://datastudio.google.com/embed/reporting/398a484b-448c-4478-9a92-af3b8c2e1e18/page/6bgDB/?params=${encodedParams}`;
  }

  return null;
}

function sourceStats(pubkey, table, field, source) {
  if (source.length >= 2) {
    var params = {
      "ds23.pubkey": pubkey,
      "ds23.source": source
    };
    var paramsAsString = JSON.stringify(params);
    var encodedParams = encodeURIComponent(paramsAsString);
    return `https://datastudio.google.com/embed/reporting/398a484b-448c-4478-9a92-af3b8c2e1e18/page/6bgDB/?params=${encodedParams}`;
  }

  return null;
}

module.exports = getPreviewUrlForRecord;