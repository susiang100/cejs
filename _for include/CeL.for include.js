
//	null constructor for [CeL]
CeL=function(){};
CeL.prototype={};

	/**
	 * framework main prototype definition
	 * for JSDT: �� prototype �~�|�N�����@ Class
	 */
CeL.prototype={};
/**
 * JavaScript library framework main class name.
 * @see	<a href="http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf">ECMA-262</a>: Object.Class: A string value indicating the kind of this object.
 * @constant
 */
//CeL.Class;//library_name;
/**
 * �� library �M�Τ� evaluate()�C
 * 
 * �Y�b function �� eval �H��o local variable�A�b�� browser �����[ var�C
 * e.g., 'var local_variable=' + ..
 * ���[ var �b�� browser ���|�ܦ� global �ܼơC
 * @param code	script code to evaluate
 * @returns	value that evaluate process returned
 * @see	window.eval === window.parent.eval
 * http://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
 */
CeL.eval_code=function eval_code(code){
	///	<summary>
	///	�� library �M�Τ� evaluate()�C
	///	*
	///	�Y�b function �� eval �H��o local variable�A�b�� browser �����[ var�C
	///	e.g., 'var local_variable=' + ..
	///	���[ var �b�� browser ���|�ܦ� global �ܼơC
	///	</summary>
	///	<param name="code" type="" optional="false">script code to evaluate</param>
	///	<returns>value that evaluate process returned</returns>
	///	<see>
	///	window.eval === window.parent.eval
	///	http://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
	///	</see>

};
/**
 * evaluate @ Global scope.
 * By the ECMA-262, new Function() will 'Pass in the Global Environment as the Scope parameter.'
 * copy from jQuery core.js
 * @param code	script code to evaluate
 * @returns	value that evaluate process returned
 * @see
 * <a href="http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context" accessdate="2011/8/6 8:56">Eval JavaScript in a global context | Java.net</a>
 * use execScript on Internet Explorer
 */
CeL.global_eval=new Function();
/**
 * simple evaluates to get value of specified variable identifier name.
 * ���ϥ� eval().
 * @param {String} variable_name	variable identifier name. e.g., /[a-z\d$_]+(.[a-z\d_]+)+/i
 * @param {Object|Function} [name_space]	initialize name-space. default: global
 * @returns	value of specified variable identifier name
 * @since	2010/1/1 18:11:40
 * @note
 * 'namespace' �O JScript.NET ���O�d�r
 * 
 * �b��Ӥl�h(a.b.c)�U�A�o�˧@�Ĳv���t @User agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.29 Safari/533.4:
 * function(v){try{return(new Function('return('+v+')'))();}catch(e){}}
 */
CeL.get_variable=function(variable_name, name_space){
	///	<summary>
	///	simple evaluates to get value of specified variable identifier name.
	///	���ϥ� eval().
	///	</summary>
	///	<param name="variable_name" type="String" optional="false">variable identifier name. e.g., /[a-z\d$_]+(.[a-z\d_]+)+/i</param>
	///	<param name="name_space" type="Object|Function" optional="true">initialize name-space. default: global</param>
	///	<returns>value of specified variable identifier name</returns>
	///	<since>2010/1/1 18:11:40</since>
	///	<note>
	///	'namespace' �O JScript.NET ���O�d�r
	///	*
	///	�b��Ӥl�h(a.b.c)�U�A�o�˧@�Ĳv���t @User agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.29 Safari/533.4:
	///	function(v){try{return(new Function('return('+v+')'))();}catch(e){}}
	///	</note>

};
/**
 * ���o���� script �� path, �b .hta �����N WScript.ScriptFullName�C
 * @returns	{String}	���� script �� path
 * @returns	''	unknown environment
 */
CeL.get_script_full_name=function(){
	///	<summary>���o���� script �� path, �b .hta �����N WScript.ScriptFullName�C</summary>
	///	<returns type="String">���� script �� path</returns>
	///	<returns>''	unknown environment</returns>

};
/**
 * ���o���� script ���W��
 * @returns	{String} ���� script �� �W��
 * @returns	''	unknown environment
 */
CeL.get_script_name=function(){
	///	<summary>���o���� script ���W��</summary>
	///	<returns type="String">���� script �� �W��</returns>
	///	<returns>''	unknown environment</returns>

};
/**
 * �P�_����� type�C�D�n�Φb Error, DOMException �� native object ���P�O�C
 * @param	value	variable or class instance to test
 * @param	{String} [want_type]	type to compare: number, string, boolean, undefined, object, function
 * @param	{Boolean} [get_Class]	get the class name of a class(function) instance.
 * @returns	{Boolean}	The type is matched.
 * @returns	{String}	The type of value
 * @returns	{undefined}	error occurred
 * @example
 * CeL.is_type(value_to_test, 'Array');
 * @since	2009/12/14 19:50:14
 * @see
 * <a href="http://lifesinger.org/blog/2009/02/javascript-type-check-2/" accessdate="2009/12/6 19:10">JavaScript\u31867��\u26816\u27979�p\u32467�]�U�^ - \u23681��p�q</a><br/>
 * <a href="http://thinkweb2.com/projects/prototype/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/" accessdate="2009/12/6 19:10">Perfection kills &raquo; `instanceof` considered harmful (or how to write a robust `isArray`)</a>
 */
CeL.is_type=function(value, want_type, get_Class){
	///	<summary>�P�_����� type�C�D�n�Φb Error, DOMException �� native object ���P�O�C</summary>
	///	<param name="value" type="" optional="false">variable or class instance to test</param>
	///	<param name="want_type" type="String" optional="true">type to compare: number, string, boolean, undefined, object, function</param>
	///	<param name="get_Class" type="Boolean" optional="true">get the class name of a class(function) instance.</param>
	///	<returns type="Boolean">The type is matched.</returns>
	///	<returns type="String">The type of value</returns>
	///	<returns type="undefined">error occurred</returns>
	///	<example>CeL.is_type(value_to_test, 'Array');</example>
	///	<since>2009/12/14 19:50:14</since>
	///	<see>
	///	<a href="http://lifesinger.org/blog/2009/02/javascript-type-check-2/" accessdate="2009/12/6 19:10">JavaScript\u31867��\u26816\u27979�p\u32467�]�U�^ - \u23681��p�q</a><br/>
	///	<a href="http://thinkweb2.com/projects/prototype/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/" accessdate="2009/12/6 19:10">Perfection kills &raquo; `instanceof` considered harmful (or how to write a robust `isArray`)</a>
	///	</see>

};
/**
 * get a type test function
 * @param	{String} want_type	object type to compare
 * @param	{String} [toString_reference]	a reference name to Object.prototype.toString
 * @returns	{Function}	type test function
 * @since	2009/12/20 08:38:26
 * @example
 * // �j�q���ҮɡA���˥t�~�b���� scope ���y�X���|�G
 * this.OtS = Object.prototype.toString;
 * var is_Array = CeL.object_tester('Array', 'OtS');
 * // test
 * if(is_Array(value))
 * 	//	it's really a native Array
 * 	;
 */
CeL.object_tester=function(want_type, toString_reference){
	///	<summary>get a type test function</summary>
	///	<param name="want_type" type="String" optional="false">object type to compare</param>
	///	<param name="toString_reference" type="String" optional="true">a reference name to Object.prototype.toString</param>
	///	<returns type="Function">type test function</returns>
	///	<since>2009/12/20 08:38:26</since>
	///	<example>
	///	// �j�q���ҮɡA���˥t�~�b���� scope ���y�X���|�G
	///	this.OtS = Object.prototype.toString;
	///	var is_Array = CeL.object_tester('Array', 'OtS');
	///	// test
	///	if(is_Array(value))
	///	//	it's really a native Array
	///	* 	;
	///	</example>

};
/**
 * Test if the value is a native Array.
 * @param	v	value to test
 * @returns	{Boolean}	the value is a native Array.
 * @since	2009/12/20 08:38:26
 */
CeL.is_Array=function(v){
	///	<summary>Test if the value is a native Array.</summary>
	///	<param name="v" type="" optional="false">value to test</param>
	///	<returns type="Boolean">the value is a native Array.</returns>
	///	<since>2009/12/20 08:38:26</since>

};
/**
 * Test if the value is a native Object.
 * TODO:
 * test null
 * @param	v	value to test
 * @returns	{Boolean}	the value is a native Object.
 * @since	2009/12/20 08:38:26
 */
//CeL.is_Object;//get_object_type.call(undefined) === '[object Object]'?
/**
 * Test if the value is a native Function.
 * @param	v	value to test
 * @returns	{Boolean}	the value is a native Function.
 * @since	2009/12/20 08:38:26
 */
CeL.is_Function=function(v){
	///	<summary>Test if the value is a native Function.</summary>
	///	<param name="v" type="" optional="false">value to test</param>
	///	<returns type="Boolean">the value is a native Function.</returns>
	///	<since>2009/12/20 08:38:26</since>

};
/**
 * ���o/�]�w�����ܼ� enumeration<br/>
 * �]���M�����w�t�} name-space�A���H 2009 ���U�� JsDoc Toolkit �ӻ��A���G�S��k�гy enumeration�C�^
 * @class	�����ܼ� (environment variables) �P�{���|�Ψ쪺 library �����ܼ� / configuration�C
 * @param {String} name	�����ܼƦW��
 * @param value	�����ܼƤ���
 * @returns	�������ܼƤ���
 * @memberOf	CeL
 */
CeL.env=function env(name, value){
	///	<summary>
	///	���o/�]�w�����ܼ� enumeration<br/>
	///	�]���M�����w�t�} name-space�A���H 2009 ���U�� JsDoc Toolkit �ӻ��A���G�S��k�гy enumeration�C�^
	///	</summary>
	///	<class>�����ܼ� (environment variables) �P�{���|�Ψ쪺 library �����ܼ� / configuration�C</class>
	///	<param name="name" type="String" optional="false">�����ܼƦW��</param>
	///	<param name="value" type="" optional="false">�����ܼƤ���</param>
	///	<returns>�������ܼƤ���</returns>
	///	<memberOf>CeL</memberOf>

};
	/**
	 * default extension of script file.
	 * �]�w�� '.' �ɥ� CeL.get_script_base_path �]�w
	 * @type	String
	 * @see
	 * <a href="http://soswitcher.blogspot.com/2009/05/blogger-host-javascript-file-for-free.html" accessdate="2010/3/11 23:30">Blogger - Host Javascript File for Free - Blogger,Javascript - Blogger Blog by Switcher</a>
	 * @name	CeL.env.script_extension
	 */
CeL.script_extension=CeL.env.script_extension="";	//	typeof WScript === 'undefined' ? '.' : '.js';
	/**
	 * library main file base name
	 * @name	CeL.env.main_script_name
	 * @type	String
	 */
CeL.main_script_name=CeL.env.main_script_name='ce';
	/**
	 * library main file name<br/>
	 * full path: {@link CeL.env.registry_path} + {@link CeL.env.main_script}
	 * @example:
	 * CeL.log('full path: ['+CeL.env.registry_path+CeL.env.main_script+']');
	 * @name	CeL.env.main_script
	 * @type	String
	 */
CeL.main_script=CeL.env.main_script="";	//	env.main_script_name + env.script_extension;
	/**
	 * module �����o member �w�q�F���� member ���Q extend
	 * @name	CeL.env.not_to_extend_keyword
	 * @type	String
	 */
CeL.not_to_extend_keyword=CeL.env.not_to_extend_keyword='no_extend';
	/**
	 * �� library source �ɮרϥΤ� encoding<br/>
	 * ���ϥη|���ͻy�k���~
	 * @name	CeL.env.source_encoding
	 * @type	String
	 */
CeL.source_encoding=CeL.env.source_encoding='UTF-16';
	/**
	 * default global object.
	 * ���i�ର undefined!
	 * @name	CeL.env.global
	 * @type	Object
	 */
CeL.global=CeL.env.global={};
	/**
	 * creator group / ��´�W�� organization name
	 * @name	CeL.env.organization
	 * @type	String
	 */
CeL.organization=CeL.env.organization='Colorless echo';
	/**
	 * �b registry ���s�� library �b File System ���� base path �� key name
	 * @name	CeL.env.registry_base
	 * @type	String
	 */
CeL.registry_base=CeL.env.registry_base="";	//	env.registry_base + 'path';
		/**
		 * �s��b registry ���� path�A�q�`�����O library �b File System ���� base path
		 * @name	CeL.env.registry_path
		 * @type	String
		 */
CeL.registry_path=CeL.env.registry_path="";	//	(WScript.CreateObject("WScript.Shell"))
	/**
	 * ��������Ҧb OS ���x
	 * @name	CeL.env.OS
	 * @type	String
	 */
CeL.OS=CeL.env.OS="";	//	OS = typeof OS_type === 'string' ? OS_type
	/**
	 * ���w�] new line
	 * @name	CeL.env.new_line
	 * @type	String
	 */
CeL.new_line=CeL.env.new_line="";	//	OS == 'unix' ? '\n' : OS == 'Mac' ? '\r' : '\r\n';
	/**
	 * file system �w�] path separator<br/>
	 * platform-dependent path separator character, �M�w�ؿ�(directory)���j
	 * @name	CeL.env.path_separator
	 * @type	String
	 */
CeL.path_separator=CeL.env.path_separator="";	//	OS == 'unix' ? '/' : '\\';
	/**
	 * �w�] module name separator
	 * @name	CeL.env.module_name_separator
	 * @type	String
	 */
CeL.module_name_separator=CeL.env.module_name_separator='.';
	/**
	 * path_separator in �q��(regular)�B�⦡
	 * @name	CeL.env.path_separator_RegExp
	 * @type	RegExp
	 */
CeL.path_separator_RegExp=CeL.env.path_separator_RegExp=/^regexp$/;	//	this.to_RegExp_pattern ? this
	/**
	 * �w�]�y�t
	 * 0x404:����-�x�W,0x0411:���-�饻
	 * @name	CeL.env.locale
	 * @see	<a href="http://msdn.microsoft.com/zh-tw/library/system.globalization.cultureinfo(VS.80).aspx">CultureInfo ���O</a>
	 * @type	Number
	 */
CeL.locale=CeL.env.locale=0;	//	0x404;
	/**
	 * script name
	 * @name	CeL.env.script_name
	 * @type	String
	 */
CeL.script_name=CeL.env.script_name="";	//	this.get_script_name();
	/**
	 * base path of script.
	 * TODO
	 * �H reg �N��
	 * @name	CeL.env.script_base_path
	 * @type	String
	 */
CeL.script_base_path=CeL.env.script_base_path="";	//	this.get_script_full_name()
	/**
	 * Legal identifier name in RegExp.
	 * �o pattern �|���h��ӵ�����: first letter, and least.
	 * .replace(/_/ [g],'for first letter')
	 * .replace(/\\d/,'for least')
	 * �o��C�X���u�O�X�k identifier ��*�l��*�A�B���h�� reserved words!
	 * �Ъ`�N��ڧP�O���[�J ^..$
	 * 
	 * ���� \d �ӥ� 0-9 �O�]�� \d �٥]�A�F MATHEMATICAL BOLD DIGIT�C
	 * <a href="http://blog.est.im/archives/3229" accessdate="2010/11/16 20:6">��_��\u21017��URL�ǰt�w���ʦ�\u34385</a>
	 * @name	CeL.env.identifier_RegExp
	 * @see
	 * ECMA-262	7.6 Identifier Names and Identifiers
	 * @type	RegExp
	 */
CeL.identifier_RegExp=CeL.env.identifier_RegExp=/^regexp$/;	//	/([a-zA-Z$_]|\\u[0-9a-fA-F]{4})([a-zA-Z$_0-9]+|\\u[0-9a-fA-F]{4}){0,63}/;
	/**
	 * Legal identifier name in String from env.identifier_RegExp.
	 * @name	CeL.env.identifier_String
	 */
//CeL.identifier_String=CeL.env.identifier_String;//env.identifier_RegExp.source;
/**
 * Setup environment variables
 * @param	{String} [OS_type]	type of OS
 * @param	{Boolean} [reset]	reset the environment variables 
 * @returns	{Object}	environment variables set
 */
CeL.initial_env=function(OS_type, reset){
	///	<summary>Setup environment variables</summary>
	///	<param name="OS_type" type="String" optional="true">type of OS</param>
	///	<param name="reset" type="Boolean" optional="true">reset the environment variables</param>
	///	<returns type="Object">environment variables set</returns>

};
/**
 * Tell if it's now debugging.
 * @param {Integer} [debug_level]	if it's now in this debug level.
 * @returns	{Boolean}	It's now in specified debug level.
 * @returns	{Number}	It's now in what debug level (Integer).
 */
CeL.is_debug=function(debug_level){
	///	<summary>Tell if it's now debugging.</summary>
	///	<param name="debug_level" type="Integer" optional="true" integer="true">if it's now in this debug level.</param>
	///	<returns type="Boolean">It's now in specified debug level.</returns>
	///	<returns type="Number">It's now in what debug level (Integer).</returns>

};
/**
 * Set debugging level
 * @param {Integer} [debug_level]	The debugging level to set.
 * @type	Integer
 * @returns	{Number} debugging level now
 */
CeL.set_debug=function (debug_level){
	///	<summary>Set debugging level</summary>
	///	<param name="debug_level" type="Integer" optional="true" integer="true">The debugging level to set.</param>
	///	<returns type="Number">debugging level now</returns>

};
/**
 * Get the hash key of text.
 * @param {String} text	text to test
 * @returns	{String}	hash key
 */
CeL._get_hash_key=function(text){
	///	<summary>Get the hash key of text.</summary>
	///	<param name="text" type="String" optional="false">text to test</param>
	///	<returns type="String">hash key</returns>

};
/**
 * ��o��ƦW
 * @param {Function} fr	function reference
 * @param {String} ns	name-space
 * @param {Boolean} force_load	force reload this name-space
 * @returns
 * @see
 * �i�઺�ܽЧ�� {@link CeL.native.parse_function}(F).funcName
 * @since	2010/1/7 22:10:27
 */
CeL.get_function_name=function(fr, ns, force_load){
	///	<summary>��o��ƦW</summary>
	///	<param name="fr" type="Function" optional="false">function reference</param>
	///	<param name="ns" type="String" optional="false">name-space</param>
	///	<param name="force_load" type="Boolean" optional="false">force reload this name-space</param>
	///	<returns/>
	///	<see>�i�઺�ܽЧ�� {@link CeL.native.parse_function}(F).funcName</see>
	///	<since>2010/1/7 22:10:27</since>

};
/**
 * ���i���� (learned from jQuery):
 * �N from_name_space �U�� variable_set ���i/�л\�� name_space�C
 * @since	2009/11/25 21:17:44
 * @param	variable_set	variable set
 * @param	{Object|Function} name_space	extend to what name-space
 * @param	{Object|Function} from_name_space	When inputing function names, we need a base name-space to search these functions.
 * @returns	library names-pace
 * @see
 * <a href="http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/03/01/jquery-extend.aspx" accessdate="2009/11/17 1:24" title="jQuery.extend���Ϊk - �·t�����">jQuery.extend���Ϊk</a>,
 * <a href="http://www.cnblogs.com/rubylouvre/archive/2009/11/21/1607072.html" accessdate="2010/1/1 1:40">jQuery��\u30721\u23398\u20064\u31508\u35760�T - Ruby's Louvre - �ի�\u22253</a>
 */
CeL.extend=function extend(variable_set, name_space, from_name_space){
	///	<summary>
	///	���i���� (learned from jQuery):
	///	�N from_name_space �U�� variable_set ���i/�л\�� name_space�C
	///	</summary>
	///	<since>2009/11/25 21:17:44</since>
	///	<param name="variable_set" type="" optional="false">variable set</param>
	///	<param name="name_space" type="Object|Function" optional="false">extend to what name-space</param>
	///	<param name="from_name_space" type="Object|Function" optional="false">When inputing function names, we need a base name-space to search these functions.</param>
	///	<returns>library names-pace</returns>
	///	<see>
	///	<a href="http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/03/01/jquery-extend.aspx" accessdate="2009/11/17 1:24" title="jQuery.extend���Ϊk - �·t�����">jQuery.extend���Ϊk</a>,
	///	<a href="http://www.cnblogs.com/rubylouvre/archive/2009/11/21/1607072.html" accessdate="2010/1/1 1:40">jQuery��\u30721\u23398\u20064\u31508\u35760�T - Ruby's Louvre - �ի�\u22253</a>
	///	</see>

};
/**
 * workaround.
 * �� name_space �U�� function_name (name_space[function_name]) ���� new_function�C
 * for Lazy Function Definition Pattern.
 * �k�ʨD�ȡ]Lazy Evaluation�^�A�S���i�k�D�ȡB�i�~�D��
 * @example
 * library_namespace.replace_function(_, 'to_SI_prefix', to_SI_prefix);
 * @param name_space	in which name-space
 * @param {String} function_name	name_space.function_name
 * @param {Function} new_function	replace to what function
 * @returns	new_function
 * @see
 * http://realazy.org/blog/2007/08/16/lazy-function-definition-pattern/,
 * http://peter.michaux.ca/article/3556
 */
CeL.replace_function=function(name_space, function_name, new_function){
	///	<summary>
	///	workaround.
	///	�� name_space �U�� function_name (name_space[function_name]) ���� new_function�C
	///	for Lazy Function Definition Pattern.
	///	�k�ʨD�ȡ]Lazy Evaluation�^�A�S���i�k�D�ȡB�i�~�D��
	///	</summary>
	///	<example>library_namespace.replace_function(_, 'to_SI_prefix', to_SI_prefix);</example>
	///	<param name="name_space" type="" optional="false">in which name-space</param>
	///	<param name="function_name" type="String" optional="false">name_space.function_name</param>
	///	<param name="new_function" type="Function" optional="false">replace to what function</param>
	///	<returns>new_function</returns>
	///	<see>
	///	http://realazy.org/blog/2007/08/16/lazy-function-definition-pattern/,
	///	http://peter.michaux.ca/article/3556
	///	</see>

};
/**
 * Get file resource by {@link XMLHttpRequest}<br/>
 * �̧Ǹ��J resource�A�Ω� include JavaScript �ɤ����ݨD�ɡA���o�ɮפ��e�����q�Ũ�ơC<br/>
 * �� Ajax�A����ƥ�i�Φb CScript ���椤�C
 * @example
 * //	get contents of [path/to/file]:
 * var file_contents = CeL.get_file('path/to/file');
 * @param	{String} path	URI / full path. <em style="text-decoration:line-through;">����ά۹�path�I</em>
 * @param	{String} [encoding]	file encoding
 * @returns	{String} data	content of path
 * @returns	{undefined}	when error occurred: no Ajax function, ..
 * @throws	uncaught exception @ Firefox: 0x80520012 (NS_ERROR_FILE_NOT_FOUND), <a href="http://www.w3.org/TR/2007/WD-XMLHttpRequest-20070227/#exceptions">NETWORK_ERR</a> exception
 * @throws	'Access to restricted URI denied' �� access ��W�@�h�ؿ��� @ Firefox
 * @see
 * <a href=http://blog.joycode.com/saucer/archive/2006/10/03/84572.aspx">Cross Site AJAX</a>,
 * <a href="http://domscripting.com/blog/display/91">Cross-domain Ajax</a>,
 * <a href="http://forums.mozillazine.org/viewtopic.php?f=25&amp;t=737645" accessdate="2010/1/1 19:37">FF3 issue with iFrames and XSLT standards</a>,
 * <a href="http://kb.mozillazine.org/Security.fileuri.strict_origin_policy" accessdate="2010/1/1 19:38">Security.fileuri.strict origin policy - MozillaZine Knowledge Base</a>
 * Chrome: <a href="http://code.google.com/p/chromium/issues/detail?id=37586" title="between builds 39339 (good) and 39344 (bad)">NETWORK_ERR: XMLHttpRequest Exception 101</a>
 */
//CeL.get_file;//XMLHttpRequest_type ? function(path, encoding) {
/**
 * Ask privilege in mozilla projects: Firefox 2, 3.
 * get_file() �J��ݭn�����v���ɨϥΡC
 * enablePrivilege ���G�u��b���檺 function ������ caller �I�s�~���ĪG�A���X��ƧY�L�ġA���� cache�A�]������ callback�C
 * �N����U�u�O�����M�w�v�A���}�s������ݭn�A���s���v�C
 * @param {String|Error} privilege	privilege that asked �Φ]�v�������ɭP�� Error
 * @param {Function|Array} callback|[callback,arguments]	Run this callback if getting the privilege. If it's not a function but a number(�g�L�X�h/loop�h��), detect if there's a loop or run the caller.
 * @returns	OK / the return of callback
 * @throws	error
 * @since	2010/1/2 00:40:42
 */
CeL.require_netscape_privilege=function require_netscape_privilege(privilege, callback){
	///	<summary>
	///	Ask privilege in mozilla projects: Firefox 2, 3.
	///	get_file() �J��ݭn�����v���ɨϥΡC
	///	enablePrivilege ���G�u��b���檺 function ������ caller �I�s�~���ĪG�A���X��ƧY�L�ġA���� cache�A�]������ callback�C
	///	�N����U�u�O�����M�w�v�A���}�s������ݭn�A���s���v�C
	///	</summary>
	///	<param name="privilege" type="String|Error" optional="false">privilege that asked �Φ]�v�������ɭP�� Error</param>
	///	<param name="callback" type="Function|Array" optional="false">|[callback,arguments]	Run this callback if getting the privilege. If it's not a function but a number(�g�L�X�h/loop�h��), detect if there's a loop or run the caller.</param>
	///	<returns>OK / the return of callback</returns>
	///	<throws>error</throws>
	///	<since>2010/1/2 00:40:42</since>

};
/**
 * ���ݭn�n�D�v���ɡA�O�_����C�]�o�˥i��u�X��ܮء^
 * Firefox 5 ����A�N��n�D�F�A�� local �]�S�ΡA�Ʀܷ| hang �������A�]�������F�C
 * @type	Boolean
 */
CeL.enabled=CeL.require_netscape_privilege.enabled=false;
/**
 * �o�� script file ���۹� base path
 * @param	{String} JSFN	script file name
 * @returns	{String} relative base path
 * @example
 * <script type="text/javascript" src="../baseFunc.js"></script>
 * //	�޼Ƭ���.js�ɦW�C�Y�O���.js�ɦW�A��ݭn�P�B��ʦ��ȡI
 * var basePath=get_script_base_path('baseFunc.js');
 * perl: use File::Basename;
 */
CeL.get_script_base_path=function(JSFN){
	///	<summary>�o�� script file ���۹� base path</summary>
	///	<param name="JSFN" type="String" optional="false">script file name</param>
	///	<returns type="String">relative base path</returns>
	///	<example>
	///	<script type="text/javascript" src="../baseFunc.js"></script>
	///	//	�޼Ƭ���.js�ɦW�C�Y�O���.js�ɦW�A��ݭn�P�B��ʦ��ȡI
	///	var basePath=get_script_base_path('baseFunc.js');
	///	perl: use File::Basename;
	///	</example>

};
/**
 * test �O�_�ŦX module pattern.
 * TODO: improve
 * @param {String} test_string	string to test
 * @returns	{Boolean}	�O�_�ŦX module pattern
 */
CeL.is_module_pattern=function(test_string){
	///	<summary>
	///	test �O�_�ŦX module pattern.
	///	TODO: improve
	///	</summary>
	///	<param name="test_string" type="String" optional="false">string to test</param>
	///	<returns type="Boolean">�O�_�ŦX module pattern</returns>

};
/**
 * test function.request �����جO�_�� module.
 * TODO
 * �{�b�٦��ܤj���D!
 * @param {String} resource_string	resource to test
 * @returns	{Boolean}	resource �O�_�� module (true: is module, false: is URL?)
 */
