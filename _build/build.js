// This file MUST save as UTF-16LE!!

//	<reference /> MUST insert before /* .. */
/// <reference path="../_include/CeL.for_include.js" />

/**
 * @name	CeL base framework build tool using JScript
 * @since	2010/1/9 01:16:35
 * 2010/1/14 20:19:27	整理、簡化。
 */



/*

@ Linux ubuntu:
sudo cp -pru /media/366A99896A994691/USB/cgi-bin/lib/JS /usr/share/javascript/CeL && cd /usr/share/javascript/CeL && find . -type f -exec chmod 644 {} \; && find . -type d -exec chmod 755 {} \;

cd /usr/share/javascript/jquery && sudo wget -O jquery-nightly.js http://code.jquery.com/jquery-nightly.js && sudo chmod go+r jquery-nightly.js

*/

// ---------------------------------------------------------------------//
//	[CeL]library_loader_by_registry
try {
	var o; try { o = new ActiveXObject('Microsoft.XMLHTTP') } catch (e) { o = new XMLHttpRequest() } o.open('GET', (new ActiveXObject("WScript.Shell")).RegRead('HKCU\\Software\\Colorless echo\\CeL\\main_script'), false); o.send(null);
	eval(o.responseText)
} catch (e) { }
//	[CeL]End


// ---------------------------------------------------------------------//
//	pre-load and check.

var script_name = 'library_build_script',
library_main_script = 'ce.js',

backup_directory = 'old\\',
to_directory = '..\\',

alert_message = function (message) {
	WScript.Echo(script_name + ': ' + message);
},
error_recover = function (message) {
	alert_message(message
			+ '\n\nTry to recover!\n (Or you can stop the process.)');

	var FSO = WScript.CreateObject("Scripting.FileSystemObject");
	try {
		FSO.DeleteFile(to_directory + library_main_script, true);
	} catch (e) {
	}
	FSO.CopyFile(backup_directory + library_main_script, to_directory + library_main_script);
	//FSO = null;

	WScript.Quit(1);
};

if (typeof CeL === 'undefined') {
	error_recover("Can't load library!\n或許檔案路徑並未設定於 registry 之中？");
	//WScript.Echo((new ActiveXObject("WScript.Shell")).RegRead('HKCU\\Software\\Colorless echo\\CeL\\path'));
	//WScript.Quit(1);
}

//WScript.Echo(CeL.env.main_script + "\n" + CeL.env.registry_path + "\n" + CeL.env.registry_path_key_name);
if (CeL.env.main_script)
	library_main_script = CeL.env.main_script;

//CeL.cache_code = true;

//CeL.set_debug();

//CeL.run('data.code.log');
//var sl = CeL.log;

//CeL.run('data.code.reorganize');

//CeL.run('application.storage.file');
try {
	//alert_message(CeL.extend.default_target);
	CeL.run(['application.OS.Windows.file', 'application.locale.encoding']);
	if (!CeL.is_included('application.OS.Windows.file'))
		throw 1;
} catch (e) {
	error_recover("Can't load module!\n\nlibrary base path:\n" + CeL.env.registry_path);
	//WScript.Quit(1);
}

// ---------------------------------------------------------------------//
//	基本設定。

script_name = CeL.get_script_name();

var structure_directory = '_structure\\',
	main_structure_file = structure_directory + 'structure.js',
	cache_manifest_extension = '.manifest',
	cache_manifest_list = { cache: CeL.Class, 'test suite': '_test suite\\test suite' },
	file_list = [main_structure_file],
	target_file = CeL.env.registry_path + library_main_script,
	datestamp = new Date,
	structure_code,

	MSG_auto_generate_0 = 'Localized messages in CeL.',
	MSG_auto_generate_CHT = '本檔案為自動生成，請勿手動編輯！',
	MSG_auto_generate_1 = 'This file is auto created ',
	MSG_auto_generate_2 = 'by auto-generate tool: ' + script_name + '(.js) @ ' + datestamp.getFullYear() + '.';

