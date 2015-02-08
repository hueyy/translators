{
	"translatorID": "6a3e392d-1284-4c81-89b9-4994a2d8a290",
	"label": "CourtListener",
	"creator": "Frank Bennett",
	"target": "https://www.courtlistener.com/(opinion/[0-9]+/|\\?q=.*type=o[^a]).*",
	"minVersion": "1.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "g",
	"lastUpdated": "2015-01-07 14:53:59"
}

function detectWeb(doc, url) {
	if (url.match(/^https:\/\/www\.courtlistener\.com\/\?q=.*/)) {
		return "multiple";
	} else {
		return "case";
	}
}

var clStub = "https://courtlistener.com";

var cite_types = [
	'federal_cite_one',
	'federal_cite_three',
	'federal_cite_two',
	'lexis_cite',
	'neutral_cite',
	'scotus_early_cite',
	'specialty_cite_one',
	'state_cite_one',
	'state_cite_regional',
	'state_cite_three',
	'state_cite_two',
	'westlaw_cite'
]

var court_ids = {"afcca": ["us:c;air.force.court.criminal.appeals", "Air Force Court of Criminal Appeals"], "akb": ["us:c9:ak.d;bankruptcy.court", "Bankruptcy Court"], "akd": ["us:c9:ak.d;district.court", "District Court"], "ala": ["us:al;supreme.court", "Supreme Court"], "alacivapp": ["us:al;court.civil.appeals", "Court of Civil Appeals"], "alacrimapp": ["us:al;court.criminal.appeals", "Court of Criminal Appeals"], "alactapp": ["us:al;court.appeals", "Court of Appeals"], "alaska": ["us:ak;supreme.court", "Supreme Court"], "alaskactapp": ["us:ak;court.appeals", "Court of Appeals"], "almb": ["us:c11:al.md;bankruptcy.court", "Bankruptcy Court"], "almd": ["us:c11:al.md;district.court", "District Court"], "alnb": ["us:c11:al.nd;bankruptcy.court", "Bankruptcy Court"], "alnd": ["us:c11:al.nd;district.court", "District Court"], "alsb": ["us:c11:al.sd;bankruptcy.court", "Bankruptcy Court"], "alsd": ["us:c11:al.sd;district.court", "District Court"], "arb": ["us:c9:az.d;bankruptcy.court", "Bankruptcy Court"], "areb": ["us:c8:ar.ed;bankruptcy.court", "Bankruptcy Court"], "ared": ["us:c8:ar.ed;district.court", "District Court"], "ariz": ["us:az;supreme.court", "Supreme Court"], "arizctapp": ["us:az;court.appeals", "Court of Appeals"], "ariztaxct": ["us:az;tax.court", "Tax Court"], "ark": ["us:ar;supreme.court", "Supreme Court"], "arkctapp": ["us:ar;court.appeals", "Court of Appeals"], "armfor": ["us:c;court.appeals.armed.forces", "Court of Appeals for the Armed Forces"], "arwb": ["us:c8:ar.wd;bankruptcy.court", "Bankruptcy Court"], "arwd": ["us:c8:ar.wd;district.court", "District Court"], "asbca": ["us:c;armed.services.board.contract.appeals", "Armed Services Board of Contract Appeals"], "azd": ["us:c9:az.d;district.court", "District Court"], "bap1": ["us:c1;bankruptcy.appellate.panel", "Bankruptcy Appellate Panel"], "bap10": ["us:c10;bankruptcy.appellate.panel", "Bankruptcy Appellate Panel"], "bap2": ["us:c2;bankruptcy.appellate.panel", "Bankruptcy Appellate Panel"], "bap6": ["us:c6;bankruptcy.appellate.panel", "Bankruptcy Appellate Panel"], "bap8": ["us:c8;bankruptcy.appellate.panel", "Bankruptcy Appellate Panel"], "bap9": ["us:c9;bankruptcy.appellate.panel", "Bankruptcy Appellate Panel"], "bapma": ["us:ma;bankruptcy.appellate.panel", "Bankruptcy Appellate Panel"], "bva": ["us:c;board.veterans.appeals", "Board of Veterans' Appeals"], "ca1": ["us:c1;court.appeals", "Court of Appeals"], "ca10": ["us:c10;court.appeals", "Court of Appeals"], "ca11": ["us:c11;court.appeals", "Court of Appeals"], "ca2": ["us:c2;court.appeals", "Court of Appeals"], "ca3": ["us:c3;court.appeals", "Court of Appeals"], "ca4": ["us:c4;court.appeals", "Court of Appeals"], "ca5": ["us:c5;court.appeals", "Court of Appeals"], "ca6": ["us:c6;court.appeals", "Court of Appeals"], "ca7": ["us:c7;court.appeals", "Court of Appeals"], "ca8": ["us:c8;court.appeals", "Court of Appeals"], "ca9": ["us:c9;court.appeals", "Court of Appeals"], "cacb": ["us:c9:ca.cd;bankruptcy.court", "Bankruptcy Court"], "cacd": ["us:c9:ca.cd;district.court", "District Court"], "cadc": ["us:c0;court.appeals", "Court of Appeals for the D.C. Circuit"], "caeb": ["us:c9:ca.ed;bankruptcy.court", "Bankruptcy Court"], "caed": ["us:c9:ca.ed;district.court", "District Court"], "cafc": ["us:c;court.appeals.federal.circuit", "Court of Appeals for the Federal Circuit"], "cal": ["us:ca;supreme.court", "Supreme Court"], "calctapp": ["us:ca;court.appeal", "Court of Appeal"], "californiad": ["us:c9:ca.d;district.court", "District Court"], "canalzoned": ["us:c5:pz.d;district.court", "District Court"], "canb": ["us:c9:ca.nd;bankruptcy.court", "Bankruptcy Court"], "cand": ["us:c9:ca.nd;district.court", "District Court"], "casb": ["us:c9:ca.sd;bankruptcy.court", "Bankruptcy Court"], "casd": ["us:c9:ca.sd;district.court", "District Court"], "cavc": ["us:c;court.appeals.veterans.claims", "Court of Appeals for Veterans Claims"], "cc": ["us:c;court.claims", "Court of Claims"], "ccpa": ["us:c;court.customs.patent.appeals", "Court of Customs and Patent Appeals"], "cit": ["us:c;court.international.trade", "Court of International Trade"], "cjdpa": ["us:pa;court.judicial.discipline", "Court of Judicial Discipline"], "cob": ["us:c10:co.d;bankruptcy.court", "Bankruptcy Court"], "cod": ["us:c10:co.d;district.court", "District Court"], "colo": ["us:co;supreme.court", "Supreme Court"], "coloctapp": ["us:co;court.appeals", "Court of Appeals"], "com": ["us:c;commerce.court", "Commerce Court"], "conn": ["us:ct;supreme.court", "Supreme Court"], "connappct": ["us:ct;appellate.court", "Appellate Court"], "connsuperct": ["us:ct;superior.court", "Superior Court"], "ctb": ["us:c2:ct.d;bankruptcy.court", "Bankruptcy Court"], "ctd": ["us:c2:ct.d;district.court", "District Court"], "cusc": ["us:c;customs.court", "Customs Court"], "dc": ["us:dc;court.appeals", "Court of Appeals"], "dcb": ["us:c0:dc.d;bankruptcy.court", "Bankruptcy Court"], "dcd": ["us:c0:dc.d;district.court", "District Court"], "deb": ["us:c3:de.d;bankruptcy.court", "Bankruptcy Court"], "ded": ["us:c3:de.d;district.court", "District Court"], "del": ["us:de;supreme.court", "Supreme Court"], "delch": ["us:de;court.chancery", "Court of Chancery"], "delctcompl": ["us:de;court.common.pleas", "Court of Common Pleas"], "delfamct": ["us:de;family.court", "Family Court"], "deljudct": ["us:de;court.judiciary", "Court on the Judiciary"], "delsuperct": ["us:de;superior.court", "Superior Court"], "eca": ["us:c;emergency.court.appeals", "Emergency Court of Appeals"], "fisc": ["us:c;foreign.intelligence.surveillance.court", "Foreign Intelligence Surveillance Court"], "fiscr": ["us:c;foreign.intelligence.surveillance.court.review", "Foreign Intelligence Surveillance Court of Review"], "fla": ["us:fl;supreme.court", "Supreme Court"], "fladistctapp": ["us:fl;district.court.appeal", "District Court of Appeal"], "flmb": ["us:c11:fl.md;bankruptcy.court", "Bankruptcy Court"], "flmd": ["us:c11:fl.md;district.court", "District Court"], "flnb": ["us:c11:fl.nd;bankruptcy.court", "Bankruptcy Court"], "flnd": ["us:c11:fl.nd;district.court", "District Court"], "flsb": ["us:c11:fl.sd;bankruptcy.court", "Bankruptcy Court"], "flsd": ["us:c11:fl.sd;district.court", "District Court"], "ga": ["us:ga;supreme.court", "Supreme Court"], "gactapp": ["us:ga;court.appeals", "Court of Appeals"], "gamb": ["us:c11:ga.md;bankruptcy.court", "Bankruptcy Court"], "gamd": ["us:c11:ga.md;district.court", "District Court"], "ganb": ["us:c11:ga.nd;bankruptcy.court", "Bankruptcy Court"], "gand": ["us:c11:ga.nd;district.court", "District Court"], "gasb": ["us:c11:ga.sd;bankruptcy.court", "Bankruptcy Court"], "gasd": ["us:c11:ga.sd;district.court", "District Court"], "gub": ["us:c9:gu.d;bankruptcy.court", "Bankruptcy Court"], "gud": ["us:c9:gu.d;district.court", "District Court"], "haw": ["us:hi;supreme.court", "Supreme Court"], "hawapp": ["us:hi;intermediate.court.appeals", "Intermediate Court of Appeals"], "hib": ["us:c9:hi.d;bankruptcy.court", "Bankruptcy Court"], "hid": ["us:c9:hi.d;district.court", "District Court"], "ianb": ["us:c8:ia.nd;bankruptcy.court", "Bankruptcy Court"], "iand": ["us:c8:ia.nd;district.court", "District Court"], "iasb": ["us:c8:ia.sd;bankruptcy.court", "Bankruptcy Court"], "iasd": ["us:c8:ia.sd;district.court", "District Court"], "idaho": ["us:id;supreme.court", "Supreme Court"], "idahoctapp": ["us:id;court.appeals", "Court of Appeals"], "idb": ["us:c9:id.d;bankruptcy.court", "Bankruptcy Court"], "idd": ["us:c9:id.d;district.court", "District Court"], "ilcb": ["us:c7:il.cd;bankruptcy.court", "Bankruptcy Court"], "ilcd": ["us:c7:il.cd;district.court", "District Court"], "ill": ["us:il;supreme.court", "Supreme Court"], "illappct": ["us:il;appellate.court", "Appellate Court"], "illinoisd": ["us:c7:il.d;district.court", "District Court"], "illinoised": ["us:c7:il.ed;district.court", "District Court"], "ilnb": ["us:c7:il.nd;bankruptcy.court", "Bankruptcy Court"], "ilnd": ["us:c7:il.nd;district.court", "District Court"], "ilsb": ["us:c7:il.sd;bankruptcy.court", "Bankruptcy Court"], "ilsd": ["us:c7:il.sd;district.court", "District Court"], "ind": ["us:in;supreme.court", "Supreme Court"], "indctapp": ["us:in;court.appeals", "Court of Appeals"], "indianad": ["us:c7:in.d;district.court", "District Court"], "indtc": ["us:in;tax.court", "Tax Court"], "innb": ["us:c7:in.nd;bankruptcy.court", "Bankruptcy Court"], "innd": ["us:c7:in.nd;district.court", "District Court"], "insb": ["us:c7:in.sd;bankruptcy.court", "Bankruptcy Court"], "insd": ["us:c7:in.sd;district.court", "District Court"], "iowa": ["us:ia;supreme.court", "Supreme Court"], "iowactapp": ["us:ia;court.appeals", "Court of Appeals"], "jpml": ["us:c;judicial.panel.multidistrict.litigation", "Judicial Panel on Multidistrict Litigation"], "kan": ["us:ks;supreme.court", "Supreme Court"], "kanctapp": ["us:ks;court.appeals", "Court of Appeals"], "ksb": ["us:c10:ks.d;bankruptcy.court", "Bankruptcy Court"], "ksd": ["us:c10:ks.d;district.court", "District Court"], "ky": ["us:ky;supreme.court", "Supreme Court"], "kyctapp": ["us:ky;court.appeals", "Court of Appeals"], "kyeb": ["us:c6:ky.ed;bankruptcy.court", "Bankruptcy Court"], "kyed": ["us:c6:ky.ed;district.court", "District Court"], "kywb": ["us:c6:ky.wd;bankruptcy.court", "Bankruptcy Court"], "kywd": ["us:c6:ky.wd;district.court", "District Court"], "la": ["us:la;supreme.court", "Supreme Court"], "lactapp": ["us:la;court.appeal", "Court of Appeal"], "laeb": ["us:c5:la.ed;bankruptcy.court", "Bankruptcy Court"], "laed": ["us:c5:la.ed;district.court", "District Court"], "lamb": ["us:c5:la.md;bankruptcy.court", "Bankruptcy Court"], "lamd": ["us:c5:la.md;district.court", "District Court"], "lawb": ["us:c5:la.wd;bankruptcy.court", "Bankruptcy Court"], "lawd": ["us:c5:la.wd;district.court", "District Court"], "mab": ["us:c1:ma.d;bankruptcy.court", "Bankruptcy Court"], "mad": ["us:c1:ma.d;district.court", "District Court"], "mass": ["us:ma;supreme.judicial.court", "Supreme Judicial Court"], "massappct": ["us:ma;appeals.court", "Appeals Court"], "mc": ["us:c;court.military.commission.review", "Court of Military Commission Review"], "md": ["us:md;court.appeals", "Court of Appeals"], "mdb": ["us:c4:md.d;bankruptcy.court", "Bankruptcy Court"], "mdctspecapp": ["us:md;court.special.appeals", "Court of Special Appeals"], "mdd": ["us:c4:md.d;district.court", "District Court"], "me": ["us:me;supreme.judicial.court", "Supreme Judicial Court"], "meb": ["us:c1:me.d;bankruptcy.court", "Bankruptcy Court"], "med": ["us:c1:me.d;district.court", "District Court"], "mich": ["us:mi;supreme.court", "Michigan Supreme Court"], "michctapp": ["us:mi;court.appeals", "Michigan Court of Appeals"], "mieb": ["us:c8:mn.d;bankruptcy.court", "Bankruptcy Court"], "mied": ["us:c8:mn.d;district.court", "District Court"], "minn": ["us:mn;supreme.court", "Supreme Court"], "minnctapp": ["us:mn;court.appeals", "Court of Appeals"], "miss": ["us:ms;supreme.court", "Supreme Court"], "missctapp": ["us:ms;court.appeals", "Court of Appeals"], "miwb": ["us:c6:mi.wd;bankruptcy.court", "Bankruptcy Court"], "miwd": ["us:c6:mi.wd;district.court", "District Court"], "mnb": ["us:c6:mi.ed;bankruptcy.court", "Bankruptcy Court"], "mnd": ["us:c6:mi.ed;district.court", "District Court"], "mo": ["us:mo;supreme.court", "Supreme Court"], "mocd": ["us:c8:mo.cd;district.court", "District Court"], "moctapp": ["us:mo;court.appeals", "Court of Appeals"], "moeb": ["us:c8:mo.ed;bankruptcy.court", "Bankruptcy Court"], "moed": ["us:c8:mo.ed;district.court", "District Court"], "mont": ["us:mt;supreme.court", "Supreme Court"], "mosd": ["us:c8:mo.sd;district.court", "District Court"], "mowb": ["us:c8:mo.wd;bankruptcy.court", "Bankruptcy Court"], "mowd": ["us:c8:mo.wd;district.court", "District Court"], "msnb": ["us:c5:ms.nd;bankruptcy.court", "Bankruptcy Court"], "msnd": ["us:c5:ms.nd;district.court", "District Court"], "mspb": ["us:c;merit.systems.protection.board", "Merit Systems Protection Board"], "mssb": ["us:c5:ms.sd;bankruptcy.court", "Bankruptcy Court"], "mssd": ["us:c5:ms.sd;district.court", "District Court"], "mtb": ["us:c9:mt.d;bankruptcy.court", "Bankruptcy Court"], "mtd": ["us:c9:mt.d;district.court", "District Court"], "nc": ["us:nc;supreme.court", "Supreme Court"], "ncctapp": ["us:nc;court.appeals", "Court of Appeals"], "nceb": ["us:c4:nc.ed;bankruptcy.court", "Bankruptcy Court"], "nced": ["us:c4:nc.ed;district.court", "District Court"], "ncmb": ["us:c4:nc.md;bankruptcy.court", "Bankruptcy Court"], "ncmd": ["us:c4:nc.md;district.court", "District Court"], "ncwb": ["us:c4:nc.wd;bankruptcy.court", "Bankruptcy Court"], "ncwd": ["us:c4:nc.wd;district.court", "District Court"], "nd": ["us:nd;supreme.court", "Supreme Court"], "ndb": ["us:c8:nd.d;bankruptcy.court", "Bankruptcy Court"], "ndctapp": ["us:nd;court.appeals", "Court of Appeals"], "ndd": ["us:c8:nd.d;district.court", "District Court"], "neb": ["us:ne;supreme.court", "Supreme Court"], "nebctapp": ["us:ne;court.appeals", "Court of Appeals"], "nebraskab": ["us:c8:ne.d;bankruptcy.court", "Bankruptcy Court"], "ned": ["us:c8:ne.d;district.court", "District Court"], "nev": ["us:nv;supreme.court", "Supreme Court"], "nh": ["us:nh;supreme.court", "Supreme Court"], "nhb": ["us:c1:nh.d;bankruptcy.court", "Bankruptcy Court"], "nhd": ["us:c1:nh.d;district.court", "District Court"], "nj": ["us:nj;supreme.court", "Supreme Court"], "njb": ["us:c3:nj.d;bankruptcy.court", "Bankruptcy Court"], "njd": ["us:c3:nj.d;district.court", "District Court"], "njsuperctappdiv": ["us:nj;superior.court", "Superior Court"], "njtaxct": ["us:nj;tax.court", "Tax Court"], "nm": ["us:nm;supreme.court", "Supreme Court"], "nmb": ["us:c10:nm.d;bankruptcy.court", "Bankruptcy Court"], "nmcca": ["us:c;navy-marine.corps.court.criminal.appeals", "Navy-Marine Corps Court of Criminal Appeals"], "nmctapp": ["us:nm;court.appeals", "Court of Appeals"], "nmd": ["us:c10:nm.d;district.court", "District Court"], "nmib": ["us:c9:mp.d;bankruptcy.court", "Bankruptcy Court"], "nmid": ["us:c9:mp.d;district.court", "District Court"], "nvb": ["us:c9:nv.d;bankruptcy.court", "Bankruptcy Court"], "nvd": ["us:c9:nv.d;district.court", "District Court"], "ny": ["us:ny;court.appeals", "Court of Appeals"], "nyappdiv": ["us:ny;appellate.division.supreme.court.state", "Appellate Division of the Supreme Court of the State"], "nyeb": ["us:c2:ny.ed;bankruptcy.court", "Bankruptcy Court"], "nyed": ["us:c2:ny.ed;district.court", "District Court"], "nyfamct": ["us:ny;family.court", "Family Court"], "nynb": ["us:c2:ny.nd;bankruptcy.court", "Bankruptcy Court"], "nynd": ["us:c2:ny.nd;district.court", "District Court"], "nysb": ["us:c2:ny.sd;bankruptcy.court", "Bankruptcy Court"], "nysd": ["us:c2:ny.sd;district.court", "District Court"], "nysurct": ["us:ny;surrogates.court", "Surrogate's Court"], "nywb": ["us:c2:ny.wd;bankruptcy.court", "Bankruptcy Court"], "nywd": ["us:c2:ny.wd;district.court", "District Court"], "ohio": ["us:oh;supreme.court", "Supreme Court"], "ohioctapp": ["us:oh;court.appeals", "Court of Appeals"], "ohioctcl": ["us:oh;court.claims", "Court of Claims"], "ohiod": ["us:c6:oh.d;district.court", "District Court"], "ohnb": ["us:c6:oh.nd;bankruptcy.court", "Bankruptcy Court"], "ohnd": ["us:c6:oh.nd;district.court", "District Court"], "ohsb": ["us:c6:oh.sd;bankruptcy.court", "Bankruptcy Court"], "ohsd": ["us:c6:oh.sd;district.court", "District Court"], "okeb": ["us:c10:ok.ed;bankruptcy.court", "Bankruptcy Court"], "oked": ["us:c10:ok.ed;district.court", "District Court"], "okla": ["us:ok;supreme.court", "Supreme Court"], "oklaag": ["us:ok;attorney.general.reports", "Attorney General Reports"], "oklacivapp": ["us:ok;court.civil.appeals", "Court of Civil Appeals"], "oklacoj": ["us:ok;court.judiciary", "Court on the Judiciary"], "oklacrimapp": ["us:ok;court.criminal.appeals", "Court of Criminal Appeals"], "oklajeap": ["us:ok;judicial.ethics.advisory.panel", "Judicial Ethics Advisory Panel"], "oknb": ["us:c10:ok.nd;bankruptcy.court", "Bankruptcy Court"], "oknd": ["us:c10:ok.nd;district.court", "District Court"], "okwb": ["us:c10:ok.wd;bankruptcy.court", "Bankruptcy Court"], "okwd": ["us:c10:ok.wd;district.court", "District Court"], "or": ["us:or;supreme.court", "Supreme Court"], "orb": ["us:c9:or.d;bankruptcy.court", "Bankruptcy Court"], "orctapp": ["us:or;court.appeals", "Court of Appeals"], "ord": ["us:c9:or.d;district.court", "District Court"], "pa": ["us:pa;supreme.court", "Supreme Court"], "pacommwct": ["us:pa;commonwealth.court", "Commonwealth Court"], "paeb": ["us:c3:pa.ed;bankruptcy.court", "Bankruptcy Court"], "paed": ["us:c3:pa.ed;district.court", "District Court"], "pamb": ["us:c3:pa.md;bankruptcy.court", "Bankruptcy Court"], "pamd": ["us:c3:pa.md;district.court", "District Court"], "pasuperct": ["us:pa;superior.court", "Superior Court"], "pawb": ["us:c3:pa.wd;bankruptcy.court", "Bankruptcy Court"], "pawd": ["us:c3:pa.wd;district.court", "District Court"], "pennsylvaniad": ["us:c3:pa.d;district.court", "District Court"], "prb": ["us:c1:pr.d;bankruptcy.court", "Bankruptcy Court"], "prd": ["us:c1:pr.d;district.court", "District Court"], "reglrailreorgct": ["us:c;special.court.regional.rail.reorganization.act", "Special Court under the Regional Rail Reorganization Act"], "ri": ["us:ri;supreme.court", "Supreme Court"], "rib": ["us:c1:ri.d;bankruptcy.court", "Bankruptcy Court"], "rid": ["us:c1:ri.d;district.court", "District Court"], "sc": ["us:sc;supreme.court", "Supreme Court"], "scb": ["us:c4:sc.d;bankruptcy.court", "Bankruptcy Court"], "scctapp": ["us:sc;court.appeals", "Court of Appeals"], "scd": ["us:c4:sc.d;district.court", "District Court"], "scotus": ["us;supreme.court", "Supreme Court"], "sd": ["us:sd;supreme.court", "Supreme Court"], "sdb": ["us:c8:sd.d;bankruptcy.court", "Bankruptcy Court"], "sdd": ["us:c8:sd.d;district.court", "District Court"], "stp": ["us:pa;special.tribunal", "Special Tribunal"], "tax": ["us:c;tax.court", "Tax Court"], "tecoa": ["us:c;temporary.emergency.court.appeals", "Temporary Emergency Court of Appeals"], "tenn": ["us:tn;supreme.court", "Supreme Court"], "tenncrimapp": ["us:tn;court.criminal.appeals", "Court of Criminal Appeals"], "tennctapp": ["us:tn;court.appeals", "Court of Appeals"], "tennessed": ["us:c6:tn.d;district.court", "District Court"], "tennesseeb": ["us:c6:tn.d;bankruptcy.court", "Bankruptcy Court"], "tex": ["us:tx;supreme.court", "Supreme Court"], "texapp": ["us:tx;court.appeals", "Court of Appeals"], "texcrimapp": ["us:tx;court.criminal.appeals", "Court of Criminal Appeals"], "texreview": ["us:tx;special.court.review", "Special Court of Review"], "tneb": ["us:c6:tn.ed;bankruptcy.court", "Bankruptcy Court"], "tned": ["us:c6:tn.ed;district.court", "District Court"], "tnmb": ["us:c6:tn.md;bankruptcy.court", "Bankruptcy Court"], "tnmd": ["us:c6:tn.md;district.court", "District Court"], "tnwb": ["us:c6:tn.wd;bankruptcy.court", "Bankruptcy Court"], "tnwd": ["us:c6:tn.wd;district.court", "District Court"], "txeb": ["us:c5:tx.ed;bankruptcy.court", "Bankruptcy Court"], "txed": ["us:c5:tx.ed;district.court", "District Court"], "txnb": ["us:c5:tx.nd;bankruptcy.court", "Bankruptcy Court"], "txnd": ["us:c5:tx.nd;district.court", "District Court"], "txsb": ["us:c5:tx.sd;bankruptcy.court", "Bankruptcy Court"], "txsd": ["us:c5:tx.sd;district.court", "District Court"], "txwb": ["us:c5:tx.wd;bankruptcy.court", "District Court"], "txwd": ["us:c5:tx.wd;district.court", "District Court"], "uscfc": ["us:c;court.federal.claims", "Court of Federal Claims"], "usjc": ["us:c;judicial.conference.committee", "Judicial Conference Committee"], "utah": ["us:ut;supreme.court", "Supreme Court"], "utahctapp": ["us:ut;court.appeals", "Court of Appeals"], "utb": ["us:c10:ut.d;bankruptcy.court", "Bankruptcy Court"], "utd": ["us:c10:ut.d;district.court", "District Court"], "va": ["us:va;supreme.court", "Supreme Court"], "vactapp": ["us:va;court.appeals", "Court of Appeals"], "vaeb": ["us:c4:va.ed;bankruptcy.court", "Bankruptcy Court"], "vaed": ["us:c4:va.ed;district.court", "District Court"], "vawb": ["us:c4:va.wd;bankruptcy.court", "Bankruptcy Court"], "vawd": ["us:c4:va.wd;district.court", "District Court"], "vib": ["us:c3:vi.d;bankruptcy.court", "Bankruptcy Court"], "vid": ["us:c3:vi.d;district.court", "District Court"], "vt": ["us:vt;supreme.court", "Supreme Court"], "vtb": ["us:c2:vt.d;bankruptcy.court", "Bankruptcy Court"], "vtd": ["us:c2:vt.d;district.court", "District Court"], "waeb": ["us:c9:wa.ed;bankruptcy.court", "Bankruptcy Court"], "waed": ["us:c9:wa.ed;district.court", "District Court"], "wash": ["us:wa;supreme.court", "Supreme Court"], "washctapp": ["us:wa;court.appeals", "Court of Appeals"], "wawb": ["us:c9:wa.wd;bankruptcy.court", "Bankruptcy Court"], "wawd": ["us:c9:wa.wd;district.court", "District Court"], "wieb": ["us:c7:wi.ed;bankruptcy.court", "Bankruptcy Court"], "wied": ["us:c7:wi.ed;district.court", "District Court"], "wis": ["us:wi;supreme.court", "Supreme Court"], "wisctapp": ["us:wi;court.appeals", "Court of Appeals"], "wiwb": ["us:c7:wi.wd;bankruptcy.court", "Bankruptcy Court"], "wiwd": ["us:c7:wi.wd;district.court", "District Court"], "wva": ["us:wv;supreme.court", "Supreme Court"], "wvnb": ["us:c4:wv.nd;bankruptcy.court", "District Court"], "wvnd": ["us:c4:wv.nd;district.court", "District Court"], "wvsb": ["us:c4:wv.sd;bankruptcy.court", "Bankruptcy Court"], "wvsd": ["us:c4:wv.sd;district.court", "District Court"], "wyb": ["us:c10:wy.d;bankruptcy.court", "Bankruptcy Court"], "wyd": ["us:c10:wy.d;district.court", "District Court"], "wyo": ["us:wy;supreme.court", "Supreme Court"]}