CeL.request_item_maybe_module=function(resource_string){
	///	<summary>
	///	test function.request �����جO�_�� module.
	///	TODO
	///	�{�b�٦��ܤj���D!
	///	</summary>
	///	<param name="resource_string" type="String" optional="false">resource to test</param>
	///	<returns type="Boolean">resource �O�_�� module (true: is module, false: is URL?)</returns>

};
/**
 * get the path of specified module.
 * @example
 * //	�s�� data �� path
 * path = library_namespace.get_module_path(this, '');
 * 
 * @param {String} module_name	module name
 * @param	{String} file_name	���o�b�P�@�ؿ��U�ɦW�� file_name �� path�C�Y��J '' �i���o parent �ؿ��C
 * @returns	{String} module path
 */
CeL.get_module_path=function(module_name, file_name){
	///	<summary>get the path of specified module.</summary>
	///	<example>
	///	//	�s�� data �� path
	///	path = library_namespace.get_module_path(this, '');
	///	*
	///	</example>
	///	<param name="module_name" type="String" optional="false">module name</param>
	///	<param name="file_name" type="String" optional="false">���o�b�P�@�ؿ��U�ɦW�� file_name �� path�C�Y��J '' �i���o parent �ؿ��C</param>
	///	<returns type="String">module path</returns>

};
/**
 * ��ƩҦ� /., /.., //
 * @since	2009/11/23 22:32:52
 * @param {String} path	����Ƥ� path
 * @returns	{String} path
 */
CeL.simplify_path=function(path){
	///	<summary>��ƩҦ� /., /.., //</summary>
	///	<since>2009/11/23 22:32:52</since>
	///	<param name="path" type="String" optional="false">����Ƥ� path</param>
	///	<returns type="String">path</returns>

};
/**
 * ���ϥ� eval ����k�Aget the module namespace of specific module name.
 * @param	{String} module_name	module name
 * @returns	null	some error occurred
 * @returns	namespace of specific module name
 */
CeL.get_module=function(module_name){
	///	<summary>���ϥ� eval ����k�Aget the module namespace of specific module name.</summary>
	///	<param name="module_name" type="String" optional="false">module name</param>
	///	<returns>null	some error occurred</returns>
	///	<returns>namespace of specific module name</returns>

};
/**
 * ���J module�C
 * <p>
 * ����Ʒ|�w���ǳƦn�U�h module �w�q�ɪ����ҡA���кɶq�� call �W�h name-space
 * �A�w�q�U�h���A�_�h�i��|�X�{���D�A�p memory leak ���C
 * </p>
 * 
 * @param {String}
 *            [module_name]
 *            <p>
 *            module name to register: �� module �� name(id)
 *            </p>
 * @param {Function}
 *            code_for_including
 *            <p>
 *            �Y�� include ��� module �ɡA���n�A�� code�C
 *            </p>
 *            code_for_including(
 *            		{Function} library_namespace:	namespace of library,
 *            		load_arguments:	�I�s�ɤ� argument(s)
 *            )
 * @returns null
 *          <p>
 *          invalid module
 *          </p>
 * @returns {Object}
 *          <p>
 *          �U�h module �� name-space
 *          </p>
 * @returns undefined
 *          <p>
 *          something error, e.g., �����\ load�Acode_for_including
 *          return null, ..
 *          </p>
 */
CeL.setup_module=function(module_name, code_for_including, parent_module_name){
	///	<summary>
	///	���J module�C
	///	<p>
	///	����Ʒ|�w���ǳƦn�U�h module �w�q�ɪ����ҡA���кɶq�� call �W�h name-space
	///	�A�w�q�U�h���A�_�h�i��|�X�{���D�A�p memory leak ���C
	///	</p>
	///	*
	///	</summary>
	///	<param>
	///	{String}
	///	[module_name]
	///	<p>
	///	module name to register: �� module �� name(id)
	///	</p>
	///	</param>
	///	<param>
	///	{Function}
	///	code_for_including
	///	<p>
	///	�Y�� include ��� module �ɡA���n�A�� code�C
	///	</p>
	///	code_for_including(
	///	{Function} library_namespace:	namespace of library,
	///	load_arguments:	�I�s�ɤ� argument(s)
	///	*            )
	///	</param>
	///	<returns>
	///	null
	///	<p>
	///	invalid module
	///	</p>
	///	</returns>
	///	<returns>
	///	{Object}
	///	<p>
	///	�U�h module �� name-space
	///	</p>
	///	</returns>
	///	<returns>
	///	undefined
	///	<p>
	///	something error, e.g., �����\ load�Acode_for_including
	///	return null, ..
	///	</p>
	///	</returns>

};
/**
 * �O�_ cache code�C
 * �Y���O�n���c code �h���ݭn�C
 * undefined: �̷ӹw�]
 * Boolean: ���T�]�w�A���p���Y�L�k�~�ӡC
 * @type	Boolean, undefined
 */
//CeL.cache_code;//[Boolean, undefined]undefined;
/**
 * �N��J�� string ���Φ��U module �椸�C<br/>
 * need environment_adapter()<br/>
 * ** �èS���� module ���������f��!
 * @param {String} module_name	module name
 * @returns	{Array}	module unit array
 */
CeL.split_module_name=function(module_name){
	///	<summary>
	///	�N��J�� string ���Φ��U module �椸�C<br/>
	///	need environment_adapter()<br/>
	///	** �èS���� module ���������f��!
	///	</summary>
	///	<param name="module_name" type="String" optional="false">module name</param>
	///	<returns type="Array">module unit array</returns>

};
/**
 * ���o module �� name�C�H library name �_�l�C
 * @returns {String} module name start with library name
 */
CeL.to_module_name=function(module, separator){
	///	<summary>���o module �� name�C�H library name �_�l�C</summary>
	///	<returns type="String">module name start with library name</returns>

};
/**
 * �P�_ module �O�_�s�b�A
 * TODO
 * �H�άO�_�}�l�C
 * @param	{String} module_name	module name
 * @param	{Array} module_name	module name list
 * @returns	{Boolean} �ҫ��w module �O�_�����s�b�H�Ψ}�n�C
 */
CeL.is_loaded=function(module_name){
	///	<summary>
	///	�P�_ module �O�_�s�b�A
	///	TODO
	///	�H�άO�_�}�l�C
	///	</summary>
	///	<param name="module_name" type="String" optional="false">module name</param>
	///	<param name="module_name" type="Array" optional="false">module name list</param>
	///	<returns type="Boolean">�ҫ��w module �O�_�����s�b�H�Ψ}�n�C</returns>

};
/**
 * include resource of module.
 * @example
 * //	�~���{���ϥήɡA�q�`�Φb include �۹�� library �������|�T�w���ɮסC
 * //	�Ҧp file_name �令�۹�� library �����ӻ������|�C
 * CeL.include_module_resource('../../game/game.css');
 * 
 * library_namespace.include_module_resource('select_input.css', this);
 * 
 * @param {String} file_name	�P module ���ۦP�ؿ��U�� resource file name
 * @param {String} [module_name]	�I�s�� module name�C�����ѫh�]�� library base path�A���� file_name ���۹�� library �������|���ɮסC
 * @returns
 * @since	2010/1/1-2 13:58:09
 */
CeL.include_module_resource=function(file_name, module_name){
	///	<summary>include resource of module.</summary>
	///	<example>
	///	//	�~���{���ϥήɡA�q�`�Φb include �۹�� library �������|�T�w���ɮסC
	///	//	�Ҧp file_name �令�۹�� library �����ӻ������|�C
	///	CeL.include_module_resource('../../game/game.css');
	///	*
	///	library_namespace.include_module_resource('select_input.css', this);
	///	*
	///	</example>
	///	<param name="file_name" type="String" optional="false">�P module ���ۦP�ؿ��U�� resource file name</param>
	///	<param name="module_name" type="String" optional="true">�I�s�� module name�C�����ѫh�]�� library base path�A���� file_name ���۹�� library �������|���ɮסC</param>
	///	<returns/>
	///	<since>2010/1/1-2 13:58:09</since>

};
/**
 * Include specified module.<br/>
 * 
 * �|�����եH�̧Ǹ��J(asynchronous)���覡���o module�C
 * �L�k�H Ajax ���J�ɡA�Y���]�w callback�A�|�^�ǿ��~�C�Y�]�w callback�A�|�H�P�B(synchronous)���覡���J module�A����J�������� callback�C
 * 		�Y�]�� browser �w���ʳ]�w�ӵL�k���o�h�|�^�� -1�A���ܱN�H�P�B���覡���J module�C�]�� module �|�����J�A�b�����q�|�L�k�P�O�� module �һݤ� dependency list�C�� list �|�Q�@���޼ƶǤJ callback�C
 * 
 * �`�N�G�H�U�� code ���ACeL.warn ���@�w�|�Q����]�i��|�B�i�ण�|�^�A�]������� log �i��|���Q include�C<br/>
 * �������ӧ�� CeL.set_run('application.log', callback);<br/>
 * code in head/script/:
 * <code>
 * CeL.use('code.log');
 * CeL.warn('WARNING message');
 * </code>
 * **	�b���w callback �� name_space �L�ġI
 * **	�w�]�| extend �� library �������U�I
 * @param	{String} module	module name
 * @param	{Function} [callback]	callback function | [callback, �i�ק��ܮɤ� function (TODO)]
 * @param	{Object|Boolean} [extend_to]	extend to which name-space<br/>
 * 		false:	just load, don't extend to library name-space<br/>
 * 		this:	extend to global<br/>
 * 		object:	extend to specified name-space that you can use [name_space]._func_ to run it<br/>
 * 		(others, including undefined):	extend to root of this library. e.g., call CeL._function_name_ and we can get the specified function.
 * @returns	{Error}
 * @returns	-1	will execute callback after load, ���N�� load module �F!
 * @returns	{undefined}	no error, OK
 * @example
 * CeL.use('code.log', function(){..});
 * CeL.use(['code.log', 'code.debug']);
 * @note
 * 'use' �O JScript.NET ���O�d�r.
 */
CeL.use=function requires(module, callback, extend_to, force){
	///	<summary>
	///	Include specified module.<br/>
	///	*
	///	�|�����եH�̧Ǹ��J(asynchronous)���覡���o module�C
	///	�L�k�H Ajax ���J�ɡA�Y���]�w callback�A�|�^�ǿ��~�C�Y�]�w callback�A�|�H�P�B(synchronous)���覡���J module�A����J�������� callback�C
	///	�Y�]�� browser �w���ʳ]�w�ӵL�k���o�h�|�^�� -1�A���ܱN�H�P�B���覡���J module�C�]�� module �|�����J�A�b�����q�|�L�k�P�O�� module �һݤ� dependency list�C�� list �|�Q�@���޼ƶǤJ callback�C
	///	*
	///	�`�N�G�H�U�� code ���ACeL.warn ���@�w�|�Q����]�i��|�B�i�ण�|�^�A�]������� log �i��|���Q include�C<br/>
	///	�������ӧ�� CeL.set_run('application.log', callback);<br/>
	///	code in head/script/:
	///	<code>
	///	CeL.use('code.log');
	///	CeL.warn('WARNING message');
	///	</code>
	///	**	�b���w callback �� name_space �L�ġI
	///	**	�w�]�| extend �� library �������U�I
	///	</summary>
	///	<param name="module" type="String" optional="false">module name</param>
	///	<param name="callback" type="Function" optional="true">callback function | [callback, �i�ק��ܮɤ� function (TODO)]</param>
	///	<param>
	///	{Object|Boolean} [extend_to]	extend to which name-space<br/>
	///	false:	just load, don't extend to library name-space<br/>
	///	this:	extend to global<br/>
	///	object:	extend to specified name-space that you can use [name_space]._func_ to run it<br/>
	///	(others, including undefined):	extend to root of this library. e.g., call CeL._function_name_ and we can get the specified function.
	///	</param>
	///	<returns type="Error"/>
	///	<returns>-1	will execute callback after load, ���N�� load module �F!</returns>
	///	<returns type="undefined">no error, OK</returns>
	///	<example>
	///	CeL.use('code.log', function(){..});
	///	CeL.use(['code.log', 'code.debug']);
	///	</example>
	///	<note>'use' �O JScript.NET ���O�d�r.</note>

};
/**
 * Including other JavaScript/CSS files synchronously.
 * 
 * TODO:
 * timeout for giving up
 * use document.createElementNS()
 * http://headjs.com/#theory
 * 
 * @param {String} resource path
 * @param {Function|Object} callback
 * 		use_write ? test function{return } : callback function(path)
 * 		/	{callback: callback function(path, module), module: module name, global: global object when run callback}
 * @param {Boolean} [use_write]	use document.write() instead of insert a element to <head>
 * @param {Number} [type]	1: is a .css file, others: script
 */
CeL.include_resource=function include_resource(path, callback, force, timeout, type, use_write){
	///	<summary>
	///	Including other JavaScript/CSS files synchronously.
	///	*
	///	TODO:
	///	timeout for giving up
	///	use document.createElementNS()
	///	http://headjs.com/#theory
	///	*
	///	</summary>
	///	<param name="resource" type="String" optional="false">path</param>
	///	<param>
	///	{Function|Object} callback
	///	use_write ? test function{return } : callback function(path)
	///	/	{callback: callback function(path, module), module: module name, global: global object when run callback}
	///	</param>
	///	<param name="use_write" type="Boolean" optional="true">use document.write() instead of insert a element to <head></param>
	///	<param name="type" type="Number" optional="true">1: is a .css file, others: script</param>

};
/**
 * control/setup source codes to run.
 * �򥻤W�ϥΦP�B(synchronous)���覡�A���D�һݸ귽�w�g���J�A�άO����k�H {@link XMLHttpRequest} ���o�귽�C
 * 
 * @example
 * sr = CeL.set_run;
 * sr('module_name', function(){
 * 	// ...
 * });
 * 
 * TODO:
 * sr('module_name', function(){
 * 	CeL.import('module_name', {module_function_1:0});
 * 
 * 	CeL.module_function_1('11') === module_function_1('11');
 * 
 * 	var instance=new CeL.module_name.module_class_1;
 * 	instance.print(112);
 * });
 * 
 * 
 * @param	running sequence: list of
 * 		{Function} function to run/�����椧 function �� change .to_run
 * 		| {Integer} timeout (ms): �ȯ�O�ҤW�� function ����ܦ��� function �@�w�|���W�L�o�q�ɶ� �� change .start_time, .timeout
 * 		| {String} library module name to import �� change .to_load_module, .module_count
 * 		| {String} URL/file path (image/JavaScript files/CSS) �� change .to_load_path, .path_count
 * 		| {Array} �t�@�զP�� loading set: [{String|Function|Integer}, ..] �� ��}�������@�P�� loading
 * 		| TODO: {Object}	loading with additional config
 * 
 * @since 2011/8/4 22:31:47
 */
CeL.set_run=function(){
	///	<summary>
	///	control/setup source codes to run.
	///	�򥻤W�ϥΦP�B(synchronous)���覡�A���D�һݸ귽�w�g���J�A�άO����k�H {@link XMLHttpRequest} ���o�귽�C
	///	*
	///	</summary>
	///	<example>
	///	sr = CeL.set_run;
	///	sr('module_name', function(){
	///	// ...
	///	});
	///	*
	///	TODO:
	///	sr('module_name', function(){
	///	CeL.import('module_name', {module_function_1:0});
	///	*
	///	CeL.module_function_1('11') === module_function_1('11');
	///	*
	///	var instance=new CeL.module_name.module_class_1;
	///	instance.print(112);
	///	});
	///	*
	///	 *
	///	</example>
	///	<param>
	///	running sequence: list of
	///	{Function} function to run/�����椧 function �� change .to_run
	///	| {Integer} timeout (ms): �ȯ�O�ҤW�� function ����ܦ��� function �@�w�|���W�L�o�q�ɶ� �� change .start_time, .timeout
	///	| {String} library module name to import �� change .to_load_module, .module_count
	///	| {String} URL/file path (image/JavaScript files/CSS) �� change .to_load_path, .path_count
	///	| {Array} �t�@�զP�� loading set: [{String|Function|Integer}, ..] �� ��}�������@�P�� loading
	///	| TODO: {Object}	loading with additional config
	///	*
	///	</param>
	///	<since>2011/8/4 22:31:47</since>

};
/**
 * module ������ inherit �ɨϥΡC
 * 
 * TODO:
 * �P�B���J�\��
 * @param {String} parent_module_name	���~�Ӫ� module_name
 * @param initial_arguments	�~�Ӯɪ� initial arguments
 * @returns
 * @see
 * <a href="http://fillano.blog.ithome.com.tw/post/257/17355" accessdate="2010/1/1 0:6">Fillano's Learning Notes | ����ɦVJavascript - ��@�~�Ӫ��ĪG</a>,
 * <a href="http://www.crockford.com/javascript/inheritance.html" accessdate="2010/1/1 0:6">Classical Inheritance in JavaScript</a>
 */
CeL.inherit=function(parent_module_name, initial_arguments){
	///	<summary>
	///	module ������ inherit �ɨϥΡC
	///	*
	///	TODO:
	///	�P�B���J�\��
	///	</summary>
	///	<param name="parent_module_name" type="String" optional="false">���~�Ӫ� module_name</param>
	///	<param name="initial_arguments" type="" optional="false">�~�Ӯɪ� initial arguments</param>
	///	<returns/>
	///	<see>
	///	<a href="http://fillano.blog.ithome.com.tw/post/257/17355" accessdate="2010/1/1 0:6">Fillano's Learning Notes | ����ɦVJavascript - ��@�~�Ӫ��ĪG</a>,
	///	<a href="http://www.crockford.com/javascript/inheritance.html" accessdate="2010/1/1 0:6">Classical Inheritance in JavaScript</a>
	///	</see>

};
/**
 * �ѪR dependency list �H��o�һݤ� module/path/variable name..
 * 
 * @param {Array|String}
 *            dependency_list
 *            <p>
 *            list of dependency function/module/variable required. module ���H
 *            CeL.env.module_name_separator ('.') �����C�Y��J String�A�h�H separator �� '|' ���ΡC
 *            </p>
 * @returns {Object} result { variable: {variable_name: full_name}, module:
 *          {module name: loaded or not}, module_to_load: [], URL: {}}
 * @returns {Number} error_no
 * @since 2011/8/6 22:10:57
 */
CeL.parse_require=function(dependency_list, separator, base_require){
	///	<summary>
	///	�ѪR dependency list �H��o�һݤ� module/path/variable name..
	///	*
	///	</summary>
	///	<param>
	///	{Array|String}
	///	dependency_list
	///	<p>
	///	list of dependency function/module/variable required. module ���H
	///	CeL.env.module_name_separator ('.') �����C�Y��J String�A�h�H separator �� '|' ���ΡC
	///	</p>
	///	</param>
	///	<returns>
	///	{Object} result { variable: {variable_name: full_name}, module:
	///	{module name: loaded or not}, module_to_load: [], URL: {}}
	///	</returns>
	///	<returns type="Number">error_no</returns>
	///	<since>2011/8/6 22:10:57</since>

};
/**
 * module ���ݭn include function/module/variable �ɳ]�w local variables �ϥΡC<br/>
 * ����ƱN��һ� function include �ܷ��e namespace �U�C
 * 
 * TODO: ��J function name �Y�i
 * 
 * @example
 * 
 * //	requires (inside module)
 * //	�ƥ��w�q @ 'use strict';
 * var split_String_to_Object;
 * //	���ҥH�ݭn�ϥ� eval �O�]���n extend �ܷ��e namespace �U�C
 * //	�Y�L�k load CeL.data�A�N�| throw
 * eval(library_namespace.use_function(this, 'data.split_String_to_Object'));
 * //	use it
 * split_String_to_Object();
 * 
 * //	���� eval ����k 1: function �w�]���| extend �ܷ��e library_namespace �U�C
 * library_namespace.use_function(this, 'data.split_String_to_Object');
 * library_namespace.use_function(this, 'data.split_String_to_Object', false);
 * //	�Y�L�k load CeL.data�A�N�| throw
 * //	use it
 * library_namespace.split_String_to_Object();
 * 
 * //	���� eval ����k 2: �]�w extend_to
 * var o={};
 * //	�Y�L�k load CeL.data�A�N�| throw
 * library_namespace.use_function(this, 'data.split_String_to_Object', o);
 * //	use it
 * o.split_String_to_Object();
 * 
 * @param	{Function|Object} name_space	module name-space
 * @param	{Array|String} dependency_list	list of dependency function/module/variable required. module ���H '.' �����C�Y��J String�A�h�H ',' ���ΡC
 * @param	{Function|Object} [extend_to]	�Y�]�w�N�� variable extend �� extend_to
 * 
 * @returns	{Number} error code
 * 		1: can't parse dependency_list
 * 
 * @throws	{Error}	���� module �|�����J�C
 * 
 * @since	2009/12/26 02:36:31
 * 2009/12/31 22:21:23	add ���� 'data.' ���Φ��A�� module�C
 * 2010/6/14 22:58:18	�קK�ۤ� require
 */
CeL.use_function=function(name_space, extend_to, optional_use, no_strict){
	///	<summary>
	///	module ���ݭn include function/module/variable �ɳ]�w local variables �ϥΡC<br/>
	///	����ƱN��һ� function include �ܷ��e namespace �U�C
	///	*
	///	TODO: ��J function name �Y�i
	///	*
	///	</summary>
	///	<example>
	///	*
	///	//	requires (inside module)
	///	//	�ƥ��w�q @ 'use strict';
	///	var split_String_to_Object;
	///	//	���ҥH�ݭn�ϥ� eval �O�]���n extend �ܷ��e namespace �U�C
	///	//	�Y�L�k load CeL.data�A�N�| throw
	///	eval(library_namespace.use_function(this, 'data.split_String_to_Object'));
	///	//	use it
	///	split_String_to_Object();
	///	*
	///	//	���� eval ����k 1: function �w�]���| extend �ܷ��e library_namespace �U�C
	///	library_namespace.use_function(this, 'data.split_String_to_Object');
	///	library_namespace.use_function(this, 'data.split_String_to_Object', false);
	///	//	�Y�L�k load CeL.data�A�N�| throw
	///	//	use it
	///	library_namespace.split_String_to_Object();
	///	*
	///	//	���� eval ����k 2: �]�w extend_to
	///	var o={};
	///	//	�Y�L�k load CeL.data�A�N�| throw
	///	library_namespace.use_function(this, 'data.split_String_to_Object', o);
	///	//	use it
	///	o.split_String_to_Object();
	///	*
	///	</example>
	///	<param name="name_space" type="Function|Object" optional="false">module name-space</param>
	///	<param name="dependency_list" type="Array|String" optional="false">list of dependency function/module/variable required. module ���H '.' �����C�Y��J String�A�h�H ',' ���ΡC</param>
	///	<param>
	///	{Function|Object} [extend_to]	�Y�]�w�N�� variable extend �� extend_to
	///	*
	///	</param>
	///	<returns>
	///	{Number} error code
	///	1: can't parse dependency_list
	///	*
	///	</returns>
	///	<throws>
	///	{Error}	���� module �|�����J�C
	///	*
	///	</throws>
	///	<since>
	///	2009/12/26 02:36:31
	///	2009/12/31 22:21:23	add ���� 'data.' ���Φ��A�� module�C
	///	2010/6/14 22:58:18	�קK�ۤ� require
	///	</since>

};
/**
 * null module constructor
 * @class	data �B�z�� functions
 */
