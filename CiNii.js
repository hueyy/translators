{
	"translatorID": "46291dc3-5cbd-47b7-8af4-d009078186f6",
	"translatorType": 4,
	"label": "CiNii",
	"creator": "Michael Berkowitz and Mitsuo Yoshida",
	"target": "http://ci.nii.ac.jp/",
	"minVersion": "1.0.0b4.r5",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"browserSupport": "gcsibv",
	"lastUpdated": "2013-01-07 03:53:17"
}

function detectWeb(doc, url) {
	if (url.match(/naid/)) {
		return "journalArticle";
	} else if (doc.evaluate('//a[contains(@href, "/naid/")]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
}

function doWeb(doc, url) {
	var n = doc.documentElement.namespaceURI;
	var ns = n ? function(prefix) {
		if (prefix == 'x') return n; else return null;
	} : null;

	// cleanAuthor to cope with CiNii names format change.
	// We assume that all creators are individuals, and not
	// institutions.

	var fixAuthors = function (obj) {
		fixAuthor(obj);
		if (obj.multi) {
			for (var servantLang in obj.multi._key) {
				fixAuthor(obj.multi._key[servantLang]);
			}
		}
	}

	var fixAuthor = function (obj) {
		var lst, i, ilen, creator, workingCreator, snipoffset, compositeStr, newCreator;
		// Abort if not a string
		if ("string" !== typeof obj.lastName) {
			return;
		}
		var str = obj.lastName;
		// Replace any comma and surrounding spaces with a single space
		str = str.replace(/\s*,\s*/g, " ");
		// Strip leading and trailing spaces
		str = str.replace(/^\s+/, "").replace(/\s+$/, "");
		// Abort if empty string
		if (!str) {
			return;
		}

		// Regular expression: word in all capitals
		const allCapsRe = /^[A-Z\u0400-\u042f]+$/;
		// Regular expression: romanesque string
		const hasRomanesque = /[a-zA-Z\u0080-\u017f\u0400-\u052f]/;

		lst = str.split(/\s+/);
		if (lst.length === 1) {
			// Catch single-word names -- WHO maybe?
			obj.lastName = lst[0];
		} else if (!hasRomanesque.exec(str)) {
			// Catch CJ names
			obj.lastName = lst[0];
			// Should always be a single string, but who knows
			obj.firstName = lst.slice(1).join(" ");
		} else {
			var workingCreator = {};
			workingCreator.lastName = [];
			workingCreator.firstName = [];

			// Break down Byzantine names ...
			// Normalize leading particles
			for (i = 0, ilen = lst.length; i < ilen; i += 1) {
				if (["von","de","di","le"].indexOf(lst[i].toLowerCase()) > -1) {
					lst[i] = lst[i].toLowerCase();
				} else {
					break;
				}
			}
			// Normalize trailing particles
			for (i = lst.length - 1; i > -1; i += -1) {
				if (["von","de","di","le"].indexOf(lst[i].toLowerCase()) > -1) {
					lst[i] = lst[i].toLowerCase();
				} else {
					break;
				}
			}
			// Snip off trailing particles
			for (i = lst.length - 1; i > -1; i += -1) {
				if (!allCapsRe.test(lst[i][0])) {
					workingCreator.lastName.push(lst.pop());
				} else {
					break;
				}
			}
			// Snip off leading particles
			for (i = 0, ilen = lst.length; i < ilen; i += 1) {
				if (!allCapsRe.test(lst[i][0])) {
					workingCreator.lastName.push(lst[i]);
				} else {
					lst = lst.slice(i);
					break;
				}
			}
			if (lst.length > 0) {
				workingCreator.lastName.push(lst[0]);
				lst = lst.slice(1);
			}
			if (lst.length > 0) {
				workingCreator.firstName = workingCreator.firstName.concat(lst);
			}
			//compositeStr = workingCreator.lastName.join(" ") +
			//	", " +
			//	workingCreator.firstName.join(" ");
			obj.lastName = workingCreator.lastName.join(" ");
			obj.firstName = workingCreator.firstName.join(" ");
			//
			// Finally, fix up any all-caps family names
			if (hasRomanesque.test(obj.lastName) && obj.lastName === obj.lastName.toUpperCase()) {
				obj.lastName = obj.lastName.slice(0, 1) + obj.lastName.slice(1).toLowerCase();
			}
		}
	};
	
	var arts = new Array();
	if (detectWeb(doc, url) == "multiple") {
		var items = new Object();
		var links = doc.evaluate('//a[contains(@href, "/naid/")]', doc, ns, XPathResult.ANY_TYPE, null);
		var link;
		while (link = links.iterateNext()) {
			items[link.href] = Zotero.Utilities.trimInternal(link.textContent);
		}
		items = Zotero.selectItems(items);
		for (var i in items) {
			arts.push(i);
		}
	} else {
		arts = [url];
	}

	for (var i = 0, ilen = arts.length; i < ilen; i += 1) {

		var rdftext = Zotero.Utilities.retrieveSource(arts[i]+'/rdf');
		var rdftrans = Zotero.loadTranslator("import");
		rdftrans.setTranslator("5e3ad958-ac79-463d-812b-a86a9235c28f");
		rdftrans.setString(rdftext);
		rdftrans.setHandler("itemDone", function(obj, item) {
			item.itemType = "journalArticle";
			for (var i = 0, ilen = item.creators.length; i < ilen; i += 1) {
				if (item.creators[i].lastName && item.creators[i].firstName) {
					item.creators[i].lastName = item.creators[i].lastName +
						", " +
						item.creators[i].firstName;
					item.creators[i].firstName = false;
				}
				fixAuthors(item.creators[i]);
				var lastName = item.creators[i].lastName;
				if (lastName) {
					var jlst = lastName.split(/\s+/);					
					for (var j = 0, jlen = jlst.length; j < jlen; j += 1) {
						var klst = jlst[j].split('-');
						for (var k = 0, klen = klst.length; k < klen; k += 1) {
							if (klst[k].match(/^[A-Z]+$/)) {
								klst[k] = klst[k].slice(0, 1) + klst[k].slice(1).toLowerCase();
							}
						}
						jlst[j] = klst.join('-');
					}
					lastName = jlst.join(" ");
					item.creators[i].lastName = lastName;
				}
			}
			// XXXX This is a hack to avoid garbage returns from CiNii RDF.
			// We're only interested in descriptions of article IDs.
			if (item.itemID.slice(0,25) === 'http://ci.nii.ac.jp/naid/') {
				item.complete();
			}
		});
		rdftrans.translate();
	}
}
/** BEGIN TEST CASES **/
var testCases = [
]
/** END TEST CASES **/