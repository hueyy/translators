{
	"translatorID": "7dd77918-46f2-4bab-8559-0c4a458b0807",
	"label": "US Frontline News",
	"creator": "Frank Bennett",
	"target": "^https?://www.usfl.com(?:/\\?p=[0-9]+)*$",
	"minVersion": "3.0.4",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsib",
	"lastUpdated": "2014-06-28 08:53:32"
}

function detectWeb(doc, url) {
	var node = getNode(doc);
	if (node) {
		return 'newspaperArticle';
	}
}

function getNode(doc) {
	var node = null;
	var nodes = doc.getElementsByClassName('recent');
	if (nodes) {
		for (var i=0,ilen=nodes.length;i<ilen;i++) {
			if (nodes[i].classList.contains('post')) {
				node = nodes[i];
				break;
			}
		}
	}
	return node;
}

function doWeb(doc, url) {
	var newItem = new Zotero.Item('newspaperArticle');
	var node = getNode(doc).cloneNode(true);
	
	// get/set date
	var dateNode = node.getElementsByClassName('time')[0];
	newItem.date = dateNode.textContent;
	node.removeChild(dateNode);

	// get/set title
	var titleNode = node.getElementsByTagName('h2')[0];
	newItem.title = titleNode.textContent;
	node.removeChild(titleNode);
	
	// get/set publication (wire service)
	var publication = 'US Frontline News';
	var text = node.textContent;
	var m = text.match(/.*?【(.*?)】/);
	if (m) {
		publication = m[1];
	}
	newItem.publication = publication;

	// create attachment
	var attachmentDoc = Zotero.Utilities.composeDoc(doc,newItem.title,node);
	if (attachmentDoc) {
		newItem.attachments.push(
			{
				title:newItem.title,
				document:attachmentDoc,
				snapshot:true,
				url:url
			});
	}

	newItem.complete();
	// set service
	// set URL
	// cast attachment
	// save and done
}
