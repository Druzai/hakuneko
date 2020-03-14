import Connector from '../engine/Connector.mjs';
import Manga from '../engine/Manga.mjs';

export default class TuMangaOnline extends Connector {

    constructor() {
        super();
        super.id = 'tumangaonline';
        super.label = 'TuMangaOnline';
        this.tags = [ 'manga', 'spanish' ];
        this.url = 'https://lectortmo.com';
        this.requestOptions.headers.set('x-referer', this.url);
    }

    async _initializeConnector() {
        await super._initializeConnector();
        await this.wait(2500);
    }

    async _getMangaFromURI(uri) {
        let request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, 'head title');
        let id = uri.pathname + uri.search;
        let title = data[0].textContent.split('- Manga -').shift().trim();
        return new Manga(this, id, title);
    }

    async _getMangas() {
        let request = new Request('http://cdn.hakuneko.download/' + this.id + '/mangas.json', this.requestOptions);
        let response = await fetch(request);
        return await response.json();
    }

    async _getChapters(manga) {
        let script = `
            const _0x3405=['wqRONkLDvA==','N3TCkQpRw7EuYMKUwoXDrcO+w5HDusOAIVXDmRNuw6hvX8OOwq3CrcOaIEfDsHhbCMOcw78kfjdoJMOPwpAcaADCjg==','GwTCgVvCgw==','BWfDmAXDgA==','XMOAw5UTVA==','fixVSMOs','DcO6w5IVwqxW','wrfDjcOMMcOkw5VAwpJRw7trMA8r','cMOQEGQr','wrzDsA4Uwr1PwqUldT4=','wpxbwqBFwrY=','EVgKw5jChQ==','w6zDnBAdwog=','w7QTecK9wqVGHgbCi0nCqcOYwrdpBj8Dw7U=','S8O7M0MR','VcOrw7MCfw==','EcKAaMO4ewsKRMK4Z8K4','LsOhwoDDj8KF','w7Row4PDpQ==','ZsOaTWPCjg==','w4LDncOPw5p6','W0MUGMOb','wpEZwqvDvMOb','Ci1bwq/Diw==','YXZCLcO8D8KEDjvCgCPDvHcaw4lDO0I6UsKEHsO6G0QQw5/ClMKHw4HCnAVy','w5oww6xHJcKPYg==','emllw5UU','w4t4LUfCp17CtRE=','wqLDsh8=','wr/ChBDDr2Br','V1N/w5AX','w6RBYsKpIQ==','wp8ZwpnCvg==','bX1xw58c','wpbDmSM0wpU=','w54Vw7/DtTI=','fMKsJUAO','P8KpEMK5GQ==','wrIPwoPDr8Oq','D8OPOh/CiQ==','wq1kMmLDtg==','cC3Cj1k=','KzHCu2jCtA==','b8OgS3DCtw==','DjbCm3I=','w4nDnsOEw4tG','A8OvPRY=','wqrDlAY7wog=','TsKvbcO2wpTDg8OKO8KS','w50jw4nDkw8=','GHrDghHDng==','w6zCkxvDusOeEcOCwp7ChcK3wpZpBMKiwpEGQkTDiw1hwp01YUA1VsKAwq3CsTN5BsOBw7HDtw==','w7rCk1TDqsOFPsOTwofChQ==','SsOwaFc=','wrjCiBDDl2x1wqEhCcKc','VcKDAnzCvw==','wrHDq8OzBcOh','wrvDozkxwpY=','DMO/AQTCsg==','MgJrwrbDhg==','wpdgwoDDu00=','EU7Dsw5c','SDpEe8ON'];(function(_0x1a70f5,_0x340591){const _0x23b2db=function(_0x1a8915){while(--_0x1a8915){_0x1a70f5['push'](_0x1a70f5['shift']());}};_0x23b2db(++_0x340591);}(_0x3405,0xd3));const _0x23b2=function(_0x1a70f5,_0x340591){_0x1a70f5=_0x1a70f5-0x0;let _0x23b2db=_0x3405[_0x1a70f5];if(_0x23b2['Pumhiu']===undefined){(function(){const _0x193147=function(){let _0x52e57d;try{_0x52e57d=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x5d474c){_0x52e57d=window;}return _0x52e57d;};const _0x41ccfd=_0x193147();const _0x6f4d17='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x41ccfd['atob']||(_0x41ccfd['atob']=function(_0x776519){const _0x298371=String(_0x776519)['replace'](/=+$/,'');let _0x14bd36='';for(let _0x11af67=0x0,_0x4995d7,_0x67d8af,_0x4b64e2=0x0;_0x67d8af=_0x298371['charAt'](_0x4b64e2++);~_0x67d8af&&(_0x4995d7=_0x11af67%0x4?_0x4995d7*0x40+_0x67d8af:_0x67d8af,_0x11af67++%0x4)?_0x14bd36+=String['fromCharCode'](0xff&_0x4995d7>>(-0x2*_0x11af67&0x6)):0x0){_0x67d8af=_0x6f4d17['indexOf'](_0x67d8af);}return _0x14bd36;});}());const _0x4f936c=function(_0x5a7202,_0x5c8159){let _0x39b1a4=[],_0x2cfc61=0x0,_0x6ba44c,_0x422324='',_0x1caaa1='';_0x5a7202=atob(_0x5a7202);for(let _0x27b236=0x0,_0x257937=_0x5a7202['length'];_0x27b236<_0x257937;_0x27b236++){_0x1caaa1+='%'+('00'+_0x5a7202['charCodeAt'](_0x27b236)['toString'](0x10))['slice'](-0x2);}_0x5a7202=decodeURIComponent(_0x1caaa1);let _0x3435cb;for(_0x3435cb=0x0;_0x3435cb<0x100;_0x3435cb++){_0x39b1a4[_0x3435cb]=_0x3435cb;}for(_0x3435cb=0x0;_0x3435cb<0x100;_0x3435cb++){_0x2cfc61=(_0x2cfc61+_0x39b1a4[_0x3435cb]+_0x5c8159['charCodeAt'](_0x3435cb%_0x5c8159['length']))%0x100;_0x6ba44c=_0x39b1a4[_0x3435cb];_0x39b1a4[_0x3435cb]=_0x39b1a4[_0x2cfc61];_0x39b1a4[_0x2cfc61]=_0x6ba44c;}_0x3435cb=0x0;_0x2cfc61=0x0;for(let _0x21e73e=0x0;_0x21e73e<_0x5a7202['length'];_0x21e73e++){_0x3435cb=(_0x3435cb+0x1)%0x100;_0x2cfc61=(_0x2cfc61+_0x39b1a4[_0x3435cb])%0x100;_0x6ba44c=_0x39b1a4[_0x3435cb];_0x39b1a4[_0x3435cb]=_0x39b1a4[_0x2cfc61];_0x39b1a4[_0x2cfc61]=_0x6ba44c;_0x422324+=String['fromCharCode'](_0x5a7202['charCodeAt'](_0x21e73e)^_0x39b1a4[(_0x39b1a4[_0x3435cb]+_0x39b1a4[_0x2cfc61])%0x100]);}return _0x422324;};_0x23b2['BCITDV']=_0x4f936c;_0x23b2['jFzpUD']={};_0x23b2['Pumhiu']=!![];}const _0x1a8915=_0x23b2['jFzpUD'][_0x1a70f5];if(_0x1a8915===undefined){if(_0x23b2['nlLKgU']===undefined){_0x23b2['nlLKgU']=!![];}_0x23b2db=_0x23b2['BCITDV'](_0x23b2db,_0x340591);_0x23b2['jFzpUD'][_0x1a70f5]=_0x23b2db;}else{_0x23b2db=_0x1a8915;}return _0x23b2db;};new Promise(_0x5f2533=>{const _0x312faf={};_0x312faf[_0x23b2('0x1b','q8p1')]=_0x23b2('0x7','KZHN');_0x312faf[_0x23b2('0x12','C*J6')]=function(_0x1a6952,_0x4eeb48){return _0x1a6952(_0x4eeb48);};_0x312faf[_0x23b2('0x1','wY%q')]=_0x23b2('0x2','mtmK');_0x312faf[_0x23b2('0x31','pdac')]=_0x23b2('0x6','$iwO');_0x312faf[_0x23b2('0x19','$iwO')]=_0x23b2('0x32','$iwO');_0x312faf[_0x23b2('0x23','$iwO')]=function(_0x22feac,_0x336b33){return _0x22feac(_0x336b33);};_0x312faf[_0x23b2('0x27','e50D')]=_0x23b2('0x1d','O&Oi');_0x312faf[_0x23b2('0x8','tlDd')]=_0x23b2('0x1a','Rz)0');_0x312faf[_0x23b2('0x24','*e5P')]=_0x23b2('0x2a','e50D');_0x312faf[_0x23b2('0x2e','*LG1')]=function(_0x39b514,_0x628834){return _0x39b514<_0x628834;};_0x312faf[_0x23b2('0xe','g6QC')]=_0x23b2('0x2f','7Mpu');_0x312faf[_0x23b2('0x34','KAL!')]=_0x23b2('0x16','u1tp');_0x312faf[_0x23b2('0x35','w@jm')]=function(_0x3196d0,_0x4fc199){return _0x3196d0+_0x4fc199;};_0x312faf[_0x23b2('0xb','tlDd')]=function(_0x253a41,_0x1fe51d){return _0x253a41+_0x1fe51d;};_0x312faf[_0x23b2('0x33','eVha')]=_0x23b2('0x20','KZHN');_0x312faf[_0x23b2('0x25','wY%q')]=_0x23b2('0x5','B28x');_0x312faf[_0x23b2('0x37','pdac')]=_0x23b2('0x13','e50D');const _0x289285=_0x312faf;let _0x2404aa={};_0x2404aa[_0x289285[_0x23b2('0x22','oJEW')]]=[..._0x289285[_0x23b2('0x26','rfGl')]($,_0x289285[_0x23b2('0x3e','mtmK')])][_0x289285[_0x23b2('0x15','!l]o')]](_0x466204=>$(_0x466204)[_0x23b2('0x3','zlNo')](_0x23b2('0x30','oJEW'))[_0x23b2('0x18','*e5P')]('h4')[_0x23b2('0xa','CUBD')]()[_0x23b2('0x3b','K0U&')]());_0x2404aa[_0x289285[_0x23b2('0xf','aMPc')]]=[..._0x289285[_0x23b2('0x4','tlDd')]($,_0x289285[_0x23b2('0x3d','6qZa')])][_0x289285[_0x23b2('0x9','^oBA')]](_0x284a8a=>_0x284a8a[_0x23b2('0x39','@5P$')][_0x23b2('0x1f','!l]o')]());_0x2404aa[_0x289285[_0x23b2('0x2c','xXsx')]]=[..._0x289285[_0x23b2('0x23','$iwO')]($,_0x289285[_0x23b2('0xd','q8p1')])][_0x289285[_0x23b2('0x0','&Oi^')]](_0x595fa6=>_0x595fa6[_0x23b2('0x1e','O&Oi')][_0x23b2('0x29','C*J6')](new RegExp(_0x23b2('0x36','zIPJ')))[0x1]);let _0x197134=[];for(let _0x3057dc=0x0;_0x289285[_0x23b2('0x14','u1tp')](_0x3057dc,_0x2404aa[_0x289285[_0x23b2('0x2d','@2B@')]][_0x289285[_0x23b2('0x3c','!l]o')]]);_0x3057dc++){_0x197134[_0x289285[_0x23b2('0x17','6qZa')]]({'id':_0x3057dc,'title':_0x289285[_0x23b2('0x10','&Oi^')](_0x289285[_0x23b2('0x38','@2B@')](_0x289285[_0x23b2('0x28','*LG1')](_0x2404aa[_0x289285[_0x23b2('0x3a','Xf)!')]][_0x3057dc],'\x20['),_0x2404aa[_0x289285[_0x23b2('0x2b','u1tp')]][_0x3057dc]),']'),'language':_0x2404aa[_0x289285[_0x23b2('0xc','$iwO')]][_0x3057dc]});}this[_0x289285[_0x23b2('0x1c','xXsx')]](()=>_0x5f2533(_0x197134),this[_0x289285[_0x23b2('0x21','Z9!w')]](_0x289285[_0x23b2('0x11','*e5P')]));});
       `;
        let request = new Request(this.url + manga.id, this.requestOptions);
        return await Engine.Request.fetchUI(request, script);
    }

    async _getChapterLink(chapter) {
        let script = `
            window['chapter'] = ${chapter.id};
            const _0x1e30=['QkBhw5XDrQ==','w5nDv3zDh3Y=','RcONwqItwps=','wrDCsF/DgzQ=','w6EWd3ko','KyRjwrTDsA==','w75MVEnDkQ==','wrZ1w4wKwqo=','NsKCwrs9wpHDpw==','BV3ClDc=','wr5Ew6oqwpM=','IcO7w53DiMO8','GxtTwp7Dqg==','w5LCkyArBA==','w4IISXoU','QzfChcKqKQ==','w6PCthsywos=','FsO/FWhk','NjEZbG8=','wppdw48Zwoc=','NMKgWwPDrE7DlyDCnw==','EQtLw6rCpw==','aW9swqHDng==','KiMjcXg=','XsOSw5LDrBM=','WDPCq8OGeQ==','a395w7zDoQ==','B8OiCCd7w7zDl8OZwrZuGE7DmkNuO8Kv','DCgc','wrlVw5A6woM=','w6stwoUvwrHClXE=','XTHDncOoQsORw6cpX8O0wrjDmMKkwpoWw6vDksOpwoZKw4wqw7rDisOQwr0LAsOCw5nCu1xyZ8Oh','IHgFSMKb','w7zDiWcIw4o=','dGlcwqzDiQ==','B8OiK2hhw7jDi8Ojw7dvGA==','eyTCoMOHWQ==','f3zCoUXDgQ==','w4Y5wpsPwoY=','H8Ojw5nDlMOaAsONFQ==','cXR+w5LDjA==','wrYxw70xwo0=','w53Crz8lwqzDkwwU','wqpNwpvChQ==','YDg0w5p2D8Ohcj/CrWQ=','w4vCrQUzFw==','RHZdwrbDng==','w5rCuiMmwqzDlBo=','w7vDim7CpxzChmvCksKUwq1u','SwXCvsKwCA==','w41jwrXCgBFBaw==','w74gXcK9w6M=','BsOjw6LDtcO8','w6lVwoDCtSg=','ccO0wqnCoDE=','w67ChxM5','wr3Cr2jDog==','OMKGwrw2wp/Dp8OW','woNJw4jDslM=','woVVw5vDvEQ=','w6/ClsKgwoTCqw==','RBfCgcOPUA==','dFF5IiU=','Fzl7wqDCqcOpwr5CRsOg','w51IIUcr','wqPCh0XCicOS','woDDrsKxb8Os','w6HCvi8gPg==','RMOAw5DDkTzDkgERcw==','w6zDrljCkDQ=','UcOKw5DDlQ==','w5soYVsK','QhIRw71W','w4QjwrEpwr4=','Hj8EfH/Dl0/CgnDDtTvDuA==','UinCo8KFDA==','wofCoGzDvwo=','Q3pOJA==','wqLDrMKEccOr','w7jCq8KRwoLCtMKpw5g=','OcOmw5PDqcOL','wqvDuUZ7wro=','OMOkL39Q','wpPCpHTCqsO+','w5l1JkAHLEdoHw3Cgj3DgzE5R3o6w70LEsKoQMK0chfDqChRw7rCmcOywpLDojPDhsO+azDDgMOtw5bDoyPCuQnDo0zCvEvCgMOpw4dnwozCnA/CrjY=','wobClUvCtsOSMMKhwpPDtcOC','L8KQwowhwqg=','VmBKKAhw','wo7Drg3CrsKM','woBVw6jDj1o=','w5vDnULCpxU=','w5ZAwodS','w7bCnQkUCw==','woQcw54BwoI=','w43Dj0ckw5w=','w4cQWcKmw7fCkVrCsmM=','BR9VwpXDoA==','w6IUSkgP','VGJKIg8=','w7dmdVbDvztVHcKkw5xHfcKjVg==','anZ5w4nDhw==','esOCwo7Csi0=','w48gwoZbw6o=','w41jwrbCnB9MfTLCo8KILQ==','w7zDhknCuADCj1DCv8KBwrFdD8ONw64=','wqvDpMKpecOI','w5U0W1QR','WmFSGz4=','emFfw5PDhA==','WsK3dgfDqA==','FMKOaj3DjQ==','OXfCkw4h','UsOIw5vDnQk=','KMKIUCPDiQ==','EsOrw5nCk8K1','FcOPAExv','HDR7wrTDvcO4wqU=','wr1rwr3DtcOS','w7jDnlYFw6M=','WX/CrlDDrQ==','Om4bUsK7','CsODBW97','wr3CsE7DuCw=','UcOKw5DDvTzDnQA=','w7nCmcKgwpfCug==','w47DlHsow5g=','w6fDl17CsQ==','W8Ovw5DDvCc=','XsOVWifCvQ==','bcOjwq3CuR0=','J8KKXy3Dmg==','URPCoMKqKA==','d1h0w7/DjQ==','w7QzSnED','WBc/','w5ZxwrXCuD4=','woFtwp/DvMOZDnDCiQ==','UwovwqfDicOQ','Y8KZbAnDhQ==','HcOAHsOhwqw=','QsOXw44=','AsOrw7vCiMK1','OUXCphMQ','KStgwq/DoA==','VmlfOQ=='];(function(_0x1cebbb,_0x1e30d5){const _0xa1edbf=function(_0x13a322){while(--_0x13a322){_0x1cebbb['push'](_0x1cebbb['shift']());}};_0xa1edbf(++_0x1e30d5);}(_0x1e30,0xdd));const _0xa1ed=function(_0x1cebbb,_0x1e30d5){_0x1cebbb=_0x1cebbb-0x0;let _0xa1edbf=_0x1e30[_0x1cebbb];if(_0xa1ed['FyCCJT']===undefined){(function(){const _0x43224c=function(){let _0xf77fe2;try{_0xf77fe2=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x4b4762){_0xf77fe2=window;}return _0xf77fe2;};const _0x1a4e03=_0x43224c();const _0x3578e2='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1a4e03['atob']||(_0x1a4e03['atob']=function(_0x4aa83f){const _0x4d2719=String(_0x4aa83f)['replace'](/=+$/,'');let _0xdc64b1='';for(let _0x38b326=0x0,_0x145184,_0x3ec553,_0x696985=0x0;_0x3ec553=_0x4d2719['charAt'](_0x696985++);~_0x3ec553&&(_0x145184=_0x38b326%0x4?_0x145184*0x40+_0x3ec553:_0x3ec553,_0x38b326++%0x4)?_0xdc64b1+=String['fromCharCode'](0xff&_0x145184>>(-0x2*_0x38b326&0x6)):0x0){_0x3ec553=_0x3578e2['indexOf'](_0x3ec553);}return _0xdc64b1;});}());const _0x16de6b=function(_0x5842f0,_0x51f750){let _0x3959d3=[],_0x2c289e=0x0,_0x28c09a,_0x452ae9='',_0x1b5cf8='';_0x5842f0=atob(_0x5842f0);for(let _0x91e022=0x0,_0x182d91=_0x5842f0['length'];_0x91e022<_0x182d91;_0x91e022++){_0x1b5cf8+='%'+('00'+_0x5842f0['charCodeAt'](_0x91e022)['toString'](0x10))['slice'](-0x2);}_0x5842f0=decodeURIComponent(_0x1b5cf8);let _0x3bc497;for(_0x3bc497=0x0;_0x3bc497<0x100;_0x3bc497++){_0x3959d3[_0x3bc497]=_0x3bc497;}for(_0x3bc497=0x0;_0x3bc497<0x100;_0x3bc497++){_0x2c289e=(_0x2c289e+_0x3959d3[_0x3bc497]+_0x51f750['charCodeAt'](_0x3bc497%_0x51f750['length']))%0x100;_0x28c09a=_0x3959d3[_0x3bc497];_0x3959d3[_0x3bc497]=_0x3959d3[_0x2c289e];_0x3959d3[_0x2c289e]=_0x28c09a;}_0x3bc497=0x0;_0x2c289e=0x0;for(let _0x47be04=0x0;_0x47be04<_0x5842f0['length'];_0x47be04++){_0x3bc497=(_0x3bc497+0x1)%0x100;_0x2c289e=(_0x2c289e+_0x3959d3[_0x3bc497])%0x100;_0x28c09a=_0x3959d3[_0x3bc497];_0x3959d3[_0x3bc497]=_0x3959d3[_0x2c289e];_0x3959d3[_0x2c289e]=_0x28c09a;_0x452ae9+=String['fromCharCode'](_0x5842f0['charCodeAt'](_0x47be04)^_0x3959d3[(_0x3959d3[_0x3bc497]+_0x3959d3[_0x2c289e])%0x100]);}return _0x452ae9;};_0xa1ed['zWjuoZ']=_0x16de6b;_0xa1ed['FsslHl']={};_0xa1ed['FyCCJT']=!![];}const _0x13a322=_0xa1ed['FsslHl'][_0x1cebbb];if(_0x13a322===undefined){if(_0xa1ed['HifyFl']===undefined){_0xa1ed['HifyFl']=!![];}_0xa1edbf=_0xa1ed['zWjuoZ'](_0xa1edbf,_0x1e30d5);_0xa1ed['FsslHl'][_0x1cebbb]=_0xa1edbf;}else{_0xa1edbf=_0x13a322;}return _0xa1edbf;};new Promise((_0x50799b,_0x229cdb)=>{const _0x2daeab={};_0x2daeab[_0xa1ed('0x7','symS')]=_0xa1ed('0x71','ZC27');_0x2daeab[_0xa1ed('0x34','j8M!')]=_0xa1ed('0x6c','gnr3');_0x2daeab[_0xa1ed('0x29','czgk')]=_0xa1ed('0x13','Lifh');_0x2daeab[_0xa1ed('0x58','Zy#g')]=_0xa1ed('0x63','1XFg');_0x2daeab[_0xa1ed('0x21','viBZ')]=function(_0x1de2dd,_0x461823){return _0x1de2dd(_0x461823);};_0x2daeab[_0xa1ed('0x5a','80f(')]=_0xa1ed('0x74','Gb0o');_0x2daeab[_0xa1ed('0x35','JSRP')]=function(_0x2f1d90,_0x29a2ce){return _0x2f1d90===_0x29a2ce;};_0x2daeab[_0xa1ed('0x1e','lH8O')]=_0xa1ed('0x1','u1Q1');_0x2daeab[_0xa1ed('0x6e','#BCA')]=_0xa1ed('0x75','7KK7');_0x2daeab[_0xa1ed('0x82','IlOK')]=_0xa1ed('0x4e','S2mj');_0x2daeab[_0xa1ed('0x30','bUsQ')]=_0xa1ed('0x40','IH9F');_0x2daeab[_0xa1ed('0x81','bUsQ')]=_0xa1ed('0x6f','Gb0o');_0x2daeab[_0xa1ed('0x80','02@X')]=_0xa1ed('0x17','(G&m');_0x2daeab[_0xa1ed('0x1d','q%ia')]=_0xa1ed('0x3a','!NVY');_0x2daeab[_0xa1ed('0x25','BF8^')]=_0xa1ed('0x3','bUsQ');_0x2daeab[_0xa1ed('0x83','u1Q1')]=_0xa1ed('0x56','RL@%');_0x2daeab[_0xa1ed('0xd','02@X')]=function(_0x497aac,_0x2fcc9e){return _0x497aac(_0x2fcc9e);};_0x2daeab[_0xa1ed('0x6b','1XFg')]=function(_0x4f189c,_0x4b9905){return _0x4f189c(_0x4b9905);};_0x2daeab[_0xa1ed('0x0','lg*v')]=_0xa1ed('0x84','WmS^');_0x2daeab[_0xa1ed('0x72','$pNk')]=_0xa1ed('0x7c','aYl6');_0x2daeab[_0xa1ed('0x1f','u1Q1')]=_0xa1ed('0x68','RL@%');_0x2daeab[_0xa1ed('0x2a','HMWR')]=_0xa1ed('0x60','RL@%');_0x2daeab[_0xa1ed('0x50','gnr3')]=_0xa1ed('0x8','ol)t');_0x2daeab[_0xa1ed('0x22','BF8^')]=function(_0x14da67,_0x335755){return _0x14da67(_0x335755);};_0x2daeab[_0xa1ed('0x67','FM(1')]=_0xa1ed('0x64','IlOK');_0x2daeab[_0xa1ed('0xe','7KK7')]=_0xa1ed('0x28','WmS^');_0x2daeab[_0xa1ed('0x3f','INxU')]=_0xa1ed('0x32','7KK7');_0x2daeab[_0xa1ed('0x5c','f2O1')]=_0xa1ed('0x8f','f2O1');_0x2daeab[_0xa1ed('0x78','Lifh')]=function(_0x16c54e,_0x253dfe){return _0x16c54e(_0x253dfe);};_0x2daeab[_0xa1ed('0x4c','Zy#g')]=_0xa1ed('0x8b','IH9F');_0x2daeab[_0xa1ed('0x51','WmS^')]=_0xa1ed('0x2f','IH9F');_0x2daeab[_0xa1ed('0x23','S2mj')]=_0xa1ed('0x1c','7KK7');_0x2daeab[_0xa1ed('0x52','$pNk')]=_0xa1ed('0x11','#BCA');_0x2daeab[_0xa1ed('0x4b','(G&m')]=function(_0x2a232f,_0x5cb961){return _0x2a232f(_0x5cb961);};_0x2daeab[_0xa1ed('0x37','VMVx')]=_0xa1ed('0x44','u1Q1');_0x2daeab[_0xa1ed('0x5e','IlOK')]=_0xa1ed('0x9','symS');_0x2daeab[_0xa1ed('0x2e','lg*v')]=_0xa1ed('0x3c','czgk');_0x2daeab[_0xa1ed('0x57','f2O1')]=_0xa1ed('0xf','#BCA');const _0x11c70e=_0x2daeab;let _0x35c8c2=$[_0x11c70e[_0xa1ed('0x37','VMVx')]];$[_0x11c70e[_0xa1ed('0x2c','TNAa')]]=_0x3b4efe=>{const _0x54b20b={};_0x54b20b[_0xa1ed('0x62','Zy#g')]=_0x11c70e[_0xa1ed('0x7b','JSRP')];_0x54b20b[_0xa1ed('0x8e','1XFg')]=_0x11c70e[_0xa1ed('0x5f',')Ufa')];_0x54b20b[_0xa1ed('0x45',')Ufa')]=_0x11c70e[_0xa1ed('0x46','gysJ')];_0x54b20b[_0xa1ed('0x49','lH8O')]=_0x11c70e[_0xa1ed('0x2b','MIi4')];_0x54b20b[_0xa1ed('0x36','BF8^')]=function(_0x29a443,_0x2bf3a7){return _0x11c70e[_0xa1ed('0x55','Gb0o')](_0x29a443,_0x2bf3a7);};_0x54b20b[_0xa1ed('0x6d',')Ufa')]=_0x11c70e[_0xa1ed('0x15','lH8O')];_0x54b20b[_0xa1ed('0x54','VMVx')]=function(_0x4e5699,_0x19aa27){return _0x11c70e[_0xa1ed('0x6','RL@%')](_0x4e5699,_0x19aa27);};const _0x569d36=_0x54b20b;if(_0x11c70e[_0xa1ed('0x14','WmS^')](_0x3b4efe[_0x11c70e[_0xa1ed('0x66','HMWR')]][_0x11c70e[_0xa1ed('0x18',')Ufa')]](),_0x11c70e[_0xa1ed('0x33','IH9F')])||_0x3b4efe[_0x11c70e[_0xa1ed('0x3e','viBZ')]][_0x11c70e[_0xa1ed('0x85','ol)t')]](_0x11c70e[_0xa1ed('0x5b','FM(1')])){let _0x2033d7=new this[_0x11c70e[(_0xa1ed('0x7a','GpBD'))]]();_0x3b4efe[_0x11c70e[_0xa1ed('0x24','IH9F')]]=()=>_0x2033d7;_0x3b4efe[_0x11c70e[_0xa1ed('0x8c','lH8O')]]=_0x52c7c8=>{let _0x1c08a0=_0x2033d7[_0x569d36[_0xa1ed('0x76','VMVx')]][_0x569d36[_0xa1ed('0x6a','MIi4')]](_0x569d36[_0xa1ed('0x26',')5S#')])||_0x2033d7[_0xa1ed('0x1b','GpBD')][_0x569d36[_0xa1ed('0x38',')Ufa')]](_0x569d36[_0xa1ed('0x86','symS')])?_0x2033d7[_0x569d36[_0xa1ed('0x65','TNAa')]]:_0x52c7c8;_0x569d36[_0xa1ed('0x8a','7KK7')](_0x50799b,_0x1c08a0[_0x569d36[_0xa1ed('0x1a','Mm11')]](_0x569d36[_0xa1ed('0x48','lg*v')],_0x569d36[_0xa1ed('0x43','WmS^')]));};_0x3b4efe[_0x11c70e[_0xa1ed('0x39','lH8O')]]=(_0x188d8b,_0x56d23a,_0xceb4fd)=>{_0x569d36[_0xa1ed('0x20',')Ufa')](_0x229cdb,_0xceb4fd);};}_0x11c70e[_0xa1ed('0x12','HMWR')](_0x35c8c2,_0x3b4efe);};this[_0x11c70e[_0xa1ed('0x79','gnr3')]](()=>{try{if(_0x11c70e[_0xa1ed('0x4f','Zy#g')]($,_0x11c70e[_0xa1ed('0x87','q%ia')])[_0x11c70e[_0xa1ed('0x42','S2mj')]]()[_0x11c70e[_0xa1ed('0x19','JSRP')]]()[_0x11c70e[_0xa1ed('0x31','HMWR')]](_0x11c70e[_0xa1ed('0x27','RL@%')])){_0x11c70e[_0xa1ed('0x47','V75%')](_0x229cdb,new Error(_0x11c70e[_0xa1ed('0xc','HtbO')]));}else{let _0x191d91=_0x11c70e[_0xa1ed('0x7f','02@X')]($,_0x11c70e[_0xa1ed('0x2d','RL@%')])[window[_0x11c70e[_0xa1ed('0x4a','WmS^')]]];if(_0x191d91[_0x11c70e[_0xa1ed('0x41',')5S#')]]&&_0x191d91[_0x11c70e[_0xa1ed('0x69','IlOK')]](_0x11c70e[_0xa1ed('0x5d','IH9F')])[_0x11c70e[_0xa1ed('0x90','VMVx')]]('/')){_0x11c70e[_0xa1ed('0x8d','ZC27')](fetch,_0x191d91[_0x11c70e[_0xa1ed('0x3b','GpBD')]])[_0xa1ed('0x7d','lg*v')](_0x139a66=>_0x50799b(_0x139a66[_0xa1ed('0x61','f2O1')][_0xa1ed('0x77','GpBD')](_0xa1ed('0x59','BF8^'),_0xa1ed('0x7e','4z)A'))))[_0xa1ed('0x16','u1Q1')](_0x27233f=>_0x229cdb(_0x27233f));}else{[..._0x11c70e[_0xa1ed('0x73','FM(1')]($,_0x11c70e[_0xa1ed('0x88','$pNk')])][_0x11c70e[_0xa1ed('0x5','pJK8')]](_0x58355b=>_0x58355b[_0xa1ed('0x3d','!NVY')]=()=>$[_0xa1ed('0x70','mM&b')]({'type':_0x58355b[_0xa1ed('0x4d','4z)A')],'url':_0x58355b[_0xa1ed('0xb','u1Q1')],'data':$(_0x58355b)[_0xa1ed('0x89','IH9F')]()}));_0x191d91[_0x11c70e[_0xa1ed('0x2','q%ia')]]();_0x191d91[_0x11c70e[_0xa1ed('0x53','lH8O')]]();}}}catch(_0x24992a){_0x11c70e[_0xa1ed('0x10','$pNk')](_0x229cdb,_0x24992a);}},this[_0x11c70e[_0xa1ed('0xa','4z)A')]](_0x11c70e[_0xa1ed('0x4','gnr3')]));});
        `;
        let request = new Request(this.url + chapter.manga.id, this.requestOptions);
        let data = await Engine.Request.fetchUI(request, script);
        return new URL(data, request.url);
    }

    async _getPages(chapter) {
        let script = `
            const _0x2c82=['w4oKwrPCszg=','w4QlwoXCnR4=','BAQ2w68pw7dSw73CkQwWcUQ=','w6gewpbCpQ4=','w5wmwog=','w7sHwqzCgSY=','w6Q+wpXCoh4=','BxI9O0oWwqTDmcKGw7LCmsK6UwXCin0IZ8KC','w7MiHgN8','w4bDq3h0wp4=','PMOaw7nDgMK0','dX7ClWQd','wptEKT5T','Bkx3V8Kg','CkTCqcOtw7A=','w75twrIcPQ==','w4rDjsKbZcOH','fiYuHVU=','wpNfAHsL','w5bDqFlq','wo5/LjdhwoUYw6w=','woXDkcKCw6jDkg==','w5QnGcKYwrk=','TsOUw73Col4=','wrQqMMOgMsOOw4jDjcOow6U=','U8Ofw6nCo0M=','w6DDncKneMOm','w6fCq3DCsXk=','ZcOpw77CtV0=','HGvCmMOHZQ==','w5I4BBtx','w4oHwoJCag==','PXxewrda','wpZ8DT5r','G8OpwpEZCg==','w5kkwrARw4E=','w7FEwqQ3AQ==','wqbChsKiAmI=','JsOfw67Duks=','wpjDkcKYf2Q=','wp95FT5Q','JMOsw6LCn21cJ2PCtMKAwp/DgH04eDt8fcOawr/Dow==','Z8ONwpfDgsOG','w6/DkVQZw7s=','wqvDksK0w77Dgw==','wpfCicKSJW3DokvCpsO1wqNzHA==','wocOLsOvXQ==','w5MOw63DniM=','wpfDhScVw50R','LcO+wogDNQ==','FjUowqjCqg==','w7rCqF1N','K05RwrVY','DyYkwrbCpg==','w680wodYY8KjwonDs8KCw6B8wq7CrMK5wqNn','w69FQRYS','CD4Pw5vDq8O7w5LDq18Ka8KKDsOBwqk5','wqjDkhoVw4Y=','w6NNwqgpOcONbMKZw79Awr3DsA==','wpnDtTXCnFxx','w5poSSsv','fwg1IVA=','AAQLw6kQ','BHllXsOm','EMOiwrg=','UWbCkcOwwqw=','LMO3wpwdCg==','wqlzDFwawpDCl0XChlY6Rg==','w4fDu1k/w6E=','wrTDtBTCsVU=','flVqYMKSw4dLw7TCmsKKAmHCukp0b8OnwpQ=','w5UAwr/ChR0=','woLDjwI5w5g=','OH9JT8Oc','FjDClsOiw7k=','w5MfETN3','BjEGw5HDog==','wrbCs8KKGWU=','wqhkHVsOwp3ClGXCtg==','Tk/CisORwoI=','Al9eRcOe','QCcxFkk=','ChYxNQlYwqjDmMKcw6fCksK9WBLDmDQMbQ==','UQDCo33Dg08ZwrI=','HjDDq1xx','wrHDrsKGw4bDgQ==','wrrClcK3DXI=','woPDiBwgDA==','JFRucMOK','w5UtBQjCvEwBw7AuwqNYw5/DsA==','w4XDhcKKVcOCwqkfF1okwqHDtVI=','w6orwrchw4g=','w5HDv0I=','wqs9J8OhMcOkw4vDlcOR','IxAKw7gS','wplMJDJA','IhvCnkbCuQ==','GU3CocO+Ww==','bzjCqnzDig==','w4c3JcKewoA=','IE5oc8OQw5Bdw6rCiw==','w7PDsMK0T8OX','w7x9wpsnOg==','w7BawqPDmkU=','PDnCiMO2w50=','wobDvgrCglw=','QMO9wrofIS4/wpjDinXClsK9T8K+w4nCv0R+w4s=','N23DrA7DkA==','I2pJb8Kq','BXd8wrA=','w6Myw5LDnCQ=','ccOIwqXDu8O1','w5LDhkBEwqU=','HHXCh8O/bg==','OnPCosOlw68=','w6FzwpPDgUk=','w7YHwoTCph8=','w5rDtsK8U8Od','Pnlpc8OP','NA7CgMO7w5E=','w6McNjZ2Qw==','FifCmMOUw58=','wp3DjTXDtQ==','w54cwrvCnh0=','ZGTCj1s2','OV/Cg8O6fw==','w7tkwqMHAw==','w7jDn3N8wqg=','wrzCscKUNE0=','wpZdEgxn','w5TDklI/dg==','GMO5w4fDrcKiwrFxHsOcwotj','w4I1w5fDhyM=','NlVDwpdy','w7p2WwEr','w4PDp8KwaMOT','TnjCisO1woM=','GcOpwp0dHg==','GGhoc8Ox','G3lawr1H','bndVfsKPOsKa','w4bDqkYqUA==','w4nDiXZuwq8=','w7XDlFQEXsOfw7o3w7Z3w7Y=','A8Ogw6LDqcK9','wofChsKJKXPDoljCt8OlwrR+VWESB8Oxw4ApJjwoU8Olw6zDpMK7D0HDvsO4CsKNfsKcwrfCq8O8w6orwpEc','w5IoDsK1wpA=','N3NVf8KFK8KjwqIlMMOs','w5o7w7nDgA==','BULCpsOFZQ==','wrg4LsOVaw==','IWLCjMOlw5HDhcKc','w4xCejUQ','ICzCqGHCvVVVXGhD','ciLCkGzDuA==','wonDuS/CuUdyJE5Uwoxew78=','w5dNwp7DnG0=','w5/Cp0DCkX0=','eE7Cp8ORwqZZWyzDpVjCg8OQwqbCgg==','w7rDmWtxwqM=','w4I8wqvCtBI=','w6bDmnE=','KQvDtGdM','wrdnL0wQ','w7twwqA0Pg==','wohyJQhw','CXF7wrpZwoPCix9d','EkbCrFEmJsKvw5/CkUY1w5DDvUREJsKTSQt7w7Q=','RgzCsmfDgkY=','wojDtTfCjFZ0','G3h7ccKu','wq1zFw==','HlJUcsOF','wrUfMsOFUg==','YsOsw6rClg==','wrzDpwYNLQ==','w6gzE8Kuwo0=','Pxwdw5IR','w5wlBg==','TRbCimfDqw==','w7MGwo0Aw50=','N8K0wr4='];(function(_0x30258f,_0x2c8220){const _0x5e2be3=function(_0x3e86f3){while(--_0x3e86f3){_0x30258f['push'](_0x30258f['shift']());}};_0x5e2be3(++_0x2c8220);}(_0x2c82,0x12e));const _0x5e2b=function(_0x30258f,_0x2c8220){_0x30258f=_0x30258f-0x0;let _0x5e2be3=_0x2c82[_0x30258f];if(_0x5e2b['ljXoTu']===undefined){(function(){let _0x381fc8;try{const _0x593fc8=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x381fc8=_0x593fc8();}catch(_0x2ccdae){_0x381fc8=window;}const _0x3a07e1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x381fc8['atob']||(_0x381fc8['atob']=function(_0x5bafe6){const _0x1ac834=String(_0x5bafe6)['replace'](/=+$/,'');let _0x4e76ab='';for(let _0xf0736e=0x0,_0x49a2e1,_0x4f62b0,_0x526cad=0x0;_0x4f62b0=_0x1ac834['charAt'](_0x526cad++);~_0x4f62b0&&(_0x49a2e1=_0xf0736e%0x4?_0x49a2e1*0x40+_0x4f62b0:_0x4f62b0,_0xf0736e++%0x4)?_0x4e76ab+=String['fromCharCode'](0xff&_0x49a2e1>>(-0x2*_0xf0736e&0x6)):0x0){_0x4f62b0=_0x3a07e1['indexOf'](_0x4f62b0);}return _0x4e76ab;});}());const _0x4a6710=function(_0x43be78,_0x47836d){let _0x4333a3=[],_0x1a01ed=0x0,_0x247b2f,_0x2abe53='',_0x3f550b='';_0x43be78=atob(_0x43be78);for(let _0x26e1b9=0x0,_0x5a7759=_0x43be78['length'];_0x26e1b9<_0x5a7759;_0x26e1b9++){_0x3f550b+='%'+('00'+_0x43be78['charCodeAt'](_0x26e1b9)['toString'](0x10))['slice'](-0x2);}_0x43be78=decodeURIComponent(_0x3f550b);let _0x47fc26;for(_0x47fc26=0x0;_0x47fc26<0x100;_0x47fc26++){_0x4333a3[_0x47fc26]=_0x47fc26;}for(_0x47fc26=0x0;_0x47fc26<0x100;_0x47fc26++){_0x1a01ed=(_0x1a01ed+_0x4333a3[_0x47fc26]+_0x47836d['charCodeAt'](_0x47fc26%_0x47836d['length']))%0x100;_0x247b2f=_0x4333a3[_0x47fc26];_0x4333a3[_0x47fc26]=_0x4333a3[_0x1a01ed];_0x4333a3[_0x1a01ed]=_0x247b2f;}_0x47fc26=0x0;_0x1a01ed=0x0;for(let _0x364c98=0x0;_0x364c98<_0x43be78['length'];_0x364c98++){_0x47fc26=(_0x47fc26+0x1)%0x100;_0x1a01ed=(_0x1a01ed+_0x4333a3[_0x47fc26])%0x100;_0x247b2f=_0x4333a3[_0x47fc26];_0x4333a3[_0x47fc26]=_0x4333a3[_0x1a01ed];_0x4333a3[_0x1a01ed]=_0x247b2f;_0x2abe53+=String['fromCharCode'](_0x43be78['charCodeAt'](_0x364c98)^_0x4333a3[(_0x4333a3[_0x47fc26]+_0x4333a3[_0x1a01ed])%0x100]);}return _0x2abe53;};_0x5e2b['jspXAs']=_0x4a6710;_0x5e2b['GRZeka']={};_0x5e2b['ljXoTu']=!![];}const _0x3e86f3=_0x5e2b['GRZeka'][_0x30258f];if(_0x3e86f3===undefined){if(_0x5e2b['gLpuMQ']===undefined){_0x5e2b['gLpuMQ']=!![];}_0x5e2be3=_0x5e2b['jspXAs'](_0x5e2be3,_0x2c8220);_0x5e2b['GRZeka'][_0x30258f]=_0x5e2be3;}else{_0x5e2be3=_0x3e86f3;}return _0x5e2be3;};new Promise((_0x4f6a77,_0x10ad25)=>{const _0x29e2b8={};_0x29e2b8[_0x5e2b('0x10','OVcM')]=_0x5e2b('0x37','lpqC');_0x29e2b8[_0x5e2b('0x55','CZnJ')]=_0x5e2b('0x23','Wo@i');_0x29e2b8[_0x5e2b('0x7c','LK4w')]=_0x5e2b('0x7e','po(N');_0x29e2b8[_0x5e2b('0xac','6[7e')]=_0x5e2b('0x78','ti*7');_0x29e2b8[_0x5e2b('0x8f','KC0$')]=_0x5e2b('0x97','MOT!');_0x29e2b8[_0x5e2b('0x1e','U0Yc')]=_0x5e2b('0x17','01dW');_0x29e2b8[_0x5e2b('0x3e','iq8y')]=_0x5e2b('0x1c','6[7e');_0x29e2b8[_0x5e2b('0x9','4%@g')]=function(_0x3f0bec,_0x244211){return _0x3f0bec>_0x244211;};_0x29e2b8[_0x5e2b('0x53','b^c$')]=_0x5e2b('0x6b','I!RN');_0x29e2b8[_0x5e2b('0xaf','CIH6')]=_0x5e2b('0x52','4%@g');_0x29e2b8[_0x5e2b('0x7a','5MZ)')]=_0x5e2b('0x1b','SCWr');_0x29e2b8[_0x5e2b('0x61','6@Ez')]=_0x5e2b('0x98','daC#');_0x29e2b8[_0x5e2b('0x8a','*IEB')]=function(_0x4d5991,_0x461175){return _0x4d5991*_0x461175;};_0x29e2b8[_0x5e2b('0x77','5S42')]=_0x5e2b('0x56','ao#!');_0x29e2b8[_0x5e2b('0xa6','dp2F')]=_0x5e2b('0x3d','CZnJ');_0x29e2b8[_0x5e2b('0x4','sEc!')]=_0x5e2b('0x81','CD]i');_0x29e2b8[_0x5e2b('0x15','01dW')]=function(_0x1a2e5d,_0x52e9be){return _0x1a2e5d>_0x52e9be;};_0x29e2b8[_0x5e2b('0x4e','daC#')]=function(_0x27edb9,_0x363e8f){return _0x27edb9(_0x363e8f);};_0x29e2b8[_0x5e2b('0xd','y2b6')]=_0x5e2b('0x1f','iP^3');_0x29e2b8[_0x5e2b('0x57','CZnJ')]=_0x5e2b('0x71','lpqC');_0x29e2b8[_0x5e2b('0x4d','ti*7')]=_0x5e2b('0x40','LK4w');_0x29e2b8[_0x5e2b('0x5d','zRNC')]=function(_0x9e1b79,_0x30ab6f){return _0x9e1b79(_0x30ab6f);};_0x29e2b8[_0x5e2b('0x75','5MZ)')]=function(_0xfd094c,_0x413369){return _0xfd094c!==_0x413369;};_0x29e2b8[_0x5e2b('0xb1',']3VB')]=_0x5e2b('0x74','zRNC');_0x29e2b8[_0x5e2b('0x69','@5N&')]=_0x5e2b('0x9b','ao#!');_0x29e2b8[_0x5e2b('0x66','4%@g')]=_0x5e2b('0x0','dAr8');_0x29e2b8[_0x5e2b('0xad','jeY4')]=function(_0x369547,_0x4b1169){return _0x369547!==_0x4b1169;};_0x29e2b8[_0x5e2b('0x64','rYMC')]=_0x5e2b('0x8c','CD]i');_0x29e2b8[_0x5e2b('0x3b','62t2')]=function(_0x1b9e4a,_0x389d09){return _0x1b9e4a===_0x389d09;};_0x29e2b8[_0x5e2b('0x1d','CIH6')]=_0x5e2b('0x2e','y2b6');_0x29e2b8[_0x5e2b('0x9d','!y$B')]=_0x5e2b('0x67','CZnJ');_0x29e2b8[_0x5e2b('0xa9','6]E7')]=_0x5e2b('0x2f','sEc!');_0x29e2b8[_0x5e2b('0x72','y2b6')]=_0x5e2b('0xa8','po(N');_0x29e2b8[_0x5e2b('0x24',']3VB')]=_0x5e2b('0x45','KC0$');_0x29e2b8[_0x5e2b('0x18','aaqP')]=_0x5e2b('0x90','KC0$');_0x29e2b8[_0x5e2b('0x8','I!RN')]=_0x5e2b('0x84','pB8y');_0x29e2b8[_0x5e2b('0x2a','0nYv')]=function(_0x8bdd5f,_0x4edc7e){return _0x8bdd5f(_0x4edc7e);};_0x29e2b8[_0x5e2b('0x68','jeY4')]=_0x5e2b('0x42','iq8y');_0x29e2b8[_0x5e2b('0x5b','CIH6')]=_0x5e2b('0x14','SCWr');_0x29e2b8[_0x5e2b('0x25','Bfgp')]=_0x5e2b('0x31','Wo@i');_0x29e2b8[_0x5e2b('0x83','Wo@i')]=function(_0xd5f905,_0x9f4984){return _0xd5f905(_0x9f4984);};_0x29e2b8[_0x5e2b('0x5f','4%@g')]=_0x5e2b('0x3a','MOT!');_0x29e2b8[_0x5e2b('0x4a','4%@g')]=function(_0x132a37,_0x1063e1){return _0x132a37(_0x1063e1);};_0x29e2b8[_0x5e2b('0x20','5MZ)')]=_0x5e2b('0x6e','5S42');_0x29e2b8[_0x5e2b('0x89','dAr8')]=_0x5e2b('0x26','OVcM');_0x29e2b8[_0x5e2b('0x3f','iq8y')]=_0x5e2b('0xa2','pB8y');_0x29e2b8[_0x5e2b('0x80','po(N')]=function(_0x48f3af,_0x13d868){return _0x48f3af(_0x13d868);};_0x29e2b8[_0x5e2b('0x9f','CIH6')]=_0x5e2b('0x19','I!RN');_0x29e2b8[_0x5e2b('0x7f','OVcM')]=_0x5e2b('0x36','CZnJ');_0x29e2b8[_0x5e2b('0x43','iq8y')]=_0x5e2b('0x51','AT6j');_0x29e2b8[_0x5e2b('0x16','AT6j')]=_0x5e2b('0x79','Wo@i');_0x29e2b8[_0x5e2b('0x44','iq8y')]=_0x5e2b('0xb','aaqP');_0x29e2b8[_0x5e2b('0x7','AT6j')]=_0x5e2b('0x76','*IEB');_0x29e2b8[_0x5e2b('0xe','5MZ)')]=_0x5e2b('0x91','62t2');_0x29e2b8[_0x5e2b('0xb3','daC#')]=_0x5e2b('0x30','62t2');_0x29e2b8[_0x5e2b('0x63','I!RN')]=_0x5e2b('0x21','njh4');_0x29e2b8[_0x5e2b('0x6','%XfN')]=_0x5e2b('0x2','Bfgp');const _0x1938a6=_0x29e2b8;this[_0x1938a6[_0x5e2b('0xb2','iq8y')]][_0x1938a6[_0x5e2b('0x93','b^c$')]](Image[_0x1938a6[_0x5e2b('0x2d','4%@g')]],_0x1938a6[_0x5e2b('0xc','6[7e')],{'get'(){return this[_0x1938a6[_0x5e2b('0x82','@5N&')]]||this[_0x1938a6[_0x5e2b('0x95','lpqC')]](_0x1938a6[_0x5e2b('0xb0','iP^3')]);},'set'(_0x228d93){this[_0x1938a6[_0x5e2b('0x4b','SCWr')]]=_0x228d93;this[_0x1938a6[_0x5e2b('0x65','noXd')]](_0x1938a6[_0x5e2b('0x13','y2b6')],_0x228d93);this[_0x1938a6[_0x5e2b('0x73','4w#t')]](new window[_0x1938a6[(_0x5e2b('0x9c','LK4w'))]](_0x1938a6[_0x5e2b('0x2c','%XfN')]));}});for(let _0x39b7bf of _0x1938a6[_0x5e2b('0x32','SCWr')]($,_0x1938a6[_0x5e2b('0x59','Bfgp')])){try{this[_0x1938a6[_0x5e2b('0x48','aaqP')]](_0x39b7bf[_0x1938a6[_0x5e2b('0x49','sEc!')]]);}finally{continue;}}this[_0x1938a6[_0x5e2b('0x5','CIH6')]][_0x1938a6[_0x5e2b('0x7b','KC0$')]]=Number[_0x1938a6[_0x5e2b('0x35','U0Yc')]];this[_0x1938a6[_0x5e2b('0x54','olTR')]][_0x1938a6[_0x5e2b('0x99','6@Ez')]](new CustomEvent(_0x1938a6[_0x5e2b('0x9e','njh4')]));function _0x600f15(_0x2e4b38){let _0x42bf84=![];if(_0x2e4b38){_0x42bf84=_0x1938a6[_0x5e2b('0xf','daC#')](_0x2e4b38[_0x1938a6[_0x5e2b('0xa4','ti*7')]],this[_0x1938a6[_0x5e2b('0x38','olTR')]]('12'))&&_0x1938a6[_0x5e2b('0x6c','U0Yc')](_0x2e4b38[_0x1938a6[_0x5e2b('0x5e','y2b6')]],this[_0x1938a6[_0x5e2b('0x6f','po(N')]]('12'));if(_0x2e4b38[_0x1938a6[_0x5e2b('0xa0','62t2')]]){_0x42bf84=_0x42bf84&&_0x1938a6[_0x5e2b('0x87','pB8y')](_0x2e4b38[_0x1938a6[_0x5e2b('0x3','iq8y')]],_0x1938a6[_0x5e2b('0x92','0nYv')](this[_0x1938a6[_0x5e2b('0x28','iq8y')]](_0x1938a6[_0x5e2b('0x58','daC#')]),_0x2e4b38[_0x1938a6[_0x5e2b('0x41','iq8y')]]));}if(_0x2e4b38[_0x1938a6[_0x5e2b('0x27','AT6j')]]){_0x42bf84=_0x42bf84&&_0x1938a6[_0x5e2b('0x70','4w#t')](_0x2e4b38[_0x1938a6[_0x5e2b('0x8d','OVcM')]],_0x1938a6[_0x5e2b('0xb5','dp2F')](this[_0x1938a6[_0x5e2b('0x2b','CD]i')]](_0x1938a6[_0x5e2b('0x39','LK4w')]),_0x2e4b38[_0x1938a6[_0x5e2b('0xa3','daC#')]]));}_0x42bf84=_0x42bf84&&_0x1938a6[_0x5e2b('0xae','AT6j')](_0x1938a6[_0x5e2b('0xa1','olTR')](getComputedStyle,_0x2e4b38)[_0x1938a6[_0x5e2b('0x5c','dAr8')]],this[_0x1938a6[_0x5e2b('0x3c','6@Ez')]](_0x1938a6[_0x5e2b('0x7d','pB8y')]));let _0x2040ba=_0x2e4b38[_0x1938a6[_0x5e2b('0xb4','pB8y')]];if(_0x2040ba){_0x42bf84=_0x42bf84&&_0x1938a6[_0x5e2b('0x8b','I!RN')](_0x600f15,_0x2040ba);_0x42bf84=_0x42bf84&&_0x1938a6[_0x5e2b('0x85','iq8y')](this[_0x1938a6[_0x5e2b('0xa','01dW')]](_0x2040ba)[_0x1938a6[_0x5e2b('0x11','po(N')]],_0x1938a6[_0x5e2b('0x66','4%@g')]);_0x42bf84=_0x42bf84&&_0x1938a6[_0x5e2b('0xaa','SCWr')](this[_0x1938a6[_0x5e2b('0x5a','CZnJ')]](_0x2040ba)[_0x1938a6[_0x5e2b('0x47','AT6j')]],_0x1938a6[_0x5e2b('0x1','dp2F')]);}}return _0x42bf84;}this[_0x1938a6[_0x5e2b('0x8e','pB8y')]](()=>{try{let _0x2b3ef0=[_0x1938a6[_0x5e2b('0x22','62t2')],_0x1938a6[_0x5e2b('0x96','pB8y')],_0x1938a6[_0x5e2b('0x4c','iP^3')],_0x1938a6[_0x5e2b('0x50','CD]i')],_0x1938a6[_0x5e2b('0x62','%XfN')],_0x1938a6[_0x5e2b('0x12','pB8y')]][_0x5e2b('0xab','y2b6')](',\x20');let _0x280eab=[..._0x1938a6[_0x5e2b('0x1a','olTR')]($,_0x2b3ef0)[_0x1938a6[_0x5e2b('0x88','dp2F')]](_0x1938a6[_0x5e2b('0x94','I!RN')])];_0x280eab=_0x280eab[_0x1938a6[_0x5e2b('0xa5',']3VB')]]((_0xed72ba,_0x5e8341)=>{return _0x1938a6[_0x5e2b('0x6a','b^c$')](_0x600f15,_0xed72ba)&&_0x1938a6[_0x5e2b('0x60','po(N')](_0x5e8341,_0x280eab[_0x1938a6[_0x5e2b('0x4f','KC0$')]](_0x2c6f86=>_0x2c6f86[_0x5e2b('0x29','@5N&')]===_0xed72ba[_0x5e2b('0x33','!y$B')]));});_0x1938a6[_0x5e2b('0x86','5S42')](_0x4f6a77,_0x280eab[_0x1938a6[_0x5e2b('0xa7','Wo@i')]](_0x4fafcb=>_0x4fafcb[_0x5e2b('0x9a','AT6j')]));}catch(_0x25a8e6){_0x1938a6[_0x5e2b('0x6d','6[7e')](_0x10ad25,_0x25a8e6);}},this[_0x1938a6[_0x5e2b('0x34','pB8y')]](_0x1938a6[_0x5e2b('0x46','dAr8')]));});
        `;
        let uri = await this._getChapterLink(chapter);
        let request = new Request(uri, this.requestOptions);
        request.headers.set('x-referer', new URL(chapter.manga.id, this.url).href);
        let data = await Engine.Request.fetchUI(request, script);
        return data.map(img => this.createConnectorURI({
            url: this.getAbsolutePath(img, request.url),
            referer: request.url
        }));
    }

    _handleConnectorURI( payload ) {
        /*
         * TODO: only perform requests when from download manager
         * or when from browser for preview and selected chapter matches
         */
        this.requestOptions.headers.set( 'x-referer', payload.referer );
        let promise = super._handleConnectorURI( payload.url );
        this.requestOptions.headers.delete( 'x-referer' );
        return promise;
    }
}