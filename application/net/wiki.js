
/**
 * @name	CeL function for Wikipedia / 維基百科
 * @fileoverview
 * 本檔案包含了 Wikipedia / 維基百科 用的 functions。
 * @since 2015/1/1
 * @example <code>

 </code>
 */

// [[維基百科:機器人]]
// https://en.wikipedia.org/w/api.php

// Wikipedia:沙盒
// https://zh.wikipedia.org/wiki/Wikipedia:%E6%B2%99%E7%9B%92
// https://zh.wikipedia.org/wiki/Special:API%E6%B2%99%E7%9B%92

'use strict';
//'use asm';

if (false) {
	// for debug: 'interact.DOM', 'application.debug',
	CeL.run([ 'interact.DOM', 'application.debug', 'application.net.wiki' ]);
	CeL.assert([ '!![[File:abc d.svg]]@@', '!![[File : Abc_d.png]]@@'
	//
	.replace(CeL.wiki.file_pattern('abc d.png'), '[[$1File:abc d.svg$3') ]);

	CeL.run([ 'interact.DOM', 'application.debug', 'application.net.wiki' ],
			function() {
				var wiki = CeL.wiki.login('', '')
				// get the content of page
				.page('Wikipedia:沙盒', function(page_data) {
					CeL.info(page_data.title);
					var content = CeL.wiki.content_of(page_data);
					CeL.log(content === undefined ? 'page deleted!' : content);
				})
				// get the content of page, and then replace it.
				.page('Wikipedia:沙盒').edit('* [[沙盒]]', {
					section : 'new',
					sectiontitle : '沙盒 test section',
					summary : '沙盒 test edit (section)',
					nocreate : 1
				})
				// get the content of page, and then modify it.
				.page('Wikipedia:沙盒').edit(function(text) {
					return text + '\n\n* [[WP:Sandbox|沙盒]]';
				}, {
					summary : '沙盒 test edit',
					nocreate : 1,
					bot : 1
				})
				// 執行過 .page() 後，與上一種方法相同。
				.page(function(page_data) {
					CeL.info(page_data.title);
					CeL.log(CeL.wiki.content_of(page_data));
				})
				// get the content of page, replace it, and set summary.
				.edit('text to replace', {
					summary : 'summary'
				})
				// get the content of page, modify it, and set summary.
				.edit(function(content) {
					return 'text to replace';
				}, {
					summary : 'summary'
				});

				CeL.wiki.page('Wikipedia:沙盒', function(page_data) {
					CeL.info(page_data.title);
					CeL.log(CeL.wiki.content_of(page_data));
				});

				wiki.logout();
			});

	// TODO: http://www.mediawiki.org/wiki/API:Edit_-_Set_user_preferences
}

// --------------------------------------------------------------------------------------------- //