structure_code = CeL.read_file(CeL.env.registry_path + main_structure_file)
	.replace(/\/\/([^\r\n]+)\r?\n/g,
		function ($0, $1) {
			return /^\s*add\s/i.test($1) ? $0 : '';
		})
	.replace(/[\r\n\s]*\/\*[\s\S]*?\*\/[\r\n\s]*/g, '')
	.replace(/\/\/\s*add\s+([a-z_\d]+\.js)/gi,
		function ($0, $1) {
			file_list.push($1);
			return CeL.read_file(
					CeL.env.registry_path + structure_directory + $1)
					.replace(/\/\*[\s\S]*?\*\//, '');
		}
	)
	//	特殊處置：第一個 undefined。因為 eclipse 不允許拿 undefined 當引數。
	.replace(/_undefined/, 'undefined')
	.replace(/([^\w]build_date[\s\n]*=[\s\n]*)[^;]+/, function ($0, $1) {
		return $1 + 'new Date("' + datestamp + '")';
	});

structure_code =
	[
		'',
		'/*',
		'	' + MSG_auto_generate_0,
		'	' + MSG_auto_generate_CHT,
		'	' + MSG_auto_generate_1 + 'from ' + file_list.join(', '),
		'		' + MSG_auto_generate_2,
		'*/',
		'',
		'',
		''
	].join(CeL.env.line_separator || '\n')
	+ structure_code;

// ---------------------------------------------------------------------//
//	build main script.

if (structure_code !== CeL.read_file(target_file)) {
	//	backup
	var FSO = WScript.CreateObject("Scripting.FileSystemObject");
	try {
		FSO.DeleteFile(backup_directory + library_main_script, true);
	} catch (e) {
	}
	//FSO = null;
	CeL.move_1_file(target_file, library_main_script, backup_directory);

	// chmod: change to writeable
	CeL.change_attributes(target_file, -CeL.FSO_attributes.ReadOnly);

	//	write contents
	CeL.write_file(target_file, structure_code, CeL.env.source_encoding);

	// chmod
	CeL.change_attributes(target_file, CeL.FSO_attributes.ReadOnly);
}

// ---------------------------------------------------------------------//
//	auto-build resource / locale message.

try {
	// for TongWen
	var document = { styleSheets: {}, addEventListener: function (e, code) { code(); } };
	CeL.pre_parse_local_code = function (code, URL, id) {
		var matched = id === "CeL.extension.zh_conversion.tongwen.tongwen_core" && code.match(/^([\s\S]*?)var[\s\n]/);
		return matched && /^[\s\n;]*$/.test(matched[1].replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')) ? code.slice(matched.lastIndex) : code;
	};

	//CeL.debug(CeL.extend.default_target);
	CeL.run([
		'data.CSV', 'data.native', 'application.locale',
		'extension.zh_conversion.tongwen.tongwen_core'],
		[
		'extension.zh_conversion.tongwen.tongwen_table_ps2t',
		'extension.zh_conversion.tongwen.tongwen_table_pt2s',
		'extension.zh_conversion.tongwen.tongwen_table_s2t',
		'extension.zh_conversion.tongwen.tongwen_table_t2s']);
	if (!CeL.is_included('data.CSV'))
		alert_message("Can't load module:\n" + 'data.CSV');
	if (typeof TongWen === 'undefined')
		alert_message("Can't load TongWen!");
} catch (e) {
	//WScript.Quit(1);
}

function build_locale (resource_path) {
	resource_path = CeL.env.registry_path + resource_path + '\\';
		
	var locale_messages = CeL.parse_CSV(CeL.get_file(resource_path + 'locale.txt'), { has_title: true }),
		index, hide_index,
		preserved_index = { hide: NaN, target: NaN, message: NaN, note: NaN },
		language_name_hash = CeL.null_Object(),
		head = locale_messages.shift();

	//CeL.debug(Array.isArray(head));
	//CeL.debug(head.forEach);
	//	預先掃描 title。
	head.forEach(function (title, index) {
		var name;
		if (title in preserved_index)
			preserved_index[title] = index;
		else if (name = CeL.gettext.to_standard(title))
			language_name_hash[name] = index;
		else
			CeL.warn('Unknown language: ' + language);
	});

	//	check.
	for (index in preserved_index) {
		if (isNaN(preserved_index[index]))
			CeL.warn('未提供欄位: ' + index);
	}

	hide_index = (index = locale_messages.index).hide;

	//language_name_hash[ {String}language ] = {Int}index
	for (var language in language_name_hash) {
		//CeL.debug(language);
		var i = language_name_hash[language], language_map = [],
			//flagSimp = "simplified", flagTrad = "traditional",
			try_translate_from_index = typeof TongWen !== 'undefined' && (language === 'cmn-Hant-TW' ? language_name_hash['cmn-Hans-CN'] : language === 'cmn-Hans-CN' ? language_name_hash['cmn-Hant-TW'] : NaN),
			try_translate_to_type = !isNaN(try_translate_from_index) && (language === 'cmn-Hant-TW' ? "traditional" : "simplified");
		locale_messages.forEach(function (record) {
			if (record[hide_index])
				return;
			var local_message = record[i], message;
			if (!local_message && try_translate_to_type && (message = record[try_translate_from_index]))
				local_message = TongWen.convert(message, try_translate_to_type);

			if (local_message && local_message !== (message = record[index.message]))
				language_map.push('"' + message.replace(/"/g, '\\"') + '":'
				//
				+ (local_message.startsWith('function ') ? local_message : '"' + local_message.replace(/"/g, '\\"') + '"'));
		});
		if (language_map.length > 0) {
			i = "/*	" + MSG_auto_generate_0 + '\n	' + MSG_auto_generate_CHT + '\n	' + MSG_auto_generate_1 + MSG_auto_generate_2
				+ "\n*/'use strict';if(typeof CeL==='function')CeL.application.locale.gettext.set_text({"
				+ language_map.join(',') + "},\n'" + language + "');";
			if (i !== CeL.read_file(resource_path + language + '.js'))
				CeL.write_file(resource_path + language + '.js', i, CeL.env.source_encoding);
		}
	}

}


// main for library
build_locale('application\\locale\\resource');

// Localized messages in 紀年轉換工具.
build_locale('_test suite\\resource');


// ---------------------------------------------------------------------//
// 處理 VSOP87 data。




// ---------------------------------------------------------------------//
//	更改 cache manifest.

for (var template_file in cache_manifest_list) {
	structure_code = CeL.read_file(CeL.env.registry_path + structure_directory + template_file + cache_manifest_extension, CeL.env.source_encoding);
	if (structure_code) {
		target_file = CeL.env.registry_path + cache_manifest_list[template_file] + cache_manifest_extension;
		CeL.write_file(target_file,
			structure_code
				//	去除 comments.
				.replace(/[ \t]*#[^\n]*\n/g, '')
				.replace(/[\r\t ]+\n/g, '\n')
				.replace(/\n{3,}/g, '\n\n')
			+ '\n# build date: ' + datestamp
			);
	}
}

// ---------------------------------------------------------------------//
//	Done.
