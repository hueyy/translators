{
	"translatorID": "248bebf1-46ab-4067-9f93-ec3d2960d0cd",
	"label": "Scannable Cite",
	"creator": "Scott Campbell, Avram Lyon, Nathan Schneider, Sebastian Karcher",
	"target": "html",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"displayOptions": {
		"exportCharset": "UTF-8"
	},
	"inRepository": true,
	"translatorType": 2,
	"browserSupport": "",
	"lastUpdated": "2013-04-16 11:10:08"
}

// legal types are weird
var LEGAL_TYPES = ["legislation","legal_case","patent","bill","treaty","regulation"];
var mem = new function () {
    var isLegal = false;
	var lst = [];
    this.check = function (item) { isLegal = (LEGAL_TYPES.indexOf(item.type)>-1) };
	this.set = function (str, slug) { if (str) {lst.push(str)} else if (!isLegal) {lst.push(slug)}};
	this.setlaw = function (str, punc) { if (!punc) {punc = ""}; if (str && isLegal) {lst.push(str + punc)}};
	this.get = function () { return lst.join(" ") };
	this.reset = function () {lst = []};
}

function doExport() {
    var item;
    while (item = Zotero.nextItem()) {
        mem.reset();
        Zotero.write("{ |");
        var library_id = item.LibraryID ? item.LibraryID : 0;
		mem.set(item.title,"(no title)");
		if (item.creators.length >0){
  			mem.set(item.creators[0].lastName);
        	if (item.creators.length > 2) mem.set("et al.");
        	else if (item.creators.length == 2) mem.set("&amp; " + item.creators[1].lastName);
		}
        else {
			mem.set("anon.");
        }
        mem.setlaw(item.authority, ",");
        mem.setlaw(item.volume);
        mem.setlaw(item['container-title']);
        mem.setlaw(item.page);
	    var date = Zotero.Utilities.strToDate(item.date);
        var dateS = (date.year) ? date.year : item.date;
        Zotero.write( mem.get + "| | |");
        Zotero.write("zotero://select/items/" + library_id + "_" + item.key + "}");
    }
}