if (typeof CeL === 'function')
CeL.run({
name : 'application.net.wiki',
// .includes() @ data.code.compatibility
// .between() @ data.native
// (new Date).format('%4Y%2m%2d'), (new Date).format() @ data.date
// optional: .show_value() @ interact.DOM, application.debug
require : 'data.code.compatibility.|data.native.|application.net.Ajax.get_URL|data.date.',
code : function(library_namespace) {

//	requiring
var get_URL;
eval(this.use());


// --------------------------------------------------------------------------------------------- //


/**
 * web Wikipedia / 維基百科 用的 functions。<br />
 * 可執行環境: node.js, JScript。
 */
function wiki_API(name, password, API_URL) {
	if (!this || this.constructor !== wiki_API)
		return wiki_API.query(name, password, API_URL);

	this.token = {
		// lgusername
		lgname : name,
		lgpassword : password
	};

	// action queue。應以 append，而非整個換掉的方式更改。
	this.actions = [];

	// 紀錄各種後續檢索用索引值。應以 append，而非整個換掉的方式更改。
	// 對舊版本須用到 for (in .next_mark)
	this.next_mark = library_namespace.null_Object();

	// setup session.
	//this.set_URL(API_URL);
	if (API_URL)
		this.API_URL = wiki_API.api_URL(API_URL);
}

//--------------------------------------------------------------------------------------------- //
// 工具函數。

// https://en.wikipedia.org/wiki/Wikipedia:Wikimedia_sister_projects
// project, domain or language
function api_URL(project) {
	return project ? project.includes('://') ? project : 'https://'
			+ project + '.wikipedia.org/w/api.php' : wiki_API.API_URL;
}

// 列舉型別 (enumeration)
// options.namespace: https://en.wikipedia.org/wiki/Wikipedia:Namespace
function get_namespace(namespace) {
	if (namespace in get_namespace.hash)
		return get_namespace.hash[namespace];
	if (isNaN(namespace)) {
		if (namespace)
			library_namespace.warn('get_namespace: Invalid namespace: [' + namespace + ']');
		return namespace;
	}
	return namespace | 0;
};

// The namespace number of the page.
// {{NAMESPACENUMBER:{{FULLPAGENAME}}}}
get_namespace.hash = {
	// Virtual namespaces
	media : -2,
	special : -1,
	// 0: (Main/Article)
	'' : 0,
	talk : 1,
	user : 2,
	user_talk : 3,
	// project
	wikipedia : 4,
	wikipedia_talk : 5,
	// image
	file : 6,
	file_talk : 7,
	mediawiki : 8,
	mediawiki_talk : 9,
	template : 10,
	template_talk : 11,
	help : 12,
	help_talk : 13,
	category : 14,
	category_talk : 15,
	portal : 100,
	portal_talk : 101,
	book : 108,
	book_talk : 109,
	draft : 118,
	draft_talk : 119,
	education_program : 446,
	education_program_talk : 447,
	timedtext : 710,
	timedtext_talk : 711,
	module : 828,
	module_talk : 829,
	topic : 2600
};

//---------------------------------------------------------------------//
// 創建 match patten 相關函數。

function normalize_name_pattern(file_name, add_group) {
	if (!file_name)
		return file_name;

	if (Array.isArray(file_name)) {
		var files = [];
		file_name.forEach(function(name) {
			if (name = normalize_name_pattern(name))
				files.push(name);
		});
		return (add_group ? '(' : '(?:') + files.join('|') + ')';
	}

	file_name =
	// wiki file 首字不區分大小寫。
	// the case of the first letter is not significant.
	library_namespace.ignore_first_char_case(
	// escape 特殊字元。注意:照理說來檔案或模板名不應該具有特殊字元!
	library_namespace.to_RegExp_pattern(String(file_name).trim()))
	// 不區分空白與底線。
	.replace(/[ _]/g, '[ _]');

	if (add_group)
		file_name = '(' + file_name + ')';

	return file_name;
}

/**
 * 創建匹配 [[File:file_name]] 之 patten。
 *
 * @param {String}file_name
 *            file name
 * @param {String}flag
 *            RegExp flag
 *
 * @returns {RegExp} 能 match [[File:file_name]] 之 patten。
 */
function file_pattern(file_name, flag) {
	return (file_name = normalize_name_pattern(file_name, true))
	//
	&& new RegExp(file_pattern.source.replace(/name/, file_name), flag || 'g');
}

file_pattern.source =
//[ ':', file name, 接續 ]
/\[\[[\s\n]*(?:(:)[\s\n]*)?(?:Tag)[\s\n]*:[\s\n]*name\s*(\||\]\])/
//[[ :File:name]] === [[File:name]]
.source.replace('Tag', library_namespace.ignore_case_pattern('File|Image|[檔档]案|[圖图]像'));


//---------------------------------------------------------------------//

// 模板名#後的內容會忽略。
// [ , Template name ]
var TEMPLATE_NAME_PATTERN = /{{[\s\n]*([^\s\n#\|{}<>\[\]][^#\|{}<>\[\]]*)[|}]/,
//
TEMPLATE_START_PATTERN = new RegExp(TEMPLATE_NAME_PATTERN.source.replace(
		/\[[^[]+$/, ''), 'g'),
// 內部連結
LINK_NAME_PATTERN = /\[\[[\s\n]*([^\s\n\|{}<>\[\]][^\|{}<>\[\]]*)(\||\]\])/;

if (false) {
	template_token('a{{temp|{{temp2|p{a}r}}}}b', 0, 0)
	template_token('a{{temp|{{temp2|p{a}r}}}}b', 0, 1)
	template_token('a{{temp|{{temp2|p{a}r}}}}b', 'temp', 0)
	template_token('a{{temp|{{temp2|p{a}r}}}}b', 'temp', 1)
	template_token('a{{temp|{{temp2|p{a}r}}}}b', 'temp2', 0)
	template_token('a{{temp|{{temp2|p{a}r}}}}b', 'temp2', 1)

	CeL.assert([ '{{temp|{{temp2|p{a}r}}}}',
	      		template_token('a{{temp|{{temp2|p{a}r}}}}b')[0] ]);
	CeL.assert([ '{{temp|{{temp2|p{a}r}}}}',
		      		template_token('a{{temp|{{temp2|p{a}r}}}}b', 'temp')[0] ]);
	CeL.assert([ '{{temp2|p{a}r}}',
		      		template_token('a{{temp|{{temp2|p{a}r}}}}b', 'temp2')[0] ]);
}

/**
 * 取得完整的模板 token。<br />
 * 此功能未來可能會統合於 parser 之中。
 * 
 * @param {String}wikitext
 *            模板前後之 content。<br />
 *            assert: wikitext 為良好結構 (well-constructed)。
 * @param {String}[template_name]
 *            模板名
 * @param {Boolean}no_parse
 *            是否不解析 parameters
 * 
 * @returns {Array}token = [ {String}完整的模板token, {String}模板名,
 *          {Array}parameters ];<br />
 *          token.count = count('{{') - count('}}')，正常情況下應為 0。<br />
 *          token.index, token.lastIndex: index.
 */
function template_token(wikitext, template_name, no_parse) {
	var matched = (template_name = normalize_name_pattern(template_name, true))
	// 模板起始。
	? new RegExp(/{{[\s\n]*/.source + template_name + '\\s*[|}]', 'gi')
			: new RegExp(TEMPLATE_NAME_PATTERN.source, 'g');
	library_namespace.debug('Use patten: ' + matched, 2);
	// template_name : start token
	template_name = matched.exec(wikitext);

	if (!template_name)
		// not found.
		return;

	var pattern = new RegExp('}}|'
	// 不用 TEMPLATE_NAME_PATTERN，預防把模板結尾一起吃掉了。
	+ TEMPLATE_START_PATTERN.source, 'g'), count = 1;
	// lastIndex - 1 : the last char is [|}]
	template_name.lastIndex = pattern.lastIndex = matched.lastIndex - 1;

	while (count > 0 && (matched = pattern.exec(wikitext))) {
		// 遇到模板結尾 '}}' 則減1，否則增1。
		if (matched[0] === '}}')
			count--;
		else
			count++;
	}

	wikitext = pattern.lastIndex > 0 ? wikitext.slice(template_name.index,
			pattern.lastIndex) : wikitext.slice(template_name.index);
	var result = [
	// [0]: {String}完整的模板token
	wikitext,
	// [1]: {String}模板名
	template_name[1].trim(),
	// [2] {String}parameters
	// 接下來要作用在已經裁切擷取過的 wikitext 上，需要設定好 index。
	// assert: 其他餘下 parameters 的部分以 [|}] 起始。
	// -2: 模板結尾 '}}'.length
	wikitext.slice(template_name.lastIndex - template_name.index, -2) ];
	Object.assign(result, {
		count : count,
		index : template_name.index,
		lastIndex : pattern.lastIndex
	});

	if (!no_parse) {
		// {Array}parameters
		// 警告:這邊只是單純的以 '|' 分割，但照理來說應該再 call parser 來處理。
		// 最起碼應該除掉所有可能包含 '|' 的語法，例如內部連結 [[~|~]], 模板 {{~|~}}。
		// .shift(): parameters 以 '|' 起始，因此需去掉最前面一個。
		(result[2] = result[2].split(/[\s\n]*\|[\s\n]*/)).shift();
	}

	return result;
}


// --------------------------------------------------------------------------------------------- //
// parse data


/*

{{outdent|}}
<code>int m2()</code>
[[~:~|~]]
[[~:~:~|~]]
[~ ~]
[{{}} ]
-{}-
'''~'''
''~''
\n{| ~ \n|}

*/

//https://doc.wikimedia.org/mediawiki-core/master/php/html/Parser_8php.html
//Parser.php: PHP parser that converts wiki markup to HTML.
/**
 * TODO
 *
 * @param {String}wikitext
 *            wikitext to parse
 * @param {Object}trigger
 *            觸發器 { node name : function(Array inside node) }
 *
 * @returns {Array}
 */
function parse_wikitext(wikitext, trigger) {
	if (!wikitext)
		return [];
	// 找出一個文件中不可包含的字串，作為解析用之特殊標記。
	var prefix = '\0', postfix = ';', result = [];
	wikitext = wikitext.replace(/\0/g, '');

	// 找出完整的最小單元。
	// TODO

	// https://zh.wikipedia.org/wiki/Help:%E6%A8%A1%E6%9D%BF
	// TODO: 在模板頁面中，用三個大括弧可以讀取參數
	// MediaWiki會把{{{{{{XYZ}}}}}}解析為{{{ {{{XYZ}}} }}}而不是{{ {{ {{XYZ}} }} }}

	// 模板（英語：Template，又譯作「樣板」、「範本」）
	// 模板名#後的內容會忽略。
	// [ , Template name, parameters ]
	/{{[\s\n]*([^\s\n#\|{}<>\[\]][^#\|{}<>\[\]]*)(?:#[^\|{}]*)?(\|[^{}<>\[\]]*)?}}/;
	/\[\[[\s\n]*([^\s\n\|{}<>\[\]][^\|{}<>\[\]]*)((?:\|[^\|{}<>\[\]]*)*)\]\]/;

	/\[\[([^\|\[\]{}]+)/g;
	/-{[^{]/g;
	/}}}?/g;

	// parse_wikitext('a{{temp|{{temp2|p{a}r}}}}b');
	wikitext = '{{temp|{{temp2|p{a}r{}}}}}';
	pattern = /{{[\s\n]*([^\s\n#\|{}<>\[\]][^#\|{}<>\[\]]*)/g;
	matched = pattern.exec(wikitext);
	end_index = wikitext.indexOf('}}', pattern.lastIndex);
}


// parse Date
function parse_Date(wikitext) {
	return wikitext && wikitext
	// 去掉年分前之雜項。
	.replace(/.+(\d{4}年)/, '$1')
	// 去掉星期。
	.replace(/日\s*\([^()]+\)/, '日 ')
	// Warning: need data.date.
	.to_Date();
};

// parse user name
function parse_user(wikitext) {
	var matched = wikitext && wikitext.match(
	// 使用者/用戶對話頁面
	/\[\[\s*(?:user(?:[ _]talk)?|用户(?:讨论)|用戶(?:討論))\s*:\s*([^\|\]]+)/i);
	if (matched)
		return matched[1].trim();
};


function parse_redirect(wikitext) {
	var matched = wikitext && wikitext.match(
	//
	/(?:^|[\s\n]*)#(?:REDIRECT|重定向)\s*\[\[([^\]]+)\]\]/i);
	if (matched)
		return matched[1].trim();
};

Object.assign(parse_wikitext, {
	Date : parse_Date,
	user : parse_user,
	redirect : parse_redirect
});

//---------------------------------------------------------------------//

/**
 * get the contents of page data. 取得頁面內容。
 *
 * @param {Object}page_data
 *            page data got from wiki API
 *
 * @returns {String} content of page
 */
function page_content(page_data) {
	return page_content.is_page_data(page_data) ?
	//
	(page_data = page_content.has_content(page_data)) && page_data['*']
			|| null
	// ('missing' in page_data): 此頁面已刪除。
	// e.g., { ns: 0, title: 'title', missing: '' }
	// TODO: 提供此頁面的刪除和移動日誌以便參考。
	: page_data && ('missing' in page_data) ? undefined : String(page_data);
}

/**
 * get the id of page
 *
 * @param {Object}page_data
 *            page data got from wiki API
 *
 * @returns {String|Number} pageid
 */
page_content.is_page_data = function(page_data) {
	return library_namespace.is_Object(page_data) && page_data.title
			&& page_data.pageid;
};
// return .revisions[0]
// 不回傳 {String}，減輕負擔。
page_content.has_content = function(page_data) {
	return library_namespace.is_Object(page_data)
	// treat as page data. Try to get page contents: page.revisions[0]['*']
	&& page_data.revisions && page_data.revisions[0];
};


//--------------------------------------------------------------------------------------------- //
// instance 相關函數。

wiki_API.prototype.toString = function(type) {
	return page_content(this.last_page) || '';
};

// @see function get_continue(), get_list()
wiki_API.prototype.show_next = typeof JSON === 'object' && JSON.stringify ? function() {
	return this.next_mark && JSON.stringify(this.next_mark);
} : function() {
	if (!this.next_mark)
		return;
	var line = [], value;
	for (var name in this.next_mark) {
		value = this.next_mark[name];
		line.push(name + ':' + (typeof value === 'string'
		//
		? '"' + value.replace(/"/g, '\\"') + '"' : value));
	}
	if (line.length > 0)
		return '{' + line.join(',') + '}';
};

wiki_API.prototype.next = function() {
	if (!(this.running = 0 < this.actions.length)) {
		library_namespace.debug('Empty queue.', 2, 'wiki_API.prototype.next');
		//console.warn(this);
		return;
	}

	library_namespace.debug('剩餘 ' + this.actions.length + ' action(s)', 2, 'wiki_API.prototype.next');
	if (library_namespace.is_debug(3)
		// .show_value() @ interact.DOM, application.debug
		&& library_namespace.show_value)
		library_namespace.show_value(this.actions.slice());
	var _this = this, next = this.actions.shift();
	library_namespace.debug('處理 ' + (this.token.lgname ? this.token.lgname + ' ' : '') + '[' + next + ']', 2, 'wiki_API.prototype.next');
	switch (next[0]) {
	case 'page':
		// this.page(page data, callback) → 採用所輸入之 page data 作為 this.last_page。
		if (page_content.is_page_data(next[1]) && page_content.has_content(next[1])) {
			library_namespace.debug('採用所輸入之 [' + next[1].title + '] 作為 this.last_page。', 2, 'wiki_API.prototype.next');
			this.last_page = next[1];
			if (typeof next[2] === 'function')
				// next[1] : callback
				next[2].call(this, next[1]);
			this.next();
		} else if (typeof next[1] === 'function') {
			// this.page(callback): callback(last_page)
			// next[1] : callback
			next[1].call(this, this.last_page);
			this.next();
		} else
			// this.page(title, callback)
			// next[1] : title
			// next[3] : options
			// [ {String}API_URL, {String}title ]
			wiki_API.page([ this.API_URL, next[1] ], function(page_data) {
				_this.last_page = Array.isArray(page_data) ? page_data[0] : page_data;
				// next[2] : callback
				if (typeof next[2] === 'function')
					next[2].call(_this, page_data);
				_this.next();
			}, next[3]);
		break;

	case 'backlinks':
	case 'embeddedin':
	case 'imageusage':
	case 'linkshere':
	case 'fileusage':
		// get_list(). e.g., 反向連結/連入頁面.
		// next[1] : title
		wiki_API[next[0]]([ this.API_URL, next[1] ], function(title, titles, pages) {
			// [ last_list ]
			_this.last_titles = titles;
			// [ page_data ]
			_this.last_pages = pages;

			if (typeof next[2] === 'function')
				// next[2] : callback(title, titles, pages)
				next[2].call(_this, title, titles, pages);
			else if (next[2] && next[2].each)
				// next[2] : 當作 work，處理積存工作。
				if (pages)
					_this.work(next[2]);
				else
					// 只有在本次有處理頁面時，才繼續下去。
					library_namespace.info('無頁面可處理（已完成？），中斷跳出。');

			_this.next();
		},
		// next[3] : options
		Object.assign(library_namespace.null_Object(), this.next_mark, {
			// 作業中之 {wiki_API}
			wiki : _this
		}, next[3]));
		break;

	case 'search':
		wiki_API.search([ this.API_URL, next[1] ], function(key, pages, hits) {
			// [ page_data ]
			_this.last_pages = pages;
			// 設定/紀錄後續檢索用索引值。
			// 若是將錯誤的改正之後，應該重新自 offset 0 開始 search。
			// 因此這種情況下基本上不應該使用此值。
			if (pages.sroffset)
				_this.next_mark.sroffset = pages.sroffset;

			if (typeof next[2] === 'function')
				// next[2] : callback(key, pages, hits)
				next[2].call(_this, key, pages, hits);
			else if (next[2] && next[2].each)
				// next[2] : 當作 work，處理積存工作。
				_this.work(next[2]);

			_this.next();
		},
		// next[3] : options
		next[3]);
		break;

	case 'edit':
		// TODO: {String|RegExp|Array}filter
		if (!this.last_page) {
			library_namespace.warn('wiki_API.prototype.next: No page in the queue. You must run .page() first!');
			// next[3] : callback
			if (typeof next[3] === 'function')
				next[3].call(_this, title, 'no page');
			this.next();
		} else if (wiki_API.edit.denied(this.last_page, this.token.lgname, next[2] && next[2].action)) {
			// 採用 this.last_page 的方法，在 multithreading 下可能因其他 threading 插入而造成問題，須注意！
			library_namespace.warn('wiki_API.prototype.next: Denied to edit [' + this.last_page.title + ']');
			// next[3] : callback
			if (typeof next[3] === 'function')
				next[3].call(this, this.last_page.title, 'denied');
			this.next();
		} else {
			if (typeof next[1] === 'function')
				next[1] = next[1](page_content(this.last_page), this.last_page.title);
			if (next[2] && next[2].skip_nochange
			// 採用 skip_nochange 可以跳過實際 edit 的動作。
			&& next[1] === page_content(this.last_page)) {
				library_namespace.debug('Skip [' + this.last_page.title + ']: The same contents.');
				// next[3] : callback
				if (typeof next[3] === 'function')
					next[3].call(this, this.last_page.title, 'nochange');
				_this.next();
			} else
				wiki_API.edit([ this.API_URL, this.last_page ],
				// 因為已有 contents，直接餵給轉換函式。
				next[1], this.token,
				// next[2]: options to edit()
				next[2], function(title, error, result) {
					// 當運行過多次，就可能出現 token 不能用的情況。需要重新 get token。
					if (result && result.error && result.error.code === 'badtoken') {
						// Invalid token
						library_namespace.warn('wiki_API.prototype.next: It seems we lost the token.');
						if (!_this.token.lgpassword) {
							library_namespace.err('wiki_API.prototype.next: No password to get token again. About.');
							return;
						}
						library_namespace.info('wiki_API.prototype.next: Try to get token again. 似乎丟失了 token，嘗試重新取得 token。');
						// rollback
						_this.actions.unshift(next);
						// see wiki_API.login
						delete _this.token.csrftoken;
						wiki_API.login(_this.token.lgname, _this.token.lgpassword, {
							session : _this,
							// 將 'login' 置於最前頭。
							login_mark : true
						});
					} else {
						// next[3] : callback
						if (typeof next[3] === 'function')
							next[3].call(_this, title, error, result);
						_this.next();
					}
				});
		}
		break;

	case 'login':
		library_namespace.debug('正 log in 中，當 login 後，會自動執行 .next()，處理餘下的工作。', 2, 'wiki_API.prototype.next');
	case 'wait':
		// rollback
		this.actions.unshift(next);
		break;

	case 'logout':
		// 結束
		wiki_API.logout(function() {
			if (typeof next[1] === 'function')
				next[1].call(_this);
			_this.next();
		});
		break;

	case 'set_URL':
		if (next[1] && typeof next[1] === 'string')
			this.API_URL = wiki_API.api_URL(next[1]);
		this.next();
		break;

	case 'run':
		if (typeof next[1] === 'function')
			next[1].call(this, next[2]);
		this.next();
		break;

	default:
		library_namespace.warn('Unknown operation: [' + next.join() + ']');
		this.next();
		break;
	}
};

// wiki_API.prototype.next() 已登記之 methods。
// 之後會再加入 get_list.type 之 methods。
// NG: ,login
wiki_API.prototype.next.methods = 'page,edit,search,logout,run,set_URL'
	.split(',');

//---------------------------------------------------------------------//

// @see ISO 8601
wiki_API.prototype.date_format = '%4Y%2m%2dT%2H%2M';

// 後續檢索用索引值
wiki_API.prototype.continue_key = '後續索引';

// 規範 log 之格式。
function add_message(message, title) {
	this.push('* ' + (title ? '[[' + title + ']]: ' : '') + message);
}


// wiki_API.prototype.work(config): configuration:
({
	first : function(messages, titles, pages) {
	},
	// {Function|Array} 每個 page 執行一次。
	each : function(content, title, messages, page_data) {
		return 'text to replace';
	},
	last : function(messages, titles, pages) {
	},
	// 不作編輯作業。
	no_edit : true,
	// 設定寫入目標。一般為 debug、test 測試期間用。
	write_to : '',
	// 運作記錄存放頁面。
	log_to : 'User:Robot/log/%4Y%2m%2d',
	// 編輯摘要。總結報告。「新條目、修飾語句、修正筆誤、內容擴充、排版、內部鏈接、分類、消歧義、維基化」
	summary : ''
});

// 不會推入 this.actions queue，即時執行。因此需要先 get list!
wiki_API.prototype.work = function(config, pages, titles) {
	if (typeof config === 'function')
		config = {
			each : config
		};
	if (!config || !config.each) {
		library_namespace.warn('wiki_API.work: Bad callback!');
		return;
	}

	if (!pages)
		pages = this.last_pages, titles = this.last_titles;
	// config.run_empty: 即使無頁面/未取得頁面，依舊強制執行下去。
	if (!pages && !titles && !config.run_empty) {
		// 採用推入前一個 this.actions queue 的方法，
		// 在 multithreading 下可能因其他 threading 插入而造成問題，須注意！
		library_namespace
				.warn('wiki_API.work: No list. Please get list first!');
		return;
	}

	library_namespace.debug('wiki_API.work: 開始執行:先做環境建構與初始設定。');
	if (config.summary)
		library_namespace.info('wiki_API.work: start [' + config.summary + ']');

	// default handler [ text replace function(title, content), {Object}options, callback(title, error, result) ]
	var each,
	// options 在此暫時作為 default options。
	options = config.options || {
		// Throw an error if the page doesn't exist.
		// 若頁面不存在，則產生錯誤。
		// 要取消這項，須注意在重定向頁之對話頁操作之可能。
		nocreate : 1,
		// 該編輯是一個小修訂 (minor edit)。
		minor : 1,
		// 標記此編輯為機器人編輯。
		bot : 1,
		// 設定寫入目標。一般為 debug、test 測試期間用。
		write_to : '',
		// 採用 skip_nochange 可以跳過實際 edit 的動作。
		// 對於大部分不會改變頁面的作業，能大幅加快速度。
		skip_nochange : true
	}, callback, nochange_count = 0;

	if (typeof config.each === 'function') {
		// {Function}
		each = [ config.each ];
		if (!config.options) {
			// 直接將 config 的設定導入 options。
			// e.g., write_to
			for (callback in options) {
				if (callback in config) {
					if (!config[callback] && callback in {
							nocreate : 1,
							minor : 1,
							bot : 1
						})
						// 即使設定 minor=0 似乎也會當作設定了，得完全消滅才行。
						delete options[callback];
					else
						options[callback] = config[callback];
				}
			}
		}

	} else if (Array.isArray(config.each))
		each = config;
	else
		library_namespace.err(
		//
		'wiki_API.work: Invalid function for each page!');

	if (each[1])
		Object.assign(options, each[1]);
	options.summary = (callback = config.summary)
	// 是為 Robot 運作。
	? /bot/i.test(callback) ? callback : 'Robot: ' + callback
	// 未設置時，一樣添附 Robot。
	: 'Robot';

	// assert: 因為要做排程，為預防衝突與不穩定的操作結果，自此以後不再 modify options。

	var log_item = Object.assign(library_namespace.null_Object(),
			wiki_API.prototype.work.log_item, config.log_item);

	if (!(callback = each[2]))
		// default logger.
		callback = function(title, error, result) {
			if (error)
				if (error === 'nochange') {
					done++;
					// 未經過 wiki 操作，於 wiki_API.edit 發現為無改變的。
					nochange_count++;
					error = '無改變。';
					result = 'nochange';
				} else {
					// 有錯誤發生。
					result = [ 'error', error ];
					error = ' 結束: ' + error;
				}
			else {
				// 成功完成。
				done++;
				if (result.edit.newrevid) {
					// https://en.wikipedia.org/wiki/Help:Wiki_markup#Linking_to_old_revisions_of_pages.2C_diffs.2C_and_specific_history_pages
					error = ' [[Special:Diff/' + result.edit.newrevid + '|完成]]。';
					result = 'succeed';
				} else if ('nochange' in result.edit) {
					// 經過 wiki 操作，發現為無改變的。
					nochange_count++;
					error = '無改變。';
					result = 'nochange';
				} else {
					// 有時無 result.edit.newrevid。
					library_namespace.err('無 result.edit.newrevid');
					error = '完成。';
					result = 'succeed';
				}
			}

			// error: message, result: result type.

			error = '間隔 ' + messages.last.age(new Date) + '，'
			// 紀錄使用時間, 費時
			+ (messages.last = new Date).format(config.date_format || this.date_format) + ' ' + error;
			if (log_item[ Array.isArray(result) ?
			// {Array}result = [ main, sub ]
			result.join('_') in log_item ? result.join('_') : result[0] : result ])
				messages.add(error, title);
		};
	// each 現在轉作為對每一頁面執行之工作。
	each = each[0];

	var done = 0, messages = [];
	// 設定 time stamp。
	messages.start = messages.last = new Date;
	messages.add = add_message;

	if (false && Array.isArray(pages)
	//
	&& (Array.isArray(titles) ? pages.length !== titles.length : !titles)) {
		library_namespace.warn('wiki_API.work: rebuild titles.');
		titles = [];
		pages.forEach(function(page) {
			titles.push(page.title);
		});
	}

	if (Array.isArray(pages) && Array.isArray(titles) && pages.length !== titles.length)
		library_namespace.warn('wiki_API.work: The length of pages and titles are different!');

	library_namespace.debug('wiki_API.work: 設定一次先取得所有 revisions (page content)。', 2);
	this.page(pages || titles, function(data) {
		if (!Array.isArray(data))
			if (!data && pages.length === 0) {
				library_namespace.info('wiki_API.work: 未取得任何頁面。已完成？');
				data = [];
			} else
				// 可能是 page data 或 title。
				data = [ data ];

		if (Array.isArray(pages) && data.length !== pages.length)
			library_namespace.warn('wiki_API.work: query 所得之 length (' + data.length + ') !== pages.length (' + pages.length + ') !');
		// config.continue_wiki: 後續檢索用索引值存儲所在的 {wiki_API}，將會以此 instance 之值寫入 log。
		if ((pages = 'continue_wiki' in config ? config.continue_wiki : this)
			// pages: 後續檢索用索引值暫存值。
			&& (pages = pages.show_next()))
			messages.add(this.continue_key + ': ' + pages);
		// 使用時間, 費時
		pages = '首先使用 ' + messages.last.age(new Date) + ' 以取得 ' + data.length + ' 個頁面內容。';
		// 在「首先使用」之後才設定 .last，才能正確抓到「首先使用」。
		messages.last = new Date;
		if (log_item.get_pages)
			messages.add(pages);
		library_namespace.debug(pages, 2, wiki_API.work);
		if (library_namespace.is_debug()
			// .show_value() @ interact.DOM, application.debug
			&& library_namespace.show_value)
			library_namespace.show_value(data, 'pages');
		pages = data;

		if (typeof config.first === 'function')
			config.first.call(this, messages, titles, pages);

		library_namespace.debug('wiki_API.work: for each page: 主要機制是把工作全部推入 queue。', 2);
		pages.forEach(function(page, index) {
			if (library_namespace.is_debug(2)
				// .show_value() @ interact.DOM, application.debug
				&& library_namespace.show_value)
				library_namespace.show_value(page, 'page');
			if (config.no_edit)
				// 不作編輯作業。
				// 取得頁面內容。
				this.page(page, function(page_data) {
					each(page_content(page_data), wiki_API.title_of(page_data), messages, page_data);
				});
			else
				// 取得頁面內容。
				this.page(page)
				// 編輯頁面內容。
				.edit(function(content, title) {
					// edit/process
					library_namespace.info('wiki_API.work: edit '
					//
					+ (index + 1) + '/' + pages.length + ' [[' + page.title + ']]');
					return each(content, title, messages, page);
				}, options, callback);
		}, this);

		this.run(function() {
			library_namespace.debug('wiki_API.work: 收尾。');
			if (log_item.report)
				messages.unshift(': 完成 ' + done + (done === pages.length ? '' : '/' + pages.length) + ' 條目，'
				//
				+ (nochange_count ? (done === nochange_count ? '所有' : nochange_count + ' ') + '條目未作變更，' : '')
				// 使用時間, 費時
				+ '前後總共 ' + messages.start.age(new Date) + '。');
			if (done === nochange_count)
				messages.add('全無變更。');
			if (log_item.title && config.summary)
				messages.unshift(config.summary);

			if (typeof config.last === 'function')
				config.last.call(this, messages, titles, pages);

			var log_to = 'log_to' in config ? config.log_to
			// default log_to
			: 'User:' + this.token.lgname + '/log/' + (new Date).format('%4Y%2m%2d'),
			// options for summary.
			options = {
				// append after all, at bottom.
				section : 'new',
				sectiontitle : '[' + (new Date).format(config.date_format || this.date_format) + '] ' + done
				//
				+ (done === pages.length ? '' : '/' + pages.length) + ' 條目',
				summary : 'Robot: ' + config.summary + ': 完成 ' + done + (done === pages.length ? '' : '/' + pages.length) + ' 條目',
				// Throw an error if the page doesn't exist.
				// 若頁面不存在，則產生錯誤。
				nocreate : 1,
				// 標記此編輯為機器人編輯。
				bot : 1
			};

			if (log_to)
				this.page(log_to)
				// log summary. Robot 運作記錄。
				// TODO: 以表格呈現。
				.edit(messages.join('\n'), options, function(title, error, result) {
					if (error) {
						library_namespace.warn('wiki_API.work: Can not write log to [' + log_to
						//
						+ ']! Try to write to [' + 'User:' + this.token.lgname + ']');
						library_namespace.log('\nlog:<br />\n' + messages.join('<br />\n'));
						// 改寫於可寫入處。e.g., 'Wikipedia:Sandbox'
						this.page('User:' + this.token.lgname).edit(messages.join('\n'), options);
					}
				});
			else
				library_namespace.log('\nlog:<br />\n' + messages.join('<br />\n'));

			// config.callback()
			// 只有在成功時，才會繼續執行。
			if (typeof config.after === 'function')
				this.run(config.after);
		});
	}, {
		multi : true
	});
};

// 選擇要紀錄的項目。在大量編輯時，可利用此縮減 log。
wiki_API.prototype.work.log_item = {
		title : true,
		report : true,
		get_pages : true,
		// 跳過無改變的。
		//nochange : false,
		error : true,
		succeed : true
};


//--------------------------------------------------------------------------------------------- //
// 泛用，無須 instance。

// {String}action or [ {String}api URL, {String}action, {Object}other parameters ]
wiki_API.query = function (action, callback, post_data) {
	// 處理 action
	library_namespace.debug('action: ' + action, 2, 'wiki_API.query');
	if (typeof action === 'string')
		action = [ , action ];
	else if (!Array.isArray(action))
		library_namespace.err('wiki_API.query: Invalid action: [' + action + ']');
	action[0] = wiki_API.api_URL(action[0]);

	// 檢測是否間隔過短。
	var to_wait = Date.now() - wiki_API.query.last[action[0]];
	if (to_wait < wiki_API.query.lag) {
		to_wait = wiki_API.query.lag - to_wait;
		library_namespace.debug('Waiting ' + to_wait + ' ms..', 2, 'wiki_API.query');
		setTimeout(function() {
			wiki_API.query(action, callback, post_data);
		}, to_wait);
		return;
	}
	wiki_API.query.last[action[0]] = Date.now();

	// https://en.wikipedia.org/w/api.php?action=help&modules=query
	if (!/^[a-z]+=/.test(action[1]))
		action[1] = 'action=' + action[1];
	// https://www.mediawiki.org/wiki/API:Data_formats
	// 因不在 white-list 中，無法使用 CORS。
	action[0] += '?' + action[1];
	// [ {String}api URL, {String}action, {Object}other parameters ]
	// →
	// [ {String}URL, {Object}other parameters ]
	action = library_namespace.is_Object(action[2]) ? [ action[0], action[2] ]
	//
	: [ action[2] ? action[0] + action[2] : action[0], library_namespace.null_Object() ];
	if (!action[1].format)
		// 加上 "&utf8=1" 可能會導致把某些 link 中 URL 編碼也給 unescape 的情況！
		action[0] = get_URL.add_param(action[0], 'format=json&utf8=1');

	// 開始處理。
	if (!post_data && wiki_API.query.allow_JSONP) {
		library_namespace.debug('採用 JSONP callback 的方法。須注意：若有 error，將不會執行 callback！', 2, 'wiki_API.query');
		library_namespace.debug('callback : (' + (typeof callback) + ') [' + callback + ']', 3, 'wiki_API.query');
		get_URL(action, {
			callback : callback
		});
	} else
		get_URL(action, function(XMLHttp) {
			var response = XMLHttp.responseText;
			library_namespace.debug('response: '
				+ (library_namespace.is_node ? '\n' + response : response.replace(/</g, '&lt;')), 3, 'wiki_API.query');

			if (/<html[\s>]/.test(response.slice(0, 40))) {
				response = response.between('source-javascript', '</pre>').between('>')
				// 去掉所有 HTML tag。
				.replace(/<[^>]+>/g, '');

				// '&#123;' : (")
				// 可能會導致把某些 link 中 URL 編碼也給 unescape 的情況?
				if (response.includes('&#'))
					response = library_namespace.HTML_to_Unicode(response);
			}

			// library_namespace.log(response);
			// library_namespace.log(library_namespace.HTML_to_Unicode(response));
			if (response)
				try {
					response = library_namespace.parse_JSON(response);
				} catch (e) {
					library_namespace.err('wiki_API.query: Invalid content: [' + response + ']');
					// exit!
					return;
				}

			// response = XMLHttp.responseXML;
			if (library_namespace.is_debug()
				// .show_value() @ interact.DOM, application.debug
				&& library_namespace.show_value)
				library_namespace.show_value(response);
			if (typeof callback === 'function')
				callback(response);
		}, '', post_data);
};

// 使用5秒的最大延遲參數。
// https://www.mediawiki.org/wiki/Manual:Maxlag_parameter
wiki_API.query.lag = 5000;

// 對於可以不用 XMLHttp 的，直接採 JSONP callback 法。
wiki_API.query.allow_JSONP = library_namespace.is_WWW(true);

// wiki_API.query.last[URL] = {Date}last query
wiki_API.query.last = library_namespace.null_Object();

// 取得 page_data 之 title parameter。
// e.g., {pageid:8,title:'abc'} → 'pageid=8'
// e.g., {title:'abc'} → 'title=abc'
// e.g., 'abc' → 'title=abc'
wiki_API.query.title_param = function(page_data, multi) {
	var pageid;
	if (Array.isArray(page_data)) {
		pageid = [];
		// 確認所有 page_data 皆有 pageid 屬性。
		if (page_data.every(function(page) {
			// {Number}page.pageid
			if (page = page && page.pageid)
				pageid.push(page);
			return page;
		})) {
			// auto detect
			if (multi === undefined)
				multi = pageid.length > 1;
			pageid = pageid.join('|');
		} else {
			if (library_namespace.is_Object(page_data)) {
				library_namespace.warn('wiki_API.query.title_param: 看似有些非正規之頁面資料。');
				library_namespace.info('wiki_API.query.title_param: 將採用 title 為主要查詢方法。');
			}
			pageid = [];
			page_data.forEach(function(page) {
				// {String}title or {title:'title'}
				pageid.push((typeof page === 'object' ? page.title : page) || '');
			});
			// auto detect
			if (multi === undefined)
				multi = pageid.length > 1;
			page_data = pageid.join('|');
			library_namespace.debug(page_data, 2, 'wiki_API.query.title_param');
			pageid = undefined;
		}

	} else if (library_namespace.is_Object(page_data))
		if (page_data.pageid)
			// 有 pageid 則使用之，以加速 search。
			pageid = page_data.pageid;
		else
			page_data = page_data.title;
	else if (typeof page_data === 'number'
	// {Number}pageid should > 0.
	// pageid 0 回傳格式不同於 > 0。
	// https://en.wikipedia.org/w/api.php?action=query&prop=revisions&pageids=0
	&& page_data > 0 && page_data === page_data | 0)
		pageid = page_data;
	else if (!page_data) {
		library_namespace.err('wiki_API.query.title_param: Invalid title: [' + page_data + ']');
		//console.warn(page_data);
	}

	multi = multi ? 's=' : '=';

	return pageid === undefined ? 'title' + multi + encodeURIComponent(page_data)
	//
	: 'pageid' + multi + pageid;
};

wiki_API.query.id_of_page = function(page_data, title_only) {
	if (Array.isArray(page_data))
		return page_data.map(function(page) {
			wiki_API.query.id_of_page(page, title_only);
		});
	if (library_namespace.is_Object(page_data))
		// 有 pageid 則使用之，以加速。
		return !title_only && page_data.pageid || page_data.title;

	if (!page_data)
		library_namespace.err('wiki_API.query.id_of_page: Invalid title: [' + page_data + ']');
	return page_data;
};

//---------------------------------------------------------------------//


/**
 * 讀取頁面內容。可一次處理多個標題。
 *
 * @example <code>

CeL.wiki.page('道', function(p) {
	CeL.show_value(p);
});

 </code>
 * @param {String|Array}title
 *            title or [ {String}API_URL, {String}title ]
 * @param {Function}callback
 *            callback(page_data) { page_data.title; var content = CeL.wiki.content_of(page_data); }
 * @param options
 *
 * @see https://en.wikipedia.org/w/api.php?action=help&modules=query%2Brevisions
 */
wiki_API.page = function(title, callback, options) {
	// 處理 [ {String}API_URL, {String}title ]
	if (!Array.isArray(title)
	// 為了預防輸入的是問題頁面。
	|| title.length !== 2 || typeof title[0] === 'object')
		title = [ , title ];
	title[1] = wiki_API.query.title_param(title[1], true);

	// 處理 limit。單一頁面才能取得多 revisions。多頁面(<=50)只能取得單一 revision。
	// https://en.wikipedia.org/w/api.php?action=help&modules=query
	// titles/pageids: Maximum number of values is 50 (500 for bots).
	if (options && ('rvlimit' in options)) {
		if (options.rvlimit > 0 || options.rvlimit === 'max')
			title[1] += '&rvlimit=' + options.rvlimit;
	} else if (!title[1].includes('|')
	//
	&& !title[1].includes(encodeURIComponent('|')))
		// default: 僅取得單一 revision。
		title[1] += '&rvlimit=1';

	title[1] = 'query&prop=revisions&rvprop=content|timestamp&'
	// &rvexpandtemplates=1
	// prop=info|revisions
	+ title[1];
	if (!title[0])
		title = title[1];

	// library_namespace.debug('get url token: ' + title, 0, 'wiki_API.page');

	wiki_API.query(title, typeof callback === 'function'
	//
	&& function(data) {
		if (library_namespace.is_debug(2)
			// .show_value() @ interact.DOM, application.debug
			&& library_namespace.show_value)
			library_namespace.show_value(data, 'wiki_API.page: data');

		var error = data && data.error;
		// 檢查伺服器回應是否有錯誤資訊。
		if (error) {
			library_namespace.err('wiki_API.page: [' + error.code + '] ' + error.info);
			// e.g., Too many values supplied for parameter 'pageids': the limit is 50
			if (data.warnings && data.warnings.query && data.warnings.query['*'])
				library_namespace.warn(data.warnings.query['*']);
			return callback();

		} else if (!data || !data.query || !data.query.pages) {
			library_namespace.warn('wiki_API.page: Unknown response: [' + data + ']');
			if (library_namespace.is_debug()
				// .show_value() @ interact.DOM, application.debug
				&& library_namespace.show_value)
				library_namespace.show_value(data);
			return callback();
		}

		data = data.query.pages;
		var pages = [];
		for ( var pageid in data) {
			var page = data[pageid];
			pages.push(page);
			if (!page_content.has_content(page))
				library_namespace.warn('wiki_API.page: '
				// 頁面不存在。Page does not exist. Deleted?
				+ ('missing' in page ? 'Not exists' : 'No content') + ': [' + page.title + ']');
		}

		// options.multi: 即使只取得單頁面，依舊回傳 Array。
		if (!options || !options.multi)
			if (pages.length <= 1) {
				pages = pages[0];
				library_namespace.debug('只取得單頁面 [[' + pages.title + ']]，將回傳此頁面內容，而非 Array。', 2, 'wiki_API.page');
			} else
				library_namespace.debug('Get ' + pages.length
				//
				+ ' page(s)! The pages will all passed to callback as Array!', 2, 'wiki_API.page');

		// page 之 structure 將按照 wiki 本身之 return！
		// page = {pageid,ns,title,revisions:[{timestamp,'*'}]}
		callback(pages);
	});
};

//---------------------------------------------------------------------//

/*

// 'Language'
CeL.wiki.langlinks('語言',function(p){CeL.show_value(p);},'en');

// '語言'
CeL.wiki.langlinks(['en','Language'],function(p){if(p)CeL.show_value(p);},'zh');

CeL.wiki.langlinks('語言',function(p){if(p)CeL.show_value(p);})
==
CeL.wiki.langlinks('語言',function(p){if(p)CeL.show_value(p);},10)
== {langs:['',''], lang:'title'}

未指定 page，表示已完成。

*/

// 取得 title 在其他語系 (to_lang) 之標題。可一次處理多個標題。
// return 'title' or {langs:['',''], lang:'title'}
wiki_API.langlinks = function(title, callback, to_lang, options) {
	var from_lang;
	if (Array.isArray(title) && title.length === 2 && (!title[0] || typeof title[0] === 'string'))
		from_lang = title[0], title = title[1];
	title = 'query&prop=langlinks&' + wiki_API.query.title_param(title, true);
	if (to_lang)
		title += (to_lang > 0 || to_lang === 'max' ? '&lllimit=' : '&lllang=') + to_lang;
	if (options.limit > 0 || options.limit === 'max')
		title += '&lllimit=' + options.limit;
	//console.log('ll title:' + title);
	if (from_lang)
		// llinlanguagecode 無效。
		title = [ from_lang, title ];

	wiki_API.query(title, typeof callback === 'function'
	//
	&& function(data) {
		if (!data || !data.query || !data.query.pages) {
			// https://www.mediawiki.org/wiki/API:Query#batchcomplete
			// From version 1.25 onwards, the API returns a batchcomplete element to indicate that all data for the current "batch" of pages has been returned.
			if (data && ('batchcomplete' in data)) {
				// data.batchcomplete === ''
				//library_namespace.info('wiki_API.langlinks: [' + title + ']: Done.');
			} else {
				library_namespace.warn('wiki_API.langlinks: Unknown response: [' + data + ']');
				//console.log(data);
			}
			//console.warn(data);
			if (library_namespace.is_debug()
				// .show_value() @ interact.DOM, application.debug
				&& library_namespace.show_value)
				library_namespace.show_value(data);
			return callback();
		}

		data = data.query.pages;
		var pages = [];
		for ( var pageid in data)
			pages.push(data[pageid]);
		if (pages.length !== 1 || (options && options.multi)) {
			if (library_namespace.is_debug())
				library_namespace.info('wiki_API.langlinks: Get ' + pages.length
				//
				+ ' page(s)! We will pass all pages to callback!');
			// page 之 structure 按照 wiki 本身之 return！
			// page = {pageid,ns,title,revisions:[{langlinks,'*'}]}
			callback(pages);
		} else {
			if (library_namespace.is_debug() && !pages[0].langlinks) {
				library_namespace.warn('wiki_API.langlinks: '
				//
				+ ('pageid' in pages[0] ? '無' + (to_lang && isNaN(to_lang) ? '所欲求語言[' + to_lang + ']之' : '其他語言') + '連結' : '不存在此頁面')
				+ ': [' + pages[0].title + ']');
				// library_namespace.show_value(pages);
			}
			pages = pages[0].langlinks;
			callback(pages ? to_lang && isNaN(to_lang) ? pages[0]['*']
			//
			: wiki_API.langlinks.parse(pages) : pages);
		}
	});
};

wiki_API.langlinks.parse = function(langlinks, to_lang) {
	if (langlinks && Array.isArray(langlinks.langlinks))
		langlinks = langlinks.langlinks;

	if (!Array.isArray(langlinks)) {
		if (library_namespace.is_debug()) {
			library_namespace.warn('wiki_API.langlinks.parse: No langlinks exists?'
				+ (langlinks && langlinks.title ? ' [[' + langlinks.title + ']]' : ''));
			if (library_namespace.is_debug(2)
				// .show_value() @ interact.DOM, application.debug
				&& library_namespace.show_value)
			library_namespace.show_value(langlinks, 'langlinks.parse');
		}
		return;
	}

	var langs;
	if (to_lang) {
		langlinks.some(function(lang) {
			if (to_lang == lang.lang) {
				langs = lang['*'];
				return true;
			}
		});

	} else {
		(langs = library_namespace.null_Object()).langs = [];
		langlinks.forEach(function(lang) {
			langs[lang.lang] = lang['*'];
			langs.langs.push(lang.lang);
		});
	}
	return langs;
};


//---------------------------------------------------------------------//

/**
 * 自 title 頁面取得後續檢索用索引值 (continuation data)。 e.g., 'continue'
 *
 * @param {String|Array}title
 *            the page title to search continue information
 * @param {Function|Object}callback
 *            回調函數 or options。 callback({Object} continue data);
 */
function get_continue(title, callback) {
	var options;
	if (library_namespace.is_Object(callback))
		callback = (options = callback).callback;
	else
		// 前置處理。
		options = library_namespace.null_Object();

	wiki_API.page(title, function(page_data) {
		var matched, done, content = page_content(page_data),
		// {RegExp}[options.pattern]:
		// content.match(pattern) === [ , '{type:"continue"}' ]
		pattern = options.pattern,
		// {Object} continue data
		data = library_namespace.null_Object();

		if (!pattern)
			pattern = new RegExp(library_namespace.to_RegExp_pattern(
			//
			(options.continue_key || wiki_API.prototype.continue_key).trim())
					+ ' *:? *({[^{}]{0,80}})', 'g');
		library_namespace.debug('pattern: ' + pattern, 2, 'get_continue');

		while (matched = pattern.exec(content)) {
			library_namespace.debug('continue data: [' + matched[1] + ']', 2, 'get_continue');
			if (!(done = /^{\s*}$/.test(matched[1])))
				data = Object.assign(data,
				//
				library_namespace.parse_JSON(matched[1]));
		}

		// options.get_all: get all continue data.
		if (!options.get_all)
			if (done) {
				library_namespace.debug('最後一次之後續檢索用索引值為空，可能已完成？', 1, 'get_continue');
				data = null;
			} else {
				// {String|Boolean}[options.type]: what type to search.
				matched = options.type;
				if (matched in get_list.type)
					matched = get_list.type[matched] + 'continue';

				content = data;
				data = library_namespace.null_Object();
				if (matched in content)
					data[matched] = content[matched];
			}

		// callback({Object} continue data);
		callback(data || library_namespace.null_Object());
	}, options);
}


//---------------------------------------------------------------------//

/**
 * get list<br />
 * 注意:可能會改變 options!
 *
 * @param {String}type
 *            one of get_list.type
 * @param {String}title
 *            頁面標題。
 * @param {Function}callback
 *            回調函數。
 * @param {Number|String}namespace
 *            one of get_namespace.hash
 */
function get_list(type, title, callback, namespace) {
	library_namespace.debug(type + '[[' + title + ']], callback: ' + callback,
			3);
	var options, prefix = get_list.type[type], parameter;
	if (Array.isArray(prefix)) {
		parameter = prefix[1];
		prefix = prefix[0];
	} else
		parameter = get_list.default_parameter;
	if (library_namespace.is_Object(namespace))
		// 當作 options。
		namespace = (options = namespace).namespace;
	else
		// 前置處理。
		options = library_namespace.null_Object();

	if (isNaN(namespace = get_namespace(namespace)))
		delete options.namespace;
	else
		options.namespace = namespace;

	// 處理 [ {String}API_URL, {String}title ]
	if (!Array.isArray(title))
		title = [ , title ];

	var continue_from = prefix + 'continue',
	// {wiki_API}options.continue_wiki: 藉以取得後續檢索用索引值之 {wiki_API}。
	// 若未設定 .next_mark，才會自 options.get_continue 取得後續檢索用索引值。
	continue_wiki = options.continue_wiki;
	if (continue_wiki)
		if(continue_wiki.constructor === wiki_API) {
			library_namespace.debug('直接傳入了 {wiki_API}；可延續使用上次的後續檢索用索引值，避免重複 loading page。', 4, 'get_list');
			// usage: options: { continue_wiki : wiki, get_continue : log_to }
			// 注意:這裡會改變 options!
			// assert: {Object}continue_wiki.next_mark
			if (continue_from in continue_wiki.next_mark) {
				// {String}continue_wiki.next_mark[continue_from]: 後續檢索用索引值。
				options[continue_from] = continue_wiki.next_mark[continue_from];
				// 經由,經過,通過來源
				library_namespace.info('get_list: continue from [' + options[continue_from] + '] via {wiki_API}');
				// 刪掉標記，避免無窮迴圈。
				delete options.get_continue;
			} else {
				// 設定好 options.get_continue，以進一步從 page 取得後續檢索用索引值。
				if (typeof options.get_continue === 'string')
					// 採用 continue_wiki 之 domain。
					options.get_continue = [ continue_wiki.API_URL, options.get_continue ];
			}
		} else {
			library_namespace.debug('傳入的不是 {wiki_API}。 ', 4, 'get_list');
			continue_wiki = undefined;
		}

	// options.get_continue: 用以取用後續檢索用索引值之 title。
	// {String}title || {Array}[ API_URL, title ]
	if (options.get_continue) {
		// 在多人共同編輯的情況下，才需要每次重新 load page。
		get_continue(Array.isArray(options.get_continue) ? options.get_continue : [ title[0], options.get_continue ], {
			type : type,
			// options.wiki: 作業中之 {wiki_API}
			continue_key : (continue_wiki || options.wiki).continue_key,
			callback : function(continuation_data) {
				if (continuation_data = continuation_data[continue_from]) {
					library_namespace.info('get_list: continue from [' + continuation_data + '] via page');
					// 注意:這裡會改變 options!
					// 刪掉標記，避免無窮迴圈。
					delete options.get_continue;
					// 設定/紀錄後續檢索用索引值，避免無窮迴圈。
					if (continue_wiki)
						continue_wiki.next_mark[continue_from] = continuation_data;
					else
						options[continue_from] = continuation_data;
					get_list(type, title, callback, options);
				} else {
					//delete options[continue_from];
					library_namespace.debug('Nothing to continue!', 1, 'get_list');
					if (typeof callback === 'function')
						callback();
				}
			}
		});
		return;
	}

	if (continue_from = options[continue_from]) {
		library_namespace.debug('[[' + title[1] + ']]: start from '
				+ continue_from, 2, 'get_list');
	}

	title[1] = 'query&' + parameter + '=' + type + '&'
	//
	+ (parameter === get_list.default_parameter ? prefix : '')
	//
	+ wiki_API.query.title_param(title[1])
	// 數目限制。No more than 500 (5,000 for bots) allowed.
	// Type: integer or max
	// https://en.wikipedia.org/w/api.php?action=help&modules=query%2Brevisions
	+ (options.limit > 0 || options.limit === 'max' ? '&' + prefix + 'limit=' + options.limit : '')
	// next start from here.
	+ (continue_from ?
	//
	'&' + prefix + 'continue=' + continue_from : '')
	//
	+ ('namespace' in options
	//
	? '&' + prefix + 'namespace=' + options.namespace : '');
	if (!title[0])
		title = title[1];
	// console.log('get_list: title: ' + title);

	if (typeof callback !== 'function') {
		library_namespace.err('callback is NOT function! callback: ['
				+ callback + ']');
		library_namespace.debug('可能是想要當作 wiki instance，卻未設定好，直接呼叫了 '
				+ library_namespace.Class + '.wiki？\ne.g., 想要 var wiki = '
				+ library_namespace.Class
				+ '.wiki(user, password) 卻呼叫了 var wiki = '
				+ library_namespace.Class + '.wiki？', 3);
		return;
	}

	wiki_API.query(title,
	// treat as {Function}callback or {Object}wiki_API.work config.
	function(data) {
		function add_page(page) {
			titles.push(page.title);
			pages.push(page);
		}

		if (library_namespace.is_debug(2)
		// .show_value() @ interact.DOM, application.debug
		&& library_namespace.show_value)
			library_namespace.show_value(data, 'get_list:' + type);

		var titles = [], pages = [],
		// 取得列表後，設定/紀錄新的後續檢索用索引值。
		// https://www.mediawiki.org/wiki/API:Query#Backwards_compatibility_of_continue
		// {Object}next_index: 後續檢索用索引值。
		next_index = data['continue'] || data['query-continue'];
		if (library_namespace.is_Object(next_index)) {
			pages.next_index = next_index;
			library_namespace.debug('因為 continue_wiki 可能與作業中之 {wiki_API} 不同，因此需要在本函數 function get_list() 中設定好。', 4, 'get_list');
			//console.log(continue_wiki);
			if (continue_wiki
				// options.wiki: 作業中之 {wiki_API}
				|| (continue_wiki = options.wiki)) {
				//console.log(continue_wiki.next_mark);
				//console.log(next_index);
				//console.log(continue_wiki);
				if ('query-continue' in data)
					// style of 2014 CE. 例如 {backlinks:{blcontinue:'[0|12]'}}。
					for ( var type_index in next_index)
						Object.assign(continue_wiki.next_mark, next_index[type_index]);
				else
					// nowadays. e.g., {continue: { blcontinue: '0|123', continue: '-||' }}
					Object.assign(continue_wiki.next_mark, next_index);
				library_namespace.debug('next index of ' + type + ': ' + continue_wiki.show_next());
			}
			if (library_namespace.is_debug(2)
			// .show_value() @ interact.DOM, application.debug
			&& library_namespace.show_value)
				library_namespace.show_value(next_index,
						'get_list:get the continue value');
		}
		// 紀錄清單類型。
		// assert: overwrite 之屬性不應該是原先已經存在之屬性。
		pages.list_type = type;
		if (page_content.is_page_data(title))
			title = title.title;

		if (!data || !data.query) {
			library_namespace.err('get_list: Unknown response: [' + data + ']');

		} else if (data.query[type]) {
			// 一般情況。
			if (Array.isArray(data = data.query[type]))
				data.forEach(add_page);

			library_namespace.debug('[' + title + ']: ' + titles.length
					+ ' page(s)', 2, 'get_list');
			callback(title, titles, pages);

		} else {
			//console.log(data.query);
			data = data.query.pages;
			for ( var pageid in data) {
				if (pages.length)
					library_namespace.warn('get_list: More than 1 page got!');
				else {
					var page = data[pageid];
					if (Array.isArray(page[type]))
						page[type].forEach(add_page);

					library_namespace.debug('[' + page.title + ']: '
							+ titles.length + ' page(s)', 1, 'get_list');
					callback(page.title, titles, pages);
				}
				return;
			}
			library_namespace.err('get_list: No page got!');
		}
	});
}


// const: 基本上與程式碼設計合一，僅表示名義，不可更改。(== 'list')
get_list.default_parameter = 'list';

// [[Special:Whatlinkshere]]
// 使用說明:連入頁面
// https://zh.wikipedia.org/wiki/Help:%E9%93%BE%E5%85%A5%E9%A1%B5%E9%9D%A2
get_list.type = {

	// 'type name' : 'prefix' (parameter : 'list')

	// 取得連結到 [[title]] 的頁面。
	// e.g., [[name]], [[:Template:name]].
	// https://www.mediawiki.org/wiki/API:Backlinks
	backlinks : 'bl',

	// 取得所有嵌入包含 title 的頁面。 (transclusion, inclusion)
	// e.g., {{Template name}}, {{/title}}.
	// 設定 title 'Template:tl' 可取得使用指定 Template 的頁面。
	// https://en.wikipedia.org/wiki/Wikipedia:Transclusion
	// https://www.mediawiki.org/wiki/API:Embeddedin
	embeddedin : 'ei',

	// 取得所有使用 file 的頁面。
	// e.g., [[File:title.jpg]].
	// https://www.mediawiki.org/wiki/API:Imageusage
	imageusage : 'iu',

	// 'type name' : [ 'prefix', 'parameter' ]
	// ** 可一次處理多個標題，但可能較耗資源、較慢。

	// linkshere: 取得連結到 [[title]] 的頁面。
	linkshere : ['lh', 'prop' ],

	// 取得所有使用 title (e.g., [[File:title.jpg]]) 的頁面。
	// 基本上同 imageusage。
	fileusage : ['fu', 'prop' ]
};


(function() {
	var methods = wiki_API.prototype.next.methods;

	for (var name in get_list.type) {
		methods.push(name);
		wiki_API[name] = get_list.bind(null, name);
	}

	// add method to wiki_API.prototype
	// setup other wiki_API.prototype methods.
	methods.forEach(function(method) {
		library_namespace.debug('add action to wiki_API.prototype: ' + method, 2);
		wiki_API.prototype[method] = function() {
			// assert: 不可改動 method @ IE!
			var args = [ method ];
			Array.prototype.push.apply(args, arguments);
			library_namespace.debug('add action: ' + args.join('<br />\n'), 3, 'wiki_API.prototype.' + method);
			this.actions.push(args);
			if (!this.running)
				this.next();
			return this;
		};
	});
})();


//---------------------------------------------------------------------//

// 登入用。
wiki_API.login = function(name, password, options) {
	function _next() {
		if (typeof callback === 'function')
			callback(session.token.lgname);
		library_namespace.debug('已登入 [' + session.token.lgname + ']。自動執行 .next()，處理餘下的工作。', 1, 'wiki_API.login');
		// popup 'login'.
		session.actions.shift();
		session.next();
	}

	function _done(data) {
		// 在 mass edit 時會 lose token (badtoken)，需要保存 password。
		if (!session.preserve_password)
			// 捨棄 password。
			delete session.token.lgpassword;
		if (data && (data = data.login))
			if (data.result === 'NeedToken')
				library_namespace.err('wiki_API.login: login [' + session.token.lgname + '] failed!');
			else
				wiki_API.login.copy_keys.forEach(function(key) {
					if (data[key])
						session.token[key] = data[key];
				});
		if (session.token.csrftoken)
			_next();
		else {
			library_namespace.debug('Try to get the csrftoken ...', 1, 'wiki_API.login');
			wiki_API.query('query&meta=tokens', function(data) {
				if (data && data.query && data.query.tokens) {
					session.token.csrftoken = data.query.tokens.csrftoken;
					library_namespace.debug('csrftoken: ' + session.token.csrftoken
					//
					+ (session.token.csrftoken === '+\\' ? ' (login as anonymous!)' : ''), 1, 'wiki_API.login');
				} else {
					library_namespace.err('wiki_API.login: Unknown response: ['
					//
					+ (data && data.warnings && data.warnings.tokens && data.warnings.tokens['*'] || data) + ']');
					if (library_namespace.is_debug()
						// .show_value() @ interact.DOM, application.debug
						&& library_namespace.show_value)
						library_namespace.show_value(data);
				}
				_next();
			},
			// Tokens may not be obtained when using a callback
			{});
		}
	}

	var action = 'assert=user', callback, session;
	if (library_namespace.is_Object(options)) {
		session = options.session;
		callback = options.callback;
	} else {
		if (typeof options === 'function')
			callback = options;
		// 前置處理。
		options = library_namespace.null_Object();
	}

	if (!session)
		// 初始化 session。這裡 callback 當作 API_URL。
		session = new wiki_API(name, password, callback);
	if (!('login_mark' in options) || options.login_mark) {
		// hack: 這表示正 log in 中，當 login 後，會自動執行 .next()，處理餘下的工作。
		// @see wiki_API.prototype.next
		if (options.login_mark)
			// 將 'login' 置於最前頭。
			session.actions.unshift([ 'login' ]);
		else
			// default: 依順序將 'login' 置於最末端。
			session.actions.push([ 'login' ]);
	}
	if (session.API_URL)
		action = [ session.API_URL, action ];

	library_namespace.debug('準備登入 [' + name + ']。', 1, 'wiki_API.login');
	wiki_API.query(action, function(data) {
		// 確認尚未登入，才作登入動作。
		if (data === '') {
			// 您已登入。
			library_namespace.debug('You are already logged in.', 1, 'wiki_API.login');
			_done();
			return;
		}

		wiki_API.query('login', function(data) {
			if (data && data.login && data.login.result === 'NeedToken') {
				session.token.lgtoken = data.login.token;
				wiki_API.query('login', _done, session.token);
			} else
				library_namespace.err(data);
		}, session.token);
	});

	return session;
};

wiki_API.login.copy_keys = 'lguserid,cookieprefix,sessionid'.split(',');

//---------------------------------------------------------------------//

/**
 * 編輯頁面。一次處理一個標題。
 *
 * @param {String|Array}title
 *            頁面標題。 {String}title or [ {String}API_URL, {String}title ]
 * @param {String|Function}text
 *            頁面內容。 {String}text or {Function}text(content, title)
 * @param {Object}token
 *            “csrf”令牌。
 * @param {Object}options
 *            附加參數/設定選項。
 * @param {Function}callback
 *            回調函數。 callback(title, error, result)
 * @param {String}timestamp
 *            頁面時間戳記。 e.g., '2015-01-02T02:52:29Z'
 *
 * @returns
 */
wiki_API.edit = function(title, text, token, options, callback, timestamp) {
	if (typeof text === 'function') {
		library_namespace.debug('先取得內容再 edit [' + wiki_API.title_of(title)
				+ ']。', 1, 'wiki_API.edit');
		return wiki_API.page(title,
				function(page_data) {
					if (wiki_API.edit.denied(page_data, options.bot_id,
							options.action)) {
						library_namespace
								.warn('wiki_API.edit: Denied to edit ['
										+ page_data.title + ']');
						callback(page_data.title, 'denied');
					} else
						wiki_API.edit(page_data, text(page_content(page_data),
								page_data.title), token, options, callback);
				});
	}

	var action;
	// 基本檢測。
	if (Array.isArray(text) && text[0] === wiki_API.edit.cancel) {
		action = text.slice(1);
		library_namespace.debug('採用個別特殊訊息: ' + action, 2, 'wiki_API.edit');
		// 可以利用 ((return [ CeL.wiki.edit.cancel, 'reason' ];)) 來回傳 reason。
		// ((return [ CeL.wiki.edit.cancel, 'skip' ];)) 來 skip。
		if (action.length === 1)
			action[1] = action[0];
	} else if (text === wiki_API.edit.cancel)
		action = [ '放棄編輯頁面', '放棄編輯頁面' ];
	else if (!text)
		// 內容被清空
		action = [ 'empty', '未設定編輯內容' ];

	if (action) {
		title = wiki_API.title_of(title);
		if (action[1] !== 'skip')
			// 被 skip/pass 的話，連警告都不顯現，當作正常狀況。
			library_namespace.warn('wiki_API.edit: [[' + title + ']]: ' + action[1]);
		else
			library_namespace.debug('Skip [[' + title + ']]', 2);
		return callback(title, action[0]);
	}

	action = 'edit';
	// 處理 [ {String}API_URL, {String}title ]
	if (Array.isArray(title))
		action = [ title[0], action ], title = title[1];
	if (options && options.write_to) {
		// 設定寫入目標。一般為 debug、test 測試期間用。
		// e.g., write_to:'Wikipedia:沙盒',
		title = options.write_to;
		library_namespace.debug('依 options.write_to 寫入至 [[' + title + ']]', 1,
			'wiki_API.edit');
	}

	// 造出可 modify 的 options。
	if (options)
		library_namespace.debug('#1: ' + Object.keys(options).join(','), 4,
			'wiki_API.edit');
	options = Object.assign({
		text : text
	}, options);
	if (library_namespace.is_Object(title)) {
		wiki_API.edit.set_stamp(options, title);
		if (title.pageid)
			options.pageid = title.pageid;
		else
			options.title = title.title;
	} else
		options.title = title;
	wiki_API.edit.set_stamp(options, timestamp);
	// the token should be sent as the last parameter.
	options.token = library_namespace.is_Object(token) ? token.csrftoken
			: token;
	library_namespace.debug('#2: ' + Object.keys(options).join(','), 4,
			'wiki_API.edit');

	wiki_API.query(action, function(data) {
		var error = data.error
		// 檢查伺服器回應是否有錯誤資訊。
		? '[' + data.error.code + '] ' + data.error.info : data.edit
				&& data.edit.result !== 'Success'
				&& ('[' + data.edit.result + '] '
				//
				+ (data.edit.info || data.edit.captcha && '必需輸入驗證碼'));
		if (error)
			library_namespace.warn('wiki_API.edit: Error to edit ['
					+ wiki_API.title_of(title) + ']: ' + error);
		else if (data.edit && ('nochange' in data.edit))
			// 在極少的情況下，data.edit === undefined。
			library_namespace.info('wiki_API.edit: ['
					+ wiki_API.title_of(title) + ']: no change');
		if (typeof callback === 'function')
			callback(wiki_API.title_of(title), error, data);
	}, options);
};

/**
 * 放棄編輯頁面用。
 */
wiki_API.edit.cancel = library_namespace.null_Object();

// 處理編輯衝突用。
// warning: will modify options!
// https://www.mediawiki.org/wiki/API:Edit
// to detect edit conflicts.
wiki_API.edit.set_stamp = function(options, timestamp) {
	if (page_content.is_page_data(timestamp)
	&& (timestamp = page_content.has_content(timestamp)))
		timestamp = timestamp.timestamp;
	//timestamp = '2000-01-01T00:00:00Z';
	if (timestamp) {
		library_namespace.debug(timestamp, 3, 'wiki_API.edit.set_stamp');
		options.basetimestamp = options.starttimestamp = timestamp;
	}
	return options;
};

// https://zh.wikipedia.org/wiki/Template:Bots
wiki_API.edit.get_bot = function(content) {
	// TODO: use template_token(content, 'bots')
	var bots = [], matched, PATTERN = /{{[\s\n]*bots[\s\n]*([\S][\s\S]*?)}}/ig;
	while (matched = PATTERN.exec(content)) {
		library_namespace.debug(matched.join('<br />'), 1, 'wiki_API.edit.get_bot');
		if (matched = matched[1].trim().replace(/(^\|\s*|\s*\|$)/g, '')
				// .split('|')
				)
					bots.push(matched);
	}
	if (0 < bots.length) {
		library_namespace.debug(bots.join('<br />'), 1, 'wiki_API.edit.get_bot');
		return bots;
	}
};

// 遵守[[Template:Bots]]
// 另須考慮{{Personal announcement}}的情況。
wiki_API.edit.denied = function(content, bot_id, action) {
	if (!content || page_content.is_page_data(content) && !(content = page_content(content)))
		return;

	var bots = wiki_API.edit.get_bot(content), denied;
	if (bots) {
		library_namespace.debug('test ' + bot_id + '/' + action, 3,
				'wiki_API.edit.denied');
		// botlist 以半形逗號作間隔
		bot_id = (bot_id = bot_id && bot_id.toLowerCase()) ?
				new RegExp('(?:^|[\\s,])(?:all|' + bot_id + ')(?:$|[\\s,])', 'i')
				: wiki_API.edit.denied.all;
		if (action)
			// optout 以半形逗號作間隔
			// optout=all
			action = new RegExp('(?:^|[\\s,])(?:all|' + action.toLowerCase()
					+ ')(?:$|[\\s,])');
		bots.forEach(function(data) {
			library_namespace.debug('test [' + data + ']', 1,
				'wiki_API.edit.denied');
			data = data.toLowerCase();

			// 封鎖機器人訪問之 pattern
			var matched, PATTERN;
			if (!denied) {
				PATTERN = /(?:^|\|)[\s\n]*deny[\s\n]*=[\s\n]*([^|]+)/ig;
				while ((matched = PATTERN.exec(data))
						// 一被拒絕即跳出。
						&& !(denied = bot_id.test(matched[1]) && ('Banned: ' + matched[1])))
					;
			}

			// 允許之機器人帳戶列表（以半形逗號作間隔）
			if (!denied) {
				PATTERN = /(?:^|\|)[\s\n]*allow[\s\n]*=[\s\n]*([^|]+)/ig;
				while ((matched = PATTERN.exec(data))
						// 一被拒絕即跳出。
						&& !(denied = !bot_id.test(matched[1])
						// denied messages
						&& ('Not in allowed bots list: [' + matched[1] + ']')))
					;
			}

			// 過濾機器人所發出的通知/提醒
			// 用戶以bots模板封鎖通知
			if (!denied && action) {
				PATTERN = /(?:^|\|)[\s\n]*optout[\s\n]*=[\s\n]*([^|]+)/ig;
				while ((matched = PATTERN.exec(data))
						// 一被拒絕即跳出。
						&& !(denied = action.test(matched[1]) && ('Opt out of ' + matched[1])))
					;
			}

			if (denied)
				library_namespace.warn('wiki_API.edit.denied: Denied for ' + data);
		});
	}

	return denied || /{{[\s\n]*nobots[\s\n]*}}/i.test(content) && 'Ban all compliant bots.';
};

// deny=all, !(allow=all)
wiki_API.edit.denied.all = /(?:^|[\s,])all(?:$|[\s,])/;


//---------------------------------------------------------------------//

// full text search
// callback(key, pages, hits)
wiki_API.search = function(key, callback, options) {
	if (options > 0 || options === 'max')
		options = {
			srlimit : options
		};
	wiki_API.query('query&list=search&' + get_URL.param_to_String(Object.assign({
		srsearch : key
	}, wiki_API.search.default_parameter, options)), function(data) {
		if (library_namespace.is_debug(2)
			// .show_value() @ interact.DOM, application.debug
			&& library_namespace.show_value)
			library_namespace.show_value(data, 'wiki_API.search');

		options = data && (data['continue'] || data['query-continue']);
		if (data && (data = data.query)) {
			if (options)
				// data.search.sroffset = options.search.sroffset;
				Object.assign(data.search, options.search);
			data.search.hits = data.searchinfo.totalhits;
			data = data.search;
		}

		// data: [ page_data ].hits = \d+, .sroffset = next
		if (typeof callback === 'function')
			// callback(key, pages, hits)
			callback(key, data, data.hits);
	});
};

wiki_API.search.default_parameter = {
	srprop : 'redirecttitle',
	//srlimit : 10,
	srinterwiki : 1
};


// --------------------------------------------------------------------------------------------- //

// export
Object.assign(wiki_API, {
	api_URL : api_URL,
	// default api URL
	// see also: application.locale
	API_URL : api_URL((library_namespace.is_WWW()
			&& (navigator.userLanguage || navigator.language) || 'zh')
			.toLowerCase().replace(/-.+$/, '')),

	namespace : get_namespace,

	file_pattern : file_pattern,
	template_token : template_token,

	content_of : page_content,
	// wiki_API.title_of(): get title of page.
	// {@seealso} wiki_API.query.title_param()
	title_of : function(page_data) {
		// 處理 [ {String}API_URL, {String}title ]
		if (Array.isArray(page_data))
			page_data = page_data[1];
		return page_data.title || page_data;
	},

	parse : parse_wikitext
});


return wiki_API;
},

no_extend : '*'

});
