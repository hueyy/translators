{
	"translatorID": "a41fc438-1644-4313-ad1e-0ed7d1977937",
	"label": "Mongolia Court Judgments",
	"creator": "Frank Bennett",
	"target": "https?:\\/\\/old\\.shuukh\\.mn\\/zahirgaadavah\\/[0-9]+\\/view",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2016-03-12 05:02:30"
}

urlRegExp = new RegExp("https?:\/\/old\.shuukh\.mn\/zahirgaadavah\/[0-9]+\/view")


function detectWeb(doc, url) {
	var m = urlRegExp.exec(url, urlRegExp);
	if (m) {
		return "case"
	}
	return false;
}

var jurisdictionMap = {
	"Захиргааны хэргийн давж заалдах шатны шүүх": "zakhirgaanii.khergiin.davj.zaaldakh.shatnii.shuukh"
}

function getJurisdiction(doc, label){
	var labelVal = getValue(doc, label);
	var ret = jurisdictionMap[labelVal];
	if (!ret){
		ret = labelVal;
	}
	return ret;
}

function getValue(doc, label){
	var ret = ZU.xpathText(doc, '//th[text()="' + label + '"]/following-sibling::td');
	if (ret) {
		ret = ret.trim();
	}
	return ret;
}

function addJudges(doc, item, label){
	var labelVal = getValue(doc, label);
	if (!labelVal) return;
	var names = labelVal.split(/,\s+/);
	for (var i=0,ilen=names.length;i<ilen;i++) {
		var namePos = names[i].indexOf(" ");
		if (namePos > -1) {
			var family = names[i].slice(0, namePos).trim();
			var given = names[i].slice(namePos).trim();
			item.creators.push({
				creatorType: "author",
				lastName: family ? family : given,
				firstName: family ? given : given,
				fieldMode: family ? 0 : 1
			});
		}
	}
}

function addTag(doc, item, label) {
	var labelVal = getValue(doc, label);
	if (labelVal) {
		item.tags.push(labelVal);
	}
}

function addToNote(doc, item, label) {
	var labelVal = getValue(doc, label);
	if (item.extra) {
		item.extra += ' / ' + labelVal;
	} else {
		item.extra = labelVal;
	}
}

function scrape (doc, url) {
	var item = new Zotero.Item("case");
	item.jurisdiction = 'mn';
	addToNote(doc, item, "Шийдвэрийн төрөл");
	addToNote(doc, item, "Хүчинтэй эсэх");
	addToNote(doc, item, "Шийдсэн байдал");
	item.date = getValue(doc, "Огноо");
	item.callNumber = getValue(doc, "Дугаар");
	item.docketNumber = getValue(doc, "Хэргийн индекс");
	item.court = getValue(doc, "Шүүх");
	addJudges(doc, item, "Шүүгч");
	var plaintiff = getValue(doc, "Нэхэмжлэгч");
	var defendant = getValue(doc, "Хариуцагч");
	item.caseName = plaintiff + " v. " + defendant;
	addTag(doc, item, "Маргааны төрөл");
	// Judgment type
	item.complete();
}
// item.Шүүгч

function doWeb(doc,url) {
	scrape(doc, url);
}