
/**
 * @name	CeL function for web
 * @fileoverview
 * 本檔案包含了 web 的 functions。
 * @since	
 */

/*
http://www.comsharp.com/GetKnowledge/zh-CN/It_News_K902.aspx
http://www.nczonline.net/blog/2010/01/12/history-of-the-user-agent-string/
當 IE 初次推出它們的 User Agent 標誌的時候，是這個樣子：
MSIE/3.0 (Win95; U)

TODO:
don't use .innerHTML
通盤確認所有 HTMLElement 變數已經設成 null


功能探測 vs 瀏覽器探測
http://www.comsharp.com/GetKnowledge/zh-CN/It_News_K987.aspx
Mark Pilgrim 有一個清單，它可以讓你探測任何功能。
http://diveintohtml5.org/everything.html


JQuery LazyLoad實現圖片延遲加載-探究 - jackchain - 博客園
http://www.cnblogs.com/qidian10/archive/2011/08/17/2143081.html
JavaScript & images LazyLoad 图片延迟加载(伪lazyload) - I'm qiqiboy !
http://www.qiqiboy.com/2011/04/12/javascript-and-images-lazyload.html
改造jQuery lazyLoad插件_ 前端開發_ JavaScript
http://www.popo4j.com/qianduan/transformation_jquery_lazyload_plug.html
在圖片尺寸比較大的情況下，圖片加載較慢，因此請求會被攔截，並且保留客戶端數據，在下次Img標籤加載Load方法的時候，可以繼續請求圖片數據

*/

