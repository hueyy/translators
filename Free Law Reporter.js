{
	"translatorID": "04250fb1-0e44-4514-82b0-8663bacfe62b",
	"translatorType": 4,
	"label": "Free Law Reporter",
	"creator": "Frank Bennett",
	"target": "^https?://(?:www\\.)*freelawreporter\\.org",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"browserSupport": "gcsib",
	"lastUpdated": "2012-10-07 10:10:42"
}

var urlCheck = function (url) {
	if (url.indexOf('?uuid=') > -1) {
		return "case";
	} else if (url.indexOf('/index.php?')) {
		return "multiple";
	}
}

var detectWeb = function (doc, url) {
	// Icon shows only for search results and law cases
    return urlCheck(url);
}

var scrapeCase = function (doc, url) {
    var elems = doc.getElementsByTagName("meta")

    var Item = new Zotero.Item("case");

    // Needs: URL, jurisdiction
    // Strip trailing period on court name
    // Strip No. from docket number

    for (var i = 0, ilen = elems.length; i < ilen; i += 1) {
        var name = elems[i].getAttribute("name");
        var content = elems[i].getAttribute("content");
        Zotero.debug("XXX "+content+" "+name);
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
    Item.complete();
}

/*********************************
 * Cookie manipulation functions *
 *********************************/

function doWeb(doc, url) {
    if (urlCheck(url) === "case") {    
        scrapeCase(doc, url);
    } else {
		var results = ZU.xpath(doc,'//h5/a');
		var items = new Object();
		var resultDivs = new Object();
		var docUrl;
		for(var i=0, n=results.length; i<n; i++) {
			docUrl = "http://www.freelawreporter/" + ZU.xpathText(results[i],'.//h5/a[1]/@href');
			items[docUrl] = ZU.xpathText(results[i], './/h5/a');
		}
		Zotero.selectItems(items, function(selectedItems) {
			if(!selectedItems) {
                return true;
            }
        });
    }
}
