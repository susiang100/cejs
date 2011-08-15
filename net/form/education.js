
/**
 * @name	CeL 輸入教育程度的範例 module
 * @fileoverview
 * 本檔案包含了輸入教育程度的 functions。
 * @since	2010/1/7 23:50:43
 */


if (typeof CeL === 'function')
CeL.setup_module('net.form.education', {
sub_module : {
TW : {
require : 'net.form.select_input.',
code : function(library_namespace, load_arguments) {


var


//	class private	-----------------------------------


/**
 * inherit select_input
 * @class	輸入教育程度的 functions
 * @example
 * var education_form = new CeL.education.TW('education');
 */
_ = library_namespace.inherit('net.form.select_input', function() {
	var _t = this;
	if (!_t.loaded)
		return;

	_t.setClassName('education_input');
	_t.setSearch('includeKeyWC');
	_t.setAllList(_t.default_list);

	_t.setProperty('onblur', function() {
		if(!_t.clickNow)
			_t.triggerToInput(0);
	});

	// show arrow
	_t.triggerToInput(1);
	_t.focus(0);
});


//	class public interface	---------------------------




//	instance public interface	-------------------

//	最高教育程度	http://wwwc.moex.gov.tw/ct.asp?xItem=250&CtNode=1054
_.prototype.default_list =
	//請填寫
	'博士（含）以上,碩士/研究所,學士/大學院校,副學士/專科,高中/高職,國中/國民中學,國小（含）以下,其他：請說明'
	.split(',');



/**
 * 不 extend 的 member.
 * '*': 完全不 extend.
 * this: 連 module 本身都不 extend 到 library name-space 下.
 * @ignore
 */
_// JSDT:_module_
.no_extend = '*,this';

return (
	_// JSDT:_module_
);
}
//	.TW
}

//	sub_module
}
});

