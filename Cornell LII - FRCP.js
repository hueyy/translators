{
	"translatorID": "97d6f922-9835-44c4-a3ac-bb039a2359a5",
	"translatorType": 4,
	"label": "Cornell LII - US Code",
	"creator": "Frank Bennett",
	"target": "https?://(?:www.)law.cornell.edu/rules/frcp/rule_[-0-9]",
	"minVersion": "1.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"browserSupport": "g",
	"lastUpdated": "2013-07-22 05:01:36"
}


function detectWeb(doc, url) {
    return "regulation";
}


function doWeb(doc, url) {
    var titleNode = doc.getElementsByTagName("title")[0];
    var title = titleNode.textContent;
    title = title.replace(/\s+\|.*/, "");
    var m = title.match(/^Rule\s+([.0-9]+)\.\s+(.*)/);
    var ruleNumber, ruleTitle;
    if (m) {
        ruleNumber = m[1];
        ruleTitle = m[2];
    }
    var year;
    var returnNodes = [];
    var contentBody = doc.getElementsByClassName("content")[0];
    for (var i=0,ilen=contentBody.childNodes.length;i<ilen;i+=1) {
        Zotero.debug("XXX type? " + contentBody.childNodes[i] + " " + typeof contentBody.childNodes[i]);
        var cls = contentBody.childNodes[i].getAttribute("class");
        m = cls.match(/^(statutory|note|source)/);
        if (m) {
            returnNodes.push(contentBody.childNodes[i]);
            if (m[1] === "source") {
                var mm = contentBody.childNodes[i].match(/.*([0-9]{4})/)
                if (mm) {
                    year = mm[1];
                }
            }
        }
    }
    
    // head (title and css)
    var head = doc.createElement("head");
    var titlenode = doc.createElement("title");
    head.appendChild(titlenode)
    titlenode.appendChild(doc.createTextNode("Federal Rules of Civil Procedure (Cornell LII): Rule " + ruleNumber + ": " + ruleTitle));

    var style = doc.createElement("style");
    head.appendChild(style)
    style.setAttribute("type", "text/css")
    var css = "*{margin:0;padding:0;}div.mlz-outer{width: 60em;margin:0 auto;text-align:left;}body{text-align:center;}p{margin-top:0.75em;margin-bottom:0.75em;}div.mlz-link-button a{text-decoration:none;background:#cccccc;color:white;border-radius:1em;font-family:sans;padding:0.2em 0.8em 0.2em 0.8em;}div.mlz-link-button a:hover{background:#bbbbbb;}div.mlz-link-button{margin: 0.7em 0 0.8em 0;}";
    style.appendChild(doc.createTextNode(css));

    var attachmentdoc = ZU.composeDoc(doc, head, returnNodes);
    var item = new Zotero.Item("regulation");
    // Set title
    item.title = "Federal Rules of Civil Procedure";
    // Set section
    item.section = ruleNumber;
    // Set year -- last-listed year in source-credit node
    item.year = year;
    // Jurisdiction
    item.jurisdiction = "us";
    // Language
    item.language = "en";
    item.complete();
    Zotero.done();
}
