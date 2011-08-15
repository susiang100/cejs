
/**
 * @name	CeL function for drag and drop
 * @fileoverview
 * 本檔案包含了 web drag and drop 的 functions。
 * @since	
 */

/*
http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html
https://developer.mozilla.org/en/Using_files_from_web_applications
http://html5demos.com/drag
http://d.hatena.ne.jp/ksy_dev/20100731/p1?sid=810f738005e991c6

*/

if (typeof CeL === 'function'){

/**
 * 本 module 之 name(id)，<span style="text-decoration:line-through;">不設定時會從呼叫時之 path 取得</span>。
 * @type	String
 * @constant
 * @inner
 * @ignore
 */
var module_name = 'net.drag_and_drop';

//===================================================
/**
 * 若欲 include 整個 module 時，需囊括之 code。
 * @type	Function
 * @param	{Function} library_namespace	namespace of library
 * @param	load_arguments	呼叫時之 argument(s)
 * @return
 * @_name	_module_
 * @constant
 * @inner
 * @ignore
 */
var code_for_including = function(library_namespace, load_arguments) {

//	requires
if (eval(library_namespace.use_function(
		'code.compatibility.is_DOM')))
	return;


/**
 * null module constructor
 * @class	web drag_and_drop 的 functions
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
TODO:

*/






return (
	_// JSDT:_module_
);
};

//===================================================

CeL.setup_module(module_name, code_for_including);

};
