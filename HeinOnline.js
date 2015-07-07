{
	"translatorID": "3dcbb947-f7e3-4bbd-a4e5-717f3701d624",
	"label": "HeinOnline",
	"creator": "Frank Bennett",
	"target": "https?://heinonline.org/HOL/(?:LuceneSearch|Page)\\?",
	"minVersion": "1.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "g",
	"lastUpdated": "2015-07-04 10:32:10"
}

var listItems;

function detectWeb (doc, url) {
	if (url.indexOf("/LuceneSearch?") > -1) {
		if (getSearchResults(doc)) {
			return "multiple";
		}
	} else {
		return "journalArticle";
	}
	return false;
}

function getXPathStr(attr, elem, path) {
	var res = ZU.xpath(elem, path);
	res = res.length ? res[0][attr] : '';
	return res ? res : '';
}

function Data(doc) {
	this.node = ZU.xpath(doc, '//form[@id="Print1"]');
	this.urlbase = "PDFsearchable?sectioncount=1&ext=.pdf&nocover=&";
	this.queryElems = [];
}

Data.prototype.getVal = function(name, returnOnly) {

	var val = getXPathStr("value", this.node, './/input[@name="' + name + '"]');
	val = val ? encodeURIComponent(val) : '';

	if (!returnOnly) {
		this.queryElems.push(name + "=" + val);
	}
	return val;
}

Data.prototype.dump = function() {
	return this.urlbase + this.queryElems.join("&");
}

function getSearchResults(doc) {
	var results = doc.getElementsByClassName("lucene_search_result_b"),
		items = {},
		found = false
	for (var i=0; i<results.length; i++) {
		var url = getXPathStr("href", results[i], './/a[contains(@href, "Print")]');
		url = url.replace(/Print/, "Page");
		url = url.replace(/&terms=[^&]*/, '');

		var title = getXPathStr("textContent", results[i], './/a[1]');
		title = ZU.trimInternal(title);
		title = title.replace(/\s*\[[^\]]*\]$/, '');

		if (!title || !url) continue;
		
		items[url] = title;
		found = true;
	}
	return found ? items : false;
}

function scrapePage(doc, url, item) {
	var pdfPageURL = url.replace(/\/Page\?/, "/Print?");
	if (!item) {
		item = new Zotero.Item();
		var z3988title = getXPathStr("title", doc, '//span[contains(@class, " Z3988") or contains(@class, "Z3988 ") or @class="Z3988"][@title]');
		ZU.parseContextObject(z3988title, item);
		
		if (!item.itemType) {
			// Sometimes items that report full-text PDF in the search listing
			// resolve to a failure page. This builds a placeholder item out
			// of the data that is available.
			item.itemType = "journalArticle";
			if (listItems) {
				item.title = listItems[url];		
			} else {
				item.title = getXPathStr("textContent", doc, '//div[@id="content-container"]//a[1]');
			}
			var notAvailableURL = url.replace("/Page?", "/NotAvailable?").replace("handle=", "handle_bad=");
			item.attachments.push({
				url:notAvailableURL,
				mimetype:"text/html",
				snapshot:true,
				title:"HeinOnline page placeholder"
			});
			item.url = url;
			item.abstract = "CAUTION: Resource not yet available at HeinOnline";
			item.complete();
			return true;
		}	
	}
	ZU.processDocuments([pdfPageURL], 
		function(pdoc, purl){
			var input = new Data(pdoc);
			var startingID = input.getVal("id");
			var endingID = input.getVal("toid", true);
			input.getVal("handle");
			input.getVal("collection");
			input.getVal("section");
			input.getVal("print");
			var pdfURL = input.dump();
			
			if (item.pages && endingID && startingID) {
				item.pages = item.pages + "-" 
					+ (parseInt(item.pages) 
					+  parseInt(endingID) 
					-  parseInt(startingID));
			}

			item.attachments.push({
				url:pdfURL,
				title:"HeinOnline PDF",
				mimeType:"application/pdf"
			});
			item.complete();
		});
}

function doWeb (doc, url) {
	if (detectWeb(doc, url) === "multiple") {
		Zotero.selectItems(getSearchResults(doc), function (items) {
			if (!items) {
				return true;
			}
			var urls = [];
			for (var i in items) {
				urls.push(i);
			}
			listItems = items;
			Zotero.debug("Process documents (1)");
			ZU.processDocuments(urls, scrapePage);
		});
	} else {
		listItems = null;
		scrapePage(doc, url);
	}
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "http://heinonline.org/HOL/Page?handle=hein.journals/howlj3&div=8&collection=journals&set_as_cursor=1&men_tab=srchresults",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Law, Logic and Experience",
				"creators": [
					{
						"firstName": "Grant",
						"lastName": "Gilmore",
						"creatorType": "author"
					}
				],
				"date": "1957",
				"journalAbbreviation": "Howard L.J.",
				"libraryCatalog": "HeinOnline",
				"pages": "26",
				"publicationTitle": "Howard Law Journal",
				"url": "http://heinonline.org/HOL/Page?handle=hein.journals/howlj3&id=46&div=&collection=journals",
				"volume": "3",
				"attachments": [
					{
						"title": "HeinOnline PDF",
						"mimeType": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
