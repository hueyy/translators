{
	"translatorID": "04250fb1-0e44-4514-82b0-8663bacfe62b",
	"translatorType": 4,
	"label": "Free Law Reporter",
	"creator": "Frank Bennett",
	"target": "^https?://(?:www\\.)*freelawreporter\\.org/(?:index.php\\?.*q=|flrdoc.php\\?.*uuid=)",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"browserSupport": "gcsib",
	"lastUpdated": "2012-10-09 22:53:46"
}

var urlCheck = function (url) {
	if (url.indexOf('?uuid=') > -1) {
		return "case";
	} else if (url.indexOf('/index.php?') > -1) {
		return "multiple";
	}
}

var detectWeb = function (doc, url) {
	// Icon should show only for search results and law cases
    Zotero.debug("XXX url: "+url);
    return urlCheck(url);
}

var scrapeCase = function (doc, url) {
    // Preliminaries
    if (!url) {
        url = doc.location.href;
    }
    var elems = doc.getElementsByTagName("meta")
    // Scrape
    var Item = new Zotero.Item("case");
    for (var i = 0, ilen = elems.length; i < ilen; i += 1) {
        var name = elems[i].getAttribute("name");
        var content = elems[i].getAttribute("content");
        switch (name) {
        case "parties":
            Item.title = content;
            break;
        case "reporterseries":
            Item.reporter = content;
            break;
        case "decisiondate":
            Item.dateDecided = content;
            break;
        case "docketnumber":
            Item.docketNumber = content.replace(/^No.*\s+/, "").replace(/\.$/, "");
            break;
        case "courtname":
            Item.court = content.replace(/\.$/,"");
            break;
        case "citation":
            var m = content.match(/([0-9]+).*?([0-9]+)/);
            if (m) {
                Item.reporterVolume = m[1];
                Item.firstPage = m[2];
            }
            break;
        default:
            break;
        }
    }
    Item.url = url;
    Item.extra = "{:jurisdiction:us}"
    // Finalise
    Item.complete();
}

function doWeb(doc, url) {
    if (urlCheck(url) === "case") {    
        scrapeCase(doc, url);
    } else {
		var results = ZU.xpath(doc,'//h5/a');
		var items = new Object();
		var docUrl;
		for(var i=0, n=results.length; i<n; i++) {
			docUrl = "http://www.freelawreporter/" + results[i].getAttribute('href');
			items[docUrl] = results[i].textContent;
		}
		Zotero.selectItems(items, function(selectedItems) {
			if(!selectedItems) {
                return true;
            }
            for (var url in selectedItems) {
                ZU.processDocuments(url, scrapeCase);
            }
        });
    }
}