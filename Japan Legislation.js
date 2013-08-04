{
	"translatorID": "39eb011c-5af3-404b-9ef9-93717d6d671d",
	"label": "Japan Legislation",
	"creator": "Frank Bennett",
	"target": "https?://law.e-gov.go.jp/cgi-bin/idxselect.cgi",
	"minVersion": "1.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "g",
	"lastUpdated": "2013-08-04 06:48:18"
}


function getDateAndNumber(txt) {
    var ret;
    var m = txt.match(/(?:ºÇ½ª²þÀµ¡§)*((ÌÀ¼£|ÂçÀµ|¾¼ÏÂ|Ê¿À®)([ÀéÉ´½½°ìÆó»°»Í¸ÞÏ»¼·È¬¶å]+)Ç¯([½½°ìÆó»°»Í¸ÞÏ»¼·È¬¶å]+)·î([½½°ìÆó»°»Í¸ÞÏ»¼·È¬¶å]+)Æü)(Ë¡Î§)Âè([ÀéÉ´½½°ìÆó»°»Í¸ÞÏ»¼·È¬¶å]+)¹æ/);

    var date = "";
    var number = "";
    if (m) {
        ret = {};
        var addifier = {
            "ÌÀ¼£": 1867,
            "ÂçÀµ": 1911,
            "¾¼ÏÂ": 1925,
            "Ê¿À®": 1988
        }
        ret.rawdate = m[1];
        ret.date = (addifier[m[2]] + convertNumber(m[3])) + "-" + convertNumber(m[4]) + "-" + convertNumber(m[5]);
        ret.number = convertNumber(m[6]);
    }
    return ret;
}


function scrapeStatute (doc, url, articles) {
    Zotero.debug("XXX articles: "+articles);
    // Get the basic statutory info:
    // * title
    // * year of latest revision
    // * year of passage
    // * law number
    // Note: some of these will be regulations, huh.
    var type = "statute";
    var topnode = ZU.xpath(doc, '//b[1]')[0];
    var html = topnode.innerHTML.replace(/\s*(.*?)\s*/, "$1");
    var lst = html.split(/<br\s*\/*>/);
    var title = lst[0];
    var version = lst.slice(-1)[0];
    var dateAndNumber = getDateAndNumber(version);
    var revnode = ZU.xpath(doc, '//div[@align="right"][1]');
    var revisionDateAndNumber;
    if (revnode && revnode[0]) {
        var txt = revnode[0].textContent;
        revisionDateAndNumber = getDateAndNumber(txt);
    }
    var ministry = "";

    var itemmaps = [];
    var itemnodes = ZU.xpath(doc, '//div[contains(@class,"item")]/b[contains(.,"Âè")][1]');
    for (var i=0,ilen=articles.length;i<ilen;i+=1) {
        var node = itemnodes[articles[i]];
        var item = new Zotero.Item(type);
        item.url = url;
        item.jurisdiction = "jp";
        item.title = title;
        if (dateAndNumber) {
            item.publicLawNumber = dateAndNumber.number;
            item.date = dateAndNumber.date;
        }
        if (revisionDateAndNumber) {
            item.extra = "Last revised " + revisionDateAndNumber.date + " by Law no. " + revisionDateAndNumber.number;
        }
        var section = node.textContent;
        var m = section.match(/\s*Âè([ÀéÉ´½½°ìÆó»°»Í¸ÞÏ»¼·È¬¶å]+)¾ò[¤ÎŽÉ]*([ÀéÉ´½½°ìÆó»°»Í¸ÞÏ»¼·È¬¶å]+)*/);
        if (m) {
            var section = "sec. " + convertNumber(m[1]);
            if (m[2]) {
                section += ("-" + convertNumber(m[2]));
            }
        }
        item.section = section;
        var docnodes = [];
        var nextnode = node.parentNode;
        while (nextnode) {
            docnodes.push(nextnode);
            nextnode = nextnode.nextSibling;
            if (nextnode) {
                var labelnode = nextnode.firstChild;
                if (labelnode) {
                    while (labelnode.nodeType!=1) {
                        labelnode = labelnode.nextSibling;
                        if (!labelnode) {
                            nextnode = false;
                            break;
                        }
                    }
                    if (labelnode && labelnode.textContent.match(/^\s*Âè/)) {
                        nextnode = false;
                    }
                }
            }
        }
        var pagetitle = node.textContent + "¡¢" + title; 
        if (revisionDateAndNumber) {
            pagetitle += "¡ÊºÇ½ª²þÀµ¡§" + revisionDateAndNumber.rawdate + "¡Ë"
        }
        var header = makeHeader(doc, pagetitle);
        var artdoc = ZU.composeDoc(doc, header, docnodes);
        item.attachments.push({document:artdoc, title:node.textContent, snapshot:true});
        item.complete();
    }
}