function doWeb (doc, url) {
	if ("multiple" == detectWeb(doc, url)) {
		var items = getMultiple(doc);
		Zotero.selectItems(items, function (items) {
			if (!items) {
				return true;
			}
			var caseURLs = [];
			for (var i in items) {
				caseURLs.push(i);
			}
			ZU.processDocuments(caseURLs, acquireCase);
		});
	} else {
		acquireCase(doc, url)		
	}
}

function getMultiple(doc) {
	var res = ZU.xpath(doc, '//a[@class="visitable"][contains(@href,"/opinion/")]');
	if (!res.length) return false;
	var items = {};
	for (var i = 0; i < res.length; i++) {
		items[res[i].href] = ZU.trimInternal(res[i].textContent);
	}
	return items;
}
			 

function acquireCase (doc, url) {
	var mydoc = doc;
	m = url.match(/[^0-9]+([0-9]+).*/);
	var clNumber = m[1];
	var clCaseURL = clStub + "/api/rest/v2/document/" + clNumber + "/?format=json&fields=court,date_filed,citation__resource_uri";
	ZU.doGet(clCaseURL, function(text) {
		var clCase = JSON.parse(text);
		var clCourtURL = clStub + clCase.court + "?format=json";
		ZU.doGet(clCourtURL, function (text) {
			var clCourt = JSON.parse(text);
			var clCitationURL = clStub + clCase.citation.resource_uri + "?format=json";
			ZU.doGet(clCitationURL, function (text) {
				clCitation = JSON.parse(text);
				// Save as an unreported case only if there are no other records.
				// After collecting the items, cross-relate everything.
				var jLst = court_ids[clCourt.id][0].split(";");
				var jurisdictionID = jLst[0];
				var courtID = jLst[1];
				var courtName = court_ids[clCourt.id][1];
				var caseName = clCitation.case_name;
				if (caseName) {
					caseName = caseName.replace(/[\s(]*$/, "");
				}
				var dateDecided = clCase.date_filed;
				var docketNumber = clCitation.docket_number;
				var items = [];
				for (var i=0,ilen=cite_types.length; i<ilen; i++) {
					if (clCitation[cite_types[i]]) {
						var cite = clCitation[cite_types[i]];
						var m = cite.match(/^([0-9]+\s+)*(.*?)\s+([0-9]+)$/)
						if (m) {
							var volume = m[1];
							var reporter = m[2];
							var page = m[3]
							var item = new Zotero.Item("case");
							item.itemID = "" + i;
							item.caseName = caseName;
							item.court = courtID;
							item.docketNumber = docketNumber;
							item.dateDecided = dateDecided;
							item.reporter = reporter
							item.firstPage = page;
							item.url = url;
							item.archive = 'CourtListener';
							item.archiveLocation = clNumber;
							item.extra = "{:jurisdiction: " + jurisdictionID + "}";
							if (Zotero.isMLZ && dateDecided && volume) {
								// If year equals year of decision,
								// set as year-as-volume instead of volume.
								var mm = dateDecided.match(/^([0-9]{4}).*/);
								if (mm) {
									var yearDecided = parseInt(mm[1], 10);
									var volume = parseInt(volume, 10);
									if (volume == yearDecided) {
										item.yearAsVolume = volume;
									} else {
										item.reporterVolume = volume;
									}
								}
							} else {
								item.volume = volume;
							}
							items.push(item);
						}
					}
				}
				if (items.length === 0) {
					// if no cite, set an item with unreported details only
					var item = new Zotero.Item("case");
					item.caseName = caseName;
					item.court = courtID;
					item.docketNumber = docketNumber;
					item.dateDecided = dateDecided;
					item.url = url;
					item.archive = 'CourtListener';
					item.archiveLocation = clNumber;
					item.extra = "{:jurisdiction: " + jurisdictionID + "}";
					items.push(item);
				}
				if (items.length) {
					var attachmentValue = url;
					if (Zotero.isMLZ) {
						var block = mydoc.getElementsByTagName("article");
						if (block) {
							attachmentValue = block[0];
						}
					}
					if ("string" === typeof attachmentValue) {
						items[0].attachments.push({
							title:"CourtListener Judgment", 
							type: "text/html",
							url:attachmentValue
						});
					} else {
						// String content (title, url, css)
						var title = mydoc.getElementsByTagName("title")[0].textContent;
						var css = "*{margin:0;padding:0;}div.mlz-outer{width: 60em;margin:0 auto;text-align:left;}body{text-align:center;}p{margin-top:0.75em;margin-bottom:0.75em;}div.mlz-link-button a{text-decoration:none;background:#cccccc;color:white;border-radius:1em;font-family:sans;padding:0.2em 0.8em 0.2em 0.8em;}div.mlz-link-button a:hover{background:#bbbbbb;}div.mlz-link-button{margin: 0.7em 0 0.8em 0;}pre.inline{white-space:pre;display:inline;}span.citation{white-space:pre;}";
						
						// head element
						var head = mydoc.createElement("head");
						head.innerHTML = '<title>' + title + '</title>';
						head.innerHTML += '<style type="text/css">' + css + '</style>'; 

						var attachmentDoc = ZU.composeDoc(doc, head, block);
						// Remove all but the last div element (there are two divs in article)
						var article = attachmentDoc.getElementsByTagName("article")[0];
						var divCount = 0;
						while (article.childNodes[0].tagName !== "DIV" || !divCount) {
							if (article.childNodes[0].tagName === "DIV") { 
								divCount++;
							}
							article.removeChild(article.childNodes[0]);
						}
						items[0].attachments.push({
							title:"CourtListener Judgment", 
							document:attachmentDoc
						});
					}
				}
				for (var i=0,ilen=items.length; i<ilen; i++) {
					for (var j=0,jlen=items.length; j<jlen; j++) {
						if (items[j].itemID === items[i].itemID) {
							continue;
						}
						items[i].seeAlso.push(items[j].itemID);
					}
					items[i].complete();
				}
			});
		});
	});
	return true;
}/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.courtlistener.com/opinion/2766861/state-of-maine-v-jeffrey-p-wyman/?",
		"items": [
			{
				"itemType": "case",
				"caseName": "State of Maine v. Jeffrey P. Wyman",
				"creators": [],
				"dateDecided": "2015-01-15",
				"court": "Supreme Judicial Court",
				"extra": "{:jurisdiction: us;state;me;supreme.judicial.court}",
				"firstPage": "1",
				"itemID": "4",
				"reporter": "ME",
				"yearAsVolume": 2015,
				"attachments": [
					{
						"title": "CourtListener Judgment"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.courtlistener.com/opinion/2766786/state-v-ayala/?",
		"items": [
			{
				"itemType": "case",
				"caseName": "State v. Ayala",
				"creators": [],
				"dateDecided": "2015-01-13",
				"court": "Appellate Court",
				"docketNumber": "AC35533",
				"extra": "{:jurisdiction: us;state;ct;appellate.court}",
				"attachments": [
					{
						"title": "CourtListener Judgment"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/