CeL.data=function(){
	///	<summary>null module constructor</summary>
	///	<class>data �B�z�� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.prototype={};
/**
 * clone native Object
 * @param {Object} object
 * @param {Boolean} not_trivial
 * @return
 * @since	2008/7/19 11:13:10
 */
CeL.data.clone_object=clone_object=function(object, not_trivial){
	///	<summary>clone native Object</summary>
	///	<param name="object" type="Object" optional="false"/>
	///	<param name="not_trivial" type="Boolean" optional="false"/>
	///	<returns/>
	///	<since>2008/7/19 11:13:10</since>

};
/**
 * ���X�U�r�����X�{�v�C ���q�ϥΦr��@0-127�G9-10,13,32-126�Areduce��`�ΡG9,32-95,97-125
 * 
 * @param {String} text
 *            ����
 * @return
 * @memberOf CeL.data
 */
CeL.char_frequency=CeL.data.char_frequency=function (text){
	///	<summary>
	///	���X�U�r�����X�{�v�C ���q�ϥΦr��@0-127�G9-10,13,32-126�Areduce��`�ΡG9,32-95,97-125
	///	*
	///	</summary>
	///	<param name="text" type="String" optional="false">����</param>
	///	<returns/>
	///	<memberOf>CeL.data</memberOf>

};
/**
 * �p��r�� count words.
 * 
 * @param {String} text
 *            ����
 * @param {Number} flag	���ɮ榡/�B�z��k
 * @return	{Number} �r�� 
 * @memberOf CeL.data
 */
CeL.count_word=CeL.data.count_word=function(text, flag){
	///	<summary>
	///	�p��r�� count words.
	///	*
	///	</summary>
	///	<param name="text" type="String" optional="false">����</param>
	///	<param name="flag" type="Number" optional="false">���ɮ榡/�B�z��k</param>
	///	<returns type="Number">�r��</returns>
	///	<memberOf>CeL.data</memberOf>

};
/**
 * �B�⦡�Ȫ��G�i����ܪk	�w�̨Τ�:5.82s/100000��dec_to_bin(20,8)@300(?)MHz,2.63s/100000��dec_to_bin(20)@300(?)MHz
 * @param {Number} number	number
 * @param places	places,�r����,�ϥΫe�m0�Ӷ�ɦ^�Э�
 * @return
 * @example
 * {var d=new Date,i,b;for(i=0;i<100000;i++)b=dec_to_bin(20);alert(gDate(new Date-d));}
 * @memberOf	CeL.data
 */
CeL.dec_to_bin=CeL.data.dec_to_bin=function(number, places){
	///	<summary>�B�⦡�Ȫ��G�i����ܪk	�w�̨Τ�:5.82s/100000��dec_to_bin(20,8)@300(?)MHz,2.63s/100000��dec_to_bin(20)@300(?)MHz</summary>
	///	<param name="number" type="Number" optional="false">number</param>
	///	<param name="places" type="" optional="false">places,�r����,�ϥΫe�m0�Ӷ�ɦ^�Э�</param>
	///	<returns/>
	///	<example>{var d=new Date,i,b;for(i=0;i<100000;i++)b=dec_to_bin(20);alert(gDate(new Date-d));}</example>
	///	<memberOf>CeL.data</memberOf>

};
/**
 * �]�wobject���ȡA��Jitem=[value][,item=[value]..]�C
 * value���]�w�|�۰ʲ֥[�C
 * �ϥΫe�����ݥ��ŧi�K�_�X�b�{�b��JS������
 * @param obj	object name that need to operate at
 * @param value	valueto set
 * @param type	�֥[ / value type
 * @param mode	mode / value type
 * @return
 * @memberOf	CeL.data
 */
CeL.set_obj_value=CeL.data.set_obj_value=function(obj, value, type, mode){
	///	<summary>
	///	�]�wobject���ȡA��Jitem=[value][,item=[value]..]�C
	///	value���]�w�|�۰ʲ֥[�C
	///	�ϥΫe�����ݥ��ŧi�K�_�X�b�{�b��JS������
	///	</summary>
	///	<param name="obj" type="" optional="false">object name that need to operate at</param>
	///	<param name="value" type="" optional="false">valueto set</param>
	///	<param name="type" type="" optional="false">�֥[ / value type</param>
	///	<param name="mode" type="" optional="false">mode / value type</param>
	///	<returns/>
	///	<memberOf>CeL.data</memberOf>

};
/**
 * �N�r��դ��@ Object
 * @param {String} value_set	�r���, e.g., 'a=12,b=34'
 * @param assignment_char	char to assign values, e.g., '='
 * @param end_char	end char of assignment
 * @return
 * @since	2006/9/6 20:55, 2010/4/12 23:06:04
 * @memberOf	CeL.data
 */
CeL.split_String_to_Object=CeL.data.split_String_to_Object=function(value_set, assignment_char, end_char){
	///	<summary>�N�r��դ��@ Object</summary>
	///	<param name="value_set" type="String" optional="false">�r���, e.g., 'a=12,b=34'</param>
	///	<param name="assignment_char" type="" optional="false">char to assign values, e.g., '='</param>
	///	<param name="end_char" type="" optional="false">end char of assignment</param>
	///	<returns/>
	///	<since>2006/9/6 20:55, 2010/4/12 23:06:04</since>
	///	<memberOf>CeL.data</memberOf>

};
/**
 * test if 2 string is at the same length
 * @param s1	string 1
 * @param s2	string 2
 * @return
 * @memberOf	CeL.data
 */
CeL.same_length=CeL.data.same_length=function(s1, s2){
	///	<summary>test if 2 string is at the same length</summary>
	///	<param name="s1" type="" optional="false">string 1</param>
	///	<param name="s2" type="" optional="false">string 2</param>
	///	<returns/>
	///	<memberOf>CeL.data</memberOf>

};
/**
 * �N�Ʀr�ର K, M, G �� SI prefixes ���ܤ覡�A�Ҧp 6458 �ন 6.31K�C
 * @param {Number} number	�Ʀr
 * @param {Number} digits	to fixed digit
 * @type	{String}
 * @return	{String}	SI prefixes ���ܤ覡
 * @requires	setTool,to_fixed
 * @memberOf	CeL.data
 */
CeL.to_SI_prefix=CeL.data.to_SI_prefix=function (number, digits){
	///	<summary>�N�Ʀr�ର K, M, G �� SI prefixes ���ܤ覡�A�Ҧp 6458 �ন 6.31K�C</summary>
	///	<param name="number" type="Number" optional="false">�Ʀr</param>
	///	<param name="digits" type="Number" optional="false">to fixed digit</param>
	///	<returns type="String">SI prefixes ���ܤ覡</returns>
	///	<requires>setTool,to_fixed</requires>
	///	<memberOf>CeL.data</memberOf>

};
/**
 * null module constructor
 * @class	check �B�z�� functions
 */
CeL.check=CeL.data.check=function(){
	///	<summary>null module constructor</summary>
	///	<class>check �B�z�� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.check.prototype={};
/**
 * null module constructor
 * @class	CSV data �� functions
 */
CeL.CSV=CeL.data.CSV=function(){
	///	<summary>null module constructor</summary>
	///	<class>CSV data �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.CSV.prototype={};
/**
 * parse CSV data to JSON	Ū�J CSV ��
 * @param {String} _t	CSV text data
 * @param {Boolean} doCheck check if data is valid
 * @param {Boolean} hasTitle	there's a title line
 * @return	{Array}	[ [L1_1,L1_2,..], [L2_1,L2_2,..],.. ]
 * @memberOf	CeL.data.CSV
 * @example
 * //	to use:
 * var data=parse_CSV('~');
 * data[_line_][_field_]
 *
 * //	hasTitle:
 * var data = parse_CSV('~',0,1);
 * //data[_line_][data.t[_title_]]
 *
 * //	then:
 * data.tA	=	title line
 * data.t[_field_name_]	=	field number of title
 * data.it	=	ignored title array
 * data[num]	=	the num-th line (num: 0,1,2,..)
 * @see
 * <a href="http://www.jsdb.org/" accessdate="2010/1/1 0:53">JSDB: JavaScript for databases</a>,
 * <a href="http://hax.pie4.us/2009/05/lesson-of-regexp-50x-faster-with-just.html" accessdate="2010/1/1 0:53">John Hax: A lesson of RegExp: 50x faster with just one line patch</a>
 */
CeL.parse_CSV=CeL.data.CSV.parse_CSV=function(_t, doCheck, hasTitle){
	///	<summary>parse CSV data to JSON	Ū�J CSV ��</summary>
	///	<param name="_t" type="String" optional="false">CSV text data</param>
	///	<param name="doCheck" type="Boolean" optional="false">check if data is valid</param>
	///	<param name="hasTitle" type="Boolean" optional="false">there's a title line</param>
	///	<returns type="Array">[ [L1_1,L1_2,..], [L2_1,L2_2,..],.. ]</returns>
	///	<memberOf>CeL.data.CSV</memberOf>
	///	<example>
	///	//	to use:
	///	var data=parse_CSV('~');
	///	data[_line_][_field_]
	///	*
	///	//	hasTitle:
	///	var data = parse_CSV('~',0,1);
	///	//data[_line_][data.t[_title_]]
	///	*
	///	//	then:
	///	data.tA	=	title line
	///	data.t[_field_name_]	=	field number of title
	///	data.it	=	ignored title array
	///	data[num]	=	the num-th line (num: 0,1,2,..)
	///	</example>
	///	<see>
	///	<a href="http://www.jsdb.org/" accessdate="2010/1/1 0:53">JSDB: JavaScript for databases</a>,
	///	<a href="http://hax.pie4.us/2009/05/lesson-of-regexp-50x-faster-with-just.html" accessdate="2010/1/1 0:53">John Hax: A lesson of RegExp: 50x faster with just one line patch</a>
	///	</see>

};
/**
* field delimiter
*/
CeL.fd=CeL.data.CSV.parse_CSV.fd="";	//	'\\t,;';
/**
* text delimiter
*/
CeL.td=CeL.data.CSV.parse_CSV.td="";	//	'"\'';
/**
* auto detect.. no title
*/
//CeL.hasTitle=CeL.data.CSV.parse_CSV.hasTitle;//null;
/**
 * null module constructor
 * @class	�ƾǬ����� functions
 */
CeL.math=CeL.data.math=function(){
	///	<summary>null module constructor</summary>
	///	<class>�ƾǬ����� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.math.prototype={};
/**
 * ����۰� n1/n2 �� �p�� n1/1 �ন ���/���
 * @param {Number} n1	number 1
 * @param {Number} [n2]	number 2
 * @param {Number} times	max ����, 1,2,..
 * @return	{Array}	�s���ƧǦC ** �t�Ƶ� _.mutual_division.done �өw!
 */
CeL.mutual_division=CeL.data.math.mutual_division=function mutual_division(n1, n2, times){
	///	<summary>����۰� n1/n2 �� �p�� n1/1 �ন ���/���</summary>
	///	<param name="n1" type="Number" optional="false">number 1</param>
	///	<param name="n2" type="Number" optional="true">number 2</param>
	///	<param name="times" type="Number" optional="false">max ����, 1,2,..</param>
	///	<returns type="Array">�s���ƧǦC ** �t�Ƶ� _.mutual_division.done �өw!</returns>

};
/**
 * !!mode:�s���ƳB�z�A��t�ƶȦ��̪�@�Ƭ��t�C
 */
//CeL.mode=CeL.data.math.mutual_division.mode;//0;
/**
 * ���o�s���ƧǦC���ƭ�
 * @param {Array} sequence	�ǦC
 * @param {Number} [max_no]	���ܲ� max_no ��
 * @requires	mutual_division.done
 * @return
 * @see
 * var a=continued_fraction([1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]);
 * alert(a+'\n'+a[0]/a[1]+'\n'+Math.SQRT2+'\n'+(Math.SQRT2-a[0]/a[1])+'\n'+mutual_division(a[0],a[1]));
 */
CeL.continued_fraction=CeL.data.math.continued_fraction=function(sequence, max_no){
	///	<summary>���o�s���ƧǦC���ƭ�</summary>
	///	<param name="sequence" type="Array" optional="false">�ǦC</param>
	///	<param name="max_no" type="Number" optional="true">���ܲ� max_no ��</param>
	///	<requires>mutual_division.done</requires>
	///	<returns/>
	///	<see>
	///	var a=continued_fraction([1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]);
	///	alert(a+'\n'+a[0]/a[1]+'\n'+Math.SQRT2+'\n'+(Math.SQRT2-a[0]/a[1])+'\n'+mutual_division(a[0],a[1]));
	///	</see>

};
/**
 * The best rational approximation. ���o�ȳ̱��񤧦��z�� (use �s���� continued fraction), �������.
 * c.f., �դ�k
 * �b���l�Τ����p��U�@�Ӻ��i���ƪ����Ƥ��A��ȬO�̱����T�Ȫ�����ȡC
 * @example
 * to_rational_number(4088/783)
 * @param {Number} number	number
 * @param {Number} [rate]	��Ҧb rate �H�W
 * @param {Number} [max_no]	�̦h���ܧǦC�� max_no ��
 * 					TODO : �äp�� l: limit
 * @return	[���l, ����, �~�t]
 * @requires	mutual_division,continued_fraction
 * @see
 * http://en.wikipedia.org/wiki/Continued_fraction#Best_to_rational_numbers
 */
CeL.to_rational_number=CeL.data.math.to_rational_number=function(number, rate, max_no){
	///	<summary>
	///	The best rational approximation. ���o�ȳ̱��񤧦��z�� (use �s���� continued fraction), �������.
	///	c.f., �դ�k
	///	�b���l�Τ����p��U�@�Ӻ��i���ƪ����Ƥ��A��ȬO�̱����T�Ȫ�����ȡC
	///	</summary>
	///	<example>to_rational_number(4088/783)</example>
	///	<param name="number" type="Number" optional="false">number</param>
	///	<param name="rate" type="Number" optional="true">��Ҧb rate �H�W</param>
	///	<param>
	///	{Number} [max_no]	�̦h���ܧǦC�� max_no ��
	///	TODO : �äp�� l: limit
	///	</param>
	///	<returns>[���l, ����, �~�t]</returns>
	///	<requires>mutual_division,continued_fraction</requires>
	///	<see>http://en.wikipedia.org/wiki/Continued_fraction#Best_to_rational_numbers</see>

};
/**
 * Get GCD of 2 numbers
 * @param n1	number 1
 * @param n2	number 2
 * @return	GCD of the 2 numbers
 */
CeL.gcd=CeL.data.math.gcd=function(n1, n2){
	///	<summary>Get GCD of 2 numbers</summary>
	///	<param name="n1" type="" optional="false">number 1</param>
	///	<param name="n2" type="" optional="false">number 2</param>
	///	<returns>GCD of the 2 numbers</returns>

};
/**
 * �o�쥭��ơA�۷��� Math.floor(Math.sqrt(number)).
 * get integer square root
 * @param {Number} positive number
 * @return	r, r^2 <= number < (r+1)^2
 * @example
 * var p = 20374345, q = CeL.math.floor_sqrt(p = p * p - 1); CeL.log(q + '<br/>' + (q * q) + '<br/>' + p + '<br/>' + (++q * q));
 * @see
 * <a href="http://www.azillionmonkeys.com/qed/sqroot.html" accessdate="2010/3/11 18:37">Paul Hsieh's Square Root page</a>
 * <a href="http://www.embeddedrelated.com/usenet/embedded/show/114789-1.php" accessdate="2010/3/11 18:34">Suitable Integer Square Root Algorithm for 32-64-Bit Integers on Inexpensive Microcontroller? | Comp.Arch.Embedded | EmbeddedRelated.com</a>
 */
CeL.floor_sqrt=CeL.data.math.floor_sqrt=function(number){
	///	<summary>
	///	�o�쥭��ơA�۷��� Math.floor(Math.sqrt(number)).
	///	get integer square root
	///	</summary>
	///	<param name="positive" type="Number" optional="false">number</param>
	///	<returns>r, r^2 <= number < (r+1)^2</returns>
	///	<example>var p = 20374345, q = CeL.math.floor_sqrt(p = p * p - 1); CeL.log(q + '<br/>' + (q * q) + '<br/>' + p + '<br/>' + (++q * q));</example>
	///	<see>
	///	<a href="http://www.azillionmonkeys.com/qed/sqroot.html" accessdate="2010/3/11 18:37">Paul Hsieh's Square Root page</a>
	///	<a href="http://www.embeddedrelated.com/usenet/embedded/show/114789-1.php" accessdate="2010/3/11 18:34">Suitable Integer Square Root Algorithm for 32-64-Bit Integers on Inexpensive Microcontroller? | Comp.Arch.Embedded | EmbeddedRelated.com</a>
	///	</see>

};
/**
 * ���o�Y�ƪ���]�ơA�]������/���]�l����, factorization, get floor factor.
 * �ߤ@���ѩw�z(The Unique Factorization Theorem)�i�D�ڭ̯��]�l���ѬO�ߤ@���A�o�Y�O�٬���N�򥻩w�z (The Fundamental Theorem of Arithmeric) ���ƾǪ���ɫߡC
 * @param {Number} number
 * @return	{Array} [prime1,power1,prime2,power2,..]
 * @see
 * <a href="http://homepage2.nifty.com/m_kamada/math/10001.htm" accessdate="2010/3/11 18:7">Factorizations of 100...001</a>
 * @requires	floor_sqrt
 */
CeL.factorization=CeL.data.math.factorization=function(number){
	///	<summary>
	///	���o�Y�ƪ���]�ơA�]������/���]�l����, factorization, get floor factor.
	///	�ߤ@���ѩw�z(The Unique Factorization Theorem)�i�D�ڭ̯��]�l���ѬO�ߤ@���A�o�Y�O�٬���N�򥻩w�z (The Fundamental Theorem of Arithmeric) ���ƾǪ���ɫߡC
	///	</summary>
	///	<param name="number" type="Number" optional="false"/>
	///	<returns type="Array">[prime1,power1,prime2,power2,..]</returns>
	///	<see><a href="http://homepage2.nifty.com/m_kamada/math/10001.htm" accessdate="2010/3/11 18:7">Factorizations of 100...001</a></see>
	///	<requires>floor_sqrt</requires>

};
/**
 * VBScript has a Hex() function but JScript does not.
 * @param {Number} number
 * @return	{String} number in hex
 * @example
 * alert('0x'+CeL.hex(16725))
 */
CeL.hex=CeL.data.math.hex=function(number){
	///	<summary>VBScript has a Hex() function but JScript does not.</summary>
	///	<param name="number" type="Number" optional="false"/>
	///	<returns type="String">number in hex</returns>
	///	<example>alert('0x'+CeL.hex(16725))</example>

};
/**
 * �ɼƭp��C
 * ���ƪ��ɼƧY���ۨ��C�Y�n�D�o���ɤ��᪺�Ʀr�A�г]���t�ơC
 * @param {Number} number
 * @return	{Number} base	1: 1's Complement, 2: 2's Complement, (TODO: 3, 4, ..)
 * @example
 * alert(complement())
 * @see
 * http://www.tomzap.com/notes/DigitalSystemsEngEE316/1sAnd2sComplement.pdf
 * http://en.wikipedia.org/wiki/Method_of_complements
 * http://en.wikipedia.org/wiki/Signed_number_representations
 * @since	2010/3/12 23:47:52
 */
CeL.complement=CeL.data.math.complement=function(){
	///	<summary>
	///	�ɼƭp��C
	///	���ƪ��ɼƧY���ۨ��C�Y�n�D�o���ɤ��᪺�Ʀr�A�г]���t�ơC
	///	</summary>
	///	<param name="number" type="Number" optional="false"/>
	///	<returns type="Number">base	1: 1's Complement, 2: 2's Complement, (TODO: 3, 4, ..)</returns>
	///	<example>alert(complement())</example>
	///	<see>
	///	http://www.tomzap.com/notes/DigitalSystemsEngEE316/1sAnd2sComplement.pdf
	///	http://en.wikipedia.org/wiki/Method_of_complements
	///	http://en.wikipedia.org/wiki/Signed_number_representations
	///	</see>
	///	<since>2010/3/12 23:47:52</since>

};
/**
 * Hamming code
 * @class	Hamming Code �� constructor
 * @constructor
 */
CeL.Hamming=CeL.data.math.Hamming=function(){
	///	<summary>Hamming code</summary>
	///	<class>Hamming Code �� constructor</class>

};
/**
 * �O�_���k�A�ˡC
 * default: data[1,2,..] ���ܥk, reverse: data[..,2,1] �k�ܥ�
 * @memberOf	CeL.data.math.Hamming
 */
CeL.reverse=CeL.data.math.Hamming.reverse=false;
/**
 * encode data to Hamming Code.
 * @param data	data stream
 * @param no_reverse	forced NO reverse
 * @return	{String} encoded Hamming Code
 * @memberOf	CeL.data.math.Hamming
 */
CeL.encode=CeL.data.math.Hamming.encode=function(data, no_reverse){
	///	<summary>encode data to Hamming Code.</summary>
	///	<param name="data" type="" optional="false">data stream</param>
	///	<param name="no_reverse" type="" optional="false">forced NO reverse</param>
	///	<returns type="String">encoded Hamming Code</returns>
	///	<memberOf>CeL.data.math.Hamming</memberOf>

};
/**
 * �N Hamming Code ���� data & check bits
 * @param code	Hamming Code to split
 * @return	[��Ʀ줸 data bits, �ˬd�줸 check bits (parity bits)]
 * @memberOf	CeL.data.math.Hamming
 */
CeL.split_code=CeL.data.math.Hamming.split_code=function(code){
	///	<summary>�N Hamming Code ���� data & check bits</summary>
	///	<param name="code" type="" optional="false">Hamming Code to split</param>
	///	<returns>[��Ʀ줸 data bits, �ˬd�줸 check bits (parity bits)]</returns>
	///	<memberOf>CeL.data.math.Hamming</memberOf>

};
/**
 * decode Hamming Code to data
 * @param code
 * @return
 * @memberOf	CeL.data.math.Hamming
 */
CeL.decode=CeL.data.math.Hamming.decode=function(code){
	///	<summary>decode Hamming Code to data</summary>
	///	<param name="code" type="" optional="false"/>
	///	<returns/>
	///	<memberOf>CeL.data.math.Hamming</memberOf>

};
/**
 * ��� Hamming Code ���p���k
 * @param {Number} bit_length	bit length. e.g., 8, 16.
 * @memberOf	CeL.data.math.Hamming
 */
CeL.show=CeL.data.math.Hamming.show=function(bit_length){
	///	<summary>��� Hamming Code ���p���k</summary>
	///	<param name="bit_length" type="Number" optional="false">bit length. e.g., 8, 16.</param>
	///	<memberOf>CeL.data.math.Hamming</memberOf>

};
/**
 * null module constructor
 * @class �ƾǦh���������� function�C
 * @constructor
 */
CeL.polynomial=CeL.data.math.polynomial=function (){
	///	<summary>null module constructor</summary>
	///	<class>�ƾǦh���������� function�C</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.math.polynomial.prototype={};
/**
 * ���z�� rational number�A���z\u25968���^\u12398\u12388\u12367\u12427���X\u12399\u12375\u12400\u12375\u12400�B��\u12434�N��\u12377\u12427 quotient \u12398�Y��r\u12434\u12392\u12426�B�Ӧr\u12398 Q \u12391��\u12377�C<br/>
 * �Y�n��J���P�򩳪��ƭȡA�Х� parse_base()
 * @param	numerator	���l
 * @param	denominator	����
 * @param {Boolean} approximate	�������
 * @example
 * CeL.log((new CeL.quotient(3,4)).count('*',new CeL.quotient(2,7)).reduce().to_print_mode());
 * @class	quotient �� functions
 * @constructor
 */
CeL.quotient=CeL.data.math.quotient=function(numerator, denominator, approximate){
	///	<summary>
	///	���z�� rational number�A���z\u25968���^\u12398\u12388\u12367\u12427���X\u12399\u12375\u12400\u12375\u12400�B��\u12434�N��\u12377\u12427 quotient \u12398�Y��r\u12434\u12392\u12426�B�Ӧr\u12398 Q \u12391��\u12377�C<br/>
	///	�Y�n��J���P�򩳪��ƭȡA�Х� parse_base()
	///	</summary>
	///	<param name="numerator" type="" optional="false">���l</param>
	///	<param name="denominator" type="" optional="false">����</param>
	///	<param name="approximate" type="Boolean" optional="false">�������</param>
	///	<example>CeL.log((new CeL.quotient(3,4)).count('*',new CeL.quotient(2,7)).reduce().to_print_mode());</example>
	///	<class>quotient �� functions</class>

};
/**
 * �`���`���j�Ÿ��G {String} ���.�p��__repetend_separator__�`���`
 * @memberOf	CeL.data.math.quotient
 */
CeL.repetend_separator=CeL.data.math.quotient.repetend_separator='_';
/**
 * �Ʀr��
 * @memberOf	CeL.data.math.quotient
 * @see
 * <a href="http://en.wikipedia.org/wiki/Numerical_digit" accessdate="2010/4/16 20:47">Numerical digit</a>
 */
CeL.digit_char=CeL.data.math.quotient.digit_char='0123456789abcdefghijklmnopqrstuvwxyz';
/**
 * �ഫ���w�i�쪺�Ʀr���� quotient ����
 * @since	2004/7/9 16:13
 * @param number	�Ʀr
 * @param base	��
 * @param digit_char	�`���p�� digit �r��
 * @return	�^�� quotient ����A�Х� quotient.to_base() �Ǧ^�ұ��� base
 * @memberOf	CeL.data.math.quotient
 * @example
 * var q=parse_base('10000.'+_.repetend_separator+'3',11);
 * if(!q)
 * 	alert('bad input!');
 * else
 * 	library_namespace.debug('<br/>'+q.base(8)+','+q.base()+' , '+q.to_print_mode()+','+q.print(1)+','+q.to_print_mode(2)+','+q.to_print_mode(3,0,'',5));
 */
CeL.parse_base=CeL.data.math.quotient.parse_base=function(number, base, digit_char){
	///	<summary>�ഫ���w�i�쪺�Ʀr���� quotient ����</summary>
	///	<since>2004/7/9 16:13</since>
	///	<param name="number" type="" optional="false">�Ʀr</param>
	///	<param name="base" type="" optional="false">��</param>
	///	<param name="digit_char" type="" optional="false">�`���p�� digit �r��</param>
	///	<returns>�^�� quotient ����A�Х� quotient.to_base() �Ǧ^�ұ��� base</returns>
	///	<memberOf>CeL.data.math.quotient</memberOf>
	///	<example>
	///	var q=parse_base('10000.'+_.repetend_separator+'3',11);
	///	if(!q)
	///	alert('bad input!');
	///	else
	///	library_namespace.debug('<br/>'+q.base(8)+','+q.base()+' , '+q.to_print_mode()+','+q.print(1)+','+q.to_print_mode(2)+','+q.to_print_mode(3,0,'',5));
	///	</example>

};
/**
 * null module constructor
 * @class	native objects �� functions
 */
CeL.native=CeL.data.native=function(){
	///	<summary>null module constructor</summary>
	///	<class>native objects �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.native.prototype={};
/**
 * ��ܮ榡�Ƥ�� string
 * @param date_value	�n�ഫ�� date, �ȹL�p�ɷ��@�ɶ�, <0 �ন���U�ɶ�
 * @param {Number} mode	�n�ഫ�� mode
 * @param {Boolean} zero_fill	�� 0-9 �O�_�ɹs
 * @param {String} date_separator	date separator
 * @param {String} time_separator	time separator
 * @return	{String}	�榡�ƫ᪺���
 * @example
 * alert(format_date());
 * @since	2003/10/18 1:04 �ץ�
 * @since	2010/4/16 10:37:30	���c(refactoring)
 * @requires setTool,to_fixed
 * @see
 * http://www.merlyn.demon.co.uk/js-dates.htm,
 * http://aa.usno.navy.mil/data/docs/JulianDate.html
 * @memberOf	CeL.data.native
 */
CeL.format_date=CeL.data.native.format_date=function format_date(date_value, mode, zero_fill, date_separator, time_separator){
	///	<summary>��ܮ榡�Ƥ�� string</summary>
	///	<param name="date_value" type="" optional="false">�n�ഫ�� date, �ȹL�p�ɷ��@�ɶ�, <0 �ন���U�ɶ�</param>
	///	<param name="mode" type="Number" optional="false">�n�ഫ�� mode</param>
	///	<param name="zero_fill" type="Boolean" optional="false">�� 0-9 �O�_�ɹs</param>
	///	<param name="date_separator" type="String" optional="false">date separator</param>
	///	<param name="time_separator" type="String" optional="false">time separator</param>
	///	<returns type="String">�榡�ƫ᪺���</returns>
	///	<example>alert(format_date());</example>
	///	<since>2003/10/18 1:04 �ץ�</since>
	///	<since>2010/4/16 10:37:30	���c(refactoring)</since>
	///	<requires>setTool,to_fixed</requires>
	///	<see>
	///	http://www.merlyn.demon.co.uk/js-dates.htm,
	///	http://aa.usno.navy.mil/data/docs/JulianDate.html
	///	</see>
	///	<memberOf>CeL.data.native</memberOf>

};
/**
 * ��ƪ���r��Ķ/���o��ƪ��y�k
 * @param {Function|String} function_name	function name or function structure
 * @param flag	=1: reduce
 * @return
 * @example
 * parsed_data = new parse_function(function_name);
 * @see
 * http://www.interq.or.jp/student/exeal/dss/ref/jscript/object/function.html,
 * Syntax error: http://msdn.microsoft.com/library/en-us/script56/html/js56jserrsyntaxerror.asp
 * @memberOf	CeL.data.native
 * @since	2010/5/16 23:04:54
 */
CeL.parse_function=CeL.data.native.parse_function=function parse_function(function_name, flag){
	///	<summary>��ƪ���r��Ķ/���o��ƪ��y�k</summary>
	///	<param name="function_name" type="Function|String" optional="false">function name or function structure</param>
	///	<param name="flag" type="" optional="false">=1: reduce</param>
	///	<returns/>
	///	<example>parsed_data = new parse_function(function_name);</example>
	///	<see>
	///	http://www.interq.or.jp/student/exeal/dss/ref/jscript/object/function.html,
	///	Syntax error: http://msdn.microsoft.com/library/en-us/script56/html/js56jserrsyntaxerror.asp
	///	</see>
	///	<memberOf>CeL.data.native</memberOf>
	///	<since>2010/5/16 23:04:54</since>

};
/**
 * ��I���� charCodeAt �|�Ǧ^ >256 ���ƭȡC
 * �Y�T�w�s�X�O ASCII (char code �O 0~255) �Y�i�ϥΦ���ƴ��N charCodeAt�C
 * @param text	string
 * @param position	at what position
 * @return
 * @since	2008/8/2 10:10:49
 * @see
 * http://www.alanwood.net/demos/charsetdiffs.html
 * @memberOf	CeL.data.native
 */
CeL.toASCIIcode=CeL.data.native.toASCIIcode=function (text, position){
	///	<summary>
	///	��I���� charCodeAt �|�Ǧ^ >256 ���ƭȡC
	///	�Y�T�w�s�X�O ASCII (char code �O 0~255) �Y�i�ϥΦ���ƴ��N charCodeAt�C
	///	</summary>
	///	<param name="text" type="" optional="false">string</param>
	///	<param name="position" type="" optional="false">at what position</param>
	///	<returns/>
	///	<since>2008/8/2 10:10:49</since>
	///	<see>http://www.alanwood.net/demos/charsetdiffs.html</see>
	///	<memberOf>CeL.data.native</memberOf>

};
/**
 * String pattern (e.g., "/a+/g") to RegExp pattern.
 * qq// in perl.
 * String.prototype.toRegExp = function(f) { return to_RegExp_pattern(this.valueOf(), f); };
 * @param {String} pattern	pattern text
 * @param {Boolean|String} [RegExp_flag]	flags when need to return RegExp object
 * @param {RegExp} [escape_pattern]	char pattern need to escape
 * @return	{RegExp} RegExp object
 */
CeL.to_RegExp_pattern=CeL.data.native.to_RegExp_pattern=function(pattern, RegExp_flag, escape_pattern){
	///	<summary>
	///	String pattern (e.g., "/a+/g") to RegExp pattern.
	///	qq// in perl.
	///	String.prototype.toRegExp = function(f) { return to_RegExp_pattern(this.valueOf(), f); };
	///	</summary>
	///	<param name="pattern" type="String" optional="false">pattern text</param>
	///	<param name="RegExp_flag" type="Boolean|String" optional="true">flags when need to return RegExp object</param>
	///	<param name="escape_pattern" type="RegExp" optional="true">char pattern need to escape</param>
	///	<returns type="RegExp">RegExp object</returns>

};
/**
 * ���s�]�w RegExp object �� flag
 * @param {RegExp} regexp	RegExp object to set
 * @param {String} flag	flag of RegExp
 * @return	{RegExp}
 * @example
 * ���a 'g' flag �� RegExp ��ۦP�r��@ .test() �ɡA�ĤG���ä��|���]�C�]�����U���� expression �⦸�ä��|�o��ۦP���G�C
 * var r=/,/g,t='a,b';
 * WScript.Echo(r.test(t)+','+r.test(t));
 * 
 * //	�令�o�˴N�i�H�F�G
 * var r=/,/g,t='a,b',s=renew_RegExp_flag(r,'-g');
 * WScript.Echo(s.test(t)+','+s.test(t));
 * 
 * //	�o�˨S���D�G
 * r=/,/g,a='a,b';
 * if(r.test(a))alert(a.replace(r,'_'));
 * 
 * //	delete r.lastIndex; �L�ġA�o�� r.lastIndex=0; �]���U������i�G
 * if(r.global)r.lastIndex=0;
 * if(r.test(a)){~}
 * 
 * @see
 * http://msdn.microsoft.com/zh-tw/library/x9h97e00(VS.80).aspx,
 * �p�G�W�h�B�⦡�w�g�]�w�F����X�СAtest �N�|�q lastIndex �Ȫ��ܪ���m�}�l�j�M�r��C�p�G���]�w����X�СA�h test �|���L lastIndex �ȡA�ñq�r�ꤧ���}�l�j�M�C
 * http://www.aptana.com/reference/html/api/RegExp.html
 * @memberOf	CeL.data.native
 */
CeL.renew_RegExp_flag=CeL.data.native.renew_RegExp_flag=function(regexp, flag){
	///	<summary>���s�]�w RegExp object �� flag</summary>
	///	<param name="regexp" type="RegExp" optional="false">RegExp object to set</param>
	///	<param name="flag" type="String" optional="false">flag of RegExp</param>
	///	<returns type="RegExp"/>
	///	<example>
	///	���a 'g' flag �� RegExp ��ۦP�r��@ .test() �ɡA�ĤG���ä��|���]�C�]�����U���� expression �⦸�ä��|�o��ۦP���G�C
	///	var r=/,/g,t='a,b';
	///	WScript.Echo(r.test(t)+','+r.test(t));
	///	*
	///	//	�令�o�˴N�i�H�F�G
	///	var r=/,/g,t='a,b',s=renew_RegExp_flag(r,'-g');
	///	WScript.Echo(s.test(t)+','+s.test(t));
	///	*
	///	//	�o�˨S���D�G
	///	r=/,/g,a='a,b';
	///	if(r.test(a))alert(a.replace(r,'_'));
	///	*
	///	//	delete r.lastIndex; �L�ġA�o�� r.lastIndex=0; �]���U������i�G
	///	if(r.global)r.lastIndex=0;
	///	if(r.test(a)){~}
	///	*
	///	</example>
	///	<see>
	///	http://msdn.microsoft.com/zh-tw/library/x9h97e00(VS.80).aspx,
	///	�p�G�W�h�B�⦡�w�g�]�w�F����X�СAtest �N�|�q lastIndex �Ȫ��ܪ���m�}�l�j�M�r��C�p�G���]�w����X�СA�h test �|���L lastIndex �ȡA�ñq�r�ꤧ���}�l�j�M�C
	///	http://www.aptana.com/reference/html/api/RegExp.html
	///	</see>
	///	<memberOf>CeL.data.native</memberOf>

};
/**
 * ���ܤp�� d ��A
 * �F�]�G JScript�Y�Ϧb���[��B��ɡA�����٬O�|�X�{ 1.4000000000000001�B0.0999999999999998 ���ƭȡC����ƥi���� 1.4 �P 0.1�C
 * c.f., round()
 * @param {Number} digits	1,2,..: number of decimal places shown
 * @param {Number} [max]	max digits	max===0:round() else floor()
 * @return
 * @see
 * https://bugzilla.mozilla.org/show_bug.cgi?id=5856
 * IEEE754\u12398�Y\u12417�t��\u12399��\u12418���i\u12373\u12428\u12427ES3�u\u12496\u12464�v\u12391\u12354\u12427�C
 * http://www.jibbering.com/faq/#FAQ4_6
 * http://en.wikipedia.org/wiki/Rounding
 * @example
 * {var d=new Date,v=0.09999998,i=0,a;for(;i<100000;i++)a=v.to_fixed(2);alert(v+'\n��'+a+'\ntime:'+format_date(new Date-d));}
 * @memberOf	CeL.data.native
 */
CeL.to_fixed=CeL.data.native.to_fixed=function(digits, max){
	///	<summary>
	///	���ܤp�� d ��A
	///	�F�]�G JScript�Y�Ϧb���[��B��ɡA�����٬O�|�X�{ 1.4000000000000001�B0.0999999999999998 ���ƭȡC����ƥi���� 1.4 �P 0.1�C
	///	c.f., round()
	///	</summary>
	///	<param name="digits" type="Number" optional="false">1,2,..: number of decimal places shown</param>
	///	<param name="max" type="Number" optional="true">max digits	max===0:round() else floor()</param>
	///	<returns/>
	///	<see>
	///	https://bugzilla.mozilla.org/show_bug.cgi?id=5856
	///	IEEE754\u12398�Y\u12417�t��\u12399��\u12418���i\u12373\u12428\u12427ES3�u\u12496\u12464�v\u12391\u12354\u12427�C
	///	http://www.jibbering.com/faq/#FAQ4_6
	///	http://en.wikipedia.org/wiki/Rounding
	///	</see>
	///	<example>{var d=new Date,v=0.09999998,i=0,a;for(;i<100000;i++)a=v.to_fixed(2);alert(v+'\n��'+a+'\ntime:'+format_date(new Date-d));}</example>
	///	<memberOf>CeL.data.native</memberOf>

};
/**
 * check input string send to SQL server
 * @param {String} string	input string
 * @return	{String}	�ഫ�L�� string
 * @since	2006/10/27 16:36
 * @see
 * from lib/perl/BaseF.pm (or program/database/BaseF.pm)
 * @memberOf	CeL.data.native
 */
CeL.checkSQLInput=CeL.data.native.checkSQLInput=function(string){
	///	<summary>check input string send to SQL server</summary>
	///	<param name="string" type="String" optional="false">input string</param>
	///	<returns type="String">�ഫ�L�� string</returns>
	///	<since>2006/10/27 16:36</since>
	///	<see>from lib/perl/BaseF.pm (or program/database/BaseF.pm)</see>
	///	<memberOf>CeL.data.native</memberOf>

};
/**
 * check input string send to SQL server �åh���e�� space
 * @param {String} string	input string
 * @return	{String}	�ഫ�L�� string
 * @since	2006/10/27 16:36
 * @see
 * from lib/perl/BaseF.pm (or program/database/BaseF.pm)
 * function strip() @ Prototype JavaScript framework
 * @memberOf	CeL.data.native
 */
CeL.checkSQLInput_noSpace=CeL.data.native.checkSQLInput_noSpace=function(string){
	///	<summary>check input string send to SQL server �åh���e�� space</summary>
	///	<param name="string" type="String" optional="false">input string</param>
	///	<returns type="String">�ഫ�L�� string</returns>
	///	<since>2006/10/27 16:36</since>
	///	<see>
	///	from lib/perl/BaseF.pm (or program/database/BaseF.pm)
	///	function strip() @ Prototype JavaScript framework
	///	</see>
	///	<memberOf>CeL.data.native</memberOf>

};
/**
 * �ഫ�r�ꦨ�ƭȡA�]�A���Ƶ��C���ƥ�N�ର���ơC
 * @param {String} number	���ഫ����
 * @return
 * @memberOf	CeL.data.native
 */
CeL.parse_number=CeL.data.native.parse_number=function(number){
	///	<summary>�ഫ�r�ꦨ�ƭȡA�]�A���Ƶ��C���ƥ�N�ର���ơC</summary>
	///	<param name="number" type="String" optional="false">���ഫ����</param>
	///	<returns/>
	///	<memberOf>CeL.data.native</memberOf>

};
/**
 * null module constructor
 * @class	XML �ާ@������ function�C
 */
CeL.XML=CeL.data.XML=function(){
	///	<summary>null module constructor</summary>
	///	<class>XML �ާ@������ function�C</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.XML.prototype={};

//	null constructor for [CeL.data.code]
CeL.data.code=function(){};
CeL.data.code.prototype={};

/**
 * null module constructor
 * @class	�ۮe�� test �M�Ϊ� functions
 */
CeL.API=CeL.data.code.API=function(){
	///	<summary>null module constructor</summary>
	///	<class>�ۮe�� test �M�Ϊ� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.code.API.prototype={};
/**
 * �۰ʬD�� domain
 * @param	API	API name
 * @param	callback	null: do NOT load
 * @return	[ API url, API key ]
 * @since	2010/6/20 22:12:23
 * @see
 * 
 */
CeL.use_API=CeL.data.code.API.use_API=function(API, callback){
	///	<summary>�۰ʬD�� domain</summary>
	///	<param name="API" type="" optional="false">API name</param>
	///	<param name="callback" type="" optional="false">null: do NOT load</param>
	///	<returns>[ API url, API key ]</returns>
	///	<since>2010/6/20 22:12:23</since>
	///	<see>*</see>

};
/**
 * �y�t. e.g., zh-TW, ja, en
 */
CeL.language=CeL.data.code.API.use_API.language='zh-TW';
/**
 * �� Microsoft Translator �]�m
 * @param text	test to translate
 * @param callback	callback(from text,to text)
 * @param [from_enc]
 * @param [to_enc]
 * @return
 * @see
 * <a href="http://msdn.microsoft.com/en-us/library/ff512406.aspx" accessdate="2010/7/12 20:22">Translate Method</a>,
 * <a href="http://www.west-wind.com/Weblog/posts/107136.aspx" accessdate="2010/7/12 20:22">JSONP for cross-site Callbacks - Rick Strahl's Web Log</a>
 */
CeL.add_Microsoft_translate=CeL.data.code.API.add_Microsoft_translate=function(text, callback, from_enc, to_enc){
	///	<summary>�� Microsoft Translator �]�m</summary>
	///	<param name="text" type="" optional="false">test to translate</param>
	///	<param name="callback" type="" optional="false">callback(from text,to text)</param>
	///	<param name="from_enc" type="" optional="true"/>
	///	<param name="to_enc" type="" optional="true"/>
	///	<returns/>
	///	<see>
	///	<a href="http://msdn.microsoft.com/en-us/library/ff512406.aspx" accessdate="2010/7/12 20:22">Translate Method</a>,
	///	<a href="http://www.west-wind.com/Weblog/posts/107136.aspx" accessdate="2010/7/12 20:22">JSONP for cross-site Callbacks - Rick Strahl's Web Log</a>
	///	</see>

};
/**
 * null module constructor
 * @class	�ۮe�� test �M�Ϊ� functions
 */
CeL.compatibility=CeL.data.code.compatibility=function(){
	///	<summary>null module constructor</summary>
	///	<class>�ۮe�� test �M�Ϊ� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.code.compatibility.prototype={};
/**
 * Are we in a web environment?
 * @param W3CDOM	Are we in a W3C DOM environment?
 * @return	We're in a web environment.
 * @since	2009/12/29 19:18:53
 * @see
 * use lazy evaluation
 * @memberOf	CeL.data.code.compatibility
 */
CeL.is_web=CeL.data.code.compatibility.is_web=function is_web(W3CDOM){
	///	<summary>Are we in a web environment?</summary>
	///	<param name="W3CDOM" type="" optional="false">Are we in a W3C DOM environment?</param>
	///	<returns>We're in a web environment.</returns>
	///	<since>2009/12/29 19:18:53</since>
	///	<see>use lazy evaluation</see>
	///	<memberOf>CeL.data.code.compatibility</memberOf>

};
/**
 * �P�_�� DOM�C
 * @param	name	various name @ name-space window. e.g., document, location
 * @return	{Boolean}	various is object of window
 * @since	2010/1/14 22:04:37
 * @memberOf	CeL.data.code.compatibility
 */
CeL.is_DOM=CeL.data.code.compatibility.is_DOM=function(name){
	///	<summary>�P�_�� DOM�C</summary>
	///	<param name="name" type="" optional="false">various name @ name-space window. e.g., document, location</param>
	///	<returns type="Boolean">various is object of window</returns>
	///	<since>2010/1/14 22:04:37</since>
	///	<memberOf>CeL.data.code.compatibility</memberOf>

};
/**
 * Are we run in HTA?<br/>
 * ** HTA �����Ӧb onload ���I�s�A�_�h document.getElementsByTagName ���|���F��I
 * @param [id]	HTA tag id (only used in low version that we have no document.getElementsByTagName)
 * @return	We're in HTA
 * @require	is_web
 * @since	2009/12/29 19:18:53
 * @memberOf	CeL.data.code.compatibility
 * @see
 * http://msdn2.microsoft.com/en-us/library/ms536479.aspx
 * http://www.microsoft.com/technet/scriptcenter/resources/qanda/apr05/hey0420.mspx
 * http://www.msfn.org/board/lofiversion/index.php/t61847.html
 * lazy evaluation
 * http://peter.michaux.ca/articles/lazy-function-definition-pattern
 */
CeL.is_HTA=CeL.data.code.compatibility.is_HTA=function is_HTA(id){
	///	<summary>
	///	Are we run in HTA?<br/>
	///	** HTA �����Ӧb onload ���I�s�A�_�h document.getElementsByTagName ���|���F��I
	///	</summary>
	///	<param name="id" type="" optional="true">HTA tag id (only used in low version that we have no document.getElementsByTagName)</param>
	///	<returns>We're in HTA</returns>
	///	<require>is_web</require>
	///	<since>2009/12/29 19:18:53</since>
	///	<memberOf>CeL.data.code.compatibility</memberOf>
	///	<see>
	///	http://msdn2.microsoft.com/en-us/library/ms536479.aspx
	///	http://www.microsoft.com/technet/scriptcenter/resources/qanda/apr05/hey0420.mspx
	///	http://www.msfn.org/board/lofiversion/index.php/t61847.html
	///	lazy evaluation
	///	http://peter.michaux.ca/articles/lazy-function-definition-pattern
	///	</see>

};
/**
 * null module constructor
 * @class �{���X���㭫�c������ functions�C
 * @constructor
 */
CeL.reorganize=CeL.data.code.reorganize=function (){
	///	<summary>null module constructor</summary>
	///	<class>�{���X���㭫�c������ functions�C</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.data.code.reorganize.prototype={};
/**
 * ���o[script_filename].wsf�����]�A�ۤv�][script_filename].js�^�A��l�Ҧ� .js ��code�C
 * @param {String} script_filename	script filename
 * @return
 * @requires ScriptName,simpleRead
 * @deprecated	�Y�Q�b�C�������Q��eval(get_all_functions(ScriptName))�Ӹɨ��A���ɷ|�X�{�_�Ǫ��{�H�A�٬O�O�Φn�F�C
 * @memberOf CeL.data.code.reorganize
 */
CeL.get_all_functions=CeL.data.code.reorganize.get_all_functions=function (script_filename){
	///	<summary>���o[script_filename].wsf�����]�A�ۤv�][script_filename].js�^�A��l�Ҧ� .js ��code�C</summary>
	///	<param name="script_filename" type="String" optional="false">script filename</param>
	///	<returns/>
	///	<requires>ScriptName,simpleRead</requires>
	///	<deprecated>�Y�Q�b�C�������Q��eval(get_all_functions(ScriptName))�Ӹɨ��A���ɷ|�X�{�_�Ǫ��{�H�A�٬O�O�Φn�F�C</deprecated>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};
/**
 * �N�U function �[�J�ɮפ��A�i���� HTML ��i�Τ��榡�C
 * @example
 * add_code('�ƻs -backup.js');
 * @param file_name	file name (list)
 * @param Vlist	�h�[�K�� function/various list
 * @param {String} start_string	start string
 * @param {String} end_string	ending string
 * @returns
 * @request	NewLine,is_file,simpleRead,autodetectEncode,generate_code,JSalert,setTool,*setTool();
 * @memberOf	CeL.data.code.reorganize
 */
CeL.add_code=CeL.data.code.reorganize.add_code=function (file_name, Vlist, start_string, end_string){
	///	<summary>�N�U function �[�J�ɮפ��A�i���� HTML ��i�Τ��榡�C</summary>
	///	<example>add_code('�ƻs -backup.js');</example>
	///	<param name="file_name" type="" optional="false">file name (list)</param>
	///	<param name="Vlist" type="" optional="false">�h�[�K�� function/various list</param>
	///	<param name="start_string" type="String" optional="false">start string</param>
	///	<param name="end_string" type="String" optional="false">ending string</param>
	///	<returns/>
	///	<request>NewLine,is_file,simpleRead,autodetectEncode,generate_code,JSalert,setTool,*setTool();</request>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};
/**
 * add libary use
 * @param	{String} code	script code
 * @returns 
 * @memberOf	CeL.data.code.reorganize
 */
CeL.add_use=CeL.data.code.reorganize.add_use=function (code){
	///	<summary>add libary use</summary>
	///	<param name="code" type="String" optional="false">script code</param>
	///	<returns/>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};
/**
 * script �׵��̡K
 * @param	{String} code	script code
 * @param	addFN
 * @returns	error no. 
 * @memberOf	CeL.data.code.reorganize
 */
CeL.destory_script=CeL.data.code.reorganize.destory_script=function (code, addFN){
	///	<summary>script �׵��̡K</summary>
	///	<param name="code" type="String" optional="false">script code</param>
	///	<param name="addFN" type="" optional="false"/>
	///	<returns>error no.</returns>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};
/**
 * �Q��[*�{��������*]���ܼƳ]�w�ͦ�code�A�]���ä��৹�����{�Ҧ��]�w�A�]�L�k�P�O��ƶ����ۨ����Y�C
 * @param {Array} Vlist	�ܼ� list
 * @param {String} new_line	new line
 * @param {String} direct_input	������J�ο��ѽX
 * @requires	set_obj_value,dQuote
 * @memberOf	CeL.data.code.reorganize
 */
CeL.generate_code=CeL.data.code.reorganize.generate_code=function (Vlist, new_line, direct_input){
	///	<summary>�Q��[*�{��������*]���ܼƳ]�w�ͦ�code�A�]���ä��৹�����{�Ҧ��]�w�A�]�L�k�P�O��ƶ����ۨ����Y�C</summary>
	///	<param name="Vlist" type="Array" optional="false">�ܼ� list</param>
	///	<param name="new_line" type="String" optional="false">new line</param>
	///	<param name="direct_input" type="String" optional="false">������J�ο��ѽX</param>
	///	<requires>set_obj_value,dQuote</requires>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};

//	null constructor for [CeL.data.code.reorganize._]
CeL.data.code.reorganize._=function(){};
CeL.data.code.reorganize._.prototype={};


//	null constructor for [CeL.data.code.reorganize._.generate_code]
CeL.data.code.reorganize._.generate_code=function(){};
CeL.data.code.reorganize._.generate_code.prototype={};

/**
 * default direct input symbol
 * @type	String
 * @memberOf	CeL.data.code.reorganize
 */
CeL.ddI=CeL.data.code.reorganize._.generate_code.ddI='*';
/**
 * default separator
 * @type	String
 * @memberOf	CeL.data.code.reorganize
 */
CeL.dsp=CeL.data.code.reorganize._.generate_code.dsp=',';
/**
 * ���͵L�Ϊ��U���X
 * @param length	\d || \d-\d
 * @returns	{String}	�L�Ϊ��U���X
 * @see
 * @memberOf	CeL.data.code.reorganize
 */
CeL.null_code=CeL.data.code.reorganize.null_code=function (length, type){
	///	<summary>���͵L�Ϊ��U���X</summary>
	///	<param name="length" type="" optional="false">\d || \d-\d</param>
	///	<returns type="String">�L�Ϊ��U���X</returns>
	///	<see/>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};
/**
 * ��²�{���X�G�h�����ѻP\s\n�C
 * use for JSON (JavaScript Object Notation)
 * @param code	����²���{���X
 * @param mode	mode=1:''��unicode��\uHHHH
 * @returns	{String}	��²�ᤧ�{���X
 * @example
 * CeL.use('code.reorganize');
 * CeL.reduce_code('a + v  = ddd;');
 * @see
 * @requires	
 * @memberOf	CeL.data.code.reorganize
 */
CeL.reduce_code=CeL.data.code.reorganize.reduce_code=function (code, mode){
	///	<summary>
	///	��²�{���X�G�h�����ѻP\s\n�C
	///	use for JSON (JavaScript Object Notation)
	///	</summary>
	///	<param name="code" type="" optional="false">����²���{���X</param>
	///	<param name="mode" type="" optional="false">mode=1:''��unicode��\uHHHH</param>
	///	<returns type="String">��²�ᤧ�{���X</returns>
	///	<example>
	///	CeL.use('code.reorganize');
	///	CeL.reduce_code('a + v  = ddd;');
	///	</example>
	///	<see/>
	///	<requires/>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};
/**
 * ��²����ɪ��{���X
 * �Kand test�{���O�_���y�k�����B�]�Ҧp�S�[';'�^
 * @param original_ScriptFileName	origin javascript file name
 * @param output_ScriptFileName	target javascript file name
 * @param flag
 * 	flag={doTest:bool,doReport:bool,outEnc:(enc),copyOnFailed:bool,startFrom:// | '',addBefore:'',runBefore:function}
 * 	startFrom �Y�� // �h���� startAfter!!
 * @requires	autodetectEncode,simpleRead,simpleWrite,reduce_code,is_file
 * @deprecated use <a href="http://closure-compiler.appspot.com/" accessdate="2009/12/3 12:13">Closure Compiler Service</a>
 * @memberOf	CeL.data.code.reorganize
 */
CeL.reduce_script=CeL.data.code.reorganize.reduce_script=function (original_ScriptFileName, output_ScriptFileName, flag){
	///	<summary>
	///	��²����ɪ��{���X
	///	�Kand test�{���O�_���y�k�����B�]�Ҧp�S�[';'�^
	///	</summary>
	///	<param name="original_ScriptFileName" type="" optional="false">origin javascript file name</param>
	///	<param name="output_ScriptFileName" type="" optional="false">target javascript file name</param>
	///	<param>
	///	flag
	///	flag={doTest:bool,doReport:bool,outEnc:(enc),copyOnFailed:bool,startFrom:// | '',addBefore:'',runBefore:function}
	///	startFrom �Y�� // �h���� startAfter!!
	///	</param>
	///	<requires>autodetectEncode,simpleRead,simpleWrite,reduce_code,is_file</requires>
	///	<deprecated>use <a href="http://closure-compiler.appspot.com/" accessdate="2009/12/3 12:13">Closure Compiler Service</a></deprecated>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};
/**
 * �Y�� HTML �� .js�j�p+�۰ʧP�O�C
 * TODO:
 * �۰ʿ�� target ���Ҧ��]���@�w�O .ori�^
 * @param flag	flag
 * @requires	reduce_script
 * @since	2008/7/31 17:40:40
 * @memberOf	CeL.data.code.reorganize
 */
CeL.rJS=CeL.data.code.reorganize.rJS=function (flag){
	///	<summary>
	///	�Y�� HTML �� .js�j�p+�۰ʧP�O�C
	///	TODO:
	///	�۰ʿ�� target ���Ҧ��]���@�w�O .ori�^
	///	</summary>
	///	<param name="flag" type="" optional="false">flag</param>
	///	<requires>reduce_script</requires>
	///	<since>2008/7/31 17:40:40</since>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};
/**
* for �ޥΡG�@include library �� registry ���� path
* @since	2009/11/25 22:59:02
* @_memberOf	_module_
*/
CeL.library_loader_by_registry=CeL.data.code.reorganize.library_loader_by_registry=function (){
	///	<summary>
	///	* for �ޥΡG�@include library �� registry ���� path
	///	* @since	2009/11/25 22:59:02
	///	* @_memberOf	_module_
	///	</summary>

};
/**
* get various from code
* @param {String} code	�{���X
* @param {Boolean} fill_code	(TODO) ���u�O�w�q�A�b .code ��J�{���X�C
* @return	{Object}	root namespace
* @since	2009/12/5 15:04:42, 2009/12/20 14:33:30, 2010/7/7 10:58:22
* @_memberOf	_module_
*/
CeL.get_various_from_code=CeL.data.code.reorganize.get_various_from_code=function (code, fill_code){
	///	<summary>
	///	* get various from code
	///	* @param {String} code	�{���X
	///	* @param {Boolean} fill_code	(TODO) ���u�O�w�q�A�b .code ��J�{���X�C
	///	* @return	{Object}	root namespace
	///	* @since	2009/12/5 15:04:42, 2009/12/20 14:33:30, 2010/7/7 10:58:22
	///	* @_memberOf	_module_
	///	</summary>

};
/**
* �� get_various_from_code �ͦ��� namespace �ন code
* @param	{Object} ns	root namespace
* @param	{String} [prefix]	(TODO) prefix of root namespace
* @param	{Array}	[code_array]	inner use, please don't specify this value.
* @return	{String}	code
* @since	2009/12/20 14:51:52
* @_memberOf	_module_
*/
CeL.get_code_from_generated_various=CeL.data.code.reorganize.get_code_from_generated_various=function (ns, prefix, code_array){
	///	<summary>
	///	* �� get_various_from_code �ͦ��� namespace �ন code
	///	* @param	{Object} ns	root namespace
	///	* @param	{String} [prefix]	(TODO) prefix of root namespace
	///	* @param	{Array}	[code_array]	inner use, please don't specify this value.
	///	* @return	{String}	code
	///	* @since	2009/12/20 14:51:52
	///	* @_memberOf	_module_
	///	</summary>

};

//	null constructor for [CeL.interact]
CeL.interact=function(){};
CeL.interact.prototype={};

/**
 * null module constructor
 * @class	web �� functions
 */
CeL.DOM=CeL.interact.DOM=function(){
	///	<summary>null module constructor</summary>
	///	<class>web �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.interact.DOM.prototype={};
/**
 * �P�_�O�_�� HTML Element�C
 * @param	value	value to test
 * @return	{Boolean}	value is HTML Element
 * @since	2010/6/23 02:32:41
 * @memberOf	CeL.interact.DOM
 * @see
 * http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-58190037,
 * http://www.w3.org/DOM/
 */
CeL.is_HTML_element=CeL.interact.DOM.is_HTML_element=function(value){
	///	<summary>�P�_�O�_�� HTML Element�C</summary>
	///	<param name="value" type="" optional="false">value to test</param>
	///	<returns type="Boolean">value is HTML Element</returns>
	///	<since>2010/6/23 02:32:41</since>
	///	<memberOf>CeL.interact.DOM</memberOf>
	///	<see>
	///	http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-58190037,
	///	http://www.w3.org/DOM/
	///	</see>

};
/**
 * �P�_�����w nodeType �� HTML Element�C
 * @param	value	value to test
 * @param	type	type
 * @return	{Boolean}	value is the type of HTML Element
 * @since	2010/6/23 02:32:41
 * @memberOf	CeL.interact.DOM
 * @see
 * http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-58190037,
 * http://www.w3.org/DOM/
 */
CeL.is_HTML_element_type=CeL.interact.DOM.is_HTML_element_type=function(value, type){
	///	<summary>�P�_�����w nodeType �� HTML Element�C</summary>
	///	<param name="value" type="" optional="false">value to test</param>
	///	<param name="type" type="" optional="false">type</param>
	///	<returns type="Boolean">value is the type of HTML Element</returns>
	///	<since>2010/6/23 02:32:41</since>
	///	<memberOf>CeL.interact.DOM</memberOf>
	///	<see>
	///	http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-58190037,
	///	http://www.w3.org/DOM/
	///	</see>

};
/**
 * �P�_�� HTML Element�C
 * @param	value	value to test
 * @return	{Boolean}	value is HTML Element
 * @since	2010/6/23 02:32:41
 * @memberOf	CeL.interact.DOM
 * @see
 * http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-58190037,
 * http://www.w3.org/DOM/
 */
CeL.is_element_node=CeL.interact.DOM.is_element_node=function(value){
	///	<summary>�P�_�� HTML Element�C</summary>
	///	<param name="value" type="" optional="false">value to test</param>
	///	<returns type="Boolean">value is HTML Element</returns>
	///	<since>2010/6/23 02:32:41</since>
	///	<memberOf>CeL.interact.DOM</memberOf>
	///	<see>
	///	http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-58190037,
	///	http://www.w3.org/DOM/
	///	</see>

};
/**
 * toggle/swap display and visibility.
 * display:none or visibility:hidden.
 * TODO: computed style
 * @param element	HTML element
 * @param	{String|Number} type	show or hidden or set the status type:
 * 			{Number} type: 0: hidden(��none), 1: show(��block), 2||undefined: switch, others: get status only with no change
 * 			{String} type: set CSS: display type: none, '', block, inline, list-item. ��L���y�� error?
 * @return	display status
 * @since	2010/4/1 10:24:43 rewrite
 * @see
 * http://www.w3schools.com/CSS/pr_class_visibility.asp
 * http://www.w3schools.com/css/pr_class_display.asp
 * http://www.javaeye.com/topic/140784
 * 	�q�Lelement.style��H�u����o���p���˦��A�]�N�O���u����ohtml���Ҹ̼g���ݩʡC 
 * @requires	[_.get_element],[_.get_style]
 * @memberOf	CeL.interact.DOM
 */
CeL.toggle_display=CeL.interact.DOM.toggle_display=function(element, type){
	///	<summary>
	///	toggle/swap display and visibility.
	///	display:none or visibility:hidden.
	///	TODO: computed style
	///	</summary>
	///	<param name="element" type="" optional="false">HTML element</param>
	///	<param>
	///	{String|Number} type	show or hidden or set the status type:
	///	{Number} type: 0: hidden(��none), 1: show(��block), 2||undefined: switch, others: get status only with no change
	///	{String} type: set CSS: display type: none, '', block, inline, list-item. ��L���y�� error?
	///	</param>
	///	<returns>display status</returns>
	///	<since>2010/4/1 10:24:43 rewrite</since>
	///	<see>
	///	http://www.w3schools.com/CSS/pr_class_visibility.asp
	///	http://www.w3schools.com/css/pr_class_display.asp
	///	http://www.javaeye.com/topic/140784
	///	�q�Lelement.style��H�u����o���p���˦��A�]�N�O���u����ohtml���Ҹ̼g���ݩʡC
	///	</see>
	///	<requires>[_.get_element],[_.get_style]</requires>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * replace HTML
 * @param o
 * @param html
 * @return
 * @memberOf	CeL.interact.DOM
 */
CeL.replace_HTML=CeL.interact.DOM.replace_HTML=function(o, html){
	///	<summary>replace HTML</summary>
	///	<param name="o" type="" optional="false"/>
	///	<param name="html" type="" optional="false"/>
	///	<returns/>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * ���� node.
 * TODO:
 * also remove event handlers
 * @param o
 * @param tag	tag===1: only child, undefined: remove only self, others: only <tag> child
 * @return
 * @memberOf	CeL.interact.DOM
 */
CeL.remove_node=CeL.interact.DOM.remove_node=function remove_node(o, tag){
	///	<summary>
	///	���� node.
	///	TODO:
	///	also remove event handlers
	///	</summary>
	///	<param name="o" type="" optional="false"/>
	///	<param name="tag" type="" optional="false">tag===1: only child, undefined: remove only self, others: only <tag> child</param>
	///	<returns/>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * set/get/remove attribute of a element<br/>
 * in IE: setAttribute does not work when used with the style attribute (or with event handlers, for that matter).
 * @param _e	element
 * @param propertyO	attributes object (array if you just want to get)
 * @return
 * @requires	split_String_to_Object
 * @see
 * setAttribute,getAttribute,removeAttribute
 * http://www.quirksmode.org/blog/archives/2006/04/ie_7_and_javasc.html
 * @since	2006/12/10 21:25 ���� separate from XML_node()
 * @memberOf	CeL.interact.DOM
 */
CeL.set_attribute=CeL.interact.DOM.set_attribute=function(_e, propertyO, ns){
	///	<summary>
	///	set/get/remove attribute of a element<br/>
	///	in IE: setAttribute does not work when used with the style attribute (or with event handlers, for that matter).
	///	</summary>
	///	<param name="_e" type="" optional="false">element</param>
	///	<param name="propertyO" type="" optional="false">attributes object (array if you just want to get)</param>
	///	<returns/>
	///	<requires>split_String_to_Object</requires>
	///	<see>
	///	setAttribute,getAttribute,removeAttribute
	///	http://www.quirksmode.org/blog/archives/2006/04/ie_7_and_javasc.html
	///	</see>
	///	<since>2006/12/10 21:25 ���� separate from XML_node()</since>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * append children node to specified element
 * @param node	node / node id
 * @param child_list	children node array
 * @return
 * @since	2007/1/20 14:12
 * @memberOf	CeL.interact.DOM
 */
CeL.add_node=CeL.interact.DOM.add_node=function add_node(node, child_list){
	///	<summary>append children node to specified element</summary>
	///	<param name="node" type="" optional="false">node / node id</param>
	///	<param name="child_list" type="" optional="false">children node array</param>
	///	<returns/>
	///	<since>2007/1/20 14:12</since>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * �Ыطs�� DOM �`�I(node)�C
 * createNode() ���\��ɥR�[�j���C
 * TODO: ���Υ\��(set_attrib, add_child, ..), ²��
 * @param	{Object|Array} nodes	node structure
 * @param	{String|Array|HTMLElement} [layer]	where to layer this node. e.g., parent node
 * @return	{HTMLElement}	new node created
 * @since	2010/6/21 13:45:02
 */
CeL.new_node=CeL.interact.DOM.new_node=function(nodes, layer){
	///	<summary>
	///	�Ыطs�� DOM �`�I(node)�C
	///	createNode() ���\��ɥR�[�j���C
	///	TODO: ���Υ\��(set_attrib, add_child, ..), ²��
	///	</summary>
	///	<param name="nodes" type="Object|Array" optional="false">node structure</param>
	///	<param name="layer" type="String|Array|HTMLElement" optional="true" domElement="true">where to layer this node. e.g., parent node</param>
	///	<returns type="HTMLElement">new node created</returns>
	///	<since>2010/6/21 13:45:02</since>

};
/**
 * create new HTML/XML <a href="https://developer.mozilla.org/en/DOM/node">node</a>(<a href="https://developer.mozilla.org/en/DOM/element">element</a>)
 * @param tag	tag name
 * @param propertyO	attributes object
 * @param insertBeforeO	object that we wnat to insert before it
 * @param innerObj	inner object(s)
 * @param styleO	style object
 * @return	node object created
 * @requires	set_attribute,add_node
 * @since	2006/9/6 20:29,11/12 22:13
 * @memberOf	CeL.interact.DOM
 */
CeL.XML_node=CeL.interact.DOM.XML_node=function(tag, propertyO, insertBeforeO, innerObj, styleO){
	///	<summary>create new HTML/XML <a href="https://developer.mozilla.org/en/DOM/node">node</a>(<a href="https://developer.mozilla.org/en/DOM/element">element</a>)</summary>
	///	<param name="tag" type="" optional="false">tag name</param>
	///	<param name="propertyO" type="" optional="false">attributes object</param>
	///	<param name="insertBeforeO" type="" optional="false">object that we wnat to insert before it</param>
	///	<param name="innerObj" type="" optional="false">inner object(s)</param>
	///	<param name="styleO" type="" optional="false">style object</param>
	///	<returns>node object created</returns>
	///	<requires>set_attribute,add_node</requires>
	///	<since>2006/9/6 20:29,11/12 22:13</since>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * �]�w HTML element �� text�C
 * ��IIE�PMoz���P��text���o��k�C�{���q������innerText�A���ӥΦ���ƨӨ��o�γ]�w����text�C
 * TODO: DOM: ��.nodeValue
 * @param element	HTML element
 * @param {String} text	the text to be set
 * @return
 * @see
 * http://www.klstudio.com/post/94.html
 * @memberOf	CeL.interact.DOM
 */
CeL.set_text=CeL.interact.DOM.set_text=function (element, text){
	///	<summary>
	///	�]�w HTML element �� text�C
	///	��IIE�PMoz���P��text���o��k�C�{���q������innerText�A���ӥΦ���ƨӨ��o�γ]�w����text�C
	///	TODO: DOM: ��.nodeValue
	///	</summary>
	///	<param name="element" type="" optional="false">HTML element</param>
	///	<param name="text" type="String" optional="false">the text to be set</param>
	///	<returns/>
	///	<see>http://www.klstudio.com/post/94.html</see>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * fill data to table.
 * �W�[ table ���C(row)
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
 * @memberOf	CeL.interact.DOM
 * @see
 * http://www.datatables.net/
 */
CeL.table_list=CeL.interact.DOM.table_list=function(data, table, header, do_clean){
	///	<summary>
	///	fill data to table.
	///	�W�[ table ���C(row)
	///	</summary>
	///	<param name="data" type="Array|Object" optional="false">data list</param>
	///	<param name="table" type="" optional="false">table element</param>
	///	<param name="header" type="Array" optional="false">header list</param>
	///	<returns/>
	///	<example>
	///	table_list([list1],[list2],..)
	///	e.g.,	table_list([1,2,3,4],[4,5,3,4]);
	///	table_list([[list1],[list2],..])
	///	e.g.,	table_list( [ [1,2,3,4],[4,5,3,4] ] );
	///	</example>
	///	<since>2010/05/03 14:13:18</since>
	///	<memberOf>CeL.interact.DOM</memberOf>
	///	<see>http://www.datatables.net/</see>

};
/**
 * Parses URI
 * @param {String} URI	URI to parse
 * @return	parsed object
 * @example
 * alert(parse_URI('ftp://user:cgh@dr.fxgv.sfdg:4231/3452/dgh.rar?fg=23#hhh').hostname);
 * @since	2010/4/13 23:53:14 from parseURI+parseURL
 * @memberOf	CeL.interact.DOM
 * @see
 * RFC 1738, RFC 2396, RFC 3986,
 * Uniform Resource Identifier (URI): Generic Syntax,
 * http://tools.ietf.org/html/rfc3987,
 * http://flanders.co.nz/2009/11/08/a-good-url-regular-expression-repost/,
 * http://www.mattfarina.com/2009/01/08/rfc-3986-url-validation,
 * also see batURL.htm
 */
CeL.parse_URI=CeL.interact.DOM.parse_URI=function(URI){
	///	<summary>Parses URI</summary>
	///	<param name="URI" type="String" optional="false">URI to parse</param>
	///	<returns>parsed object</returns>
	///	<example>alert(parse_URI('ftp://user:cgh@dr.fxgv.sfdg:4231/3452/dgh.rar?fg=23#hhh').hostname);</example>
	///	<since>2010/4/13 23:53:14 from parseURI+parseURL</since>
	///	<memberOf>CeL.interact.DOM</memberOf>
	///	<see>
	///	RFC 1738, RFC 2396, RFC 3986,
	///	Uniform Resource Identifier (URI): Generic Syntax,
	///	http://tools.ietf.org/html/rfc3987,
	///	http://flanders.co.nz/2009/11/08/a-good-url-regular-expression-repost/,
	///	http://www.mattfarina.com/2009/01/08/rfc-3986-url-validation,
	///	also see batURL.htm
	///	</see>

};
/**
 * �]�wdocument.cookie.
 * You can store up to 20 name=value pairs in a cookie, and the cookie is always returned as a string of all the cookies that apply to the page.
 * TODO:
 * HTML5 localStorage (name/value item pairs).
 * test various values.
 * document.cookie.setPath("/");

 * @example
	�d�ҡG
//	delete domain
set_cookie('domain',0);
//	�@�Ӥ�(30 days)
set_cookie('expires',30);
//	�]�wname���Ȭ�jj
set_cookie(name,'jj');
//	�]�wname���Ȭ�56
set_cookie(name,56);
//	���hname
set_cookie(name);
//	�]����host�����ϥ�
set_cookie(_.set_cookie.f.set_root);
//	�]����domain�ϥ�
set_cookie(_.set_cookie.f.set_domain);
//	�̲{���]�w���h�Ҧ���
set_cookie(_.set_cookie.f.delete_all);
//	���h�Ҧ���
set_cookie(_.set_cookie.f.delete_all_root);
//	�ä[�x�s�]�d�~�^
set_cookie(_.set_cookie.f.forever);
//	�ǽT�]�w�o����u�b�o���s���ϥγo��cookie�A�]�i��set_cookie('expires',-1);
set_cookie(_.set_cookie.f.moment);
//	�Nexpires�]�w��forever��moment��A��^�ӡ]���[expires�]�w�^
set_cookie('expires',0);

 * @param {String|Object|_module_.set_cookie.f} name	set_cookie.f flag | varoius name
 * @param value	varoius value
 * @param {Boolean|Object} config	�Y���S���]�w�ȼȮɳ]�w�ɡA�]�w�����C
 * @returns
 * @see
 * Chrome doesn't support cookies for local files unless you start it with the --enable-file-cookies flag.
 * chrome.exe --allow-file-access-from-files --enable-extension-timeline-api --enable-file-cookies
 * http://stackoverflow.com/questions/335244/why-does-chrome-ignore-local-jquery-cookies
 * http://code.google.com/p/chromium/issues/detail?id=535
 * @memberOf	CeL.interact.DOM
 */
CeL.set_cookie=CeL.interact.DOM.set_cookie=function (name, value, config){
	///	<summary>
	///	�]�wdocument.cookie.
	///	You can store up to 20 name=value pairs in a cookie, and the cookie is always returned as a string of all the cookies that apply to the page.
	///	TODO:
	///	HTML5 localStorage (name/value item pairs).
	///	test various values.
	///	document.cookie.setPath("/");
	///	</summary>
	///	<example>
	///	�d�ҡG
	///	//	delete domain
	///	set_cookie('domain',0);
	///	//	�@�Ӥ�(30 days)
	///	set_cookie('expires',30);
	///	//	�]�wname���Ȭ�jj
	///	set_cookie(name,'jj');
	///	//	�]�wname���Ȭ�56
	///	set_cookie(name,56);
	///	//	���hname
	///	set_cookie(name);
	///	//	�]����host�����ϥ�
	///	set_cookie(_.set_cookie.f.set_root);
	///	//	�]����domain�ϥ�
	///	set_cookie(_.set_cookie.f.set_domain);
	///	//	�̲{���]�w���h�Ҧ���
	///	set_cookie(_.set_cookie.f.delete_all);
	///	//	���h�Ҧ���
	///	set_cookie(_.set_cookie.f.delete_all_root);
	///	//	�ä[�x�s�]�d�~�^
	///	set_cookie(_.set_cookie.f.forever);
	///	//	�ǽT�]�w�o����u�b�o���s���ϥγo��cookie�A�]�i��set_cookie('expires',-1);
	///	set_cookie(_.set_cookie.f.moment);
	///	//	�Nexpires�]�w��forever��moment��A��^�ӡ]���[expires�]�w�^
	///	set_cookie('expires',0);
	///	</example>
	///	<param name="name" type="String|Object|_module_.set_cookie.f" optional="false">set_cookie.f flag | varoius name</param>
	///	<param name="value" type="" optional="false">varoius value</param>
	///	<param name="config" type="Boolean|Object" optional="false">�Y���S���]�w�ȼȮɳ]�w�ɡA�]�w�����C</param>
	///	<returns/>
	///	<see>
	///	Chrome doesn't support cookies for local files unless you start it with the --enable-file-cookies flag.
	///	chrome.exe --allow-file-access-from-files --enable-extension-timeline-api --enable-file-cookies
	///	http://stackoverflow.com/questions/335244/why-does-chrome-ignore-local-jquery-cookies
	///	http://code.google.com/p/chromium/issues/detail?id=535
	///	</see>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * ²�� document.getElementById �ðt�X loadReference()
 * @since 2004/6/25 19:33
 * @param id	�ұ���M�� element id
 * @param flag
 *            {HTML Object} object: �ѦҦ� document object
 *            {Number} flag: �Ѩ� code
 * @return	{HTML Object} Object
 * @requires	referenceDoc,loadReferenceDone,`get_element();`
 * @memberOf	CeL.interact.DOM
 */
CeL.get_element=CeL.interact.DOM.get_element=function get_element(id, flag){
	///	<summary>²�� document.getElementById �ðt�X loadReference()</summary>
	///	<since>2004/6/25 19:33</since>
	///	<param name="id" type="" optional="false">�ұ���M�� element id</param>
	///	<param>
	///	flag
	///	{HTML Object} object: �ѦҦ� document object
	///	{Number} flag: �Ѩ� code
	///	</param>
	///	<returns type="HTMLObject">Object</returns>
	///	<requires>referenceDoc,loadReferenceDone,`get_element();`</requires>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * Sets / adds class of specified element.<br/>
 * TODO:<br/>
 * 1. �@���B�z�h�� className�C<br/>
 * 2. �H�r��B�z�i����֡C<br/>
 * 3. �� +/- �]�w�C<br/>
 * 4. https://developer.mozilla.org/en/DOM/element.classList
 * @param element	HTML elements
 * @param class_name	class name || {class name 1:, class name 2:, ..}
 * @param flag
 * default: just add the specified className
 * (flag&1)==1:	reset className (else just add)
 * (flag&2)==1:	return {className1:, className2:, ..}
 * (flag&4)==1:	remove className
 * @return
 * @see
 * <a href="http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-95362176" accessdate="2009/12/14 22:26">className of type DOMString</a>,
 * <a href="https://developer.mozilla.org/En/DOM/Element.className" accessdate="2009/12/14 22:27">element.className - MDC</a>
 * @memberOf	CeL.interact.DOM
 */
CeL.set_class=CeL.interact.DOM.set_class=function(element, class_name, flag){
	///	<summary>
	///	Sets / adds class of specified element.<br/>
	///	TODO:<br/>
	///	1. �@���B�z�h�� className�C<br/>
	///	2. �H�r��B�z�i����֡C<br/>
	///	3. �� +/- �]�w�C<br/>
	///	4. https://developer.mozilla.org/en/DOM/element.classList
	///	</summary>
	///	<param name="element" type="" optional="false">HTML elements</param>
	///	<param name="class_name" type="" optional="false">class name || {class name 1:, class name 2:, ..}</param>
	///	<param>
	///	flag
	///	default: just add the specified className
	///	(flag&1)==1:	reset className (else just add)
	///	(flag&2)==1:	return {className1:, className2:, ..}
	///	(flag&4)==1:	remove className
	///	</param>
	///	<returns/>
	///	<see>
	///	<a href="http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-95362176" accessdate="2009/12/14 22:26">className of type DOMString</a>,
	///	<a href="https://developer.mozilla.org/En/DOM/Element.className" accessdate="2009/12/14 22:27">element.className - MDC</a>
	///	</see>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * If HTML element has specified class
 * @param {HTMLElement} element	HTML elements
 * @param {String} class_name	class_name_1[ class_name_2 ..]
 * @return	{Boolean}
 */
CeL.has_class=CeL.interact.DOM.has_class=function(element, class_name){
	///	<summary>If HTML element has specified class</summary>
	///	<param name="element" type="HTMLElement" optional="false" domElement="true">HTML elements</param>
	///	<param name="class_name" type="String" optional="false">class_name_1[ class_name_2 ..]</param>
	///	<returns type="Boolean"/>

};
/**
 * @param {String} class_name	class_name_1[ class_name_2 ..]
 * @param {HTMLElement} element	HTML elements
 * @param {HTMLElement} parent_node	parent node
 * @param {String} tag_name	tag name
 * @return	{[HTMLElement]}	nodes
 * @see
 * document.getElementsByClassName in prototype.js,
 * jquery('.class')
 * 
 * document.querySelector()
 * http://www.w3.org/TR/selectors-api/
 * http://blog.darkthread.net/blogs/darkthreadtw/archive/2008/04/17/document-queryselector-in-ie8.aspx
 */
CeL.find_class=CeL.interact.DOM.find_class=function(class_name, parent_node, tag_name, call_function,		flag){
	///	<param name="class_name" type="String" optional="false">class_name_1[ class_name_2 ..]</param>
	///	<param name="element" type="HTMLElement" optional="false" domElement="true">HTML elements</param>
	///	<param name="parent_node" type="HTMLElement" optional="false" domElement="true">parent node</param>
	///	<param name="tag_name" type="String" optional="false">tag name</param>
	///	<returns>{[HTMLElement]}	nodes</returns>
	///	<see>
	///	document.getElementsByClassName in prototype.js,
	///	jquery('.class')
	///	*
	///	document.querySelector()
	///	http://www.w3.org/TR/selectors-api/
	///	http://blog.darkthread.net/blogs/darkthreadtw/archive/2008/04/17/document-queryselector-in-ie8.aspx
	///	</see>

};
/**
 * ���o���e window status
 * @param node	HTML element or Event object
 * @returns {Object}	status
 */
CeL.get_window_status=CeL.interact.DOM.get_window_status=function (node){
	///	<summary>���o���e window status</summary>
	///	<param name="node" type="" optional="false">HTML element or Event object</param>
	///	<returns type="Object">status</returns>

};
/**
 * get current computed style property of specified HTML element.
 * TODO: ��X get_node_offset, _.set_style
 * @param element	HTML element
 * @param name	W3C style property name (e.g., no '-webkit-background-clip')
 * @return
 * @see
 * http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug, http://www.comsharp.com/GetKnowledge/zh-CN/TeamBlogTimothyPage_K983.aspx,
 * curCSS @ jQuery, http://api.jquery.com/category/css/,
 * <a href="http://www.quirksmode.org/dom/getstyles.html" accessdate="2010/4/1 15:44">JavaScript - Get Styles</a>,
 * <a href="http://www.javaeye.com/topic/140784?page=2" accessdate="2010/4/1 15:41">style.display���Ȥ�\u23545�A\u38590�D�O\u27983\u35272��bug�H\u35752\u35770��2\u39029:  - JavaScript - web - JavaEye\u35770\u22363</a>
 * �j��W�AcurrentStyle �۷��� getComputedStyle�A�� runtimeStyle �۷��� getOverrideStyle�C���O�����٬O���ܭ��n���ϧO�C���N�O�AIE��CSS�p��B�J���O���X�зǪ��C
 * document.defaultView�bmozilla���O���Vwindow obj��,���O�ܦ��i��b��Lbroswer���N�����Vwindow obj...�]��w3c���S���j��W�wdocument.defaultView�@�w�O�@��global obj.
 * 
 * ��^�����˦����w�q�����A����i�H�ϥ�DOM�˦�����H�ӳX�ݡG
 * var oCssRulers = document.styleSheets[0].cssRulers || document.styleSheets[0].rulers;
 * (�e�̬ODOM��k�A��̬OIE�p����k)
 * alert(oCssRulers[0].style.display);
 * @since	2010/4/2 00:14:09	rewrite
 * @memberOf	CeL.interact.DOM
 */
CeL.get_style=CeL.interact.DOM.get_style=function(element, name, not_computed){
	///	<summary>
	///	get current computed style property of specified HTML element.
	///	TODO: ��X get_node_offset, _.set_style
	///	</summary>
	///	<param name="element" type="" optional="false">HTML element</param>
	///	<param name="name" type="" optional="false">W3C style property name (e.g., no '-webkit-background-clip')</param>
	///	<returns/>
	///	<see>
	///	http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug, http://www.comsharp.com/GetKnowledge/zh-CN/TeamBlogTimothyPage_K983.aspx,
	///	curCSS @ jQuery, http://api.jquery.com/category/css/,
	///	<a href="http://www.quirksmode.org/dom/getstyles.html" accessdate="2010/4/1 15:44">JavaScript - Get Styles</a>,
	///	<a href="http://www.javaeye.com/topic/140784?page=2" accessdate="2010/4/1 15:41">style.display���Ȥ�\u23545�A\u38590�D�O\u27983\u35272��bug�H\u35752\u35770��2\u39029:  - JavaScript - web - JavaEye\u35770\u22363</a>
	///	�j��W�AcurrentStyle �۷��� getComputedStyle�A�� runtimeStyle �۷��� getOverrideStyle�C���O�����٬O���ܭ��n���ϧO�C���N�O�AIE��CSS�p��B�J���O���X�зǪ��C
	///	document.defaultView�bmozilla���O���Vwindow obj��,���O�ܦ��i��b��Lbroswer���N�����Vwindow obj...�]��w3c���S���j��W�wdocument.defaultView�@�w�O�@��global obj.
	///	*
	///	��^�����˦����w�q�����A����i�H�ϥ�DOM�˦�����H�ӳX�ݡG
	///	var oCssRulers = document.styleSheets[0].cssRulers || document.styleSheets[0].rulers;
	///	(�e�̬ODOM��k�A��̬OIE�p����k)
	///	alert(oCssRulers[0].style.display);
	///	</see>
	///	<since>2010/4/2 00:14:09	rewrite</since>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * get the actual position [left,top,width,height] of an HTML node object
 * @param node	HTML node object
 * @return
 * @memberOf	CeL.interact.DOM
 * @deprecated	use get_style(), jQuery.offset(), jQuery.position()
 * @see
 * http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug, http://www.comsharp.com/GetKnowledge/zh-CN/TeamBlogTimothyPage_K983.aspx,
 * http://msdn.microsoft.com/library/en-us/dndude/html/dude04032000.asp,
 * http://www.mail-archive.com/mochikit@googlegroups.com/msg00584.html,
 * http://hartshorne.ca/2006/01/20/javascript_positioning/,
 * http://www.jb51.net/article/18340.htm,
 * http://blog.csdn.net/wangjj_016/archive/2010/04/09/5467507.aspx
 */
CeL.get_node_offset=CeL.interact.DOM.get_node_offset=function(node){
	///	<summary>get the actual position [left,top,width,height] of an HTML node object</summary>
	///	<param name="node" type="" optional="false">HTML node object</param>
	///	<returns/>
	///	<memberOf>CeL.interact.DOM</memberOf>
	///	<deprecated>use get_style(), jQuery.offset(), jQuery.position()</deprecated>
	///	<see>
	///	http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug, http://www.comsharp.com/GetKnowledge/zh-CN/TeamBlogTimothyPage_K983.aspx,
	///	http://msdn.microsoft.com/library/en-us/dndude/html/dude04032000.asp,
	///	http://www.mail-archive.com/mochikit@googlegroups.com/msg00584.html,
	///	http://hartshorne.ca/2006/01/20/javascript_positioning/,
	///	http://www.jb51.net/article/18340.htm,
	///	http://blog.csdn.net/wangjj_016/archive/2010/04/09/5467507.aspx
	///	</see>

};
/**
 * ����n�I�� add onload�C
 * ��_ add_listener()�A����Ʀb�w�g load �ɨ̵M�|����A�� add_listener �]���O�κ]�w����k�A�]�� load ���N���AĲ�o(?)�C
 * �o�F�賻�h�u���\�b include �� JS file ���A���� runtime include�C
 * @example
 * CeL.use('net.web');
 * CeL.on_load(function(){sl(1);},'sl(2);');
 * @requires	_.add_listener,_.DOM_loaded
 * @see
 * jQuery: $(document).ready(listener);
 * DOMContentLoaded	http://webdesign.piipo.com/jquery/jquery_events
 * �i�����Ѧ� SWFObject�C
 * TODO:
 * <a href="http://javascript.nwbox.com/IEContentLoaded/" accessdate="2010/6/3 11:15" title="IEContentLoaded - An alternative for DOMContentLoaded on Internet Explorer">IEContentLoaded</a>
 * DOMContentLoaded�Ofirefox�U�S����Event, ���Ҧ�DOM�ѪR���H��|Ĳ�o�o�Өƥ�C
 * DOMContentLoaded�PDOM����onLoad�ƥ�P��۪�C��onload�n����Ҧ����������[�������~�|Ĳ�o, �]�A�����W���Ϥ������C
 * <a href="http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/06/05/jquery-ready-vs-load.aspx" accessdate="2010/6/3 11:17">jQuery ready vs load - �·t�����</a>
 * $(document).ready(fn)�o�ͦb"����������HTML"���J��NĲ�o�A��$(window).load(fn)�h�|����"����HTML ���Ҥ��ޥΪ����ɡB���O����(�pFlash)�BIFrame"���ԭ��������F�賣���J��~�|Ĳ�o�C
 * @memberOf	CeL.interact.DOM
 */
CeL.on_load=CeL.interact.DOM.on_load=function on_load(){
	///	<summary>
	///	����n�I�� add onload�C
	///	��_ add_listener()�A����Ʀb�w�g load �ɨ̵M�|����A�� add_listener �]���O�κ]�w����k�A�]�� load ���N���AĲ�o(?)�C
	///	�o�F�賻�h�u���\�b include �� JS file ���A���� runtime include�C
	///	</summary>
	///	<example>
	///	CeL.use('net.web');
	///	CeL.on_load(function(){sl(1);},'sl(2);');
	///	</example>
	///	<requires>_.add_listener,_.DOM_loaded</requires>
	///	<see>
	///	jQuery: $(document).ready(listener);
	///	DOMContentLoaded	http://webdesign.piipo.com/jquery/jquery_events
	///	�i�����Ѧ� SWFObject�C
	///	TODO:
	///	<a href="http://javascript.nwbox.com/IEContentLoaded/" accessdate="2010/6/3 11:15" title="IEContentLoaded - An alternative for DOMContentLoaded on Internet Explorer">IEContentLoaded</a>
	///	DOMContentLoaded�Ofirefox�U�S����Event, ���Ҧ�DOM�ѪR���H��|Ĳ�o�o�Өƥ�C
	///	DOMContentLoaded�PDOM����onLoad�ƥ�P��۪�C��onload�n����Ҧ����������[�������~�|Ĳ�o, �]�A�����W���Ϥ������C
	///	<a href="http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/06/05/jquery-ready-vs-load.aspx" accessdate="2010/6/3 11:17">jQuery ready vs load - �·t�����</a>
	///	$(document).ready(fn)�o�ͦb"����������HTML"���J��NĲ�o�A��$(window).load(fn)�h�|����"����HTML ���Ҥ��ޥΪ����ɡB���O����(�pFlash)�BIFrame"���ԭ��������F�賣���J��~�|Ĳ�o�C
	///	</see>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * bind/add listener. register event control, setup code to run.
 * listener ���ӥ[�W try{}catch{}�A�_�h�|�d���M�����̥X���D�C
 * **	��P�˪� object�A�ƥ󥻨��٬O�|�̷� call add_listener() �����Ƕ]�A���|�]�� p_first �ӧ��ܡC
 * **	NOT TESTED!!
 * TODO:
 * removeEventListener,
 * remove_listener(),
 * default 'this'
 * �ۭq event
 * 
 * @param {string} type	listen to what event type. event name/action
 * @param listener	listener function/function array/function string,
 * 				�� String �� recursive function �ɥi "(function(){return function f(){f();};})()"
 * 			function(e){var target=e?e.target:(e=window.event).srcElement;if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;if(e.preventDefault)e.preventDefault();else e.returnValue=false;return false;}
 * @param [target_element]	bind/attach to what HTML element
 * @param [p_first]	parentNode first
 * @return
 * @since	2010/1/20 23:42:51
 * @see
 * c.f., GEvent.add_listener()
 * @memberOf	CeL.interact.DOM
 */
CeL.add_listener=CeL.interact.DOM.add_listener=function add_listener(type, listener, target_element, p_first){
	///	<summary>
	///	bind/add listener. register event control, setup code to run.
	///	listener ���ӥ[�W try{}catch{}�A�_�h�|�d���M�����̥X���D�C
	///	**	��P�˪� object�A�ƥ󥻨��٬O�|�̷� call add_listener() �����Ƕ]�A���|�]�� p_first �ӧ��ܡC
	///	**	NOT TESTED!!
	///	TODO:
	///	removeEventListener,
	///	remove_listener(),
	///	default 'this'
	///	�ۭq event
	///	*
	///	</summary>
	///	<param name="type" type="string" optional="false">listen to what event type. event name/action</param>
	///	<param>
	///	listener	listener function/function array/function string,
	///	�� String �� recursive function �ɥi "(function(){return function f(){f();};})()"
	///	function(e){var target=e?e.target:(e=window.event).srcElement;if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;if(e.preventDefault)e.preventDefault();else e.returnValue=false;return false;}
	///	</param>
	///	<param name="target_element" type="" optional="true">bind/attach to what HTML element</param>
	///	<param name="p_first" type="" optional="true">parentNode first</param>
	///	<returns/>
	///	<since>2010/1/20 23:42:51</since>
	///	<see>c.f., GEvent.add_listener()</see>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * useCapture: parentNode first
 * @see
 * <a href="http://www.w3.org/TR/DOM-Level-3-Events/#event-flow" accessdate="2010/4/16 22:40">Document Object Model (DOM) Level 3 Events Specification</a>,
 * <a href="http://www.w3.org/TR/DOM-Level-3-Events/#interface-EventTarget" accessdate="2010/4/16 22:42">Interface EventTarget</a>
 */
CeL.p_first=CeL.interact.DOM.add_listener.p_first=false;
/**
 * get (native) global listener adding function.
 * TODO: �u�]�w�@��
 * historical for Netscape Navigator, mozilla: window.captureEvents, document.captureEvents
 */
CeL.get_adder=CeL.interact.DOM.add_listener.get_adder=function(){
	///	<summary>
	///	get (native) global listener adding function.
	///	TODO: �u�]�w�@��
	///	historical for Netscape Navigator, mozilla: window.captureEvents, document.captureEvents
	///	</summary>

};
/**
 * �t�A��L���p�C
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
CeL.default_adder=CeL.interact.DOM.add_listener.default_adder=function(type, listener, p_first, target_element){
	///	<summary>
	///	�t�A��L���p�C
	///	all: window.onload.
	///	TODO: use queue
	///	</summary>
	///	<param name="type" type="" optional="false">listen to what event type</param>
	///	<param name="listener" type="" optional="false">listener function/function array</param>
	///	<param name="p_first" type="" optional="true">parentNode first</param>
	///	<param name="target_element" type="" optional="true">bind/attach to what HTML element</param>
	///	<returns/>
	///	<see>http://blog.othree.net/log/2007/02/06/third-argument-of-addeventlistener/</see>

};
/**
 * TODO:
 * Ĳ�o���.
 * ���L�k���� DOM �ާ@�ɡ]�|�����J�B�������¤����Ѥ䴩���^�H�����D�C
 * add_listener.list[type]=[listener list]
 */
CeL.list=CeL.interact.DOM.add_listener.list={};
/**
 * ���� JavaScript �ƥ�_�w�ǻ��A�� event ���Ǩ� parentNode�C
 * @param e	event handle
 * @param c	cancel bubble
 * @see
 * http://www.jb51.net/html/200705/23/9858.htm
 * @memberOf	CeL.interact.DOM
 */
CeL.stop_event=CeL.interact.DOM.stop_event=function(e, c){
	///	<summary>���� JavaScript �ƥ�_�w�ǻ��A�� event ���Ǩ� parentNode�C</summary>
	///	<param name="e" type="" optional="false">event handle</param>
	///	<param name="c" type="" optional="false">cancel bubble</param>
	///	<see>http://www.jb51.net/html/200705/23/9858.htm</see>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * ��������W�襤������ϸ�T�C
 * 
 * @example
 * CeL.add_listener('mouseup', function (e) { var s = CeL.get_selection(); if (s && s.text) CeL.debug('select @' + this + '(' + s.element + ')' + ' (' + s.left + '+' + s.width + ',' + s.top + '+' + s.height + '), (' + e.pageX + ',' + e.pageY + '): ' + s.text); }, target_element);
 * 
 * @param	{Number} [index]	TODO: �ĴX�����, default: all or 0 if there's only ONE/ZERO selection
 * @return	{Object}
 * 	{
 * 		left: {Number} in px,
 * 		top: {Number} in px,
 * 		width: {Number} in px,
 * 		height: {Number} in px,
 * 		text: {String} ��r,
 * 		element: {HTMLElement},
 * 		selection: selection object (browser dependent)
 * 	}
 * @return	{undefined}	error.
 * @see
 * http://plugins.jquery.com/project/selectedText,
 * Gecko: https://developer.mozilla.org/en/DOM/Selection
 * @memberOf	CeL.interact.DOM
 */
CeL.get_selection=CeL.interact.DOM.get_selection=function(index){
	///	<summary>
	///	��������W�襤������ϸ�T�C
	///	*
	///	</summary>
	///	<example>
	///	CeL.add_listener('mouseup', function (e) { var s = CeL.get_selection(); if (s && s.text) CeL.debug('select @' + this + '(' + s.element + ')' + ' (' + s.left + '+' + s.width + ',' + s.top + '+' + s.height + '), (' + e.pageX + ',' + e.pageY + '): ' + s.text); }, target_element);
	///	*
	///	</example>
	///	<param name="index" type="Number" optional="true">TODO: �ĴX�����, default: all or 0 if there's only ONE/ZERO selection</param>
	///	<returns>
	///	{Object}
	///	* 	{
	///	left: {Number} in px,
	///	top: {Number} in px,
	///	width: {Number} in px,
	///	height: {Number} in px,
	///	text: {String} ��r,
	///	element: {HTMLElement},
	///	selection: selection object (browser dependent)
	///	* 	}
	///	</returns>
	///	<returns type="undefined">error.</returns>
	///	<see>
	///	http://plugins.jquery.com/project/selectedText,
	///	Gecko: https://developer.mozilla.org/en/DOM/Selection
	///	</see>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * ���X��(Barcode Scanner)/�p�gŪ�X������J�i�� onkeypress ���o
 * @param callback	callback
 * @return
 * @since	2008/8/26 23:10
 * @example
 * //	usage:
 * deal_barcode(function(t) {
 * 	if (t.length > 9 && t.length < 17)
 * 		document.getElementById("p").value = t,
 * 		document.forms[0].submit();
 * });
 * @memberOf	CeL.interact.DOM
 */
CeL.deal_barcode=CeL.interact.DOM.deal_barcode=function (callback){
	///	<summary>���X��(Barcode Scanner)/�p�gŪ�X������J�i�� onkeypress ���o</summary>
	///	<param name="callback" type="" optional="false">callback</param>
	///	<returns/>
	///	<since>2008/8/26 23:10</since>
	///	<example>
	///	//	usage:
	///	deal_barcode(function(t) {
	///	if (t.length > 9 && t.length < 17)
	///	document.getElementById("p").value = t,
	///	document.forms[0].submit();
	///	});
	///	</example>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * Translate HTML code to Unicode text
 * @param {String} HTML	HTML code
 * @param {Boolean} only_digital
 * @returns
 * @memberOf	CeL.interact.DOM
 */
CeL.HTML_to_Unicode=CeL.interact.DOM.HTML_to_Unicode=function (HTML, only_digital){
	///	<summary>Translate HTML code to Unicode text</summary>
	///	<param name="HTML" type="String" optional="false">HTML code</param>
	///	<param name="only_digital" type="Boolean" optional="false"/>
	///	<returns/>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * Translate Unicode text to HTML
 * @param {String} text	Unicode text
 * @param mode	mode='x':&#xhhh;
 * @return {String}	HTML
 * @memberOf	CeL.interact.DOM
 */
CeL.to_HTML=CeL.interact.DOM.to_HTML=function (text, mode){
	///	<summary>Translate Unicode text to HTML</summary>
	///	<param name="text" type="String" optional="false">Unicode text</param>
	///	<param name="mode" type="" optional="false">mode='x':&#xhhh;</param>
	///	<returns type="String">HTML</returns>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * Translate Unicode text to HTML code
 * @param text	Unicode text
 * @param flags	flags, f&1!=0: turn \t, (f&2)==0: \n��<br/>, f==4: to quoted
 * @param	ignore_tags	e.g., {object:{src:/^https?:\/\//},img:{src:/^https?:\/\//},a:{href:/^https?:\/\//}}
 * @return
 * @memberOf	CeL.interact.DOM
 */
CeL.Unicode_to_HTML=CeL.interact.DOM.Unicode_to_HTML=function (text, flags, ignore_tags){
	///	<summary>Translate Unicode text to HTML code</summary>
	///	<param name="text" type="" optional="false">Unicode text</param>
	///	<param name="flags" type="" optional="false">flags, f&1!=0: turn \t, (f&2)==0: \n��<br/>, f==4: to quoted</param>
	///	<param name="ignore_tags" type="" optional="false">e.g., {object:{src:/^https?:\/\//},img:{src:/^https?:\/\//},a:{href:/^https?:\/\//}}</param>
	///	<returns/>
	///	<memberOf>CeL.interact.DOM</memberOf>

};
/**
 * Translate a query string to a native Object contains key/value pair set.
 * @param	{String} query_string	query string. default: location.search
 * @param	{Object} add_to	append to this object
 * @return	key/value pairs
 * @type	Object
 * @since	2010/6/16 15:18:50
 * @memberOf	CeL.interact.DOM
 * @see
 */
CeL.get_query=CeL.interact.DOM.get_query=function(query_string, add_to){
	///	<summary>Translate a query string to a native Object contains key/value pair set.</summary>
	///	<param name="query_string" type="String" optional="false">query string. default: location.search</param>
	///	<param name="add_to" type="Object" optional="false">append to this object</param>
	///	<returns type="Object">key/value pairs</returns>
	///	<since>2010/6/16 15:18:50</since>
	///	<memberOf>CeL.interact.DOM</memberOf>
	///	<see/>

};
/**
 * Translate a native Object contains key/value pair set to a query string.
 * TODO
 * @param	{Object} query_Object	query Object.
 * @return	{String} query string
 * @type	String
 * @memberOf	CeL.interact.DOM
 * @see
 * jQuery.param
 */
CeL.to_query_string=CeL.interact.DOM.to_query_string=function(query_Object){
	///	<summary>
	///	Translate a native Object contains key/value pair set to a query string.
	///	TODO
	///	</summary>
	///	<param name="query_Object" type="Object" optional="false">query Object.</param>
	///	<returns type="String">query string</returns>
	///	<memberOf>CeL.interact.DOM</memberOf>
	///	<see>jQuery.param</see>

};
/**
 * �N BIG5 ��尲�W�X�קאּ Unicode ��尲�W�C
 * @param {String} text	Unicode text
 * @return
 * @see
 * from Unicode �ɧ��p�e jrename.js
 */
CeL.Big5_kana_fix=CeL.interact.DOM.Big5_kana_fix=function(text){
	///	<summary>�N BIG5 ��尲�W�X�קאּ Unicode ��尲�W�C</summary>
	///	<param name="text" type="String" optional="false">Unicode text</param>
	///	<returns/>
	///	<see>from Unicode �ɧ��p�e jrename.js</see>

};

//	null constructor for [CeL.interact.integrate]
CeL.interact.integrate=function(){};
CeL.interact.integrate.prototype={};

/**
 * null module constructor
 * @class	map �� functions
 */
CeL.map=CeL.interact.integrate.map=function(){
	///	<summary>null module constructor</summary>
	///	<class>map �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.interact.integrate.map.prototype={};
/**
 * �ѪR�a�}
 * @param {String} address	�a�}
 * @returns
 * @memberOf	CeL.interact.integrate.map
 */
CeL.parse_address=CeL.interact.integrate.map.parse_address=function (address){
	///	<summary>�ѪR�a�}</summary>
	///	<param name="address" type="String" optional="false">�a�}</param>
	///	<returns/>
	///	<memberOf>CeL.interact.integrate.map</memberOf>

};
/**
 * module SVG ���� constructor�C<br/>
 * �]�w SVG document fragment �ñN�����J�������C

 * @class	generation of Scalable Vector Graphics<br/>
 * ���Uø�Ϫ��򥻥\�ફ��A�ͦ� SVG �ާ@��ơC
 * @since	2006/12/7,10-12
 * @deprecated	Use toolkit listed below instead:<br/>
 * <a href="http://code.google.com/p/svgweb/" accessdate="2009/11/15 16:34" title="svgweb - Project Hosting on Google Code">svgweb</a><br/>
 * <a href="https://launchpad.net/scour" accessdate="2009/11/15 16:35" title="Scour - Cleaning SVG Files in Launchpad">Scour</a>

 * @constructor
 * @param	{int} _width	width of the canvas
 * @param	{int} _height	height of the canvas
 * @param	{color String} [_backgroundColor]	background color of the canvas (UNDO)
 * @requires	set_attribute,XML_node,remove_all_child//removeNode
 * @type	CeL.interact.integrate.SVG
 * @return	{CeL.interact.integrate.SVG} CeL.interact.integrate.SVG object created

 * @see	<a href="http://www.w3.org/TR/SVG/" accessdate="2009/11/15 16:31">Scalable Vector Graphics (SVG) 1.1 Specification</a><br/>
 * <a href="http://zvon.org/xxl/svgReference/Output/" accessdate="2009/11/15 16:31">SVG 1.1 reference with examples</a><br/>
 * <a href="http://www.permadi.com/tutorial/jsFunc/index.html" accessdate="2009/11/15 16:31" title="Introduction and Features of JavaScript &quot;Function&quot; Objects">Introduction and Features of JavaScript &quot;Function&quot; Objects</a><br/>
 * <a href="http://volity.org/wiki/index.cgi?SVG_Script_Tricks" accessdate="2009/11/15 16:31">Volity Wiki: SVG Script Tricks</a><br/>
 * <a href="http://pilat.free.fr/english/routines/js_dom.htm" accessdate="2009/11/15 16:31">Javascript SVG et DOM</a>
 */
CeL.SVG=CeL.interact.integrate.SVG=function(_width, _height, _backgroundColor){
	///	<summary>
	///	module SVG ���� constructor�C<br/>
	///	�]�w SVG document fragment �ñN�����J�������C
	///	</summary>
	///	<class>
	///	generation of Scalable Vector Graphics<br/>
	///	���Uø�Ϫ��򥻥\�ફ��A�ͦ� SVG �ާ@��ơC
	///	</class>
	///	<since>2006/12/7,10-12</since>
	///	<deprecated>
	///	Use toolkit listed below instead:<br/>
	///	<a href="http://code.google.com/p/svgweb/" accessdate="2009/11/15 16:34" title="svgweb - Project Hosting on Google Code">svgweb</a><br/>
	///	<a href="https://launchpad.net/scour" accessdate="2009/11/15 16:35" title="Scour - Cleaning SVG Files in Launchpad">Scour</a>
	///	</deprecated>
	///	<param name="_width" type="int" optional="false">width of the canvas</param>
	///	<param name="_height" type="int" optional="false">height of the canvas</param>
	///	<param name="_backgroundColor" type="colorString" optional="true">background color of the canvas (UNDO)</param>
	///	<requires>set_attribute,XML_node,remove_all_child//removeNode</requires>
	///	<returns type="CeL.interact.integrate.SVG">CeL.interact.integrate.SVG object created</returns>
	///	<see>
	///	<a href="http://www.w3.org/TR/SVG/" accessdate="2009/11/15 16:31">Scalable Vector Graphics (SVG) 1.1 Specification</a><br/>
	///	<a href="http://zvon.org/xxl/svgReference/Output/" accessdate="2009/11/15 16:31">SVG 1.1 reference with examples</a><br/>
	///	<a href="http://www.permadi.com/tutorial/jsFunc/index.html" accessdate="2009/11/15 16:31" title="Introduction and Features of JavaScript &quot;Function&quot; Objects">Introduction and Features of JavaScript &quot;Function&quot; Objects</a><br/>
	///	<a href="http://volity.org/wiki/index.cgi?SVG_Script_Tricks" accessdate="2009/11/15 16:31">Volity Wiki: SVG Script Tricks</a><br/>
	///	<a href="http://pilat.free.fr/english/routines/js_dom.htm" accessdate="2009/11/15 16:31">Javascript SVG et DOM</a>
	///	</see>

};

 /**
  * SVG document fragment
  * @property
  * @see	<a href="http://www.w3.org/TR/SVG/struct.html#NewDocument" accessdate="2009/11/15 16:53">Defining an SVG document fragment: the 'svg' element</a>
  */
//CeL.svg=CeL.interact.integrate.SVG.prototype.svg;//_s=
 /**
  * �]�t�F���J���󪺭�l��T�C<br/>
  * Use {@link #addContain} to add contains.
  * @property
  * @type	Array
  */
CeL.contains=CeL.interact.integrate.SVG.prototype.contains=[];
 /**
  * �Ҵ��J����������
  * @property
  */
//CeL.div=CeL.interact.integrate.SVG.prototype.div;//null;
/**
 * default stroke width. ���: px
 * 
 * @unit px
 * @type Number
 * @memberOf CeL.interact.integrate.SVG
 */
CeL.defaultStrokeWidth=CeL.interact.integrate.SVG.defaultStrokeWidth=0;	//	.5;	
/**
 * �Ҧ��y�X id �� prefix
 * @type	string
 * @memberOf	CeL.interact.integrate.SVG
 */
CeL.idPrefix=CeL.interact.integrate.SVG.idPrefix="";	//	library_namespace.to_module_name(this.module_name) + '.';
/**
 * ���� text
 * @param text_node	text object
 * @param text	change to this text
 * @return
 * @memberOf	CeL.interact.integrate.SVG
 * @see
 * <a href="http://www.w3.org/TR/SVG/text.html" accessdate="2009/12/15 0:2">Text - SVG 1.1 - 20030114</a>
 * <tref xlink:href="#ReferencedText"/>
 */
CeL.changeText=CeL.interact.integrate.SVG.changeText=function(text_node, text){
	///	<summary>���� text</summary>
	///	<param name="text_node" type="" optional="false">text object</param>
	///	<param name="text" type="" optional="false">change to this text</param>
	///	<returns/>
	///	<memberOf>CeL.interact.integrate.SVG</memberOf>
	///	<see>
	///	<a href="http://www.w3.org/TR/SVG/text.html" accessdate="2009/12/15 0:2">Text - SVG 1.1 - 20030114</a>
	///	<tref xlink:href="#ReferencedText"/>
	///	</see>

};
/**
 * ø�s��ΡC
 * @since	2006/12/19 18:05
 * @param _r
 * @param svgO
 * @param _color
 * @param _fill
 * @return	module SVG object
 * @memberOf	CeL.interact.integrate.SVG
 */
CeL.draw_circle=CeL.interact.integrate.SVG.draw_circle=function(_r, svgO, _color, _fill){
	///	<summary>ø�s��ΡC</summary>
	///	<since>2006/12/19 18:05</since>
	///	<param name="_r" type="" optional="false"/>
	///	<param name="svgO" type="" optional="false"/>
	///	<param name="_color" type="" optional="false"/>
	///	<param name="_fill" type="" optional="false"/>
	///	<returns>module SVG object</returns>
	///	<memberOf>CeL.interact.integrate.SVG</memberOf>

};
/**
 * ø�s���C
 * @param _rx
 * @param _ry
 * @param svgO
 * @param _color
 * @param _fill
 * @return	module SVG object
 * @memberOf	CeL.interact.integrate.SVG
 */
CeL.draw_ellipse=CeL.interact.integrate.SVG.draw_ellipse=function(_rx, _ry, svgO, _color, _fill){
	///	<summary>ø�s���C</summary>
	///	<param name="_rx" type="" optional="false"/>
	///	<param name="_ry" type="" optional="false"/>
	///	<param name="svgO" type="" optional="false"/>
	///	<param name="_color" type="" optional="false"/>
	///	<param name="_fill" type="" optional="false"/>
	///	<returns>module SVG object</returns>
	///	<memberOf>CeL.interact.integrate.SVG</memberOf>

};
/**
 * �e²���ΡC
 * @since	2006/12/17 12:38
 * @requires	split_String_to_Object,set_attribute,XML_node,removeNode,remove_all_child,g_SVG,draw_quadrilateral
 * @param _ds
 * @param _h
 * @param _d
 * @param _us
 * @param svgO
 * @param _color
 * @param _fill
 * @return	module SVG object
 * @memberOf	CeL.interact.integrate.SVG
 */
CeL.draw_quadrilateral=CeL.interact.integrate.SVG.draw_quadrilateral=function(_ds, _h, _d, _us, svgO, _color, _fill){
	///	<summary>�e²���ΡC</summary>
	///	<since>2006/12/17 12:38</since>
	///	<requires>split_String_to_Object,set_attribute,XML_node,removeNode,remove_all_child,g_SVG,draw_quadrilateral</requires>
	///	<param name="_ds" type="" optional="false"/>
	///	<param name="_h" type="" optional="false"/>
	///	<param name="_d" type="" optional="false"/>
	///	<param name="_us" type="" optional="false"/>
	///	<param name="svgO" type="" optional="false"/>
	///	<param name="_color" type="" optional="false"/>
	///	<param name="_fill" type="" optional="false"/>
	///	<returns>module SVG object</returns>
	///	<memberOf>CeL.interact.integrate.SVG</memberOf>

};
/**
 * �e²��T���ΡC
 * @since	2006/12/17 12:38
 * @requires	split_String_to_Object,set_attribute,XML_node,removeNode,remove_all_child,g_SVG,draw_triangle
 * @param _ds
 * @param _h
 * @param _d
 * @param svgO
 * @param _color
 * @param _fill
 * @return	module SVG object
 * @memberOf	CeL.interact.integrate.SVG
 */
CeL.draw_triangle=CeL.interact.integrate.SVG.draw_triangle=function(_ds, _h, _d, svgO, _color, _fill){
	///	<summary>�e²��T���ΡC</summary>
	///	<since>2006/12/17 12:38</since>
	///	<requires>split_String_to_Object,set_attribute,XML_node,removeNode,remove_all_child,g_SVG,draw_triangle</requires>
	///	<param name="_ds" type="" optional="false"/>
	///	<param name="_h" type="" optional="false"/>
	///	<param name="_d" type="" optional="false"/>
	///	<param name="svgO" type="" optional="false"/>
	///	<param name="_color" type="" optional="false"/>
	///	<param name="_fill" type="" optional="false"/>
	///	<returns>module SVG object</returns>
	///	<memberOf>CeL.interact.integrate.SVG</memberOf>

};
/**
 * �Q�� module SVG ����Ӻt�ܪ����[�k�C
 * @since	2006/12/26 17:47
 * @param num1
 * @param num2
 * @param svgO
 * @param _color
 * @param _font
 * @return	module SVG object
 * @memberOf	CeL.interact.integrate.SVG
 */
CeL.draw_addition=CeL.interact.integrate.SVG.draw_addition=function(num1, num2, svgO, _color, _font){
	///	<summary>�Q�� module SVG ����Ӻt�ܪ����[�k�C</summary>
	///	<since>2006/12/26 17:47</since>
	///	<param name="num1" type="" optional="false"/>
	///	<param name="num2" type="" optional="false"/>
	///	<param name="svgO" type="" optional="false"/>
	///	<param name="_color" type="" optional="false"/>
	///	<param name="_font" type="" optional="false"/>
	///	<returns>module SVG object</returns>
	///	<memberOf>CeL.interact.integrate.SVG</memberOf>

};
/**
 * �I�s draw_subtraction �Ӻt�ܪ�����k�C�]�������[��k���B��P����L�{�D�`�ۦ��A�]���ڭ̥H draw_addition �Ӥ@�֪��B�z�o��Ӭۦ����B��L�{�C
 * @since	2006/12/26 17:47
 * @param num1
 * @param num2
 * @param svgO
 * @param _color
 * @param _font
 * @return	module SVG object
 * @memberOf	CeL.interact.integrate.SVG
 */
CeL.draw_subtraction=CeL.interact.integrate.SVG.draw_subtraction=function(num1, num2, svgO, _color, _font){
	///	<summary>�I�s draw_subtraction �Ӻt�ܪ�����k�C�]�������[��k���B��P����L�{�D�`�ۦ��A�]���ڭ̥H draw_addition �Ӥ@�֪��B�z�o��Ӭۦ����B��L�{�C</summary>
	///	<since>2006/12/26 17:47</since>
	///	<param name="num1" type="" optional="false"/>
	///	<param name="num2" type="" optional="false"/>
	///	<param name="svgO" type="" optional="false"/>
	///	<param name="_color" type="" optional="false"/>
	///	<param name="_font" type="" optional="false"/>
	///	<returns>module SVG object</returns>
	///	<memberOf>CeL.interact.integrate.SVG</memberOf>

};
/**
 * �Q�� module SVG ����Ӻt�ܪ������k�C<br/>
 * TODO: �p�ƪ����k
 * @since	2006/12/26 17:47
 * @param num1
 * @param num2
 * @param svgO
 * @param _color
 * @param _font
 * @return	module SVG object
 * @memberOf	CeL.interact.integrate.SVG
 * @see
 * <a href="http://203.71.239.19/math/courses/cs04/M4_6.php" accessdate="2010/1/20 18:5">�p�ƽg�G�p�ƪ����k</a>
 */
CeL.draw_multiplication=CeL.interact.integrate.SVG.draw_multiplication=function(num1, num2, svgO, _color, _font){
	///	<summary>
	///	�Q�� module SVG ����Ӻt�ܪ������k�C<br/>
	///	TODO: �p�ƪ����k
	///	</summary>
	///	<since>2006/12/26 17:47</since>
	///	<param name="num1" type="" optional="false"/>
	///	<param name="num2" type="" optional="false"/>
	///	<param name="svgO" type="" optional="false"/>
	///	<param name="_color" type="" optional="false"/>
	///	<param name="_font" type="" optional="false"/>
	///	<returns>module SVG object</returns>
	///	<memberOf>CeL.interact.integrate.SVG</memberOf>
	///	<see><a href="http://203.71.239.19/math/courses/cs04/M4_6.php" accessdate="2010/1/20 18:5">�p�ƽg�G�p�ƪ����k</a></see>

};
/**
 * �Q�� module SVG ����Ӯi��<a href="http://en.wikipedia.org/wiki/Long_division" title="long division">�������k</a>�C<br/>
 * !! �|���\�h bug<br/>
 * @since	2006/12/11-12 11:36
 * @param dividend
 * @param divisor
 * @param	digits_after	TODO: �p�ƪ������k: �p���I����, how many digits after the decimal separator
 * @param svgO
 * @param _color
 * @param _font
 * @return	module SVG object
 * @example
 * // include module
 * CeL.use('net.SVG');
 * 
 * //	way 1
 * var SVG_object = new CeL.SVG;
 * SVG_object.attach('panel_for_SVG').show(1);
 * CeL.draw_long_division(452, 34, SVG_object);
 * // You can also put here.
 * //SVG_object.attach('panel_for_SVG').show(1);
 * 
 * //	way 2
 * var SVG_object = CeL.draw_long_division(100000, 7);
 * SVG_object.attach('panel_for_SVG').show(1);
 * 
 * // �t�@�����
 * CeL.draw_long_division(100, 7, SVG_object);
 * @memberOf	CeL.interact.integrate.SVG
 */
CeL.draw_long_division=CeL.interact.integrate.SVG.draw_long_division=function(dividend, divisor, svgO, _color, _font){
	///	<summary>
	///	�Q�� module SVG ����Ӯi��<a href="http://en.wikipedia.org/wiki/Long_division" title="long division">�������k</a>�C<br/>
	///	!! �|���\�h bug<br/>
	///	</summary>
	///	<since>2006/12/11-12 11:36</since>
	///	<param name="dividend" type="" optional="false"/>
	///	<param name="divisor" type="" optional="false"/>
	///	<param name="digits_after" type="" optional="false">TODO: �p�ƪ������k: �p���I����, how many digits after the decimal separator</param>
	///	<param name="svgO" type="" optional="false"/>
	///	<param name="_color" type="" optional="false"/>
	///	<param name="_font" type="" optional="false"/>
	///	<returns>module SVG object</returns>
	///	<example>
	///	// include module
	///	CeL.use('net.SVG');
	///	*
	///	//	way 1
	///	var SVG_object = new CeL.SVG;
	///	SVG_object.attach('panel_for_SVG').show(1);
	///	CeL.draw_long_division(452, 34, SVG_object);
	///	// You can also put here.
	///	//SVG_object.attach('panel_for_SVG').show(1);
	///	*
	///	//	way 2
	///	var SVG_object = CeL.draw_long_division(100000, 7);
	///	SVG_object.attach('panel_for_SVG').show(1);
	///	*
	///	// �t�@�����
	///	CeL.draw_long_division(100, 7, SVG_object);
	///	</example>
	///	<memberOf>CeL.interact.integrate.SVG</memberOf>

};

//	null constructor for [CeL.interact.form]
CeL.interact.form=function(){};
CeL.interact.form.prototype={};

/**
 * JavaScript �a�}��J����䴩 (address input form)�A
 * �{���x�W(.TW)�i�ΡC
 * @class	form �� functions
 */
CeL.address=CeL.interact.form.address=function(){
	///	<summary>
	///	JavaScript �a�}��J����䴩 (address input form)�A
	///	�{���x�W(.TW)�i�ΡC
	///	</summary>
	///	<class>form �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.interact.form.address.prototype={};
/**
* ���Ѧ���檺  input
* @class	form �� functions
* @see
* http://dojocampus.org/explorer/#Dijit_Form%20Controls_Filtering%20Select_Basic
*/
CeL.select_input=CeL.interact.form.select_input=function(){
	///	<summary>
	///	* ���Ѧ���檺  input
	///	* @class	form �� functions
	///	* @see
	///	* http://dojocampus.org/explorer/#Dijit_Form%20Controls_Filtering%20Select_Basic
	///	</summary>

};

//	null constructor for [CeL.application]
CeL.application=function(){};
CeL.application.prototype={};

/**
 * null module constructor
 * @class	code.debug �� functions
 */
CeL.debug=CeL.application.debug=function(){
	///	<summary>null module constructor</summary>
	///	<class>code.debug �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.debug.prototype={};
/**
 * ��ܰT������<br/>
 * alert() ���VBScript��MsgBox�i���ͧ�h�ĪG�A��NS���䴩���ˤl�C
 * @param message	message or object
 * @param {Number} [wait]	the maximum length of time (in seconds) you want the pop-up message box displayed.
 * @param {String} [title]	title of the pop-up message box.
 * @param {Number} [type]	type of buttons and icons you want in the pop-up message box.
 * @return	{Integer} number of the button the user clicked to dismiss the message box.
 * @requires	CeL.get_script_name
 * @see	<a href="http://msdn.microsoft.com/library/en-us/script56/html/wsmthpopup.asp">Popup Method</a>
 * @memberOf	CeL.application.debug
 */
CeL.JSalert=CeL.application.debug.JSalert=function (message, wait, title, type){
	///	<summary>
	///	��ܰT������<br/>
	///	alert() ���VBScript��MsgBox�i���ͧ�h�ĪG�A��NS���䴩���ˤl�C
	///	</summary>
	///	<param name="message" type="" optional="false">message or object</param>
	///	<param name="wait" type="Number" optional="true">the maximum length of time (in seconds) you want the pop-up message box displayed.</param>
	///	<param name="title" type="String" optional="true">title of the pop-up message box.</param>
	///	<param name="type" type="Number" optional="true">type of buttons and icons you want in the pop-up message box.</param>
	///	<returns type="Integer">number of the button the user clicked to dismiss the message box.</returns>
	///	<requires>CeL.get_script_name</requires>
	///	<see><a href="http://msdn.microsoft.com/library/en-us/script56/html/wsmthpopup.asp">Popup Method</a></see>
	///	<memberOf>CeL.application.debug</memberOf>

};

//	null constructor for [CeL.application.debug.log]
CeL.application.debug.log=function(){};
CeL.application.debug.log.prototype={};


	/**
	 * log �� warning/error message �� className
	 * @name	CeL.application.debug.log.prototype.className_set
	 */
//CeL.className_set=CeL.application.debug.log.prototype.className_set;//className_set || {
	/**
	 * log �� warning/error message �� prefix
	 * @name	CeL.application.debug.log.prototype.message_prefix
	 */
CeL.message_prefix=CeL.application.debug.log.prototype.message_prefix={
			/**
			 * @description	���I�s {@link CeL.application.debug.log.prototype.log} �ɨϥΪ� prefix, DEFAULT prefix.
			 * @name	CeL.application.debug.log.prototype.message_prefix.log
			 */
			log : '',
			/**
			 * @description	���I�s {@link CeL.application.debug.log.prototype.warn} �ɨϥΪ� prefix
			 * @name	CeL.application.debug.log.prototype.message_prefix.warn
			 */
			warn : '',
			/**
			 * @description	���ܷ��I�s {@link CeL.application.debug.log.prototype.err}, �O���~ error message �ɨϥΪ� prefix
			 * @name	CeL.application.debug.log.prototype.message_prefix.err
			 */
			err : '<em>!! Error !!</em> '
	};
/**
 * ��U�ؤ��P error object �@����A��o�i�z�Ѫ� error message�C
 * @param	e	error object
 * @param	new_line	new_line
 * @param	caller	function caller
 * @memberOf	CeL.application.debug.log
 * @see
 * http://msdn.microsoft.com/en-us/library/ms976144.aspx
 * The facility code establishes who originated the error. For example, all internal script engine errors generated by the JScript engine have a facility code of "A".
 * http://msdn.microsoft.com/en-us/library/ms690088(VS.85).aspx
 * 
 * http://msdn.microsoft.com/en-us/library/t9zk6eay.aspx
 * http://msdn.microsoft.com/en-us/library/microsoft.jscript.errorobject.aspx
 * Specifies the name of the type of the error.
 * Possible values include Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, and URIError.
 */
CeL.get_error_message=CeL.application.debug.log.get_error_message=function get_error_message(e, new_line, caller){
	///	<summary>��U�ؤ��P error object �@����A��o�i�z�Ѫ� error message�C</summary>
	///	<param name="e" type="" optional="false">error object</param>
	///	<param name="new_line" type="" optional="false">new_line</param>
	///	<param name="caller" type="" optional="false">function caller</param>
	///	<memberOf>CeL.application.debug.log</memberOf>
	///	<see>
	///	http://msdn.microsoft.com/en-us/library/ms976144.aspx
	///	The facility code establishes who originated the error. For example, all internal script engine errors generated by the JScript engine have a facility code of "A".
	///	http://msdn.microsoft.com/en-us/library/ms690088(VS.85).aspx
	///	*
	///	http://msdn.microsoft.com/en-us/library/t9zk6eay.aspx
	///	http://msdn.microsoft.com/en-us/library/microsoft.jscript.errorobject.aspx
	///	Specifies the name of the type of the error.
	///	Possible values include Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, and URIError.
	///	</see>

};
/**
 * get node description
 * 
 * @param node
 *            HTML node
 * @memberOf CeL.application.debug.log
 */
CeL.node_description=CeL.application.debug.log.node_description=function(node, flag){
	///	<summary>
	///	get node description
	///	*
	///	</summary>
	///	<param name="node" type="" optional="false">HTML node</param>
	///	<memberOf>CeL.application.debug.log</memberOf>

};
/**
 * get new extend instance
 * @param	{String|object HTMLElement} [obj]	message area element or id
 * @return	{Array} [ instance of this module, log function, warning function, error function ]
 * @example
 * 
 * //	status logger
 * var SL=new CeL.application.debug.log('log'),sl=SL[1],warn=SL[2],err=SL[3];
 * sl(msg);
 * sl(msg,clear);
 * 
 * //	general log
 * function_set = new CeL.application.debug.log.extend('panel',{});
 * // 1.
 * function_set = new CeL.code.log.extend('panel',{});
 * logger = function_set[1];
 * // 2.
 * log_only = (new CeL.code.log.extend('panel',{}))[1];
 * 
 * @_memberOf	CeL.application.debug.log
 * @since	2009/8/24 20:15:31
 */
CeL.extend=CeL.application.debug.log.extend=function(obj, className_set){
	///	<summary>get new extend instance</summary>
	///	<param name="obj" type="String|objectHTMLElement" optional="true" domElement="true">message area element or id</param>
	///	<returns type="Array">[ instance of this module, log function, warning function, error function ]</returns>
	///	<example>
	///	*
	///	//	status logger
	///	var SL=new CeL.application.debug.log('log'),sl=SL[1],warn=SL[2],err=SL[3];
	///	sl(msg);
	///	sl(msg,clear);
	///	*
	///	//	general log
	///	function_set = new CeL.application.debug.log.extend('panel',{});
	///	// 1.
	///	function_set = new CeL.code.log.extend('panel',{});
	///	logger = function_set[1];
	///	// 2.
	///	log_only = (new CeL.code.log.extend('panel',{}))[1];
	///	*
	///	</example>
	///	<_memberOf>CeL.application.debug.log</_memberOf>
	///	<since>2009/8/24 20:15:31</since>

};
/**
 * null module constructor
 * @class	locale �� functions
 */
CeL.locale=CeL.application.locale=function(){
	///	<summary>null module constructor</summary>
	///	<class>locale �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.locale.prototype={};
/**
 * null module constructor
 * @class	net �� functions
 */
CeL.net=CeL.application.net=function(){
	///	<summary>null module constructor</summary>
	///	<class>net �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.net.prototype={};
/**
 * null module constructor
 * @class	web Ajax �� functions
 */
CeL.Ajax=CeL.application.net.Ajax=function(){
	///	<summary>null module constructor</summary>
	///	<class>web Ajax �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.net.Ajax.prototype={};

//	null constructor for [CeL.application.storage]
CeL.application.storage=function(){};
CeL.application.storage.prototype={};

/**
 * null module constructor
 * @class	�ɮ׾ާ@������ function�C
 */
CeL.file=CeL.application.storage.file=function(){
	///	<summary>null module constructor</summary>
	///	<class>�ɮ׾ާ@������ function�C</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.storage.file.prototype={};
/**
 * determine base path.
 * ���w base path �����c��A�ǥ� path_now ���� base path �� full path.
 * cf. 
 * @param {String} base_path_structure	base path ���d�����c
 * @param {String} path_now
 * @return	{String}	������ base path full path
 * @example
 * alert(determine_base_path('kanashimi/www/cgi-bin/game/'));
 * @requres	reducePath,getPathOnly,dirSp,dirSpR
 * @memberOf	CeL.application.storage.file
 */
CeL.determine_base_path=CeL.application.storage.file.determine_base_path=function (base_path_structure, path_now){
	///	<summary>
	///	determine base path.
	///	���w base path �����c��A�ǥ� path_now ���� base path �� full path.
	///	cf.
	///	</summary>
	///	<param name="base_path_structure" type="String" optional="false">base path ���d�����c</param>
	///	<param name="path_now" type="String" optional="false"/>
	///	<returns type="String">������ base path full path</returns>
	///	<example>alert(determine_base_path('kanashimi/www/cgi-bin/game/'));</example>
	///	<requres>reducePath,getPathOnly,dirSp,dirSpR</requres>
	///	<memberOf>CeL.application.storage.file</memberOf>

};
/**
 * cf: getFN()
 * @param {String} path	path name
 * @return
 * @memberOf	CeL.application.storage.file
 */
CeL.parse_path=CeL.application.storage.file.parse_path=function (path){
	///	<summary>cf: getFN()</summary>
	///	<param name="path" type="String" optional="false">path name</param>
	///	<returns/>
	///	<memberOf>CeL.application.storage.file</memberOf>

};
/**
 * is absolute or relative path, not very good solution
 * @param {String} path
 * @return
 * @requires	dirSp,dirSpR
 * @memberOf	CeL.application.storage.file
 */
CeL.is_absolute_path=CeL.application.storage.file.is_absolute_path=function (path){
	///	<summary>is absolute or relative path, not very good solution</summary>
	///	<param name="path" type="String" optional="false"/>
	///	<returns/>
	///	<requires>dirSp,dirSpR</requires>
	///	<memberOf>CeL.application.storage.file</memberOf>

};

//	null constructor for [CeL.application.OS]
CeL.application.OS=function(){};
CeL.application.OS.prototype={};

/**
 * null module constructor
 * @class	web �� functions
 */
CeL.Windows=CeL.application.OS.Windows=function(){
	///	<summary>null module constructor</summary>
	///	<class>web �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.OS.Windows.prototype={};
/**
 * ���o VB �� Nothing
 * @returns	VB �� Nothing
 * @memberOf	CeL.application.OS.Windows
 */
CeL.VBNothing=CeL.application.OS.Windows.VBNothing=function (){
	///	<summary>���o VB �� Nothing</summary>
	///	<returns>VB �� Nothing</returns>
	///	<memberOf>CeL.application.OS.Windows</memberOf>

};
/**
 * �ഫ VB �� Safe Array ���� JS Array.
 * @param vba	VB �� array
 * @returns
 * @memberOf	CeL.application.OS.Windows
 */
CeL.VBA_to_JSA=CeL.application.OS.Windows.VBA_to_JSA=function (vba){
	///	<summary>�ഫ VB �� Safe Array ���� JS Array.</summary>
	///	<param name="vba" type="" optional="false">VB �� array</param>
	///	<returns/>
	///	<memberOf>CeL.application.OS.Windows</memberOf>

};
/**
 * �ഫJS Array����VB��Safe Array.
 * Safe Array To JS Array: plaese use new VBArray().
 * JScript\u12398�t�C\u12399\u23455��\u12395\u12399CSV��r�C\u12384\u12387\u12383\u12426\u12377\u12427�CVBScript\u12398vartype\u12395��\u12431\u12379\u12427\u123928(VT_STRING)\u12364��\u12387\u12390\u12367\u12427\u12371\u12392\u12363\u12425\u12418\u12431\u12363\u12427�C
 * @param array
 * @returns
 * @see
 * http://www.microsoft.com/japan/msdn/japan/msdn/library/ja/script56/html/js56jsobjvbarray.asp
 * @memberOf	CeL.application.OS.Windows
 */
CeL.JSA_to_VBA=CeL.application.OS.Windows.JSA_to_VBA=function (array){
	///	<summary>
	///	�ഫJS Array����VB��Safe Array.
	///	Safe Array To JS Array: plaese use new VBArray().
	///	JScript\u12398�t�C\u12399\u23455��\u12395\u12399CSV��r�C\u12384\u12387\u12383\u12426\u12377\u12427�CVBScript\u12398vartype\u12395��\u12431\u12379\u12427\u123928(VT_STRING)\u12364��\u12387\u12390\u12367\u12427\u12371\u12392\u12363\u12425\u12418\u12431\u12363\u12427�C
	///	</summary>
	///	<param name="array" type="" optional="false"/>
	///	<returns/>
	///	<see>http://www.microsoft.com/japan/msdn/japan/msdn/library/ja/script56/html/js56jsobjvbarray.asp</see>
	///	<memberOf>CeL.application.OS.Windows</memberOf>

};
/**
 * null module constructor
 * @class	Windows �U�A�ɮ׾ާ@������ function�C
 */
CeL.file=CeL.application.OS.Windows.file=function(){
	///	<summary>null module constructor</summary>
	///	<class>Windows �U�A�ɮ׾ާ@������ function�C</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.OS.Windows.file.prototype={};
/**
 * FileSystemObject Object I/O mode enumeration
 * @see	<a href="http://msdn.microsoft.com/en-us/library/314cz14s%28VS.85%29.aspx" accessdate="2009/11/28 17:42" title="OpenTextFile Method">OpenTextFile Method</a>
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.iomode=CeL.application.OS.Windows.file.iomode={
	// * @_description <a href="#.iomode">iomode</a>: Open a file for reading only. You can't write to this file.
	/**
	 * Open a file for reading only. You can't write to this file.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	ForReading : 1,
	/**
	 * Open a file for writing.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	ForWriting : 2,
	/**
	 * Open a file and write to the end of the file.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	ForAppending : 8
};
/**
 * FileSystemObject Object file open format enumeration
 * @see	<a href="http://msdn.microsoft.com/en-us/library/314cz14s%28VS.85%29.aspx" accessdate="2009/11/28 17:42" title="OpenTextFile Method">OpenTextFile Method</a>
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.open_format=CeL.application.OS.Windows.file.open_format={
	/**
	 * Opens the file using the system default.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	TristateUseDefault : -2,
	/**
	 * Opens the file as Unicode.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	TristateTrue : -1,
	/**
	 * Opens the file as ASCII.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	TristateFalse : 0
};
/**
 * move/rename files, ** use RegExp, but no global flag **<br/>
 * �i�� move_file_filter() �ӱư����n��<br/>
 * ����ƥi��Ȯɧ��ܥثe�u�@�ؿ��I
 * @param {String} from	from file
 * @param {String} to	to file
 * @param {String} base_path	base path
 * @param flag
 * @param {Function} filter	�i�� filter() �ӱư����n��
 * @return	{Object} report
 * @since	2004/4/12 17:25
 * @requires	path_separator,fso,WshShell,new_line,Enumerator
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.move_file=CeL.application.OS.Windows.file.move_file=function move_file(from, to, base_path, flag, filter){
	///	<summary>
	///	move/rename files, ** use RegExp, but no global flag **<br/>
	///	�i�� move_file_filter() �ӱư����n��<br/>
	///	����ƥi��Ȯɧ��ܥثe�u�@�ؿ��I
	///	</summary>
	///	<param name="from" type="String" optional="false">from file</param>
	///	<param name="to" type="String" optional="false">to file</param>
	///	<param name="base_path" type="String" optional="false">base path</param>
	///	<param name="flag" type="" optional="false"/>
	///	<param name="filter" type="Function" optional="false">�i�� filter() �ӱư����n��</param>
	///	<returns type="Object">report</returns>
	///	<since>2004/4/12 17:25</since>
	///	<requires>path_separator,fso,WshShell,new_line,Enumerator</requires>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * <a href="#.move_file">move_file</a> �� flag enumeration
 * @constant
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.f=CeL.application.OS.Windows.file.move_file.f={
		/**
		 * null flag
		 * @memberOf CeL.application.OS.Windows.file
		 */
		none : 0,
		/**
		 * overwrite target
		 * @memberOf CeL.application.OS.Windows.file
		 */
		overwrite : 1,
		/**
		 * If source don't exist but target exist, than reverse.
		 * @deprecated	TODO
		 * @memberOf CeL.application.OS.Windows.file
		 */
		fuzzy : 2,
		/**
		 * reverse source and target
		 * @memberOf CeL.application.OS.Windows.file
		 */
		reverse : 4,
		/**
		 * include folder
		 * @memberOf CeL.application.OS.Windows.file
		 */
		include_folder : 8,
		/**
		 * include sub-folder
		 * @memberOf CeL.application.OS.Windows.file
		 */
		include_subfolder : 16,
		/**
		 * Just do a test
		 * @memberOf CeL.application.OS.Windows.file
		 */
		Test : 32,
		/**
		 * copy, instead of move the file
		 * @memberOf CeL.application.OS.Windows.file
		 */
		copy : 64,
		/**
		 * �� target ���w�� flag�A�Υ]�t�� flag �ӥ����w target �ɡAremove the source�C
		 * @memberOf CeL.application.OS.Windows.file
		 */
		remove : 128
};
/**
 * move file
 * @requires	fso,get_folder,get_file_name,initWScriptObj
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.move_1_file=CeL.application.OS.Windows.file.move_1_file=function(from, to, dir, only_filename, reverse){
	///	<summary>move file</summary>
	///	<requires>fso,get_folder,get_file_name,initWScriptObj</requires>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * get file details (readonly)
 * @example
 * get_file_details('path');
 * get_file_details('file/folder name',parentDir);
 * get_file_details('path',get_file_details_get_object);
 * @see	<a href="http://msdn.microsoft.com/en-us/library/bb787870%28VS.85%29.aspx" accessdate="2009/11/29 22:52" title="GetDetailsOf Method (Folder)">GetDetailsOf Method (Folder)</a>
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.get_file_details=CeL.application.OS.Windows.file.get_file_details=function(fileObj, parentDirObj){
	///	<summary>get file details (readonly)</summary>
	///	<example>
	///	get_file_details('path');
	///	get_file_details('file/folder name',parentDir);
	///	get_file_details('path',get_file_details_get_object);
	///	</example>
	///	<see><a href="http://msdn.microsoft.com/en-us/library/bb787870%28VS.85%29.aspx" accessdate="2009/11/29 22:52" title="GetDetailsOf Method (Folder)">GetDetailsOf Method (Folder)</a></see>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * FileSystemObject Object Attributes Property
 * @see
 * <a href="http://msdn.microsoft.com/en-us/library/5tx15443%28VS.85%29.aspx" accessdate="2010/1/9 8:11">Attributes Property</a>
 * @memberOf	CeL.application.OS.Windows.file
 * @since	2010/1/9 08:33:36
 */
CeL.fso_attributes=CeL.application.OS.Windows.file.fso_attributes={
	/**
	 * Default. No attributes are set.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	none : 0,
	/**
	 * Normal file. No attributes are set.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	Normal : 0,
	/**
	 * Read-only file. Attribute is read/write.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	ReadOnly : 1,
	/**
	 * Hidden file. Attribute is read/write.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	Hidden : 2,
	/**
	 * System file. Attribute is read/write.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	System : 4,
	/**
	 * Disk drive volume label. Attribute is read-only.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	Volume : 8,
	/**
	 * Folder or directory. Attribute is read-only.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	Directory : 16,
	/**
	 * File has changed since last backup. Attribute is read/write.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	Archive : 32,
	/**
	 * Link or shortcut. Attribute is read-only.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	Alias : 1024,
	/**
	 * Compressed file. Attribute is read-only.
	 * @memberOf	CeL.application.OS.Windows.file
	 */
	Compressed : 2048
};
/**
 * �����ɮפ��ݩʡC
 * chmod @ UNIX
 * @param	F	file path
 * @param	A	attributes, �ݩ�
 * @example
 * change_attributes(path,'-ReadOnly');
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.change_attributes=CeL.application.OS.Windows.file.change_attributes=function(F, A){
	///	<summary>
	///	�����ɮפ��ݩʡC
	///	chmod @ UNIX
	///	</summary>
	///	<param name="F" type="" optional="false">file path</param>
	///	<param name="A" type="" optional="false">attributes, �ݩ�</param>
	///	<example>change_attributes(path,'-ReadOnly');</example>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * �}�ɳB�z<br/>
 * ���լO�_�w�}�Ҹ���ɤ����ջP���s�}�Ҹ����
 * @param FN	file name
 * @param NOTexist	if NOT need exist
 * @param io_mode	IO mode
 * @return
 * @requires	fso,WshShell,iomode
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.openDataTest=CeL.application.OS.Windows.file.openDataTest=function(FN, NOTexist, io_mode){
	///	<summary>
	///	�}�ɳB�z<br/>
	///	���լO�_�w�}�Ҹ���ɤ����ջP���s�}�Ҹ����
	///	</summary>
	///	<param name="FN" type="" optional="false">file name</param>
	///	<param name="NOTexist" type="" optional="false">if NOT need exist</param>
	///	<param name="io_mode" type="" optional="false">IO mode</param>
	///	<returns/>
	///	<requires>fso,WshShell,iomode</requires>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * 
 * @param FN
 * @param format
 * @param io_mode
 * @return
 */
CeL.open_template=CeL.application.OS.Windows.file.open_template=function(FN, format, io_mode){
	///	<summary>*</summary>
	///	<param name="FN" type="" optional="false"/>
	///	<param name="format" type="" optional="false"/>
	///	<param name="io_mode" type="" optional="false"/>
	///	<returns/>

};
/**
 * �ഫ�H adTypeBinary Ū�쪺���
 * @example
 * //	���w����Ū�ɡG
 * t=translate_AdoStream_binary_data(read_file(FP,'binary'));
 * write_file(FP,t,'iso-8859-1');
 * @see
 * <a href="http://www.hawk.34sp.com/stdpls/dwsh/charset_adodb.html">Hawk&apos;s W3 Laboratory : Disposable WSH : �f�~�s�G��r\u12456\u12531\u12467\u12540\u12487\u12451\u12531\u12464\u12392ADODB.Stream</a>
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.translate_AdoStream_binary_data=CeL.application.OS.Windows.file.translate_AdoStream_binary_data=function translate_AdoStream_binary_data(data, len, type){
	///	<summary>�ഫ�H adTypeBinary Ū�쪺���</summary>
	///	<example>
	///	//	���w����Ū�ɡG
	///	t=translate_AdoStream_binary_data(read_file(FP,'binary'));
	///	write_file(FP,t,'iso-8859-1');
	///	</example>
	///	<see><a href="http://www.hawk.34sp.com/stdpls/dwsh/charset_adodb.html">Hawk&apos;s W3 Laboratory : Disposable WSH : �f�~�s�G��r\u12456\u12531\u12467\u12540\u12487\u12451\u12531\u12464\u12392ADODB.Stream</a></see>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * �ഫ�H adTypeBinary Ū�쪺���
 * @param	data	�H adTypeBinary Ū�쪺���
 * @param	pos	position
 * @since	2007/9/19 20:58:26
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.Ado_binary=CeL.application.OS.Windows.file.Ado_binary=function(data, pos){
	///	<summary>�ഫ�H adTypeBinary Ū�쪺���</summary>
	///	<param name="data" type="" optional="false">�H adTypeBinary Ū�쪺���</param>
	///	<param name="pos" type="" optional="false">position</param>
	///	<since>2007/9/19 20:58:26</since>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.prototype=CeL.application.OS.Windows.file.Ado_binary.prototype={};
/**
 * ���ѵ� <a href="#.read_file">read_file</a>, <a href="#.write_file">write_file</a> �ϥΪ�²���}�ɨ��
 * @param FN	file path
 * @param format	open format, e.g., open_format.TristateUseDefault
 * @param io_mode	open mode, e.g., iomode.ForWriting
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.open_file=CeL.application.OS.Windows.file.open_file=function open_file(FN, format, io_mode){
	///	<summary>���ѵ� <a href="#.read_file">read_file</a>, <a href="#.write_file">write_file</a> �ϥΪ�²���}�ɨ��</summary>
	///	<param name="FN" type="" optional="false">file path</param>
	///	<param name="format" type="" optional="false">open format, e.g., open_format.TristateUseDefault</param>
	///	<param name="io_mode" type="" optional="false">open mode, e.g., iomode.ForWriting</param>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * Ū���ɮ�
 * @param FN	file path
 * @param format	open encode = simpleFileDformat
 * @param io_mode	open IO mode = ForReading
 * @param func	do this function per line, or [func, maxsize] (TODO)
 * @return {String} �ɮפ��e
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.read_file=CeL.application.OS.Windows.file.read_file=function(FN,format,io_mode,func){
	///	<summary>Ū���ɮ�</summary>
	///	<param name="FN" type="" optional="false">file path</param>
	///	<param name="format" type="" optional="false">open encode = simpleFileDformat</param>
	///	<param name="io_mode" type="" optional="false">open IO mode = ForReading</param>
	///	<param name="func" type="" optional="false">do this function per line, or [func, maxsize] (TODO)</param>
	///	<returns type="String">�ɮפ��e</returns>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * �N content �g�J file
 * ** ADODB.Stream does not support appending!
 * @param FN	file path
 * @param content	content to write
 * @param format	open format = simpleFileDformat
 * @param io_mode	write mode = ForWriting, e.g., ForAppending
 * @param N_O	DO NOT overwrite
 * @return error No.
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.write_file=CeL.application.OS.Windows.file.write_file=function(FN, content, format, io_mode, N_O){
	///	<summary>
	///	�N content �g�J file
	///	** ADODB.Stream does not support appending!
	///	</summary>
	///	<param name="FN" type="" optional="false">file path</param>
	///	<param name="content" type="" optional="false">content to write</param>
	///	<param name="format" type="" optional="false">open format = simpleFileDformat</param>
	///	<param name="io_mode" type="" optional="false">write mode = ForWriting, e.g., ForAppending</param>
	///	<param name="N_O" type="" optional="false">DO NOT overwrite</param>
	///	<returns>error No.</returns>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * �a�`�Φr�۰ʧP�O�r�ꤧ�s�X	string,�w�]�s�X
 */
CeL.autodetectStringEncode=CeL.application.OS.Windows.file.autodetectStringEncode=function(str){
	///	<summary>�a�`�Φr�۰ʧP�O�r�ꤧ�s�X	string,�w�]�s�X</summary>

};
/**
 * Get the infomation of folder
 * @param folder_path	folder path
 * @param file_filter
 * @param traverseSubDirectory
 * @return
 * @example
 * var finfo=new folder_info(path or folder object,extFilter,0/1);
 * @deprecated	�H <a href="#.traverse_file_system">traverse_file_system</a> �N��
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.folder_info=CeL.application.OS.Windows.file.folder_info=function(folder_path,file_filter,traverseSubDirectory){
	///	<summary>Get the infomation of folder</summary>
	///	<param name="folder_path" type="" optional="false">folder path</param>
	///	<param name="file_filter" type="" optional="false"/>
	///	<param name="traverseSubDirectory" type="" optional="false"/>
	///	<returns/>
	///	<example>var finfo=new folder_info(path or folder object,extFilter,0/1);</example>
	///	<deprecated>�H <a href="#.traverse_file_system">traverse_file_system</a> �N��</deprecated>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * <a href="#.folder_info">folder_info</a> �� flag enumeration
 * @memberOf	CeL.application.OS.Windows.file
 * @constant
 */
CeL.f=CeL.application.OS.Windows.file.folder_info.f={
		noNewObj : -1,
		files : 0,
		dirs : 1,
		fsize : 2,
		size : 3,
		Tsize : 3,
		Tfiles : 4,
		Tdirs : 5
};
/**
 * �N�s�X��fromCode���ɮ�fileName���Ҧ����X�s�XtoCode��char�HencodeFunction�ഫ
 * @param fileName
 * @param toCode
 * @param fromCode
 * @param encodeFunction
 * @return
 * @memberOf	CeL.application.OS.Windows.file
 */
CeL.iconv_file=CeL.application.OS.Windows.file.iconv_file=function(fileName, toCode, fromCode, encodeFunction){
	///	<summary>�N�s�X��fromCode���ɮ�fileName���Ҧ����X�s�XtoCode��char�HencodeFunction�ഫ</summary>
	///	<param name="fileName" type="" optional="false"/>
	///	<param name="toCode" type="" optional="false"/>
	///	<param name="fromCode" type="" optional="false"/>
	///	<param name="encodeFunction" type="" optional="false"/>
	///	<returns/>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>

};
/**
 * ���� file system �����Ψ��
 * @param FS_function_array	file system handle function array
 * @param path	target path
 * @param filter	filter
 * @param flag	see <a href="#.traverse_file_system.f">flag</a>
 * @return
 * @memberOf	CeL.application.OS.Windows.file
 * @see	<a href="http://msdn.microsoft.com/library/en-us/script56/html/0fa93e5b-b657-408d-9dd3-a43846037a0e.asp">FileSystemObject</a>
 */
CeL.traverse_file_system=CeL.application.OS.Windows.file.traverse_file_system=function traverse_file_system(FS_function_array, path, filter, flag){
	///	<summary>���� file system �����Ψ��</summary>
	///	<param name="FS_function_array" type="" optional="false">file system handle function array</param>
	///	<param name="path" type="" optional="false">target path</param>
	///	<param name="filter" type="" optional="false">filter</param>
	///	<param name="flag" type="" optional="false">see <a href="#.traverse_file_system.f">flag</a></param>
	///	<returns/>
	///	<memberOf>CeL.application.OS.Windows.file</memberOf>
	///	<see><a href="http://msdn.microsoft.com/library/en-us/script56/html/0fa93e5b-b657-408d-9dd3-a43846037a0e.asp">FileSystemObject</a></see>

};
/**
 * <a href="#.traverse_file_system">traverse_file_system</a> �� flag enumeration
 * @memberOf	CeL.application.OS.Windows.file
 * @constant
 */
//CeL.f=CeL.application.OS.Windows.file.traverse_file_system.f;//traverse_file_system.f = {
/**
 * null module constructor
 * @class	web HTA �� functions
 */
CeL.HTA=CeL.application.OS.Windows.HTA=function(){
	///	<summary>null module constructor</summary>
	///	<class>web HTA �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.OS.Windows.HTA.prototype={};
/**
 * Internet Explorer Automation tool
 * @param {String} [URL]	initial URL
 * @returns {IEA}
 * @memberOf	CeL.application.OS.Windows.HTA
 */
CeL.IEA=CeL.application.OS.Windows.HTA.IEA=function (URL){
	///	<summary>Internet Explorer Automation tool</summary>
	///	<param name="URL" type="String" optional="true">initial URL</param>
	///	<returns type="IEA"/>
	///	<memberOf>CeL.application.OS.Windows.HTA</memberOf>

};
/**
 * WSH ���Ҥ����o�ŶKï�����
 * @memberOf	CeL.application.OS.Windows.HTA
 */
//CeL.getClipboardText=CeL.application.OS.Windows.HTA.getClipboardText;//setClipboardText;
/**
 * null module constructor
 * @class	Windows job �� functions
 */
CeL.job=CeL.application.OS.Windows.job=function(){
	///	<summary>null module constructor</summary>
	///	<class>Windows job �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.OS.Windows.job.prototype={};
/**
 * null module constructor
 * @class	Windows registry �� functions
 */
CeL.registry=CeL.application.OS.Windows.registry=function(){
	///	<summary>null module constructor</summary>
	///	<class>Windows registry �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.OS.Windows.registry.prototype={};
/**
 * null module constructor
 * @class	WMI �� functions
 */
CeL.WMI=CeL.application.OS.Windows.WMI=function(){
	///	<summary>null module constructor</summary>
	///	<class>WMI �� functions</class>

};
/**
 * for JSDT: �� prototype �~�|�N�����@ Class
 */
CeL.prototype=CeL.application.OS.Windows.WMI.prototype={};
/**
 * ���o���d�]�w��IP�a�}
 * @param type	default type: ip setted interfaces only, 1: all interfaces, 2: ���� net interfaces(�����d�A�L�u)
 * @returns
 * @example
 * IP=get_net_info().netif[0].IPAddress[0];
 * with(get_net_info())alert(UserName+'\n'+Name+'\n'+Workgroup+'\n'+Domain+'\n'+BootupState);
 * @requires	WMI_data,VBA_to_JSA
 * @memberOf	CeL.application.OS.Windows.WMI
 */
CeL.get_net_info=CeL.application.OS.Windows.WMI.get_net_info=function(type){
	///	<summary>���o���d�]�w��IP�a�}</summary>
	///	<param name="type" type="" optional="false">default type: ip setted interfaces only, 1: all interfaces, 2: ���� net interfaces(�����d�A�L�u)</param>
	///	<returns/>
	///	<example>
	///	IP=get_net_info().netif[0].IPAddress[0];
	///	with(get_net_info())alert(UserName+'\n'+Name+'\n'+Workgroup+'\n'+Domain+'\n'+BootupState);
	///	</example>
	///	<requires>WMI_data,VBA_to_JSA</requires>
	///	<memberOf>CeL.application.OS.Windows.WMI</memberOf>

};
/**
 * get CIDR data
 * @param {Number} CIDR	CIDR mask bits, 0~32
 * @param {String} IP	IPv4, e.g., 1.2.3.4
 * @return	CIDR data
 * @since	2010/4/21 22:56:16
 * @memberOf	CeL.application.OS.Windows.WMI
 */
CeL.CIDR_to_IP=CeL.application.OS.Windows.WMI.CIDR_to_IP=function (CIDR, IP){
	///	<summary>get CIDR data</summary>
	///	<param name="CIDR" type="Number" optional="false">CIDR mask bits, 0~32</param>
	///	<param name="IP" type="String" optional="false">IPv4, e.g., 1.2.3.4</param>
	///	<returns>CIDR data</returns>
	///	<since>2010/4/21 22:56:16</since>
	///	<memberOf>CeL.application.OS.Windows.WMI</memberOf>

};
/**
 * ���ܺ��d��IP�a�}: change IP, set IP
 * @param to_s	IP or {IP:''||[], CIDR:24||.CIDR_notation, Subnet:''||[], DNS:''||[], Gateway:254||[], GatewayOrder:''||[]}
 * @param from	IP or netif No.
 * @since
 * 2009/5/7 0:24:5	�[�j
 * 2010/3/3 10:41:17	a work version
 * @see
 * <a href="http://msdn.microsoft.com/en-us/library/aa394217%28VS.85%29.aspx" accessdate="2010/3/3 13:15">Win32_NetworkAdapterConfiguration Class (Windows)</a>
 * <a href="http://www.yongfa365.com/item/Use-WMi-Change-IP-VBS-yongfa365.html" accessdate="2010/3/3 13:14">�q\u36807 WMI ��\u21464�I�d��IP�a�} ChangeIP.vbs - �h�êk(yongfa365)'Blog</a>
 * <a href="http://www.microsoft.com/technet/scriptcenter/topics/networking/01_atnc_intro.mspx">Automating TCP/IP Networking on Clients: Part 1: Introduction</a>
 * <a href="http://www.dotblogs.com.tw/PowerHammer/archive/2008/03/24/2060.aspx" accessdate="2010/3/3 13:15">�ϥ� WMI ���IP�B�l�����B�n�B�h�D�BDNS - �j�O���Y VB BLOG - �I����</a>
 * Using NetSh.exe (no reboot required): <a href="http://techsupt.winbatch.com/webcgi/webbatch.exe?techsupt/tsleft.web+WinBatch/How~To+Change~Ip~Address.txt" accessdate="2010/3/3 13:12">WWW Tech Support/WinBatch/How To\Change Ip Address.txt</a>
 * @example
 * set_net_info({IP:'163.16.20.212',Gateway:254});
 * sl(set_net_info({IP:'163.16.20.30',Gateway:254}));WScript.Quit();
 * @requires	WMI_data,VBA_to_JSA,JSArrayToSafeArray,CIDR_to_IP
 * @memberOf	CeL.application.OS.Windows.WMI
 */
CeL.set_net_info=CeL.application.OS.Windows.WMI.set_net_info=function (to_s, from){
	///	<summary>���ܺ��d��IP�a�}: change IP, set IP</summary>
	///	<param name="to_s" type="" optional="false">IP or {IP:''||[], CIDR:24||.CIDR_notation, Subnet:''||[], DNS:''||[], Gateway:254||[], GatewayOrder:''||[]}</param>
	///	<param name="from" type="" optional="false">IP or netif No.</param>
	///	<since>
	///	2009/5/7 0:24:5	�[�j
	///	2010/3/3 10:41:17	a work version
	///	</since>
	///	<see>
	///	<a href="http://msdn.microsoft.com/en-us/library/aa394217%28VS.85%29.aspx" accessdate="2010/3/3 13:15">Win32_NetworkAdapterConfiguration Class (Windows)</a>
	///	<a href="http://www.yongfa365.com/item/Use-WMi-Change-IP-VBS-yongfa365.html" accessdate="2010/3/3 13:14">�q\u36807 WMI ��\u21464�I�d��IP�a�} ChangeIP.vbs - �h�êk(yongfa365)'Blog</a>
	///	<a href="http://www.microsoft.com/technet/scriptcenter/topics/networking/01_atnc_intro.mspx">Automating TCP/IP Networking on Clients: Part 1: Introduction</a>
	///	<a href="http://www.dotblogs.com.tw/PowerHammer/archive/2008/03/24/2060.aspx" accessdate="2010/3/3 13:15">�ϥ� WMI ���IP�B�l�����B�n�B�h�D�BDNS - �j�O���Y VB BLOG - �I����</a>
	///	Using NetSh.exe (no reboot required): <a href="http://techsupt.winbatch.com/webcgi/webbatch.exe?techsupt/tsleft.web+WinBatch/How~To+Change~Ip~Address.txt" accessdate="2010/3/3 13:12">WWW Tech Support/WinBatch/How To\Change Ip Address.txt</a>
	///	</see>
	///	<example>
	///	set_net_info({IP:'163.16.20.212',Gateway:254});
	///	sl(set_net_info({IP:'163.16.20.30',Gateway:254}));WScript.Quit();
	///	</example>
	///	<requires>WMI_data,VBA_to_JSA,JSArrayToSafeArray,CIDR_to_IP</requires>
	///	<memberOf>CeL.application.OS.Windows.WMI</memberOf>

};
	/**
	 * translate {String} code_for_including to function
	 */
i,l,name_space,allow_inherit,name=function(){
	///	<summary>translate {String} code_for_including to function</summary>

};
	/**
	 * ���� dependency list �O���O�Ҥw loaded�C
	 * �|�X�� parent module �� request�C
	 * <dl>
	 * <dt>�� (module name-space).require �]�w dependency list</dt>
	 * <dd>(module name-space).require_module = module name[]</dd>
	 * <dd>(module name-space).require_variable = {variable_name: full_name_with_module_name}</dd>
	 * <dd>(module name-space).require_URL = URL[]</dd>
	 * </dl>
	 * TODO:
	 * �N���J module path ��i�۰ʧP�O�X�� module �ӫD���q resource�C
	 */
//require;//_.parse_require(code_for_including.require, code_for_including.require_separator, parent_module_name && module_require_chain[parent_module_name]), URL_to_load, module_to_load;
			/**
			 * �u������ module code.
			 * <code>
			 * _.debug('including code of [' + _.to_module_name(module_name) + ']..'),
			 * </code>
			 * TODO: code_for_including(_, load_arguments)
			 */
//i;//code_for_including.call(code_for_including, _);
/**
 * ���o�غc code �� module name�C���H library name �_�l�C
 * // get_module_name()
 * code_for_including.module_name === 'module_name';
 * // _.to_module_name()
 * library_name.module_parent.module_child.Class === 'library_name.module_parent.module_child' === 'library_name.module_name';
 * TODO:
 * ���Ĳv����X get_module_name() �P _.to_module_name()
 * @param code_for_including
 * @returns {String} module name
 */
get_module_name=function(code_for_including){
	///	<summary>
	///	���o�غc code �� module name�C���H library name �_�l�C
	///	// get_module_name()
	///	code_for_including.module_name === 'module_name';
	///	// _.to_module_name()
	///	library_name.module_parent.module_child.Class === 'library_name.module_parent.module_child' === 'library_name.module_name';
	///	TODO:
	///	���Ĳv����X get_module_name() �P _.to_module_name()
	///	</summary>
	///	<param name="code_for_including" type="" optional="false"/>
	///	<returns type="String">module name</returns>

};
/**
 * main process.
 * 
 * @param {Arguments} work_queue
 *            sequence of set_run.arguments. ���ק� work_queue===set_run.arguments�A�����H work_queue_index ���}�l�ȡC
 * @param {Integer} work_queue_index
 *            index of work queue
 * @param {Object}
 *            [synchronous_group] ���b running �� set.
 * 
 * @since 2011/8/4 22:31:47
 * 2011/8/8 23:27:15, �V2011/8/11 18:29:51	rewrite
 */
check_run=function(work_queue, work_queue_index, synchronous_group){
	///	<summary>
	///	main process.
	///	*
	///	</summary>
	///	<param name="work_queue" type="Arguments" optional="false">sequence of set_run.arguments. ���ק� work_queue===set_run.arguments�A�����H work_queue_index ���}�l�ȡC</param>
	///	<param name="work_queue_index" type="Integer" optional="false" integer="true">index of work queue</param>
	///	<param>
	///	{Object}
	///	[synchronous_group] ���b running �� set.
	///	*
	///	</param>
	///	<since>
	///	2011/8/4 22:31:47
	///	2011/8/8 23:27:15, �V2011/8/11 18:29:51	rewrite
	///	</since>

};
		/**
		 * �W�[���ئܷ��e�� synchronous_group.
		 */
to_run=[],to_load_path={},path_count=0,to_load_module={},module_count=0,timeout=0,add_item=function(item){
	///	<summary>�W�[���ئܷ��e�� synchronous_group.</summary>

};
	/**
	 * �{��/����s�W���ئܷ��e�� synchronous_group.
	 * callback ��.
	 */
s,index,afterwards_add=function(item, item_is_path){
	///	<summary>
	///	�{��/����s�W���ئܷ��e�� synchronous_group.
	///	callback ��.
	///	</summary>

};
	/**
	 * �n extend �� name_space �U�� variables�C
	 * variable_hash[variable name] = variable full name, �]�A�Ҧb module name.
	 */
//variable_name,value,eval_code=[],variable_hash;//name_space.require_variable;
/**
 * �N�Ʀr�ର�~�r���ܪk�C
 * num>1�ʮɶȷ|�����ơA���ɱo�নstring�A��J�I
 * TODO:
 * �ξ�:�|��bug�C
 * �ܤ�
 * @param num
 * @param kind
 * @returns
 */
to_Chinese_numeral=function(num, kind){
	///	<summary>
	///	�N�Ʀr�ର�~�r���ܪk�C
	///	num>1�ʮɶȷ|�����ơA���ɱo�নstring�A��J�I
	///	TODO:
	///	�ξ�:�|��bug�C
	///	�ܤ�
	///	</summary>
	///	<param name="num" type="" optional="false"/>
	///	<param name="kind" type="" optional="false"/>
	///	<returns/>

};
/**
 * inherit select_input
 * @class	��J bank account �� functions
 */
//},_;//library_namespace.inherit('interact.form.select_input', function() {
/**
 * inherit select_input
 * @class	��J�Ш|�{�ת� functions
 * @example
 * var education_form = new CeL.education.TW('education');
 */
//_;//library_namespace.inherit('interact.form.select_input', function() {

//	null constructor for [_.add_code]
_.add_code=function(){};
_.add_code.prototype={};

/**
 * �O�_�[�J���i
 * @type	Boolean
 */
_.add_code.report=false;

//	null constructor for [_.IEA]
_.IEA=function(){};
_.IEA.prototype={};

/**
 * get <frame>
 * @param document_object	document object
 * @param name	frame name
 * @returns
 */
_.IEA.frame=function(document_object, name){
	///	<summary>get <frame></summary>
	///	<param name="document_object" type="" optional="false">document object</param>
	///	<param name="name" type="" optional="false">frame name</param>
	///	<returns/>

};
/**
 * Ū�JCSV��<br/>
 * !! slow !!
 * @since 2007/8/6 17:53:57-22:11:22
 * @see �i�Ѧ� JKL.ParseXML.CSV.prototype.parse_CSV	2007/11/4 15:49:4
 * @deprecated �o��: use parse_CSV() instead
 * @param FP file path
 * @param FD field delimiter([,;:	]|\s+)
 * @param TD text delimiter['"]
 * @param hasTitle the data has a title line
 * @return Array contains data
 */
readCSVdata=function(FP,FD,TD,hasTitle,enc){
	///	<summary>
	///	Ū�JCSV��<br/>
	///	!! slow !!
	///	</summary>
	///	<since>2007/8/6 17:53:57-22:11:22</since>
	///	<see>�i�Ѧ� JKL.ParseXML.CSV.prototype.parse_CSV	2007/11/4 15:49:4</see>
	///	<deprecated>�o��: use parse_CSV() instead</deprecated>
	///	<param name="FP" type="" optional="false">file path</param>
	///	<param name="FD" type="" optional="false">field delimiter([,;:	]|\s+)</param>
	///	<param name="TD" type="" optional="false">text delimiter['"]</param>
	///	<param name="hasTitle" type="" optional="false">the data has a title line</param>
	///	<returns>Array contains data</returns>

};

/**
 * ��²�{���X�����G�h��\n,;�e�᪺�ťյ��A���� reduce_code() �I�s�C
 * @param code	��J����²���{���X
 * @returns	{String}	��²�ᤧ�{���X
 * @see
 * http://dean.edwards.name/packer/
 * @memberOf	CeL.data.code.reorganize
 */
CeL.data.code.reorganize.reduce_code.reduce_space=function (code){
	///	<summary>��²�{���X�����G�h��\n,;�e�᪺�ťյ��A���� reduce_code() �I�s�C</summary>
	///	<param name="code" type="" optional="false">��J����²���{���X</param>
	///	<returns type="String">��²�ᤧ�{���X</returns>
	///	<see>http://dean.edwards.name/packer/</see>
	///	<memberOf>CeL.data.code.reorganize</memberOf>

};
/**
 * uncompress archive
 * @param archive	compressed file path
 * @param eTo	where to uncompress/target
 * @param {Object} flag	flags
 * @returns
 */
uncompress=function(archive, eTo, flag){
	///	<summary>uncompress archive</summary>
	///	<param name="archive" type="" optional="false">compressed file path</param>
	///	<param name="eTo" type="" optional="false">where to uncompress/target</param>
	///	<param name="flag" type="Object" optional="false">flags</param>
	///	<returns/>

};
/**
 * �O�_���ɮ�
 * @param path	file path
 * @param create	create if not exist
 * @returns
 */
is_file=function(path, create){
	///	<summary>�O�_���ɮ�</summary>
	///	<param name="path" type="" optional="false">file path</param>
	///	<param name="create" type="" optional="false">create if not exist</param>
	///	<returns/>

};
/**
 * �O�_���ؿ�
 * @param path	file path
 * @param create	create if not exist
 * @returns	0:not folder, 1:absolute, 2:relative path
 */
is_folder=function(path, create){
	///	<summary>�O�_���ؿ�</summary>
	///	<param name="path" type="" optional="false">file path</param>
	///	<param name="create" type="" optional="false">create if not exist</param>
	///	<returns>0:not folder, 1:absolute, 2:relative path</returns>

};
/**
 * get directory name of a path
 * @param folder_path
 * @param mode	0:path, 1:filename
 * @returns
 */
get_folder=function(folder_path, mode){
	///	<summary>get directory name of a path</summary>
	///	<param name="folder_path" type="" optional="false"/>
	///	<param name="mode" type="" optional="false">0:path, 1:filename</param>
	///	<returns/>

};
/**
 * ���o�U�@�ӧǸ����ɦW�A�p��Jpp\aa.txt�N����pp\aa.txt��pp\aa[pattern].txt
 * @param file_path	file path
 * @param begin_serial	begin serial
 * @param pattern	�W�K�D�ɦW���Ҧ��A�]�tSer�������N�Q�ഫ���Ǹ�
 * @returns
 */
getNextSerialFN=function(file_path, begin_serial, pattern){
	///	<summary>���o�U�@�ӧǸ����ɦW�A�p��Jpp\aa.txt�N����pp\aa.txt��pp\aa[pattern].txt</summary>
	///	<param name="file_path" type="" optional="false">file path</param>
	///	<param name="begin_serial" type="" optional="false">begin serial</param>
	///	<param name="pattern" type="" optional="false">�W�K�D�ɦW���Ҧ��A�]�tSer�������N�Q�ഫ���Ǹ�</param>
	///	<returns/>

};
/**
 * �P�_HTML�ɬO�_��charset�]�w
 * @param file_contents	file contents
 * @returns
 */
autodetectHTMLEncode=function(file_contents){
	///	<summary>�P�_HTML�ɬO�_��charset�]�w</summary>
	///	<param name="file_contents" type="" optional="false">file contents</param>
	///	<returns/>

};