{
	"translatorID": "1865fe4b-df40-4672-b4c6-33d8827a95bc",
	"label": "National Assembly of Laos",
	"creator": "Frank Bennett",
	"target": "https?://(?:www.)?na.gov.la/index\\.php",
	"minVersion": "1.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "g",
	"lastUpdated": "2013-07-05 07:40:28"
}

function detectWeb(doc, url) {
	anchors = doc.getElementsByTagName('a');
	for (var i=0,ilen=anchors.length;i<ilen;i+=1) {
		var href = anchors[i].getAttribute('href');
		if (href && href.match(/.*\/docs\/lao\/laws\/.*/)) {
			return "multiple";
		}
	}
 	return false;
}

// Need a function to clean up titles (only one parenthetical per title, the first)

function doWeb(doc, url) {
	anchors = doc.getElementsByTagName('a');
	var availableItems = {};
    var documentURLs = {};
    var documentTitles = {};
    // The markup of the legislation lists is less than ideal, to put it mildly.
    // List elements are set entirely in SPAN and A tags, with newlines forced with BR.
    // Some documents are even linked to anchors with no descriptive content.
    // The nesting of SPAN, A and BR tags is highly irregular, making it impossible
    // to extract structured content with xpath.
    //
    // Recovering this mess will require some extremely ugly and arcane
    // code-fu. Hold your nose, here we go ...
    //
    // Get the nodes containing the gunk for the list(s).
    var bignodes = ZU.xpath(doc, '//h2/following-sibling::div[@class="article-content"]/p');
    // Dump the HTML of the list(s) to a string.
    var bigtxt = "";
    var biglst;
    for (var i=0,ilen=bignodes.length;i<ilen;i+=1) {
        bigtxt = bignodes[i].innerHTML.replace("&nbsp;"," ");
        // Split the list on the hard-coded numbers.
        biglst = bigtxt.split(/<[^>]+>\s*[0-9]+\.\s*/);
        var count = 1;
	    for (var j=0,jlen=biglst.length;j<jlen;j+=1) {
            var txt = count + ". " + biglst[j].replace(/<[^>]*>/g,"");
            var m = biglst[j].match(/[^\"]*\/docs\/lao\/laws[^\"]*/g);
            if (m) {
                documentURLs[m[0]] = m.slice();
                documentTitles[m[0]] = txt;
                availableItems[m[0]] = txt;
                count += 1;
            }
	    }
    }
	var items = Zotero.selectItems(availableItems);
	var urls = [];
	for (var myurl in items) {
		urls.push(myurl);
	}
	Zotero.Utilities.processDocuments(urls, function(doc, url){
        var key = url.replace(/^https?:\/\/(www\.)?na\.gov\.la/,"");
        
        // There can be multiple attachment URLs for a numbered
        // statute item. Attachments either represent the statute, or
        // a revision to the statute, or a supplementary order or law
        // of some sort. We assume that the first URL goes with the
        // title without parentheticals, and that the parentheticals
        // should be added one at a time for the succeeding URLs. If
        // we run out of parentheticals, we should attach the doc to
        // the current item.

        //
        // Yuck! But at least the list has something more closely
        // resembling a structure at this point, after our
        // pre-processing.
        var docTitleLst = [documentTitles[key].replace(/\s*\(.*/,"")];
        var docTitleMatch = documentTitles[key].match(/(\([^)]+\))/g);
        if (docTitleMatch) {
            for (var i=docTitleMatch.length-1;i>-1;i+=-1) {
                docTitleLst.push(docTitleLst[0] + " " + docTitleMatch[i]);
            }
        }

        // Extend title of all elements with any leftovers.
        if (docTitleLst.length > documentURLs[key].length) {
            var suppLst = docTitleLst.slice(documentURLs[key].length);
            for (var i=0,ilen=suppLst.length;i<ilen;i+=1) {
                for (var j=0,jlen=documentURLs[key].length;j<jlen;j+=1) {
                    docTitleLst[j] += (" " + suppLst[i]);
                }
            }
        }

        // Convert documentURLs to a list of lists.
        for (var j=0,jlen=documentURLs[key].length;j<jlen;j+=1) {
            documentURLs[key] = [documentURLs[key]];
        }
        // Normally there will be one url per item, but orphans are populated 
        // back across all items if they turn up
        if (documentURLs[key].length > docTitleLst.length) {
            var suppLst = documentURLs[key].slice(docTitleLst.length);
            for (var j=0,jlen=docTitleLst.length;j<jlen;j+=1) {
                documentURLs[key][j].push(suppLst[j]);
            }

        }

        for (var i=0,ilen=documentURLs[key].length;i<ilen;i+=1) {
            var item = new Zotero.Item("statute");
            item.jurisdiction = "la";
            var mytitle;
            if (docTitleLst[i]) {
                mytitle = docTitleLst[i];
            } else {
                mytitle = docTitleLst[0];
            }
            item.title = mytitle;
            // Extract year from URL and set on item
            var m = documentURLs[key][i][0].match(/.*([0-9]{4}).*/);
            if (m) {
                item.date = m[1];
            }
            // Attach document(s) to item
            for (var j=0,jlen=documentURLs[key][i].length;j<jlen;j+=1) {
                var label = "Official Text (" + (j+1) + ")";
                item.attachments.push({url: documentURLs[key][i][j], title: label, mimeType: 'application/pdf'});
            }
            item.complete();
        }
    }, function(){Zotero.done();});
	Zotero.wait();
}
