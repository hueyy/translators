{
	"translatorID": "6c51f0b2-75b2-4f4c-aa40-1e6bbbd674e3",
	"label": "National Diet Library Periodicals",
	"creator": "Frank Bennett",
	"target": "https://ndlonline.ndl.go.jp/#!/detail/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsbv",
	"lastUpdated": "2018-05-08 22:41:41"
}

var labels = [
	{
		field: "title",
		ja: "タイトル",
		en: "Title"
	},
	{
		field: "_kanaTitle",
		ja: "タイトルよみ",
		en: "Title Transcription"
	},
	{
		field: "_author",
		ja: "著者",
		en: "Author"
	},
	{
		field: "_publicationTitle",
		ja: "掲載誌名",
		en: "Periodical Title"
	},
	{
		field: "note",
		ja: "雑誌の出版情報",
		en: "Publication Information"
	},
	{
		field: "volume",
		ja: "掲載巻",
		en: "Volume"
	},
	{
		field: "issue",
		ja: "掲載号",
		en: "Issue"
	},
	{
		field: "_seriesNumber",
		ja: "掲載通号",
		en: "Sequential Serial Number"
	},
	{
		field: "pages",
		ja: "掲載ページ",
		en: "Pages"
	}
]
	
function getFieldMap(lang) {
	var ret = {};
	for (var spec of labels) {
		ret[spec[lang]] = spec.field;
	}
	return ret;
}

// 判例タイムズ = Hanrei times / 判例タイムズ編集委員会 編

function setField(labelNode, item, fieldMap) {
	if (labelNode) {
		var label = labelNode.textContent.trim().replace(/\u3000$/, "");
		var field = fieldMap[label]
		if (field) {
			var valNode = ZU.xpath(labelNode, "./following-sibling::dd")[0];
			if (valNode) {
				var val = valNode.textContent.trim().replace(/\u3000$/, "");
				var field = fieldMap[label]
				if (field.slice(0, 1) === "_") {
					if (field === "_publicationTitle") {
						var lst = val.split("=");
						item.publicationTitle = lst[0].trim();
						if (lst[1]) {
							var llst = lst[1].split(" / ");
							ZU.setMultiField(item, "publicationTitle", llst[0], "en");
						}
					} else if (field === "_kanaTitle") {
						ZU.setMultiField(item, "title", val, "ja-kana");
					} else if (field === "_author") {
						var lst = val.split(" ");
						item.creators.push({
							lastName: lst[0],
							firstName: lst[1],
							creatorType: "author"
						})
					} else if (field === "_seriesNumber") {
						item.seriesNumber = val;
					}
					
				} else {
					item[field] = val;
				}
			}
		}
	}
}

function detectWeb(doc, url) {
	return "journalArticle";
}

function doWeb(doc, url) {
	var item = new Zotero.Item("journalArticle");
	var lang = "ja";
	var langNode = ZU.xpath(doc, "//a[contains(@ng-click, 'headerMenu.translate')]")[0];
	if (langNode.textContent.trim().replace(/\u3000$/, "") !== "English") {
		lang = "en";
	}
	var fieldMap = getFieldMap(lang);
	var labelNodes = ZU.xpath(doc, '//div[contains(@class, "biblioBasicBlock")]//dt[contains(@class, "labelCell")]');
	for (var labelNode of labelNodes) {
		setField(labelNode, item, fieldMap);
	}
	if (item.seriesNumber) {
		delete item.volume;
		item.issue = item.seriesNumber;
		delete item.seriesNumber;
	}
	item.url = url;
	item.complete();
}