'use strict';
if (typeof CeL === 'function')
CeL.run(
{
name : 'interact.DOM',
//data.code.compatibility.trim
require : 'data.code.compatibility.|data.native.|data.split_String_to_Object|application.locale.gettext',
code : function(library_namespace) {

var module_name = this.id,
//	requiring
split_String_to_Object, gettext;
eval(this.use());


/**
 * null module constructor
 * @class	web 的 functions
 */
var _// JSDT:_module_
= function() {
	//	null module constructor
};

/**
 * for JSDT: 有 prototype 才會將之當作 Class
 */
_// JSDT:_module_
.prototype = {
};






/*
	HTML only	-------------------------------------------------------
*/

/**
 * NodeType: const unsigned short.
 * @see
 * http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#ID-1950641247
 * http://www.w3.org/TR/DOM-Level-2-Core/core.html
 * ELEMENT_NODE,ATTRIBUTE_NODE,TEXT_NODE,CDATA_SECTION_NODE,ENTITY_REFERENCE_NODE,ENTITY_NODE,PROCESSING_INSTRUCTION_NODE,COMMENT_NODE,DOCUMENT_NODE,DOCUMENT_TYPE_NODE,DOCUMENT_FRAGMENT_NODE,NOTATION_NODE
 * @inner
 */
var	ELEMENT_NODE = 1,
//
TEXT_NODE = 3,
//
DOCUMENT_NODE = 9;


if(library_namespace.is_WWW(true) &&
		//	IE8: undefined
		!isNaN(document.ELEMENT_NODE))
	ELEMENT_NODE = document.ELEMENT_NODE,
	TEXT_NODE = document.TEXT_NODE,
	DOCUMENT_NODE = document.DOCUMENT_NODE;

//	IE 中 Object.prototype.toString.call(HTML Element)==='[object Object]', 得用 ''+node
var get_object_type = Object.prototype.toString,
element_pattern = /^\[object HTML([A-U][A-Za-z]{1,15})?Element\]$/;



_// JSDT:_module_
.
/**
 * 判斷是否為 HTML 之 element，包括一般 ELEMENT_NODE 以及 TEXT_NODE。
 * e.g.,
 * object instanceof HTMLLIElement
 * @param	object	object to test
 * @returns	{Boolean}	object is HTML Element
 * @since	2010/6/23 02:32:41
 * @_memberOf	_module_
 * @see
 * http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-58190037,
 * http://www.w3.org/DOM/
 */
is_HTML_element = function(object) {
	var type = get_object_type.call(object);
	// return type.indexOf('[object HTML') === 0;
	return element_pattern.test(type)
		|| '[object Text]' === type
		&& object.nodeType === TEXT_NODE;
};

_// JSDT:_module_
.
/**
 * 判斷為指定 nodeType 之 HTML Element。
 * @param	object	object to test
 * @param	test_type	type to test
 * @returns	{Boolean}	object is the type of HTML Element
 * @since	2010/6/23 02:32:41
 * @_memberOf	_module_
 * @see
 * http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-58190037,
 * http://www.w3.org/DOM/
 */
is_HTML_element_type = function(object, test_type) {
	var type = get_object_type.call(object);
	return test_type === TEXT_NODE ?
			'[object Text]' === type && object.nodeType === TEXT_NODE
			: object.nodeType === test_type && (test_type === DOCUMENT_NODE || element_pattern.test(type));
};

_// JSDT:_module_
.
/**
 * 判斷是否為 <a href="http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node-ELEMENT_NODE">ELEMENT_NODE</a>。<br />
 * 不包含 TEXT_NODE, DOCUMENT_NODE 等。
 * @param	object	object to test
 * @returns	{Boolean}	object is HTML Element
 * @since	2010/6/23 02:32:41
 * @_memberOf	_module_
 * @see
 * http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-58190037,
 * http://www.w3.org/DOM/
 */
is_ELEMENT_NODE = function(object) {
	//library_namespace.debug('Test '+get_object_type.call(object)+' '+((typeof object==='object'||typeof object==='function')&&object.nodeType||'')+': '+element_pattern.test(get_object_type.call(object))+','+(object.nodeType === 1));
	return element_pattern.test(get_object_type.call(object)) && object.nodeType === ELEMENT_NODE;
};

// IE8: [object Object]
var DOCUMENT_TYPE = library_namespace.is_WWW() && get_object_type.call(document) || '[object HTMLDocument]';
_// JSDT:_module_
.
is_DOCUMENT_NODE = function(object) {
	//element_pattern 不能用在 DOCUMENT_NODE。
	//return _.is_HTML_element_type(object, DOCUMENT_NODE);
	//if (object) library_namespace.debug('type: '+get_object_type.call(object)+', nodeType='+object.nodeType);
	return get_object_type.call(object) === DOCUMENT_TYPE && object.nodeType === DOCUMENT_NODE;
};

_// JSDT:_module_
.
/**
 * 判斷是否為 <a href="http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#ID-536297177">NodeList</a>。<br>
 * @param	object	object to test
 * @returns	{Boolean}	if is NodeList
 * @since	2012/3/4
 * @_memberOf	_module_
 * @see
 * http://stackoverflow.com/questions/7238177/detect-htmlcollection-nodelist-in-javascript<br />
 * http://www.webdeveloper.com/forum/showthread.php?t=239887
 */
is_NodeList = function(object) {
	var type = get_object_type.call(object);
	return type === '[object NodeList]'
		//	依2012現行實作，部分 browser 對 .getElementsByTagName() 之類所得為 NodeList。
		//	https://developer.mozilla.org/en-US/docs/DOM/element.getElementsByTagName
		//	http://www.w3.org/TR/domcore/#dom-document-getelementsbytagname
		|| type === '[object HTMLCollection]';
};



/*
debug 用。

IE5DOM @ IE9 test:
IE7DOM @ IE9 test:
node <DIV>: type object, toString.call: [object Object], ""+node: [object], nodeType: 1:

IE8:
IE8DOM @ IE9 test:
IE9DOM @ IE9 test:
node <DIV>: type object, toString.call: [object Object], ""+node: [object HTMLDivElement], nodeType: 1:

IE8:
node <A>: type object, toString.call: [object Object], ""+node: , nodeType: 1:
node <OBJECT>: type object, toString.call: [object Object], ""+node: [object], nodeType: 1:

*/
function show_node(node) {
	var type = get_object_type.call(node);
	if (_.is_NodeList(node)) {
		library_namespace.debug(node.length + ' node list ' + type + ': ' + node[0] + '..', 1, 'show_node');
	} else if(_.is_ELEMENT_NODE(node)) {
		library_namespace.debug('node'
				+ (node.tagName ? ' &lt;' + node.tagName
						+ (node.id ? '#' + node.id : '') + '&gt;' : '') + ': type '
				+ typeof node + ', toString.call: ' + type
				+ ', ""+node: ' + ('' + node) + ', nodeType: ' + node.nodeType
				+ ('outerHTML' in node ? ': ' + node.outerHTML
						: 'innerHTML' in node ? ': ' + node.innerHTML : ''),
				1, 'show_node');
	} else {
		library_namespace.debug(type
				+ (node && typeof node === 'object' ? '.nodeType = ' + node.nodeType
						+ (node.nodeType === DOCUMENT_NODE ? ' (DOCUMENT_NODE)' : '') : ''), 1,
				'show_node');
		if (node.nodeType === DOCUMENT_NODE) {
			library_namespace.debug('wondow.document.body: ['
					+ node.body.innerHTML.replace(/</g, '&lt;') + ']', 3, 'show_node');
		}
	}
}

(function() {
try {
	// workaround for IE, 因用 General type, 效能較差
	var d = window.document.createElement('div'), s;
	// alert('toString test: ' + element_pattern.test(get_object_type.call(d)));

	if(d.nodeType !== ELEMENT_NODE)
		//	doesn't support W3C DOM?
		throw 0;

	try{
		//	IE8 中使用 d.getElementsByName('n') 會失效，_.is_NodeList(s) === true。
		s = d.getElementsByTagName('div');
		if (!_.is_NodeList(s) && get_object_type.call(s) === '[object Object]') {
			// IE 6-8
			_.is_NodeList = function(object) {
				try {
					return object
							&& '[object Object]' === get_object_type.call(object)
							//	IE9 的相容Quirks模式中可能符合 NodeList 的條件，但卻為 ELEMENT_NODE..
							&& !object.tagName
							//	function or object
							&& typeof object.item !== 'undefined'
							&& !isNaN(object.length)
							// use NodeList(index), may throw.
							//&& (object.length > 0 ? _.is_HTML_element(object(0)) : object(0) === null)
							&& (object.length > 0 ? _.is_HTML_element(object[0]) : object[0] === null)
							;
				} catch (e) {
				}
			};
		}
	}catch (e) {
		// TODO: handle exception
	}

	s = element_pattern.test(get_object_type.call(d));
	if (!s) {
		if (element_pattern.test('' + d))
			// e.g., IE 9
			_.is_HTML_element = function(object) {
				return object &&
						(element_pattern.test('' + object)
						// for IE8. object 可能是 null!
						|| typeof object === 'object'
								// && object.tagName === "OBJECT"
								&& object.nodeType === ELEMENT_NODE
								&& "[object NamedNodeMap]" === '' + object.attributes);
			};
		else if (get_object_type.call(d) === '[object Object]') {
			// e.g., IE 5-8. 這種判別方法有漏洞!
			_.is_HTML_element = function(object) {
				return get_object_type.call(object) === '[object Object]'
					// object !== null, undefined
					&& object
					&& typeof object.nodeType === 'number';
			};
			//	bug fix/workaround for IE8: IE8 中 is_Object(ELEMENT_NODE) === true！
			_.is_Object = function(object) {
				return get_object_type.call(object) === '[object Object]'
					// object !== null, undefined
					&& object
					//	test a readonly property
					&& typeof object.nodeType !== 'number';
			};
		} else
			throw 1;

		//	General type
		_.is_HTML_element_type = function(object, type) {
			return _.is_HTML_element(object) && object.nodeType === type;
		};
		_.is_ELEMENT_NODE = function(object) {
			return _.is_HTML_element(object) && object.nodeType === ELEMENT_NODE;
		};
	}

} catch (e) {
	// TODO: handle exception
} finally {
	d = null;
}
})();



/*	test if can use flash

	better use SWFObject:
	http://code.google.com/p/swfobject/

	Browser detect:	http://www.quirksmode.org/js/detect.html
var plugin=(window.navigator.mimeTypes && window.navigator.mimeTypes["application/x-shockwave-flash"]) ? window.navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
if ( plugin ) {
        plugin=parseInt(plugin.description.substring(plugin.description.indexOf(".")-1)) >= 3;
}
else if (window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE")>=0 && window.navigator.userAgent.indexOf("Windows")>=0) {
        document.write('<SCRIPT LANGUAGE=VBScript\> \n');
        document.write('on error resume next \n');
        document.write('plugin=( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6")))\n');
        document.write('<\/SCRIPT\> \n');
}
if ( plugin ) {
        document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
        document.write('  codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" ');
        document.write(' ID=flash5clickTAG WIDTH='+n_width+' HEIGHT='+n_height+'>');
        document.write(' <PARAM NAME=movie VALUE="'+ n_flashfile +'"><param name=wmode value=opaque><PARAM NAME=loop VALUE=true><PARAM NAME=quality VALUE=high>  ');
        document.write(' <EMBED src="'+ n_flashfile +'" loop=true wmode=opaque quality=high  ');
        document.write(' swLiveConnect=FALSE WIDTH='+n_width+' HEIGHT='+n_height+'');
        document.write(' TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">');
        document.write(' <\/EMBED>');
        document.write(' <\/OBJECT>');
} else if (!(window.navigator.appName && window.navigator.appName.indexOf("Netscape")>=0 && window.navigator.appVersion.indexOf("2.")>=0)){
        document.write('<A HREF="'+ n_altURL +'" target="'+n_target+'"><IMG SRC="'+ n_altimg +'" WIDTH='+n_width+' HEIGHT='+n_height+' BORDER=0><\/A>');
}
*/

//	copy from base.js
//window.onerror=HandleError;
function HandleError(message, url, line) {
	// if(window.confirm())_DO_CONTINUE_
	if (window.navigator.appName == "Microsoft Internet Explorer")
		return !window.confirm(url + '\n\nJavaScript Error: ' + line
				+ '\n' + message + '\n\nSee more details?');
	else if (window.navigator.appName == "Netscape")
		// document.location.href="javascript:";
		window.navigate('javascript:');

	//return message;	'Warning: function HandleError does not always return a value' in some Firebird with	user_pref("javascript.options.strict", true);	@ prefs.js
}

//window.onresize=OnResize;	//	預防(舊版)NS resize時版面亂掉
function OnResize() {
	//	回上一頁	history.go(-1),history.back()/history.forward()	this.location.replace(document.referrer)
	//	Opera's document.referrer returns only null if referrer logging is disabled
	//location.replace(),location.reload()
	history.go(0);
}

/*
IE only!!
	http://blog.livedoor.jp/dankogai/archives/50952477.html	DOM時代のdocument.write()

if (typeof document == 'object')
	write = document.write;
*/

/*
http://blog.taragana.com/index.php/archive/how-to-enable-windowstatus-in-firefox/
window.status在firefox下默認是不能修改的。
可以通過工具->選項->網頁特性->啟用javascript->高級->把修改狀態欄文本打上勾就好了。

Open about:config in browser and search for dom.disable_window_status_change. Change it to false.
Additionally in Firefox v1.0, this can be changed via "Tools → Options → Web Features → Enable JavaScript / Advanced → Allow scripts to change status bar text"
In Firefox v1.5, this can be changed via "Tools → Options → Content → Enable JavaScript / Advanced → Allow scripts to change status bar text"
via MozillaZine; learnt the hard way. 
*/
/**
 * 滾動 window.status
 * @param message
 * @param {Number} speed	速度
 * @param from	from where(基本上勿設定)
 * @param roll_status_length	unit length(基本上後兩者勿設定)
 */
function roll_status(message, speed, from, roll_status_length) {
	// 間隔以 s
	var s = '    ';
	if (!roll_status_length)
		roll_status_length = message.length, message += s + message;
	if (!from || from >= roll_status_length + s.length)
		from = 0;
	if (!message)
		if (typeof window.status === 'string')
			roll_status(window.status, speed);
		else
			return;
	else if (message.slice(from) != window.status && message.length > L)
		return;

	if (isNaN(speed) || speed > 999)
		speed = 999;
	else if (speed < 0)
		speed = 0;

	var L = 99;// L:least length
	while (message.length < L)
		message += s + message;
	window.status = message.slice(++from);
	roll_statusS = window.setTimeout('roll_status("' + message + '",' + speed + ',' + from + ',' + roll_status_length + ');', speed);
	// roll_statusS=window.setInterval('roll_status("'+message+'",'+speed+','+from+')',speed)
}

//	↑copy from base.js


/*	預防hack：禁止鍵盤keyboard&滑鼠mouse輸入,可以再加上一層div於最上方以防止copy
	下面一行調到檔案頭
var disabledKM=0;
*/
//disableKM[generateCode.dLK]='disabledKM';
function disableKM(s,m){	//	s=1:回復,s=2:使螢幕亦無法捲動(對NS無效),m:message,輸入時發出警告
 /*
 window.onerror=function(){return ture;};
 //	定義亦可用 function document.onmousedown(){..}
 document.onmousedown=document.oncontextmenu=document.onselectstart=document.ondragstart=function(e){return false;};
 //	印刷を禁止して
 window.onbeforeprint=function(){for(i=0;i<document.all.length;i++){if(document.all[i].style.visibility!="hidden"){document.all[i].style.visibility="hidden";document.all[i].id="elmid";}}};
 window.onafterprint=function(){for(i=0;i<document.all.length;i++){if(document.all[i].id=="elmid"){document.all[i].style.visibility="";}}};
 */
 if(!document.body)return;
 if(typeof s=='undefined')s=1;
 if(typeof disabledKM=='undefined')disabledKM=0;

 if(!s){
  if(disabledKM){
	  window.ondragstart=document.body.Oondragstart||null,
	  window.oncontextmenu=document.body.Ooncontextmenu||null,
	  window.onselectstart=document.body.Oonselectstart||null;
    if(disabledKM==2)document.body.style.overflow=typeof document.body.Ooverflow=='string'?document.body.Ooverflow:'auto';
   window.onmousedown=window.Oonmousedown||null,
   window.onkeydown=window.Oonkeydown||null;
   window.onmousedown=document.Oonmousedown||null,
   window.onkeydown=document.Oonkeydown||null;
  }
  disabledKM=0;
  return;
 }

if(disabledKM){
	//	已lock時不執行多餘的動作與覆蓋舊資訊
 if(s==2)document.body.style.overflow='hidden';
 else if(typeof document.body.Ooverflow=='string')document.body.style.overflow=document.body.Ooverflow;
}else{
//	<body oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
 //	預防hack
  //leftMargin=topMargin=rightMargin=bottomMargin=0;	//	使body填滿視窗
  document.body.Ooverflow=document.body.style.overflow;
  if(s==2)document.body.style.overflow='hidden';	//	使螢幕亦無法捲動
  if(typeof window.onselectstart!='undefined')document.body.Oonselectstart=window.onselectstart;
  if(typeof window.oncontextmenu!='undefined')document.body.Ooncontextmenu=window.oncontextmenu;
  if(typeof window.ondragstart!='undefined')document.body.Oondragstart=window.ondragstart;
  window.ondragstart=window.oncontextmenu=window.onselectstart=
	function(){return false;};

 //	不要在 document 对象中设置 expando 属性，在 window 对象上设置 expando 属性。
  if(typeof window.onmousedown!='undefined')document.Oonmousedown=window.onmousedown;
  if(typeof window.onkeydown!='undefined')document.Oonkeydown=window.onkeydown;

  //ndblclick=
  if(typeof document.onmousedown!='undefined')document.Oonmousedown=document.onmousedown;
  if(typeof document.onkeydown!='undefined')document.Oonkeydown=document.onkeydown;
}
 window.onmousedown=window.onkeydown=document.onmousedown=document.onkeydown=document.onContextMenu
	=new Function('e',
			'if(window.navigator.appName=="Microsoft Internet Explorer"&&event.button!=1||window.navigator.appName=="Netscape"&&e.which!=1){'
			+(m?'alert('+dQuote(m)+');':'')+'return false;}');
/*
			'if(window.navigator.appName=="Microsoft Internet Explorer"\
			&&event.button!=1||window.navigator.appName=="Netscape"&&e.which!=1){'+(m?'alert('+dQuote(m)+');':'')+'return false;}');
*/

 //	window.captureEvents(Event.MOUSEUP|Event.MOUSEDOWN);
 //	window.onmousedown=function(e){if(e.which==1){window.captureEvents(Event.MOUSEMOVE);window.onmousemove=rf;}};
 //	window.onmouseup=function(e){if(e.which==1){window.releaseEvents(Event.MOUSEMOVE);window.onmousemove=null;}};
 //	Navigator 4.0x
 //	http://topic.csdn.net/t/20020125/13/498661.html
 if(!disabledKM && window.Event && window.captureEvents)
	window.captureEvents(Event.MOUSEDOWN),
	window.captureEvents(Event.KEYDOWN);

 disabledKM=s;
};


/**
 * 切換(顯示/隱藏) node.<br />
 * toggle/swap display and visibility.<br />
 * display:none or visibility:hidden.
 * 
 * TODO:
 * use computed style
 * @param element	HTML element
 * @param	{String|Number} type	show or hidden or set the status type:
 * 			{Number} type: 0: hidden(→none), 1: show(→block), 2||undefined: switch, others: get status only with no change
 * 			{String} type: set CSS: display type: none, '', block, inline, list-item. 其他恐造成 error?
 * @return	display status
 * @since	2010/4/1 10:24:43 rewrite
 * @see
 * http://www.w3schools.com/CSS/pr_class_visibility.asp
 * http://www.w3schools.com/css/pr_class_display.asp
 * http://www.javaeye.com/topic/140784
 * 	通過element.style對象只能取得內聯的樣式，也就是說只能取得html標籤裡寫的屬性。 
 * @requires	[get_element],[_.get_style]
 * @_memberOf	_module_
 */
function toggle_display(element, type){
	// showObj(element);
	if (!(element = get_element(element)))
		return;

	// Opera 7.5 意外的沒有 tagName (-_-) 而 Firefox 也可能沒有此 property.
	var tagName = ('' + element.tagName).toLowerCase(),
	style = element.style,
	v_value = {visible:1, hidden: 2, collapse: 3};

	if (typeof type === 'undefined' || type == 2)
		type = style ?
				(_.get_style ? _.get_style(element, 'display') :
					//	style.display === '' 時預設為顯示
					style.display) === 'none'
			: element.visibility !== 'visible';

	if (typeof type === 'boolean')
		type = type ? 1 : 0;

	if (!isNaN(type))
		//	對各種不同的 tag 作個別設定。
		type = type == 0 ? style ? 'none' : tagName === 'tr' ? 'collapse' : 'hidden'
			: type == 1 ? style ? (tagName in {div:1, iframe:1}) ? 'block' : 'inline' : 'visible'
			: null;

	library_namespace.debug('type: '+type, 2, 'toggle_display');
	//	test .innerHTML

	//library_namespace.debug('set display style of &lt;' + tagName + '&gt; to [' + type + ']');
	if (style)
		style[type in v_value ? 'visibility'
				: 'display'] = type;
	else if ((type in v_value)
			// &&!(tagName in {'iframe':1,'input':1})
			)
		element.visibility = type;
	else
		return;

	return type;
};
//simpleWrite('a.txt',reduce_code([f,toggle,set_Object_value]));
//for(var i in style)tt+=i+'='+document.getElementById("others").style[i]+"<br />";document.write(tt);
_// JSDT:_module_
.
toggle_display = toggle_display;



_// JSDT:_module_
.
/*	http://blog.stevenlevithan.com/archives/faster-than-innerhtml
You can use the above as el = replace_HTML(el, newHtml) instead of el.innerHTML = newHtml.

.innerHTML=,document.createElement(→XML_node()
.innerHTML='' → remove_all_child


http://forum.moztw.org/viewtopic.php?t=17984&postdays=0&postorder=asc&start=15
adoptNode() 會把現有的節點拿去用，ownerDocument 會被變更，被 adopt 的節點會從原來的 document 消失。
importNode() 比較像是 cloneNode() 加上變更 ownerDocument。
以前因為 Gecko 沒有太嚴格，所以可以用 Ajax 取回一個 XML 文件並直接透過 responseXML 把裡面的節點當 HTML 節點一樣的插入現有的網頁。
*/
/**
 * replace HTML
 * @param o
 * @param html
 * @return
 * @_memberOf	_module_
 */
replace_HTML = function(o, html){
	if (typeof o === 'string')
		o = document.getElementById(o);
	if (!_.is_ELEMENT_NODE(o))
		return;
	try {
		/*@cc_on	// Pure innerHTML is slightly faster in IE
		 o.innerHTML=html||'';
		 return o;
		@*/

		//var n = o.cloneNode(false);
		//n.innerHTML = html || '';
		//o.parentNode.replaceChild(n, o);

		// 預防之後不知道的 code 還是使用之前的 reference。
		o.innerHTML = html || '';

	} catch (e) {
		library_namespace.warn('replace_HTML() error!');
		library_namespace.err(e);
	}

	// Since we just removed the old element from the DOM, return a reference to the new element, which can be used to restore variable references.
	return o;
};

/*
使用.firstChild或.lastChild須注意此node可能是text node，不能appendChild。須以.nodeType判別。

http://msdn2.microsoft.com/zh-tw/library/system.xml.xmlnode.removechild(VS.80).aspx
繼承者注意事項 在衍生類別中覆寫 RemoveChild 時，為了要正確引發事件，您必須呼叫基底類別的 RemoveChild 方法。

removeAllChild[generateCode.dLK]='replace_HTML';
function removeAllChild(o){
 //return removeNode(o,1);

 //	http://blog.stevenlevithan.com/archives/faster-than-innerhtml
 if(typeof o=='string')o=document.getElementById(o);
 if(!o||typeof o!='object')return;
 o.parentNode.replaceChild(o.cloneNode(false),o);
 return o;
}

http://www.webreference.com/js/column43/replace.html
The replaceNode method is much more intuitive than the removeNode method. While the removeNode method just removes the specified element and makes its descendents children of their grandfather, the replaceNode method deletes the whole subtree that is rooted at the specified element, and substitutes it with a new element.
node_want_to_replace.removeNode(new_node)
*/
_// JSDT:_module_
.
/**
 * 移除 node.
 * TODO:
 * also remove event handlers
 * @param o
 * @param tag	tag===1: only child, undefined: remove only self, others: only <tag> child
 * @return
 * @_memberOf	_module_
 */
remove_node = function remove_node(o, tag) {
	var _f = remove_node, i;
	if (typeof o === 'string')
		o = document.getElementById(o);
	if (!_.is_ELEMENT_NODE(o))
		return;

	// remove child
	if (tag) {
		if (typeof tag === 'string')
			tag = tag.toLowerCase();

		//	safer: if you have any asynchronous events going. But node.hasChildNodes() will always do an evaluation.
		//while(o.hasChildNodes()&&(i=o.firstChild))o.removeChild(i);

		// don't use for()
		// http://weblogs.macromedia.com/mesh/archives/2006/01/removing_html_e.html
		//	TODO: 直接用 replaceNode 就不用 recursion
		i = o.childNodes.length;
		while (i--)
			if (tag === 1 || _.is_ELEMENT_NODE(o.childNodes[i]) && tag === o.childNodes[i].tagName.toLowerCase())
				// _f(o.childNodes[i],tag), // TODO: 會有問題
				o.removeChild(o.childNodes[i]);
	}

	// remove self
	//	測試 o.parentNode: 預防輸入的o為create出來的
	return tag || !(i = o.parentNode) ? o : i.removeChild(o);
};

_// JSDT:_module_
.
remove_all_child = _.replace_HTML;





/**
 * set/get/remove attribute of a element<br />
 * in IE: setAttribute does not work when used with the style attribute (or with event handlers, for that matter).
 * @param _e	element
 * @param propertyO	attributes object (array if you just want to get)
 * @return
 * @requires	split_String_to_Object
 * @see
 * setAttribute,getAttribute,removeAttribute
 * http://www.quirksmode.org/blog/archives/2006/04/ie_7_and_javasc.html
 * @since	2006/12/10 21:25 分離 separate from XML_node()
 * @_memberOf	_module_
 */
function set_attribute(_e, propertyO, ns) {
	if (!(_e = get_element(_e)) || !propertyO/* ||_e.nodeType===3/* TEXT_NODE */)
		return;

 var _l,_m,_g,
	//	Namespaces:SVG,MathML,XHTML,XLink
 _N=new_node.ns;
 if (typeof propertyO === 'string')
	 propertyO = /[=:]/.test(propertyO) ? split_String_to_Object(propertyO)
			 : propertyO.split(',');
	 if (Array.isArray(propertyO))
		 _g = propertyO.length === 1 ? propertyO[0] : 1,
				 propertyO = split_String_to_Object(propertyO.join(','));

		 for (_l in propertyO) {
			 if (_l === 'class' && !propertyO['className'])
				 propertyO[_l = 'className'] = propertyO['class'];
			 if (_g || (_l in propertyO) && propertyO[_l] != null)
   if(_l=='className'||typeof propertyO[_l]=='function')if(_g)propertyO[_l]=_e[_l];else _e[_l]=propertyO[_l];//_l=='id'||
	/*
		XML 中id不能以setAttribute設定。
		class不能以setAttribute設定@IE。
		http://www.quirksmode.org/bugreports/archives/2005/03/setAttribute_does_not_work_in_IE_when_used_with_th.html
		IE ignores the "class" setting, and Mozilla will have both a "class" and "className" attribute defined
	*/
   else if (_e.setAttributeNS
		   && (_m = _l.match(/^(.+):([^:]+)$/))) {
	   _m = _m[1];
	   if (_m.indexOf('://') == -1 && _N[_m.toLowerCase()])
		   _m = 'http://www.w3.org/' + _N[_m.toLowerCase()];
	   if (_g)
		   propertyO[_l] = _e.getAttributeNS(_m, _l);
	   else
		   _e.setAttributeNS(_m, _l, propertyO[_l]);// try{_e.setAttributeNS(_m,_l,propertyO[_l]);}catch(e){alert('set_attribute:
	   // Error!');}
   } else if (_g)
	   propertyO[_l] = _e.getAttribute(_l);
   else
	   //TODO: _e.setAttribute(), _e.style.setProperty()
	   _e.setAttribute(_l, propertyO[_l]);// _e.setAttributeNS?_e.setAttributeNS(null,_l,propertyO[_l]):_e.setAttribute(_l,propertyO[_l]);
 }

 return typeof _g == 'string' ? propertyO[_g] : propertyO;
}
_// JSDT:_module_
.
set_attribute = set_attribute;


_// JSDT:_module_
.
/**
 * append children node to specified element
 * @param node	node / node id
 * @param child_list	children node array
 * @return
 * @since	2007/1/20 14:12
 * @_memberOf	_module_
 */
add_node = function add_node(node, child_list) {
	var _s = add_node;
	if ((node = get_element(node)) && arguments.length > 2) {
		for ( var _j = 1, l = arguments.length; _j < l; _j++)
			_s(node, arguments[_j]);
		return;
	}

	if (!node || !child_list
			// || node.nodeType === 3/* TEXT_NODE */
		)
		return;

	//	預防 RegExp 等，需要 toString()
	if (library_namespace.is_RegExp(child_list))
		child_list = '';

	if (typeof child_list === 'object') {
		if (child_list)
			if (Array.isArray(child_list)
					// && child_list.length
				) {
				for ( var _j = 0, l = child_list.length; _j < l; _j++)
					_s(node, child_list[_j]);
			} else
				try {
					//	[object SVGTextElement] 亦可 appendChild().
					node.appendChild(child_list);
				} catch (e) {
					library_namespace.warn('add_node: Can not insert node!');
					//show_node(node);
					//	e.g., 'HIERARCHY_REQUEST_ERR: DOM Exception 3'
					//	e.g., document.appendChild(document.createElement('div'));
					//	e.g., document.createTextNode("").appendChild(document.createElement('div'));
				}
		return;
	}

	if (typeof child_list === 'string'
		|| typeof child_list === 'number' && !isNaN(child_list)) {
		// child_list=child_list.toString();
		_.node_value(node, child_list);
	}
};


/**
 * 設定 HTML element 的 text。
 * 對付IE與Moz不同的text取得方法。現階段不應用innerText，應該用此函數來取得或設定內部text。
 * @param element	HTML element
 * @param {String} text	the text to be set
 * @return
 * @see
 * http://www.klstudio.com/post/94.html
 * @_memberOf	_module_
 */
function set_text(element, text) {
	if (!(element = get_element(element)))
		return;

	var text_p = set_text.p;
	if (typeof text_p !== 'string' || !text_p)
		set_text.p = text_p =
				typeof document.body.textContent === 'string' ? 'textContent'
				: typeof document.body.innerText === 'string' ? 'innerText'
				: 'innerHTML';

	var p = typeof element.value === 'string' ? 'value' : text_p;
	if (typeof text !== 'undefined')
		element[p] = text;

	//	http://www-128.ibm.com/developerworks/tw/library/x-matters41.html
	if (element.nodeType === 3 || element.nodeType === 4)
		// TODO: DOM: 用 eelement.nodeValue
		return element.data;

	/*
	//	用 .childNodes
	var s=element.firstChild, t = [];
	if (s) {
		do {
			t.push(set_text(s));
		} while (s = s.nextSibling);
		return t.join('');
	}
	*/

	var text = element[p];
	if(p==='innerHTML'){
		//	分斷行	2003/1/25 22:40
		//html→text
		//<.+?>	<[^>]+>	<\s*\/?\s*[a-zA-Z](.*?)>	<!	過慢?
		text = text
			.replace(/<s>[^<]*<\/s>/gi, '')
			.replace(/<w?br[^>]*>/gi, '\n')
			.replace(/<\/?[A-Za-z][^>]*>/g, '');
	}
	return text;
}

_// JSDT:_module_
.
set_text = set_text;


_// JSDT:_module_
.
/**
 * 自動填寫表單
 * TODO:
 * cache name if need.
 * @param {Object}pair
 *            設定 pair: {id/name: value}
 * @param {HTMLElement|Object|Integer}config
 *            submit button/form id, {submit: submit button/form id, base: base space id}.
 *            use {} to ignore this argument.
 */
fill_form = function fill_form(pair, config) {
	var name, node, base, submit, event_object, window_object = typeof window === 'object' && window || {},
	//	這種 node 需要用到 list 的方法。e.g., checkbox or radio.
	use_list = function(node) {
		library_namespace.debug('test &lt;' + node.tagName + ' type="' + node.type + '" name="' + node.name + '" id="' + node.id + '" /&gt;', 2, 'fill_form.use_list');
		return _.is_ELEMENT_NODE(node)
			&& node.tagName.toLowerCase() === 'input'
			&& node.type.toLowerCase() in {
				radio : 1,
				checkbox : 1
			};
	},
	set_node = function(name) {
		node = base.getElementById(name);
		library_namespace.debug('.getElementById(' + name + ') = ' + node, 3, 'fill_form.set_node');
		//	IE9 quirks mode 中， .getElementById() 可以得到 .getElementsByName()[0]。
		if (!node || use_list(node)) {
			node = base.getElementsByName(name);
			if (library_namespace.is_debug(2)) {
				library_namespace.debug('.getElementsByName(' + name + ') = ' + node, 2, 'fill_form.set_node');
				show_node(node);
			}
			if (!node[0] || !use_list(node[0])) {
				if (node.length !== 1) {
					library_namespace.warn('fill_form: 共有 ' + node.length + ' 個 [name=' + name + '] 可供設定' + (node.length ? '，將只設定第一個' : '') + '！');
				}
				node = node[0];
			} else {
				library_namespace.debug('treat [name=' + name + '] as checkbox or radio. length = ' + node.length, 2, 'fill_form.set_node');
			}
		}
		return node;
	},
	fire_event = function(event_id) {
		if (node[event_id]
				// 不一定都是 function?
				//&& typeof node[event_id] === 'function'
			) {
			try {
				//	TODO: 完整模擬 DOM event object.
				//	http://msdn.microsoft.com/en-us/library/ms535863(v=vs.85).aspx
				if (!event_object) {
					library_namespace.debug('Setup event object for .' + event_id, 2, 'fill_form.fire_event');
					event_object = {
							target : node
					};
					//	IE. TODO: 預防所操縱的為 HTA，其 'window' !== 本身之 window。
					if ('event' in window_object) {
						event_object.srcElement = node;
						try{
							//	無法設定 window.event: Error 438 [TypeError] (facility code 10): 物件不支援此屬性或方法.
							//window_object.event = event_object;
							//	行不通: window_object.event === null
							library_namespace.extend(window_object.event, event_object);
						} catch (e) {
						}
					}
				}
				library_namespace.debug('Try to fire .' + event_id, 2, 'fill_form.fire_event');
				node[event_id].call(node, event_object);
			} catch (e) {
				if(library_namespace.is_debug()) {
					library_namespace.warn('fill_form.fire_event: Error to run .' + event_id + ': ' + node[event_id]);
					library_namespace.err(e);
				}
			}
		}
		return fire_event;
	},
	//	模擬鍵盤輸入事件發生。
	event_sequence = function(node, value) {
		fire_event('onfocus')
		('onclick')('oninput');

		library_namespace.debug('Set [' + name + '] = [' + value + ']', 2, 'fill_form.event_sequence');
		_.node_value(node, value);

		fire_event('onpropertychange')
		('onchange')
		('onblur');
	};

	if (library_namespace.is_Object(config)) {
		submit = config.submit;
		base = config.base;
		if (config.window) {
			window_object = config.window;
			library_namespace.debug('Setup window: ' + window_object, 2, 'fill_form');
		}
		if (!isNaN(base) && (name = window_object.document.forms[base])) {
			base = name;
		}
		if (config.no_fire)
			fire_event = function() {
				return fire_event;
			};
	}
	if (!_.is_ELEMENT_NODE(base) && !_.is_DOCUMENT_NODE(base)) {
		library_namespace.debug('Set base to window_object.document.', 2, 'fill_form');
		base = window_object.document;
	}
	//	確定可以使用 .getElementById。
	while (!base.getElementById) {
		base = base.parentNode;
	}
	if (library_namespace.is_debug(2)) {
		library_namespace.debug('base:', 1, 'fill_form');
		show_node(base);
	}

	if (library_namespace.is_Object(pair)) {
		for (name in pair) {
			if (_.is_ELEMENT_NODE(set_node(name))) {
				event_sequence(node, pair[name]);
			} else if (_.is_NodeList(node)) {
				//	<input type="radio|checkbox" value="~" />
				for ( var i = 0, l = node.length, n, vl = pair[name], v; i < l; i++) {
					n = node[i];
					v = library_namespace.is_Object(vl)? vl[n.value] :
						Array.isArray(vl) ? vl.indexOf(n.value) !== -1 : vl;
					library_namespace.debug('set value [' + v + '].', 2, 'fill_form');
					//	n.value 必為 string，因此不用 ===。
					if (n.checked !== (typeof v === 'boolean' ? v : v == n.value))
						//	有改變才 fire event.
						event_sequence(n, !n.checked);
				}
			}
			//	reset event_object.
			event_object = undefined;
		}
	}

	if ((node = submit) &&
			(_.is_ELEMENT_NODE(node)
			|| typeof node === 'string' && _.is_ELEMENT_NODE(set_node(node)))) {
		node.click && node.click();
	} else if (!isNaN(submit)
			&& _.is_ELEMENT_NODE(node = window_object.document.forms[submit])) {
		fire_event('submit');
	}
};

_// JSDT:_module_
.
/**
 * 設定 node 之值。
 * 
 * @param {HTMLElement}node
 *            所指定之 node。
 * @param {String|Number|Boolean}value
 *            所要設定之值
 * @param {HTMLBodyElement|HTMLElement}base_space
 *            base document/context
 * @returns node 之值
 */
node_value = function node_value(node, value, base_space) {
	var set_value_list = function(value) {
		var i, l, v;
		if (Array.isArray(value))
			for (i = 0, l = value.length, v = {}; i < l; i++)
				v[value[i]] = true;
		else if (library_namespace.is_Object(value))
			v = value;
		else
			(v = {})[value] = true;
		return v;
	};

	if (!node //|| !library_namespace.is_WWW()
		//	maybe [object SVGTSpanElement]
		|| !(
				typeof node === 'string' ? (node = select_node(node, base_space) || get_element(node))
					: node)) {
		if (_.is_NodeList(node) && node.length && 'checked' in node[0]) {
			//library_namespace.debug('Nodes &lt;' + node[0].tagName + '&gt;[' + node[0].name + '] = ' + value, 1, 'node_value');
			//	/checkbox|radio/
			//var type = node[i].type;
			for ( var i = 0, l = node.length, v = set_value_list(value); i < l; i++) {
				if (node[i].value in v) {
					node[i].checked = !!v[node[i].value];
					//if (type === 'radio') break;
				}
			}
		}
		return;
	}

	var tag_name = _.is_ELEMENT_NODE(node) ? node.tagName.toLowerCase() : '', type;
	//library_namespace.debug('Node &lt;' + tag_name + '&gt;', 1, 'node_value');
	if (tag_name in {
			textarea : 1,
			select : 1,
			option : 1
		}
		|| (tag_name === 'input'
			// use only /checkbox|hidden|password|radio|text/ or undefined(default).
			// .getAttribute('type')
			&& !((type = ('' + node.type).toLowerCase()) in {
				button : 1,
				file : 1,
				image : 1,
				reset : 1,
				submit : 1
			}))) {
		switch (type) {
		case 'radio':
		case 'checkbox':
			if ('checked' in node)
				//	node.value 必為 string，因此不用 ===。
				node.checked = typeof value === 'boolean' ? value : (node.value == value);
			break;
		case 'select-multiple':
			if (Array.isArray(value))
				for ( var i = 0, options = node.options,
						l = Math.min(options.length, value.length); i < l; i++)
					options[i].selected = !!value[i];
			else {
				value = set_value_list(value);
				for ( var i = 0, options = node.options, l = options.length; i < l; i++) {
					if (options[i].value in v)
						options[i].selected = !!value[options[i].value];
				}
			}
			break;
		default:
			//library_namespace.debug('Use default method to set value.', 1, 'node_value');
			if ('value' in node) {
				if (tag_name === 'select') {
					if (!isNaN(value) && value >= 0 && value < node.options.length) {
						//	.options[i].value===value
						//	.selectedIndex= 的設定有些情況下會失效
						if (node.selectedIndex != value) {
							node.selectedIndex = value;
							// node.onchange && node.onchange();
						}
					} else {
						if (node.value != value) {
							node.value = value;
						}
						//	check
						if (node.value !== value) {
							//	未設定成功: 沒有此 options.value?
							for ( var i = 0, options = node.options, l = options.length, v = String(value).trim(); i < l; i++)
								if (v == options[i].innerHTML.trim()) {
									node.value = options[i].value;
									break;
								}
						}
						//else node.onchange && node.onchange();
					}
				} else {
					//	IE9 的相容Quirks模式中使用 'maxLength'.
					var kw = 'maxLength';
					if (!(kw in node))
						kw = 'maxlength';
					//library_namespace.debug('測試是否須截斷過長之設定值 of [' + kw + ']。', 1, 'node_value');
					if (!isNaN(node[kw])
							&& value.length > node[kw]) {
						library_namespace.warn('The length of value [' + value + ']: ' + value.length + ' > limit ' + node[kw]
								+ ' ! I will fill the first ' + node[kw] + ' characters!');
						value = value.slice(0, node[kw]);
					}
					if (node.value != value) {
						//library_namespace.debug('Set &lt;' + tag_name + '&gt; = [' + value + ']', 1, 'node_value');
						node.value = value;
						// node.onchange && node.onchange();
					}
				}
			} else {
				library_namespace.warn('Can not set value of node!');
				// 需要再處理. .text?
				//return true;
				value = node.innerHTML;
			}
		}

	} else if (tag_name === 'option') {
		if (!node.value)
			node.value = value;
		value = node.innerHTML = value;

	} else if (typeof value === 'string'
		&& value.indexOf('<') !== -1) {
		// may cause error: -2146827687 未知的執行階段錯誤 e.g.,
		// XML_node('a',0,0,[XML_node('a'),'<br />']);
		// try{
		value = node.innerHTML = value;
		// }catch(e){node.appendChild(XML_node('span',0,0,value));}
	}

	else if (typeof value === 'string'
		|| typeof value === 'number') {
		_.remove_all_child(node);
		// try{
		node.appendChild(document.createTextNode(value));
		value = node.innerHTML;
		// }catch(e){alert(e.description);}
	} else
		value = node.innerHTML;

	// else alert('node_value: Error insert contents:\n['+value+']');
	return value;
};

/*

var alias={
	//	'child' || 'c' || '$' || '0' || ..
	$:'childNode',
	//	class: 'className' || 'c' ..
	c:'className'
	s:'style'
};

輸入 ( [{tag1:{attb:attb_val,child:[inner objects]}}, {tag2:{}}, 'br'], insertBeforeO)
e.g.,
([
	{
		p:[span:'>>test<<'],
		id:'a',
		c:'cls',
		s:{color:'#123'}
	},
	//	width:12 === width:'12px'
	{
		span:['<<test2>>','text'],
		s:{color:'',width:12}
	},
	'<<test3>>',
	{'hr':0},
	{'br':0},
	{
		$:tag_name,
		tag_name:[]
	},
	{
		tag_ns:0,
		ns:'http://~'
	}
], insertSetting)

insertSetting:
	(null)		just create & return the node
	以下：===0 則設成 document.body
	parent node/ id		appendChild
	[refO,0-4]	0:appendChild (add as lastChild), 1: add as firstChild, 2: add as nextSibling, 3: add as priviusSibling, 4: add as parent


*/
//[{tag1:{attb:attb_val,child:[inner objects]}}, {tag2:{}}, 'br'];



/**
 * 創建新的 DOM 節點(node)。<br />
 * createNode() 的功能補充加強版。<br />
 * 
 * NOTE:
 * table 需要加 tbody.
 * 
 * TODO:
 * 分割功能(set_attrib, add_child, ..), 簡化.
 * insertAdjacentHTML / insertAdjacentText
 * 
 * @param	{Object|Array} nodes	node structure
 * @param	{String|Array|HTMLElement} [layer]	where to layer this node. e.g., parent node
 * @return	{HTMLElement}	new node created
 * @since	2010/6/21 13:45:02
 */
function new_node(nodes, layer) {
	var node, for_each,
	// parent: parent node of layer or layer.firstChild
	parent,
	children,
	handler = new_node.handler;

	/*
	if (!library_namespace.is_WWW(true)
		//&& !document.createElementNS
		) {
		library_namespace.warn('new_node: DOM error? Cannot create node [' + nodes + '].');
		return;
	}

	if (node === null || ((typeof nodes) in {number:1, boolean:1,undefined:1}))
		//.toString();
		nodes = //'(' + typeof nodes + ') '
			String(nodes);
	*/

	//	造出 node.
	if (node === null || ((typeof nodes) in {
		number : 1,
		boolean : 1,
		undefined : 1
	}))
		//	new_node(true), new_node(undefined)
		node = // '(' + typeof nodes + ') '
		// nodes.toString();
		'' + nodes;

	else if (library_namespace.is_Object(nodes)) {
		var tag = nodes.$, n = 'className', ns, s, ignore = {
			// tag
			$ : null,
			// attrib
			A : null
/*
			// namespace
			NS : null,
			// class
			C : null,
			// style
			S : null,
			// dataset
			D : {},
			// support for application.locale.gettext.
			T : {},
			//	reference, usually using <title>
			R : ''
*/
		};

		if (typeof tag === 'undefined') {
			for (node in nodes)
				//	取第一元素。
				if (!(node in ignore)) {
					tag = node;
					break;
				}
		} else if (tag === 0) {
			//	0: just set attributes
			if (!_.is_ELEMENT_NODE(layer)) {
				library_namespace.warn('new_node: There is no tag and the layer is NOT a HTML Element!');
				return;
			}
			tag = layer;
		} else if (typeof tag !== 'undefined')
			node = tag;

		//	set/create node
		if (_.is_HTML_element(tag))
			node = tag;

		else if (typeof tag !== 'string') {
			library_namespace.err('new_node: Error creating tag: [' + (typeof tag) + '][' + tag + ']');
			return;

		} else {
			//	初始轉換。
			if (tag === 'T') {
				//	{ T : [ gettext id, ..] }
				//	→
				//	{ 基本 text node : null, T : [ gettext id, ..] }
				tag = 'span';
			}

			if ('NS' in nodes)
				ignore.NS = null,
				ns = nodes.NS;
			else if (s = tag.match(/^(.+):([^:]+)$/))
				tag = s[2], ns = s[1];

			try {
				if (ns && document.createElementNS) {
					if (ns in (s = new_node.ns))
						ns = 'http://www.w3.org/' + s[ns];
					node = document.createElementNS(ns, tag);
				} else
					node = tag ? document.createElement(ns ? ns + ':' + tag : tag)
							//: document.createTextNode();
							//	由後面判定。
							: nodes[tag];
			} catch (_e) {
				node = null;
				library_namespace.err('new_node: Error create tag: [' + tag + ']');
				return;
			}
		}

		if (_.is_ELEMENT_NODE(node)) {
			s = node.setAttributeNS ? function(n, v) {
				if (library_namespace.is_Function(v)) {
					node[n] = v;
					//	TODO: _.add_listener();
					return;
				}
				var _n = n.match(/^(.+):([^:]+)$/);
				if (_n)
					n = _n[2], _n = _n[1];
				if (_n)
					node.setAttributeNS(
							_n in new_node.ns ? 'http://www.w3.org/'
									+ new_node.ns[_n] : ns, n, v);
				else
					node.setAttribute(n, v);
			} : function(n, v) {
				if (library_namespace.is_Function(v))
					node[n] = v;
				else
					node.setAttribute(n, v);
			};

			//	對常用的特別處理
			// class name
			/*
				XML 中id不能以setAttribute設定。
				class不能以setAttribute設定@IE。
				http://www.quirksmode.org/bugreports/archives/2005/03/setAttribute_does_not_work_in_IE_when_used_with_th.html
				IE ignores the "class" setting, and Mozilla will have both a "class" and "className" attribute defined
			 */
			if ((n in nodes) || ((n = 'class') in nodes) || ((n = 'C') in nodes))
				ignore[n] = null,
				node.className = nodes[n];

			// IE 需要先 appendChild 才能操作 style，moz不用..??
			//	http://www.peterbe.com/plog/setAttribute-style-IE
			//	或需要將 font-size -> fontSize 之類?
			// IE6 (no firefox or IE7~) 可設定:
			//	oNewDiv.style.setAttribute('border', '1px solid #000');
			//	oNewDiv.style.setAttribute('backgroundColor', '#fff');
			if (((n = 'style') in nodes) || ((n = 'S') in nodes)) {
				ignore[n] = null;
				n = nodes[n];
				var i, style = node.style;
				if (typeof n === 'string')
					style.cssText = n;
				else if (library_namespace.is_Object(n))
					for (i in n)
						// is_IE?"styleFloat":"cssFloat"
						style[i === 'float' ? 'cssFloat' in style ? 'cssFloat' : 'styleFloat' : i] = n[i];
				else
					library_namespace.warn('new_node: Error set style: [' + styleO + ']');
			}

			if (((n = 'dataset') in nodes) || ((n = 'D') in nodes)) {
				ignore[n] = null;
				dataset(node, nodes[n]);
			}

			if((n = 'T') in nodes) {
				ignore[n] = null;
				if (Array.isArray(n = nodes[n])) {
					dataset(node, gettext.DOM_id_key, n[0]);
					for ( var i = 1; i < n.length; i++)
						dataset(node, gettext.DOM_id_key + i, n[i]);
				} else
					n = [dataset(node, gettext.DOM_id_key, n)];

				if (!nodes[tag])
					nodes[tag] = gettext.apply(null, n);
			}

			if((n = 'R') in nodes) {
				ignore[n] = null;
				if (n = nodes.R) {
					'title' in nodes || (nodes.title = n);
					if (tag === 'img' && n.length < 20)
						'alt' in nodes || (nodes.alt = n);
				}
			}

			// 設定 children nodes
			ignore[tag] = null;
			children = nodes[tag];

			//	自動作 list 的轉換
			if (tag in {
						ol : 1,
						ul : 1
					} && Array.isArray(children))
			{
				var i = 0, o = [], l = children.length, t, c, change = false;
				for (; i < l; i++)
					if (c = children[i]) {
						t = typeof c === 'string'
							|| typeof c === 'number';
						if (!t && library_namespace.is_Object(t)) {
							t = c.$;
							if (!t)
								for (t in c)
									break;
							t = t.toLowerCase() !== 'li';
						}

						if(t)
							change = true;
						o.push(t ? {
							li : c
						} : c);
					}

				// 盡量別動到原來的
				if (change)
					children = o;

			} else if (tag === 'select'
				&& library_namespace.is_Object(children)) {
				var i;
				for (i in children)
					break;

				if (i !== 'option') {
					var o = [];
					for (i in children)
						o.push( {
							option : children[i],
							value : i
						});

					// 盡量別動到原來的
					children = o;
				}
			}


			// attributes
			if ('A' in nodes) {
				var a = nodes.A;
				if (typeof a === 'string')
					a = split_String_to_Object(a);

				for (n in a)
					s(n, a[n]);
			}

			for (n in nodes)
				if (!(n in ignore)){
					//library_namespace.debug('new_node: set attribute ['+n+'] = ['+nodes[n]+']'),
					s(n, nodes[n]);
					//library_namespace.debug('new_node: get attribute ['+n+'] = ['+node.getAttribute(n)+']');
				}
		} else if(tag && !_.is_HTML_element(node))
			show_node(node),
			library_namespace.warn('new_node: node is not a HTML Element!');

	} else if (typeof nodes !== 'string'
				&& !Array.isArray(nodes)
				&& (!_.is_HTML_element(nodes) || isNaN(nodes.nodeType))) {
		//	for Safari: Array.isArray(nodes)
		if(nodes)
			library_namespace.warn('new_node: Unknown nodes [' + nodes + ']');

		//	release
		node = null;
		return;
	} else
		node = nodes;


	// layer 處理: 插入document中: 0<layer>1..2</layer>3。default: 2.
	if (typeof layer !== 'undefined' && layer !== null) {
		// 正規化 layer
		// for_each: type→handle function
		if (library_namespace.is_Function(layer))
			for_each = layer;
		else {
			if (Array.isArray(layer))
				for_each = layer[1], layer = layer[0];

			if (layer === 0)
				layer = document.body;
			else if (typeof layer === 'string')
				layer = get_element(layer);
			//	[object HTMLLIElement]
			if (!_.is_ELEMENT_NODE(layer))
				//library_namespace.warn('is_ELEMENT_NODE: ' + _.is_ELEMENT_NODE),
				show_node(layer),
				library_namespace.warn('new_node: layer is not a HTML Element!');

			if (for_each == 1 && (parent = layer.firstChild))
				// add as firstChild of layer
				for_each = handler[1];

			else if (for_each >= 0 && for_each !== 2 && for_each < 5) {
				if (parent = layer.parentNode) {
					// 0: add as priviusSibling of layer.
					// 3: add as nextSibling of layer.
					// 4: add as parent of layer.
					for_each = handler[for_each];
				} else
					// 輸入的 layer 為create出來的?
					library_namespace.warn('new_node: No parent node found!');

			} else if (_.is_ELEMENT_NODE(layer)) {
				//	若輸入 [id, null] 則先清空，相當於 replace。
				if (for_each === null)
					layer = _.remove_all_child(layer);
				// default: appendChild (add as lastChild)
				for_each = handler[2];
			}
		}

	}

	if (!library_namespace.is_Function(for_each))
		for_each = false;

	if (Array.isArray(node)) {
		//	此時 node === nodes
		//nodes = node;
		node = [];
		//	不宜個個重新呼叫是為了效能。
		for ( var i = 0, l = nodes.length, n, _l = layer, _p = parent,
				f = for_each && function(n) {
					//console.log('new_node.Array.for_each: '+[n,_l,_p].join(', '));
					for_each(n, _l, _p);
				} || null
				; i < l; i++) {
			//alert('node['+i+']\n'+nodes[i]);
			node.push(n = new_node(nodes[i], f));
			/*
			node.push(n = new_node(nodes[i], for_each));
			if (for_each)
				try {
					for_each(n, layer, parent);
				} catch (e) {
					library_namespace.err(e);
					library_namespace.err('new_node: handle function execution error for node Array['+i+'/'+l+']!<br />' + for_each);
				}
			*/
		}

	} else {
		//	預防 ['<a></a>','~~'] 之類。
		//if (typeof node === 'string' && for_each !== handler[0])
		//	node = document.createTextNode(nodes);

		if (for_each)
			try {
				for_each(node, layer, parent);
			} catch (e) {
				library_namespace.err(e);
				library_namespace.err('new_node: handle function execution error!<br />' + for_each);
			}

		//	設定 childNodes.
		//	先插入document而後設定childNodes是因為IE有Cross-Page Leaks.
		//	http://www.blogjava.net/tim-wu/archive/2006/05/29/48729.html
		//	http://www-128.ibm.com/developerworks/tw/library/x-matters41.html
		//	Try to use createDocumentFragment()
		//	http://wiki.forum.nokia.com/index.php/JavaScript_Performance_Best_Practices
		if (children !== null && typeof children !== 'undefined')
			new_node(children, node);
	}


	//	This helps to fix the memory leak issue.
	//	http://www.hedgerwow.com/360/dhtml/ie6_memory_leak_fix/
	//	http://jacky.seezone.net/2008/09/05/2114/
	try {
		return typeof node === 'string' ? document.createTextNode(node) : node;
	} finally {
		node = null;
	}
};

new_node.handler = [
	function(node, layer, p) {
		//	將 node 插入作為 layer 之 previousSibling.
		p.insertBefore(typeof node === 'string' ? document.createTextNode(node) : node, layer);
	},
	function(node, layer, p) {
		//	將 node 插入作為 layer 之 firstChild.
		layer.insertBefore(typeof node === 'string' ? document.createTextNode(node) : node, p);
	},
	function(n, l) {
		//	layer.appendChild()
		var is_e = _.is_ELEMENT_NODE(l),
		t = is_e ? l.tagName.toLowerCase() : null;

		if (typeof n === 'number')
			n = n.toString();

		if (t in {
				//	no include <select>!
				textarea : 1,
				input : 1,
				text : 1
			})
			l.value = (l.value || '') + (is_e ? n.innerHTML : n);

		else {
			if (typeof n === 'string') {
				n = n
					// for character (null)
					.replace(/\x00/g, '<span class="control_character">\\x00</span>')
					// '­' (hyphen) 這符號(連字符)可以自動斷行，並在斷行時自動加上個橫槓。在顯示長整數時較有用。
					.replace(/(\d{60})/g, '$1­');

				if (n.indexOf('<') === -1) {
					if (t === 'option' && !l.value)
						l.value = n;
					l.appendChild(document.createTextNode(n));
				} else {
					// this may throw error: -2146827687 未知的執行階段錯誤
					try {
						//	TODO: parse HTML.
						l.innerHTML += n;
					} catch (e) {
						// TODO: handle exception
					}
				}

			} else if (_.is_HTML_element(n)) {
				t = l.innerHTML;
				l.appendChild(n);
				/*
				if (t === l.innerHTML)
					library_namespace.warn('new_node.handler[2]: The addition does not change the layer!');
				*/
			} else {
				library_namespace.warn('new_node.handler[2]: 類型不相符! (['+(typeof n)+'] '+n+')');
			}
		}

		n = null;

	},
	function(node, layer, p) {
		//	將 node 插入作為 layer 之 nextSibling.
		//	p: parent node of layer
		//	TODO: 輸入多 node 時 cache next
		var next = layer.nextSibling;
		if (next)
			p.insertBefore(typeof node === 'string' ? document.createTextNode(node) : node, next);
		else
			p.appendChild(typeof node === 'string' ? document.createTextNode(node) : node);
	},
	function(n, l, p) {
		//	node.appendChild
		n.appendChild(p.replaceChild(n, l));
	}
];

// Namespaces: SVG,MathML,XHTML,XLink,..
new_node.ns = {
		svg : '2000/svg',
		mathml : '1998/Math/MathML',
		xhtml : '1999/xhtml',
		xlink : '1999/xlink',
		// 亦可用'1999/xhtml'
		html : 'TR/REC-html40',
		html4 : 'TR/REC-html40',
		html5 : 'TR/html5'
};
_// JSDT:_module_
.
new_node = new_node;



/*
XML_node('div','id:idName');	doesn't insert, just return the object
XML_node('div',{'id':null});	won't set id
XML_node('div',{'id':undefined});	won't set id

XML_node('div','id:idName',1);	insert at last of document
XML_node('div',{id:'idName'},refO);	insert before(prepend) obj refO: refO.parentNode.insertBefore(_newNode_,refO)
XML_node('div','id:idName',document.body);	insert at top of document
XML_node('div','id:idName',[parent]);	append as a child of obj parent: parent.appendChild(_newNode_)
XML_node('div','id:idName',[parent,0]);	append as a child of obj parent: parent.appendChild(_newNode_)
XML_node('div','id:idName',[parent,refNode]);	insert before refNode: parent.insertBefore(_newNode_,refNode)
XML_node('div','id:idName',[parent,refNode,1]);	insert after refNode: UNDO
XML_node('div','id:idName',[parent,1]);	insert as the first child of parent: parent.insertBefore(_newNode_,parent.firstChild)
XML_node('div','id:idName',[0,refNode]);	insert before refNode: document.body.insertBefore(_newNode_,refNode)
XML_node('div','id:idName',[0]);	append after all: document.body.appendChild(_newNode_,refNode)

XML_node('div','id:idName',0,'asas');	insert 'asas' as innerText
	new_node({div:'asas',id:'idName'},0);
XML_node('div','id:idName',0,'<a>sas</a>');	insert 'asas' as innerHTML
	new_node({div:{a:'sas'},id:'idName'},0);
XML_node('div','id:idName',0,obj);	insert obj as childNode
	new_node({div:obj,id:'idName'},0);
XML_node('div','id:idName',0,[o1,o2]);	insert o1,o2 as childNodes
	new_node({div:[o1,o2],id:'idName'},0);


有用到新建 HTML element 的函數執行完畢應該將所有變數，尤其是 object 重設；
這是因為 HTML element 的存在會使函數裡的 object 變數不能被釋放。
設成 null 是因為 null 不能設定 method，而 string, number 可以。

http://www.blogjava.net/tim-wu/archive/2006/05/29/48729.html
為預防IE Cross-Page Leaks，
use:
XML_node(++, ++, [XML_node(.., .., [meta])]);
instead of:
XML_node(.., .., [meta], XML_node(++, ++));
P.S. 2007/11/11 似乎已修正？


buggy 瑕疵:
XML_node(0,0,[parent],'innerText');	return a textNode append as a child of obj parent

TODO:
XML 中 insertBefore(),appendChild()似乎無反應？	http://developer.mozilla.org/en/docs/SVG:Namespaces_Crash_Course
insertAfter

*/
_// JSDT:_module_
.
/**
 * create new HTML/XML <a href="https://developer.mozilla.org/en/DOM/node">node</a>(<a href="https://developer.mozilla.org/en/DOM/element">element</a>)
 * @deprecated	please use new_node() instead
 * 
 * @param tag	tag name
 * @param propertyO	attributes object
 * @param insertBeforeO	object that we wnat to insert before it
 * @param innerObj	inner object(s)
 * @param styleO	style object
 * @return	node object created
 * @requires	set_attribute,add_node
 * @since	2006/9/6 20:29,11/12 22:13
 * @_memberOf	_module_
 */
XML_node = function(tag, propertyO, insertBeforeO, innerObj, styleO) {
	//	XML 中沒有document.body！
	//if(typeof document.body=='undefined')document.body=document.getElementsByTagName('body')[0];

	if (typeof document !== 'object'
			|| (!document.createElement && !document.createElementNS)
			|| !document.body) {
		library_namespace.warn('XML_node: Cannot create tag [' + tag + '].');
		return;
	}

	var _NS,
	//	Namespaces: SVG,MathML,XHTML,XLink
	_i = new_node.ns,
	//	use Namespaces or not
	//	buggy now.
	_DOM2 = document.createElementNS ? 1 : 0,
	//	Namespaces base
	_e = 'http://www.w3.org/';

	/*
	//	依styleO指定 Namespace
	if (typeof styleO === 'string') {
		if (styleO.indexOf('://') != -1)
			_NS = styleO, styleO = 0;
		else if (_i[styleO])
			_NS = _e + _i[styleO], styleO = 0;
	} else
		// buggy now.
		_DOM2 = 0;//_NS = styleO === null ? null : _e + _i['XHTML'];//undefined==null
	*/

	//	指定 Namespace
	if (tag)
		if (_NS = tag.match(/^(.+):([^:]+)$/)) {
			tag = _NS[2];
			_NS = _NS[1];
			if (_NS.indexOf('://') === -1 && (_i = _i[_NS.toLowerCase()]))
				_NS = _e + _i;
			// library_namespace.warn('XML_node: Add ['+tag+'] of\n'+_NS);
		}

	/*
		for MathML:
			IE: document.createElement('m:'+tag)
				(surely 'mml:', but 'm:' is default of MathPlayer, so now <html> works without the xmlns attribute)
			NS: document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
	*/
	try {
		_e = tag ? _DOM2 && _NS ? document.createElementNS(_NS, tag)
				: document.createElement(tag/* .replace(/[<>\/]/g,'') */)
				: document.createTextNode(innerObj || '');
	} catch (_e) {
		library_namespace.warn('XML_node: Error create tag:\n' + tag/* + '\n' + _e.description */);
		return;
	}
	if (tag)
		_.set_attribute(_e, propertyO);

	//	IE需要先appendChild才能操作style，moz不用..??
	if (tag && styleO && _e.style)
		if (typeof styleO === 'string')
			_e.style.cssText = styleO;
		else if (typeof styleO === 'object')
			for (_i in styleO)
				//	is_IE?"styleFloat":"cssFloat"
				_e.style[_i === 'float' ? 'cssFloat' in _e.style ? 'cssFloat' : 'styleFloat' : _i] = styleO[_i];
	//else library_namespace.warn('XML_node: Error set style:\n[' + styleO + ']');


	//	插入document中。先插入document而後設定childNodes是因為IE有Cross-Page Leaks
	//	http://www.blogjava.net/tim-wu/archive/2006/05/29/48729.html
	//	http://www-128.ibm.com/developerworks/tw/library/x-matters41.html
	if (insertBeforeO) {
		var rO = undefined/* [][1] */, tO = function(_o) {
			return typeof _o == 'string' && (_i = document.getElementById(_o)) ? _i
					: _o;
		}, iO = tO(insertBeforeO);
		// Opera9 need .constructor===Array
		if (Array.isArray(iO) && iO.length)
			// 在disable CSS時可能會 Warning: reference to undefined property iO[1]
			// rO: referrer object,
			// 以此決定以appendChild()或insertBefore()的形式插入
			rO = iO.length > 1 && tO(iO[1]) || 0, iO = tO(iO[0]);

		//if(typeof iO !== 'object' && (iO = document.body, typeof rO === 'undefined')) rO = 0;
		if (typeof iO !== 'object') {
			iO = document.body;
			if (typeof rO === 'undefined')
				rO = 0;
		}

		if (typeof rO === 'undefined')
			iO = (rO = iO).parentNode;
		if (iO)
			// 預防輸入的rO為create出來的
			if (rO)
				try {
					//	.firstChild == .childNodes[0]
					iO.insertBefore(_e, rO === 1 ? iO.firstChild : rO);
				} catch (e) {
					library_namespace.warn('XML_node: ' + e.message + '\niO:'
							+ iO + '\nrO:' + rO);
				}
				else
					//document.body.insertBefore(_e, iO);
					iO.appendChild(_e);
	}


	//	設定 childNodes
	if (tag)
		_.add_node(_e, innerObj);
	/*
	 if (tag && innerObj)
		(_i = function(_o) {
			if (typeof _o == 'object') {
				if (_o)
					if (Array.isArray(_o))// &&_o.length
						for ( var _j = 0; _j < _o.length; _j++)
							_i(_o[_j]);
					else
						_e.appendChild(_o);
				return;
			}
			if (typeof _o == 'number' && !isNaN(_o))
				// _o+='';
				_o = _o.toString();
			if (typeof _o == 'string')
				if (_o.indexOf('<') != -1)
					_e.innerHTML += _o;
				else
					_e.appendChild(document.createTextNode(_o));
			//else library_namespace.warn('XML_node: Error insert contents:\n[' + _o + ']');
		})(innerObj);
	*/

	//	this helps to fix the memory leak issue
	//	http://www.hedgerwow.com/360/dhtml/ie6_memory_leak_fix/
	//	http://jacky.seezone.net/2008/09/05/2114/
	try {
		return _e;
	} finally {
		_e = null;
	}
};



/**
 * select/get node/elements/frame/.. 通用.<br />
 * A simple CSS selector with iframe.<br />
 * Support #id, type(tag name), .name, .<br />
 * TODO: 最佳化.
 * 
 * @param {String}selector
 *            CSS selector, XPath, ..
 * @param {String|HTMLLIElement}[base_space]
 *            base document/context
 * @returns node
 * @see Sizzle, <a href="http://simonwillison.net/2003/Mar/25/getElementsBySelector/" accessdate="2012/6/20 15:29">getElementsBySelector()</a><br />
 * http://www.mrmu.com.tw/2011/10/11/writing-efficient-css-selectors/
 * 
 */
function select_node(selector, base_space, options) {
	library_namespace.debug('Get [' + selector + ']', 2, 'select_node');
	if (library_namespace.is_Object(base_space)) {
		base_space = base_space.base;
	}

	try {
		if (typeof base_space === 'string' && base_space) {
			base_space = select_node(base_space);
		}
		if (!base_space) {
			library_namespace.debug('Set base to window.document.', 3, 'select_node');
			base_space = window.document;
		}
		if (library_namespace.is_debug(3)) {
			library_namespace.debug('base_space: '+base_space+' (see below):', 3, 'select_node');
			show_node(base_space);
		}

		//	http://inspire.twgg.org/programming/javascript/item/383-more-efficient-than-the-native-jquery-dom-selector-queryselector-and-queryselectorall.html
		var result;
		if(base_space.querySelectorAll)
			try {
				library_namespace.debug('using native .querySelectorAll() to select ['+selector.replace(/\$([_a-z][_a-z\d]*)/gi, '[name="$1"]')+'].', 2, 'select_node');
				result = base_space.querySelectorAll(
						//	處理本函數特有之**非標準**功能。尚有問題！
						selector.replace(/\$([_a-z][_a-z\d]*)/gi, '[name="$1"]'));
				if (result.length > 0)
					return result.length > 1 ? result : result[0];
				library_namespace.debug('Nothing got. 嘗試本 library 傳統方法。', 2, 'select_node');
			} catch (e) {
				library_namespace.debug('可能有不支援的 selector。改回本 library 傳統方法。', 2, 'select_node');
			}

		result = base_space;
		var tmp_node, tag_name, identifier, part,
		//	CSS selector match pattern<br />
		//	http://www.w3.org/TR/selectors/<br />
		//	[selector flagment, combinator, tagName/type ONLY or all pattern, tagName/type, selector notation, identifier/class name/pseudo-element, attribute selector]
		pattern = /\s*([>+~])?\s*(([^#.$\[:>+~\s]*)(?:(::?|[#.$])([^#.$\[:>+~\s]+)|\[([^\]]+)\])|[^#.$\[:>+~\s]+)/g,
		//	.getElementById()
		get_id = function(id) {
			//	IE 8 中 .getElementById 可能是 'object'!
			var node = typeof result.getElementById !== 'undefined' ?
					result.getElementById(id)
					: base_space.getElementById(id);
			//	IE 10 中，只有 <frame> 時，document.getElementById() 得不到 <frame>!
			if (!node && base_space.frames) {
				library_namespace.debug('嘗試採用 document.frames[' + id + ']。', 2, 'select_node');
				if (node = base_space.frames[id])
					node = node.document;
			}
			return node;
		};
		/*
		//	for test
		pattern = /\s*([>+~])?\s*(([^#.\[:>+~\s]*)(?:(::?|[#.])([^#.\[:>+~\s]+)|\[([^\]]+)\])|[^#.\[:>+~\s]+)/g;
		selector = 'node #id > node#id .class +node.class :pseudo~ node:pseudo [attr] node[attr]';
		while (part = pattern.exec(selector)) {
			if (typeof CeL === 'function')
				CeL.log(part.join('<em>|</em>'));
			else
				console.log(part.join('|') + '\n');
		}
		*/

		// parse selector
		//pattern.exec('');
		while (part = pattern.exec(selector)) {
			library_namespace.debug('Pattern: [' + part.join('<em>|</em>') + ']', 3, 'select_node');
			//	前置處理 node
			tmp_node = result;
			library_namespace.debug('測試是否為從 .getElementsByName(), .getElementsByTagName(), .querySelectorAll() 等得到的 NodeList。', 3, 'select_node');
			if (_.is_NodeList(tmp_node)) {
				if (library_namespace.is_debug(2))
				if (tmp_node.length === 1)
					library_namespace.debug('It is NodeList. Move to [0].', 2, 'select_node');
				else
					library_namespace.warn('select_node: 共有 ' + tmp_node.length + ' 個 node!');
				tmp_node = tmp_node[0];
			}
			library_namespace.debug('測試是否為 ELEMENT_NODE 或 DOCUMENT_NODE。', 3, 'select_node');
			if (!_.is_ELEMENT_NODE(tmp_node) && !_.is_DOCUMENT_NODE(tmp_node)) {
				library_namespace.err('select_node: 基準 node.nodeType = ' + tmp_node.nodeType + ', '
						+ (_.is_ELEMENT_NODE(tmp_node) ? '' : '非 ELEMENT_NODE, ')
						+ (_.is_DOCUMENT_NODE(tmp_node) ? '' : '非 DOCUMENT_NODE, ') + 'exit!');
				//show_node(tmp_node);
				break;
			}
			tag_name = _.is_ELEMENT_NODE(tmp_node) ? tmp_node.tagName : '';
			library_namespace.debug('測試 &lt;' + tag_name + '&gt; 是否為 frame。', 3, 'select_node');
			// '[object HTMLFrameElement]' === '' + tmp_node
			if (typeof tag_name === 'string' && (tag_name.toLowerCase() in {
				frame : 1,
				iframe : 1
			})) {
				library_namespace.debug('Reset context for &lt;' + tag_name + '>.', 2, 'select_node');
				base_space = tmp_node = tmp_node.contentWindow.document;
			}
			library_namespace.debug('Try to select [' + part.join('<em>|</em>') + ']' + (tag_name ? ' @ &lt;' + tag_name + '&gt;' : ''), 3, 'select_node');

			tag_name = part[3] || part[2];
			identifier = part[5];
			switch (part[4]) {
			case '#':
				if (tmp_node = get_id(identifier))
					break;

			case '$':
				// id 與 name 互相查詢。 ** "$" 非標準!! 標準: tag[name=_name_] **
				tmp_node = typeof tmp_node.getElementsByName !== 'undefined' ?
						tmp_node.getElementsByName(identifier)
						: base_space.getElementsByName(identifier)
						|| get_id(identifier);
				break;

			case '.':
				//	TODO: class name
				if (identifier && !tmp_node.querySelectorAll) {
					//library_namespace.err('select_node: unknown selector: 尚未實現 class name！ [' + part.join('<em>|</em>') + ']');
					if ((tmp_node = find_class(identifier, tmp_node, tag_name)) && tmp_node.length === 1) {
						library_namespace.debug('選取單一個 ' + tag_name + '.' + identifier + '。', 3, 'select_node');
						tmp_node = tmp_node[0];
					} else {
						if (tmp_node && tmp_node.length === 0)
							tmp_node = undefined;
						library_namespace.warn('select_node: 共有 ' + (tmp_node && tmp_node.length) + ' 個 node!');
					}
					break;
				}

			//case '[':
			//case '>':

			default:
				if (tmp_node.querySelectorAll)
					tmp_node = tmp_node.querySelectorAll(part[0].replace(/\$([_a-z][_a-z\d]*)/i, '[name="$1"]'));
				else if (tag_name) {
					tmp_node = tmp_node.getElementsByTagName ?
							tmp_node.getElementsByTagName(tag_name)
							: base_space.getElementsByTagName(tag_name);
				} else {
					library_namespace.err('select_node: unknown selector: 尚未實現之功能！ [' + part.join('<em>|</em>') + ']');
					return tmp_node;
				}
			}

			if (tmp_node) {
				result = tmp_node;
				//show_node(result);
			} else {
				library_namespace.warn('No [' + part[0] + '] got.');
				break;
			}
		}
		return result;

	} catch (e) {
		library_namespace.warn('select_node(' + selector + '): ' + (
				//	@IE9: Error null: 5007 [TypeError] (facility code 10): 無法取得屬性 'getElementsByName' 的值: 物件為 null 或未經定義.
				(e.number & 0xFFFF) === 5007 ? "The base node isn't YET READY?" : 'error!'));
		library_namespace.err(e);
	}
}

_// JSDT:_module_
.
select_node = select_node;


/**
 * 對 nodes 指定之每一個 node 皆執行相同操作。<br />
 * TODO: buggy.
 * 
 * @param {Function}action
 *            指定動作。若 return true 或 throw 則回傳失敗的 node。
 * @param {String|NodeList|Array|HTMLElement}[nodes]
 *            指定 selector || nodes || node, filter。
 * @param {Object}[options]
 *            指定 options。<br />
 *            options.self = this object<br />
 *            options.traversal = depth/breadth: traversal: depth-first search (DFS) / breadth-first search (BFS).
 * 
 * @since	2012/10/15 23:39:12
 */
function for_nodes(action, nodes, options) {

	if (!nodes)
		// select all nodes
		nodes = document.querySelectorAll ? document.querySelectorAll('*')
				: select_node('*');
	else if (typeof nodes === 'string')
		// selector || id
		nodes = select_node(nodes) || get_element(nodes);

	if (_.is_ELEMENT_NODE(nodes) || _.is_DOCUMENT_NODE(nodes)) {
		if (nodes.item && !isNaN(nodes.length))
			// for <select>.options @ IE8
			nodes = library_namespace.get_tag_list(nodes);
		else
			// HTMLElement
			nodes = [ nodes ];
	} else if (_.is_NodeList(nodes))
		// 預防中途變動。
		nodes = library_namespace.get_tag_list(nodes);

	var i = 0, length = nodes.length, node, n, traversal, thisArg;

	if (library_namespace.is_Object(options)) {
		thisArg = options.self;
		traversal = options.traversal;
		if (traversal === 'depth')
			traversal = 1;
		else if (traversal === 'breadth')
			traversal = 2;
	}

	if (action && Array.isArray(nodes))
		for (; i < length; i++)
			if (node = nodes[i]) {
				if (traversal === 1 && (n = node.childNodes)) {
					if (n = for_nodes(action, n, options))
						return n;
				}

				try {
					if (thisArg ? action.call(thisArg, node, i, nodes)
							: action(node, i, nodes))
						throw 0;
				} catch (e) {
					return node;
				}

				// TODO: breadth-first search
			}

	// return nodes;
}

_// JSDT:_module_
.
for_nodes = for_nodes;


/**
 * 
 * @param node
 * @param actions
 * @returns
 */
function for_attributes(node, actions) {
	if (typeof actions === 'string' && actions)
		actions = new RegExp(actions, 'i');

	var index = 0, attributes = node.attributes, attribute, length = attributes.length, cache,
	//
	is_RegExp = library_namespace.is_RegExp(actions);

	for (; index < length; index++) {
		//attribute = attributes[index];
		attribute = attributes.item(index);
		if (is_RegExp) {
			if (!actions.test(attribute.nodeName))
				continue;
		} else if (typeof actions === 'function')
			actions(attribute.nodeName, attribute.nodeValue, node);
		if (!cache)
			cache = library_namespace.null_Object();
		//attribute.nodeName === attribute.name
		//attribute.nodeValue === node.getAttribute(attribute_name)
		cache[attribute.nodeName] = attribute.nodeValue;
	}

	return cache;
}

_// JSDT:_module_
.
for_attributes = for_attributes;



/*	用在top的index.htm中，當setTopP()後指定特殊頁面	2005/1/26 21:46
set:	window.onload=setFrame;
	var setFrameTarget='MAIN',setFrameTargetSet={'menu.htm':'MENU','all.htm':'MENU','midi.htm':'MIDI'};

** xhtml1-frameset.dtd中<script>只能放在<head>
*/
var setFrameTarget,setFrameTargetSet;	//	預設target, 轉頁的target lists
//setFrame[generateCode.dLK]='setFrameTarget,setFrameTargetSet';
function setFrame(){
 //alert(window.name);
 //for(var i=0;i<window.frames.length;i++)alert(window.frames[i].name);
 //alert(top.location.href+'\n'+location.href+'\n'+(top.location.href!=location.href)+'\n'+(window.top!=window.window));
 if(window.top!=window.window){//top.location.href!=location.href
  window.top.location.replace(location.href);
  return;
 }
 var l,f;
 try{l=location.hash.slice(1);}catch(e){return;}	//	IE在about:blank的情況下呼叫網頁，網頁完全載入前location無法呼叫。例如從FireFox拉進IE時使用location.*有可能'沒有使用權限'，reload即可。
 if(typeof setFrameTargetSet!='object')setFrameTargetSet={};
 if(l)try{l=decodeURIComponent(l);}catch(e){l=unescape(l);}
 //location.hash='';	//	這一項會reload
 if( l && (f=(f=l.match(/([^\/]+)$/)?RegExp.$1:l)&&(f=f.match(/^([^?#]+)/)?RegExp.$1:f)&&(l in setFrameTargetSet)?setFrameTargetSet[f]:setFrameTarget) && f!=window.name && window.frames[f] && window.frames[f].location.href!=l )
  //alert(l+'\n==>\n'+f),
  window.open(l,f);//if((l=window.open(l,f).top).focus(),alert(l!=self.top),l!=self.top)self.top.close();//alert(l+'\n'+f),	//	moz需要等到frame load之後才能得到window.frames[f].location.href==l的結果，所以可以考慮作setTimeout的延遲。但是假如真的不是預設的page，這樣會造成多load一遍。
 //setTimeout('alert(window.frames["'+f+'"].location.href);',900);
}
/*
	set window.top page to certain location
	setTopP(location,search)
	search===setTopP_doTest: do a test, return window.top不為指定頁?1:0
*/
var setTopPDTopP,setTopP_doTest=.234372464;	//	default top page(file) path
//setTopP[generateCode.dLK]='dBasePath,getFN,setTopPDTopP,setTopP_doTest';
function setTopP(l, s) {
	if (!setTopPDTopP)
		return 2;
	if (!l)
		l = dBasePath(setTopPDTopP) + getFN(setTopPDTopP);
	// alert(l);
	if (typeof s == 'undefined')
		try {
			//	IE在about:blank的情況下呼叫網頁，網頁完全載入前location無法呼叫。
			//	例如從FireFox拉進IE時使用location.*有可能'沒有使用權限'，reload即可。
			s = window/* self */.location.search;
		} catch (e) {
			return;
		}
	var t, r = /[\/\\]$/i, ri = /[\/\\](index\.[xs]?html?)?$/i;
	try {
		//	top.location.pathname在遇到local file時可能出問題。
		//	若不同domain時top.location也不能取用，應改成window.top!=window.window
		t = window.top.location.href.replace(/[?#](.*)$/, '');
	} catch (e) {
		t = '';
	}
	// alert(t+'\n'+l+'\n'+(t!=l));
	if (t != l && !(r.test(l) && ri.test(t)) && !(ri.test(l) && r.test(t)))
		if (s === setTopP_doTest)
			return 1;
		// replace() 方法可以開啟檔案，但是卻不會更動瀏覽器的瀏覽歷程（history）內容.
		// IE6 若 location.href.length > 2K，光是'location.search'這項敘述就會導致異常。
		else
			// 預設page：xx/和xx/index.htm相同
			window.top.location.replace(l + s + '#'
					+ encodeURIComponent(location.href));
};


//	設在body.onload，改變IE中所有<a>在滑鼠移入移出時的 window.status
var setAstatusOS;	//	old status,也可設定event.srcElement.ostatus等等，但考慮到將造成記憶體浪費…
//setAstatus[generateCode.dLK]='setAstatusOver,setAstatusOut';
function setAstatus() {
	if (library_namespace.is_WWW() && typeof window.event !== 'undefined' && typeof window.status === 'string'
			//||typeof event.srcElement=='undefined'
		)
		// 預防版本過低(4以下)的瀏覽器出現錯誤：event至IE4才出現
		for_nodes(function(o) {
			if (o.title && !o.onmouseover && !o.onmouseout)
				o.onmouseover = setAstatusOver,
				o.onmouseout = setAstatusOut;
		}, 'a');
};
//setAstatusOver[generateCode.dLK]=setAstatusOut[generateCode.dLK]='setAstatusOS';
function setAstatusOver() {
	var o = window.event.srcElement;
	if (o.title) {
		setAstatusOS = window.status, window.status = o.title;
		return true;
	}
};
function setAstatusOut() {
	//var o=event.srcElement;if(typeof o.ostatus!='undefined'){window.status=o.ostatus;return true;}
	window.status = setAstatusOS;
	return true;
};





_// JSDT:_module_
.
/**
 * fill data to table.
 * 增加 table 的列(row)
 * @param {Array|Object} data	data list
 * @param table	table element
 * @param {Array} header	header list
 * @return
 * @example
 * table_list([list1],[list2],..)
 * e.g.,	table_list([1,2,3,4],[4,5,3,4]);
 * table_list([[list1],[list2],..])
 * e.g.,	table_list( [ [1,2,3,4],[4,5,3,4] ] );
 * @since	2010/05/03 14:13:18
 * @_memberOf	_module_
 * @see
 * http://www.datatables.net/
 */
table_list = function(data, table, header, do_clean) {
	var i = 0, l, add_list = function(array, d) {
		if (!Array.isArray(array))
			return;

		var j = 0, tr = document.createElement('tr'), td, array, L = array.length;
		for (; j < L; j++) {
			td = document.createElement(d || 'td');
			td.appendChild(document.createTextNode(array[j]));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	};

	if (typeof table === 'string')
		table = document.getElementById(table);

	/*
	//	in  Chrome/5.0.342.9 @ Ubuntu, 加了會出問題。
	try{
		if(l=table.getElementsByTagName('tbody'))
			table=l[0];
	}catch(e){}
	*/

	if (do_clean)
		_.remove_all_child(table);
		/*
		try {
			// moz
			table.innerHTML = '';
		} catch (e) {
			try {
				// alert(table.rows.length);
				// IE
				for ( var i = table.rows.length; i > 0;)
					table.deleteRow(--i);
			} catch (e) {
			}
		}
		*/

	if (header)
		add_list(header, 'th');

	if (data.length === 1 && typeof (l=data[0]) === 'object'
			&& Array.isArray(l[0]))
		data = l;

	if (Array.isArray(data))
		for (l = data.length; i < l; i++) {
			add_list(data[i]);
		}
	else if (library_namespace.is_Object(data)) {
		for (i in data) {
			add_list( [ i, data[i] ]);
		}
	} else
		library_namespace.debug('Error input: not legal data!');
};




/*	Copy id(or object) to user's clipboard or Paste clipboard to id(or object).

	return the value set to clipboard
	http://msdn.microsoft.com/workshop/author/dhtml/reference/objects/obj_textrange.asp
	http://msdn.microsoft.com/workshop/author/dhtml/reference/collections/textrange.asp
	http://msdn.microsoft.com/workshop/author/dhtml/reference/methods/execcommand.asp
	way 2:use window.clipboardData	http://msdn.microsoft.com/workshop/author/dhtml/reference/objects/clipboarddata.asp

	clipboardFunction()	paste/get clipboard
	clipboardFunction(0,divObj)	paste/get clipboard to divObj
	clipboardFunction(1,'divObj name')	Copy divObj to clipboard/set clipboard
	clipboardFunction(2,'dcfvdf')	set clipboard by string
	clipboardFunction(3,divObj)	Copies divObj to the clipboard/set clipboard and then deletes it. *return the value set to clipboard
*/
var clipboardFunctionObj = 'clipboardFunctionDiv';
//clipboardFunction[generateCode.dLK]='clipboardFunctionObj';
function clipboardFunction(m,o){	//	method,object/(string)set value
if(window.navigator.appName=="Microsoft Internet Explorer"){
 var t,O,tN;
 if(m==2)t=o,o='';else if(typeof o=='string')o=document.getElementById(o);
 //	try .nodeName instead of .tagName	http://twpug.net/modules/smartsection/item.php?itemid=35
 if((typeof o!='object'||!o||(tN=(o.tagName||'').toLowerCase())!='textarea'&&tN!='select'&&tN!='option'&&(tN!='input'||o.type!='text')&&(O=o))&&!(o=document.getElementById(clipboardFunctionObj)))	//	textarea,select,option,input需使用.value!	o.type!='INPUT'||o.type!='text'：這樣大概也沒copy的價值了吧，應該會出現錯誤。
  try{document.body.appendChild(o=document.createElement('textarea')),o.id=clipboardFunctionObj;}catch(e){return;}	//	只對IE5.5之後有用
 //var t=document.body.createTextRange();t.moveToElementText(o);
 if(m==2)o.value=t;else{if(O)o.value=O.innerText;if(m==3)t=o.value;}
 if(o.id==clipboardFunctionObj)o.style.display='block';	//	得出現才能execCommand()
 o.createTextRange()//TextRange Object
	.execCommand(m?m==3?"Cut":"Copy":"Paste");
 if(o.id==clipboardFunctionObj)o.style.display='none';
 //t.execCommand("ForeColor","false","plum"),t.execCommand("BackColor","false","glay");
 //alert(o.tagName+'\n'+o.id+'\n['+o.innerText+']\n'+(m?m==3?"Cut":"Copy":"Paste"));
 if(m!=3)t=o.value;
 if(O)O.innerText=o.value;
 return t;
}

//	http://www.mozilla.org/xpfe/xptoolkit/clipboard.html
//	http://mozilla.org/editor/midasdemo/securityprefs.html
//	http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/06/21/4850.aspx
//	http://www.webdeveloper.com/forum/archive/index.php/t-170520.html
//	http://forum.moztw.org/viewtopic.php?p=131407
/*
if(window.navigator.appName=="Netscape"){	//	…不能用！
 if(typeof o=='string')o=document.getElementById(o);
 if(m==2||!o||o.tagName!='TEXTAREA'&&o.tagName!='SELECT'&&o.tagName!='OPTION'&&(o.tagName!='INPUT'||o.type!='text'))return;	//	無法設定

 if(!Zwischenablage){	//	初始設定
  netscape.security.PrivilegeManager.enablePrivilege("UniversalSystemClipboardAccess");
  //var fr=new java.awt.Frame();
  Zwischenablage=new java.awt.Frame().getToolkit().getSystemClipboard();
 }

 if(m==0){
  var Inhalt=Zwischenablage.getContents(null);
  if(Inhalt!=null)o.value=Inhalt.getTransferData(java.awt.datatransfer.DataFlavor.stringFlavor);
 }
 else{	//	m=1,3
  o.select();
  Zwischenablage.setContents(new java.awt.datatransfer.StringSelection(o.value),null);
 }

 return o.value;
}
*/
}	//	clipboardFunction()



_// JSDT:_module_
.
Clipboard = function() {
};

_// JSDT:_module_
.
Clipboard.get = function() {
	var clip;
	if (clip = window.clipboardData) {
		clip.getData('Text');
	}
};


_// JSDT:_module_
.
//	2010/1/15 00:17:38
//	IE, FF only
//	http://www.jeffothy.com/weblog/clipboard-copy/
//	http://bravo9.com/journal/copying-into-the-clipboard-with-javascript-in-firefox-safari-ie-opera-292559a2-cc6c-4ebf-9724-d23e8bc5ad8a/
//	http://code.google.com/p/zeroclipboard/
Clipboard.set = function(text) {
	var clip;
	if (clip = window.clipboardData) {
		clip.clearData();
		clip.setData('Text', text);
	} else if (library_namespace.is_WWW() && window.Components){
		library_namespace.require_netscape_privilege(
			//	在您的機器上執行或安裝軟體
			'UniversalXPConnect', function() {
			//	https://developer.mozilla.org/en/Using_the_Clipboard
			//	[xpconnect wrapped nsIClipboardHelper]
			return Components.classes["@mozilla.org/widget/clipboardhelper;1"]
					.getService(Components.interfaces.nsIClipboardHelper)
					//	跳出函數即無效，因此不能 cache。
					.copyString(text);
		});
	}
	//else if (navigator.userAgent.indexOf("Opera") != -1)
	//	window.location = text;
};



/*	2009/5/13 21:21:49
	unfinished
*/
function clipB() {
}
clipB.start_op = function() {
	var o = this.temp_obj;
	if (!o) {
		document.body.appendChild(o = document.createElement('div'));
		// for modify
		o.contentEditable = true;
		// o.style.height=0;o.style.width=0;
		this.temp_obj = o;
	}

	document.selection.empty();
	// initial
	_.remove_all_child(o);
	// 得出現才能 focus(), execCommand()
	o.style.display = 'block';
	o.focus();
	return o;
};
clipB.end_op = function() {
	var o = this.temp_obj;
	document.selection.empty();
	if (o)
		o.style.display = 'none';
};
//	return [text, obj]
clipB.get_obj = function(t) {
	var o;
	if (typeof t == 'object' && 'innerHTML' in t
			|| (o = document.getElementById('' + t)) && (t = o))
		return [ t.innerHTML, t ];
	return [ t ];
};
clipB.paste_to = function(o) {
	o = this.get_obj(o);
	if (o = o[1])
		o.innerHTML = this.get(1);
};
clipB.set = function(o) {
	o = this.get_obj(o);
};
//	get HTML
clipB.get = function(h) {
	var o = this.start_op(), r = document.selection.createRange(), t;
	r.select();
	r.execCommand('Paste');
	t = h ? r.htmlText : r.text;
	this.end_op();
	return h ? o.innerHTML : o.innerText;
};
clipB.cut_from = function(o) {
	o = this.get_obj(o);
};


//從後面調過來的
var disabledKM = 0, scrollToXY, scrollToInterval, scrollToOK, doAlertDivName, doAlertOldScrollLocation;


_// JSDT:_module_
.
/**
 * 設定document.cookie.
 * You can store up to 20 name=value pairs in a cookie, and the cookie is always returned as a string of all the cookies that apply to the page.
 * TODO:
 * HTML5 localStorage (name/value item pairs).
 * test various values.
 * document.cookie.setPath("/");

 * @example
	範例：
//	delete domain
set_cookie('domain',0);
//	一個月(30 days)
set_cookie('expires',30);
//	設定name之值為jj
set_cookie(name,'jj');
//	設定name之值為56
set_cookie(name,56);
//	除去name
set_cookie(name);
//	設給本host全部使用
set_cookie(_.set_cookie.f.set_root);
//	設給本domain使用
set_cookie(_.set_cookie.f.use_domain);
//	依現有設定除去所有值
set_cookie(_.set_cookie.f.delete_all);
//	除去所有值
set_cookie(_.set_cookie.f.delete_all_root);
//	永久儲存（千年）
set_cookie(_.set_cookie.f.forever);
//	準確設定這之後只在這次瀏覽使用這些cookie，也可用set_cookie('expires',-1);
set_cookie(_.set_cookie.f.moment);
//	將expires設定成forever或moment後再改回來（不加expires設定）
set_cookie('expires',0);

 * @param {String|Object|_module_.set_cookie.f} name	set_cookie.f flag | varoius name
 * @param value	varoius value
 * @param {Boolean|Object} config	若對於特殊設定僅暫時設定時，設定此項。
 * @returns
 * @see
 * Chrome doesn't support cookies for local files unless you start it with the --enable-file-cookies flag.
 * chrome.exe --allow-file-access-from-files --enable-extension-timeline-api --enable-file-cookies
 * http://stackoverflow.com/questions/335244/why-does-chrome-ignore-local-jquery-cookies
 * http://code.google.com/p/chromium/issues/detail?id=535
 * @_memberOf	_module_
 */
set_cookie = function (name, value, config) {
	if (!library_namespace.is_WWW(true) || typeof document.cookie !== 'string'
				|| typeof name === 'undefined')
		return;

	var _s = _.set_cookie, flag = _s.f, m;
	if (!config)
		//	預設傳到 default
		config = _s.c;
	else if (!library_namespace.is_Object(config))
		//	document.cookie 不須每次詳細設定，但這樣可以選擇 {} / {..} / true
		config = library_namespace.extend(_s.c, {});

	if (library_namespace.is_Object(name)) {
		for ( var i in name)
			_s(i, name[i], config);
		return config;
	}

	try {
		//	This will cause error in Phoenix 0.1:
		// Error: uncaught exception: [Exception... "Component returned failure code: 0x8000ffff (NS_ERROR_UNEXPECTED) [nsIDOMNavigator.cookieEnabled]"  nsresult: "0x8000ffff (NS_ERROR_UNEXPECTED)"  location: "JS frame :: http://lyrics.meicho.com.tw/game/game.js :: set_cookie :: line 737"  data: no]
		if (window.navigator && !window.navigator.cookieEnabled)
			throw 1;
	} catch (e) {
		library_namespace.warn('set_cookie: We cannot use cookie!');
		return;
	}

	//library_namespace.debug('set_cookie: ' + name + ' = [' + value + ']', 1);
	if (name === flag.set_root)
		// 設給本 host 全部使用
		name = 'path', value = '/';
	else if (name === flag.use_domain)
		// 設給本 domain 使用，尚不是很好的判別法。
		name = 'domain', value = location.hostname.replace(/^[^.]+\./, '.');
	else if (name === flag.forever)
		// 永久儲存，date之time值不能>1e16
		name = 'expires', value = 1e14;
	else if (name === flag.moment)
		// 準確設定這之後只在這次瀏覽使用這些cookie
		name = 'expires', value = -1;

	// detect special config / 特殊設定
	if (typeof name === 'string'
			&& (m = name.match(/^(expires|path|domain|secure)$/i))) {
		name = m[1];
		if (name === 'expires' && typeof value === 'number' && value) {
			//if(value<8000)value*=86400000;//幾日，86400000=1000*60*60*24
			//value=(new Date(value<3e13?(new Date).getTime()+value:1e14)).toUTCString();	//	3e13~千年
			value = (new Date(value < 1e14 ? value < 0 ? 0 : (new Date).getTime()
					+ (value < 8e3 ? value * 86400000 : value) : 1e14)).toUTCString();
		}
		config[name] = value;
		//library_namespace.debug('set_cookie: ' + name + ' = [' + value + ']', 1);
		return name + '=' + value + ';';

	} else {
		var set = name === flag.delete_all_root ? 'expires=' + (new Date(0)).toUTCString() + ';path=/;'
			: (typeof value === 'undefined' ? 'expires=' + (new Date(0)).toUTCString() + ';'
			: config.expires ? 'expires=' + config.expires + ';' : '')
				+ (config.path ? 'path=' + config.path + ';' : '')
				+ (config.domain ? 'domain=' + config.domain + ';' : '')
				+ (config.secure ? 'secure;' : '');

		if (name === flag.delete_all || name === flag.delete_all_root) {
			/*
			   var c=document.cookie;
			   while(c.match(/([^=;]+)(=[^;]{0,})?/)){
			    c=c.substr(RegExp.lastIndex);
			    if(!/expires/i.test(RegExp.$1))document.cookie=RegExp.$1+'=;'+set;
			   }
			*/
			for ( var p = document.cookie.split(';'), n, l = p.length, i = 0; i < l; i++)
				if (!/^\s*expires\s*$/i.test(n = c[i].split('=')[0]))
					document.cookie = n + '=;' + set;
			return document.cookie;

		} else {
			//	可用escape(value)/unescape()來設定，速度會比較快，但佔空間。
			//value=name+'='+(typeof value=='undefined'?'':dQuote(''+value).replace(/([\01-\11\13-\14\16-\40=;])/g,function($0,$1){var c=$1.charCodeAt(0),d=c.toString(16);return'\\x'+(c<16?'0':'')+d;}))+';'+set;
			//	2004/11/23 21:11	因為cookie儲存成中文時會fault,所以只好還是使用escape()
			value = escape(name) + '='
					+ (typeof value == 'undefined' ? '' : escape(value)) + ';'
					+ set;
			//library_namespace.debug('set_cookie: [' + value + ']', 1);
			//library_namespace.debug('set_cookie: [' + document.cookie + ']', 1);
			// 長度過長時（約4KB）會清空，連原先的值都不復存在！
			return value.length < 4096 && (document.cookie = value) ? value
					: -1;
		}

	}
};

_// JSDT:_module_
.
set_cookie.f = {
		moment : -1,
		delete_all : 2,
		delete_all_root : 3,
		set_root : 4,
		use_domain : 5,
		forever : 6
};

_// JSDT:_module_
.
//	特殊設定
set_cookie.c = {
		expires : 0,
		path : 0,
		domain : 0,
		secure : 0
};

/*	取得document.cookie中所需之值	看起來只能取得相同domain，有設定的path之cookie

	flag=0: only get the lastest matched value;
	flag=1: only get all matched in a array;
	other flag: auto detect by name

get_cookie(name);	//	取得name之值，亦可用RegExp：if(c=get_cookie())c['name1']==value1;
get_cookie('nn[^=]*');	//	取得所有nn開頭之組合
get_cookie();	//	取得所有name=value組

因為 cookie 較容易遭到竄改或是出問題，建議設定 verify。
*/
_// JSDT:_module_
.
//get_cookie[generateCode.dLK]='renew_RegExp_flag';
get_cookie=function (name,flag,verify){
 if(!library_namespace.is_WWW()||!document.cookie)return;
 if(!name)name='[^;=\\s]+';//\w+
 var c, R = library_namespace.is_RegExp(name)?name:new RegExp('('+escape(name)+')\\s*=\\s*([^;=\\s]*)','g')
	,m=document.cookie.match(R);
 //library_namespace.debug('get_cookie: [' + R + '] = ['+m+']', 1);
 //library_namespace.debug('get_cookie: [' + document.cookie + ']', 1);
 if(!m)return;
 if(R.global)R=library_namespace.renew_RegExp_flag(R,'-g');
 if(m.length>1)
	 //	取最後一個
	 if(flag==0 || typeof flag=='undefined'&&typeof name=='string')
		 m=m.slice(-1);
 //	表示不是因name為RegExp而得出之值.
 //	TODO: bug: 找 "count" 可能找到 "data_count"!!
 if(m.length===1&&typeof m[0]==='string'&&(c=m[0].match(R))[1]===escape(name)){	
/*
  if((m=c[2])&&((c=m.charAt(0))=='"'||c=="'")&&c==m.slice(-1))	//	將值為".."或'..'轉為引號中表示之值
   try{
    //alert('get 1:\n'+m+'\n'+unescape(m));
    window.eval('c='+m);return c;
   }catch(e){}
  return m;
*/
  return unescape(c[2]);
 }

 var r={},v,M,i=0;
 //alert(document.cookie+'\n'+R+'\n'+m.length+'\n'+m);

 for(;i<m.length;i++)
  if(typeof m[i]==='string'&&(M=m[i].match(R)))
   r[unescape(M[1])]=unescape(M[2]);
/*
 for(;i<m.length;i++){
  M=m[i].match(R),v=unescape(M[2]);
  if(v&&((c=v.charAt(0))=='"'||c=="'")&&c==v.slice(-1))
   try{
    //alert('get 2:\n'+v+'\n'+unescape(v));
    window.eval('c='+v);v=c;
   }catch(e){}
  r[M[1]]=v;	//	有必要可用unescape()，畢竟那是模範做法。
 }
*/

 return r;
};


/**
 * 取得註解部份資料：這個值會連 line separator (/\r?\n/) 都保存下來。
 * 其實IE用document.getElementsByTagName('!')就可以了，不管幾層都能到。
 * 註解中[!-]需要escape！IE6之div內不能沒東西，所以得加個&nbsp;（並且得在前面）之後加<!-- -->才有用。
 * @param node	從哪裡開始找
 * @param level	最多往下找幾層
 * @param return_type	回傳0:node本身,1:註解值
 * @returns
 */
function get_comments(node, level, return_type) {
	if (!node)
		node = window.document;
	var i = 0, d, _f = get_comments;
	if (isNaN(_f.endLevel))
		_f.endLevel = 2;
	if (isNaN(level) || level === -1)
		_f.a = [], level = _f.endLevel;
	else if (typeof _f.a != 'object')
		_f.a = [];
	node = node.childNodes;
	for (; i < node.length; i++) {
		d = node[i];
		//if(d.nodeType==8)alert(d.tagName+'\n'+d.nodeName+'\n'+d.nodeType+(d.nodeValue?'\n'+d.nodeValue.slice(0,30):''));
		if (d.tagName && d.tagName === '!'){
			_f.a.push(return_type ? d : d.text.replace(/^<!(--)?/, '').replace(
					/(--)?>$/, ''));
			//alert(d.tagName+'\n'+d.text.slice(0,30));
		}
		else if (d.nodeType == 8){
			_f.a.push(return_type ? d : d.nodeValue);
			//alert('*	'+_f.a.length+'\n'+d.nodeValue.slice(0,30));
			//	NS	http://allabout.co.jp/career/javascript/closeup/CU20040307/index.htm?FM=cukj&GS=javascript
		}
		//	http://www.w3.org/TR/DOM-Level-2-Core/core.html
		//	ELEMENT_NODE,ATTRIBUTE_NODE,TEXT_NODE,CDATA_SECTION_NODE,ENTITY_REFERENCE_NODE,ENTITY_NODE,PROCESSING_INSTRUCTION_NODE,COMMENT_NODE,DOCUMENT_NODE,DOCUMENT_TYPE_NODE,DOCUMENT_FRAGMENT_NODE,NOTATION_NODE
		if (level && d.childNodes)
			_f(d, level - 1, return_type);
	}
	return _f.a;
}
//window.onload=function(){get_comments();alert(get_comments.a.length);for(var i=0;i<get_comments.a.length;i++)alert('['+get_comments.a[i]+']');};






/*	background image load
	**	本函數會倒著load！請將優先度高的排後面！

new Image看起來不是個好方法…
http://msdn.microsoft.com/workshop/author/dhtml/reference/objects/img.asp

var img=new Image(width,heighr);img.onload=function(){docImageElement.src=this.src;}img.src=__SRC__;	//	onload應在前面，預防設定onload前就已被load?

var bgLoadImgA,bgLoadImgLA;
function bgLoadImg(){
 if(location.protocol=='file:')return;
 if(typeof bgLoadImgA=='string'){
  var s=[1];
  try{s.pop();bgLoadImgA=bgLoadImgA.split(',');setTimeout('bgLoadImg();',5000);}catch(e){}	//	測試舊版可能沒有pop()功能，會出現error
  return;
 }
 if(bgLoadImgA.length){var i=new Image(1,1);i.function(){setTimeout('bgLoadImg();',0);},i.src=typeof getObjURL=='function'?getObjURL(bgLoadImgA.pop()):bgLoadImgA.pop();bgLoadImgLA.push(i);}
}


TODO:
Javascript uses automatic garbage collection. Set to [null] as well.	http://www.thescripts.com/forum/thread95206.html
須注意 JavaScript closure and IE 4-6 memory leak! IE 7 seems to have solved the memory leaks.	http://anotherblog.spaces.live.com/blog/cns!E9C5235EBD2C699D!458.entry?ppud=0&wa=wsignin1.0
http://laurens.vd.oever.nl/weblog/items2005/closures/	http://www.blogjava.net/tim-wu/archive/2006/05/29/48729.html
IE 6對於純粹的Script Objects間的Circular References是可以正確處理的，可惜它處理不了的是JScript與Native Object(例如Dom、ActiveX Object)之間的Circular References。
P.S. 2007/11/11 似乎已修正？
*/

/*	bgLoadImg() Cookie版	2006/3/3 20:08
	**	本函數正著load！請將優先度高的排前面！

	To use:
	,set_cookie,get_cookie,bgLoadImgId,bgLoadImgI,bgLoadImg
	bgLoadImgId='id_of_this_session',bgLoadImgA='img_url1,img_url2,..';	//	** MUST string!
	function getObjURL(bgLoadImgA_element){return the real URL of bgLoadImgA_element;}
	window.onload="bgLoadImg();"

var bgLoadImgId='bg',bgLoadImgI;	//	loaded index
*/
//bgLoadImg[generateCode.dLK]='bgLoadImgId,bgLoadImgI';
function bgLoadImg(i) {
	var bgLoadImgM = 'bgLoadImgOK_' + bgLoadImgId;
	// alert('_'+bgLoadImgM+','+bgLoadImgI)
	if (typeof bgLoadImgA != 'object') {
		// needless
		if (!bgLoadImgA || location.protocol === 'file:')
			return;
		// http://msdn.microsoft.com/workshop/author/dhtml/reference/properties/readystate_1.asp
		var r = document.readyState;
		if (typeof r === 'string' && r !== 'complete') {
			setTimeout(bgLoadImg, 500);
			return;
		}
		// initialization
		bgLoadImgA = bgLoadImgA.replace(/,\s*,/g, ',').split(',');
		if (typeof get_cookie != 'function'
			|| get_cookie(bgLoadImgM) != bgLoadImgA.length) { // 全部OK後就別再來了。
			if (isNaN(bgLoadImgI))
				bgLoadImgI = 0;
			if (typeof r != 'string') {
				setTimeout(bgLoadImg, 5e3);
				return;
			}
		} else
			return;
	}

 //if(!isNaN(i)&&!bgLoadImgA[i].complete);	//	timeout
 if(!isNaN(i)&&i<bgLoadImgI-1)return;	//	防止timeout的備援

 //	標記已load counter
 //	假如一個圖一個圖標記，set_cookie在超過二十個之後好像就沒效了…被限制？
 _.set_cookie(bgLoadImgM,bgLoadImgI);

 if(bgLoadImgI==bgLoadImgA.length)bgLoadImgI++,setTimeout('bgLoadImg();',500);	//	馬上進入判別，最後一個尚未complete
 else if(bgLoadImgI<bgLoadImgA.length){
  var bgLoadImgURL=typeof getObjURL=='function'?getObjURL(bgLoadImgA[bgLoadImgI]):bgLoadImgA[bgLoadImgI];
  //setTimeout('bgLoadImg('+bgLoadImgI+')',5e3);	//	set timeout
  bgLoadImgA[bgLoadImgI++]=i=new Image(1,1);
	//	這是個多執行緒技巧：假如使用onload=bgLoadImg，有可能在下一指令碼前就已onload，這樣會造成Stack overflow
	i.onload=function(){setTimeout('bgLoadImg();',0);},
	i.src=bgLoadImgURL;
  window.status='bgLoadImg ['+bgLoadImgURL+']: '+bgLoadImgI+' / '+bgLoadImgA.length+'..';
 }else{
/*
  var f=[];
  for(i=0;i<bgLoadImgA.length;i++)if(!bgLoadImgA[i].complete)f.push(bgLoadImgA[i].src);
  if(f.length)_.set_cookie(bgLoadImgM,0);
  window.status='bgLoadImg '+(f.length?'end: failed '+f.length+' / '+bgLoadImgA.length+' ('+f+')':'complete!'),bgLoadImgA=0;
*/
	 var f = 0;
	 for (i = 0; i < bgLoadImgA.length; i++)
		 if (!bgLoadImgA[i].complete)
			 f++;
	 if (f)
		 _.set_cookie(bgLoadImgM, 0);
	 window.status = 'bgLoadImg '
		 + (f ? 'end: failed ' + f + ' / ' + bgLoadImgA.length
				 : 'complete!'), bgLoadImgA = 0;
	}
};



/*	儲存/回存使用者輸入之form資料用。	2004/11/23 21:38
		*已測試過text(select-one,textarea,password,hidden)/radio/checkbox/select-multiple
	formIdA:	form id or id array.不輸入或輸入'',0等表示所有的form
	expires:	不輸入或輸入''表示回存，輸入0會以預設days代替，輸入<0會刪除掉cookie中這項設定。
	targetItemA:	要處理的name。例如'name,tel,email'。假如包括unselect，會處理除了targetItemA之外所有的。

	input type="checkbox"	value不能包含';'!
	password也會被儲存，得自己排除!
e.g.,
cookieForm()	recall all items of all forms
cookieForm(0,1,'email');	save all items named 'email' of all forms
cookieForm(0,'','email');	recall all items named 'email' of all forms
cookieForm(0,-1);	消除所有*版面上現有form*之紀錄

TODO:
排除名單
對於較多的entries,也許需要使用到Object[key]來代替String.indexOf(key)
*/
//cookieForm[generateCode.dLK]='get_cookie,set_cookie';
function cookieForm(formIdA, expires, targetItemA) {
	if (typeof document !== 'object')
		return;
	if (!formIdA)
		formIdA = library_namespace.get_tag_list('form');
	else if (typeof formIdA === 'string')
		formIdA = [ formIdA ];

	var i, n, o, handle_Object = function(o) {
		//	メソッドをプロトタイプではなく、オブジェクト自身にセットしていることです。これでは継承できませんし、ECMAScript のプロトタイプベースのセマンティクスから外れてしまいます。
		for ( var j = 0, c = o.childNodes, sp = ';', e, cn, cv, tp; j < c.length; j++) {
			if ((e = c[j]).hasChildNodes)
				handle_Object(e);
			if (	//cv=e.tagName=='TEXTAREA'?e.innerHTML:e.value
					//	TEXTAREA,SELECT,OPTION,INPUT需使用.value!
					e.name && typeof e.value != 'undefined') {
				// if(!e.value&&e.text)e.value=e.text; // 假如沒有.value,利用.text代替
				if (targetItemA)
					if (targetItemA.unselect && targetItemA[e.name]
							|| !targetItemA.unselect && !targetItemA[e.name])
						continue;
				// alert((isNaN(expires)?'load':'save')+'\n'+n+'::'+e.name+'['+e.type+']='+e.value);
				cn = 'cookieForm_' + n + '_' + e.name;
				cv = e.value;
				// e.tagName=='INPUT'?e.type.toLowerCase():'';
				tp = e.type.toLowerCase();
				if (isNaN(expires)) {
					if (typeof (cn = get_cookie(cn)) !== 'undefined') {
						if (tp == 'radio') {
							if (cv == cn)
								e.checked = true;
						} else if (tp == 'checkbox') {
							if (cn.indexOf(sp + cv + sp + sp) != -1)
								e.checked = true;
						} else if (tp == 'select-multiple')
							for ( var i = 0; i < e.options.length; i++)
								e.options[i].selected = cn.indexOf(sp
										+ e.options[i].value + sp) != -1;
						else
							e.value = cn;
					}
				} else {
					if (tp == 'radio') {
						if (!e.checked)
							continue;
					} else if (tp == 'checkbox')
						if (cv.indexOf(sp) != -1)
							//	value不能包含sp	checkbox之cookie形式:[;value1;;value2;value3;;value4;]:value1,3:checked
							continue;
						else
							cv = ((tp = get_cookie(cn))
									&& tp.indexOf(sp + cv + sp) == -1 ? tp : sp)
									+ cv + sp + (e.checked ? sp : '');
					//else if(tp=='select-one')cv=e.options[e.selectedIndex].value;	//	可省略!	用.selectedIndex會比較快，但更改原文件可能會造成index錯誤
					else if (tp == 'select-multiple') {
						cv = sp + cv + sp;
						for ( var i = e.selectedIndex + 1; i < e.options.length; i++)
							if (e.options[i].selected)
								cv += e.options[i].value + sp;
					}
					if (expires)
						_.set_cookie(cn, cv);
					else
						_.set_cookie(cn);
				}
			}
		}
	};

	if (targetItemA) {
		o = targetItemA;
		targetItemA = {};
		if (typeof o == 'string')
			o = o.split(',');
		for (i in o)
			targetItemA[o[i]] = 1;
	}
	if (expires === '')
		expires = NaN;
	if (!isNaN(expires)) {
		if (expires)
			// 預設 days
			expires = 7;
		// Gecko need this
		_.set_cookie(_.set_cookie.f.set_root);
		_.set_cookie('expires', expires);
	}
	for (i = 0; i < formIdA.length; i++)
		if (o = formIdA[i]) {
			if (typeof o == 'string')
				o = document.getElementById(n = o);
			else if (!(n = o.id))
				n = o.name;
			if (o && (o.tagName || '').toLowerCase() == 'form' && n
					&& typeof n == 'string')
				handle_Object(o);
		}
	if (!isNaN(expires))
		_.set_cookie('expires', 0);

}


//	登入FTP	IE使用者若要上傳，請開啟FTP 站台的資料夾檢視功能。
//	<input type="text" autocomplete="off" />
/**
 * 
 * @param name
 * @param password
 * @param path
 * @param hostname
 */
function loginFTP(name, password, path, hostname) {
	if (!hostname && !(hostname = location.hostname))
		return;
	if (name == 'ftp' || name == 'anonymous')
		name = '';
	if (!password && name)
		password = window.prompt('請輸入[' + name + ']之密碼：');
	if (password == null)
		// 取消輸入
		return;

	password = 'ftp://'
			+ (name ? name + (password ? ':' + password : '') + '@' : '')
			+ (hostname + '/' + (path || '')).replace(/\/{2,}/g, '/');

	// 用location.href不能進入資料夾檢視功能.
	// location.href=password;
	window.open(password, 'ftpW');
}


//	reference page set	==================

/**
 * 簡化 document.getElementById 並配合 loadReference()
 * @since 2004/6/25 19:33
 * @param id	所欲找尋之 element id
 * @param flag
 *            {HTML Object} object: 參考此 document object
 *            {Number} flag: 參見 code
 * @return	{HTML Object} Object
 * @requires	referenceDoc,loadReferenceDone,`get_element();`
 * @_memberOf	_module_
 */
function get_element(id, flag) {
	if (!id || !library_namespace.is_WWW())
		return;
	if (flag)
		library_namespace.debug(id + ', ' + flag, 2);

	// 後面暫時沒用到
	//if (!flag) flag = get_element.flag.self;

	if (!document.body)
		// document 尚未 load
		return;

	if (_.is_NodeList(id))
		return id[0];
	if (//_.is_HTML_element(id) ||
			typeof id === 'object')
		return id;

	var node;
	if (flag !== get_element.flag.refOnly)
		// 僅參考 reference page 時不設定
		node = document.getElementById ? document.getElementById(id)
				: document.all ? document.all[id]
						: document.layers ? document.layers[id] : window[id];
	if (flag)
		library_namespace.debug(id + ',' + flag + '\nloadReferenceDone='
				+ loadReferenceDone + '\nreferenceDoc: ' + referenceDoc
				+ '\node: ' + node + '\nreferenceDoc.get: '
				+ referenceDoc.getElementById(id) + '\n'
				+ referenceDoc.body.innerHTML.slice(0, 200), 3);
	try {
		// 偶爾還是有可能'沒有使用權限'。
		typeof flag === 'object' && typeof flag.getElementById === 'function'
				&& (node = flag.getElementById(id)) || node || flag
				&& loadReferenceDone === 1
				&& (node = referenceDoc.getElementById(id));
	} catch (e) {
	}
	return node;
}
// 在 Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.6) Gecko/20040510 中會出問題，所以改到函數中執行。但得先執行過一次。
get_element.flag = {
	//	僅參考自身頁面，default
	'self' : 0,
	//	可參考 reference page
	'ref' : 1,
	//	僅參考 reference page
	'refOnly' : 2
};
_// JSDT:_module_
.
get_element = get_element;


/*	以外掛的reference page配置data object	2004/6/25 21:01

	toUse:
	準備好reference.htm
	在需要的文件加入	window.onload="loadReference()";
	在需要的文件body加入	<iframe id="reference"></iframe>
	function setupPageR()	initial after load of reference page

	如上，再使用 get_element() 即可得到 reference.htm 中的 obj
*/
var referenceDoc,loadReferenceDone;//,loadReferenceCount;
//loadReference[generateCode.dLK]='get_element,referenceDoc,loadReferenceDone,parseFunction';
function loadReference(referenceURL,iframeId){
 if(loadReferenceDone||typeof location!='object'||!location.protocol||location.protocol=='https:')return;	//	https會拒絕存取，所以直接放棄。
 //if(loadReferenceDone)return;	//	https會拒絕存取，所以直接放棄。
 var o=get_element(iframeId||'reference'),thisFuncName=parseFunction().funcName;
 if(typeof referenceDoc=='object' && typeof referenceDoc.document=='object' && referenceDoc.document){	//	referenceDoc is still contentWindow here.	typeof referenceDoc.document:預防使用https時產生不能讀取的權限問題。
  referenceDoc=o.contentWindow.document;//referenceDoc.document;	//	遺憾：在舊版IE不能用後者。也許是因為舊版IE連contentWindow都會重造。
  o=referenceDoc.body;//alert(o.innerHTML.length+'\n'+o.innerHTML);
  if(o/*&&referenceDoc.body.innerHTML=='string'*/&&o.innerHTML.length){
   //alert(typeof o+','+(o?typeof o.innerHTML+'('+o.innerHTML.length+')\n'+o.innerHTML.slice(0,200):'(null)'));
   //	before IE5, the first argument must be a string.
   //	setTimeout(function_handler,..) 不一定代表setTimeout('function_handler();',..)，可能會傳入奇異的引數！
   if(typeof setupPageR=='function')setTimeout(setupPageR,9);
   loadReferenceDone=1;//window.status='reference page load OK!';alert(window.status);
  }else{
   //try{window.status='Wait while reference page loading..3',alert(window.status+'\nURL:'+o.contentWindow.document.src+'\ncontent('+o.contentWindow.document.body.innerHTML.length+'):\n'+o.contentWindow.document.body.innerHTML);}catch(e){}
   //if(!--loadReferenceCount)history.go(0);
   setTimeout(thisFuncName+'();',200);
  }
  return;
 }
 if(typeof document!='object'||!document.body){	//	document尚未load
  setTimeout(thisFuncName+'();',90);
  return 1;
 }
 //o=get_element(iframeId||'reference');	//	原來把設定放在這，不過反正都要在前面用到…
 if(!o||(o.tagName||'').toLowerCase()!='iframe'){loadReferenceDone=2;return;}	//	iframe不存在
 if(!o.src)o.style.display='none',//'block',//
  o.src=referenceURL;	//	for game.js: typeof relatePath=='function'?relatePath(0,'cgi-bin/game/data/reference.htm'):'data/reference.htm'

 if(typeof o.contentWindow=='object'&&typeof o.contentWindow.document=='object'){	//	typeof o.contentWindow=='object'&&: for JS5	應該不能用o.contentWindow吧？怕o.contentWindow就算沒能載入文件，也會被定義
  //	Martin Honnen wrote: If you load a new document then certainly the browser has to create a new document object.
  referenceDoc=o.contentWindow;//.document;	o.contentWindow.document still index to a blank window here, when new document load, this point to document won't work.

  //window.status='Wait while reference page loading..2';alert(window.status+'\nURL:'+o.src);
  setTimeout(thisFuncName+'();',20);//loadReferenceCount=9;
 }else{
  //if(location.protocol=='https:')return;	//	https會拒絕存取，所以直接放棄。最晚在這就得判別
  if(!referenceDoc)referenceDoc=40;	//	尚未load完成時作倒數計時..假如加上if(o.contentWindow)，這方法正確嗎?
  //else if(isNaN(referenceDoc))return 3;	//	異常(for https):不能用else if(isNaN(referenceDoc))
  try{
   if(referenceDoc--){
    //window.status='Wait while reference page loading..';alert(window.status);
    setTimeout(thisFuncName+'();',300);return 2;
   }else{
    //window.status='reference page load FAILED!';alert(window.status);
    return 4;
   }
  }catch(e){
   return 5;	//	Error: uncaught exception: Permission denied to get property HTMLDocument.document
  }
 }
}
//	translate object(innerHTML) from reference page to document
//transRefObj[generateCode.dLK]='get_element';
function transRefObj(id,id2,force){
 if(typeof id2!='string'&&typeof id2!='object')force=id2,id2=typeof id=='object'?id.id:id;
 var o=typeof id=='object'?id:get_element(id,get_element.f.self),p;
 //alert('transRefObj: '+id2+' -> '+id+'('+(force?'':'not ')+'force)\n'+o+'\ntarget:'+(o.innerHTML?'\n'+o.innerHTML.slice(0,200):' (null)'));
 if( o && (force||!o.innerHTML)
	&& (p=typeof id2=='object'?id2:get_element(id2,get_element.f.refOnly)) && (force||p.innerHTML) )
  try{
	//alert('transRefObj: DO '+id2+' -> '+id+'('+(force?'':'not ')+'force)\n');
	o.appendChild(p.cloneNode(true));
  }catch(e){
/*
   try{
	//alert('transRefObj: try2');
	var i=0;while(i<p.childNodes.length)o.appendChild(p.childNodes[i++].cloneNode(true));
   }catch(e){
*/
	//alert('transRefObj: try3');
	o.innerHTML=p.innerHTML;//p.cloneNode(true);	//serialize(p)	serialize方法把一个node串行化成字符串。在ie环境的具体实现上，对于XmlDocument，使用node.xml，对于HtmlDocument，使用node.outerHTML。	http://my.opera.com/gisor/blog/index.dml/tag/SVG
/*
   }
*/
  }
 return o;
}

//	↑reference page set	==================





//	設定自動捲動
var setAutoScrollTimer,setAutoScrollInterval;
//setAutoScroll[generateCode.dLK]='setAutoScrollTimer,setAutoScrollInterval';
function setAutoScroll(interval, force) {
	if (!force)
		if (typeof document != 'object'
			|| setAutoScrollTimer
			|| document.onmousedown
			|| document.ondblclick)
			return;
	if (interval)
		setAutoScrollInterval = interval;
	else if (!setAutoScrollInterval
			&& !(setAutoScrollInterval = get_cookie('setAutoScrollInterval')))
		// 5,50,100,200,500
		setAutoScrollInterval = 200;
	// 無論如何，先把執行中的幹掉。
	clearInterval(setAutoScrollTimer);
	setAutoScrollTimer = 0;
	if (setAutoScrollInterval < 0) {
		document.onmousedown = document.ondblclick = null;
		return;
	}
	document.onmousedown = function() {
		if (setAutoScrollTimer)
			window
			.clearInterval(setAutoScrollTimer),
			setAutoScrollTimer = 0;
	};
	document.ondblclick = function() {
		if (setAutoScrollTimer)
			return;
		setAutoScrollTimer = window.setInterval(
				//window.scrollTo(0,document.body.scrollTop+1);
				'window.scrollBy(0,1);',
				setAutoScrollInterval);
	};
}


/*	捲到設定的定點，因為某些多工慢速環境中只設定一次沒有用，所以…
	下面一行調到檔案頭
var scrollToXY,scrollToInterval,scrollToOK;
*/
//scrollTo[generateCode.dLK]='scrollToXY,scrollToInterval,scrollToOK,get_window_status';
function scrollTo(y, x) {
	// initial
	if (typeof scrollToXY != 'object')
		scrollToXY = {};

	if (typeof y == 'object'
		&& (!isNaN(y.x) || !isNaN(y.y))) {
		if (!isNaN(y.x))
			scrollToXY.x = y.x;
		if (!isNaN(y.y))
			scrollToXY.y = y.y;
	} else if (Array.isArray(y))
		scrollToXY.x = y[0], scrollToXY.y = y[1];
	else {
		if (typeof x != 'undefined')
			scrollToXY.x = x;
		if (typeof y != 'undefined')
			scrollToXY.y = y;
	}
	if (isNaN(scrollToXY.x))
		scrollToXY.x = 0;
	if (isNaN(scrollToXY.y))
		scrollToXY.y = 0;

	// main function
	setTimeout(
			function() {
				window.scrollTo(scrollToXY.x,
						scrollToXY.y);
			}, 9);
	var _w = get_window_status();
	// status=scrollToInterval+','+scrollToOK+';'+_w.scrollLeft+','+scrollToXY.x+';'+_w.scrollTop+','+scrollToXY.y;
	if (_w.scrollLeft == scrollToXY.x
			&& _w.scrollTop == scrollToXY.y) {
		if (!--scrollToOK && scrollToInterval)
			window.clearInterval(scrollToInterval),
			scrollToInterval = 0;
	} else if (!scrollToInterval)
		//	預防萬一：總會跳回原處
		scrollToInterval = window.setInterval(
				scrollTo, 90), scrollToOK = 3;
}

/*	doAlert() & doAlertAccess：彈出使用注意事項視窗
	下面一行調到檔案頭
var doAlertDivName,doAlertOldScrollLocation;

TODO
設定其不可作用之 background object

	使用方法：
<head>
<script type="text/javascript" src="function.js"></script>
<script type="text/javascript">
window.onload=init;window.onscroll=window.onresize=doAlertScroll;
function init(){doAlertInit('kousi');}
</script>

<style type="text/css"><!--

/*	kousi用	加上filter:alpha(opacity=10);：因為IE5.5不吃DXImageTransform.Microsoft.Alpha，這樣用不能以.filters.alpha.opacity控制。	* /
#kousi{color:blue;background:#e2e0f8;border:double 3px red;padding:.5em;filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80,Style=0);filter:Alpha(Opacity=80,Style=0);z-index:2;overflow:auto;}
#kousiBg{background:blue;filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=30,Style=0);filter:Alpha(Opacity=30,Style=0);z-index:1;}
#kousiI{color:brown;background-color:#e6e6ff;cursor:pointer;border:1 solid red;white-space:nowrap;padding:2px;margin:2px;filter:Alpha(Opacity=80,Style=0);}

#kousi h2{color:brown;margin-left:2em;}
#kousi input{color:#114f12;background-color:#fddbfb;border:1 brown solid;}

--></style>
</head>

<body>
<!--div id="kousiBg"></div--><div id="kousi">
<h2>使用注意事項</h2>

注意事項

<hr style="color:#928cd9" />
<table style="width:90%;text-align:center;"><tr><td><input type="button" onclick="top.location.href='http://www.hinet.net';" value="誰管你！" /></td>
<td><input type="button" onclick="doAlertAccess();//this.parentNode.parentNode.parentNode.parentNode.parentNode.id" value="我願意遵守上述規定" /></td>
<td><input type="button" onclick="set_cookie(set_cookie.f.forever),set_cookie('doAlert',doAlertDivName),doAlertAccess();" value="我往後皆會遵守上述規定" /></td></tr></table>
</div>

<a href="#" onclick="doAlert();">注意事項</a>

正文

</body>
*/
function doAlertResize(){	//	確保置中
 if(typeof doAlertDivName!='string'||!doAlertDivName||!(o=document.getElementById(doAlertDivName)))return;

 o.style.position='absolute',o.style.display='block',o.style.width='70%';
/*	因為'%'是以整體長寬為主，故不適用。
  var t=Math.round(50*(1-o.offsetHeight/document.body.clientHeight));
  if(t<0)o.style.width='99%',o.style.top='0';else o.style.top=t+'%';
  t=Math.round(50*(1-o.offsetWidth/document.body.clientWidth));
  o.style.left=t<0?'0':t+'%';
*/
  //alert(o.style.offsetHeight+','+window.offsetHeight+','+window.innerHeight+','+window.outerHeight);
  if(typeof window.innerHeight=='undefined')
	  window.innerHeight=document.body.clientHeight;
  if(typeof window.innerWidth=='undefined')
	  window.innerWidth=document.body.clientWidth;
  var t=(window.innerHeight-o.offsetHeight)/2;
  if(t<0)o.style.width=o.style.height='99%',o.style.top=0;else o.style.top=t+'px';
  t=(window.innerWidth-o.offsetWidth)/2;
  o.style.left=t<0?0:t+'px';	//	不用marginTop與marginLeft，因為這裡要放置div
 
}
//	初始化
//doAlertInit[generateCode.dLK]='set_cookie,doAlert';
function doAlertInit(n){	//	n:div name
 //if(typeof doAlertDone!='undefined'&&doAlertDone)return;	//	防止重複執行
 if(!n){	//	doAlertInit()重設
	 _.set_cookie(_.set_cookie.f.set_root);	//	Gecko need this
	 _.set_cookie('doAlert');
  return;
 }
 var d=document.getElementById(n);
 if(d){
  if(typeof doAlertDivName=='undefined')doAlertDivName=n;
  doAlert();
 }
}
//	出現警告
//doAlert[generateCode.dLK]='doAlertInit,doAlertResize,doAlertAccess,doAlertScroll,doAlertDivName,doAlertOldScrollLocation,get_cookie,get_window_status';
function doAlert(n,m,iconContent){	//	n:name,m:mode=1:use alert(),icon div的文字內容
 if(!n&&typeof doAlertDivName=='string'&&doAlertDivName)n=doAlertDivName;
 var o=document.getElementById(n),oBg=document.getElementById(n+'Bg'),oI=document.getElementById(n+'I');
 if(!document.body||!o||m&&!alert(o.innerHTML))return;	//	alert()會return undefined
 if(!oI)try{
  o.parentNode.insertBefore(oI=document.createElement('div'),o);//document.body.insertBefore();
  oI.id=n+'I';oI.onclick=function(){doAlertInit();doAlert();};oI.title="注意事項";
  oI.innerHTML=iconContent||'別忘了';oI.doAlertScrollT=oI.doAlertScrollL=0;
 }catch(e){return;}	//	只對IE5.5之後有用
 if(!oBg)try{o.parentNode.insertBefore(oBg=document.createElement('div'),o);oBg.id=n+'Bg';}catch(e){return;}	//	只對IE5.5之後有用
 //if(!oI||!oBg)alert('No index or bg div!');
 disableKM(2);doAlertResize();window.Oonresize=window.onresize,window.onresize=doAlertResize;
 oI.style.display='none',oI.style.position='absolute',oI.style.right='.1em',oI.style.top='.1em';
 oBg.style.position='absolute',oBg.style.left=-parseInt(document.body.leftMargin),oBg.style.top=-parseInt(document.body.topMargin),oBg.style.width=height='110%',oBg.style.display='inline';	//	offset*:唯讀
 if(o.filters)o.filters.alpha.opacity=85;//try{o.filters.alpha.opacity=85;}catch(e){}
 if(oBg.filters)try{oBg.filters.alpha.opacity=30;}catch(e){}
 else{	//	for Moz
  o.style.position='fixed';
  oBg.style.position='fixed',oBg.style.opacity=oBg.style['-moz-opacity']=.3,oBg.style.left=oBg.style.top=0,oBg.style.width=oBg.style.height='100%';
 }
 if(get_cookie('doAlert')==n)doAlertAccess(n);
 else o=get_window_status(),doAlertOldScrollLocation=[o.scrollLeft,o.scrollTop],setTimeout('scrollTo(0,0);',0);	//	奇怪的是，直接執行scrollTo(0,0)沒啥用。
}
//	pass
function doAlertAccess(n){
 if(!n&&typeof doAlertDivName=='string'&&doAlertDivName)n=doAlertDivName;
 var o=document.getElementById(n),oBg=document.getElementById(n+'Bg');
 if(oBg)oBg.style.display='none';o.style.display='none';
 disableKM(0);
 window.onresize=window.Oonresize||null;
 if(doAlertOldScrollLocation)scrollTo(doAlertOldScrollLocation,0,1);
 doAlertScroll(1);
}
//	icon div的捲動：置於右上角
//doAlertScroll[generateCode.dLK]='get_window_status';
function doAlertScroll(m){var oI;
 if(typeof doAlertDivName!='string'||!doAlertDivName||!(oI=document.getElementById(doAlertDivName+'I')))return;
 if(typeof m!='undefined'){
  oI.style.display=m?'block':'none';
  oI.doAlertScrollL=oI.offsetWidth+(m||0);
  if(oI.currentStyle){	//	IE
   if(m=parseInt(oI.currentStyle.paddingTop))oI.doAlertScrollT=m;
   m=parseInt(oI.currentStyle.paddingLeft);
   if(m=parseInt(oI.currentStyle.paddingRight))oI.doAlertScrollL+=m;
  }else{
   oI.style.position='fixed';
/*	//	Moz..but no use
   if(m=oI.offsetTop)oI.doAlertScrollT=m;
   m=oI.offsetLeft;
   if(m=oI.offsetRight)oI.doAlertScrollL+=m;
*/
  }
 }
 //window.status=m=window.scrollX+','+window.scrollY+','+window.innerWidth+','+window.innerHeight+';'+document.body.scrollLeft+','+document.body.scrollTop+','+document.body.offsetWidth+','+document.body.clientWidth+','+oI.offsetWidth+','+document.body.scrollWidth;alert(m);
 m=get_window_status();
 oI.style.left=m.scrollLeft+m.windowW-oI.doAlertScrollL+'px';//-document.body.leftMargin-document.body.rightMargin
 oI.style.top=m.scrollTop-oI.doAlertScrollT+'px';	//	只有在padding用px時有效！
}



/**
 * Sets / adds class of specified element.<br />
 * TODO:<br />
 * 1. 一次處理多個 className。<br />
 * 2. 以字串處理可能較快。<br />
 * 3. 用 +/- 設定。<br />
 * 4. https://developer.mozilla.org/en/DOM/element.classList
 * @param element	HTML elements
 * @param class_name	class name || TODO: {class name 1:, class name 2:, ..}
 * @param options
 * default: just add the specified className
 * options.reset:	reset className (else just add)
 * options.status:	return {className1:, className2:, ..}
 * options.remove:	remove className
 * @return
 * @see
 * <a href="http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-95362176" accessdate="2009/12/14 22:26">className of type DOMString</a>,
 * <a href="https://developer.mozilla.org/En/DOM/Element.className" accessdate="2009/12/14 22:27">element.className - MDC</a>
 * @_memberOf	_module_
 */
function set_class(element, class_name, options) {
	if (typeof element === 'string')
		element = document.getElementById(element);

	if (!_.is_ELEMENT_NODE(element))
		return;

	if (!options)
		options={};
	var c;

	if (class_name && !options.remove) {
		c = Array.isArray(class_name) ? class_name.join(' ') : class_name;
		if (options.reset)
			element.className = c;
		else
			// add 時不 detect 是為了速度.
			element.className += ' ' + c;

		if (!options.status)
			return;
	}

	//library_namespace.debug('set_class: remove [' + class_name + '] from [' + o.className + ']');
	c = element.className.split(/\s+/);
	var r = {}, i, changed;

	//	設定原先的 className. TODO: 增進效率。
	for (i in c)
		r[c[i]] = true;

	if (options.remove && class_name) {
		if (!Array.isArray(class_name))
			class_name = [ class_name ];
		for (i in class_name) {
			c = class_name[i];
			if (c in r) {
				// 有做變動.
				changed = true;
				delete r[c];
			}
		}
		if (changed) {
			c = [];
			for (i in r)
				c.push(i);
			element.className = c.join(' ');
			//library_namespace.debug('set_class: → ['+element.className+']');
		}
	}

	return r;
}
_// JSDT:_module_
.
set_class = set_class;

function clear_class(element) {
	if (typeof element === 'string')
		element = document.getElementById(element);

	if (_.is_ELEMENT_NODE(element))
		element.className = '';
}
_// JSDT:_module_
.
clear_class = clear_class;

//	if class_name is RegExp, class_name should NOT has global flag.
function has_class(element, class_name) {
	var n = element.className, i;
	//class_name = class_name.trim();
	if (!n || !class_name)
		return;

	if (Array.isArray(class_name)) {
		for (i = n = 0; i < class_name.length; i++)
			if (has_class(element, class_name[i]))
				n++;
		return n;
	}

	if (class_name = has_class.pattern(class_name))
		return class_name.test(n);

	return n == class_name;
}

has_class.pattern = function (class_name) {
	if (class_name) {
		if (!library_namespace.is_RegExp(class_name))
			class_name = new RegExp('(?:^|\\s)' + class_name + '(?:$|\\s)'/* ,i */);
		return class_name;
	}
};

_// JSDT:_module_
.
/**
 * If HTML element has specified class
 * @param {HTMLElement}element	HTML elements
 * @param {String} class_name	class_name_1[ class_name_2 ..]
 * @return	{Boolean}
 */
has_class = has_class;


function find_class(class_name, parent_node, tag_name, selector, options) {
	var list = [], pattern, i,
	//
	elements = library_namespace.get_tag_list(tag_name || '*', parent_node || window.document),
	//
	length = elements.length;

	if (length > 0) {
		if (typeof selector !== 'function')
			selector = false;
		if ((pattern = has_class.pattern(class_name)) || selector) {
			library_namespace.debug('length: ' + length + ', pattern: ' + pattern, 2);
			for (i = 0; i < length; i++) {
				library_namespace.debug('#' + length + ': ' + elements[i].className, 2);
				if ((!pattern || pattern.test(elements[i].className))
						&& (!selector || selector.call(elements[i])))
					list.push(elements[i]);
			}
		} else
			list = elements;
	}

	return list;
}

_// JSDT:_module_
.
/**
 * @param {String} class_name	class_name_1[ class_name_2 ..]
 * @param {HTMLElement}element	HTML elements
 * @param {HTMLElement} parent_node	parent node
 * @param {String} tag_name	tag name
 * @return	{[HTMLElement]}	nodes
 * @see
 * document.getElementsByClassName in prototype.js,
 * jquery('.class')
 * 
 * document.querySelectorAll()
 * http://www.w3.org/TR/selectors-api/
 * http://blog.darkthread.net/blogs/darkthreadtw/archive/2008/04/17/document-queryselector-in-ie8.aspx
 */
find_class = find_class;


/*	處理 popup 用。
	對className的tag作popup處理。
	window.onload="set_up_popup()";
	<b title="注釋">正文</b>
*/
//set_up_popup[generateCode.dLK]='sPop,has_class';
function set_up_popup(tag,classN,func){
	if (!tag)
		tag = 'b';

/*
	http://enable.nat.gov.tw/document/4_2.jsp
	http://ccca.nctu.edu.tw/~hlb/tavi/ABBRorACRONYM
	應該用abbr(abbreviation/abbrevitated form/簡稱)
	abbr包含acronym(頭文字/首字母縮寫,通常這個字的發音像一個字)
	根據W3C的規範說，中日文的縮寫格式要套用的是abbr標籤。
	XHTML2.0把acronym移掉了，只剩下abbr標籤。
	http://www.sovavsiti.cz/css/abbr.html
	if(!!document.all)document.body.innerHTML=document.body.innerHTML.replace(/<\s*(\/?)\s*abbr([>\s])/gi,'<$1span$2');
*/

	var i, j, o = library_namespace.get_tag_list(tag), tp;
	set_up_popup.list = [];
	if (o.length)
		for (i = 0; i < o.length; i++) {
			if (classN && !has_class(o[i], classN) || func
					&& func(o[i]))
				continue;
			//	測試是否有特定標籤
			for (j = 0, tp = ''; j < sPopP.allTypes.length; j++)
				if (o[i][sPopP.allTypes[j]]) {
					tp = sPopP.allTypes[j];
					break;
				}
			//	有的話設定event
			if( tp && (tp=sPop(o[i],sPopF[tp]|sPopF.nopop)) ){
				//o[i].innerHTML+='<b style="color:peru">['+sPopP.types[tp]+']<\/b>';

				set_up_popup.list.push(o[i]);
				if(tp==sPopF.window){
					if(!o[i].onclick)o[i].onclick=new Function('sPop(this,'+tp+');'),o[i].style.cursor='pointer';
				}else if(tp==sPopF.popup){
					if(!o[i].onmouseover){//o[i].ruby=o[i].popup='',
						o[i].onmouseover=new Function('sPop(this,'+tp+');');
						if(!o[i].onmouseout)o[i].onmouseout=new Function('sPop(this,sPopF.clearPop);');
						if(!o[i].onclick)o[i].onclick=new Function('this.onmouseout=null;sPop(this,'+tp+');'),o[i].style.cursor='pointer';
					}
					//else alert(tp+'\n'+sPopF[tp]+'\n'+typeof o[i].onmouseover+'\n'+o[i].onmouseover);
				}
			}
		}
}
/*	注釋(reference) / show popup-window or ruby	2004/4/3 17:20
	http://www.comsharp.com/GetKnowledge/zh-CN/TeamBlogTimothyPage_K742.aspx

example:
	<b onmouseover="sPop(this,sPopF._type_,'注釋')">txt</b>
	<b onmouseover="sPop(this,sPopF._type_)" title="注釋">txt</b>
	window.onload="set_up_popup()"; + <b title="注釋">txt</b>,<b sPop="注釋">txt</b>
	<b onmouseover="sPop('．',this)">txt</b>	在每個字旁邊加上[．]或[。]
	sPop('txt')	popup txt(自動設成sPopF.popup)
	sPop('txt',sPopF.window)	popup txt by window

flag & type:
	sPopF.title/sPopF.auto	（依字數）自動選取
	sPopF.ruby	採用<ruby>
	sPopF.popup	採用popup window
	sPopF.window	將資料開在新視窗

	sPopF.nopop	just test, don't popup(for ruby)
	sPopF.repeat	repeat ruby
	sPopF.clearPop	clear popup window
	sPopF.force	若是不能使用此種表示方法，則放棄顯示。(for popup @ Mozilla)

style class application(應用):
	sPopP.DclassName中所定之className為觸發事件時會設定的class

執行環境environment:
	JScript @ HTML

include function:
	String.repeat()
	parseFunction()
	set_Object_value()

TODO:
submenu
	http://dynamicdrive.com/dynamicindex1/popupmenu.htm
Tipped - The Javascript Tooltip Framework
	http://projects.nickstakenburg.com/tipped

How to Create a Valid Non-Javascript Lightbox | Carsonified
http://carsonified.com/blog/design/css/how-to-create-a-valid-non-javascript-lightbox/

move/resize/最小化: popup dialog
	http://deluxepopupwindow.com/html-popup-dialog-vista-graphite.html

獨佔 window, 訊息列, 多功能(HTML+Script)內容
	http://vision-media.ca/resources/jquery/jquery-popup-plugin-review

key (Esc)
time limit

*/
var sPopP={}	//	sPop properties object
	,sPopF	//	flag
	,sPopError//	for error
	;

//	初始值設定 & 設定flag
//if(sPopP)alert('sPopP 已被佔用！');else
function sPopInit(){

	//	預設style class name:(null:used last time),ruby,popup,window
	sPopP.DclassName=',popupedTxt_ruby,popupedTxt,popupedTxt'.split(',');
	//	已登記的背景style,請在CSS中加入[sPopC]_[body class name]
	sPopP.bgS='bgb,bgn';
{
 var i=0,t=sPopP.bgS.split(',');sPopP.bgS={};
 for(;i<t.length;i++)sPopP.bgS[t[i]]=i+1;
}
	//	popup window style
	sPopP.popupS="color:blue;padding:.5em;overflow:auto;position:absolute;top:0;left:0;width:100%;height:100%;scrollbar-face-color:khaki;scrollbar-arrow-color:teal;border:1px solid green;font:normal 10pt tahoma;filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#ffd700, EndColorStr=#ffffff);";
	//	chars to repeat(for ruby)
	sPopP.RepeatC='‧．。ヽ○●◎☆★※＊＃▽▼△▲◆◇□■↓↑';//.turnU();
	//	types:auto,這些attribute可被處理，且將被視為自動選取type。
	sPopP.autoTypes='title,_sPop';//+',_'+sPopP.functionName
	//	types,最多七種
	sPopP.types='ruby,popup,window';	//	+div(參考showLinkPopup() @ link.js)
	//	所有可用的types，可用來detect是否能為sPop()所接受。但Mozilla中無法使用title之外的attribute。
	sPopP.allTypes=(sPopP.autoTypes+','+sPopP.types).split(',');
	//	function name
	sPopP.functionName='';//;parseFunction().funcName;
	//	popup window(for popup)
	if(typeof window.createPopup!='undefined')sPopP.window=window.createPopup();
{
 var i=0,t=sPopP.types.split(','),T='';
 for(;i<t.length;)T+=t[i]+'='+ ++i+',';//alert(T);
 set_Object_value('sPopF','title=0,auto=0,'
	//+'_'+sPopP.functionName+'=0,'
	+T+'nopop=8,repeat=16,clearPop=32,force=64','int');
}
//	sPopP.types[index]=type name
sPopP.types=(
	//'_'+sPopP.functionName+
	','+sPopP.types).split(',');
sPopP.commentTitle='Comment';	//	註解
sPopP.commentTitlePattern=sPopP.commentTitle+' of %s';
sPopP.closeM='Close';	//	close message: 關閉視窗或popup
sPopP.biggerM='Bigger';	//	bigger message: 放大
sPopP.resetM='Reset size';	//	reset size message: 回復原大小
}

//	主object(正文或主object，會從之取得正文與注釋)[, flag, text string or object(注釋,會蓋過從主object取得之text), 使用的class name]
//sPop[generateCode.dLK]='sPopP,sPopF,sPopInit,*sPopInit();';
function sPop(oPos,flag,oTxt,classN){
 //if(flag&sPopF.clearPop){if(sPopP.window)sPopP.window.hide();return;}

 //	input value test & 修正
 if(!oPos&&!oTxt)return;

 var limitW=screen.width-50,limitH=screen.height>>1;
 if(!sPopP.width)sPopP.width=250;if(sPopP.width>limitW)sPopP.width=limitW;
 if(!sPopP.height)sPopP.height=100;if(sPopP.height>limitH)sPopP.height=limitH;

 //	初始值設定
 if(!sPopP.functionName)
  sPopF[ sPopP.types[0]='_'+(sPopP.functionName=parseFunction().funcName) ]=0;

 var repopMark='repop',repop=oPos===repopMark,nopop=flag&sPopF.nopop,tp=flag&7
	,useAttbTxt=false,brReg=/\r*\n/g,brT='<br />\n';	//	轉成br用

if(repop){
  if( !sPopP.popObj || typeof sPopP.popObj!='object' || typeof sPopP.popObj.innerHTML!='string' || !sPopP.popObj.innerHTML )return;
  oPos=sPopP.popObj,tp=sPopF.popup;	//	重pop時不作其他判別處置
}else{

 //	處理object
 if( typeof oPos=='string' && oPos )
  if( oPos.length<32 && document.getElementById(oPos) )
   oPos=document.getElementById(oPos);	//	輸入object name時轉成object
  else if(!oTxt)oTxt=oPos	//	若只輸入oPos，將之當作注釋(oTxt)。
	//,oPos=typeof null=='object'?0:null;
	,oPos=0;	//	若是typeof null=='object',請設成false

 //	設定oTxt 1/4
 if( typeof oTxt=='object' && oTxt.innerHTML )oTxt=oTxt.innerHTML;
 else if(oTxt)oTxt+='';	//	轉成string

 //	(自動)判別使用的type
 var useAutoTxt;
 if(tp==sPopF.auto){
  //	設定oTxt 2/4 : 知道是自動判別後先設定
  if( typeof oPos=='object' && (!oTxt||oTxt==0) )
   if(oPos[sPopP.types[0]])oTxt=oPos[sPopP.types[0]],useAutoTxt=true;
   else if(oPos.title)oTxt=oPos.title,useAutoTxt=true;	//	以<b title="~">的用法來說，這是最常經過的path

  //	假如沒有oTxt.gText()，改成oTxt.replace(/<[^>]*>/g,'')之即可。這是為了預防HTML的情形。
  var len=typeof oTxt=='string'?oTxt.length:0;//typeof oTxt=='string'?oTxt.length:typeof oTxt=='object'&&oTxt.innerHTML?oTxt.innerHTML.length:0;
  //alert(len+','+(len*.7)+','+oPos.innerHTML.length);
  if( typeof oPos=='object' && ( oPos.doneRuby || !oPos.innerHTML.match(/<\s*ruby/i) && (len<60&&len*.7-9<(typeof oPos.innerText=='string'?oPos.innerText:oPos.innerHTML).length) ) )
   tp='ruby';	//	ruby的條件
  else if(sPopP.window&&len<300){
   tp='popup';
   if(typeof oPos=='object'&&oPos.title===oTxt)oPos[sPopP.types[0]]=oTxt,oPos.title='';
  }else tp='window';

  //	設定oTxt 3/4 & type
  if( typeof oPos=='object' && (!oTxt||oTxt==0) )
   if(oPos[tp])oTxt=oPos[tp],useAutoTxt=true;

  tp=sPopF[tp];
 }

 //	設定oTxt 4/4
 if( !oTxt||oTxt==0 && typeof oPos!='object')
  if( (oTxt=oPos[sPopP.types[tp]]) || (oTxt=oPos[sPopP.types[0]]) || (oTxt=oPos.title) )useAutoTxt=true;else return;

 //	設定className與position
 sPopP.left=0,sPopP.top=20;	//	popup left,popup top初始值
 if( !oPos || typeof oPos!='object')
  //	popup 在滑鼠指標處
  //	see: add_listener()	
  try{sPopP.left+=event.offsetX,sPopP.top+=event.offsetY;}catch(e){}
 else if( !oPos.className && sPopP.DclassName[tp] ){
  if(!classN&&(classN=document.body.className)&&!sPopP.bgS[classN])classN=0;
  oPos.className=sPopP.DclassName[tp]+(classN?'_'+classN:'');
  var w,s=oPos.style;if(!s.fontWeight&&(w=oPos.parentNode.style.fontWeight))s.fontWeight=w;	//	除非有明確設定font-weight，否則通常不會有效
 }
}

 //	修正
 if( tp==sPopF.popup && !sPopP.window && !(flag&sPopF.force) )
  tp=sPopF.window;	//	Mozilla中無法顯示popup


 //alert(sPopP.types[tp]+','+( sPopP.window || flag&sPopF.force )+','+oTxt);
 //	處理pop
 if(tp==sPopF.ruby){
  if(typeof oPos!='object'||!oPos.innerHTML)return;	//	oPop非HTML element就return
  if(oPos.doneRuby)return tp;	//	已經處理過<ruby>就pass
  //	處理repeat
  if( flag&sPopF.repeat || sPopP.RepeatC.indexOf(oTxt)!=-1 )
   oPos.title='',oTxt=window.navigator.userAgent.indexOf("MSIE")<0?'':oTxt.repeat(oPos.innerHTML.length/oTxt.length);	//	只有IE提供ruby，所以這時候不宜加入旁點功能。

  try{
   oPos.innerHTML='<ruby><rb>'+oPos.innerHTML+'<\/rb><rp>'
	//	半形與全形的括弧
	+(oTxt?window.navigator.userAgent.indexOf("Opera")>=0||/^[a-z\d\s_,.;"'\[\]{}+\-*\/]*$/i.test(oTxt)?'(<\/rp><rt>'+oTxt+'<\/rt><rp>)':'（<\/rp><rt>'+oTxt+'<\/rt><rp>）':'<\/rp><rt><\/rt><rp>')
	+'<\/rp><\/ruby>';
  }catch(e){
   var n=e.number&0xFFFF;
   if(n==601&&(typeof sPopError=='undefined'||sPopError!=n))alert('Error: '+e.description+' at\n'+oPos.outerHTML+'\n\n★也許是在這之前的tag出錯，例如有<b>卻沒有<\/b>。');
   sPopError=n;
  }
  oPos.doneRuby=true;

 }else if(tp==sPopF.popup){
  if(nopop||!sPopP.window)return tp;
  if(!repop){
   if(useAutoTxt)oTxt=oTxt.replace(brReg,brT);
   //	這是一種註解功能，在mouseout後，假定讀者繼續讀下去，所以就讓popup object消失。想要多看一點的，會去按他，這時才讓popup object繼續存在。
   sPopP.window.document.body.innerHTML=//oTxt=
	'<div style="'+sPopP.popupS+'" onblur="parent.sPopP.window.hide();" title="reference">[<b style="color:peru;cursor:pointer;" onclick="parent.sPopP.window.hide();">'+sPopP.closeMessage+'<\/b>] [<b style="color:green;cursor:pointer;" onclick="parent.sPopP.width+=100,parent.sPopP.height+=50,parent.'
	+sPopP.functionName+'(\''+repopMark+'\');">'+sPopP.biggerM+'<\/b>] [<b style="color:orange;cursor:pointer;" onclick="parent.sPopP.width=parent.sPopP.height=0,parent.'+sPopP.functionName+'(\''+repopMark+'\');">'+sPopP.resetM+'<\/b>]<hr style="color:purple;height:1px" />'+oTxt.replace(/'/g,'&#39;')+'<\/div>';
   sPopP.popObj=oPos||document.body;	//	object handling now(for popup:repop)
   //if(typeof oPos.onmouseout!='undefined')oPos.onmouseout=function(){sPopP.window.hide();};
  }
  //alert(sPopP.width+','+sPopP.height);
  if(flag&sPopF.clearPop)sPopP.window.hide();
  else sPopP.window.show(sPopP.left,sPopP.top,sPopP.width,sPopP.height,oPos||document.body);

 }else if(tp==sPopF.window){
  if(nopop)return tp;
  //if(typeof netscape=='object')netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");	//	創造無邊框視窗:titlebar=no	dependent:ns only	全螢幕：channelmode	带有收藏链接工具栏的窗口：directories	网页对话框：'dialogWidth:400px;dialogHeight:300px;dialogLeft:200px;dialogTop:150px;center:yes;help:yes;resizable:yes;status:yes'
/*
dialogHeight: iHeight 设置对话框窗口的高度。
dialogWidth: iWidth 设置对话框窗口的宽度。 　　
dialogLeft: iXPos 设置对话框窗口相对于桌面左上角的left位置。
dialogTop: iYPos 设置对话框窗口相对于桌面左上角的top位置。
center: {yes | no | 1 | 0 } 指定是否将对话框在桌面上居中，默认值是“yes”。
help: {yes | no | 1 | 0 } 指定对话框窗口中是否显示上下文敏感的帮助图标。默认值是“yes”。 　　
resizable: {yes | no | 1 | 0 } 指定是否对话框窗口大小可变。默认值是“no”。
status: {yes | no | 1 | 0 } 指定对话框窗口是否显示状态栏。对于非模式对话框窗口，默认值是“yes”；对于模式对话框窗口，默认值是 “no”。

window.showModalDialog(), window.showModelessDialog(): IE only. 不如用Ajax
*/
  var w=window.open('','comment','titlebar=no,dependent,resizable=1,menubar=0,toolbar=0,location=0,scrollbars=1,width=550,height=400'/*,fullscreen*/,false)
	,t=sPopP.commentTitle,_t=oPos.innerHTML&&oPos.innerHTML.length<9?sPopP.commentTitlePattern.replace(/%s/,oPos.innerHTML):t;	//	head, document.title
  //if(typeof netscape=='object')netscape.security.PrivilegeManager.disablePrivilege("UniversalBrowserWrite");
  if(document.title)t+=' @ ['+document.title+']',_t+=' @ '+document.title;
  //else t+=' @ [<a href="'+location.href+'">'+location.pathname+'<\/a>]';
  w.document.open(),
  w.document.write(
	//'<?xml version="1.1" encoding="UTF-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="content-type" content="text/html;charset=utf-8" /><title>'
	//+_t+'<\/title><script type="text/javascript">window.onblur=function(){window.close();};<\/script><\/head><body><b style="color:#11f;">'+t+':<\/b>'
	'<script type="text/javascript">window.onblur=function(){window.close();};<\/script><b style="color:#11f;">'+t+':<\/b>'
	+(oPos.innerHTML?'<div id="s" style="color:#488;background-color:#FF8;">\n'+oPos.innerHTML.replace(/\n/g,'<br />').replace(/ /g,'&nbsp;')+'\n<\/div><hr />':'')	//;white-space:normal;width:500px:useless	** 這邊會對<b title="..等造成影響！
	+'<div id="c" style="color:#404;background-color:#8FF;">\n'+oTxt.replace(/\n/g,'<br />').replace(/ /g,'&nbsp;')	//	以不換行(pre)的方式顯示.patch
	+'\n<\/div><hr />[ <b style="cursor:pointer;color:#40f;" onclick="javascript:opener.focus();self.close();">'+sPopP.closeMessage+'<\/b> ]')//+'</body></html>'
   ,w.document.close(),w.document.title=_t;
  w.focus();
  w=null;	//	open出來的窗口即使close了，它的window對象還是存在的，要記得刪除引用	http://www.blogjava.net/tim-wu/archive/2006/05/29/48729.html
 }//else alert('type error: '+tp+'!');

 return tp;	//	回傳決定的type
}


/*	開啟連結於 target
	**	最好將openAtInit();設在onload
	JScript solution for attribute 'target' @ XHTML1.1	<a target="tag">之取代策略
	way 1:	,captureE,openAtInit,"openAtInit();",openAt
	onload: + openAtInit()		,captureE,openAtInit,"openAtInit();",openAt
	target="tag"	→	onclick="return openAt('tag')"
	target="_blank"	→	onclick="return openAt()"
	target="_self"	→	onclick="return openAt(1)"
	way 2:	,openAt
	target="_blank"	→	onclick="return openAt(0,this.href)"
	target="_self"	→	onclick="return openAt(1,this.href)"
	http://tohoho.wakusei.ne.jp/js/event.htm

TODO:
http://hi.baidu.com/monyer/blog/item/56f1c88095fc96d79023d931.html
a{text:expr/*XSS* /ession(target="_blank");}

http://blog.fanstown.net/blogs/jerry/archive/2007/04/04/HTML_8476_rel_5E5C2760E68BE3890230_.aspx
原來這樣寫的代碼：
<a href="document.html" target="_blank"> 打開一個新窗口</a>
現在要寫成這樣：
<a href="document.html" rel="external">打開一個新窗口</a>
這是符合strict標準的方法。當然還必須配合一個javascript才有效。
**	應該 binding a.onclick 或 a.keypress
rel是relationship的英文縮寫.rel與rev具有互補的作用,rel指定了向前鏈接的關係,rev指定了反向鏈接的關係.

*/
var captureE;
//	初始化設定
//openAtInit[generateCode.dLK]='captureE';
function openAtInit(){
 if(typeof captureE!='object'&&(typeof Event=='object'||typeof Event=='function')){	//	for moz
  //	http://developer.mozilla.org/en/docs/DOM:element.addEventListener	http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event
  if(Event.mousedown)window.captureEvents(Event.mousedown);
  if(Event.keydown)window.captureEvents(Event.keydown);
  window.onmousedown=window.onkeydown=function(e){
	 captureE=e;//alert('openAtInit: '+e.target.tagName);
	};
 }
 for(var i,a=library_namespace.get_tag_list('a');i<a.length;i++)
  if(a[i].onclick&&!a[i].onkeypress&&(''+a[i].onclick).indexOf('openAt')!=-1)a[i].onkeypress=a[i].onclick;
}
//	open h(ref) in tag(et)
//openAt[generateCode.dLK]='captureE,openAtInit';
function openAt(tag,h){
 if(!tag)tag='_blank';//typeof tag=='undefined'||
 else if(tag===1)tag='_self';
 var t;
 if(!h&&typeof event=='object')h=event.srcElement.href;

 //	對Gecko等使用標準(?)Document Object Model的
 //	http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 if(!h&&typeof captureE=='object'&&typeof captureE.target=='object'){
  t=captureE.target;
  while(!(h=t.href)&&(t=t.parentNode));
 }

 //alert(h+','+tag+'\n'+captureE.target.parentNode.tagName+":");//+captureE.target.parentElement().tagName
 if(h)window.open(h,tag).focus();
 return false;
}

/*	display mark to valid document
	<div id="valid">&nbsp;</div>
	window.onload="addValid()";
	搞定之後把自己網站提交到W3C Sites收錄。	http://www.w3csites.com/

	for RSS:
	http://rss.scripting.com/?url=http%3A%2F%2Flyrics.meicho.com.tw%2Fgame%2Frss.xml
	http://feedvalidator.org/check.cgi?url=http%3A%2F%2Flyrics.meicho.com.tw%2Fgame%2Frss.xml
*/
function addValid(v,tf){	//	object to insert valid, target window/frame
 if(location.protocol=='file:')return;
 if(!v)v='valid';if(typeof v!='object')v=document.getElementById(v);
 if(!v)return 1;if(v.innerHTML.replace(/&nbsp;/g,'').replace(/\s+/g,''))return 2;

 if(typeof tf==='undefined')tf='valid_window';//tf=dQuote(tf);//tf?' target="'+tf+'"':'';
 var i=0,t='',d,addValidData=[
	'Valid XHTML 1.1! by W3C	http://validator.w3.org/check?uri=referer	http://www.w3.org/Icons/valid-xhtml11'
	//,'Valid XML 1.0! by W3C	'
	,'Valid CSS! by W3C	http://jigsaw.w3.org/css-validator/check/referer	http://jigsaw.w3.org/css-validator/images/vcss'	//	http://jigsaw.w3.org/css-validator/validator?uri=~
	,'Validome Validation Services	http://www.validome.org/referer	http://www.validome.org/images/valid/set2/valid_xhtml_1_1.png'
	,'Another HTML-lint check	http://openlab.ring.gr.jp/k16/htmllint/htmllint.cgi?ViewSource=o	http://openlab.ring.gr.jp/k16/images/ahl-blue.gif'
	,'Bobby WAI-AAA Approved by bobby@watchfire.com	http://bobby.watchfire.com/bobby/bobbyServlet?URL=~&output=Submit&gl=wcag1-aaa	http://bobby.watchfire.com/bobby/html/en/images/approved_aaa.gif'
	,'Bobby 508 Approved by bobby@watchfire.com	http://bobby.watchfire.com/bobby/bobbyServlet?URL=~&output=Submit&gl=sec508	http://bobby.watchfire.com/bobby/html/en/images/approved_508.gif'
	//	http://webxact.watchfire.com/
	];
 for(;i<addValidData.length;i++)
  if(d=addValidData[i].split('	'),d[1])t+=' <a title="'+d[0]+'" href="'+d[1].replace(/~/g,encodeURI(location.href))
	+'" target="'+tf+'">'
	+(d[2]?'<img style="display:inline;width:88px;" alt="'//'" onclick="return openAt(\''+tf+'\');"><img style="display:inline;" alt="'	IE不通
		+d[0]+'" src="'+d[2]+'" />':d[0])
	+'<\/a>';	//	tf.focus()
  else alert('Validate data defined error!');
 v.innerHTML='Validate this document:<br />'+t;
 v.style.display='block';
 return t;
}


/*	延遲執行: 加強版的 setTimeout?

id=delayRun(function[,ms=0])

id=delayRun([function,[args],this] [,ms=0])

*/
function delayRun(f, ms) {
	var _f = delayRun, i;
	if (!_f.fL)
		_f.fL = [];
	i = _f.fL.length;
	_f.fL.push(f);
	setTimeout('delayRun.run(' + i + ');', ms || 0);
	return i;
}
delayRun.clear = function(i) {
	// clearTimeout(): 為求簡單省略
	delete this.fL[i];
};
delayRun.run = function(i) {
	var _t = this, f = _t.fL[i];
	if (f) {
		if (typeof f == 'function')
			f();
		else if (Array.isArray(f))
			f[0].apply(f[2] || null, f[1]);
		else
			eval(f);
		delete _t.fL[i];
	}
};







/*	MsgBox, InputBox Titlebars Prefixed with 'VBScript'	http://support.microsoft.com/default.aspx?scid=kb;en-us;234742
	http://asp.programmershelp.co.uk/vbscriptmsgbox.php
	http://17.webmasters.com/caspdoc/html/vbscript_msgbox_function.htm
請加入下面一段中介function
<script type="text/vbscript">
Function VBalert_vbf()
 VBalert_f.ret=MsgBox(VBalert_f.prompt,VBalert_f.buttons,VBalert_f.title,VBalert_f.helpfile,VBalert_f.context)
End Function
</script>

or use:
window.execScript( sExpression, sLanguage );
*/
//var VBalert_f;VBalert();	//	init
function VBalert(prompt,buttons,title,helpfile,context){
 if(typeof VBalert_f!='object')VBalert_f={},set_Object_value('VBalert_f','ret=0,'
	//	http://msdn.microsoft.com/library/en-us/script56/html/vsfctmsgbox.asp
	+'vbOK=1,vbCancel=2,vbAbort=3,vbRetry=4,vbIgnore=5,vbYes=6,vbNo=7,'
	+'vbOKOnly=0,vbOKCancel=1,vbAbortRetryIgnore=2,vbYesNoCancel=3,vbYesNo=4,vbRetryCancel=5,'
	+'vbCritical=16,'	//	Critical Message icon	(x)
	+'vbQuestion=32,'	//	Warning Query icon	(?)
	+'vbExclamation=48,'	//	Warning Message icon	(!)
	+'vbInformation=64,'	//	Information Message icon(i)
	+'vbDefaultButton1=0,vbDefaultButton2=256,vbDefaultButton3=512,vbDefaultButton4=768,vbApplicationModal=0,vbSystemModal=4096','int');
 if(typeof prompt=='undefined')return;
 VBalert_f.prompt=prompt||'',VBalert_f.buttons=buttons||0,VBalert_f.title=title||'';
 //	Not available on 16-bit platforms.	http://msdn.microsoft.com/library/en-us/script56/html/vsfctmsgbox.asp
 VBalert_f.helpfile=helpfile||'',VBalert_f.context=context||0;
 try{
  VBScript:VBalert_vbf();
  return VBalert_f.ret;
 }catch(e){
  //alert('VBalert error:'+e.message);
  alert(VBalert_f.prompt);
 }
}
//alert(VBalert('12',VBalert_f.vbInformation+VBalert_f.vbDefaultButton3));



/*	get window status	取得視窗可利用的size。現在還得用種方法，真是羞恥。	2005/1/13 20:0
	get_window_status(event object)
	http://www.mozilla.org/docs/dom/domref/dom_window_ref.html
	http://msdn.microsoft.com/workshop/author/dhtml/reference/objects/body.asp
	http://www.howtocreate.co.uk/tutorials/index.php?tut=0&part=16
	http://www.webdevtips.com/webdevtips/faq/javascript/index.shtml
	http://www.quirksmode.org/viewport/compatibility.html
	http://cgi.din.or.jp/~hagi3/JavaScript/JSTips/Mozilla/eventhandle.htm

** untested !!

*/

var event_Object;
/**
 * 取得當前 window status
 * @param node	HTML element or Event object
 * @returns {Object}	status
 */
function get_window_status(node) {
	var t = get_window_status.scroll(), r = {
			scrollLeft : t[0],
			scrollTop : t[1]
	};

	//	能scroll的範圍:不準,yet test	The height of the total page (usually the body element)
	//	t:test, true:all but Explorer Mac, false:Explorer Mac, would also work in Explorer 6 Strict, Mozilla and Safari
	var t = typeof document.body.scrollHeight != 'undefined'
		&& typeof document.body.offsetHeight != 'undefined'
			&& document.body.scrollHeight > document.body.offsetHeight;

	r.scrollW = t ? document.body.scrollWidth
			: typeof document.body.offsetWidth != 'undefined' ? document.body.offsetWidth
					: null;
	r.scrollH = t ? document.body.scrollHeight
			: typeof document.body.offsetHeight != 'undefined' ? document.body.offsetHeight
					: null;

	// window 大小
	// 2009/3/23 1:15:29
	var NewIE = navigator.appVersion.indexOf("MSIE") != -1
		&& parseInt(navigator.appVersion.split("MSIE")[1]) > 6;
	r.windowW = typeof window.innerWidth != 'undefined' ? window.innerWidth
			: /* typeof offsetWidth!='undefined'?offsetWidth: */!NewIE
			&& typeof document.body.clientWidth != 'undefined' ? document.body.clientWidth
					: document.documentElement
					&& !isNaN(document.documentElement.clientWidth) ? document.documentElement.clientWidth
							: null;// +offsetLeft
	r.windowH = typeof window.innerHeight != 'undefined' ? window.innerHeight
			: /* typeof offsetHeight!='undefined'?offsetHeight: */!NewIE
			&& typeof document.body.clientHeight != 'undefined' ? document.body.clientHeight
					: document.documentElement
					&& !isNaN(document.documentElement.clientHeight) ? document.documentElement.clientHeight
							: null;// +offsetTop

	var noEmu;
	if (!node)
		if (typeof window.event === 'object')
			node = window.event;
		else if (typeof e === 'object')
			node = e;
		else if (typeof event_Object === 'object')
			noEmu = true, node = event_Object;

	if (node) {
		// Safari: yet test
		var isSafari = /Safari/i.test(window.navigator.appName);

		// window相對於screen位置:不準, yet test
		r.windowX = node.clientX - ((isSafari) ? r.scrollLeft : 0);
		r.windowY = node.clientY - ((isSafari) ? r.scrollTop : 0);
		// mouse位置
		// http://msdn.microsoft.com/workshop/author/dhtml/reference/objects/obj_event.asp
		// http://www.mozilla.org/docs/dom/domref/dom_event_ref.html
		r.mouseX = node.clientX + ((!isSafari) ? r.scrollLeft : 0);
		r.mouseY = node.clientY + ((!isSafari) ? r.scrollTop : 0);
		if (!noEmu)
			//	模擬event obj，因為event obj不能在event發生時之function執行完後再取得
			event_Object = {
					'clientX' : node.clientX,
					'clientY' : node.clientY
			};
			// alert(r.scrollLeft+','+r.scrollTop+'\n'+o.clientX+','+o.clientY);
	}

	return r;
}

//	IE7遵照標準，不用 document.body.scrollLeft 而用 document.documentElement.scrollLeft
//	http://hkom.blog1.fc2.com/blog-entry-423.html
//	http://diaspar.jp/node/47
get_window_status.scroll = function (node) {
	var box_model, od = node && node.ownerDocument;

	try{
		//	from jQuery
		var div = document.createElement('div');
		div.style.width = div.style.paddingLeft = '1px';
	
		document.body.appendChild(div);
		_.get_window_status.box_model = box_model = div.offsetWidth === 2;
		if(!node)
			od = div.ownerDocument;
		document.body.removeChild(div).style.display = 'none';
	
		div = null;

	}catch (e) {
		// TODO: handle exception
	}

	//	到這邊，若是 od 未設定，則所有取值與 node 無關。
	//	因為大多有 ownerDocument，所以預設編入。
	//	新的 browser，od 與 dv 皆應有設定。

/*

Firefox/3.6.6: ownerDocument: [object HTMLDocument], defaultView: [object Window], box_model: true, pageXOffset: 0, body.scrollLeft: 0, documentElement.scrollLeft: 0, scrollX: 0
Chrome/6.0.453.1 Safari/534.2: ownerDocument: [object HTMLDocument], defaultView: [object DOMWindow], box_model: true, pageXOffset: 0, body.scrollLeft: 0, documentElement.scrollLeft: 0, scrollX: 0
Safari/533.16: ownerDocument: [object HTMLDocument], defaultView: [object DOMWindow], box_model: true, pageXOffset: 0, body.scrollLeft: 0, documentElement.scrollLeft: 0, scrollX: 0
Opera/9.80 Presto/2.6.30: ownerDocument: [object HTMLDocument], defaultView: [object Window], box_model: true, pageXOffset: 0, body.scrollLeft: 0, documentElement.scrollLeft: 0, scrollX: 0


MSIE 5.0 @ MSIE 9.0 test: ownerDocument: [object], defaultView: undefined, box_model: false, pageXOffset: undefined, body.scrollLeft: 0, documentElement.scrollLeft: 0, scrollX: undefined
MSIE 7.0 @ MSIE 9.0 test: ownerDocument: [object], defaultView: undefined, box_model: true, pageXOffset: undefined, body.scrollLeft: 0, documentElement.scrollLeft: 0, scrollX: undefined

MSIE 8.0: ownerDocument: [object HTMLDocument], defaultView: undefined, box_model: true, pageXOffset: undefined, body.scrollLeft: 0, documentElement.scrollLeft: 0, scrollX: undefined
MSIE 9.0 test: ownerDocument: [object HTMLDocument], defaultView: [object Window], box_model: true, pageXOffset: 0, body.scrollLeft: 0, documentElement.scrollLeft: 0, scrollX: undefined

*/
	//	IE5-8: od: true, dv: false

	var doc = node && od || window.document,
	body = doc.body, dv = doc.defaultView, win = dv || doc.parentWindow;
	library_namespace.debug('ownerDocument: ' + od + ', defaultView: ' + dv + ', box_model: ' + box_model + ', pageXOffset: ' + win.pageXOffset + ', body.scrollLeft: ' + body.scrollLeft + ', documentElement.scrollLeft: ' + doc.documentElement.scrollLeft + ', scrollX: ' + win.scrollX, 2, 'get_window_status.scroll');

	//	** 順序有關係! 但在未設置 box_model 前，body.scrollLeft 排在 documentElement.scrollLeft 前面。現在已按照 jQuery 改過。
	//	TODO: do test
	//	[scrollLeft, scrollTop, clientLeft, clientTop]
	return (get_window_status.scroll =
		!isNaN(win.pageXOffset) ?
			//	預設 box_model === true
			function (n) {
				//	'|| window.document': for Range (see get_selection())
				var d = n && n.ownerDocument || window.document,
				w = d.defaultView;
				d = d.documentElement;
				return [ w.pageXOffset, w.pageYOffset, d.clientLeft, d.clientTop ];
			} :

		//	IE7(6?)~8
		box_model && !isNaN(doc.documentElement.scrollLeft) ?
			function (n) {
				var d = (n && n.ownerDocument || window.document).documentElement;
				return [ d.scrollLeft, d.scrollTop, d.clientLeft, d.clientTop ];
			} :

		//	IE5(6?)
		!isNaN(body.scrollLeft) ?
			function (n) {
				var b = (n && n.ownerDocument || window.document).body;
				return [ b.scrollLeft, b.scrollTop, b.clientLeft, b.clientTop ];
			} :

		!isNaN(win.scrollX) ?
			//	untested
			function() {
				var b = document.body;
				return [ window.scrollX, window.scrollY, b.clientLeft, b.clientTop ];
			} :

		function() {
			return [ 0, 0, 0, 0 ];
		}
	)(node);

};

_// JSDT:_module_
.
get_window_status = get_window_status;




_// JSDT:_module_
.
/**
 * get current computed style property of specified HTML element.
 * TODO: 整合 get_node_offset, _.set_style
 * @param element	HTML element
 * @param name	W3C style property name (e.g., no '-webkit-background-clip')
 * @return
 * @see
 * http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug, http://www.comsharp.com/GetKnowledge/zh-CN/TeamBlogTimothyPage_K983.aspx,
 * curCSS @ jQuery, http://api.jquery.com/category/css/,
 * <a href="http://www.quirksmode.org/dom/getstyles.html" accessdate="2010/4/1 15:44">JavaScript - Get Styles</a>,
 * <a href="http://www.javaeye.com/topic/140784?page=2" accessdate="2010/4/1 15:41">style.display取值不对，难道是浏览器bug？讨论第2页:  - JavaScript - web - JavaEye论坛</a>
 * 大體上，currentStyle 相當於 getComputedStyle，而 runtimeStyle 相當於 getOverrideStyle。但是它們還是有很重要的區別。那就是，IE的CSS計算步驟其實是不合標準的。
 * document.defaultView 在 mozilla 中是指向 window obj 的,但是很有可能在其他 broswer 中就不指向 window obj.. 因為 w3c 中沒有強行規定 document.defaultView 一定是一個global obj.
 * 
 * 返回頁內樣式表定義的類，那麼可以使用DOM樣式表對象來訪問：
 * var oCssRulers = document.styleSheets[0].cssRulers || document.styleSheets[0].rulers;
 * (前者是DOM方法，後者是IE私有方法)
 * alert(oCssRulers[0].style.display);
 * @since	2010/4/2 00:14:09	rewrite
 * @_memberOf	_module_
 */
get_style = function(element, name, not_computed) {
	if (typeof element === 'string')
		element = document.getElementById(element);

	//	opacity

	if (!element || !name)
		return;

	var value, style_interface, e;
	name = name.toLowerCase();
	//	IE: element.style.styleFloat, firefox, chorme, safari: element.style.cssFloat
	//if (name === 'float') name = 'cssFloat' in element.style ? 'cssFloat' : 'styleFloat';

	if (style_interface = document.defaultView)	//	window.getComputedStyle
		try {
			if ((value = element.ownerDocument) && (value = value.defaultView))
				style_interface = value;
			else
				library_namespace.debug('Can not get .ownerDocument.defaultView of '
						+ library_namespace.node_description(element) + ' !');

			//if (/[A-Z]/.test(name)) name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
			//	width 之類可能 === "auto"!!
			value = style_interface.getComputedStyle(element, null)
					// [name]
					.getPropertyValue(name);

			//	from curCSS @ jQuery: return a number for opacity
			if(name === 'opacity' && value === '')
				value = 1;
		} catch (e) {
			library_namespace.warn('get_style(name: ' + name + ') error!');
			library_namespace.err(e);
		}

	//	IE 5-8
	else if (style_interface = element.currentStyle)
		//	IE: \w+\W\w+ (e.g., margin-bottom), firefox, chorme, safari: \w+-\w+
		//	IE8 中 width 之類可能 === "auto"!!
		value = style_interface[name === 'float' ? 'styleFloat' : name.replace(/-([a-z])/g, function($0, $1) { return $1.toUpperCase(); })];
		//	Dean Edwards（Base2類庫的作者）的hack	http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

	else if((style_interface = element.style) && (name in style_interface))
		value = style_interface[name];

	//	we should directly get it from element itself
	//else if (!(value = element['offset' + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()])) value = '';

	//	處理 px, pt, em, ..

	library_namespace
	.debug(library_namespace.node_description(element)
			+ '.style['
			+ name
			+ '] = ['
			+ value
			+ ']'
			+ (style_interface === document.defaultView ? ' (use W3C .getComputedStyle)'
					: style_interface === element.currentStyle ? ' (use IE .currentStyle)'
							: ''));

	return value;
};




//	not yet tested.
function get_style_sheets(filter, limit) {
	var filter_name, filter_item, filter_item_is_RegExp, i, sheet_property, length, tmp_style_sheets,
	//tag_list_default(document.styleSheets)
	style_sheets = document.styleSheets;
	if (!style_sheets || !style_sheets.length)
		return [];

	if (library_namespace.is_Object(filter)) {
		for (filter_name in filter) {
			filter_item = filter[filter_name];
			filter_item_is_RegExp = library_namespace.is_RegExp(filter_item);
			tmp_style_sheets = [];
			for (i = 0, length = style_sheets.length; i < length && (!limit || tmp_style_sheets.length < limit); i++) {
				sheet_property = style_sheets[i][filter_name] || '';
				if (filter_item_is_RegExp ? filter_item.test(sheet_property) : sheet_property.indexOf(filter_item) !== -1)
					tmp_style_sheets.push(style_sheets[i]);
			}
			style_sheets = tmp_style_sheets;
		}
	}

	return style_sheets;
};

_// JSDT:_module_
.
get_style_sheets = get_style_sheets;
_// JSDT:_module_
.
get_style_sheet = function(filter) {
	return get_style_sheets(filter, 1)[0];
};





/**
 * get the actual position [left,top,width,height] of an HTML node object
 * @param node	HTML node object
 * @return
 * @_memberOf	_module_
 * @deprecated	use get_style(), jQuery.offset(), jQuery.position()
 * @see
 * http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug, http://www.comsharp.com/GetKnowledge/zh-CN/TeamBlogTimothyPage_K983.aspx,
 * http://msdn.microsoft.com/library/en-us/dndude/html/dude04032000.asp,
 * http://www.mail-archive.com/mochikit@googlegroups.com/msg00584.html,
 * http://hartshorne.ca/2006/01/20/javascript_positioning/,
 * http://www.jb51.net/article/18340.htm,
 * http://blog.csdn.net/wangjj_016/archive/2010/04/09/5467507.aspx
 */
function get_node_offset(node) {
	if(!(node = get_element(node)))
		return {};

	var _s = _.get_node_offset,
	offset = 'offsetWidth' in node ? {
		width : node.offsetWidth,
		height : node.offsetHeight
	} : {};


	if(node.getBoundingClientRect){

		//	also see: getClientRects()

		var s = get_window_status.scroll(node),
		box = node.getBoundingClientRect();

		offset = {
				left : box.left + s[0] - s[2],
				top : box.top + s[1] - s[3],
				width : box.right - box.left,
				height : box.bottom - box.top
		};

	} else if (_.is_HTML_element(node)) {
		//alert(node.id+':'+node.offsetLeft+','+node.offsetTop+';'+node.offsetWidth+','+node.offsetHeight);
		var l = 0, t = 0, p;
			// n,countH=window.navigator.userAgent.indexOf("MSIE")>=0,add=1,outsideBLOCK=1,
		if(0)
		if (typeof node.offsetWidth !== 'undefined') {
			var _w = node.offsetWidth, _h = node.offsetHeight
				// ,_o=window.getComputedStyle?document.defaultView.getComputedStyle(node,null):null
				;
			//	http://www.quirksmode.org/dom/getstyles.html
			/*
			   if(_o)	//	moz未包含margin+border+padding	這些值可能會有'em'等等的出現，不一定都是px！
				//alert(_o.getPropertyValue('border-left-width')+','+_o.getPropertyValue('border-right-width')),
				_w+=parseInt(_o.getPropertyValue('border-left-width'))+parseInt(_o.getPropertyValue('border-right-width')),
				_h+=parseInt(_o.getPropertyValue('border-top-width'))+parseInt(_o.getPropertyValue('border-bottom-width'));
			   else if(_o=node.currentStyle)	//	IE
				//	IE的offset已經包含margin+border+padding的部份??另，這些值可能會有'em'等等的出現，不一定都是px。
				_w+=parseInt(_o['borderLeftWidth'])+parseInt(_o['borderRightWidth']),
				_h+=parseInt(_o['borderTopWidth'])+parseInt(_o['borderBottomWidt都是px;
			*/
			r.width = _w,
			r.height = _h;
		}

		//	下面這段依瀏覽器而有不同 (-_-)!!
		//	position:absolute
		//var tt='';	//	for debug
		//	2006/2/14: 經由 offset 一個個溯源
		var _o = node;
		while(_o&&!isNaN(_o.offsetLeft)){	//	IE在用style:class時會出現誤差。
			/*
			   n=_o.tagName;
			   //if( !/^T(ABLE|BODY|R)$/.test(n=_o.tagName) && (countH||!/^H\d$/.test(n)) )l+=_o.offsetLeft,t+=_o.offsetTop;
			   if(n=='DIV')add=outsideBLOCK;
			   else if(n=='TD' || countH&&/^H\d$/.test(n))add=1;
			   outsideBLOCK= n=='TABLE'||n=='DIV';	//	_o.style.display
			   tt+=(add?'':'#')+n+(_o.style.display?'('+_o.style.display+')':'')+':'+_o.offsetLeft+','+_o.offsetTop+(outsideBLOCK?', outside BLOCK':'')+'\n';
			   if(add)add=0,l+=_o.offsetLeft,t+=_o.offsetTop;
			*/

			l += _o.offsetLeft || 0, t += _o.offsetTop || 0;
			_o = _o.offsetParent;//.parentNode
		}

		//		有些會用到overflow，影響位置。	2008/5/31 0:10:7
		_o = node;
		while ((_o = _o.parentNode) && _o.tagName.toLowerCase() != 'body')
			l -= _o.scrollLeft || 0, t -= _o.scrollTop || 0;

		//		need to enable definition of tt above
		//alert('l '+l+',t '+t+',w '+r.w+',h '+r.h+(typeof tt=='string'?'\n'+tt:''));

		offset.left = l;
		offset.top = t;
	}

	return offset;
}

_// JSDT:_module_
.
get_node_offset = get_node_offset;

/*
//	get the [left,top,width,height] of obj
function get_node_offset2(obj){
 if(typeof obj=='string'){var o=document.getElementById(obj);if(o)obj=o;}	//	若loc為id
 if(typeof obj=='object'&&typeof obj.offsetLeft!='undefined'){	//	若obj為Document Object
  //alert(obj.id+':'+obj.offsetLeft+','+obj.offsetTop+';'+obj.offsetWidth+','+obj.offsetHeight);
  var l=obj.offsetLeft,t=obj.offsetTop,n,add,outsideBLOCK,countH=window.navigator.userAgent.indexOf("MSIE")>=0,r=[];
  if(typeof obj.offsetWidth!='undefined')r[2]=r.width=r.w=r.W=obj.offsetWidth,r[3]=r.height=r.h=r.H=obj.offsetHeight;

  //	下面這段依瀏覽器而有不同 (-_-)!!
  //	position:absolute
  //var tt=obj.tagName+':'+obj.offsetLeft+','+obj.offsetTop+'\n';	//	for debug
  while(isNaN((obj=obj.parentNode).offsetLeft)){	//	IE在用style:class時會出現誤差。
   n=obj.tagName;
   //if( !/^T(ABLE|BODY|R)$/.test(n=obj.tagName) && (countH||!/^H\d$/.test(n)) )l+=obj.offsetLeft,t+=obj.offsetTop;
   if(n=='DIV')add=outsideBLOCK;
   else if(n=='TD' || countH&&/^H\d$/.test(n))add=1;
   outsideBLOCK= n=='TABLE'||n=='DIV';	//	obj.style.display
   //tt+=(add?'':'#')+n+(obj.style.display?'('+obj.style.display+')':'')+':'+obj.offsetLeft+','+obj.offsetTop+(outsideBLOCK?', outside BLOCK':'')+'\n';
   if(add)add=0,l+=obj.offsetLeft,t+=obj.offsetTop;
  }
  //alert('l'+l+',t'+t+',w'+w+',h'+h+'\n'+tt);	//	need to enable definition of tt above
  r[0]=r.left=r.l=r.L=l,r[1]=r.top=r.t=r.T=t;
  return r;
 }
}
*/

/*	locate a object(obj/div, dialogue box, popup dialog) on where we want followed window location	2005/1/12 19:-13 21:22
	此函數會盡量不使obj超出window範圍的大小，除非設定了noResize/noMove或發生錯誤。若moveable+resizable(default)，會嘗試先move再resize。
obj:
	node or id.
	node 需要已經插入在 document.body 中。
loc:
	[left,top]/[left,top,width,height]/reference obj or id/0||'mouse':by mouse loc
		若left,top設定成%或是0.-，會當作相對於螢幕的比例。
margin:
	0/num=[num,num]/[offset x,offset y]
		在可能的情況下（不會造成超出window範圍）與loc之間空出的距離（所作的位移）。假如未輸入則自動設定。
flag:	locate_node_flag.~	!表示未實作
	下面幾項為預設模式
	auto[Locate]	自動調整位置(default)，若設定abs/rel則不會自動調整。
	resizable	可調整obj大小(default) <-> noResize
	moveable	可移動obj(default) <-> noMove
	下面幾項為模式選擇，擇一。
	auto[Locate]	自動判定並調整位置(default)，若設定abs/rel則不會自動調整。
	abs[olute]	這裡的loc為絕對location。假如有提供margin，則會嘗試定位於loc+margin處。
	rel[ative]	這裡的loc為相對於window左上角的location。假如有提供margin，則會嘗試定位於loc+margin處。
	asDialog,dialog	預設是普通obj，但當設定為此項(dialog)時，loc會被當成reference obj。
			作為某obj(loc)之附屬obj（對話框/說明等），會避開主obj(reference obj)之顯示範圍。
			假如提供的loc並非obj，則會假設主obj是個從loc開始，長寬為margin的object。
	dialogDown,dialogUp,dialogRight,dialogLeft	預設是擺在下面，此flag可改成上面或其他不同方位。
	擇一
	resizable	可調整obj大小(default) <-> noResize
	noResize	不可調整obj大小，若可移動會將整個obj移到能看清的邊界。
	擇一
	moveable	可移動obj(default) <-> noMove
	noMove		不可移動obj，若可調整大小會將整個obj縮到能看清的大小。
	下面幾項可任喜好選購（笑）
	keepDisplay	是否維持顯示之display mode。沒有時則顯示之。
	create		假如不存在此obj就造出來。預設若無法取得此obj則會直接return

	!		!假如沒足夠空間則不顯示，或是僅顯示警告。

*	假如在事件中設定'event_Object=event'可掌握mouse event

TODO:
locate_nodeClip=[l,t,w,h]:	resizable時將obj限制在這個範圍內

to top:
var locate_node_flag;
set_Object_value('locate_node_flag','resizable=0,moveable=0,autoLocate=0,auto=0,absolute=1,abs=1,relative=2,rel=2,asDialog=3,dialog=3,modeFlag=3,dialogDown=3,dialogUp=7,dialogRight=11,dialogLeft=15,dialogFlag=15,dialogForce=16,noResize=32,noMove=64,keepDisplay=128,create=256',1);	//	revise
*/
var locate_node_flag = {
		resizable : 0,
		moveable : 0,
		autoLocate : 0,
		auto : 0,
		absolute : 1,
		abs : 1,
		relative : 2,
		rel : 2,
		asDialog : 3,
		dialog : 3,
		modeFlag : 3,
		dialogDown : 3,
		dialogUp : 7,
		dialogRight : 11,
		dialogLeft : 15,
		dialogFlag : 15,
		dialogForce : 16,
		noResize : 32,
		noMove : 64,
		keepDisplay : 128,
		create : 256
	};
//locate_node[generateCode.dLK]='event_Object,locate_node_flag,get_window_status,locate_node';
function locate_node(obj, loc, margin, flag) {
	// 前置處理

	// setup obj
	if (!flag)
		flag = locate_node_flag.auto;
	if (!obj)
		return;
	if (typeof obj == 'string') {
		var id = obj;
		if (!(obj = document.getElementById(id)) && (flag & locate_node_flag.create))
			document.body.appendChild(obj = document.createElement('div')),
					obj.id = id;
	}

	// 在 dialog 時之預設位移
	var dMargin = {
		'X' : 2,
		'Y' : 2
	}
	, Display = flag & locate_node_flag.keepDisplay ? obj.style.display : 'block', Visibility = flag
			& locate_node_flag.keepDisplay ? obj.style.visibility : 'visible', win, dialog = (flag & locate_node_flag.modeFlag) == locate_node_flag.dialog ? flag
			& locate_node_flag.dialogFlag
			: 0, turnPercent = function(p, v) {
		if (typeof p == 'string') {
			var t = parseFloat(p.match(/([\d.]+)/));
			p = t ? t < 2 ? t * v : t < 200 ? t * v / 100 : t : 0;
		} else if (
				// typeof p1='undefined'&&
				isNaN(p))
			p = 0;
		return p;
	}, handle_percent = function(o, t) {
		// t: 0:loc, 1:margin

		// 是否重新指定
		var d = 0;
		if (typeof o == 'string')
			o = o.split(','), d = 1;
		if (!dialog && typeof o == 'object') {
			// 取百分比%
			if (typeof o[t ? 'left' : 'X'] == 'undefined'
					&& typeof o[0] != 'undefined')
				d = 1, o = t ? {
					'X' : o[0],
					'Y' : o[1]
				} : {
					'left' : o[0],
					'top' : o[1],
					// 假如o[2]未定義，width也會未定義（但有index）
					'width' : o[2],
					'height' : o[3]
				};
			if (t)
				o.X = turnPercent(o.X, win.windowW), o.Y = turnPercent(o.Y,
						win.windowH);
			else {
				o.left = turnPercent(o.left, win.windowW), o.top = turnPercent(o.top,
						win.windowH);
				if (typeof o.width == 'undefined') {
					delete o.width;
					delete o.height;
				} else
					o.width = turnPercent(o.width, win.windowW), o.height = turnPercent(o.height,
							win.windowH);
			}
		}
		if (d)
			if (t)
				margin = o;
			else
				loc = o;
	}, makeFit = function(l, t, r, b, hc) {
		//	test if out of range & 將box調整在range[left,top,right,bottom]內：先move，再resize
		if (boxL < l)
			boxL = l;
		if (boxT < t)
			boxT = t;
		var d = r - obj.offsetWidth;
		if (boxL > d)
			if (l > d)
				boxW = r - (boxL = l);
			else
				boxL = d;
		d = b - obj.offsetHeight;
		if (boxT > d)
			if (t > d)
				boxH = b - (boxT = t);
			else
				boxT = d;
		else if (hc && (boxT = hc - obj.offsetHeight / 2) < t)
			boxT = t;
	};

	obj.style.overflow = obj.style.visibility = 'hidden';
	if (obj.style.width)
		obj.style.width = '';
	if (obj.style.height)
		//	重設obj。
		obj.style.height = '';
	//	得設定obj之display，因為不這樣不能定offset。但可不顯現出來…只是好像沒啥效果。
	obj.style.display = 'block';

	// if(dialog!=locate_node_flag.dialogDown&&dialog!=locate_node_flag.dialogUp)dialog=0;
	// setup loc#1: handle dialog
	if (typeof loc == 'string') {
		// 若loc為id
		var o = document.getElementById(loc);
		if (o)
			loc = o;
	}
	if (typeof loc == 'object' && typeof loc.offsetLeft != 'undefined') {
		//	若loc為Document Object

		/*
		  //alert(loc.id+':'+loc.offsetLeft+','+loc.offsetTop+';'+loc.offsetWidth+','+loc.offsetHeight);
		  var l=loc.offsetLeft,t=loc.offsetTop,w,h,n,add,outsideBLOCK,countH=window.navigator.userAgent.indexOf("MSIE")>=0;	//	真妙..moz表示在<H\d>中的obj時不把H\d當作parent算進去
		  if(typeof loc.offsetWidth!='undefined')w=loc.offsetWidth,h=loc.offsetHeight;	//	loc.offsetWidth可能未定義？
		  //var tt=loc.tagName+':'+loc.offsetLeft+','+loc.offsetTop+'\n';	//	for debug
		  //	下面這段依瀏覽器而有不同 (-_-)!!
		  while(isNaN((loc=loc.parentNode).offsetLeft)){	//	IE在用style:class時會出現誤差。
		   n=loc.tagName;
		   //if( !/^T(ABLE|BODY|R)$/.test(n=loc.tagName) && (countH||!/^H\d$/.test(n)) )l+=loc.offsetLeft,t+=loc.offsetTop;
		   if(n=='DIV')add=outsideBLOCK;
		   else if(n=='TD' || countH&&/^H\d$/.test(n))add=1;
		   outsideBLOCK= n=='TABLE'||n=='DIV';	//	loc.style.display
		   //tt+=(add?'':'#')+n+(loc.style.display?'('+loc.style.display+')':'')+':'+loc.offsetLeft+','+loc.offsetTop+(outsideBLOCK?', outside BLOCK':'')+'\n';
		   if(add)add=0,l+=loc.offsetLeft,t+=loc.offsetTop;
		  }
		  //alert(l+','+t+'\n'+tt);	//	need to enable definition of tt above
		  loc={'left':l,'top':t,'width':w,'height':h};
		*/
		loc = get_node_offset(loc);
		if ((flag & locate_node_flag.modeFlag) == locate_node_flag.auto)
			flag += locate_node_flag.dialog - locate_node_flag.auto, dialog = locate_node_flag.dialog;
	}

	// setup margin
	win = get_window_status();
	if (!margin)
		margin =
			// dialog?dMargin:{'X':0,'Y':0};
			dMargin;
	else
		handle_percent(margin, 1);

	// setup loc#2: handle abs/rel
	if (!loc || loc == 'mouse')
		loc = {
			left : win.mouseX || 0,
			top : win.mouseY || 0
		};
	else {
		if ((flag & locate_node_flag.modeFlag) == locate_node_flag.auto && typeof loc == 'string'
				&& /[%.]/.test(loc))
			flag += locate_node_flag.rel - locate_node_flag.auto;
		handle_percent(loc);
	}
	// alert(loc.left+','+loc.top+';'+margin.X+','+margin.Y);
	if ((flag & locate_node_flag.modeFlag) == locate_node_flag.auto)
		// 到這裡還沒決定就很奇怪了
		flag += locate_node_flag[loc.width && loc.height && loc.top < win.windowH
				&& loc.left < win.windowW ? (dialog = locate_node_flag.dialog) && 'dialog'
				: 'abs']
				- locate_node_flag.auto;

	// 調整與判別
	// alert(loc.left+','+loc.top+';'+margin.X+','+margin.Y);
	// alert(loc.left+margin.X+','+(loc.top+margin.Y));
	// alert('dialog:'+dialog);

	if ((flag & locate_node_flag.modeFlag) == locate_node_flag.rel)
		// 改成絕對座標。此後僅存abs/dialog
		flag += locate_node_flag.abs - locate_node_flag.rel// -(flag&locate_node_flag.modeFlag)
		, loc.left += win.scrollLeft, loc.top += win.scrollTop;

	// 最後要設定的值
	var resizable = !(flag & locate_node_flag.noResize), boxL = loc.left, boxT = loc.top, boxW = -1, boxH = -1;
	if (flag & locate_node_flag.noMove)
		if (resizable)
			makeFit((boxL += margin.X) - margin.X, (boxT += margin.Y)
					- margin.Y, win.scrollLeft + win.windowW, win.scrollTop
					+ win.windowH);
		else {
			if (margin.X < 0
					|| boxL + margin.X >= win.scrollLeft
					&& boxL + margin.X + obj.offsetWidth < win.scrollLeft
							+ win.windowW)
				boxL += margin.X;
			if (margin.Y < 0
					|| boxT + margin.Y >= win.scrollTop
					&& boxT + margin.Y + obj.offsetHeight < win.scrollTop
							+ win.windowH)
				boxT += margin.Y;
		}
	else if (!dialog)
		// abs
		boxL += margin.X, boxT += margin.Y, makeFit(win.scrollLeft, win.scrollTop,
				win.scrollLeft + win.windowW, win.scrollTop + win.windowH);
	else {
		// 自動調整位置
		if (dialog) {
			if (!loc.width)
				loc.width = 0;
			if (!loc.height)
				loc.height = 0;
		} else
			// abs時,相當於dialog在(0,0)大小(0,0)
			loc = {
				'left' : win.scrollLeft,
				'top' : win.scrollTop,
				'width' : 0,
				'height' : 0
			};
		if (!obj.innerHTML)
			// 起碼先設定個大小以安排位置
			obj.innerHTML = '&nbsp;';

		var lA = win.scrollTop + win.windowH - loc.top - loc.height, lB = loc.top
				- win.scrollTop, lC = win.scrollLeft + win.windowW - loc.left - loc.width, lD = loc.left
				- win.scrollLeft,
				//	args for makeFit()
				m1 = win.scrollLeft, m2 = win.scrollTop,
				m3 = win.scrollLeft + win.windowW, m4 = win.scrollTop + win.windowH
				// move kind set use locate_node_flag.dialog~ flag
				, movekind;
		// alert(lA+','+lB+','+lC+','+lD+'\n'+obj.offsetWidth+','+obj.offsetHeight);

	/*
		+---------------------+
		|        ^            |
		|        | lB         |	<--screen (active frame)
		|        |            |
		|<---->#####<-------->|	###:reference obj
		|  lD    |      lC    |
		|        |            |
		|        | lA         |
		|        |            |
		+---------------------+
	*/
		// 決定 mode
		if (dialog && (flag & locate_node_flag.dialogForce))
			movekind = dialog;
		else {
			if (obj.offsetWidth < win.windowW
					&& (dialog != locate_node_flag.dialogRight
							&& dialog != locate_node_flag.dialogLeft || obj.offsetHeight >= win.windowH))
				if (obj.offsetHeight < lA
						&& (dialog != locate_node_flag.dialogUp || obj.offsetHeight >= lB))
					movekind = locate_node_flag.dialogDown;
				else if (obj.offsetHeight < lB)
					movekind = locate_node_flag.dialogUp;
			if (!movekind && obj.offsetHeight < win.windowH)
				if (obj.offsetWidth < lC
						&& (dialog != locate_node_flag.dialogLeft || obj.offsetWidth >= lD))
					movekind = locate_node_flag.dialogRight;
				else if (obj.offsetWidth < lD)
					movekind = locate_node_flag.dialogLeft;
			if (!movekind)
				movekind =
					// 以較大、可視的為準
					dialog != locate_node_flag.dialogRight && dialog != locate_node_flag.dialogLeft ?
						// 沒考慮假如lA<5時..
						lA < lB && resizable ? locate_node_flag.dialogUp : locate_node_flag.dialogDown :
						//
						lC < lD && resizable ? locate_node_flag.dialogLeft : locate_node_flag.dialogRight;
		}

		// alert(movekind);
		// 決定location
		if (movekind == locate_node_flag.dialogDown) {
			m2 = loc.top + loc.height;
			boxT += loc.height;
			if (!m1)
				m1 = loc.left;
		} else if (movekind == locate_node_flag.dialogUp) {
			m4 = loc.top;
			boxT -= obj.offsetHeight;
			margin.Y = -margin.Y;
			if (!m1)
				m1 = loc.left;
		} else if (movekind == locate_node_flag.dialogRight)
			m1 = loc.left + loc.width, boxL += loc.width;
		else
			m3 = loc.left, boxL -= obj.offsetWidth, margin.X = -margin.X;
		//else if(movekind==locate_node_flag.dialogLeft)

		// 加上偏移
		boxL += margin.X, boxT += margin.Y;
		if (!resizable) {
			if (boxL < m1 && margin.X < 0 || boxL + obj.offsetWidth > m3
					&& margin.X > 0)
				boxL -= margin.X;
			if (boxT < m2 && margin.Y < 0 || boxT + obj.offsetHeight > m4
					&& margin.Y > 0)
				boxT -= margin.Y;
			//	確保不會撞到
			m3 += obj.offsetWidth, m4 += obj.offsetHeight;
		}
		// 奇怪的是，alert(obj.offsetWidth)後obj.offsetWidth就變成0了。可能因為這值需要出函數之後再改。
		// alert(resizable+'\n'+m1+','+m2+','+m3+','+m4+','+movekind+'\n'+obj.offsetWidth+','+obj.offsetHeight);
		makeFit(m1, m2, m3, m4, movekind == locate_node_flag.dialogRight
				|| movekind == locate_node_flag.dialogLeft ? loc.top : 0);
	}

	// 設定位置
	// alert(boxL+','+boxT+','+boxW+','+boxH+','+Display);
	obj.style.position = 'absolute';
	obj.style.left = boxL + 'px';
	obj.style.top = boxT + 'px';
	if (boxW >= 0 || boxH >= 0) {
		obj.style.overflow = 'auto';
		//alert(obj.style.width+','+obj.style.height+'\n'+typeof obj.style.width+'\n->w,h:'+boxW+','+boxH);
		if (boxW >= 0)
			obj.style.width = boxW + 'px';
		if (boxH >= 0)
			obj.style.height = boxH + 'px';
	}
	obj.style.display = Display;
	obj.style.visibility = Visibility;

	// alert(obj.style.width+','+obj.style.height+'\n'+obj.offsetWidth+','+obj.offsetHeight);
	return obj;
};

_.locate_node = locate_node;







//	2007/4/25-27 0:48:22	RFC 3492 IDNA Punycode	未最佳化
//	http://stackoverflow.com/questions/183485/can-anyone-recommend-a-good-free-javascript-for-punycode-to-unicode-conversion
//	http://xn-punycode.com/
function Punycode() {
}

Punycode.map='abcdefghijklmnopqrstuvwxyz0123456789',
Punycode.Dmap=0,
Punycode.base=36,//Punycode.map.length
Punycode.tmin=1,
Punycode.tmax=26,
Punycode.skew=38,
Punycode.damp=700,
Punycode.initial_bias=72,//偏移
Punycode.initial_n=0x80,//128
Punycode.prefix="xn--",//the default ACE prefix
Punycode.delimiter='-';
Punycode._b=Punycode.base-Punycode.tmin,
//Punycode._t=(Punycode._b*Punycode.tmax)>>1,
Punycode._t=Math.floor(Punycode._b*Punycode.tmax/2);

//	IDNA ToASCII
Punycode.encodeDomain=function(UURL){
 var m=UURL.match(/^([\w\d\-]+:\/\/)?([^\/]+)/),UDomain=m?m[2]:'',i=(m=UDomain)?UURL.indexOf(m):0;
	//document.write('<hr />Punycode.encodeDomain UDomain: ['+i+']['+m+']<br />');
 if(m&&m.replace(/[\x01-\x7f]+/g,''))
  m=m.replace(/([^.]+)\./g,function($0,$1){
	//document.write($1+'→'+encode($1)+'<br />');
	 return Punycode.prefix+Punycode.encode($1)+'.';
	}),UURL=encodeURI(UURL.slice(0,i)+m+UURL.slice(i+UDomain.length));
 return UURL;
};

//	IDNA ToUnicode
Punycode.decodeDomain=function(PURL){
 var m=PURL.match(/^([\w\d\-]+:\/\/)?([^\/]+)/),PDomain=m?m[2]:'',i=(m=PDomain)?PURL.indexOf(m):0;
	//document.write('<hr />Punycode.decodeDomain PDomain: ['+i+']['+m+']<br />');
 if(m){
  m=m.replace(new RegExp(Punycode.prefix+'([^.]+)\\.','g'),function($0,$1){
	//document.write($1+'→'+Punycode.decode($1)+'<br />');
	 return Punycode.decode($1)+'.';
	});
  if(m!=PDomain){
   PURL=PURL.slice(0,i)+m+PURL.slice(i+PDomain.length);
   try{PURL=decodeURI(PURL);}catch(e){PURL=unescape(PURL);}
  }
 }
 return PURL;
};


Punycode.adapt=function(delta,numpoints,firsttime){
	//document.write('*adapt: '+delta+', '+numpoints+', '+firsttime+', _b='+_b+', _t='+_t+'<br />');
 delta=firsttime?Math.floor(delta/Punycode.damp):delta>>1;//Math.floor(delta/(firsttime?damp:2));
 delta+=Math.floor(delta/numpoints);
 var k=0;
 for(;delta>_t;k+=Punycode.base)delta=Math.floor(delta/Punycode._b);
 return k+Math.floor((Punycode._b+1)*delta/(delta+Punycode.skew));
};

Punycode.encode=function(UString){
 var n=Punycode.initial_n,cA=[],m,mA=[],i=0,c
	,q,delta=0,bias=Punycode.initial_bias,output=UString.replace(/[^\x01-\x7f]+/g,''),h=output.length,b=h;
	//document.write('<hr />Punycode.encode begin: ['+output+']<br />');
 if(b)output+=Punycode.delimiter;

 for(;i<UString.length;i++){
  cA.push(c=UString.charCodeAt(i));
  if(c>n)mA.push(c);
 }
 mA.sort(function(a,b){return b-a;});

 while(h<cA.length){
  do{c=mA.pop();}while(m==c);	//	預防重複
  m=c;
  //if(m-n>(Number.MAX_VALUE-delta)/(h+1)){alert('Punycode: overflow');return;}
  delta+=(m-n)*(h+1);//	should test overflow
  n=m;
  for(i=0;i<cA.length;i++){
   if(c=cA[i],c<n)++delta;//if(c=cA[i],c<n&&!++delta){alert('Punycode: overflow');return;}//	fail on overflow
	//document.write('<b>'+UString.charAt(i)+' '+(c.toString(16)+','+n.toString(16)).toUpperCase()+'</b><br />');
   if(c==n){
    for(q=delta,k=Punycode.base;;k+=Punycode.base){
     t=k<=bias/* +Punycode.tmin: not needed */?Punycode.tmin:k>=bias+tmax?Punycode.tmax:k-bias;
     if(q<t)break;
     output+=Punycode.map.charAt(t+(q-t)%(Punycode.base-t));
	//document.write('<b>'+output+'</b><br />');
     q=Math.floor((q-t)/(base-t));
    }
    output+=Punycode.map.charAt(q);
    bias=Punycode.adapt(delta,h+1,h==b);
	//document.write('h='+h+'/'+cA.length+', bias='+bias+', '+output+'<br />');
    delta=0,h++;
   }
  }
  delta++,n++;
 }
	//document.write(UString+'→'+output+'<br />');
 return output;
};

Punycode.decode=function(PCode){
 var n=Punycode.initial_n,i=0,p=PCode.lastIndexOf(Punycode.delimiter),bias=Punycode.initial_bias,output=p==-1?'':PCode.slice(0,p)
	,oldi,w,digit,l;
	//document.write('<hr />Punycode.decode begin: ['+output+']<br />');
 if(!Punycode.Dmap)for(w=0,Punycode.Dmap={};w<Punycode.map.length;w++)Punycode.Dmap[Punycode.map.charAt(w)]=w;//,document.write('Punycode.Dmap['+Punycode.map.charAt(w)+']='+w+'<br />');
 while(p<PCode.length-1){
  for(oldi=i,w=1,k=Punycode.base;;k+=Punycode.base){
   if(++p>=PCode.length){alert('Punycode: invalid input: out of range');return PCode;}
	//document.write('PCode.charAt('+p+')'+' = '+PCode.charAt(p)+' → '+Punycode.Dmap[PCode.charAt(p)]+'<br />');
   if(isNaN(digit=Dmap[PCode.charAt(p)])){alert('Punycode: invalid input');return PCode;}
   //if(digit>(Number.MAX_VALUE-i)/w){alert('Punycode: overflow');return;}
   i+=digit*w;
   t=k<=bias/* +Punycode.tmin: not needed */?Punycode.tmin:k>=bias+Punycode.tmax?Punycode.tmax:k-bias;
	//document.write('i='+i+', t='+t+', digit='+digit+', k='+k+'<br />');
   if(digit<t)break;
   //if(w>Number.MAX_VALUE/(base-t)){alert('Punycode: overflow');return;}
   w*=Punycode.base-t;
  }
  bias=Punycode.adapt(i-oldi,l=output.length+1,oldi==0);
	//document.write('bias='+bias+', n='+n+', i='+i+', l='+l+'<br />');
  //if(i/l>Number.MAX_VALUE-n){alert('Punycode: overflow');return;}
  n+=Math.floor(i/l);
  i%=l;
	//document.write('['+output.length+']'+output+'+'+n+'(0x'+n.toString(16).toUpperCase()+')@'+i+'→');
  output=output.slice(0,i)+String.fromCharCode(n)+output.slice(i);
	//document.write('['+output.length+']'+output+'<br />');
  i++;
 }
	//document.write(PCode+'→'+output+'<br />');
 return output;
};


/*
var testC='Hello-Another-Way--fc4qua05auwb3674vfr0b',rC;
document.write('<hr />'+
//Punycode.encodeDomain('http://國際.計畫.org/國際.計畫.htm')
Punycode.decodeDomain('http://xn--9cs229l.xn--gpyr35b.org/%E5%9C%8B%E9%9A%9B.%E8%A8%88%E7%95%AB.htm')
//Punycode.encode('463578')
//Punycode.decode('ihqwcrb4cv8a8dqg056pqjye')+'<hr />'+Punycode.encode('他们为什么不说中文')
//Punycode.decode('ihqwctvzc91f659drss3x8bo0yb')+'<hr />'+Punycode.encode('他們爲什麽不說中文')
//(rC=Punycode.decode(testC))+'<hr />'+(rC=Punycode.encode(rC))+'<hr />'+(testC==rC?'OK':'<b style="color:red">FAILED</b>:<br />'+testC+'<br />'+rC)
);
*/



/*	一個非常不好的 handle onload 方法。只在onload不具有arguments時有用，應該亦可用setTimeout('~',0)
	where	0:back,1:front

for IE:
<!--[if IE]><script defer type="text/javascript">
//	onload code
</script><![endif]-->

c.f.	http://www.brothercake.com/	http://simonwillison.net/2004/May/26/addLoadEvent/
	GO1.1 Generic onload by Brothercake
	window.addEventListener,document.addEventListener,typeof window.attachEvent
c.f.	setTimeout('~',0);	不過這不能確定已經load好
*/
/*
function addonload(s,where){
 if(!s||typeof window!='object')return 1;
 if(typeof s=='function'){
  s=parseFunction(s);
  if(!s||!s.funcName)return 2;
  s=s.funcName+'()';
 }
 var o=window.onload?typeof window.onload=='string'?window.onload:parseFunction(window.onload).contents:'';
 window.onload=new Function(where?s+';\n'+o:o+';\n'+s);
}
*/


_// JSDT:_module_
.
DOM_loaded = function() {
	if (winodow.document.readyState === "complete"
		|| winodow.document.body) {
		_.DOM_loaded = function() {
			return true;
		};
		return true;
	}

	return false;
};


/*
// The DOM ready check for Internet Explorer
try{document.documentElement.doScroll('left');}
catch(e){setTimeout(arguments.callee, 50);return;}

*/
_// JSDT:_module_
.
/**
 * 比較好點的 add onload。
 * 比起 add_listener()，本函數在已經 load 時依然會執行，而 add_listener 因為是用榜定的方法，因此 load 完就不再觸發(?)。
 * 這東西頂多只能擺在 include 的 JS file 中，不能 runtime include。
 * @example
 * CeL.use('net.web');
 * CeL.on_load(function(){sl(1);},'sl(2);');
 * @requires	_.add_listener,_.DOM_loaded
 * @see
 * jQuery: $(document).ready(listener);
 * DOMContentLoaded	http://webdesign.piipo.com/jquery/jquery_events
 * 可直接參考 SWFObject。
 * TODO:
 * <a href="http://javascript.nwbox.com/IEContentLoaded/" accessdate="2010/6/3 11:15" title="IEContentLoaded - An alternative for DOMContentLoaded on Internet Explorer">IEContentLoaded</a>
 * DOMContentLoaded是firefox下特有的Event, 當所有DOM解析完以後會觸發這個事件。
 * DOMContentLoaded與DOM中的onLoad事件與其相近。但onload要等到所有頁面元素加載完成才會觸發, 包括頁面上的圖片等等。
 * <a href="http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/06/05/jquery-ready-vs-load.aspx" accessdate="2010/6/3 11:17">jQuery ready vs load - 黑暗執行緒</a>
 * $(document).ready(fn)發生在"網頁本身的HTML"載入後就觸發，而$(window).load(fn)則會等到"網頁HTML 標籤中引用的圖檔、內嵌物件(如Flash)、IFrame"等拉哩拉雜的東西都載入後才會觸發。
 * @_memberOf	_module_
 */
on_load = function on_load() {
	var _s = _.on_load, loaded=_.DOM_loaded(), i = 0, a = arguments, l = a.length;
	for (; i < l; i++)
		if(loaded)
			a[i].call(document);
		else
			_.add_listener('load', a[i], document);
};


_// JSDT:_module_
.
/**
 * bind/add listener. register event control, setup code to run.
 * listener 應該加上 try{}catch{}，否則會搞不清楚哪裡出問題。
 * **	對同樣的 object，事件本身還是會依照 call add_listener() 的順序跑，不會因為 p_first 而改變。
 * **	NOT TESTED!!
 * TODO:
 * remove_listener():
 * .removeEventListener();
 * .detachEvent();
 * default 'this'
 * 自訂 event
 * 
 * @param {string}type	listen to what event type. event name/action.
 * 				http://www.whatwg.org/specs/web-apps/current-work/#event-handler-event-type
 * @param listener	listener function/function array/function string,
 * 				須 String 之 recursive function 時可 "(function(){return function f(){f();};})()"
 * 			function(e){var target=e?e.target:(e=window.event).srcElement;if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;if(e.preventDefault)e.preventDefault();else e.returnValue=false;return false;}
 * @param [target_element]	bind/attach to what HTML element
 * @param [p_first]	parentNode first
 * @return
 * @since	2010/1/20 23:42:51
 * @see
 * c.f., GEvent.add_listener()
 * @_memberOf	_module_
 */
add_listener = function add_listener(type, listener, target_element, p_first) {

	var _s = _.add_listener, i, adder;

	//	進階功能.
	//	type is Object or Array.
	if (library_namespace.is_Object(type) || Array.isArray(type)){
		// type is Object:
		// usage: add_listener({unload:Unload},target_element);
		// usage: add_listener({load:{true:[function(){sl(1);},'sl(2);']}},target_element);
		// type is Array:
		// usage: add_listener([{load:load},{unload:Unload}],target_element);

		//	此時 listener 已被忽略，shift arguments。
		if (!(listener = get_element(listener)))
			return;

		for (i in type){
			library_namespace.debug(i + ': ' + type[i], 2, 'add_listener');

			Array.isArray(type)?
					_s(type[i], listener, target_element)
					: _s(i, type[i], listener, target_element);
		}

		return;
	}

	if (!type || !listener)
		return;

	if (typeof listener === 'string')
		listener = new Function('e', listener);

	if (typeof target_element === 'string')
		target_element = get_element(target_element);

	if(typeof p_first !== 'boolean')
		p_first = typeof p_first === 'undefined' ? _s.p_first : !!p_first;

	//	listener is Array or Object.
	if (library_namespace.is_Object(listener) || Array.isArray(listener))
		// usage: add_listener('unload',{true:Unload1});
		// usage: add_listener('unload',[Unload1,Unload2]);
		// 因為 Array 會從最小的開始照順序出，所以這邊不再判別是否為 Array。
		for (i in listener)
			// if(isNaN(f))sl('add_listener: to '+i),_s.p_first=i==='true';//||i==1||i===true
			_s(type, listener[i], target_element,
					i === 'true' || (i === 'false' ? false : undefined));// ,sl((typeof i)+' ['+i+'] '+_s.p_first)

	else if(library_namespace.is_Function(listener)){
		/*
		 * 先設定好 native listener adding function
		 */
		if (target_element)
			adder = target_element.addEventListener;
		else if (!(adder = _s.global_adder) && adder !== null)
			_s.global_adder = adder = _s.get_adder();

		//$(document).ready(listener);

		//	使 listener 能以 this 取得 target_element
		i = function(e) {
			if(!e)
				e = window.event;

			//library_namespace.debug('fire ' + type, 0, 'add_listener');

			//	正規化 <a href="http://www.w3.org/TR/2009/WD-DOM-Level-3-Events-20090908/#interface-Event">Document Object Model (DOM) Level 3 Events</a>.
			//	這邊的附加設定應盡量只添上 native object, 預防 memory leak.
			if(!e.currentTarget)
				e.currentTarget = target_element;
			if(!e.target)
				e.target = e.srcElement || target_element;

			//	from fix in jQuery

			// check if target is a textnode (safari)
			if ( e.target.nodeType === 3 )
				e.target = e.target.parentNode;

			// Add relatedTarget, if necessary
			if ( !e.relatedTarget && e.fromElement )
				e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement;

			//	取得滑鼠座標
			//	http://hartshorne.ca/2006/01/23/javascript_cursor_position/
			//	http://hartshorne.ca/2006/01/18/javascript_events/
			if ( isNaN(e.pageX) && !isNaN(e.clientX) ) {
				var s = get_window_status.scroll();
				e.pageX = e.clientX + s[0] - s[2];
				e.pageY = e.clientY + s[1] - s[3];
			}

			//	.call: 使 listener 可以用 'this' 來指涉 element
			listener.call(target_element, e);
		};

		// 主要核心動作設定之處理
		//	TODO: 在 onload 時使 target_element = null
		// sl(type+' ('+((typeof p_first=='undefined'?_s.p_first:!!p_first)?'p_first':'run first')+'): '+listener);
		if(adder){
			try{
				//	直接用 target_element.addEventListener 不會有問題。
				//	.call(window.document): for Chrome 'Illegal invocation' issue
				//	http://stackoverflow.com/questions/1007340/javascript-function-aliasing-doesnt-seem-to-work
				//	但 IE9 需要 .call(target_element) 或者別用 .call，否則會得到 "Invalid procedure call or argument"
				adder.call(target_element, type, i, p_first);
			}catch(e){
				adder.call(window.document, type, i, p_first);
			}
			return;
		}

		if(target_element){
			//library_namespace.warn('add_listener: Can not get element.addEventListener! element.attachEvent: ' + target_element.attachEvent);
		}
		return target_element && (adder = target_element.attachEvent) ?
			// http://msdn.microsoft.com/en-us/library/ms536343(VS.85).aspx
			adder('on' + type, i)

		: _s.default_adder(type, i, p_first, target_element)
		;
	}

};

_// JSDT:_module_
.
/**
 * useCapture: parentNode first
 * @see
 * <a href="http://www.w3.org/TR/DOM-Level-3-Events/#event-flow" accessdate="2010/4/16 22:40">Document Object Model (DOM) Level 3 Events Specification</a>,
 * <a href="http://www.w3.org/TR/DOM-Level-3-Events/#interface-EventTarget" accessdate="2010/4/16 22:42">Interface EventTarget</a>
 */
add_listener.p_first = false;

_// JSDT:_module_
.
/**
 * get (native) global listener adding function.
 * TODO: 只設定一次
 * historical for Netscape Navigator, mozilla: window.captureEvents, document.captureEvents
 */
add_listener.get_adder = function() {
	/**
	 * moz (gecko), safari 1.2, ow5b6.1, konqueror, W3C standard: window.addEventListener
	 * @ignore
	 * @see
	 * <a href="https://developer.mozilla.org/en/DOM/element.addEventListener" accessdate="2010/4/16 22:35">element.addEventListener - MDC</a>
	 * <a href="http://simonwillison.net/2004/May/26/addLoadEvent/" accessdate="2010/4/16 22:36">Executing JavaScript on page load</a>
	 */
	return window.addEventListener ||
	/*
	 * opera 7.50, ie5.0w, ie5.5w, ie6w: window.attachEvent
	 * opera 7.50: document.attachEvent
	 */
	window.attachEvent ? function(t, l) {
		window.attachEvent('on' + t, l);
	} :
	/*
	 * MSN/OSX, opera 7.50, safari 1.2, ow5b6.1: document.addEventListener
	 */
	document.addEventListener ||
	/*
	 * ie5m, MSN/OSX, ie5.0w, ie5.5w ie6w: document.onreadystatechange
	 */
	null;

};

_// JSDT:_module_
.
/**
 * 最原始的，含括其他情況。
 * all: window.onload.
 * TODO: use queue
 * @param type	listen to what event type
 * @param listener	listener function/function array
 * @param [p_first]	parentNode first
 * @param [target_element]	bind/attach to what HTML element
 * @return
 * @see
 * http://blog.othree.net/log/2007/02/06/third-argument-of-addeventlistener/
 */
add_listener.default_adder = function(type, listener, p_first, target_element) {
	if(!target_element)
		target_element = window;

	var old = target_element[type = 'on' + type];
	//library_namespace.debug('adder ' + type + (old?' with old listener: '+old:''), 0, 'add_listener.default_adder');

	return target_element[type] =
		old ?
			//	TODO: typeof old==='string'
			p_first ? function(e) {
				if(!e)
					e = window.event;
				//library_namespace.debug('fire ' + type + ' (parentNode first)', 0, 'add_listener.default_adder');
				old.call(target_element, e);
				listener.call(target_element, e);
			} : function(e) {
				if(!e)
					e = window.event;
				//library_namespace.debug('fire ' + type + ' (parentNode latter)', 0, 'add_listener.default_adder');
				listener.call(target_element, e);
				old.call(target_element, e);
			}
		:
			function(e) {
				//library_namespace.debug('fire ' + type, 0, 'add_listener.default_adder');
				listener.call(target_element, e || window.event);
			}
		;
};

_// JSDT:_module_
.
/**
 * TODO:
 * listener list.
 * 當無法執行 DOM 操作時（尚未載入、版本太舊不提供支援等）以此為主。
 * add_listener.list[node][event type]=[listener list]
 */
add_listener.list = {};

_// JSDT:_module_
.
/**
 * TODO:
 * 觸發函數.
 * 當無法執行 DOM 操作時（尚未載入、版本太舊不提供支援等）以此為主。
 * add_listener.list[type]=[listener list]
 */
add_listener.list = {};



_// JSDT:_module_
.
/**
 * 阻止 JavaScript 事件冒泡傳遞，使 event 不傳到 parentNode。
 * @param e	event handler
 * @param c	cancel bubble
 * @see
 * http://www.jb51.net/html/200705/23/9858.htm
 * @_memberOf	_module_
 */
stop_event = function(event, c) {
	if (!event)
		event = window.event;

	if(typeof event.preventDefault === 'function')
		//	在拖曳時可阻止預定動作，例如跳頁展示圖片或檔案。 
		event.preventDefault();
	else
		event.returnValue = false;

	if(c)
		// cancelBubble 在IE下有效，stopPropagation 在 Firefox 下有效。
		// 停止冒泡，事件不會上升，我們就可以獲取精確的鼠標進入元素。 http://realazy.org/lab/bubble/
		if(typeof event.stopPropagation === 'function')
			event.stopPropagation();
		else
			event.cancelBubble = true;

	return false;
};



//sort_function([key, original index])
function sort_nodes(node_list, sort_function, key_generator) {

	if (typeof key_generator !== 'function')
		key_generator = function(n) {
			return n;
		};

	var i = 0, length = node_list.length, list = [];
	for (; i < length; i++)
		list.push([ key_generator(node_list[i]), i ]);

	list.sort(sort_function);

	// 依照次序排列 nodes。
	// TODO: 採用 .insertBefore() 時的最佳演算法，最小化（最少化）.insertBefore() 操作。找出 sort 後之連續 node list，有需要更動時才改。
	// TODO: 最佳化 table list。
	// TODO: 先 hide 是否會較快?
	for (i = 0; i < length; i++) {
	}
}



_// JSDT:_module_
.
/**
 * 獲取頁面上選中的選取區資訊。
 * 
 * @example
 * CeL.add_listener('mouseup', function (e) { var s = CeL.get_selection(); if (s && s.text) CeL.debug('select @' + this + '(' + s.element + ')' + ' (' + s.left + '+' + s.width + ',' + s.top + '+' + s.height + '), (' + e.pageX + ',' + e.pageY + '): ' + s.text); }, target_element);
 * 
 * @param	{Number} [index]	TODO: 第幾選取區, default: all or 0 if there's only ONE/ZERO selection
 * @return	{Object}
 * 	{
 * 		left: {Number} in px,
 * 		top: {Number} in px,
 * 		width: {Number} in px,
 * 		height: {Number} in px,
 * 		text: {String} 文字,
 * 		element: {HTMLElement},
 * 		selection: selection object (browser dependent)
 * 	}
 * @return	{undefined}	error.
 * @see
 * http://plugins.jquery.com/project/selectedText,
 * Gecko: https://developer.mozilla.org/en/DOM/Selection
 * @_memberOf	_module_
 */
get_selection = function(index) {
};


try{

	if (window.getSelection)
		_.get_selection = function(index) {
			//	Firefox, Opera, Safari
			//	http://help.dottoro.com/ljcvonpc.php
			//	Although the selection object is supported by Opera, it is only partially suppported. The window.getSelection method provides more complex functionality in that browser.
			//	http://www.dotvoid.com/2001/03/using-the-range-object-in-mozilla/
			var e = document.activeElement,
			//	在 Opera 中，e 為 [object Text]
			tag = e && e.tagName && e.tagName.toLowerCase(),
			s = window.getSelection();
			if(!s.rangeCount)
				//	點擊而無選擇?
				//	最起碼回應能得知的資訊
				return {
					text : '',
					element: s,
					selection: s
				};

			//	超出範圍可能會 Error: INDEX_SIZE_ERR: DOM Exception 1
			s = s.getRangeAt(!isNaN(index) && 0 <= index
					&& index < s.rangeCount ? index : 0);

			//	Gecko: https://developer.mozilla.org/en/DOM/range
			//	除了 Gecko 外，都有 s.getBoundingClientRect 但無 s.endContainer.getBoundingClientRect。
			//	Gecko 可以取 mouse event 作 workaround
			//library_namespace.debug(s.endContainer.parentNode);
			var offset = _.get_node_offset(
					s.getBoundingClientRect ? s : s.endContainer.parentNode
				);

			return {
				//	TODO: offset
				//	TODO: do test
				//s.startOffset,
				left : offset.left,
				top : offset.top,
				//s.endOffset,
				width : offset.width,
				height : offset.height,
				text : tag === 'textarea' || tag === 'input' || tag === 'select'
						? e.value.substring(e.selectionStart, e.selectionEnd)
						: s.toString(),
				element: s,//s.endContainer,
				selection: s
			};
	
		};

	else if (document.selection && document.selection.createRange) {
		// Internet Explorer
		// http://msdn.microsoft.com/en-us/library/ms534692%28VS.85%29.aspx
		// TODO: http://help.dottoro.com/ljefwsqm.php

		document.execCommand
		&& document.execCommand('MultipleSelection', true, true);

		_.get_selection = function(input) {
			var s = document.selection.createRange();

			return s.type !== 'None' && {
				//	TODO: do test
				//	http://msdn.microsoft.com/en-us/library/ms535872%28v=VS.85%29.aspx
				//	s.offsetLeft, s.offsetTop 較不準
				left : s.boundingLeft,
				top : s.boundingTop,
				width : s.boundingWidth,
				height : s.boundingHeight,
				text : s.text,
				//	TODO
				//element: null,
				selection: s
			};

		};

	} else if (document.getSelection)
		_.get_selection = function(input) {
			return {
				//	TODO: get offset from mouse location
				text : document.getSelection()
			};
		};

}catch (e) {
	// TODO: handle exception
}

/*
	↑HTML only	-------------------------------------------------------
*/



var is_IE=/*@cc_on!@*/!true;

/*
http://www.real-blog.com/programming/259
http://fettig.net/weblog/2006/10/09/detecting-ie7-in-javascript/

if(typeof window.XMLHttpRequest!="undefined"){
 // IE 7, mozilla, safari, opera 9
}else{
 // IE6, older browsers
}
*/





/*
http://www.cnlei.org/blog/article.asp?id=337
在IE下：
>> 支持keyCode
>> 不支持which和charCode,二者值為 undefined

在Firefox下：
>> 支持keyCode，除功能鍵外，其他鍵值始終為 0
>> 支持which和charCode，二者的值相同

在Opera下：
>> 支持keyCode和which，二者的值相同
>> 不支持charCode，值為 undefined

*/
_// JSDT:_module_
.
/**
 * 條碼器(Barcode Scanner)/雷射讀碼器的輸入可用 onkeypress 取得
 * @param callback	callback
 * @return
 * @since	2008/8/26 23:10
 * @example
 * //	usage:
 * deal_with_barcode(function(t) {
 * 	if (t.length > 9 && t.length < 17)
 * 		document.getElementById("p").value = t,
 * 		document.forms[0].submit();
 * });
 * @_memberOf	_module_
 */
deal_with_barcode = function (callback) {
	var k, lt = 0, st = 0;
	document.onkeypress = function(e) {
		var c = new Date();
		if (
				// 前後不超過 800，
				c - st > 800 ||
				// 與上一輸入不超過 90
				c - lt > 90) {
			st = c;
			k = "";
		}
		lt = c;
		c = e || window.event;
		c = c.keyCode || c.which || c.charCode;
		if (c > 32 && c < 120)
			k += String.fromCharCode(c);
		else if (c == 13)
			callback(k, e);
	};

};



//	https://addons.mozilla.org/js/search-plugin.js
//	TODO, & Chrome
function add_engine(){
	throw 'TODO';
}



//	for string encoding	-------------------------------------------------------
//	將HTML:&#ddd; → Unicode text
//	此函數只能用一次，為輸入資料良好之情況下使用。完整版： HTML_to_Unicode
//turnUnicode[generateCode.dLK]='setTool,getText';
function turnUnicode(b){
 //s=s.replace(/&#(\d+);/g,String.fromCharCode("$1"));//行不通
 var s=this.valueOf().replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'"),m,t;

 //舊版本
 //if(m=s.match(/&#(\d{2,7});/g))for(var i=0;i<m.length;i++)s=s.replace(m[i],String.fromCharCode(parseInt(m[i].slice(2,-1))));

 s=s	//.replace(/&#(0*38|[xX]0*26);/g,"\0")	//預防&#38;：&#38;=&
 //	.replace(/&#0*38;([^\d;]|$)/g,"\0$1").replace(/&#[xX]0*26;?([^a-fA-F\d;]|$)/g,"\0$1")

 .replace(/&#0*(\d{2,7});/g,function($0,$1){return String.fromCharCode($1);})	//JScript 5.5~
 //	.replace(/&#0*(\d{2,7});/g,function($0,$1){return $1>1114111?$0:String.fromCharCode($1);})	//預防error之版本,~10FFFF=1114111

 //if(mode=='x')
 //.replace(/&#[xX]0*([a-fA-F\d]{2,6});/g,function($0,$1){return String.fromCharCode(parseInt($1,16));})	//$x111;之版本
 //	.replace(/&#[xX]0*([a-fA-F\d]{2,6});/g,function($0,$1){var t=parseInt($1,16);return t>1114111?$0:String.fromCharCode(t);})

 //.replace(/\0/g,"&")	//預防&#38;回復
 ;
 if(b)s=s.gText();
 return s;
};
//	可適用perl: HTML::Entities::encode_entities()
//	需要escape的: [\<\>\"\'\%\;\)\(\&\+], tr/A-Za-z0-9\ //dc	http://www.cert.org/tech_tips/malicious_code_mitigation.html
_// JSDT:_module_
.
/**
 * Translate HTML code to Unicode text.
 * @param {String} HTML	HTML code
 * @param {Boolean} only_digital
 * @returns
 * @_memberOf	_module_
 */
HTML_to_Unicode = function(HTML, only_digital) {
	//	使用\0可能會 Warning: non-octal digit in an escape sequence that doesn't match a back-reference
	var t = HTML.valueOf();

	if (!only_digital)
		t = t
			//	自動clip null character
			.replace(/\0\0/g, '')
			.replace(/&nbsp;/g, ' ')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&apos;/g, "'")
			.replace(/&reg;/g, "®")
			;

	t = t
		//預防&#38;：&#38;=&
		.replace(/&#(0*38|[xX]0*26);/g, "\0\0")
		//預防error之版本,~10FFFF=1114111
		.replace(/&#0*(\d{2,7});/g, function ($0, $1) { return $1 > 1114111 ? $0 : String.fromCharCode($1); })
		.replace(/&#[xX]0*([a-fA-F\d]{2,6});/g, function ($0, $1) { var t = parseInt($1, 16); return t > 1114111 ? $0 : String.fromCharCode(t); })
		.replace(/%([a-fA-F\d]{2})/g, function ($0, $1) { return String.fromCharCode(parseInt($1, 16)); })
		;

	if (!only_digital)
		t = t
			//預防&#38;回復
			.replace(/\0\0/g, "&")
			.replace(/&amp;/g, '&')
			;

	return t;
};

_// JSDT:_module_
.
/**
 * Translate Unicode text to HTML
 * @param {String} text	Unicode text
 * @param mode	mode='x':&#xhhh;
 * @return {String}	HTML
 * @_memberOf	_module_
 */
to_HTML = function(text, mode) {
	var html = '', t, i = 0;
	for (; i < text.length; i++) {
		t = text.charCodeAt(i);
		html += '&#' + (mode === 'x' ? 'x' + t.toString(16) : t) + ';';
	}

	return html;
};

_// JSDT:_module_
.
/**
 * Translate Unicode text to HTML code
 * @param text	Unicode text
 * @param flags	flags, f&1!=0: turn \t, (f&2)==0: \n→<br />, f==4: to quoted
 * @param	ignore_tags	e.g., {object:{src:/^https?:\/\//},img:{src:/^https?:\/\//},a:{href:/^https?:\/\//}}
 * @return
 * @_memberOf	_module_
 */
Unicode_to_HTML = function(text, flags, ignore_tags) {
	text = ('' + text)
		.replace(/&/g, '&amp;')
		//	就是會出現這奇怪情況。
		.replace(/&amp;amp;/g, '&amp;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		;

	if (ignore_tags)
		text = text.replace(
		/<([^>]+)>/g,
		function($0, $1) {
			if (!($1 in ignore_tags))
				return '&lt;' + $1;
			var s = $1.split(/ /), i = 1, l = s.length, c = ignore_tags[$1];
			for (; i < l; i++) {
				m = s[i].match(/^([^=]+)(.+?)/);
				if (!(m[1] in c)
						|| !(library_namespace.is_type(
								c[m[1]], 'RegExp')
								&& c[m[1]].test(m[2]) || library_namespace
								.is_Function(c[m[1]])
								&& c[m[1]](m[2])))
					s[i] = '';
				return s.join(' ');
			}
		});
	else
		text = text.replace(/</g, '&lt;');

	if (flags == 4) return text;

	text = text.replace(/ /g, '&nbsp;');

	//if(!f)f=0;
	if (flags & 1)
		text = text.replace(/	/g, '<span style="margin-left:3em;">&nbsp;</span>');
	if (!(flags & 2))
		text = text.replace(/(\r?\n)/g, '<br />$1'); //+'<br />\n';
	return text;
};

// Ucode:\uhhhh及\xhh之意
_// JSDT:_module_
.
Unicode_unescape = function(U) {
	var T = U.replace(/\\\\|\\u005[cC]|\\x5[cC]|\\134/g, "\0")
		/*
		//way 1
		.replace(/\\u([a-fA-F\d]{4})/g,function($0,$1){return String.fromCharCode(parseInt($1,16));})
		.replace(/\\x([a-fA-F\d]{2})/g,function($0,$1){return String.fromCharCode(parseInt($1,16));})
		.replace(/\\([0-7]{1,3})/g,function($0,$1){return String.fromCharCode(parseInt($1,16));})
		//way 2
		.replace(/\\(u[a-fA-F\d]{4}|x[a-fA-F\d]{2})/g,function($0,$1){return String.fromCharCode(parseInt($1.substr(1),16));})
		.replace(/\\([0-7]{1,3})/g,function($0,$1){return String.fromCharCode(parseInt($1,16));})
		*/
		//way 3
		.replace(/\\(u[a-fA-F\d]{4}|x[a-fA-F\d]{2}|[0-7]{1,3})/g, function ($0, $1) { var t = $1.charAt(0); return String.fromCharCode(parseInt(t == 'u' || t == 'x' ? $1.substr(1) : $1, 16)); })
		;

	if (T.indexOf("\\") != -1)
		T = T
			.replace(/\\t/g, "<Tab>")
			.replace(/\\n/g, "<Line Feed>")
			.replace(/\\v/g, "<Vertical Tab>")
			.replace(/\\f/g, "<Form Feed>")
			.replace(/\\r/g, "<Carriage Return>")
			.replace(/\\(.)/g, "$1");

	return T.replace(/\0/g, "\\");
};

_// JSDT:_module_
.
//Unicode escape sequence
//	TODO: 效能
Unicode_escape = function(text, max_code) {
	var i = 0, U = '', t;
	if (isNaN(max_code))
		max_code = 256;
	for (; i < text.length; i++)
		U += (t = text.charCodeAt(i)) < max_code ?
				text.charAt(i)
				: "\\u0000".substr(0, 6 - (t = t.toString(16)).length) + t;
	return U;
};

function CSSToTxt(C) {
	return C.replace(/\\\\|\\0{0,4}5[cC][ \t\r\n\f]?/g, "\0")
		.replace(/\\([a-fA-F\d]{1,6})[ \t\r\n\f]?/g, function ($0, $1) { return String.fromCharCode(parseInt($1, 16)); })
		.replace(/\\(.)/g, "$1").replace(/\0/g, "\\");
}
function TxtToCSS(T, r, sp) {
	//	r:radio,sp:separator
	var i = 0, C = '', t, p = r && r > 3 && r < 9 ? '0'.repeat(r - 1) : '';
	if (!sp) sp = ''; sp += '\\';

	for (; i < T.length; i++)
		t = T.charCodeAt(i).toString(16)
		, C += sp + p.substr(0, r - t.length) + t; //(p&&r>t.length?p.substr(0,r-t.length):''):如果length是0或負值，會傳回空字串。
	return C.slice(sp.length - 1);
}


_// JSDT:_module_
.
/**
 * Translate a query string to a native Object contains key/value pair set.
 * @param	{String} query_string	query string. default: location.search
 * @param	{Object} add_to	append to this object
 * @return	key/value pairs
 * @type	Object
 * @since	2010/6/16 15:18:50
 * @_memberOf	_module_
 * @see
 */
get_query = function(query_string, add_to) {
	if (!query_string)
		query_string = window/* self */.location.search.slice(1);
	// else if(typeof query_string!=='string')..

	var i, q = query_string.replace(/\+/g, ' ').split('&'), p, s = add_to || {}, k, v;
	for (i in q)
		try {
			if (p = q[i].match(/^([^=]*)=(.*)$/)) {
				k = decodeURIComponent(p[1]);
				v = decodeURIComponent(p[2]);
				if (k in s)
					if (typeof s[k] === 'string')
						s[k] = [ s[k], v ];
					else
						s[k].push(v);
				else
					s[k] = v;
			} else
				s[decodeURIComponent(q[i])] = undefined;
		} catch (e) {
			// TODO: handle exception
		}

	return s;
};


_// JSDT:_module_
.
/**
 * Translate a native Object contains key/value pair set to a query string.
 * TODO: 增進效率。
 * @param	{Object} query_Object	query Object.
 * @return	{String} query string
 * @type	String
 * @_memberOf	_module_
 * @see
 * jQuery.param
 */
to_query_string = function(query_Object) {
	if (!library_namespace.is_Object(query_Object))
		return;

	var name,query_list=[];
	for(name in query_Object)
		query_list.push(encodeURIComponent(name)+'='+encodeURIComponent(query_Object[name]));
	return query_list.join('&');
};

/*	簡化 HTML (word)
	simplify HTML
	目標：剩下語意部分，去掉 style。
TODO:
保留 b, em
*/

var has_RegExp_group = false;

try {
	has_RegExp_group = (new RegExp('(\\d)\\1')).test('00');
} catch (e) {
}

//	保留 color: return style string to add
//reduce_HTML.keep_color=
reduce_HTML._keep_color = function (c) {
	if (c !== 'black')
		return c;
};
reduce_HTML.file = function (FP, enc) {
	//sl('reduce_HTML [' + FP + ']');
	var t = simpleRead(FP, enc || simpleFileAutodetectEncode), l;
	if (!t) {
		err('Open [' + FP + '] failed.');
		return;
	}

	l = t.length;
	t = this(t);

	FP = FP.replace(/\.[xs]?html?$/i, function ($0) { return '.reduced' + $0; });
	//sl('reduce_HTML: ' + l + '→' + t.length + ' (' + parseInt(100 * t.length / l) + '%)' + ', save to [<a href="' + encodeURI(FP) + '">' + FP + '</a>].');
	simpleWrite(FP, t, 'utf-8');
};
function reduce_HTML(t) {
	if (!t)
		return;
	var _f = reduce_HTML, f = function($0, $1, $2) {
		return $1 != $2 || ($1.toLowerCase() in {
			a : 1,
			p : 1,
			head : 1
		}) ? $0 : '';
	};
	//if(m=t.match(/<!--\[if [^\]]+\]>[\s\S]*?<!\[endif\]-->/))sl(m[0].replace(/</g,'&lt;'));
	//if(m=t.match(/<!\[if !vml\]>[\s\S]*?<!\[endif\]>/))sl(m[0]);

	t = t
		.replace(/[\s\n]*<(t[dh])([^>]+)>[\s\n]*/ig, function ($0, $1, $2) { var a = $2.match(/[\s\n](col|row)span=['"]?\d{1,3}['"]?/ig); return '<' + $1 + (a ? a.join('') : '') + '>'; })
		.replace(/<\?xml:namespace[^>]+>/g, '')
		.replace(/[\s\n]*(<\/t[dh]>)[\s\n]*/ig, '$1')
		.replace(/<wbr[^>]*>/ig, '<br />')
		.replace(/<([bh]r)[\s\n]+([^>]*)\/?>/ig, function ($0, $1, $2) { var m = $2.match(/[\s\n;"'][\s\n]*page-break-before[\s\n]*:[\s\n]*([^\s\n;"']+)/); return '<' + $1 + (m ? ' style="page-break-before:' + m[1] + '"' : '') + '>'; })
		.replace(/<(span|font|p|div|b|u|i)[\s\n]+([^>]*)>/ig, function ($0, $1, $2) {
			var t = '<' + $1, s = '', m;
			if (
					//	/Italic/i.test($2)
					$2.indexOf('Italic') !== -1)
				s += 'font-style:italic;';
			//	TODO: <u>, <b>
			if (_f.keep_color && (m = $2.match(/[\s\n;"'][\s\n]*color[\s\n]*:[\s\n]*([^\s\n;"']+)/)) && (m = _f.keep_color(m[1])))
				//	保留 color
				s += 'color:' + m + ';';
			return t + (s ? ' style="' + s + '"' : '') + '>';
		})
		.replace(/<(tr|table)[\s\n]+([^>]*)>/ig, '<$1>')
		.replace(/<span>([\s\S]*?)<\/span>/ig, '$1')	//	不能用 .+|\n ，IE8 sometimes crash
		.replace(/<span>([\s\S]*?)<\/span>/ig, '$1')	//	need several times
		.replace(/<font>([\s\S]*?)<\/font>/ig, '$1')
		.replace(/<([a-z\d]+)>[\s\n]*<\/([a-z\d]+)>/ig, f)
		.replace(/<([a-z\d]+)>[\s\n]*<\/([a-z\d]+)>/ig, f)	//	2 times
		.replace(/<o:p>([\s\S]*?)<\/o:p>/ig, '$1')
		.replace(/<st1:[^>]+>([\s\S]*?)<\/st1:[^>]+>/ig, '$1')
		.replace(/<!\[if !vml\]>([\s\S]*?)<!\[endif\]>/ig, '$1')
		.replace(/<o:SmartTagType [^>]+\/>/ig, '')
		/*
		<td>
		<p>&nbsp;</p>
		</td>
		*/
		.replace(/<(span|p|div|t[dr])([^>]*>)<(span|p)>(([\s\n]+|&nbsp;)*?)<\/(span|p)><\/(span|p|div|t[dr])>/ig, '<$1$2$4</$7>')
		.replace(/[\s\n]*<\/p>([\s\n]*<br\s*\/?>)*[\s\n]*<p[^>]*>/ig, '<br />\n')
		.replace(/<link rel=(File-List|colorSchemeMapping|themeData|Edit-Time-Data)[^>]+>/ig, '')
		.replace(/^[\s\n]*<html[^>]*>[\s\n]*/, '<html>')
		.replace(/[\s\n]*<body[^>]+>[\s\n]*/, '<body>')
		.replace(/[\s\n]*<!--\[if [^\]]+\]>[\s\S]*?<!\[endif\]-->(\r?\n)*/ig, '')
		.replace(/[\s\n]*<style[^>]*>[\s\S]*?<\/style>[\s\n]*/ig, '')
		.replace(/[\s\n]*<meta[\s\n][^>]+>[\s\n]*/ig, '')
	
		//	from HTML_to_Unicode()
		.replace(/&#0*(\d{2,7});/ig, function ($0, $1) { return $1 > 1114111 ? $0 : String.fromCharCode($1); })	//預防error之版本,~10FFFF=1114111
		.replace(/([\s\n]+|&nbsp;)+$|^([\s\n]+|&nbsp;)+/g, '')
		;

	if(has_RegExp_group){
		t = t.replace(/<([bis])[\s\n]*>([^<]*)<\/\1>([\s\n]*)<\1>/ig, '$2');
	}

	if (/<(img|table)[>\s\n]/.test(t)) {
		library_namespace.debug('Has table or images.');
		t = t.replace(/<\/head>/i, '<style type="text/css">table,th,td{border:1px solid #888;border-collapse:collapse;}img{border:0;max-width:99%;}</style></head>');
	}

	return t;
};


_// JSDT:_module_
.
/**
 * 將 BIG5 日文假名碼修改為 Unicode 日文假名。
 * @param {String} text	Unicode text
 * @return
 * @see
 * from Unicode 補完計畫 jrename.js
 */
Big5_kana_fix = function(text) {
	var H = '', t, i = 0;
	for (; i < text.length; i++)
		t = c.charCodeAt(0)
		// 某次破解Windows Installer所用的資料
		// ,H+=String.fromCharCode(t>61300?t-48977:t);
		, H += t === 63219 ? 'ー' : String.fromCharCode(
				// ひらがな
				t >= 63223 && t <= 63305 ? t - 50870 :
				// カタカナ
				t >= 63306 && t <= 63391 ? t - 50857 :
				// text.charAt(i);
				t);
	return H;
};




// CamelCase to embedded_underscore/Snake case (underscore-based style) or even hyphenated name
var Camel_to_underscore = function(identifier, separator) {
	if (!separator)
		separator = '_';
	return identifier.replace(new RegExp('[\\' + separator + ']', 'g'),
			separator + separator).replace(/[A-Z]/g, function($0) {
		return separator + $0.toLowerCase();
	});
};
// underscore-based style to CamelCase
var underscore_to_Camel = function(identifier, separator) {
	if (!separator)
		separator = '_';
	return identifier.replace(new RegExp('\\' + separator + '([a-zA-Z])', 'g'),
			function($0, $1) {
				return $1.toUpperCase();
			}).replace(new RegExp('[\\' + separator + ']{2}', 'g'), separator);
};


/*
var Camel_test = function(identifier, separator) {
	var _1, _2;
	if (identifier.indexOf(separator) === -1) {
		_1 = Camel_to_underscore(identifier, separator);
		_2 = underscore_to_Camel(_1, separator);
		CeL.assert(identifier === _2, 'Camel [' + identifier
				+ '] → underscore [' + _1 + '] → Camel [' + _2 + ']');
	} else {
		_1 = underscore_to_Camel(identifier, separator);
		_2 = Camel_to_underscore(_1, separator);
		CeL.assert(identifier === _2, 'underscore [' + identifier
				+ '] → Camel [' + _1 + '] → underscore [' + _2 + ']');
	}
};

CeL.assert.throw_Error = 0;
Camel_test('idOfShip', '-');
Camel_test('id-of-ship', '-');
*/


/**
 * 傳回 element's data-* attributes 相對的 name。
 * 
 * @param {String}[name]
 *            dataset name.
 * 
 * @returns {String} element's data-* attributes 相對的 name。
 * 
 * @since 2012/11/9 23:15:30
 */
function to_hyphenated(name) {
	if (library_namespace.is_debug() && /-[a-z]/.test(name))
		throw new SyntaxError('The dataset name "' + name + '" contains a U+002D HYPHEN-MINUS character (-) followed by a lowercase ASCII letter.');

	//	'data-': dataset prefix.
	return 'data-' + name.replace(/[A-Z]/g, function($0) {
		return '-' + $0.toLowerCase();
	});
}

/**
 * 設定 dataset。<br />
 * 以 node.dataset 為準，node.attributes 為輔。
 * 
 * @example <code>
 * //	get value
 * CeL.DOM_data(node, name);
 * 
 * //	set value
 * CeL.DOM_data(node, name, value);
 * 
 * //	delete value
 * CeL.DOM_data(node, name, undefined);
 * </code>
 * 
 * @param {HTMLElement}node
 *            所指定之 node。
 * @param {String|Object}[name]
 *            dataset name.
 * @param [value]
 *            設成 undefined 時，將 delete 此 name。
 * 
 * @returns value of dataset[name]
 * 
 * @since 2012/11/9 23:15:30
 */
function dataset_compatible(node, name, value) {
	if (!node.dataset)
		// initialization.
		// 給予個預設值，省略判斷，簡化流程。
		node.dataset = {};

	if (!name) {
		//	get all dataset.
		return dataset_synchronize(node);
		return node.dataset;
	}

	var d = node.dataset;

	if (arguments.length > 2) {
		// need to set value.
		if (value === undefined)
			delete d[name];
		else
			d[name] = value;

		// 同步。保證全程使用此函數時，同時也會設定好 the element's data-* attributes。
		if (value === undefined)
			node.removeAttribute(to_hyphenated(name));
		else
			node.setAttribute(to_hyphenated(name), value);

	} else if (library_namespace.is_Object(name)) {
		//	此時 name = { name : value };
		//	因為並非單純的指定到 .dataset，因此不用 library_namespace.extend()。
		for ( var n in name)
			dataset_compatible(node, n, name[n]);
		return node.dataset;

	} else if ((value = node.getAttribute(to_hyphenated(name))) !== undefined) {
		// 同步。
		d[name] = value;
	}

	return d[name];
}


/**
 * 同步 / synchronize / update / prepare dataset。<br />
 * 
 * //	https://github.com/remy/polyfills/blob/master/dataset.js
 * //	https://github.com/eligrey/Xccessors
 * We won't use Element.prototype.__defineGetter__('dataset', ..):
 * IE 7 have no Object.prototype.__defineGetter__ or Object.defineProperty.
 * 
 * TODO:
 * remove attribute.
 * 
 * @param {HTMLElement}node
 *            所指定之 node。
 * @param {Boolean}[from_attributes]
 *            from the element's data-* attributes.<br />
 *            預設為 dataset ↔ attribute。設定此 flag 將會作單向設定。
 * 
 * @since 2012/11/9 23:35:30
 */
function dataset_synchronize(node, from_attributes) {
	if (!node.dataset)
		// initialization.
		// 還是給予個預設值，省略判斷，簡化流程。
		node.dataset = {};

	var d = node.dataset, name;

	if (from_attributes === undefined || from_attributes) {
		library_namespace.debug('attribute → dataset.', 2, 'dataset_synchronize');

		for_attributes(node, function(name, value) {
			//library_namespace.debug('attribute → dataset: test [' + name + '].', 2, 'dataset_synchronize');
			if (name = name.match(/^data-([^A-Z]+)$/))
				d[name[1].replace(/-([a-z])/g, function($0, $1) {
					return $1.toUpperCase();
				})] = value;
		});

		/*
		for ( var i = 0, attributes = node.attributes, length = attributes.length, attribute; i < length; i++) {
			//library_namespace.debug('attribute → dataset: test [' + i + '][' + attributes[i].name + '].', 2, 'dataset_synchronize');
			if (name = (attribute = attributes[i].name).match(/^data-([^A-Z]+)$/)) {
				d[name[1].replace(/-([a-z])/g, function($0, $1) {
					return $1.toUpperCase();
				})] = node.getAttribute(attribute);
			}
		}
		*/

	}

	if (!from_attributes) {
		library_namespace.debug('dataset → attribute.', 2, 'dataset_synchronize');
		for (name in d)
			node.setAttribute(to_hyphenated(name), d[name]);
	}

	return d;
}


//http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#dom-dataset
//http://dev.w3.org/html5/spec/single-page.html#dom-dataset
//	detect dataset support.
var support_dataset, dataset;
try {
	//	Element.prototype.__lookupGetter__("dataset")
	_.support_dataset = support_dataset = library_namespace.is_WWW(true)
		&& library_namespace.is_type(document.body.dataset, 'DOMStringMap');
} catch (e) {
}

if (support_dataset)
	dataset = function (node, name, value) {
		var d = node.dataset;
		//	test node has NO .dataset
		if (!d || !name)
			return d;

		if (arguments.length > 2)
			if (value === undefined)
				delete d[name];
			else
				d[name] = value;
				

		else if (library_namespace.is_Object(name)) {
			//	此時 name = { name : value };
			for ( var n in name)
				d[n] = name[n];
			return d;
		}

		return d[name];
	};

else {
	library_namespace.debug('Your browser do not support dataset!');
	dataset = dataset_compatible;
}

_.DOM_data = dataset;




//	↑for string encoding	-----------------------------------------------



var is_Safari = library_namespace.is_WWW(true) && navigator.userAgent;
if (is_Safari) {
	is_Safari = is_Safari.toLowerCase();
	is_Safari = is_Safari.indexOf('safari') !== -1
			&& is_Safari.indexOf('chrome') === -1
			&& is_Safari.indexOf('chromium') === -1;
}

/**
 * 動態[生成/顯示][目錄/目次]。<br>
 * automatically generated menu / list / table of contents.<br>
 * TODO:
 * fix dataset bug.
 * mouseover → popup TOC.
 * 
 * @example <code>
	CeL.set_run([ 'application.locale', 'interact.DOM' ], function() {
		CeL.gettext.use_domain('', function() {
			CeL.auto_TOC();
		});
	});
 * </code>
 * 
 * @param {String|HTMLElement}[content_node]
 *            針對指定 node 列出目錄。
 * @param {Integer}[level]
 *            to <h\d>
 * @param {Integer}[force]
 *            0:auto, 1:re-show, 2: force show.
 */
function auto_TOC(content_node, level, force) {
	if (!(content_node = get_element(content_node)))
		content_node = document.body;
	if (!force && content_node.scrollHeight < 4 * screen.height)
		return;

	var list_array = [], head_array = [], node = content_node.firstChild, match, title, i, l,
	//	Chrome 22 在遇上 /p/cgi.cgi?_=_ 時，僅指定 href : #~ 會變成 /p/#~。因此需要 workaround。
	level = new RegExp('^(h[1-' + (level > 0 && level < 7 ? +level : 6) + ']|header)$'),
	href = location.href.replace(/#.*$/, '') + '#';
	if(is_Safari)
		//	encodeURI(): Safari 5.1.7 need this. But Opera will broken on this.
		href = encodeURI(href);

	while (node) {
		// 實際上應該用<li>，但<h\d>可能不會有 nested 層疊結構。
		if ((match = node.tagName)
				&& (match = match.toLowerCase().match(level))) {
			library_namespace.debug('&lt;' + node.tagName + '&gt;\n'
					+ node.innerHTML.slice(0, 200));

			head_array.push(node);
			title = node.innerHTML.replace(/<[^>]*>/g, '');
			//	l: title 長度在規範內。
			i = title.length < auto_TOC.max_length;
			//	l: tagName
			l = match[1];
			if (!node.id && !node.name)
				//	from wiki
				node.id = encodeURIComponent(title).replace(/%/g, '.').replace(/\s/g, '');

			list_array.push({
				div : {
					a: i ? title : [title.slice(0, auto_TOC.max_length), {span: '..', C: auto_TOC.CSS_prefix + 'more'}],
					href : href + (node.id || node.name),
					// subtitle
					R : (i ? '' : title + (node.title ? '\n' : '')) + (node.title || ''),
					target : '_self'
				},
				C : auto_TOC.CSS_prefix + l + (l === 'header' ? '' : ' ' + auto_TOC.CSS_prefix + 'header')
			});

		}

		// 表層遍歷。
		// TODO: 增加對更深層的探索。
		node = node.nextSibling;
	}

	if (list_array.length > 1) {
		var TOC_list, id = set_attribute(content_node, 'id');

		title = set_attribute(content_node, 'title') || id;

		id = auto_TOC.CSS_prefix + (id || Math.random());
		TOC_list = id + '_list';

		//	回來修改 <header>
		for (i = 0, l = head_array.length; i < l; i++) {
			set_class(node = head_array[i], auto_TOC.CSS_prefix + 'head');
			new_node({
				a : null,
				href : href + id,
				C : auto_TOC.CSS_prefix + 'back',
				T : '↑Back to TOC',
				target : '_self'
			}, [ node, 1 ]);
		}

		list_array = [
				{
					div : title ? gettext('Contents of [%1]', title) : gettext('Contents'),
					C : auto_TOC.CSS_prefix + 'control',
					title : gettext('show'),
					onclick : function() {
						this.title = gettext(toggle_display(TOC_list) === 'none' ? 'show' : 'hide');
					}
				}, {
					div : list_array,
					id : TOC_list,
					C : auto_TOC.CSS_prefix + 'list'
				} ];

		if (node = get_element(id)) {
			_.remove_all_child(node);
			set_class(node, auto_TOC.CSS_prefix + 'box');
			new_node(list_array, node);
		} else {
			new_node({
				div : list_array,
				id : id,
				C : auto_TOC.CSS_prefix + 'box'
			}, [ content_node, 1 ]);
		}

		//auto_TOC.set_text(id);

		// 作 cache。
		TOC_list = get_element(TOC_list);

		//	載入 CSS resource。
		//	include resource of module.
		library_namespace.run(library_namespace.get_module_path(module_name, 'auto_TOC.css'));
	}

	head_array = list_array = null;
}

//	title 最大長度。
auto_TOC.max_length = 80;
//	CSS class name 前綴。
auto_TOC.CSS_prefix = 'TOC_';

//	TODO: set domain
auto_TOC.set_text = function(id) {
	//	目錄
	gettext.translate_nodes(get_element(id).childNodes);
	//	↑回到目錄
	gettext.translate_nodes('.' + auto_TOC.CSS_prefix + 'back');
};

_// JSDT:_module_
.
auto_TOC = auto_TOC;



// ---------------------------------------------------------------------//


function random_color(from, gap) {
	function scale(from, gap) {
		return from + (Math.random() * gap) | 0;
	}
	from |= 0;
	if (from < 0 || from > 255)
		from = 0;
	if (!gap)
		gap = 256 - from;
	var color = [], i = 3;
	while (i--)
		color.push(scale(from, gap));
	return 'rgb(' + color + ');';
}

function parse_frame(document_node) {
	function parse_frameset(frameset) {
		var nodes = frameset.childNodes, i = 0, length = nodes.length, tag, list = [], cols = frameset.cols
				.trim(), cell, node, background = random_color(210),
		//
		get_info = function() {
			var name = node.name + '(' + layout.shift() + ')';
			return node.src ? {
				b : name,
				title : node.src
			} : name;
		},
		// IE 先看 cols，之後才看 rows。
		layout = (cols || frameset.rows.trim()).split(/\s*,\s*/);
		// cols = !!cols;

		for (; i < length; i++)
			if ((tag = (node = nodes[i]).tagName)
					&& (cell =
					//
					(tag = tag.toLowerCase()) === 'frame' ? {
						a : get_info(),
						href : '#',
						onclick : function() {
							//	application.debug.show_value first
							if(library_namespace.show_value)
								// Error null: 462 [Error] (facility code 10): 遠端伺服器不存在或無法使用
								try{library_namespace.show_value(this, this.id || this.name);}catch(e){library_namespace.err(e);}
							else {
								library_namespace.warn('Need to include application.debug first! Trying now...');
								library_namespace.run('application.debug');
							}
							return false;
						}.bind(node)
					}
					//
					: tag === 'frameset' && [
							{
								div : get_info(),
								S : 'width:100%;color:#e73;background-color:'
										+ background + ';'
							}, parse_frameset(node) ])) {
				cell = {
					td : cell,
					S : 'background-color:' + background + ';'
				};
				list.push(cols ? cell : {
					tr : cell
				});
			}

		return {
			table : {
				tbody : cols ? {
					tr : list
				} : list
			},
			S : 'width:100%;border-collapse:collapse;'
		};
	}

	try {
		// IE 只會取第一個 <frameset>。
		var frameset = document_node.getElementsByTagName('frameset')[0];
		if (frameset)
			library_namespace.log(parse_frameset(frameset));
		else if(library_namespace.is_debug())
			library_namespace.warn('No frameset detected.');
	} catch (e) {
		library_namespace.err(e);
	}
}

_.parse_frame = parse_frame;

return (
	_// JSDT:_module_
);
}


});