function makeHeader(doc, title) {
    var myns = "http://www.w3.org/1999/xhtml"
    
    // head (title and css)
    var head = doc.createElementNS(myns, "head");
    var titlenode = doc.createElementNS(myns, "title");
    head.appendChild(titlenode)

    titlenode.appendChild(doc.createTextNode(title));
    
    var style = doc.createElementNS(myns, "style");
    head.appendChild(style)
    style.setAttribute("type", "text/css")
    var css = "*{margin:0;padding:0;}div.mlz-outer{width: 60em;max-width:95%;margin:0 auto;text-align:left;}body{text-align:center;}p{margin-top:0.75em;margin-bottom:0.75em;}div.mlz-link-button a{text-decoration:none;background:#cccccc;color:white;border-radius:1em;font-family:sans;padding:0.2em 0.8em 0.2em 0.8em;}div.mlz-link-button a:hover{background:#bbbbbb;}div.mlz-link-button{margin: 0.7em 0 0.8em 0;}div{margin:1em 0 1em 0;}";
    style.appendChild(doc.createTextNode(css));
    return head;
}

function convertNumber (str) {
    var num = 0;
    var multipliers = {
        "Àé": 1000,
        "É´": 100,
        "½½": 10
    }
    var numbers = ["meh","°ì","Æó","»°","»Í","¸Þ","Ï»","¼·","È¬","¶å"];
    var working = "";
    var lst = str.split("");
    for (var i=0,ilen=lst.length;i<ilen;i+=1) {
        if (multipliers[lst[i]]) {
            if (!working) {
                working = "1";
            }
            num += (parseInt(working, 10)*multipliers[lst[i]]);
            working = "";
        } else if (numbers.indexOf(lst[i]) > -1) {
            working += numbers.indexOf(lst[i]);
        }
    }
    if (working) {
        num += parseInt(working, 10);
    }
    return num;
}

function buildItemList (doc, items) {
    var itemnodes = ZU.xpath(doc, '//div[contains(@class,"item")]/b[contains(.,"Âè")][1]');
    var lastnum = 0;
    for (var j=0,jlen=itemnodes.length;j<jlen;j+=1) {
        var title = itemnodes[j].textContent;
        var m = title.match(/^\s*Âè([ÀéÉ´½½°ìÆó»°»Í¸ÞÏ»¼·È¬¶å]+)¾ò[¤ÎŽÉ]*([ÀéÉ´½½°ìÆó»°»Í¸ÞÏ»¼·È¬¶å]+)*/);
        if (m) {
            var num = convertNumber(m[1]);
            if (num < lastnum) {
                break;
            }
            lastnum = num;
        } else {
            continue;
        }
        items[j] = title;
    }
}

function detectWeb (doc, url) {
	return "multiple";
}

function doWeb (doc, url) {
    var frames = doc.getElementsByTagName("frame");
    for (var i=0,ilen=frames.length;i<ilen;i+=1) {
        if (frames[i].getAttribute("name") === "data") {
            var realurl = frames[i].getAttribute("src");
            ZU.processDocuments(
                [realurl],
                function (doc, url) {
                    var items = {};
                    buildItemList(doc, items);
                    Zotero.selectItems(items, function (chosen) {
                        var articles = [];
	                    for (var j in chosen) {
		                    articles.push(j);
	                    };
                        scrapeStatute(doc, url, articles);
                    });
                },
                function(){}
            );
            break;
        }
    }
}