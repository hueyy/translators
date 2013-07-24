{
	"translatorID": "093ad11d-291f-4ed4-a406-23fd2a4de95f",
	"label": "Legislation of Mongolia",
	"creator": "Frank Bennett",
	"target": "https?://(www.)*legalinfo.mn/law",
	"minVersion": "1.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "g",
	"lastUpdated": "2013-07-24 08:59:33"
}

function Engine () {
    this.map = {
        source: {
            "Монгол Улсын хууль": {
                code: "27",
                type: "statute",
                english: "Statutes",
                boilerplate: {},
                children: {}
            },
            "Улсын Их Хурлын тогтоол": {
                code: "28",
                english: "Resolutions of the state Great Khural",
                type: "bill",
                boilerplate: {
                    resolutionLabel: {
                        mn: "Улсын Их Хурлын тогтоол [??? -- singular form -- ???]",
                        en: "Resolution of the state Great Khural"
                    }
                },
                children: {}
            },
            "Монгол Улсын олон улсын гэрээ": {
                code: "29",
                english: "Mongolian international treaties",
                type: "treaty",
                boilerplate: {},
                children: {
                    "Гадаад харилцааг зохион байгуулах": {
                        code: "138",
                        english: "[???]"
                    },
                    
                    "Гэмт хэрэг болон терроризмтай хийх олон улсын тэмцэл": {
                        code: "139",
                        english: "[???]"
                    },
                    
                    "Дипломат болон консулын эрх зүй": {
                        code: "140",
                        english: "[???]"
                    },
                    
                    "Зэвсэгт мөргөлдөөн ба олон улсын эрх зүй": {
                        code: "141",
                        english: "[???]"
                    },
                    
                    "Нийгэм-соёлын салбарын олон улсын хамтын ажиллагаа": {
                        code: "142",
                        english: "[???]"
                    },
                    
                    "Нутаг дэвсгэр": {
                        code: "143",
                        english: "[???]"
                    },
                    
                    "Олон улсын агаарын эрх зүй": {
                        code: "144",
                        english: "[???]"
                    },
                    
                    "Олон улсын аюулгүй байдлын эрх зүй": {
                        code: "145",
                        english: "[???]"
                    },
                    
                    "Олон улсын байгууллага ба холбоо": {
                        code: "146",
                        english: "[???]"
                    },
                    
                    "Олон улсын гэрээний эрх зүй": {
                        code: "147",
                        english: "[???]"
                    },
                    
                    "Олон улсын далайн эрх зүй": {
                        code: "148",
                        english: "[???]"
                    },
                    
                    "Олон улсын сансрын эрх зүй": {
                        code: "149",
                        english: "[???]"
                    },
                    
                    "Олон улсын харилцааны нийтлэг асуудал": {
                        code: "150",
                        english: "[???]"
                    },
                    
                    "Олон улсын шинжлэх ухаан техникийн хамтын ажиллагаа": {
                        code: "151",
                        english: "[???]"
                    },
                    
                    "Олон улсын эдийн засгийн хамтын ажиллагаа": {
                        code: "152",
                        english: "[???]"
                    },
                    
                    "Улсын эрх залгамжлал": {
                        code: "153",
                        english: "[???]"
                    },
                    
                    "Хүн ам": {
                        code: "154",
                        english: "[???]"
                    },
                    
                    "Хүний эрхийн олон улсын хамгаалалт": {
                        code: "155",
                        english: "[???]"
                    },
                    
                    "Хүрээлэн буй орчны олон улсын эрх зүйн хамгаалалт": {
                        code: "156",
                        english: "[???]"
                    },
                    
                    "Цэрэг, дайны асуудлаархи хамтын ажиллагаа": {
                        code: "157",
                        english: "[???]"
                    }
                }
            },
            "Ерөнхийлөгчийн зарлиг": {
                code: "30",
                english: "Decrees of the president",
                type: "regulation",
                boilerplate: {
                    regulatoryBody: {
                        mn: "[???]",
                        en: "President"
                    },
                    regulationType: {
                        mn: "[???]",
                        en: "Presidential Decree"
                    }
                },
                children: {}
            },
            "Үндсэн хуулийн цэцийн шийдвэр": {
                code: "31",
                english: "Decisions of the Constitutional Tsets",
                type: "case",
                boilerplate: {},
                children: {
                    "Тогтоол": {
                        code: "тогтоол",
                        english: "[???]"
                    },
                    
                    "Дүгнэлт": {
                        code: "дүгнэлт",
                        english: "[???]"
                    }
                }
            },
            "Улсын дээд шүүхийн тогтоол": {
                code: "32",
                english: "Resolutions of the Supreme Court",
                type: "bill",
                boilerplate: {},
                children: {}
            },
            "Засгийн газрын тогтоол": {
                code: "33",
                english: "Resolutions of the government",
                type: "bill",
                boilerplate: {},
                children: {}
            },
            "Сайдын тушаал": {
                code: "34",
                english: "Ministerial ordinances",
                type: "regulation",
                boilerplate: {},
                children: {
                    "Гадаад харилцааны яам": {
                        code: "95",
                        english: "[???]"
                    },

                    "Сангийн яам": {
                        code: "96",
                        english: "[???]"
                    },

                    "Хууль зүй, дотоод хэргийн яам": {
                        code: "97",
                        english: "[???]"
                    },

                    "Байгаль орчин, аялал жуулчлалын яам": {
                        code: "98",
                        english: "[???]"
                    },

                    "Батлан хамгаалах яам": {
                        code: "99",
                        english: "[???]"
                    },

                    "Боловсрол, соёл шинжлэх ухааны яам": {
                        code: "100",
                        english: "[???]"
                    },

                    "Зам тээвэр, аялал жуулчлалын яам": {
                        code: "101",
                        english: "[???]"
                    },

                    "Нийгмийн хамгаалал, хөдөлмөрийн яам": {
                        code: "102",
                        english: "[???]"
                    },

                    "Эрдэс баялаг, эрчим хүчний яам": {
                        code: "103",
                        english: "[???]"
                    },

                    "Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яам": {
                        code: "104",
                        english: "[???]"
                    },

                    "Барилга, хот байгуулалтын яам": {
                        code: "105",
                        english: "[???]"
                    },

                    "Түлш, эрчим хүчний яам": {
                        code: "106",
                        english: "[???]"
                    },

                    "Эрүүл мэндийн яам": {
                        code: "107",
                        english: "[???]"
                    },

                    "Дэд бүтцийн яам": {
                        code: "158",
                        english: "[???]"
                    },

                    "Зам тээвэр, барилга, хот байгуулалтын яам": {
                        code: "159",
                        english: "[???]"
                    },

                    "Байгаль орчны яам": {
                        code: "160",
                        english: "[???]"
                    },

                    "Гадаад хэргийн яам": {
                        code: "161",
                        english: "[???]"
                    },

                    "Үйлдвэр, худалдааны яам": {
                        code: "162",
                        english: "[???]"
                    },

                    "Санхүү, эдийн засгийн яам": {
                        code: "163",
                        english: "[???]"
                    },

                    "Гэгээрлийн яам": {
                        code: "164",
                        english: "[???]"
                    }
                }
            },
            "Засгийн газрын агентлагийн даргын тушаал": {
                code: "35",
                english: "Ordinances of administrative agency chiefs",
                type: "regulation",
                boilerplate: {},
                children: {
                    "Биеийн тамир, спортын хороо": {
                        code: "137",
                        english: "[???]"
                    },

                    "Мэдээлэл, харилцаа холбоо, технологийн газар": {
                        code: "108",
                        english: "[???]"
                    },

                    "Тагнуулын ерөнхий газар": {
                        code: "109",
                        english: "[???]"
                    },

                    "Төрийн өмчийн хороо": {
                        code: "110",
                        english: "[???]"
                    },

                    "Стандартчилал, хэмжил зүйн төв": {
                        code: "111",
                        english: "[???]"
                    },

                    "Шударга бус өрсөлдөөнийг хянан зохицуулах газар": {
                        code: "112",
                        english: "[???]"
                    },

                    "Хил хамгаалах ерөнхий газар": {
                        code: "113",
                        english: "[???]"
                    },

                    "Цагдаагийн ерөнхий газар": {
                        code: "114",
                        english: "[???]"
                    },

                    "Газрын харилцаа, геодези, зураг зүйн газар": {
                        code: "115",
                        english: "[???]"
                    },

                    "Зэвсэгт хүчний жанжин штаб": {
                        code: "116",
                        english: "[???]"
                    },

                    "Улсын мэргэжлийн хяналтын газар": {
                        code: "117",
                        english: "[???]"
                    },

                    "Онцгой байдлын ерөнхий газар": {
                        code: "118",
                        english: "[???]"
                    },

                    "Оюуны өмчийн газар": {
                        code: "119",
                        english: "[???]"
                    },

                    "Хүүхдийн төлөө үндэсний газар": {
                        code: "120",
                        english: "[???]"
                    },

                    "Удирдлагын академи": {
                        code: "121",
                        english: "[???]"
                    },

                    "Төр, засгийн үйлчилгээ, аж ахуйг эрхлэх газар": {
                        code: "122",
                        english: "[???]"
                    },

                    "Дипломат байгууллагын үйлчилгээ, аж ахуйн газар": {
                        code: "123",
                        english: "[???]"
                    },

                    "Улсын гаалийн ерөнхий газар": {
                        code: "124",
                        english: "[???]"
                    },

                    "Үндэсний татварын ерөнхий газар": {
                        code: "125",
                        english: "[???]"
                    },

                    "Иргэний бүртгэл мэдээллийн улсын төв": {
                        code: "126",
                        english: "[???]"
                    },

                    "Үндэсний архивын газар": {
                        code: "127",
                        english: "[???]"
                    },

                    "Шүүхийн шийдвэр гүйцэтгэх ерөнхий газар": {
                        code: "128",
                        english: "[???]"
                    },

                    "Усны хэрэг эрхлэх газар": {
                        code: "129",
                        english: "[???]"
                    },

                    "Цаг уур, орчны шинжилгээний газар": {
                        code: "130",
                        english: "[???]"
                    },

                    "Иргэний нисэхийн ерөнхий газар": {
                        code: "131",
                        english: "[???]"
                    },

                    "Төмөр замын Хэрэг эрхлэх газар": {
                        code: "132",
                        english: "[???]"
                    },

                    "Ашигт малтмал, газрын тосны Хэрэг эрхлэх газар": {
                        code: "133",
                        english: "[???]"
                    },

                    "Гадаадын хөрөнгө оруулалтын газар": {
                        code: "134",
                        english: "[???]"
                    },

                    "Улсын нийгмийн даатгалын ерөнхий газар": {
                        code: "135",
                        english: "[???]"
                    },

                    "Хөдөлмөр, халамжийн үйлчилгээний газар": {
                        code: "136",
                        english: "[???]"
                    }
                }
            },
            "УИХ-аас томилогддог байгууллагын дарга, түүнтэй адилтгах албан тушаалтны шийдвэр": {
                code: "36",
                english: "Ordinances of chiefs of organizations established by the state Great Khural",
                type: "regulation",
                boilerplate: {},
                children: {
                    "Монгол банк": {
                        code: "87",
                        english: "[???]"
                    },

                    "Төрийн албаны зөвлөл": {
                        code: "88",
                        english: "[???]"
                    },

                    "Сонгуулийн ерөнхий хороо": {
                        code: "89",
                        english: "[???]"
                    },

                    "Авилгатай тэмцэх газар": {
                        code: "90",
                        english: "[???]"
                    },

                    "Үндэсний статистикийн газар": {
                        code: "91",
                        english: "[???]"
                    },

                    "Хүний эрхийн үндэсний комисс": {
                        code: "92",
                        english: "[???]"
                    },

                    "Үндэсний аудитын газар": {
                        code: "93",
                        english: "[???]"
                    },

                    "Санхүүгийн зохицуулах хороо": {
                        code: "94",
                        english: "[???]"
                    }
                }
            },
            "Аймаг, нийслэлийн ИТХ-ын шийдвэр": {
                code: "37",
                english: "Decisions of aimag and capital city representative khurals",
                type: "case",
                boilerplate: {},
                children: {
                    "Архангай аймаг": {
                        code: "65",
                        english: "[???]"
                    },

                    "Баян-Өлгий аймаг": {
                        code: "66",
                        english: "[???]"
                    },

                    "Баянхонгор аймаг": {
                        code: "67",
                        english: "[???]"
                    },

                    "Булган аймаг": {
                        code: "68",
                        english: "[???]"
                    },

                    "Говь-Алтай аймаг": {
                        code: "69",
                        english: "[???]"
                    },

                    "Говьсүмбэр аймаг": {
                        code: "70",
                        english: "[???]"
                    },

                    "Дархан-Уул аймаг": {
                        code: "71",
                        english: "[???]"
                    },

                    "Дорноговь аймаг": {
                        code: "72",
                        english: "[???]"
                    },

                    "Дорнод аймаг": {
                        code: "73",
                        english: "[???]"
                    },

                    "Дундговь аймаг": {
                        code: "74",
                        english: "[???]"
                    },

                    "Завхан аймаг": {
                        code: "75",
                        english: "[???]"
                    },

                    "Орхон аймаг": {
                        code: "76",
                        english: "[???]"
                    },

                    "Сэлэнгэ аймаг": {
                        code: "77",
                        english: "[???]"
                    },

                    "Сүхбаатар аймаг": {
                        code: "78",
                        english: "[???]"
                    },

                    "Төв аймаг": {
                        code: "79",
                        english: "[???]"
                    },

                    "Увс аймаг": {
                        code: "80",
                        english: "[???]"
                    },

                    "Улаанбаатар": {
                        code: "81",
                        english: "[???]"
                    },

                    "Ховд аймаг": {
                        code: "82",
                        english: "[???]"
                    },

                    "Хэнтий аймаг": {
                        code: "83",
                        english: "[???]"
                    },

                    "Хөвсгөл аймаг": {
                        code: "84",
                        english: "[???]"
                    },

                    "Өвөрхангай аймаг": {
                        code: "85",
                        english: "[???]"
                    },

                    "Өмнөговь аймаг": {
                        code: "86",
                        english: "[???]"
                    }
                }
            },
            "Аймаг, нийслэлийн Засаг даргын захирамж": {
                code: "38",
                english: "Ordinances of aimag and capital city governors",
                type: "regulation",
                boilerplate: {},
                children: {
                    "Архангай аймаг": {
                        code: "39",
                        english: "[???]"
                    },

                    "Баян-Өлгий аймаг": {
                        code: "40",
                        english: "[???]"
                    },

                    "Баянхонгор аймаг": {
                        code: "41",
                        english: "[???]"
                    },

                    "Булган аймаг": {
                        code: "46",
                        english: "[???]"
                    },

                    "Говь-Алтай аймаг": {
                        code: "47",
                        english: "[???]"
                    },

                    "Говьсүмбэр аймаг": {
                        code: "48",
                        english: "[???]"
                    },

                    "Дархан-Уул аймаг": {
                        code: "49",
                        english: "[???]"
                    },

                    "Дорноговь аймаг": {
                        code: "50",
                        english: "[???]"
                    },

                    "Дорнод аймаг": {
                        code: "51",
                        english: "[???]"
                    },

                    "Дундговь аймаг": {
                        code: "52",
                        english: "[???]"
                    },

                    "Завхан аймаг": {
                        code: "53",
                        english: "[???]"
                    },

                    "Орхон аймаг": {
                        code: "54",
                        english: "[???]"
                    },

                    "Сэлэнгэ аймаг": {
                        code: "55",
                        english: "[???]"
                    },

                    "Сүхбаатар аймаг": {
                        code: "56",
                        english: "[???]"
                    },

                    "Төв аймаг": {
                        code: "57",
                        english: "[???]"
                    },

                    "Увс аймаг": {
                        code: "58",
                        english: "[???]"
                    },

                    "Улаанбаатар": {
                        code: "59",
                        english: "[???]"
                    },

                    "Ховд аймаг": {
                        code: "60",
                        english: "[???]"
                    },

                    "Хэнтий аймаг": {
                        code: "61",
                        english: "[???]"
                    },

                    "Хөвсгөл аймаг": {
                        code: "62",
                        english: "[???]"
                    },

                    "Өвөрхангай аймаг": {
                        code: "63",
                        english: "[???]"
                    },

                    "Өмнөговь аймаг": {
                        code: "64",
                        english: "[???]"
                    }
                }
            }
        }
    }
    this.data = {};
}

