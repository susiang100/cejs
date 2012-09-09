

/**
 * @name	CeL file function
 * @fileoverview
 * 本檔案包含了 file functions。
 * @since
 * @see
 * <a href="http://dev.w3.org/2006/webapi/FileAPI/" accessdate="2010/6/20 14:49">File API</a>	
 */


if (typeof CeL === 'function')
CeL.setup_module('application.storage.file',
{
require : '',
code : function(library_namespace, load_arguments) {

//	requiring
//var ;
eval(library_namespace.use_function(this));




/**
 * null module constructor
 * @class	檔案操作相關之 function。
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




//	path處理	-------------------------------------------------------

_// JSDT:_module_
.
/**
 * 減縮 path. 尚未處理：: * ?
 * 
 * @example <code>
 * reduce_path('http://hostname/../aaa/bbb/../ccc/../ddd',1);
 * </code>
 * 
 * @param {String}
 *            path
 * @param {Number}
 *            mode =1: 去除檔名，只餘目錄。如輸入 http://hostname/aaa/bbb/ccc，得到
 *            http://hostname/aaa/bbb/
 * @returns
 */
reduce_path = function(path, mode) {
	library_namespace.debug('[' + typeof path + '] [' + path + ']', 2, 'reduce_path');
	if (!(path = '' + path))
		return;

	var t;
	if (t = path.match(/^"([^"]*)/))
		path = t[1];
	if (t = path.match(/(.*)\|<>/))
		path = t[1];

	// Windows environment variables 在真實 path 前,尚未測試！
	if (typeof WinEnvironment == 'object' && (t = path.match(/%(.+)%/g)))
		for (i in t)
			if (WinEnvironment[i])
				path.replace(new RegExp(i, "ig"), WinEnvironment[i]);

	var path_separator = library_namespace.env.path_separator,
	path_separator_RegExp = library_namespace.env.path_separator_RegExp;

	path = path.replace(new RegExp(path_separator == '/' ? '\\\\' : '/', "g"),
			path_separator);

	if (mode && (t = path.lastIndexOf(path_separator)) != -1
			&& t + 1 != path.length)
		// 去除檔名：假如輸入sss/ddd，會把ddd除去！需輸入sss/ddd/以標示ddd為目錄.
		path = path.slice(0, t + 1);

	// \\→\，未考慮到'\\pictures\scenic\canyon.bmp'的情況
	if (false)
		path = path.replace(new RegExp(path_separator + path_separator, 'g'),
				path_separator);

	path = path
		// .\→''
		.replace(new RegExp('^(\\.' + path_separator_RegExp + ')+'), '')
		// \.\→\
		.replace(new RegExp(path_separator_RegExp + '(\\.' + path_separator_RegExp + ')+', 'g'), path_separator)
		// xx\..\→''
		.replace(new RegExp('[^.' + path_separator_RegExp + ']+'
				+ path_separator_RegExp + '\\.\\.' + path_separator_RegExp, 'g'), '');
	library_namespace.debug('→ [' + path + ']', 2, 'reduce_path');
	return path;
};



//	去除hostname等，如輸入http://hostname/aaa/bbb/ccc得到aaa/bbb/ccc/
//	假如輸入的格式不正確，可能得出不預期的回應值！
/*	對library_namespace.env.path_separator.length>1的情形（嚴謹）
function getPathOnly(p){
 //discard hash & search
 var i=p.lastIndexOf('?'),j=p.lastIndexOf('#'),dirSpL=library_namespace.env.path_separator.length;
 if(i==-1)i=j;else if(j!=-1&&i>j)i=j;if(i!=-1)p=p.slice(0,i);
 //	去除http://hostname/等
 if(p.slice(0,5)=='file:///')p=p.substr('file:///'.length);	//	對file:///特別處理！
 else if((i=p.indexOf(':'+library_namespace.env.path_separator+library_namespace.env.path_separator))!=-1&&(i=p.indexOf(library_namespace.env.path_separator,i+(':'+library_namespace.env.path_separator+library_namespace.env.path_separator).length))!=-1))p=p.substr(i+dirSpL);	//	http://hostname/path→path
 else if(p.slice(0,dirSpL)==library_namespace.env.path_separator)
 //	/usr/local/→usr/local/
 if(p.substr(dirSpL,dirSpL)!=library_namespace.env.path_separator)p=p.substr(dirSpL);
 //	去除\\hostname\
 else if((i=p.indexOf(library_namespace.env.path_separator,dirSpL+dirSpL))>dirSpL+dirSpL)p=p.substr(i+dirSpL);
 //	\\\zzzz的情形：不合法的路徑
 else if(i!=-1)throw new Error(1,'illegal path:'+p);
 return p;
}
*/
//	對library_namespace.env.path_separator.length==1的情形簡化
//getPathOnly[generateCode.dLK]='library_namespace.env.path_separator';//,isFile
function getPathOnly(p){
 //discard hash & search
 var i=p.lastIndexOf('?'),j=p.lastIndexOf('#');
 if(i==-1)i=j;else if(j!=-1&&i>j)i=j;if(i!=-1)p=p.slice(0,i);
 //	去除http://hostname/等
 if(p.slice(0,8)=='file:///')p=p.substr(8);	//	對file:///（應該是file:）特別處理！
 else if((i=p.indexOf(':'+library_namespace.env.path_separator+library_namespace.env.path_separator))!=-1&&(i=p.indexOf(library_namespace.env.path_separator,i+3)!=-1))p=p.substr(i+1);	//	http://hostname/path→path
 else if(p.charAt(0)==library_namespace.env.path_separator)
  //	/usr/local/→usr/local/
  if(p.charAt(1)!=library_namespace.env.path_separator)p=p.substr(1);
  //	去除\\hostname\	不去除：.replace(/[^\\]+$/,'')
  else if((i=p.indexOf(library_namespace.env.path_separator,2))>2)p=p.substr(i+1);
  //	\\\zzzz的情形：不合法的路徑
  else if(i!=-1)throw new Error(1,'illegal path:'+p);
 if(typeof isFile=='function'&&isFile(p))	//	!isWeb()&&~
  p=p.replace(new RegExp(library_namespace.env.path_separator_RegExp+'[^'+library_namespace.env.path_separator_RegExp+']+$'),library_namespace.env.path_separator);
 return p;
}



var path_separator_candidates = [ '/', '\\' ],
path_separator_candidates_length = path_separator_candidates.length,
//path_separator_candidates_Regex=new RegExp(path_separator_candidates.join(''), 'g'),
path_separator_RegExp;

_// JSDT:_module_
.
guess_path_separator = function(path) {
	if (typeof path !== 'string' || !path)
		return;

	var count = 0, candidate, i, m;

	if (!path_separator_RegExp)
		//	初始設定
		for (path_separator_RegExp = [], i = 0; i < path_separator_candidates_length; i++)
			path_separator_RegExp[i] = new RegExp('\\' + path_separator_candidates[i], 'g');

	//	偵測最符合的
	for (i = 0; i < path_separator_candidates_length; i++) {
		m = path.match(path_separator_RegExp[i]);
		if (m && m.length > count)
			count = m.length, candidate = path_separator_candidates[i];
	}

	return candidate;
};


_// JSDT:_module_
.
/**
 * 取得 base_path 相對於 working_path 的路徑。
 * <p>
 * 當前處於 working_path，欲取得 base_path 下所指到的 resource_file_path，可使用: <code>
 * get_relative_path(base_path, working_path) + resource_file_path
 * </code>
 * </p>
 * TODO: 找出最大連續相同路徑。
 * 
 * @example
 * <code>
 * CeL.set_run('application.storage.file',function(){CeL.set_debug(2);CeL.log(CeL.get_relative_path('a/b/same/d/file','same/e/'));});
 * </code>
 * 
 * <code>
 * CeL.set_debug(2);CeL.get_relative_path('a/b/same/d/f/file','e/r/t/same/e/',1);
 * </code>
 * 
 * <code>
 * base_path = CeL.get_relative_path('kanashimi/www/cgi-bin/game/');
 * </code>
 * 
 * <code>
 * //	想要保持 Protocol，但卻是不同機器時。	<a href="http://nedbatchelder.com/blog/200710.html#e20071017T215538" accessdate="2011/8/28 0:18" title="Ned Batchelder: October 2007">Http-https transitions and relative URLs</a>
 * CeL.get_relative_path('cgi-bin/game/photo/','//lyrics.meicho.com.tw/game/game.pl?seg=diary21',1);
 * </code>
 * 
 * @param {String}
 *            base_path 給定 base path 的範本結構, base_path_structure.
 * @param {String}
 *            working_path 當前處於 working_path.
 * @param {Boolean}
 *            get_full_path 藉由 working_path 推測 base path 的 full path.
 *            否則回傳相對路徑(relative path)，會增加 ../ 等。
 * @returns {String} 推測的 base path 相對於 working_path 的 path.
 * 
 * @since 2003/10/1 15:57
 * @since 2011/8/28 00:16:40
 * @requres reduce_path,getPathOnly,library_namespace.env.path_separator,library_namespace.env.path_separator_RegExp
 * @_memberOf _module_
 */
get_relative_path = function(base_path, working_path, get_full_path) {

	library_namespace.debug('phase 1: 簡化並審查 path<br />base_path [' + base_path
			+ ']<br />working_path [' + working_path + ']', 2, 'get_relative_path');

	if (!working_path)
		working_path = library_namespace.get_script_base_path();
	else// if (_.reduce_path)
		working_path = _.reduce_path(working_path);

	if (!working_path)
		return;

	if (!base_path)
		base_path = (library_namespace.is_WWW() ? location.href
				: typeof WshShell === 'object' ? WshShell.CurrentDirectory
				: typeof WScript === 'object' ? WScript.ScriptFullName
				//	TODO: path_separator_candidates
				: '').replace(/[^\/\\]+$/, '');
	else// if (_.reduce_path)
		base_path = _.reduce_path(base_path);

	if (!base_path
			// base_path 需要是絕對路徑
			// || !is_absolute_path(base_path)
	)
		return working_path;

	library_namespace.debug(
			'phase 2: 將 path 分解成 Array，從尾至頭比對，以 base_path 為基準，找尋 working_path 是否有相同的目錄名。<br />base_path ['
			+ base_path
			+ ']<br />working_path ['
			+ working_path
			+ ']', 2, 'get_relative_path');

	var path_separator =
		//library_namespace.env.path_separator
		//	在 IE 或 HTA 中，path_separator === '\\' 但輸入的 path 為 '/'；甚至於 working_path, base_path 兩者可能不同。
		_.guess_path_separator(working_path);

	working_path = working_path.split(path_separator);
	if (!working_path[working_path.length - 1])
		//	防止輸入 a/b/c/ 而非 a/b/c 的情況。
		working_path.pop();
	base_path = base_path.split(_.guess_path_separator(base_path));
	//alert(working_path + '\n' + base_path);

	var file_name = base_path.pop();

	var index_base_path = base_path.length, index_working_path, working_path_length = working_path.length, directory, not_found = true;
	for (; index_base_path && not_found;)
		// 取得第 index_base_path 識別用目錄名
		if (directory = base_path[--index_base_path]) {
			for (index_working_path = working_path_length; index_working_path;)
				if (directory === working_path[--index_working_path]) {
					not_found = false;
					// 第一個找到就 break 了。
					// TODO: 找出最大連續相同路徑。
					break;
				}
		}

	library_namespace.debug('phase 3: ' + (not_found ? +'找不到' : '找到 index: base_path[' + index_base_path
					+ '], working_path[' + index_working_path + ']'), 2, 'get_relative_path');
	if (not_found)
		library_namespace.debug("Can't find base directory of this file!\n"
				+ working_path + '\n\nTreat base directory as:\n' + base_path, 2, 'get_relative_path'),
		directory = get_full_path ? working_path.concat(base_path) : base_path;
	else {
		if (get_full_path)
			directory = working_path.slice(0, index_working_path + 1);
		else {
			directory = [];
			for ( var i = index_working_path + 1; i < working_path_length; i++)
				directory.push('..');
		}
		directory = directory.concat(base_path.slice(index_base_path + 1));
	}

	directory.push(file_name);
	return directory.join(path_separator);
};




_// JSDT:_module_
.
/**
 * cf: getFN(), parse_URL
 * @param {String} path	path name
 * @return
 * @_memberOf	_module_
 */
parse_path = function(path) {
	if (typeof path !== 'string' || !path)
		return;

	var path_data = {
		input_data : path
	}, m;

	if (m = path.match(/^(([A-Za-z]):\\)?(([^\\]+\\)*)([^\\]*)?$/)) {
		path_data.is_absolute = !!(path_data.drive = m[2]);
		path_data.path_name = m[3];
		path_data.file_name = m[5];
		library_namespace.debug('type: Windows/MS-DOS file path', 2);
	} else if (m = path.match(/^file:\/\/\/([A-Za-z]):\/(([^\/]+\/)*)([^\/]*)?$/)) {
		path_data.is_absolute = true;
		path_data.drive = m[1];
		path_data.path_name = m[2];
		path_data.file_name = m[4];
		library_namespace.debug('type: URL of Windows/MS-DOS local file path', 2);
	} else if (m = path.match(/^((\/)?([^\/]+\/)*)([^\/]*)?$/)) {
		path_data.is_absolute = !!m[2];
		path_data.path_name = m[1];
		path_data.file_name = m[4];
		library_namespace.debug('type: UNIX file path', 2);
	} else {
		library_namespace.debug('Failure to parse [' + path + ']');
	}

	//	正規化
	path_data.path_name = path_data.path_name.replace(/[\/\\]/g, library_namespace.env.path_separator);

	m = path_data.file_name.match(/^(.*?)(\.([^.]*))?$/);
	path_data.name = m[1];
	path_data.extension = m[3];

	path_data.path = path_data.path_name + path_data.file_name;
	path_data.location = path_data.drive + ':\\' + path_data.path;
	path_data.directory = path_data.drive + ':\\' + path_data.path_name;

	return path_data;
};


_// JSDT:_module_
.
/**
 * is absolute or relative path, not very good solution
 * @param {String} path
 * @return
 * @requires	library_namespace.env.path_separator,library_namespace.env.path_separator_RegExp
 * @_memberOf	_module_
 */
is_absolute_path=function (path) {
	//alert(typeof path + '\n' + path);
	return path
		&& (library_namespace.env.path_separator === '/' && path.charAt(0) === library_namespace.env.path_separator || new RegExp(
		'^(\\\\|[A-Za-z]+:)' + library_namespace.env.path_separator_RegExp).test(path))
		// ?true:false
		;
};


//	轉成path（加'\'）
function turnToPath(p){return p?p+(p.slice(-1)=='\\'?'':'\\'):'';}
//	僅取得path部分(包括 library_namespace.env.path_separator)，不包括檔名。
//getFilePath[generateCode.dLK]='library_namespace.env.path_separator';
function getFilePath(p){
 var i=p.lastIndexOf(library_namespace.env.path_separator);
 if(i==-1)p+=library_namespace.env.path_separator;	//	相對路徑?
 else if(i<p.length-1)p=p.slice(0,i+1);	//	取得path部分
 return p;
}
/*	傳回包括檔名之絕對/相對路徑，假如是資料夾，也會回傳資料夾路徑。可包含'.','..'等	the return value include ? #
	在Win/DOS下輸入'\'..會加上base driver
	若只要相對路徑，可用reduce_path()。取得如'..\out'的絕對路徑可用getFP('../out',1)
*/
//getFP[generateCode.dLK]='reduce_path,is_absolute_path,getPathOnly,get_relative_path';
function getFP(p,m,bp){	//	path,mode=0:傳回auto(維持原狀),1:傳回絕對路徑,2:傳回相對路徑,base path
 //old:	return (p.lastIndexOf('\\')==-1&&p.lastIndexOf('/')==-1?getFolder(getScriptFullName()):'')+p;//getF
 if(!p)return'';
 if(p.charAt(0)=='\\'&&get_relative_path(bp).match(/^(\\\\|[A-Za-z]+:)/))p=RegExp.$1+p;
 p=_.reduce_path(p);
 if(m==1){
  if(!is_absolute_path(p))p=_.reduce_path((bp?getPathOnly(bp):get_relative_path())+p);	//	當為相對路徑時前置base path
 }else if(m==2&&is_absolute_path(p))p=get_relative_path(bp,p,1);
 return p;
}
//	傳回檔名部分，the return value include ? #
//getFN[generateCode.dLK]='getFP,library_namespace.env.path_separator';
function getFN(p,bp,m){	//	path,base path,mode=0:檔名,1:(當輸入為不可信賴的字串時)去除檔名中不允許的字元，割掉? #等
 p=getFP(p,0,bp);
 p=p.slice(p.lastIndexOf(library_namespace.env.path_separator)+1);	//	不能用.substr(p.lastIndexOf(library_namespace.env.path_separator))+library_namespace.env.path_separator,因為p.lastIndexOf(library_namespace.env.path_separator)可能==-1	//	比起(m=p.lastIndexOf(library_namespace.env.path_separator))==-1?p:p.substr(m+1);此法比較直接，不過感覺多一道手續…
 if(m){
  if(p.match(/[#?]/))p=p.substr(0,RegExp.lastIndex-1);
  p=p.replace(/[\\\/:*?"<>|]/g,'_');//[ \.]	//	去除檔名中不允許的字元
 }
 return p;
}
//	傳回檔案/資料夾物件	FileSystemObjectのバグ(制限)で、環境によっては2G以上の領域を認識できません。WSH5.6ではこのバグが修正されています。
//getF[generateCode.dLK]='isFile,parse_shortcut,getFP,library_namespace.env.path_separator,getFolder,initialization_WScript_Objects';
function getF(p,m,bp){	//	path,mode=0:auto(維持原狀),1:絕對路徑,2:相對路徑,base path
 try{return isFile(p=parse_shortcut(getFP(p,m,bp),1))?fso.GetFile(p):fso.GetFolder(p);}
 catch(e){return p.indexOf(library_namespace.env.path_separator)==-1?getF(getFolder(WScript.ScriptFullName)+p,m,bp):null;}
}
//alert(getFP('\program files\\xxx\\xxx.exe',2));



_// JSDT:_module_
.
/**
 * 取得 file 之 file name extension(副檔名).
 * 
 * @example <code>
 * // get 'htm'.
 * get_file_extension('test.htm');
 * </code>
 * @param {String}filename	檔案名稱
 * @returns {String} file name extension(副檔名)
 */
get_file_extension = function(filename) {
	var m = ('' + filename).match(/\.([^.]*)$/);
	return m ? m[1] : '';
};

_// JSDT:_module_
.
/**
 * 設定/更改 file 之 extension(副檔名).
 * 
 * @example <code>
 * // get 'test.html'.
 * set_file_extension('test.htm','html');
 * </code>
 * @param {String}filename	檔案名稱
 * @param {String}change_to
 *            更改成 change_to
 * @returns {String} 更改 extension 後之 filename.
 */
set_file_extension = function(filename, change_to) {
	if (change_to)
		filename = ('' + filename).replace(/\.[^.]*$/, '') + '.' + change_to;
	return filename;
};






return (
	_// JSDT:_module_
);
}


});

