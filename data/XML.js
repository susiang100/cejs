
/**
 * @name	CeL file function for XML
 * @fileoverview
 * 本檔案包含了處理 XML file 的 functions。
 * @since	
 */



if (typeof CeL === 'function')
CeL.setup_module('data.XML',
function(library_namespace, load_arguments) {

//	nothing required


/**
 * null module constructor
 * @class	XML 操作相關之 function。
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





/*	parse XML document
	http://www.adp-gmbh.ch/web/js/msxmldom/methods_properties.html
	http://www.w3pop.com/learn/view/doc/transform_XML/
	http://www.vacant-eyes.jp/Tips/txml/030.aspx
	http://www.klstudio.com/post/94.html
	http://xmljs.sourceforge.net/
	ajaxslt	http://code.google.com/p/ajaxslt/

flag:	dcba in binary
	isFP:
	a==0	view as text
	a==1	view as filename	If you want to parse a local file, You can use XSLT as well.
	rX:
	b==0	return dom.documentElement object
	b==1	return dom object
	fast:
	c==0	normal speed
	c==1	faster: ignore check

to use:
	filtered_node=return_nodes.selectSingleNode("/tag1/tag2[tag3='1041']")
	nodes.selectSingleNode("~").Text;
	nodes.item(0).text;
	node.getAttribute("~");
	node.attributes(0).firstChild.nodeValue.valueOf()
	node.attributes.item(0).firstChild.nodeValue.valueOf()
	node.attributes.getNamedItem("~").nodeValue.valueOf()
	..

getXML():
loadXML(getU('全省空白價目表.xml')).getElementsByTagName("Worksheet").length


TODO:
可參考 JKL.ParseXML, http://doctype.googlecode.com/svn/trunk/goog/dom/xml.js
postXML()和parseXML(text/HTML object/array)方法
MSXML2.XSLTemplate

libXmlRequest Library
r=document.implementation.createDocument("",XMLtext,null);
r.appendChild(r.createElement(XMLtext));


string = (new XMLSerializer()).serializeToString(xmlobject);

*/
function loadXML(XMLtext,flag){
 var dom//,xmlDoc
	,isFP=flag%2,rX,fast;

 if(window.DOMParser){
  dom=(new DOMParser).parseFromString(XMLtext,'text/xml');//'application/xml'
  if(!dom.documentElement||dom.documentElement.tagName=='parsererror')
   throw new Error(1,dom.documentElement.firstChild.data+'\n'+dom.documentElement.firstChild.nextSibling.firstChild.data);
  return dom;
 }

 if(typeof ActiveXObject==='undefined'){
  dom=document.createElement('div');
  dom.innerHTML=XMLtext;
  return dom;
 }

 try{	//	ActiveXObject is supported
  // フリースレッド DOM ドキュメントを使用すれば、ファイルを共有アプリケーション状態に取り込むことができます。
  // フリースレッド モデルの欠点の 1 つは、未使用のメモリのクリーンアップにおける待ち時間が増大し、それ以降の操作のパフォーマンスに影響を及ぼすということです (実際にはクリーンアップが遅れているだけなのに、これをメモリ リークとして報告してくる人もいます)。
  //	http://www.microsoft.com/japan/msdn/columns/xml/xml02212000.aspx
  dom=new ActiveXObject("Microsoft.FreeThreadedXMLDOM");
 }catch(e){
  dom=new ActiveXObject("Microsoft.XMLDOM");//CreateObject("Microsoft.XMLDOM");	MSXML3.DOMDocument,MSXML2.DOMDocument,MSXML.DOMDocument,	Msxml2.DOMDocument.6.0,Msxml2.DOMDocument.5.0,Msxml2.DOMDocument.4.0,MSXML4.DOMDocument,Msxml2.DOMDocument.3.0
 }

 if(!dom)throw new Error(1,'No parser!');

 flag>>=1;rX=flag%2;flag>>=1;fast=flag%2;

 // faster: 既定の 「レンタル」 スレッディング モデルを使用する方法です (このスレッディング モデルでは、DOM ドキュメントは一度に 1 つのスレッドからしか使用できません)。
 //	http://www.microsoft.com/japan/msdn/columns/xml/xml02212000.aspx
 if(fast)with(dom)validateOnParse=resolveExternals=preserveWhiteSpace=false;

 if(isFP){
  dom.async=false;//'false'
  //dom.validateOnParse=true;	//	DTD Validation
  dom.load(XMLtext);
 }else dom.loadXML(XMLtext);
 //if(Number(dom.parseError))throw dom.parseError;	//	or return null
 return rX?dom:dom.documentElement;	//	with(dom.parseError)errorCode,reason,line
}

/*	untested
TODO:
(new XSLTProcessor()).importStylesheet(XMLF);	libXmlRequest Library
*/
//applyXSLT[generateCode.dLK]='loadXML';
function applyXSLT(XMLF, XSLTF) {
	return loadXML(XSLTF, 1 + 2).transformNode(loadXML(XSLTF, 1 + 2));
};



//	↑XMLHttp set	==================







return (
	_// JSDT:_module_
);
}


);

