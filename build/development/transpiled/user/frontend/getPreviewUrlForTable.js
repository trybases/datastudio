"use strict";

function getPreviewUrlForTable(base, table, pubkey) {
  if (table.name == 'campaign') {
    const statsPreview = CampaignStats(pubkey);

    if (statsPreview) {
      return statsPreview;
    }

    return null;
  }

  if (table.name == 'source') {
    const statsPreview = SourceStats(pubkey);

    if (statsPreview) {
      return statsPreview;
    }

    return null;
  }

  if (table.name == 'domain') {
    const statsPreview = DomainStats(pubkey);

    if (statsPreview) {
      return statsPreview;
    }

    return null;
  }

  if (table.name == 'account') {
    const statsPreview = AccountStats(pubkey);

    if (statsPreview) {
      return statsPreview;
    }

    return null;
  }

  if (table.name == 'flow') {
    const statsPreview = FlowStats(pubkey);

    if (statsPreview) {
      return statsPreview;
    }

    return null;
  }

  if (table.name == 'lander') {
    const statsPreview = LanderStats(pubkey);

    if (statsPreview) {
      return statsPreview;
    }

    return null;
  }

  if (table.name == 'offer') {
    const statsPreview = OfferStats(pubkey);

    if (statsPreview) {
      return statsPreview;
    }

    return null;
  }
}

function CampaignStats(pubkey) {
  var params = {
    "data.pubkey": pubkey
  };
  var paramsAsString = JSON.stringify(params);
  var encodedParams = encodeURIComponent(paramsAsString);
  return `https://datastudio.google.com/embed/reporting/b9d240be-09a6-432b-9145-7bcd696730b4/page/bGRy/?params=${encodedParams}`;
}

function AccountStats(pubkey) {
  var params = {
    "data.pubkey": pubkey
  };
  var paramsAsString = JSON.stringify(params);
  var encodedParams = encodeURIComponent(paramsAsString);
  return `https://datastudio.google.com/embed/reporting/b9d240be-09a6-432b-9145-7bcd696730b4/page/BYbLB/?params=${encodedParams}`;
}

function LanderStats(pubkey) {
  var params = {
    "data.pubkey": pubkey
  };
  var paramsAsString = JSON.stringify(params);
  var encodedParams = encodeURIComponent(paramsAsString);
  return `https://datastudio.google.com/embed/reporting/b9d240be-09a6-432b-9145-7bcd696730b4/page/WYbLB/?params=${encodedParams}`;
}

function FlowStats(pubkey) {
  var params = {
    "data.pubkey": pubkey
  };
  var paramsAsString = JSON.stringify(params);
  var encodedParams = encodeURIComponent(paramsAsString);
  return `https://datastudio.google.com/embed/reporting/b9d240be-09a6-432b-9145-7bcd696730b4/page/FgbLB/?params=${encodedParams}`;
}

function SourceStats(pubkey) {
  var params = {
    "data.pubkey": pubkey
  };
  var paramsAsString = JSON.stringify(params);
  var encodedParams = encodeURIComponent(paramsAsString);
  return `https://datastudio.google.com/embed/reporting/b9d240be-09a6-432b-9145-7bcd696730b4/page/QgbLB/?params=${encodedParams}`;
}

function DomainStats(pubkey) {
  var params = {
    "data.pubkey": pubkey
  };
  var paramsAsString = JSON.stringify(params);
  var encodedParams = encodeURIComponent(paramsAsString);
  return `https://datastudio.google.com/embed/reporting/b9d240be-09a6-432b-9145-7bcd696730b4/page/EgbLB/?params=${encodedParams}`;
}

function OfferStats(pubkey) {
  var params = {
    "data.pubkey": pubkey
  };
  var paramsAsString = JSON.stringify(params);
  var encodedParams = encodeURIComponent(paramsAsString);
  return `https://datastudio.google.com/embed/reporting/b9d240be-09a6-432b-9145-7bcd696730b4/page/NgbLB/?params=${encodedParams}`;
}

module.exports = getPreviewUrlForTable;