{
	"translatorID": "a41fc438-1644-4313-ad1e-0ed7d1977937",
	"label": "Mongolia Court Judgments",
	"creator": "Frank Bennett",
	"target": "https?:\\/\\/old\\.shuukh\\.mn\\/(eruu|irgen|zahirgaa)(anhan|davah|hyanalt)\\/[0-9]+\\/view",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2016-03-13 00:35:44"
}

urlRegExp = new RegExp("https?:\/\/old\.shuukh\.mn\/(eruu|irgen|zahirgaa)(anhan|davah|hyanalt)\/[0-9]+\/view");


function detectWeb(doc, url) {
	var m = urlRegExp.exec(url, urlRegExp);
	if (m) {
		return "case"
	}
	return false;
}

function getValue(doc, label){
	var ret = ZU.xpathText(doc, '//th[contains(text(),"' + label + '")]/following-sibling::td');
	if (!ret) {
		ret = ZU.xpathText(doc, '//th[contains(text(),"' + label.toLowerCase() + '")]/following-sibling::td');
	}
	if (ret) {
		ret = ret.replace(/\s+/g, " ").trim();
	}
	return ret ? ret : "";
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
		item.extra += ', ' + labelVal;
	} else {
		item.extra = labelVal;
	}
}

function shortenName(name) {
	if (!name) return "";
	if (name.indexOf("аймгийн") > -1) {
		name = name.split(/[\-\s]+/);
		for (var i=0,ilen=name.length;i<ilen;i++) {
			if (name[i] === "аймгийн") {
				name[i] = " ";
			} else {
				name[i] = name[i].slice(0, 1).toUpperCase();
			}
		}
		name = name.join("");
	}
	return name;
}

function scrape (doc, url) {
	var item = new Zotero.Item("case");
	item.jurisdiction = 'mn';
	addJudges(doc, item, "Шүүгч");
	var plaintiff = getValue(doc, "Нэхэмжлэгч");
	var defendant = getValue(doc, "Хариуцагч");
	if (!defendant) {
		defendant = getValue(doc, "Шүүгдэгч");
	}
	item.caseName = plaintiff + " э " + defendant;
	var plaintiffShort = shortenName(plaintiff);
	var defendantShort = shortenName(defendant);
	if (plaintiff !== plaintiffShort || defendant !== defendantShort) {
		item.shortName = plaintiffShort + " э " + defendantShort;
	}
	item.court = getValue(doc, "Шүүх");
	item.docketNumber = getValue(doc, "Дугаар");
	item.callNumber = getValue(doc, "байдал");
	item.date = getValue(doc, "Огноо");
	//addToNote(doc, item, "Шийдвэрийн төрөл");
	addToNote(doc, item, "Хүчинтэй эсэх");
	addToNote(doc, item, "Хэргийн индекс");
	item.url = url.replace(/#$/, "");
	addTag(doc, item, "Маргааны төрөл");
	// Judgment type
	item.complete();
}
// item.Шүүгч

function doWeb(doc,url) {
	scrape(doc, url);
}