Engine.prototype.makeReverseMap = function () {
    this.reverseMap = {};
    
}

Engine.prototype.detectWeb = function (doc, url) {
    var m = url.match(/https?:\/\/(?:www\.)*legalinfo\.mn\/law(\/details)*.*/);
    if (m) {
        if (m[1]) {
            return this.getTypeFromDocument(doc);
        } else {
            return "multiple";
        }
    }
}

Engine.prototype.getRealType = function (url) {
    var m = url.match(/https?:\/\/(?:www\.)*legalinfo\.mn\/law(?:(\/details)|.*cat=([0-9]*))*.*/);
    if (m) {
        if (m[1]) {
            this.data.type = this.getTypeFromDocument(doc);
        } else if (m[2]) {
            this.data.type = this.getType(m[2]);
        }
    }
}

Engine.prototype.getTypeFromDocument = function (doc) {
    var category = false;
    var crumbs = ZU.xpath(doc,'//h2[@class="crumbs"]/a');
    if (crumbs.length > 1) {
        category = crumbs.slice(1,2)[0].textContent;
        return this.getType(category);
    }
}


Engine.prototype.getType = function (str) {
    return this.map.source[str];
}

Engine.prototype.getItemList = function (doc) {
    var rows = ZU.xpath(doc, '//div[@id="page-container"]//div[@id="datagrid"]//div[contains(@class,"tbd")]/div[contains(@class,"row")]');
    var items = {};
    for (i=0,ilen=rows.length;i<ilen;i+=1) {
        var children = rows[i].childNodes;
        var u = children[2].childNodes[0].getAttribute("href");
        var t = children[2].childNodes[0].textContent;
        items[u] = t;
    }
    return items;
}

Engine.prototype.selectedItemsCallback = function (urls) {
    for (var i=0,ilen=urls.length;i<ilen;i+=1) {
        
    }
}

function detectWeb(doc,url) {
    var engine = new Engine();
    return engine.detectWeb(doc, url);
}
    
function doWeb(doc, url) {
    var engine = new Engine();
    engine.getRealType(url);
    var displayType = engine.detectWeb(doc, url);
    if (displayType === "multiple") {

        var elems = ZU.xpath(doc, '//select[@id="fsubcategory"]/option');
        for (var i=0,ilen=elems.length;i<ilen;i+=1) {
            Zotero.debug("XXX >> \""+elems[i].textContent.replace(/\s*$/,"")+"\": {\n                             code: \""+elems[i].getAttribute("value")+"\",\n                             english: \"[???]\"\n                             },");
        }

        var callback = engine.selectedItemsCallback;
        var items = [];
        Zotero.selectItems(engine.getItemList(doc), function (chosen) {
	        for (var j in chosen) {
		        items.push(j);
	        }
	        callback(items);
        });
    } else {
        // callback
    }
}
