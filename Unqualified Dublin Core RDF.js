{
	"translatorID":"6e372642-ed9d-4934-b5d1-c11ac758ebb7",
	"translatorType":2,
	"label":"Unqualified Dublin Core RDF",
	"creator":"Simon Kornblith",
	"target":"rdf",
	"minVersion":"1.0.0b3.r1",
	"maxVersion":"",
	"priority":100,
	"browserSupport":"gcsn",
	"configOptions":{"dataMode":"rdf/xml"},
	"inRepository":true,
	"lastUpdated":"2011-07-08 04:51:41"
}

function doExport() {
	var dc = "http://purl.org/dc/elements/1.1/";
	Zotero.RDF.addNamespace("dc", dc);
	
	var item;
	while(item = Zotero.nextItem()) {
		if(item.itemType == "note" || item.itemType == "attachment") {
			continue;
		}
		
		var resource;
		if(item.ISBN) {
			resource = "urn:isbn:"+item.ISBN;
		} else if(item.url) {
			resource = item.url;
		} else {
			// just specify a node ID
			resource = Zotero.RDF.newResource();
		}
		
		/** CORE FIELDS **/
		
		// title
		if(item.title) {
			// Covers only the one field, logic needs to be moved or encapsulated.

			var value = item.title;
			var fieldVariants = [{value: value}];
			if (item.multi && item.multi._keys['title']) {
				for each (var langTag in item.multi._lsts['title']) {
					fieldVariants.push({value: item.multi._keys['title'][langTag], langTag: langTag});
				}
				for (var j in fieldVariants) {
					value = fieldVariants[j].value;
					var langTag = fieldVariants[j].langTag;
					Zotero.RDF.addStatement(resource, dc+"title", value, true, langTag);
				}
			}
		}
		
		// type
		Zotero.RDF.addStatement(resource, dc+"type", item.itemType, true);
		
		// creators
		var creatorsets = [];
		for(var j in item.creators) {
			creatorsets.push([]);
			creatorsets[creatorsets.length - 1].push(item.creators[j]);
			if (item.creators[j].multi) {
				for each (var langTag in item.creators[j].multi._lst) {
						var c = item.creators[j].multi._key[langTag];
						c.servantLang = langTag;
					creatorsets[creatorsets.length - 1].push(c);
				}
			}
		}
		for(var j = 0, jlen = creatorsets.length; j < jlen; j += 1) {
			for (var k = 0, klen = creatorsets[j].length; k < klen; k += 1) {
				var creatordata = creatorsets[j][k];
				// put creators in lastName, firstName format (although DC doesn't specify)
				var creator = creatordata.lastName;
				if(creatordata.firstName) {
					creator += ", "+creatordata.firstName;
				}
				var lang = creatordata.servantLang;
				if(creatordata.creatorType == "author") {
					Zotero.RDF.addStatement(resource, dc+"creator", creator, true, lang);
				} else {
					Zotero.RDF.addStatement(resource, dc+"contributor", creator, true, lang);
				}
			}
		}
		
		/** FIELDS ON NEARLY EVERYTHING BUT NOT A PART OF THE CORE **/
		
		// source
		if(item.source) {
			Zotero.RDF.addStatement(resource, dc+"source", item.source, true);
		}
		
		// accessionNumber as generic ID
		if(item.accessionNumber) {
			Zotero.RDF.addStatement(resource, dc+"identifier", item.accessionNumber, true);
		}
		
		// rights
		if(item.rights) {
			Zotero.RDF.addStatement(resource, dc+"rights", item.rights, true);
		}
		
		/** SUPPLEMENTAL FIELDS **/
		
		// TODO - create text citation and OpenURL citation to handle volume, number, pages, issue, place
		
		// publisher/distributor
		if(item.publisher) {
			Zotero.RDF.addStatement(resource, dc+"publisher", item.publisher, true);
		} else if(item.distributor) {
			Zotero.RDF.addStatement(resource, dc+"publisher", item.distributor, true);
		} else if(item.institution) {
			Zotero.RDF.addStatement(resource, dc+"publisher", item.distributor, true);
		}
		
		// date/year
		if(item.date) {
			Zotero.RDF.addStatement(resource, dc+"date", item.date, true);
		}
		
		// ISBN/ISSN/DOI
		if(item.ISBN) {
			Zotero.RDF.addStatement(resource, dc+"identifier", "ISBN "+item.ISBN, true);
		}
		if(item.ISSN) {
			Zotero.RDF.addStatement(resource, dc+"identifier", "ISSN "+item.ISSN, true);
		}
		if(item.DOI) {
			Zotero.RDF.addStatement(resource, dc+"identifier", "DOI "+item.DOI, true);
		}
		
		// callNumber
		if(item.callNumber) {
			Zotero.RDF.addStatement(resource, dc+"identifier", item.callNumber, true);
		}
		
		// archiveLocation
		if(item.archiveLocation) {
			Zotero.RDF.addStatement(resource, dc+"coverage", item.archiveLocation, true);
		}
		
		// medium
		if(item.medium) {
			Zotero.RDF.addStatement(resource, dcterms+"medium", item.medium, true);
		}
	}
}