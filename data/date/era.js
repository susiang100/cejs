/**
 * @name CeL function for era calendar.
 * @fileoverview 本檔案包含了東亞傳統曆法/中國傳統曆法/曆書/歷譜，農曆、夏曆、陰曆，中西曆轉換的功能。<br />
 *               以歷史上使用過的曆數為準。用意不在推導曆法，而在對過去時間作正確轉換。因此僅用查表法，不作繁複天文計算。
 * 
 * @since 2013/2/13 12:45:44
 * 
 * TODO:<br />
 * 太複雜了，效率不高，重構。<br />
 * 舊唐書/卷11 <span data-era="~">寶應元年</span>..<span data-era="~">二年</span>..<span
 * data-era="~">二月甲午</span>，回紇登裏可汗辭歸蕃。<span data-era="~">三月甲辰</span>朔，襄州右兵馬使梁崇義殺大將李昭，據城自固，仍授崇義襄州刺史、山南東道節度使。<span
 * data-era="~">丁未</span>，袁傪破袁晁之眾於浙東。玄宗、肅宗歸祔山陵。自<span data-era="~">三月一日</span>廢朝，至於<span
 * data-era="~">晦日</span>，百僚素服詣延英門通名起居。<br />
 * CeL.era('二年春正月丁亥朔',{after:'寶應元年'})<br />
 * CeL.era('丁亥朔',{after:'寶應二年春正月'})<br />
 * CeL.era('寶應元年',{period_end:true})<br />
 * 
 * 未來發展：<br />
 * 加入世界各國的對應機能。<br />
 * 
 * @example <code>


// demo / feature: 較常用、吸引人的特性。

CeL.log('公曆農曆(陽曆陰曆)日期互換:');

// 公曆←農曆特定日期
var 農曆, 公曆;

農曆 = '農曆2014年1月1日';
公曆 = CeL.era(農曆).format('公元%Y年%m月%d日');
CeL.log(['農曆: ', 農曆, ' → 公曆: ', 公曆]);

// 農曆←公曆特定日期
公曆 = '公元2014年1月1日';
農曆 = CeL.era(公曆).format({parser:'CE',format:'%紀年%年年%月月%日日',locale:'cmn-Hant-TW'});
CeL.log(['農曆: ', 農曆, ' → 公曆: ', 公曆]);

// 今天的農曆日期
var 今天的農曆日期 = (new Date).format('Chinese');
CeL.log(['今天是農曆: ', 今天的農曆日期]);
今天的農曆日期 = CeL.era(new Date).format({parser:'CE',format:'農曆%年(%歲次)年%月月%日',locale:'cmn-Hant-TW'})
CeL.log(['今天是農曆: ', 今天的農曆日期]);



CeL.run('data.date.era', function() {

// 設計上所要求必須通過之測試範例：測試正確性。
CeL.assert(['孺子嬰',CeL.era('初始').君主]);
CeL.assert(['孺子嬰','初始元年11月1日'.to_Date('era').君主]);
CeL.assert(['庚辰年庚辰月庚辰日庚辰時','一八八〇年四月二十一日七時'.to_Date('era').format({parser:'CE',format:'%歲次年%月干支月%日干支日%時干支時',locale:'cmn-Hant-TW'})],'可提供統一時間標準與各干支間的轉換。統一時間標準→各特殊紀年（西→中）：查詢某時間點（時刻）的日期資訊，如月干支等。');
CeL.assert(['清德宗光緒六年三月十三日',CeL.to_Chinese_numeral('一八八〇年四月二十一日七時'.to_Date('era').format({parser:'CE',format:'%朝代%君主%紀年%年年%月月%日日',locale:'cmn-Hant-TW'}))],'查詢一八八〇年四月二十一日七時的中曆日期');
CeL.assert(['1628年3月1日','明思宗崇禎1年1月26日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'可提供統一時間標準與各特殊紀年間的轉換。');
CeL.assert(['1628年3月1日','天聰二年甲寅月戊子日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'可提供統一時間標準與各特殊紀年間的轉換。');
CeL.assert(['1628年3月1日','天聰2年寅月戊子日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'可提供統一時間標準與各特殊紀年間的轉換。');
CeL.assert(['1880年4月21日','清德宗光緒六年三月十三日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'可提供統一時間標準與各特殊紀年間的轉換。');
CeL.assert(['1880年4月21日','清德宗光緒庚辰年三月十三日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'可提供統一時間標準與各特殊紀年間的轉換。');
CeL.assert(['1880年4月21日','清德宗光緒庚辰年庚辰月庚辰日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'可提供統一時間標準與各特殊紀年間的轉換。');
CeL.assert(['庚辰年庚辰月庚辰日','清德宗光緒六年三月十三日'.to_Date('era').format({parser:'CE',format:'%歲次年%月干支月%日干支日',locale:'cmn-Hant-TW'})],'統一時間標準→各特殊紀年（西→中）：查詢某時間點（時刻）的日期資訊，如月干支等。');
CeL.assert(['庚辰年庚辰月庚辰日庚辰時','一八八〇年庚辰月庚辰日7時'.to_Date('era').format({parser:'CE',format:'%歲次年%月干支月%日干支日%時干支時',locale:'cmn-Hant-TW'})],'各特殊紀年→統一時間標準（中→西）：查詢某農曆+紀年/君主(帝王)對應的標準時間(如UTC+8)。');
CeL.assert(['庚辰年庚辰月庚辰日庚辰時','一八八〇年庚辰月庚辰日庚辰時'.to_Date('era').format({parser:'CE',format:'%歲次年%月干支月%日干支日%時干支時',locale:'cmn-Hant-TW'})],'各特殊紀年→統一時間標準（中→西）：查詢某農曆+紀年/君主(帝王)對應的標準時間(如UTC+8)。');
CeL.assert(['清德宗光緒六年三月十三日',CeL.to_Chinese_numeral('一八八〇年庚辰月庚辰日庚辰時'.to_Date('era').format({parser:'CE',format:'%朝代%君主%紀年%年年%月月%日日',locale:'cmn-Hant-TW'}))]);
CeL.assert(['庚辰年庚辰月庚辰日庚辰時','西元一八八〇年四月二十一日七時'.to_Date('era').format({parser:'CE',format:'%歲次年%月干支月%日干支日%時干支時',locale:'cmn-Hant-TW'})],'統一時間標準→各特殊紀年（西→中）：查詢某時間點（時刻）的日期資訊，如月干支等。');
CeL.assert(['庚辰年庚辰月庚辰日庚辰時','清德宗光緒六年三月十三日辰正一刻'.to_Date('era').format({parser:'CE',format:'%歲次年%月干支月%日干支日%時干支時',locale:'cmn-Hant-TW'})],'統一時間標準→各特殊紀年（西→中）：查詢某時間點（時刻）的日期資訊，如月干支等。');
CeL.assert(['252年5月26日','魏少帝嘉平4年5月1日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})]);
CeL.assert(['252年6月24日','魏少帝嘉平4年閏5月1日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})]);
CeL.assert(['252年6月24日','魏少帝嘉平4年閏月1日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})]);
CeL.assert(['1357/1/21','元至正十七年'.to_Date('era').format({parser:'CE',format:'%Y/%m/%d'})],'parse 年 only');
CeL.assert(['1357/1/21','元至正十七'.to_Date('era').format({parser:'CE',format:'%Y/%m/%d'})],'parse 年 only');
CeL.assert(['1357/1/21','至正十七年'.to_Date('era').format({parser:'CE',format:'%Y/%m/%d'})],'parse 年 only');
CeL.assert(['1357/1/21','至正十七'.to_Date('era').format({parser:'CE',format:'%Y/%m/%d'})],'parse 年 only');
CeL.assert(['1357/1/21','元至正17年'.to_Date('era').format({parser:'CE',format:'%Y/%m/%d'})],'parse 年 only');
CeL.assert(['1357/1/21','元至正17'.to_Date('era').format({parser:'CE',format:'%Y/%m/%d'})],'parse 年 only');
CeL.assert(['1357/1/21','至正17年'.to_Date('era').format({parser:'CE',format:'%Y/%m/%d'})],'parse 年 only');
CeL.assert(['1357/1/21','至正17'.to_Date('era').format({parser:'CE',format:'%Y/%m/%d'})],'parse 年 only');
CeL.assert(['1880年4月21日','庚辰年庚辰月庚辰日庚辰時'.to_Date({parser:'era',base:'1850年'}).format({parser:'CE',format:'%Y年%m月%d日'})]);
CeL.assert(['1880年4月21日',CeL.era('庚辰年庚辰月庚辰日庚辰時',{base:'1850年'}).format({parser:'CE',format:'%Y年%m月%d日'})]);
CeL.assert(['260年6月26日','魏元帝景元元年6月1日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})]);
CeL.assert(['260年6月26日','元帝景元元年6月1日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})]);
CeL.assert(['260年6月26日','景元元年6月1日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})]);
CeL.assert(['260年6月26日','魏元帝景元元年'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'省略月日，當作年初。');
CeL.assert(['260年6月26日','元帝景元元年'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'省略月日，當作年初。');
CeL.assert(['260年6月26日','景元元年'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'省略月日，當作年初。');
CeL.assert(['260年7月25日','魏元帝景元元年7月'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'省略日，當作月初。');
CeL.assert(['260年7月25日','元帝景元元年7月'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'省略日，當作月初。');
CeL.assert(['260年7月25日','景元元年7月'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'省略日，當作月初。');
CeL.assert(['1911年11月30日','清遜帝宣統三年10月10日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'閏月或之後');
CeL.assert(['1329年9月1日','元文宗天曆2年8月8日'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'天曆在元明宗(1329年)時被重複使用，共計3年。');
CeL.assert(['761年10月4日','唐肅宗元年建戌月初二'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日'})],'唐肅宗上元二年九月二十一日去年號，稱元年，以建子之月為歲首。');
CeL.assert(['694年11月25日 戊子小','證聖元年正月初三'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日 %月干支%大小月',locale:'cmn-Hant-TW'})],'證聖元年正月初一辛巳（694年11月23日），改元證聖。');
CeL.assert(['1855年2月5日 '+(CeL.gettext?'星期二':2),'太平天囯乙榮五年正月初一甲寅'.to_Date('era').format({parser:'CE',format:'%Y年%m月%d日 %w',locale:'cmn-Hant-TW'})],'天历与夏历阳历对照及简表');
CeL.assert(['西漢武帝元朔6年12月1日','武帝元朔六年十二月甲寅'.to_Date('era').format({parser:'CE',format:'%紀年名%年年%月月%日日',locale:'cmn-Hant-TW'})],'秦至汉初( 前246 至前104) 历法研究');
CeL.assert(["癸丑年八月初一",'2033年8月25日'.to_Date().format('Chinese')],'2033年閏年八月初一');
CeL.assert(["癸丑年閏十一月初一",'2033年12月22日'.to_Date().format('Chinese')],'2033年閏十一月初一');
CeL.assert(["甲寅年正月初一",'2034年2月19日'.to_Date().format('Chinese')],'2034年正月初一');
CeL.assert(["癸丑年閏11月1日",'2033年12月22日'.to_Date().format({parser:'Chinese',numeral:null,format:'%歲次年%月月%日日'})],'2033年閏十一月初一');
CeL.assert(["癸丑年閏11月1日",'2033年12月22日'.to_Date().format({parser:'era',era:'中曆',format:'%歲次年%月月%日日',locale:'cmn-Hant-TW'})],'2033年閏十一月初一');
CeL.assert([undefined,CeL.era('2200/1/1').共存紀年]);
CeL.assert([undefined,CeL.era('-900/1/1').共存紀年]);
// .共存紀年 test
CeL.assert(['吳大帝嘉禾7年5月3日|魏明帝景初2年6月3日|蜀後主延熙1年5月2日',CeL.era('238/6/2').共存紀年.join('|')],'統一時間標準→各特殊紀年（西→中）：查詢某時間點（時刻）存在的所有紀年與資訊。');
CeL.assert(['吳大帝嘉禾7年5月3日|魏明帝景初2年6月3日',CeL.era('延熙1年5月2日').共存紀年.join('|')],'各特殊紀年→統一時間標準（中→西）：查詢某朝代/君主(帝王)所有的共存紀年與資訊。');
CeL.assert(['魏明帝景初3年後12月8日|蜀後主延熙2年12月8日|吳大帝赤烏2年12月8日',CeL.era('240-1-19').共存紀年.join('|')],'測試特殊月名');
CeL.assert(['蜀後主延熙2年12月8日|吳大帝赤烏2年12月8日',CeL.era('魏明帝景初3年後12月8日').共存紀年.join('|')],'測試特殊月名');
CeL.assert(['高麗忠肅王16年8月8日|鎌倉時代後醍醐天皇嘉暦4年8月8日|元文宗天曆2年8月8日',CeL.era('1329年9月1日').共存紀年.join('|')],'統一時間標準→各特殊紀年（西→中）：查詢某時間點（時刻）存在的所有紀年與資訊。');
CeL.assert(['朝鮮仁祖6年1月26日|江戸時代後水尾天皇寛永5年1月26日|清太宗天聰2年1月26日|明思宗崇禎1年1月26日',CeL.era('1628年3月1日').共存紀年.join('|')],'統一時間標準→各特殊紀年（西→中）：查詢某時間點（時刻）存在的所有紀年與資訊。');
CeL.assert(['朝鮮仁祖6年1月26日|江戸時代後水尾天皇寛永5年1月26日|明思宗崇禎1年1月26日',CeL.era('中國清太宗天聰2年1月26日').共存紀年.join('|')],'各特殊紀年→統一時間標準（中→西）：查詢某朝代/君主(帝王)所有的共存紀年與資訊。');
CeL.assert(['朝鮮仁祖6年1月26日|江戸時代後水尾天皇寛永5年1月26日|清太宗天聰2年1月26日',CeL.era('中國明思宗崇禎1年1月26日').共存紀年.join('|')],'各特殊紀年→統一時間標準（中→西）：查詢某朝代/君主(帝王)所有的共存紀年與資訊。');
//
CeL.assert(["唐代宗寶應2年1月13日",CeL.era('二年春正月丁亥', {base : '寶應元年'}).format({parser:'CE',format:'%朝代%君主%紀年%年年%月月%日日',locale:'cmn-Hant-TW'})],'寶應二年春正月丁亥');
CeL.assert(["唐代宗寶應2年1月13日",CeL.era('丁亥', {base : '寶應二年春正月'}).format({parser:'CE',format:'%朝代%君主%紀年%年年%月月%日日',locale:'cmn-Hant-TW'})],'寶應二年春正月丁亥');
CeL.assert(["763/5/17",CeL.era('寶應二年三月晦日').format({parser:'CE',format:'%Y/%m/%d'})],'寶應二年三月晦日');
CeL.assert(["唐代宗寶應|二|三|一",CeL.era('三月一日', {parse_only : true, base : '寶應二年春正月'}).slice(1).join('|')], 'parse_only + base: 寶應二年春正月');
CeL.assert(["唐代宗寶應|二|三|一",CeL.era('三月一日', {parse_only : true, base : '寶應二年'}).slice(1).join('|')], 'parse_only + base: 寶應二年');
CeL.assert(["唐代宗寶應|二|三|晦",CeL.era('晦日', {parse_only : true, base : '代宗寶應二年三月一日'}).slice(1).join('|')], 'parse_only + base: 代宗寶應二年三月一日');
CeL.assert(["134/7/29",CeL.era('陽嘉3年6月20日', {get_range : true})[1].format({parser:'CE',format:'%Y/%m/%d'})],'陽嘉3年6月20日.末');
CeL.assert(["134/8/8",CeL.era('陽嘉3年6月', {get_range : true})[1].format({parser:'CE',format:'%Y/%m/%d'})],'陽嘉3年6月.末');
CeL.assert(["135/2/1",CeL.era('陽嘉3年', {get_range : true})[1].format({parser:'CE',format:'%Y/%m/%d'})],'陽嘉3年.末');
CeL.assert(["136/2/20",CeL.era('陽嘉', {get_range : true})[1].format({parser:'CE',format:'%Y/%m/%d'})],'陽嘉.末');

CeL.info('測試全部通過。');

});


 // should be error: 清任一紀年無第一八八〇年。
 '清一八八〇年四月二十一日七時'.to_Date('era').format({parser:'CE',format:'%歲次年%月干支月%日干支日%時干支時',locale:'cmn-Hant-TW'})
 // should be error
 '元一八八〇年四月二十一日七時'.to_Date('era').format({parser:'CE',format:'%歲次年%月干支月%日干支日%時干支時',locale:'cmn-Hant-TW'})



 // ---------------------------------------

 廢棄:

 查找：某 era name → era data:
 1st: [朝代 or 朝代兼紀年] from dynasty{*}
 2ed: [朝代:君主(帝王) list] from dynasty{朝代:{*}}
 3ed: [朝代君主(帝王):紀年 list] from dynasty{朝代:{君主(帝王):[]}}

 查找：某日期 → era data:
 1. get start date: 定 era_start_UTC 所有 day 或之前的 index。
 2. get end date, refrence:
 遍歷 era_end_UTC，處理所有（結束）日期於 day 之後的，即所有包含此日期的 data。


 </code>
 */

'use strict';

if (typeof CeL === 'function')
	CeL.run({
		name : 'data.date.era',
		// data.code.compatibility. : for String.prototype.repeat(),
		// String.prototype.trim()
		// data.native. : for Array.prototype.search_sorted()
		// data.date. : 干支
		// application.locale. : 中文數字
		require : 'data.native.|application.locale.|data.date.String_to_Date',

		code : function(library_namespace) {

			// requiring
			var String_to_Date;
			eval(this.use());

			// ---------------------------------------------------------------------//
			// 定義基本常數。

			// 工具函數。
			function generate_pattern(pattern_source) {
				return new RegExp(pattern_source
				// 數字
				.replace(/數/g, '[' + library_namespace
				//
				.positional_Chinese_numerals_digits + '十百千]')
				// 天干
				.replace(/干/g, '[' + library_namespace.STEM_LIST + ']')
				// 地支
				.replace(/支/g, '[' + library_namespace.BRANCH_LIST + ']'));
			}

			var Array_push = Array.prototype.push.apply
					.bind(Array.prototype.push),

			is_Date = library_namespace.is_Date,

			Date_to_String_parser = library_namespace.Date_to_String.parser,
			//
			strftime = Date_to_String_parser.strftime,

			// 一整天的 time 值。should be 86400000.
			ONE_DAY_LENGTH_VALUE = new Date(0, 0, 2) - new Date(0, 0, 1),

			// cache
			gettext_date = library_namespace.gettext.date,

			// 專門供搜尋各特殊紀年使用。
			era_search_pattern,

			// search_index[ {String}key : 朝代、君主(帝王)、帝王紀年、年號紀年、國家 ]
			// = Set(對應之 era_list index list)
			// = [ Set(對應之 era_list index list), 'key of search_index', 'key'..
			// ]
			search_index = library_namespace.null_Object(),

			// constant 常數。

			// http://zh.wikipedia.org/wiki/Talk:%E8%BE%B2%E6%9B%86
			// 將公元日時換算為夏曆日時，1929年1月1日以前，應將時間換為北京紫禁城（東經116.4度）實際時間，1929年1月1日開始，則使用東八區（東經120度）的標準時間。
			DEFAULT_TIMEZONE = String_to_Date.zone.CST,

			// http://zh.wikipedia.org/wiki/%E7%AF%80%E6%B0%A3
			// 中氣持續日期/前後範疇。
			中氣日_days = 3,
			// 中氣發生於每月此日起 (中氣日_days - 1) 日間。
			// assert: 在整個作業年代中，此中氣日皆有效。起碼須包含
			// proleptic Gregorian calendar -1500 － 2100 CE。
			中氣日 = [ 19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 20 ],

			// 標準時間（如公元紀年）分析器
			standard_time_parser = 'CE',

			// 基本上與程式碼設計合一，僅表示名義，不可更改。
			NOT_FOUND = -1,

			// 起始年月日。
			// 基本上與程式碼設計合一，僅表示名義，不可更改。
			START_YEAR = 1, START_MONTH = 1, START_DATE = 1,

			// 閏月名前綴。
			// 基本上與程式碼設計合一，僅表示名義，不可更改。
			LEAP_MONTH_PREFIX = '閏',

			// (年/月分資料=[年分各月資料/月分日數])[NAME_KEY]=[年/月分名稱]
			NAME_KEY = 'name', LEAP_MONTH_KEY = 'leap',
			// 月次，歲次
			START_KEY = 'start',
			//
			START_DATE_KEY = 'start date',
			//
			MONTH_NAME_KEY = 'month name',

			// set normal month count of a year.
			MONTH_COUNT = 12,

			// 可能出現的最大日期值。
			MAX_DATE_NUMBER = 1e5,

			// 二進位。
			// 基本上與程式碼設計合一，僅表示名義，不可更改。
			RADIX_2 = 2,

			/**
			 * parseInt( , radix) 可處理之最大 radix， 與 Number.prototype.toString ( [
			 * radix ] ) 可用之最大基數 (radix, base)。<br />
			 * 10 Arabic numerals + 26 Latin alphabet.
			 * 
			 * @inner
			 * @see <a href="http://en.wikipedia.org/wiki/Hexadecimal"
			 *      accessdate="2013/9/8 17:26">Hexadecimal</a>
			 */
			PACK_RADIX = 10 + 26,

			LEAP_MONTH_PADDING = new Array(
			// 閏月會有 MONTH_COUNT 個月 + 1個閏月 筆資料。
			(MONTH_COUNT + 1).toString(RADIX_2).length + 1).join(0),

			// 每年月數資料的固定長度。
			// 依當前實作法，最長可能為長度 4。
			YEAR_CHUNK_SIZE = parseInt(
			// 為了保持應有的長度，最前面加上 1。
			'1' + new Array(MONTH_COUNT).join(
			// 農曆通常是大小月相間。
			'110').slice(0, MONTH_COUNT + 1)
			// 13 個月可以二進位 1101 表現。
			+ (MONTH_COUNT + 1).toString(RADIX_2), RADIX_2)
			//
			.toString(PACK_RADIX).length,

			PACKED_YEAR_CHUNK_PADDING = new Array(
			// using String.prototype.repeat
			YEAR_CHUNK_SIZE + 1).join(' '),

			// 篩選出每年月數資料的 pattern。
			CALENDAR_DATA_SPLIT_PATTERN = new RegExp('[\\s\\S]{1,'
			// 或可使用: /[\s\S]{4}/g
			+ YEAR_CHUNK_SIZE + '}', 'g'),

			// date_data 0/1 設定。
			// 農曆一個月是29日或30日。
			大月 = 30, 小月 = 29,
			// 0:30, 1:29
			// 注意:會影響到 parse_era()!
			// 基本上與程式碼設計合一，僅表示名義，不可更改。
			MONTH_DAYS = [ 大月, 小月 ],

			// month length / month days: 公曆大月為31天。
			// 僅表示名義，不可更改。
			CE_MONTH_DAYS = 31,

			// 所有所處理的曆法中，可能出現的每月最大日數。
			// now it's CE.
			MAX_MONTH_DAYS = CE_MONTH_DAYS,

			MONTH_DAY_INDEX = library_namespace.null_Object(),

			// 辨識曆數項。
			// 基本上與程式碼設計合一，不可更改。
			// 見 extract_calendar_data()
			// [ all, front, date_name, calendar_data, back ]
			// 曆數_PATTERN =
			// /(?:([;\t]|^))(.*?)=?([^;\t=]+)(?:([;\t]|$))/g,
			//
			// [ all, date_name, calendar_data, back ]
			曆數_PATTERN = /(.*?)=?([^;\t=]+)([;\t]|$)/g,

			// matched: [ , 閏, 月分號碼 ]
			// TODO: 冬月, 臘月.
			// TODO: [閏後]
			MONTH_NAME_PATTERN = /^(閏)?([正元]|[01]?\d)月?$/,

			// matched: [ , 年, 月, 日 ]
			// TODO: 冬月, 臘月.
			起始日碼_PATTERN =
			// [日朔晦望]
			/^(-?\d+|元)?[\/.\-年](閏?(?:[正元]|[01]?\d))[\/.\-月]?(?:(初?\d{1,2}?|[正元])日?)?$/
			//
			,

			時刻_PATTERN = generate_pattern(
			// '(?:[早晚夜])'+
			/(支)時?\s*(?:([初正])([初一二三123])刻)?/.source),

			季_LIST = '春夏秋冬',

			// 當前的 ERA_DATE_PATTERN 必須指明所求年/月/日，無法僅省略日。
			// 否則遇到'吳大帝太元元年1月1日'之類的無法處理。
			// 若有非數字，干支之年分名稱，需要重新設計！
			// [ , prefix, year, month, date, suffix ]
			ERA_DATE_PATTERN = generate_pattern(
			// 取得/保存前置資訊。
			'^(.*?)'
			// 年分名稱。
			+ /([-前]?\d{1,4}|干支|前?數{1,4}|元)[\/.\-年]\s*/.source
			// e.g., 春正月
			+ '[' + 季_LIST + '王]?'
			// 月分名稱。
			+ /\s*([^\s月\/.\-年]{1,4})[\/.\-月]/.source
			// 日期名稱。
			+ /\s*初?(\d{1,2}|數{1,3}|[^\s日朔晦望]{1,5})日?/.source
			// 取得/保存後置資訊。
			+ '(.*?)$'),

			// 減縮版 ERA_DATE_PATTERN: 省略日期，或亦省略月分。
			// [ , prefix, year, numeral month, month, suffix ]
			ERA_DATE_PATTERN_NO_DATE = generate_pattern(
			// 取得/保存前置資訊。
			'^(.*?)'
			// 年分名稱。
			+ /([-前]?\d{1,4}|干支|前?數{1,4}|元)[\/.\-年]/.source
			// e.g., 春正月
			+ '[' + 季_LIST + '王]?'
			// 月分名稱。
			+ /\s*(?:([01]?\d)|([^\s月\/.\-年]{1,3})月)?/.source
			// 取得/保存後置資訊。
			+ '(.*?)$'),

			// parse 年 only
			// [ , prefix, year, , , suffix ]
			ERA_DATE_PATTERN_YEAR = generate_pattern(
			// 取得/保存前置資訊。
			'^(.*?)'
			// 年分名稱。
			+ /([-前]?\d{1,4}|干支|前?數{1,4})[\/.\-年]?()()/.source
			// 取得/保存後置資訊。
			+ '(.*?)$'),

			// 用來測試如 "一八八〇"
			POSITIONAL_DATE_NAME_PATTERN = new RegExp('^['
					+ library_namespace.positional_Chinese_numerals_digits
					+ ']{1,4}$'),

			ERA_PATTERN =
			//
			/^([東西南北前後]?[^\s])(.{1,3}[祖宗皇帝王君公侯伯叔主子后])(.{0,8})(?:([一二三四五六七八九十]{1,3})年)?/
			//
			,

			持續日數_PATTERN = /^\s*\+\d+\s*$/,

			參照_PATTERN = /^(?:(.*?)=)?:(.+)$/,

			// 配合 parse_era() 與 get_next_era()。
			// 因為須從範圍小的開始搜尋，因此範圍小的得排前面！
			紀年名稱索引值 = {
				紀年 : 0,
				年號 : 0,
				元号 : 0,
				君主 : 1,
				// 君主姓名
				君主名 : 1,
				帝王 : 1,
				天皇 : 1,
				朝代 : 2,
				政權 : 2,
				國號 : 2,
				諸侯國 : 3,
				國家 : 3
			},

			// era data refrence 對應
			// sorted by: start Date 標準時間(如UTC+8) → parse_era() 插入順序.
			era_list = [],

			// period_root[國家]
			// = 次階層 Period
			period_root = new Period,

			// default date parser.
			// 採用 'Chinese' 可 parse 日干支。
			DEFAULT_DATE_PARSER = 'Chinese',
			// 不使用 parser。
			PASS_PARSER = [ 'PASS_PARSER' ],
			// default date format
			// 基本上與程式碼設計合一，不可更改。
			DATE_NAME_FORMAT = '%Y/%m/%d',

			// @see get_name(type)

			// 基本上僅表示名義。若欲更改，需考慮對外部程式之衝擊。
			SEARCH_STRING = 1,

			// 十二生肖，或屬相
			// Chinese Zodiac
			十二生肖_LIST = '鼠牛虎兔龍蛇馬羊猴雞狗豬',
			// 陰陽五行
			// The Wu Xing, (五行 wŭ xíng) also known as the Five
			// Elements, Five
			// Phases, the Five Agents, the Five Movements, Five
			// Processes, and
			// the Five Steps/Stages
			陰陽五行_LIST = '木火土金水',

			// 各月の別名
			// https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E6%9A%A6#.E5.90.84.E6.9C.88.E3.81.AE.E5.88.A5.E5.90.8D
			日本月名_LIST = '睦月,如月,弥生,卯月,皐月,水無月,文月,葉月,長月,神無月,霜月,師走'.split(','),
			// 六曜は元々は、1箇月（≒30日）を5等分して6日を一定の周期とし（30÷5 =
			// 6）、それぞれの日を星毎に区別する為の単位として使われた。
			// https://ja.wikipedia.org/wiki/%E5%85%AD%E6%9B%9C
			// 旧暦の月の数字と旧暦の日の数字の和が6の倍数であれば大安となる。
			// '大安赤口先勝友引先負仏滅'.match(/../g)
			六曜_LIST = '大安,赤口,先勝,友引,先負,仏滅'.split(','),
			//
			曜日_LIST = '日月火水木金土';

			// ---------------------------------------------------------------------//
			// 初始調整並規範基本常數。

			(function() {
				var a = [ 2, 1 ];
				Array_push(a, [ 4, 3 ]);
				if (a.join(',') !== "2,1,4,3")
					Array_push = function(array, list) {
						return Array.prototype.push.apply(array, list);
					};
			})();

			// 預設國家。
			// parse_era.default_country = '中國';

			// clone MONTH_DAYS
			parse_era.days = [];

			parse_era.chunk_size = YEAR_CHUNK_SIZE;

			MONTH_DAYS.forEach(function(days, index) {
				MONTH_DAY_INDEX[days] = index;
				parse_era.days.push(days);
			});

			// ---------------------------------------------------------------------//
			// 工具函數：search_index 處理。search_index public interface。
			// TODO: 增加效率。
			// search_index 必須允許以 ({String}key in search_index) 的方式來偵測是否具有此 key。

			function for_each_era_of_key(key, operator) {
				var eras = search_index[key];

				// era: Era, Set, []
				if (Array.isArray(eras)) {
					eras[0].forEach(function(era) {
						operator(era);
					});

					for (var i = 1; i < eras.length; i++)
						for_each_era_of_key(eras[i], operator);

				} else
					eras.forEach(function(era) {
						operator(era);
					});
			}

			// bug: 當擅自改變子 era 時，將無法得到正確的 size。
			function era_count_of_key(key) {
				var eras = search_index[key], size = 'size' in eras
						&& eras.size;

				if (!size && Array.isArray(eras)) {
					size = eras[0].size;

					for (var i = 1; i < eras.length; i++)
						size += era_count_of_key(eras[i]);
					eras.size = size;
				}

				return size;
			}

			// get era Set of {String}key
			function get_era_Set_of_key(key) {
				var eras = search_index[key];

				if (Array.isArray(eras))
					if (eras.cache)
						eras = eras.cache;
					else {
						var i = 1, length = eras.length,
						// 不動到 search_index
						set = library_namespace.Set_from_Array(eras[0]);
						for (; i < length; i++)
							for_each_era_of_key(eras[i], function(era) {
								set.add(era);
							});
						eras.cache = set;
						eras = set;
					}

				return eras;
			}

			// 可處理重複 key 之情況，而不覆蓋原有值。
			function add_to_era_by_key(key, era) {
				if (!key || !era || key === era)
					return;

				var eras = search_index[key];
				if (!eras)
					// 初始化 search_index[key]。
					if (typeof era !== 'string') {
						// search_index[]: Set, [原生 Set, alias String 1, alias
						// String 2, ..]
						(search_index[key] = eras = library_namespace
								.Set_from_Array(Array.isArray(era)
								// era: Era, string, []
								? era : [ era ])).origin = true;
						return;

					} else
						(search_index[key] = eras = new Set).origin = true;

				if (era instanceof Era) {
					if (Array.isArray(eras)) {
						// .size, .cache 已經不準。
						delete eras.size;
						delete eras.cache;
						// 添加在原生 Set: 名稱本身即為此 key。
						eras = eras[0];
					}
					eras.add(era);

					// else assert: typeof era==='string'
				} else if (Array.isArray(eras)) {
					eras.push(era);
					// .size, .cache 已經不準。
					delete eras.size;
					delete eras.cache;
				} else
					(search_index[key] = eras = [ eras, era ]).origin = true;
			}

			// ---------------------------------------------------------------------//
			// 工具函數。

			// TODO: comparator
			// sorted_array: sorted by .[start_key]
			function order_bar(sorted_array, start_key, end_key) {
				if (sorted_array.length === 0)
					return [];

				if (!start_key)
					start_key = 'start';
				if (!end_key)
					end_key = 'end';

				var bars = [], all_end = -Infinity,
				// 置入最後欲回傳的階層。
				layer = [ bars ];

				function settle(do_reset) {
					// clear. 結清。
					// 寫入/紀錄階層序數。

					if (bars.length > 1) {
						// sort 前一區間。
						// TODO: 若有接續前後者的，酌加權重。
						bars.sort(function(a, b) {
							// 大→小。
							return b.weight - a.weight;
						});

						if (do_reset)
							layer.push(bars = []);
					}
				}

				sorted_array.forEach(function(object) {
					var bar,
					//
					start = object[start_key], end = object[end_key];

					if (start < all_end) {
						// 有重疊。

						if (bars.length === 1 && bars[0].length > 1) {
							// 先結清一下前面沒重疊的部分，只擠出最後一個元素。
							// bars : last bar
							bars = bars[0];
							// bar : 最後一個元素。
							bar = bars.pop();
							bars.end = bars[bars.length - 1].end;
							bars.weight -= bar.end - bar.start;
							// 重建新的 bar。
							(bars = [ bar ]).weight -= bar.end - bar.start;
							bars.end = bar.end;
							// 置入最後欲回傳的階層。
							layer.push(bars = [ bars ]);
							// reset
							bar = null;
						}

						// 取 bar 之 end 最接近 object.start 者。
						var
						// 最接近間距。
						closest_gap = Infinity,
						// 最接近之 bar index。
						closest_index = undefined;

						bars.forEach(function(bar, i) {
							var gap = start - bar.end;
							if (gap < closest_gap && 0 <= gap) {
								closest_gap = gap;
								closest_index = i;
							}
						});

						if (closest_index !== undefined)
							bar = bars[closest_index];

					} else {
						settle(true);
						bar = bars[0];
					}

					// start = 本 object 之 weight。
					start = end - start;
					// 將本 object 加入 bars 中。
					if (bar) {
						bar.push(object);
						bar.weight += start;
					} else {
						// 初始化。
						bars.push(bar = [ object ]);
						bar.weight = start;
					}
					bar.end = end;

					if (all_end < end)
						all_end = end;
				});

				settle();
				layer[start_key] = sorted_array[0][start_key];
				layer[end_key] = all_end;

				return layer;
			}

			// TODO: comparator
			// sorted_array: sorted by .[start_key]
			function order_bar_another_type(sorted_array, start_key, end_key) {
				if (sorted_array.length === 0)
					return [];

				if (!start_key)
					start_key = 'start';
				if (!end_key)
					end_key = 'end';

				var bars = [], all_end = -Infinity,
				// 最後欲回傳的階層。
				layer = [ [] ];

				function settle() {
					if (bars.length > 0) {
						// clear. 結清。
						// 寫入/紀錄階層序數。

						var layer_now;

						if (bars.length === 1) {
							layer_now = layer[0];
							bars[0].forEach(function(object) {
								layer_now.push(object);
							});

						} else {
							// sort 前一區間。
							// TODO: 若有接續前後者的，酌加權重。
							bars.sort(function(a, b) {
								// 大→小。
								return b.weight - a.weight;
							});

							bars.forEach(function(bar, i) {
								layer_now = layer[i];
								if (!layer_now)
									layer_now = layer[i] = [];
								bar.forEach(function(object) {
									layer_now.push(object);
								});
							});
						}

						// reset
						bars = [];
					}
				}

				sorted_array.forEach(function(object) {
					var bar,
					//
					start = object[start_key], end = object[end_key];

					if (start < all_end) {
						// 有重疊。
						// 取 bar 之 end 最接近 object.start 者。
						var
						// 最接近間距。
						closest_gap = Infinity,
						// 最接近之 bar index。
						closest_index = undefined;

						bars.forEach(function(bar, i) {
							var gap = start - bar.end;
							if (gap < closest_gap && 0 <= gap) {
								closest_gap = gap;
								closest_index = i;
							}
						});

						if (closest_index !== undefined)
							bar = bars[closest_index];

					} else
						settle();

					// start = 本 object 之 weight。
					start = end - start;
					// 將本 object 加入 bars 中。
					if (bar) {
						bar.push(object);
						bar.weight += start;
					} else {
						// 初始化。
						bars.push(bar = [ object ]);
						bar.weight = start;
					}
					bar.end = end;

					if (all_end < end)
						all_end = end;
				});

				settle();

				return layer;
			}

			// 時期 class。
			function Period(start, end) {
				this.start = start;
				this.end = end;
				this.sub = library_namespace.null_Object();

				// 階層序數: 0, 1, 2..
				// this.bar = [ [], [], ..];
			}

			Period.prototype.toString = function() {
				return this.name || '[class Period]';
			};

			// ---------------------------------------------------------------------//
			// 處理農曆之工具函數。

			/**
			 * 正規化名稱，盡量將中文數字轉為阿拉伯數字。
			 * 
			 * @param {String}number_String
			 *            中文數字
			 * @returns {String}數字化名稱
			 */
			function normalize_number(number_String) {
				return library_namespace.Chinese_numerals_Formal_to_Normal(
				//
				library_namespace.normalize_Chinese_numeral(number_String))
						.trim();
			}

			/**
			 * 正規化日期名稱，盡量將中文數字轉為阿拉伯數字。
			 * 
			 * @param {String}number_String
			 *            中文數字年/月/日
			 * @returns {String}日期名稱
			 */
			function numeralize_date_name(number_String, no_alias) {
				if (!number_String)
					return number_String === 0 ? 0 : '';
				// 處理元年, 閏?[正元]月, 初日
				number_String = String(number_String).trim();

				if (!no_alias)
					number_String = number_String.replace(/^初/, '')
					// 初吉即陰曆初一朔日。
					.replace(/[正元吉]$/, 1)
					// TODO: 統整月令別名。
					.replace(/冬$/, 10).replace(/臘$/, 11);
				else if (/正$/.test(number_String))
					// 最起碼得把會當作數字的處理掉。
					return number_String;

				return POSITIONAL_DATE_NAME_PATTERN.test(number_String)
				//
				? library_namespace
						.from_positional_Chinese_numeral(number_String)
				//
				: library_namespace.from_Chinese_numeral(number_String);
			}

			// 至順治二年（公元1645年）頒行時憲曆後，改為日96刻，每時辰八刻（初初刻、初一刻、初二刻、初三刻、正初刻、正一刻、正二刻、正三刻）。自此每刻15分，無「四刻」之名。
			function 時刻_to_hour(時刻_String) {
				return String(時刻_String).trim().replace(
						時刻_PATTERN,
						function($0, 時, 初正, 刻) {
							return (2 * library_namespace.BRANCH_LIST
									.indexOf(時) - (初正 === '初' ? 1 : 0))
									+ '時'
									+ (刻
											&& (刻 = isNaN(刻) ? '初一二三'
													.indexOf(刻) : +刻) ? 15 * 刻
											+ '分' : '');
						});
			}

			// 檢查是否可能是日數。
			// 因為得考慮月中起始的情況，因此只檢查是否小於最大可能之日數。
			function maybe_month_days(string) {
				return string <= MAX_MONTH_DAYS;
			}

			// 解壓縮日數 data 片段。
			function extract_calendar_slice(calendar_data_String, date_name,
					閏月名) {
				if (maybe_month_days(calendar_data_String))
					return [ date_name, calendar_data_String ];

				var calendar_data = calendar_data_String
				// TODO: 除此 .split() 之外，盡量不動到這些過於龐大的資料…戯言。
				// http://jsperf.com/chunk-vs-slice
				// JavaScript 中 split 固定長度比 .slice() 慢。
				.match(CALENDAR_DATA_SPLIT_PATTERN),
				//
				calendar_data_Array = [], initial_month = date_name || '';

				if (initial_month.indexOf('/') !== NOT_FOUND)
					initial_month = initial_month.split('/')[1];

				if (calendar_data.length === 0) {
					library_namespace.err(
					//
					'extract_calendar_slice: 無法辨識日數資料 [' + calendar_data_String
							+ ']！');
					return [ date_name, calendar_data_String ];
				}

				calendar_data.forEach(function(year_data) {
					year_data = parseInt(year_data, PACK_RADIX).toString(
							RADIX_2).slice(1);

					var year_data_Array = [],
					//
					leap_month_index, leap_month_index_list;

					// MONTH_COUNT 個月 + 1個閏月。
					while (year_data.length > MONTH_COUNT + 1) {
						// 閏月的部分以 4
						// (LEAP_MONTH_PADDING.length)
						// 個二進位數字指示。
						leap_month_index = parseInt(
						//
						year_data.slice(-LEAP_MONTH_PADDING.length), RADIX_2);
						year_data = year_data.slice(0,
								-LEAP_MONTH_PADDING.length);

						if (leap_month_index_list) {
							library_namespace.err(
							//		
							'extract_calendar_slice: 本年有超過1個閏月！');
							leap_month_index_list.unshift(leap_month_index);
						} else
							leap_month_index_list = [ leap_month_index ];
					}

					leap_month_index
					// assert: 由小至大。
					= leap_month_index_list
					// 僅取最小的 1個閏月。
					&& leap_month_index_list.sort()[0];

					if (initial_month) {
						if (閏月名)
							// 正規化閏月名。
							initial_month = initial_month.replace(this.閏月名,
									LEAP_MONTH_PREFIX);
						if (initial_month === LEAP_MONTH_PREFIX)
							initial_month += leap_month_index;

						if (initial_month = initial_month
								.match(MONTH_NAME_PATTERN)) {

							if (initial_month[1]
									|| leap_month_index < initial_month[2]) {
								if (initial_month[1]) {
									if (initial_month[2] != leap_month_index)
										library_namespace.err(
										//
										'extract_calendar_slice: 起始閏月次['
												+ initial_month[2]
												+ '] != 日數資料定義之閏月次['
												+ leap_month_index + ']！');
									// 由於已經在起頭設定閏月或之後起始，
									// 因此再加上閏月的指示詞，會造成重複。
									leap_month_index = null;
								}

								// 閏月或之後起始，須多截1個。
								initial_month[2]++;
							}

							initial_month = initial_month[2] - START_MONTH;

							if (!(0 <= (leap_month_index -= initial_month)))
								leap_month_index = null;

							// 注意：閏月之 index 是 padding 前之資料。
							year_data = year_data.slice(initial_month);

							// 僅能使用一次。
							initial_month = null;
						}
					}
					year_data = year_data.split('');

					year_data.forEach(function(month_days) {
						year_data_Array.push(
						//
						(leap_month_index === year_data_Array.length
						//
						? LEAP_MONTH_PREFIX + '=' : '')
								+ MONTH_DAYS[month_days]);
					});

					calendar_data_Array.push(year_data_Array
							.join(pack_era.month_separator));
				});

				return [ date_name,
						calendar_data_Array.join(pack_era.year_separator) ];
			}

			// 解壓縮日數 data。
			function extract_calendar_data(calendar_data, era) {
				return calendar_data.replace(曆數_PATTERN,
				// replace slice
				function(all, date_name, calendar_data, back) {
					calendar_data = extract_calendar_slice(calendar_data,
							date_name, era && era.閏月名);
					return (calendar_data[0] ? calendar_data.join('=')
							: calendar_data[1])
							+ back;
				});
			}

			// date_Array = [ 年, 月, 日 ]
			function numeralize_date_format(date_Array, numeral) {
				return [ gettext_date.year(date_Array[0], numeral),
						gettext_date.month(date_Array[1], numeral),
						gettext_date.date(date_Array[2], numeral) ];
			}

			function split_era_name(name) {
				if (name = name.match(ERA_PATTERN))
					return {
						朝代 : name[1],
						帝王 : name[2],
						// 紀年/其他
						紀年 : name[3]
					};
			}

			// ---------------------------------------------------------------------//

			// 紀年 class。
			function Era(properties, previous) {
				for ( var property in properties)
					this[property] = properties[property];
			}

			function get_name(type) {
				var name = this.name;
				if (type === SEARCH_STRING)
					// 搜尋時，紀年顯示方法："紀年 (朝代君主(帝王), 國家)"
					// e.g., "元始 (西漢平帝劉衍, 中國)"
					return name[紀年名稱索引值.紀年] + ' (' + (name[紀年名稱索引值.朝代] || '')
							+ (name[紀年名稱索引值.君主] || '') + ', '
							+ name[紀年名稱索引值.國家] + ')';

				// 基本上不加國家名稱。
				name = name.slice(0, 3).reverse();
				// 對重複的名稱作適當簡略調整。
				if (name[0] && name[0].indexOf(name[2]) !== NOT_FOUND
				//
				|| name[1] && name[1].indexOf(name[2]) !== NOT_FOUND)
					name[2] = '';
				if (name[1] &&
				// name[1].startsWith(name[0])
				name[1].lastIndexOf(name[0], 0) === 0)
					name[0] = '';

				// <a
				// href="http://big5.huaxia.com/zhwh/wszs/2009/12/1670026.html"
				// accessdate="2013/5/2 19:46">《中國歷史紀年表》解惑</a>
				// 謚號紀年的方法是：國號——帝王謚號——年號(無年號者不用)——年序號，如漢惠帝五年，梁武帝大同八年。
				// 自唐朝開始，改紀年方式為國號——帝王廟號——年號——年序號。如唐高宗永徽四年，清世宗雍正八年等。
				return name.join('');
			}

			// ---------------------------------------
			// 月次，歲次或名稱與序號 (index) 之互換。

			// 歲序→歲次(ordinal: start with START_YEAR)→歲名
			function year_index_to_name(歲序) {
				var 歲名 = this.calendar[NAME_KEY];
				if (!歲名 || !(歲名 = 歲名[歲序]))
					歲名 = 歲序 + (START_KEY in this.calendar
					//
					? this.calendar[START_KEY] : START_YEAR);
				return 歲名;
			}

			// (歲名→)歲次(ordinal: start with START_YEAR)
			// →歲序(index of year[])
			function year_name_to_index(歲名) {
				if (!歲名)
					return;

				var 歲序 = this.calendar[NAME_KEY];
				if (!歲序 || (歲序 = 歲序.indexOf(歲名)) === NOT_FOUND) {
					歲名 = numeralize_date_name(歲名);

					if (isNaN(歲名)) {
						// 可能只是 to_era_Date() 在作測試，看是否能成功解析。
						if (library_namespace.is_debug())
							library_namespace.err(
							//
							'year_name_to_index: 紀年 [' + this + '] '
							//
							+ (歲序 ? '沒有[' + 歲名 + ']年！' : '不具有特殊名稱設定！'));
						return;
					}

					歲序 = 歲名 - (START_KEY in this.calendar
					//
					? this.calendar[START_KEY] : START_YEAR);
				}
				return 歲序;
			}

			// 月序→月次(ordinal: start with START_MONTH)→月名
			function month_index_to_name(月序, 歲序) {
				歲序 = this.calendar[歲序];
				var 月名 = 歲序[NAME_KEY];
				// 以個別命名的月名為第一優先。
				if (!月名 || !(月名 = 月名[月序])) {
					月名 = 月序 + (START_KEY in 歲序 ? 歲序[START_KEY] : START_MONTH);

					if (this.歲首序 && (月名 += this.歲首序) > MONTH_COUNT)
						月名 -= MONTH_COUNT;

					if (月序 >= 歲序[LEAP_MONTH_KEY]) {
						if (--月名 < START_MONTH)
							月名 += MONTH_COUNT;
						if (月序 == 歲序[LEAP_MONTH_KEY])
							月名 = (this.閏月名 || LEAP_MONTH_PREFIX) + 月名;
					}
				}
				return 月名;
			}

			// (月名→)月次(ordinal: start with START_MONTH)
			// →月序(index of month[])
			function month_name_to_index(月名, 歲序) {
				if (!月名 || !(歲序 in this.calendar))
					return;

				var is_閏月, 歲_data = this.calendar[歲序], 月序 = 歲_data[NAME_KEY],
				//
				閏月序 = 歲_data[LEAP_MONTH_KEY]
						+ (START_KEY in 歲_data ? 歲_data[START_KEY]
								- START_MONTH : 0);

				if (!月序 || (月序
				// 以個別命名的月名為第一優先。
				= 月序.indexOf(numeralize_date_name(月名, true))) === NOT_FOUND) {

					月名 = String(numeralize_date_name(月名));

					if (this.閏月名)
						// 正規化閏月名。
						月名 = 月名.replace(this.閏月名, LEAP_MONTH_PREFIX);

					if (!isNaN(is_閏月 = this.歲首序))
						月名 = 月名.replace(/\d+/, function(month) {
							if ((month -= is_閏月) < 1)
								month += MONTH_COUNT;
							return month;
						});

					if (月名 === LEAP_MONTH_PREFIX) {
						if (isNaN(月序 = 閏月序)) {
							// 可能只是 to_era_Date() 在作測試，看是否能成功解析。
							if (library_namespace.is_debug())
								library_namespace.warn(
								//
								'month_name_to_index: 紀年 [' + this + '] 之 ['
										+ this.歲名(歲序) + ']年沒有閏月！');
							return;
						}

					} else if ((月序 = String(numeralize_date_name(月名)))
					// 直接用 String(numeralize_date_name(月名)).match()
					// 在 Chrome 中可能造成值為 null。
					// e.g., 北魏孝武帝永興1年12月 曆譜
					&& (月序 = 月序.match(MONTH_NAME_PATTERN))) {
						月序 = +月序[2]
								// 閏月或之後。
								+ ((is_閏月 = 月序[1]) || 月序[2] > 閏月序 ? 1 : 0)
								- (START_KEY in 歲_data ? 歲_data[START_KEY]
										: START_MONTH);
						if (is_閏月 && 月序 !== 閏月序) {
							// 可能只是 to_era_Date() 在作測試，看是否能成功解析。
							if (library_namespace.is_debug())
								library_namespace.warn(
								//
								'month_name_to_index: 紀年 ['
										+ this
										+ '] 之 ['
										+ this.歲名(歲序)
										+ ']年沒有 ['
										+ 月名
										+ ']月'
										+ (閏月序 ? '，只有' + this.月名(閏月序, 歲序) + '月'
												: '') + '！');
							return;
						}

					} else {
						// 可能只是 to_era_Date() 在作測試，看是否能成功解析。
						if (library_namespace.is_debug())
							library_namespace.warn('month_name_to_index: 紀年 ['
									+ this
									+ '] 之 ['
									+ this.歲名(歲序)
									+ ']年'
									+ (歲_data[NAME_KEY] ? '不具有特殊月分名稱設定！'
											: '沒有月分名稱[' + 月名 + ']！'));
						return;
					}
				}

				return 月序;
			}

			// 日序轉成日名。
			// [ 日名, 月名, 歲名 ]
			function date_index_to_name(日序, 月序, 歲序) {
				if (月序 < 0 || this.calendar[歲序].length <= 月序)
					if (月序 = this.shift_month(月序, 歲序)) {
						歲序 = 月序[1];
						月序 = 月序[0];
					} else
						return;

				return [ 日序
				//
				+ (月序 === 0 && 歲序 === 0 && START_DATE_KEY in this.calendar
				//
				? this.calendar[START_DATE_KEY] : START_DATE),
				//
				this.月名(月序, 歲序), this.歲名(歲序) ];
			}

			// 日名轉成日序。
			function date_name_to_index(日名, is首月) {
				if (!isNaN(日名
				//
				= numeralize_date_name(日名)))
					日名 -= (is首月 && START_DATE_KEY in this.calendar
					//
					? this.calendar[START_DATE_KEY] : START_DATE);
				return 日名;
			}

			// 取得 (歲序)年後，(月數) 個月之後的月序與歲序。
			function shift_month(月數, 歲數, 基準月) {
				if (Array.isArray(月數))
					基準月 = 月數, 月數 = 歲數 = 0;
				else {
					if (isNaN(月數 |= 0))
						月數 = 0;
					if (Array.isArray(歲數))
						基準月 = 歲數, 歲數 = 0;
					else {
						if (isNaN(歲數 |= 0))
							歲數 = 0;
						if (!Array.isArray(基準月))
							基準月 = [ 0, 0 ];
					}
				}

				// 基準月: [ 月序, 歲序, 差距月數 ]
				var 月序 = (基準月[0] | 0) + 月數,
				//
				歲序 = 基準月[1] | 0,
				//
				差距月數 = (基準月[2] | 0) + 月數;

				if (歲數 > 0)
					while (歲數 > 0 && 歲序 < this.calendar.length)
						歲數--, 差距月數 += this.calendar[歲序++].length;
				else
					while (歲數 < 0 && 歲序 > 0)
						歲數++, 差距月數 -= this.calendar[歲序--].length;

				if (月序 > 0)
					while (月序 >= (月數 = this.calendar[歲序].length)) {
						if (++歲序 >= this.calendar.length) {
							if (library_namespace.is_debug())
								// 可能是孝徳天皇之類，期間過短，又嘗試
								// get_month_branch_index()
								// 的。
								library_namespace.err('shift_month: 已至 ['
										+ this + '] 曆數結尾，無可資利用之月分資料！');
							差距月數 = NaN;
							歲序--;
							break;
						}
						月序 -= 月數;
					}
				else
					while (月序 < 0) {
						if (--歲序 < 0) {
							if (library_namespace.is_debug())
								library_namespace.err('shift_month: 已至 ['
										+ this + '] 曆數起頭，無可資利用之月分資料！');
							差距月數 = NaN;
							歲序 = 0;
							break;
						}
						月序 += this.calendar[歲序].length;
					}

				基準月[0] = 月序;
				基準月[1] = 歲序;
				基準月[2] = 差距月數;
				return !isNaN(差距月數) && 基準月;
			}

			// date index of era → Date
			function date_index_to_Date(歲序, 月序, 日序) {
				if (!this.shift_month(歲序 = [ 月序, 歲序 ]))
					return;
				// 差距日數
				月序 = 歲序[0];
				歲序 = 歲序[1];
				日序 |= 0;

				var date = this.year_start[歲序],
				//
				i = 0, calendar = this.calendar[歲序];
				for (; i < 月序; i++)
					日序 += calendar[i];

				return new Date(date + 日序 * ONE_DAY_LENGTH_VALUE);
			}

			// 取得 era_1.end 在 era_2 中的 index，並作必要的連續性、正規性 check。
			// index: [ 歲序, 月序, 日序 | 0, 更替時間點: 年/月/日 ]
			function get_continuous_index(era_1, era_2, deep_check) {
				var tmp,
				// 更替時間點。
				relay_type,
				// era_2 的 date index
				// [ 歲序, 月序, 日序 | 0 ]
				era_2_index,
				// era_1 的日期名(maybe null)
				// [ 日名, 月名, 歲名 ]
				era_1_name,
				// era_2 的日期名
				era_2_name;

				// 正規化。
				if (era_1.start > era_2.start)
					tmp = era_1, era_1 = era_2, era_2 = tmp;

				if (era_1.end < era_2.start)
					// 無重疊的部分。
					if (era_2.start - era_1.end
					// 366: 一年最大長度。
					< 366 * ONE_DAY_LENGTH_VALUE) {
						// TODO: 在同一年中應當仍然可測試其正規性。
					} else
						// 中間距離過大。無從比較。
						return;

				// 月日名連續性檢測。

				// era_1.end == era_2.start:
				// 無縫接軌。毋須檢測。
				// else 有重疊的部分。

				// 因為 era_1.end 不一定於 era_1 範圍內，可能剛好在邊界上，
				// 因此須作特殊處理。

				tmp = era_1.Date_to_date_index(era_1.end);
				if (!tmp) {
					// assert: era_1.end 剛好在 era_1 訖邊界上。

					// assert: era_1.end 若非在年初（跨年），而在年中，
					// 則應該是 era_1.calendar 的資料在年中就截斷了。

					relay_type = true;

					// 這時測試前一天。
					tmp = new Date(era_1.end.getTime());
					// assert: 取前一天則必須為紀年起始後（紀年範圍內），與最後一日期間內；
					// 必能被 parse，且可取得 index。
					tmp.setDate(tmp.getDate() - 1);
					tmp = era_1.Date_to_date_index(tmp);

					if (!tmp) {
						library_namespace.err('get_continuous_index: 無法取得　['
						//
						+ era_1 + '].end 的日期名！');
						return;
					}
				}

				era_1_name = era_1.日名(tmp[2], tmp[1], tmp[0]);
				if (relay_type)
					// 日名延後一日以取得應該有的 date。
					era_1_name[0]++;

				era_2_index = era_2.Date_to_date_index(era_1.end);
				era_2_name = era_2.日名(era_2_index[2], era_2_index[1],
						era_2_index[0]);

				// 檢測前後紀元之接續月日名是否相同。
				// 主要指本紀元結束時間 (era_1.end)
				// 在兩紀元中之月日名：
				// 從 era_1.end 開始複製可以最節省資源，不用再重複複製重疊部分。

				// 在此將 relay_type 設成是否通過/未通過檢驗。
				relay_type
				// 測試是否為跨年。
				= era_2_name[1] == START_MONTH
				//
				&& era_2_name[0] == START_DATE ? '年'

				// 測試是否為年內換月。
				// era_2 的 date index 為首日。
				|| era_2_index[2] === 0
				// 確認 era_2_name[0] 為此月最後一天的後一天。
				// 這邊採用的是不嚴謹的測試:
				// 只要 era_2_name[0]
				// <b>有可能</b>是此月最後一天就算通過。
				// 29 === Math.min.apply(Math,
				// MONTH_DAYS);
				: era_2_name[0] > 小月
				//
				&& era_2_name[1] - era_1_name[1] === 1 ? '月'

				// 測試是否為同一月內同一日。
				// 檢測日名是否相同。
				: era_1_name[0] === era_2_name[0]
				// 檢測月名是否相同。
				&& era_1_name[1] === era_2_name[1] && '日';

				if (!relay_type) {
					library_namespace.err(
					//
					'get_continuous_index: 前後紀元 [' + era_1 + '], [' + era_2
							+ '] 之接續月日名不同！');
					return;
				}

				era_2_index.push(relay_type);

				// ---------------------------------------
				if (deep_check) {
					// deep check if conflicts
					// 一一檢測前後紀元時間重疊的部分曆數是否有衝突。
					// also need to check KEYs
					// TODO

				}

				return era_2_index;
			}

			// {String}date_name
			// [ 年名, 月名, 起始日碼 ]
			function parse_calendar_date_name(date_name) {
				if (!date_name)
					return [];

				var matched = date_name.match(起始日碼_PATTERN);
				date_name = matched ? matched.slice(1) : date_name.split('/');
				// 得考慮有特殊月名的情況，因此不可採
				// (name === LEAP_MONTH_PREFIX ||
				// MONTH_NAME_PATTERN.test(name))
				// 之類的測試方式。
				if (date_name.length === 1)
					// 月名
					date_name = [ , date_name[0] ];
				if (date_name.length > 3)
					library_namespace.warn('parse_calendar_date_name: 日碼 ['
							+ date_name.join('/') + '].length = '
							+ date_name.length + '，已過長！');

				date_name.forEach(function(name, index) {
					date_name[index] = numeralize_date_name(name);
				});

				// 正規化月名。
				if (matched = date_name[1])
					if (matched = matched.match(MONTH_NAME_PATTERN))
						date_name[1] = (matched[1] || '') + matched[2];
					else if (date_name[1] !== LEAP_MONTH_PREFIX)
						library_namespace.warn(
						//
						'parse_calendar_date_name: 特殊月名: [' + date_name[1]
								+ ']');

				return date_name;
			}

			// 需在設定完個別 this_year_data 之月名後，才作本紀年泛用設定。
			function add_month_name(月名_Array, this_year_data) {
				var name_Array = this_year_data[NAME_KEY],
				//
				leap = this_year_data[LEAP_MONTH_KEY], start;
				if (start = this_year_data[START_KEY])
					start -= START_MONTH;
				else
					start = 0;

				if (!Array.isArray(name_Array))
					if (isNaN(leap)) {
						if (Array.isArray(月名_Array))
							this_year_data[NAME_KEY] = start ? 月名_Array
									.slice(start) : 月名_Array;
						return;
					} else
						name_Array = this_year_data[NAME_KEY] = [];

				月名_Array.forEach(function(名, index) {
					if (0 <= (index -= start)) {
						if (leap <= index) {
							if (leap === index && !(index in name_Array)
									&& 月名_Array[index + start - 1])
								name_Array[index]
								// 閏月使用上一 index 月名。
								= 月名_Array[index + start - 1];
							// index 為閏月或之後，則使用在下一 index 之月名。
							index++;
						}
						// 不作覆蓋。
						if (名 && !(index in name_Array))
							name_Array[index] = 名;
					}
				});
			}

			// 初始化/parse 紀年之月分日數 data。
			// initialize era date.
			function initialize_era_date() {
				// IE 需要 .getTime()：IE8 以 new Date(Date object) 會得到 NaN！
				var days, start_time = new Date(this.start.getTime()),
				// 當前年分之各月資料 cache。calendar_data[this year]。
				this_year_data,
				//
				紀年曆數 = this.calendar, this_end = this.end.getTime(),

				// 最後將作為 this.year_start 之資料。
				year_start_time = [ start_time.getTime() ],
				// 最後將作為 this.calendar 之資料。
				// (年/月分資料=[年分各月資料/月分日數])[NAME_KEY]=[年/月分名稱],
				// [START_KEY] = start ordinal,
				// [LEAP_MONTH_KEY] = leap month index.
				calendar_data = [],

				//
				年序, 月序;

				// ---------------------------------------

				if (!紀年曆數 || typeof 紀年曆數 !== 'string') {
					library_namespace.err('initialize_era_date: 無法辨識曆數資料！');
					return;
				}

				// [ 紀年曆數, 年名, 月名, 國家或紀年 ]
				月序 = 紀年曆數.match(參照_PATTERN);
				if (月序 && (月序[2] in search_index
				//
				|| (月序[2] in String_to_Date.parser
				//
				&& 月序[2] in Date_to_String_parser))) {
					var date_name = parse_calendar_date_name(月序[1]),
					//
					曆法 = 月序[2];
					library_namespace.debug(this + ': 參照國家或紀年 [' + 曆法
							+ '] 之曆數。', 2);

					// 基本上僅允許年分不同。
					// 其他月名，日數皆得與起訖時間所設定的相同。
					if (date_name[0] && !isNaN(date_name[0])
							&& (date_name[0] |= 0) !== START_YEAR)
						// 複製本年之 START_KEY。
						calendar_data[START_KEY] = date_name[0];

					if (曆法 in search_index) {
						// ---------------------------------------

						this.參照紀年 = 曆法;

						var tmp, left_days,
						// readonly 所有候選紀年。
						// assert: 不會寫入候選紀年。
						era_Array = [],
						// 當前之 era_Array index。
						era_index,

						// 當前參照之紀年。
						era,
						// 當前之 date 指標。
						date_index,
						// 當前參照紀年之當前年分各月資料。
						era_year_data,

						// 從新的參照紀年開始。
						first_era = true,

						// 跨年+初始化本年曆數。
						// assert: 已事先設定 era，年序。
						initialize_next_year = function() {

							if (月序 === 0 && (!first_era
							// 處理日序非 0 的情況。
							// 紀年交接時日序非 0 的情況，
							// 應該都在 initialize_next_era 中就地解決了。
							|| !(START_DATE_KEY in calendar_data))) {
								// 加速:
								// 逐年複製 era 之暦數，至 this.end 或 era 已無曆數為止。
								// assert: era.year_start.length ===
								// era.calendar.length + 1
								for (tmp = 年序;;) {
									start_time = era.year_start[++tmp];
									// assert: (int)年序:
									// 0~era.calendar.length-1
									if (era.calendar.length <= tmp) {
										// 超過 era
										// 最後一年作不加速複製處理，因為可能有被填補的資料。
										if (era.end.getTime() !== start_time)
											tmp--;
										break;

									} else if (this_end < start_time) {
										// 保持 start_time <= this_end
										tmp--;
										break;
									}
								}

								if (年序 < tmp) {
									// 有可整年複製之暦數。
									Array_push(year_start_time,
									// year_start_time 總是包含與
									// calendar_data
									// 相同筆資料。
									era.year_start.slice(年序, tmp));
									Array_push(calendar_data, era.calendar
											.slice(年序, tmp));
									// 複製這些年分之 NAME_KEY。
									if (NAME_KEY in era.calendar) {
										calendar_data[NAME_KEY].length
										//
										= calendar_data.length;
										Array_push(calendar_data[NAME_KEY],
												era.calendar.slice(年序, tmp));
									}
									// 重設年序。
									年序 = tmp;
								}

								first_era = false;

							} else if (!first_era)
								// 當處於交接之際，月序通常有其含義，為真正應該開始的 index。
								// (年序), (月序)作為 era 之指標。
								// 重設月序。
								月序 = 0;

							start_time = era.year_start[年序];

							// 設定剩下需要取得參照的日數。
							left_days = (this_end - start_time)
									/ ONE_DAY_LENGTH_VALUE;

							// era_year_data: 當前參照紀年之當前年分各月資料。
							if (era_year_data = era.calendar[年序]) {
								if (first_era) {
									tmp = 月序;
									first_era =
									//
									days = calendar_data[START_DATE_KEY]
											- START_DATE || 0;
									// assert: 應該只有首個紀年會到這邊。其他的皆已以月中處理。
									while (tmp-- > 0)
										days += era_year_data[tmp];
									left_days -= days;
									start_time += days * ONE_DAY_LENGTH_VALUE;
								}
								// 至 this.end
								if (left_days === 0) {
									first_era = false;
									return true;
								}

							} else {
								// era 已無曆數。會到這邊，基本上都是經過整年複製的。
								// 但為了判別需要，還是得計算 left_days。
								// 有必要重新處理（跨紀年之類）。

								// 當 (left_days === 0)，
								// 處理 (year_start_time) 時，會用上(年序)。
								年序--;

								// assert: 最後 first_era 應該設成
								// !!first_era===false。
								first_era = false;

								return true;
							}

							// 初始化本年曆數。

							// year_start_time 總是包含與 calendar_data
							// 相同筆資料。
							year_start_time.push(start_time);

							// this_year_data 一造出來就在 calendar_data 中。
							calendar_data.push(this_year_data = []);

							// 複製本年之月 START_KEY, LEAP_MONTH_KEY。
							tmp = era_year_data[START_KEY];
							if (tmp || 月序)
								this_year_data[START_KEY]
								//
								= (tmp || START_MONTH) + 月序;

							tmp = era_year_data[LEAP_MONTH_KEY];
							if (tmp && (tmp -= 月序) >= 0)
								// TODO: check
								// this_year_data[LEAP_MONTH_KEY]
								// 可能已存在。
								this_year_data[LEAP_MONTH_KEY] = tmp;

							if (first_era) {
								// 處理第一個月。
								left_days -=
								//
								tmp = era_year_data[月序++] - first_era;
								this_year_data.push(tmp);
								first_era = false;
							}

							// era_year_data[NAME_KEY]
							// 在逐月複製 era 之月分暦數時，方一併處理。
						},

						// 必須設定好 this_year_data 環境。
						initialize_next_era = function() {

							// next_era 將於此設定為下一參照紀元。
							var next_era;

							for (;;) {

								if (++era_index === era_Array.length)
									return '已遍歷至結尾，無可參照之國家或紀年！';

								// 若需要跳到下個紀元:
								// 先確認下一使用紀元之結束時間於本紀元結束時間之後，
								// 如此方有新的曆數以資使用。
								next_era = era_Array[era_index];
								if (era.end < next_era.start)
									return '中間有未能尋得曆數之時間段！';

								if (era.end < next_era.end && (date_index
								//
								= get_continuous_index(era, next_era)))
									break;
							}

							// 重設 (年序), (月序)作為 era 之指標。
							年序 = date_index[0];
							月序 = date_index[1];

							// 設定指標初始值，將 era 指到 next_era。
							era = next_era;

							// 更替時間點: 年/月/日
							if ((tmp = date_index[3]) === '年')
								// assert: 年序===月序===date_index[2]===0
								return;

							era_year_data = era.calendar[年序];

							// 續用 this_year_data。
							if (tmp === '日')
								// 有重疊的部分，以後一使用紀元為準。
								this_year_data[this_year_data.length - 1]
								// 由後一使用紀元得出本月實際應有天數。
								= (月序 === 0 && era_year_data[START_KEY]
										- START_DATE || 0)
										+ era_year_data[月序++]

										// 若本月已有 START_KEY 則除之。
										- (this_year_data.length === 1
										//
										&& this_year_data[START_KEY] || 0);

							// assert: 更替時間點除了'月'外，沒其他的了。

							// 複製本年之月 LEAP_MONTH_KEY。
							if (LEAP_MONTH_KEY in era_year_data) {
								if (LEAP_MONTH_KEY in this_year_data)
									library_namespace.is_warn(
									//
									'initialize_era_date: 本年有兩個閏月設定！');
								this_year_data[LEAP_MONTH_KEY]
								//
								= era_year_data[LEAP_MONTH_KEY];
							}
						};

						// 初始化:取得所有候選紀年列表。
						for_each_era_of_key(曆法, function(era) {
							if (// era !== this &&
							// 篩選不合宜的紀年。
							(era.year_start || !參照_PATTERN.test(era.calendar)))
								era_Array.push(era);
						}
						// .bind(this)
						);
						era_Array.sort(compare_start_date);
						if (start_time < era_Array[0].start) {
							library_namespace.err('initialize_era_date: 起始日期 ['
									+ start_time.format(DATE_NAME_FORMAT)
									+ '] 在所有參照紀年之前！');
							return;
						}

						era_index = era_Array.search_sorted({
							start : this.start
						}, {
							comparator : compare_start_date,
							found : true
						});

						// 盡量取到結尾最末的紀年，預防闕漏。
						for (era = era_Array[tmp = era_index]; tmp-- > 0;)
							if (era.end < era_Array[tmp].end)
								era = era_Array[era_index = tmp];

						// 初始化本紀元曆數 (this.calendar)。
						calendar_data[NAME_KEY] = [];
						// year_start_time 總是包含與 calendar_data 相同筆資料。
						year_start_time = [];

						library_namespace.debug(曆法 + ': 共有 ' + era_Array.length
								+ ' 個紀年。首先採用 [' + era + ']。', 2);
						// [ 歲序, 月序, 日序 | 0 ]
						date_index = era.Date_to_date_index(start_time);
						// (年序), (月序)作為 era 之指標。
						年序 = date_index[0];
						月序 = date_index[1];
						// [ 日名, 月名, 歲名 ]
						if ((tmp = era.日名(date_index[2], 月序, 年序))
						//
						&& (tmp = tmp[0]) != START_DATE)
							// 複製首年之 START_DATE_KEY。
							calendar_data[START_DATE_KEY] = tmp;

						// 其他該 copy 的全 copy 過來。
						library_namespace.extend('歲首序|閏月名'.split('|'), this,
								era);

						// main copy loop
						// assert: 自此 start_time 無 global 作用。
						for (;;) {

							// 需要跨年。
							if (initialize_next_year()) {
								if (left_days <= 0)
									break;
								// assert: era.calendar.length>0
								if (tmp = initialize_next_era()) {
									// 出問題。
									library_namespace.err(
									//
									'initialize_era_date: [' + this + '] '
											+ tmp);
									return;
								}
								// 需要跳到下個紀元。
								continue;
							}

							// 逐月複製 era 之月分暦數，至 this.end 或 era 已無曆數為止。
							// assert: 在 era 已無曆數的情況，必定於本月中。
							// assert: 已設定(月序)。
							for (tmp = 月序, days = 0;
							//
							tmp < era_year_data.length
							// tmp 可能指向使 left_days 剛好 <0 之下一個月。
							&& (days += era_year_data[tmp++]) < left_days;)
								;

							Array_push(this_year_data, era_year_data.slice(月序,
									tmp));

							// 複製本年之月 NAME_KEY。
							if (NAME_KEY in era_year_data) {
								if (NAME_KEY in this_year_data)
									this_year_data[NAME_KEY].length
									//
									= this_year_data.length;
								else
									this_year_data[NAME_KEY] = new Array(
											this_year_data.length);
								Array_push(this_year_data[NAME_KEY],
								//
								era_year_data[NAME_KEY].slice(月序, tmp));
							}

							if (days >= left_days)
								// 可能剛好在月序已達 era_year_data 末時，
								// 使 days >= left_days。
								break;

							年序++;
							月序 = 0;
							left_days -= days;
						}

						// year_start_time 總是包含與 calendar_data 相同筆資料。
						// TODO: 若無 era
						year_start_time.push(era.year_start[年序 + 1]);

						if (calendar_data[NAME_KEY].length === 0)
							delete calendar_data[NAME_KEY];

						// 不再作一般性的解析。
						紀年曆數 = null;

					} else {
						// ---------------------------------------

						this.參照曆法 = 曆法;
						if (曆法 === 'CE')
							this.大月 = CE_MONTH_DAYS;

						// 因為了 parser 作設計可能大幅度改變各
						// method，方出此下策，沿用原先的資料結構。
						var time = start_time.getTime(),
						//
						next_time, 日數,
						//
						_to_String
						//
						= Date_to_String_parser[曆法],
						//
						to_String = function(time) {
							return _to_String(time, '%Y/%m/%d').split('/');
						},
						//
						ordinal = to_String(start_time);

						// 檢測
						if (isNaN(ordinal[0] |= 0) || date_name[1]
								&& date_name[1] !== ordinal[1] || date_name[2]
								&& date_name[2] !== ordinal[2])
							library_namespace.warn('initialize_era_date: 紀年 ['
									+ this + '] 起訖時間所設定的 [' + ordinal.join('/')
									+ ']，與從曆數資料取得的紀年開始時間 ['
									+ date_name.join('/') + '] 不同！');

						this_year_data = [];
						if ((ordinal[1] |= 0) && ordinal[1] !== START_MONTH)
							this_year_data[START_KEY] = ordinal[1];

						// 不可設為 START_DATE。
						if (isNaN(ordinal[2] |= 0)) {
							library_namespace
									.err('initialize_era_date: 無法順利轉換日期 ['
											+ ordinal.join('/') + ']！');
							return;
						}
						if (ordinal[2] !== START_DATE)
							calendar_data[START_DATE_KEY] = ordinal[2];
						// 設為 START_DATE，為接下來每個月初的遍歷作準備。
						ordinal[2] = START_DATE;
						曆法 = String_to_Date.parser[曆法];
						while (time < this_end) {
							ordinal[1]++;
							next_time = 曆法(ordinal.join('/'));
							日數 = (next_time - time) / ONE_DAY_LENGTH_VALUE;
							if (!(日數 > 0) && 日數 !== (日數 | 0)) {
								library_namespace
										.err('initialize_era_date: 無法順利轉換日期 ['
												+ ordinal.join('/') + ']！');
								return;
							}
							this_year_data.push(日數);
							time = ordinal;
							ordinal = to_String(next_time);
							if (time.join('/') !== ordinal.join('/')) {
								// 預期應該是隔年一月。
								time[0]++;
								time[1] = START_DATE;
								if (time.join('/') !== ordinal.join('/')) {
									library_namespace.err(
									//
									'initialize_era_date: 無法順利轉換日期！['
											+ time.join('/') + ']→['
											+ ordinal.join('/') + ']');
									return;
								}
								year_start_time.push(next_time.getTime());
								calendar_data.push(this_year_data);
								this_year_data = [];
							}
							time = next_time.getTime();
						}
						if (this_year_data.length > 0) {
							// 注意:這最後一個月可能超過 this.end!
							year_start_time.push(next_time.getTime());
							calendar_data.push(this_year_data);
						}

						// 不再作一般性的解析。
						紀年曆數 = null;
					}

				} else
					// 解壓縮日數 data。
					紀年曆數 = extract_calendar_data(紀年曆數, this);

				// ---------------------------------------

				if (紀年曆數)
					紀年曆數 = 紀年曆數.split(pack_era.year_separator);

				if (紀年曆數) {
					// 一般性的解析。
					var 閏月名 = this.閏月名;
					紀年曆數.forEach(function(year_data) {
						var month_data = year_data
								.split(pack_era.month_separator);

						// 初始設定。
						days = 0;
						年序 = START_YEAR;
						月序 = START_MONTH;
						calendar_data.push(this_year_data = []);

						month_data.forEach(function(date_data) {
							// 當月之日數|日數 data
							// =當月之日數|日數 data
							// 年名/月名/起始日碼=當月之日數|日數 data
							// /月名/起始日碼=當月之日數|日數 data
							// 年名/月名=當月之日數|日數 data
							// 月名=當月之日數|日數 data

							var date_name = date_data
									.match(/^(?:(.*?)=)?([^;\t=]+)$/);

							if (!library_namespace
									.is_digits(date_data = date_name[2].trim())
									|| (date_data |= 0) <= 0) {
								library_namespace
										.err('initialize_era_date: 無法辨識日數資料 ['
												+ calendar_data + '] 中的 ['
												+ date_data + ']！');
								return;
							}

							// 處理日期名稱。
							if (date_name
							//
							= parse_calendar_date_name(date_name[1])) {
								var tmp, 年名 = date_name[0],
								//
								月名 = date_name[1],
								//
								起始日碼 = date_name[2];

								// 設定年分名稱
								if (年名 && 年名 != 年序) {
									if (/^-?\d+$/.test(年名))
										// 還預防有小數。
										年名 = Math.floor(年名);
									if (typeof 年名 === 'number'
											&& !(NAME_KEY in calendar_data)
											&& !(START_KEY in calendar_data))
										calendar_data[START_KEY] = 年序 = 年名;

									else {
										if (!(NAME_KEY in calendar_data)) {
											calendar_data[NAME_KEY] = [];
											// TODO:
											// 填補原先應有的名稱。

										} else {
											if (calendar_data[NAME_KEY]
											//
											[calendar_data.length])
												library_namespace.warn(
												//
												'initialize_era_date: '
														+ '重複設定年分名稱！');
											if (this_year_data.length > 0)
												library_namespace.warn(
												//
												'initialize_era_date: '
														+ '在年中，而非年初設定年分名稱！');
										}

										calendar_data[NAME_KEY]
										//
										[calendar_data.length] = 年名;
									}

								}

								// 設定起始之月中日數
								if (起始日碼 && 起始日碼 != START_DATE)
									if (!(START_DATE_KEY in calendar_data)
											&& library_namespace
													.is_digits(起始日碼))
										calendar_data[START_DATE_KEY] = +起始日碼;
									else
										library_namespace.warn(
										//
										'initialize_era_date: 設定非數字的月中起始日 ['
												+ 起始日碼 + ']；或是在中途設定日期，'
												+ '而非在曆數資料一開始即設定月中日期！將忽略之。');

								// 設定月分名稱。
								// TODO:
								if (月名 && 月名 != 月序) {
									if (library_namespace.is_digits(月名))
										月名 |= 0;
									if (typeof 月名 === 'number') {
										if (!(NAME_KEY in this_year_data)
										//
										&& !(START_KEY in this_year_data))
											this_year_data[START_KEY]
											// 若 月序
											// ==
											// 月名，則不會到這。
											= 月序 = 月名;
										else {
											if (!(NAME_KEY in this_year_data))
												this_year_data[NAME_KEY] = [];
											this_year_data[NAME_KEY]
											// e.g.,
											// 唐武后久視1年
											[this_year_data.length] = 月名;
										}

									} else if (月名 === LEAP_MONTH_PREFIX
											|| 閏月名
											&& 月名 === 閏月名
											|| (tmp = 月名
													.match(MONTH_NAME_PATTERN))
											&& tmp[1]
											&& (!tmp[2]
													|| (tmp[2] |= 0) + 1 == 月序
											// 閏月起始。
											|| !(NAME_KEY in this_year_data)
											//
											&& !(START_KEY in this_year_data)))
										if (LEAP_MONTH_KEY in this_year_data)
											library_namespace.warn(
											//
											'initialize_era_date: '
													+ '本年有超過1個閏月！將忽略之。');
										else {
											this_year_data[LEAP_MONTH_KEY]
											// 閏月
											// index:
											// 閏月將排在
											// [this_year_data.length]。
											= this_year_data.length;
											if (START_KEY in this_year_data)
												// 因為閏月，減1個月序。
												月序--;
											else
												this_year_data[START_KEY]
												// 閏月起始之處理。
												= 月序 = tmp && tmp[2]
												// 將
												// START_KEY
												// 設成下一月序，以便轉換月名時容易處理。
												// 因為所有閏月之後，包括閏月本身，都會減一。
												? 1 + tmp[2]
												//
												: 2 + MONTH_COUNT
														- month_data.length;
										}
									else {
										if (!(NAME_KEY in this_year_data)) {
											this_year_data[NAME_KEY] = [];
											// TODO:
											// 填補原先應有的名稱。

										} else {
											if (this_year_data[NAME_KEY]
											//
											[this_year_data.length])
												library_namespace.warn(
												//
												'initialize_era_date: '
														+ '重複設定月分名稱！');
										}

										this_year_data[NAME_KEY]
										//
										[this_year_data.length] = 月名;
									}
								}

							}
							// 日期名稱處理完畢。

							// 當月之日數
							this_year_data.push(date_data);
							days += date_data;

							月序++;
							// build year_start_time.

							// 注意:需要依照 MONTH_DAYS 更改公式!
						});

						// 後設定。
						start_time.setDate(start_time.getDate() + days);
						year_start_time.push(start_time.getTime());
						days = 0;
						年序++;
					});
				}

				// ---------------------------------------

				if (Array.isArray(月序 = this[MONTH_NAME_KEY]))
					calendar_data.forEach(function(this_year_data) {
						add_month_name(月序, this_year_data);
					});

				// ---------------------------------------
				// 能跑到這邊才算是成功解析，能設定暦數。
				this.year_start = year_start_time;
				this.calendar = calendar_data;

				// ---------------------------------------
				// 出廠前檢測。
				year_start_time = year_start_time[year_start_time.length - 1];
				if (year_start_time === this_end)
					;
				else if (紀年曆數 && this_end < year_start_time) {
					// 可能是為了壓縮而被填補滿了。
					days = new Date(this_end);
					// assert: 取前一天則必須為紀年起始後（紀年範圍內），與最後一日期間內；
					// 必能被 parse，且可取得 index。
					days.setDate(days.getDate() - 1);
					// [ 歲序, 月序, 日序 | 0 ]
					days = this.Date_to_date_index(days);

					if (days[0] + 1 > this.calendar.length) {
						// truncate 年。
						this.calendar.length = days[0] + 1;

					} else if (days[0] + 1 < this.calendar.length)
						library_namespace.debug('由紀年 [' + this
								+ '] 曆數資料取得的紀年結束時間，較其起訖時間所設定的 ['
								+ this.end.format(DATE_NAME_FORMAT) + '] 長了 '
								+ (this.calendar.length - (days[0] + 1))
								+ ' 年。可手動刪除之。');

					// truncate 月。
					if (days[1] + 1 > this.calendar[days[0]].length)
						this.calendar[days[0]].length = days[1] + 1;

					// truncate 日: skip。此數據可能保留了當月實際的日數。
					// this.calendar[days[0]][days[1]] = days[2] + 1;

					// TODO: 設定最後之 year_start_time
					// 為真實之下一年開頭，可能需要查詢下一紀年之曆數。
					// 注意:這表示，最後一個 era.year_start 可能與 .calendar
					// 有接近一整年之距離!

				} else {
					days = {
						parser : standard_time_parser,
						format : DATE_NAME_FORMAT
					};
					if (year_start_time < this_end
					//
					|| library_namespace.is_debug())
						library_namespace.warn('initialize_era_date: 紀年 ['
								+ this + '] 起訖時間所設定的 [' + this.end.format(days)
								+ ']，與從曆數資料取得的紀年結束時間 ['
								+ (new Date(year_start_time)).format(days)
								+ '] 不同！');
					if (false)
						this.year_start.forEach(function(date, index) {
							console.log(index + ':'
									+ new Date(date).format(days));
						});
				}
			}

			// 保證結果 >=0。
			function positive_modulo(dividend, divisor) {
				if ((dividend %= divisor) < 0)
					dividend += divisor;
				return dividend;
			}

			// get （起始）年干支序。
			// 設定"所求干支序"，將回傳所求干支序之年序。
			// 未設定"所求干支序"，將回傳紀年首年之年干支index。
			function get_year_stem_branch_index(所求干支序) {
				var 曆數 = this.calendar, 年干支 = this.起始年干支序, 起始月分, offset;

				if (isNaN(年干支)) {
					// 盡量取得正月，不需要調整的月分。
					if ((起始月分 = 曆數[0][START_KEY])
					// assert: 即使是只有一個月的短命政權，也得要把日數資料填到年底！
					&& (offset = this.year_start[1]))
						年干支 = new Date(offset);
					else {
						年干支 = new Date(this.start.getTime());
						if (起始月分)
							年干支.setMonth(年干支.getMonth() + START_MONTH - 起始月分);
					}
					年干支 = (年干支.getFullYear()
							- library_namespace.YEAR_STEM_BRANCH_OFFSET
							// 中曆年起始於CE年末，則應算作下一年之
							// YEAR_STEM_BRANCH_OFFSET。
							+ (年干支.getMonth() > 9 ? 1 : 0) - (offset ? 1 : 0))
							% library_namespace.SEXAGENARY_CYCLE_LENGTH;
					if (年干支 < 0)
						年干支 += library_namespace.SEXAGENARY_CYCLE_LENGTH;
					this.起始年干支序 = 年干支;
				}

				if (!isNaN(所求干支序) && (年干支 = 所求干支序 - 年干支) < 0)
					年干支 += library_namespace.SEXAGENARY_CYCLE_LENGTH;

				return 年干支;
			}

			// get （起始）月干支序。

			// 設定"月干支"，將回傳所求月干支之 [ 月序, 歲序 ]。
			// 未設定"月干支"，將回傳紀年首年首月(index: 0, 0)之月干支index。

			// 此非紀年首年歲首之月干支序，而是紀年首年首月之月干支序。
			// 只有在未設定首年起始月數(this.calendar[0][START_KEY])的情況下，兩者才會相等。
			function get_month_branch_index(月干支, 歲序) {
				var 曆數 = this.calendar, 起始月干支 = this.起始月干支序, 月序;

				// 確定建正：以建(何支)之月為正月(一月)。除顓頊曆，通常即正朔。
				// 以冬至建子之月為曆初。
				// 「三正」一說是夏正（建寅的農曆月份，就是現行農曆的正月）殷正（建丑，即現行農曆的十二月）、周正（建子，即現行農曆的十一月）；
				// 建正與歲首一般是統一的。秦始皇統一中國後，改以建亥之月（即夏曆的十月）為歲首（分年/歲之月；當年第一個月），但夏正比較適合農事季節，所以並不稱十月為正月（秦朝管正月叫「端月」），不改正月為四月，

				if (isNaN(起始月干支)) {
					// 月序 = START_DATE_KEY in 曆數 ? 1 : 0 ;

					// 找到第一個非閏月。
					// 一般說來，閏月不應該符合中氣，因此照理不需要這段篩選。
					if (false)
						while (isNaN(this.月名(月序[0], 月序[1])))
							if (!this.shift_month(1, 月序)) {
								library_namespace.err(
								//
								'get_month_branch_index: 無法取得月次（數字化月分名稱）！');
								return;
							}

					// 判別此月份所包含之中氣日。
					// 包冬至 12/21-23 的為建子之月。
					// 冬至所在月份為冬月、大寒所在月份為臘月、雨水所在月份為正月、春分所在月份為二月、…、小雪所在月份為十月，無中氣的月份為前一個月的閏月。
					var ST本月中氣起始日, 下個月起始日差距, ST月序, 中氣差距日數, 閏月後,
					//
					ST本月起始日 = isNaN(this.歲首序) ? START_DATE_KEY in 曆數 ? 1 : 0
							: -1;
					for (月序 = [ 0, 0 ];;)
						if (this.shift_month(ST本月起始日, 月序)) {
							// 標準時間(如UTC+8) 本月月初起始日
							ST本月起始日 = this.date_index_to_Date(月序[1], 月序[0]);
							// 標準時間(如UTC+8) 本月中氣起始日
							ST本月中氣起始日 = 中氣日[ST月序 = ST本月起始日.getMonth()];
							// 中氣起始日與本月月初起始日之差距日數日數
							中氣差距日數 = ST本月中氣起始日 - ST本月起始日.getDate();
							// 下個月月初起始日，與本月月初起始日之差距日數。
							// 即本月之日數。
							下個月起始日差距 = 曆數[月序[1]][月序[0]];

							if (中氣差距日數 < 0) {
								if (false && 月序[2] === 0
										&& 0 < 中氣差距日數 + 中氣日_days + 2) {
									// TODO: 紀年首月之前一個月絕對包含(ST月序)中氣。
									break;
								}

								// 日期(of 標準時間月)於中氣前，改成下個月的中氣日。
								if (++ST月序 >= 中氣日.length)
									ST月序 = 0;
								ST本月中氣起始日 = 中氣日[ST月序];
								// 重新計算中氣差距日數。
								中氣差距日數 = ST本月中氣起始日 - ST本月起始日.getDate();

								// 加上本標準時間月日數，
								// e.g., 3月為31日。
								// 使(中氣差距日數)成為下個月的中氣日差距。
								// .setDate(0) 可獲得上個月的月底日。
								ST本月起始日.setMonth(ST月序, 0);
								中氣差距日數 += ST本月起始日.getDate();
							}

							// 只要本月包含所有中氣可能發生的時段，就當作為此月。
							if (中氣差距日數 + 中氣日_days < 下個月起始日差距) {
								// 標準時間月序(ST月序) No 0:
								// 包含公元當年1月之中氣(大寒)，為臘月，
								// 月建丑，月建序 1(子月:0)。餘以此類推。

								// 歲序(月序[1])月序(月序[0])，
								// 距離紀年初(月序[2])個月，
								// 包含公元當年(ST月序 + 1)月之中氣，
								// 其月建序為(ST月序 + 1)。

								// 判定建正。

								// 寅正:
								// 中曆月: B C 1 2 3 4 5 6 7 8 9 A
								// 中月序: A B 0 1 2 3 4 5 6 7 8 9

								// 中氣序: B 0 1 2 3 4 5 6 7 8 9 A

								// ..月建: 子丑寅卯辰巳午未申酉戌亥
								// 月建序: 0 1 2 3 4 5 6 7 8 9 A B

								// 閏月或之後。
								閏月後 = 月序[0] >= 曆數[月序[1]][LEAP_MONTH_KEY];
								if (library_namespace.is_debug()) {
									library_namespace.debug('閏月或之後: ' + 閏月後, 1,
											'get_month_branch_index');

									// 中曆月序=(曆數[月序[1]].start-START_MONTH)+月序[0]-(閏月或之後?1:0)
									library_namespace.debug('中曆月序 = '
											+ ((START_KEY in 曆數[月序[1]]
											//
											? 曆數[月序[1]][START_KEY]
													- START_MONTH : 0)
													+ 月序[0] - (閏月後 ? 1 : 0)),
											1, 'get_month_branch_index');

									// 歲首包含中氣序=ST月序-月序
									library_namespace.debug('歲首包含中氣序 = '
											+ (ST月序 - ((START_KEY in 曆數[月序[1]]
											//
											? 曆數[月序[1]][START_KEY]
													- START_MONTH : 0)
													+ 月序[0] - (閏月後 ? 1 : 0))),
											1, 'get_month_branch_index');

									// 歲首月建序=(歲首中氣序+1)%MONTH_COUNT
									library_namespace.debug('歲首月建序 = '
											+ (1 + ST月序
											//
											- ((START_KEY in 曆數[月序[1]]
											//
											? 曆數[月序[1]][START_KEY]
													- START_MONTH : 0)
													+ 月序[0] - (閏月後 ? 1 : 0))),
											1, 'get_month_branch_index');
								}

								this.歲首月建序 = ST月序 - 月序[0]
								// 歲首月建序=(ST月序+(is
								// leap?2:1)-月序[0]-(曆數[月序[1]][START_KEY]-START_MONTH))%MONTH_COUNT
								- (START_KEY in 曆數[月序[1]]
								//
								? 曆數[月序[1]][START_KEY] - START_MONTH : 0)
								// 過閏月要再減一。
								+ (閏月後 ? 2 : 1);

								// 將(ST月序)轉為紀年首月之月建序差距。
								// 1: 月建序 - 中氣序
								ST月序 += (閏月後 ? 2 : 1) - (月序[2] || 0);
								break;
							}

							// 跳過無法判斷之月分，移往下個月。
							ST本月起始日 = 1;

						} else {
							// 無法判別的，秦至漢初歲首月建序預設 11。
							// 子正:歲首月建序=0
							// 設定 this.歲首序:已手動設定歲首。
							this.歲首月建序 = (this.歲首序 || 0) + 2;

							// 其他預設甲子年正月(月序0):
							// 丙寅月，月建序(index)=2+月序。
							ST月序 = this.歲首月建序 + (曆數[0] && START_KEY in 曆數[0]
							//
							? 曆數[0][START_KEY] - START_MONTH : 0);
							break;
						}

					閏月後 = library_namespace.BRANCH_LIST.length;
					// positive_modulo
					if ((this.歲首月建序 %= 閏月後) < 0)
						this.歲首月建序 += 閏月後;

					閏月後 = library_namespace.SEXAGENARY_CYCLE_LENGTH;
					// 取得月干支。
					// 月干支每5年一循環。
					// (ST月序):紀年首月之月建序差距。
					起始月干支 = ((this.get_year_stem_branch_index() + 月序[1])
							* MONTH_COUNT + ST月序)
							% 閏月後;
					// positive_modulo
					if (起始月干支 < 0)
						起始月干支 += 閏月後;
					this.起始月干支序 = 起始月干支;
				}

				if (月干支 && isNaN(月干支))
					月干支 = library_namespace.stem_branch_index(月干支);
				if (isNaN(月干支))
					// 回傳紀年首年首月之月干支index。
					return 起始月干支;

				// 找出最接近的月干支所在。
				// 回傳所求干支序之 [ 月序, 歲序 ]。
				// 就算有閏月，每年也不過移動 MONTH_COUNT。
				if (歲序 |= 0) {
					// 算出本歲序首月之月干支。
					// 有閏月的話，月干支會少位移一個月。
					起始月干支 = (起始月干支 + 曆數[0].length
							- (曆數[0][LEAP_MONTH_KEY] ? 1 : 0) + MONTH_COUNT
							* (歲序 - 1))
							% library_namespace.SEXAGENARY_CYCLE_LENGTH;
				}
				// now: 起始月干支 = 歲序(歲序)月序(0)之月干支

				// 取得差距月數，須取得歲序(歲序)月序(0)往後(月干支)個月。
				if ((月序 = 月干支 - 起始月干支) < 0)
					// 確保所求差距月數於起始月干支後。
					月序 += library_namespace.SEXAGENARY_CYCLE_LENGTH;
				if (月序 >= MONTH_COUNT) {

					library_namespace.err('get_month_branch_index: '
					//
					+ this.歲名(歲序) + '年並無此月干支 [' + 月干支 + ']！');

					// 判斷前後差距何者較大。
					if (月序 - 曆數[歲序].length
					// 若是向後月數過大，才採用向前的月分。否則普通情況採用向後的月分。
					> library_namespace.SEXAGENARY_CYCLE_LENGTH - 月序) {
						// 採用向前的月分。
						月序 = library_namespace.SEXAGENARY_CYCLE_LENGTH - 月序;
						// 警告，須檢查(歲序<0)的情況。
						歲序 -= 月序 / MONTH_COUNT | 0;
						月序 %= MONTH_COUNT;
						月序 = 曆數[歲序].length - 月序;
						if (月序 >= 曆數[歲序][LEAP_MONTH_KEY])
							月序--;
					} else {
						// 普通情況採用向後的月分。
						// 警告，須檢查(歲序>=曆數.length)的情況。
						歲序 += 月序 / MONTH_COUNT | 0;
						月序 %= MONTH_COUNT;
					}

				}
				// 採用 '>=' 會取非閏月。
				if (月序 >= 曆數[歲序][LEAP_MONTH_KEY])
					月序--;
				return [ 月序, 歲序 ];
			}

			// date name of era → Date
			// 年, 月, 日 次/序(ordinal/serial)
			// (start from START_YEAR, START_MONTH, START_DATE)
			// or 年, 月, 日 名(name)
			// or 年, 月, 日 干支
			function date_name_to_Date(年, 月, 日) {
				if (!this.year_start)
					this.initialize();

				var 干支, year_index = this.歲序(年), month_index;

				if (isNaN(year_index)
				//
				&& !isNaN(干支 = library_namespace.stem_branch_index(年)))
					// 處理年干支。
					year_index = this.get_year_stem_branch_index(干支);

				// 是否為月建。
				if (月)
					if (月.length === 1 && NOT_FOUND !== (干支
					//
					= library_namespace.BRANCH_LIST.indexOf(月))) {
						if (isNaN(this.歲首月建序))
							this.get_month_branch_index();
						month_index = 干支 - this.歲首月建序;
						if (month_index < 0)
							month_index
							//
							+= library_namespace.BRANCH_LIST.length;

					} else if (isNaN(month_index = this.月序(月, year_index || 0))
					//
					&& !isNaN(干支 = library_namespace.stem_branch_index(月))) {
						// 處理月干支。
						// 回傳所求月干支之 [ 月序, 歲序 ]。
						month_index = this.get_month_branch_index(干支,
								year_index || 0);
						// 檢查此年之此月是否為此干支。
						if (year_index !== month_index[1]) {
							if (!isNaN(year_index))
								library_namespace.err('date_name_to_Date: '
										+ this.歲名(year_index) + '年並無此月干支 [' + 月
										+ ']！');
							// 直接設定歲序。
							year_index = month_index[1];
						}
						month_index = month_index[0];
					}

				if (isNaN(year_index)) {
					// assert: !年 === true
					// 可能只是 to_era_Date() 在作測試，看是否能成功解析。
					if (library_namespace.is_debug())
						library_namespace.warn('date_name_to_Date: 未設定或無法辨識年分['
								+ 年 + ']。');
					return new Date(this.start.getTime());
				}

				if (isNaN(month_index)) {
					// 可能只是 to_era_Date() 在作測試，看是否能成功解析。
					if (library_namespace.is_debug())
						library_namespace.warn('date_name_to_Date: 未設定或無法辨識月分['
								+ 月 + ']。');
					return year_index < this.calendar.length
							&& new Date(this.year_start[year_index]);
				}

				switch (日) {
				case '朔':
					// 警告:藏曆規定每月十五為望，所以初一可能並不是朔。伊斯蘭曆將新月初現定為每月的第一天，朔則在月末前三四天。
					日 = 1;
					break;
				case '望':
					// 警告:望可能在每月的十五或十六日。
					日 = 15;
					break;
				case '晦':
					日 = this.calendar[year_index][month_index];
					break;
				default:
					break;
				}

				// 取得基準 Date。
				year_index = this.date_index_to_Date(year_index, month_index,
				//
				日 && this.日序(日, year_index === 0 && month_index === 0) || 0);
				// 處理日干支。
				if (isNaN(日)
						&& !isNaN(干支 = library_namespace.stem_branch_index(日)))
					year_index = library_namespace.convert_stem_branch_date(干支,
							year_index);

				return year_index;
			}

			// Date → date index of era
			function Date_to_date_index(date, accept_end) {
				if (!this.year_start)
					this.initialize();

				var 歲序 = this.year_start.search_sorted(date, {
					found : true
				}),
				//
				month_data = this.calendar[歲序], 月序 = 0, days,
				//
				日序 = Math.floor((date - this.year_start[歲序])
						/ ONE_DAY_LENGTH_VALUE);

				if (!month_data) {
					if (accept_end && 日序 === 0)
						// 剛好在邊界上，越過年。
						// assert: date-this.end=0~ONE_DAY_LENGTH_VALUE
						return [ 歲序 - 1, 0, 0 ];

					// 可能只是 to_era_Date() 在作測試，看是否能成功解析。
					if (library_namespace.is_debug())
						library_namespace
								.err('Date_to_date_index: 日期[' + date.format()
										+ '] 並不在紀年 [' + this + '] 時段內！');
					return;
				}

				while ((days = month_data[月序]) <= 日序)
					日序 -= days, 月序++;

				return [ 歲序, 月序, 日序 | 0 ];
			}

			// 增添標記，加上曆注(暦注)之類。
			function add_comment(date, options) {
				var date_index, tmp, tmp2;
				// 根據/出典/原始參考文獻/資料引用來源。
				if (this.據)
					date.據 = this.據;
				date.注 = Array.isArray(tmp = this.注) ? tmp
				//
				: tmp ? [ tmp ] : [];

				// 查詢某時間點（時刻）的日期資訊，如月干支等：
				// 對所有紀年，找出此時間點相應之曆數：
				// 若年分起始未初始化，則初始化、解壓縮之。
				// 依年分起始 Date value，以 binary search 找到年分。
				// 依該年之月分資料，找出此時間點相應之月分、日碼(date of month)。
				date.name = this.name;
				date.紀年名 = this.toString();
				for (tmp in 紀年名稱索引值)
					if (tmp2 = this.name[紀年名稱索引值[tmp]])
						date[tmp] = tmp2;

				if (this.曆法)
					date.曆法 = this.曆法;

				// [ 歲序, 月序, 日序 | 0 ]
				date_index = this.Date_to_date_index(date);
				if (!date_index) {
					library_namespace.err('add_comment: 加注日期於紀年範圍外！');
				} else {
					tmp = this.get_year_stem_branch_index() + date_index[0];

					date.生肖 = 十二生肖_LIST.charAt(tmp % 十二生肖_LIST.length);
					date.五行 = (tmp % 2 ? '陰' : '陽')
							+ 陰陽五行_LIST.charAt((tmp >> 1) % 陰陽五行_LIST.length);
					date.歲次 = library_namespace.to_stem_branch(tmp);

					// date.七曜 =
					date.曜日 = 曜日_LIST.charAt(date.getDay());

					if (this.準確)
						date.準確 = this.準確;
					if (this.準確 === '年') {
						date.年 = this.歲名(date_index[0]);

					} else {
						// .日名() = [ 日名, 月名, 歲名 ]
						tmp = this.日名(date_index[2], date_index[1],
								date_index[0]).reverse();
						if (date.閏月 = typeof (tmp2 = tmp[1]) === 'string'
						//
						&& tmp2.charAt(0) === LEAP_MONTH_PREFIX)
							tmp2 = tmp2.slice(1);
						if (0 < tmp2 && tmp2 <= MONTH_COUNT)
							date.季 = 季_LIST.indexOf((tmp2 - 1) / 4 | 0);

						if (options.numeral)
							tmp = numeralize_date_format(tmp, options.numeral);
						date.年 = tmp[0];
						date.月 = tmp[1];
						date.日 = tmp[2];

						// 日本の暦注
						if (0 < +tmp[1]) {
							date.日本月名 = 日本月名_LIST[
							// 新暦に適用すると: date.getMonth()
							tmp[1] - 1];
							date.六曜 = 六曜_LIST[
							//
							(+tmp[1] + tmp[2]) % 六曜_LIST.length];
						}

						tmp = this.calendar[date_index[0]][date_index[1]];
						if (date_index[0] === 0 && date_index[1] === 0
						//
						&& (START_DATE_KEY in this.calendar))
							tmp += this.calendar[START_DATE_KEY] - START_DATE;
						// 大月
						date.大小月 = (tmp2 = this.大月) ? tmp < tmp2 ? '小' : '大'
						//
						: tmp === 大月 ? '大' : tmp === 小月 ? '小' : '(' + tmp
								+ '日)';

						// 一個月的第一個十天為上旬，第二個十天為中旬，餘下的天數為下旬。
						date.旬 = date_index[2] < 10 ? '上'
								: date_index[2] < 20 ? '中' : '下';

						// 取得當年閏月 index。
						tmp = this.calendar[
						//
						tmp2 = date_index[0]][LEAP_MONTH_KEY];
						date.月干支 = library_namespace.to_stem_branch(
						// 基準點。
						this.get_month_branch_index()
						// 就算有閏月，每年也不過移動 MONTH_COUNT。
						+ MONTH_COUNT * tmp2 + date_index[1]
						// 為非一月開始的紀年作修正。
						- (0 < tmp2 && (tmp2 = this.calendar[0][START_KEY])
						//
						? tmp2 - START_MONTH : 0)
						// 閏月或在閏月之後的 index，都得減一。
						- (!tmp || date_index[1] < tmp ? 0 : 1));
						date.月建 = date.月干支.charAt(1);
					}
				}

				if (false)
					date.日干支 = date.format({
						format : '%日干支',
						locale : library_namespace.gettext
								.to_standard('Chinese')
					});

				// 後期修正。
				if (typeof this.fix === 'function')
					this.fix(date);

				// after care.
				if (date.注.length === 0)
					delete date.注;

				return date;
			}

			library_namespace.extend({
				// 月次，歲次與 index 之互換。
				// 注意：此處"序"指的是 Array index，從 0 開始。
				// "次"則從 1 開始，閏月次與本月次相同。
				// 若無特殊設定，則"次"="名"。
				歲序 : year_name_to_index,
				月序 : month_name_to_index,
				日序 : date_name_to_index,
				歲名 : year_index_to_name,
				月名 : month_index_to_name,
				日名 : date_index_to_name,

				shift_month : shift_month,

				initialize : initialize_era_date,
				get_month_branch_index : get_month_branch_index,
				get_year_stem_branch_index : get_year_stem_branch_index,
				date_name_to_Date : date_name_to_Date,
				date_index_to_Date : date_index_to_Date,
				Date_to_date_index : Date_to_date_index,

				add_comment : add_comment
			}, Era.prototype);
			// IE 8 得用這個。
			// 恐怕因原先已經存在?
			Era.prototype.toString = get_name;

			// ---------------------------------------------------------------------//

			// private 工具函數：分割資料檔使用之日期(起訖時間)。
			// [ 起始時間, 訖, parser ]
			function parse_duration(date, era) {
				var tmp;
				if (typeof date === 'string' && (tmp = date.match(
				//
				/^(?:([^:]+):)?([^~～至－:]*)(?:[~～至－](.*)|(\+\d+))\s*$/)))
					date = [ tmp[2], tmp[3] || tmp[4], tmp[1] ];

				if (Array.isArray(date) && date.length > 0) {
					if (!date[2]) {
						// 起始時間
						tmp = date[0];
						// 針對從下一筆紀年調來的資料。
						if (typeof tmp === 'string' && (tmp = tmp
						//
						.match(/^(?:([^:]+):)?([^~～至－:]*)/)))
							date = [ tmp[2], date[1], tmp[1] ];
					}

					if (/^\d+\/\d+$/.test(date[1])
					//
					&& (tmp = date[0].match(/^(\d+\/)\d+\/\d+$/)))
						// 補上與起始時間相同年分。
						date[1] = tmp[1] + date[1];

					return date;
				}

				library_namespace.err('parse_duration: 無法判別 [' + era
						+ '] 之起訖時間！');
				// return date;
			}

			// private 工具函數：正規化日期。
			function normalize_date(date, parser, period_end, get_date) {
				library_namespace.debug('以 parser [' + parser + '] 解析 [' + date
						+ ']。', 2, 'normalize_date');
				if (!date)
					return '';

				if (!is_Date(date)) {
					var string, to_period_end = period_end && function() {
						var tmp, matched = string.match(
						// 警告:並非萬全之法!
						/(-?\d+)(?:[\/.\-年 ](\d+)(?:[\/.\-月 ](\d+))?)?/);

						if (matched) {
							matched.shift();
							while (!(tmp = matched.pop()))
								;
							matched.push(++tmp);
							string = matched.join('/');
							period_end = false;
						}
					};

					if (parser in search_index) {
						var era_Set = search_index[parser];
						if (!(era_Set instanceof Set)
						// 確定 parser 為唯一且原生的 era key。
						|| era_Set.size !== 1) {
							library_namespace.err(
							//
							'normalize_date: 無法確認 parser：共有 ' + era_Set.size
									+ ' 個 [' + parser + ']！');
							return;
						}
						era_Set.forEach(function(era) {
							parser = era;
						});
						string = date;
						period_end && to_period_end();
						date = to_era_Date({
							紀年 : parser,
							日期 : string
						});
						if (period_end)
							// 警告:取後一日:並非萬全之法!
							date.setDate(date.getDate() + 1);

					} else if ((/^-?\d{1,4}$/.test(string = ('' + date).trim())
					//
					|| '' === string.replace(
					// 先確定 .to_Date 有辦法 parse。
					String_to_Date.default_parser.date_first, ''))
							//
							&& typeof date.to_Date === 'function'
							//
							&& (parser = date.to_Date({
								parser : parser === PASS_PARSER ? undefined
										: parser || DEFAULT_DATE_PARSER,
								period_end : period_end
							})))
						date = parser;

					else {
						period_end && to_period_end();
						date = to_era_Date(string, {
							date_only : true
						});
						if (period_end)
							// 警告:取後一日:並非萬全之法!
							date.setDate(date.getDate() + 1);
					}
				}
				// else: 已經處理過了?

				if (is_Date(date))
					if (get_date)
						return date;
					else if (typeof date.format === 'function')
						return date.format(DATE_NAME_FORMAT);

				library_namespace.err('normalize_date: 無法解析 [' + date + ']！');
			}

			/**
			 * 在可適度修改或檢閱紀年資料的範疇內，極小化壓縮紀年的曆數資料。<br />
			 * 會更改到 plain_era_data！
			 * 
			 * @example <code>
			 * CeL.era.pack('/文宗/天曆|1329/8/25~|2/8=30;29;29;30;30\t29;30;30;29');
			 * </code>
			 * 
			 * @param {Array|Object|String}plain_era_data
			 *            紀年資料。
			 * 
			 * @returns {String}壓縮後的紀年資料。
			 */
			function pack_era(plain_era_data) {

				// 單筆/多筆共用函數。

				function pre_parse(era) {
					if (typeof era === 'string')
						era = era.split(pack_era.field_separator);
					if (Array.isArray(era) && era.length === 1
							&& era[0].indexOf(
							//
							pack_era.month_separator) !== NOT_FOUND)
						era.unshift('紀年', '');
					if (Array.isArray(era) && 1 < era.length) {
						// 使 pack_era() 可採用 Era / 壓縮過的日期資料 為 input。
						// TODO: 尚未完善。應直接採用 parse_era 解析。
						era[0] = era[0].split(pack_era.era_name_classifier);
						(era[2] = era[2].split(pack_era.year_separator))
								.forEach(function(date, index) {
									era[2][index] = date
											.split(pack_era.month_separator);
								});
						era = {
							紀年 : era[0],
							起訖 : parse_duration(era[1], era[0])
							// assert: 已經警示過了。
							|| era[1].split(/[~～至－]/),
							曆數 : era[2]
						};
					}
					return era;
				}

				// -----------------------------
				// 處理多筆紀年。

				if (Array.isArray(plain_era_data)) {
					var last_era = [],
					// 上一紀年結束日期。
					last_end_date, era_list = [];

					plain_era_data.forEach(function(era) {
						if (!library_namespace.is_Object(
						//
						era = pre_parse(era))) {
							library_namespace.err('pack_era: 跳過資料結構錯誤的紀年資料！');
							return;
						}

						// 簡併紀年名稱。
						var i = 0, this_era = era.紀年, no_inherit;
						if (!Array.isArray(this_era))
							this_era = [ this_era ];
						for (; i < this_era.length; i++)
							if (!no_inherit && this_era[i] === last_era[i])
								this_era[i] = '';
							else {
								no_inherit = true;
								if (this_era[i] !== parse_era.inherit)
									last_era[i] = this_era[i] || '';
							}
						era.紀年 = this_era;

						// 簡併起訖日期。
						// 起訖 : [ 起, 訖, parser ]
						if (!(this_era = parse_duration(era.起訖, this_era))) {
							library_namespace
									.err('pack_era(Array): 跳過起訖日期錯誤的紀年資料！');
							return;
						}
						// 回存。
						era.起訖 = this_era;

						// 正規化日期。
						// assert: 整個 era Array 都使用相同 parser。

						// 若上一紀年結束日期 == 本紀年開始日期，
						// 則除去上一紀年結束日期。
						if (
						// cache 計算過的值。
						(this_era[0] = normalize_date(this_era[0], this_era[2]
								|| PASS_PARSER))
								&& this_era[0] === last_end_date) {
							library_namespace.debug('接續上一個紀年的日期 ['
									+ last_end_date + ']。除去上一紀年結束日期。', 2);
							last_era.date[1] = '';

							// 這是採除去本紀年開始日期時的方法。
							// this_era[0] = '';

							// 之所以不採除去本紀年的方法，是因為：
							// 史書通常紀載的是紀年開始的日期，而非何時結束。
						} else
							library_namespace.debug('未接續上一個紀年的日期: ['
									+ last_end_date + ']→[' + this_era[0]
									+ ']。', 2);

						if (持續日數_PATTERN.test((last_era.date = this_era)[1])) {
							(last_end_date = normalize_date(this_era[0],
									this_era[2] || PASS_PARSER, true, true))
									.setDate(+this_era[1]);
							last_end_date = normalize_date(last_end_date);
							library_namespace.debug('訖時間 "+d" [' + this_era[1]
									+ '] : 持續日數 [' + last_end_date + ']。', 2);
						} else {
							last_end_date = normalize_date(this_era[1].trim(),
									this_era[2] || PASS_PARSER, true);
							library_namespace.debug('訖時間 "~y/m/d" ['
									+ this_era[1] + '] : 指定 end date ['
									+ last_end_date + ']。', 2);
						}

						era_list.push(era);
					});

					// 因為可能動到前一筆資料，只好在最後才從頭再跑一次。
					library_namespace.debug('開始 pack data。', 2);
					last_era = [];
					era_list.forEach(function(era) {
						last_era.push(pack_era(era));
					});

					library_namespace.debug('共轉換 ' + last_era.length + '/'
							+ era_list.length + '/' + plain_era_data.length
							+ ' 筆紀錄。');

					return last_era;
				}

				// -----------------------------
				// 處理單筆紀年。

				if (!library_namespace.is_Object(
				//
				plain_era_data = pre_parse(plain_era_data))) {
					library_namespace.err('pack_era: 無法判別紀年資料！');
					return plain_era_data;
				}

				// 至此 plain_era_data = {
				// 紀年 : [ 朝代, 君主(帝王), 紀年名稱 ],
				// 起訖 : [ 起, 訖, parser ],
				// 曆數 : [ [1年之月分資料], [2年之月分資料], .. ],
				// 其他附加屬性 : ..
				// }

				var i = 0, j,
				//
				year_data,
				// 當前年度
				year_now = START_YEAR,
				// 當前月分
				month_now,
				// 壓縮用月分資料
				month_data,
				//
				month_name,
				//
				前項已壓縮,
				// {String} 二進位閏月 index
				leap_month_index_base_2, 日數,
				//
				年名, 月名, 起始日碼,
				//
				to_skip = {
					紀年 : 0,
					起訖 : 1,
					曆數 : 2
				}, packed_era_data,
				//
				紀年名稱 = plain_era_data.紀年,
				//
				起訖時間 = parse_duration(plain_era_data.起訖, 紀年名稱),
				// calendar_data
				年度月分資料 = plain_era_data.曆數;

				if (!起訖時間) {
					起訖時間 = [];
					// return;
				}

				if (!Array.isArray(年度月分資料) || !年度月分資料[0]) {
					library_namespace.err('pack_era: 未設定年度月分資料！');
					return;
				}

				if (Array.isArray(紀年名稱))
					紀年名稱 = 紀年名稱.join(pack_era.era_name_classifier)
					//
					.replace(pack_era.era_name_重複起頭,
							pack_era.era_name_classifier)
					//
					.replace(pack_era.era_name_符號結尾, '');
				if (!紀年名稱 || typeof 紀年名稱 !== 'string') {
					library_namespace.err(
					//
					'pack_era: 無法判別紀年名稱: [' + 紀年名稱 + ']');
					return;
				}

				// 簡併月分資料。
				for (; i < 年度月分資料.length; i++, year_now++) {
					year_data = 年度月分資料[i];
					// 每年自一月開始。
					month_now = START_MONTH;
					month_data = [];
					leap_month_index_base_2 = '';
					for (j = 0; j < year_data.length; j++, month_now++) {
						// 允許之日數格式：
						// 日數
						// '起始日碼=日數'
						// [ 起始日碼, 日數 ]
						if (isNaN(日數 = year_data[j])) {
							if (typeof 日數 === 'string')
								日數 = 日數.split('=');

							if (!Array.isArray(日數) || 日數.length !== 2) {
								library_namespace.err(
								//
								'pack_era: 無法辨識日數資料 [' + year_data[j] + ']！');
								month_data = null;

							} else {
								if (起始日碼 = parse_calendar_date_name(
								//
								月名 = String(日數[0])))
									// [ 年名, 月名, 起始日碼 ]
									年名 = 起始日碼[0], 月名 = 起始日碼[1], 起始日碼 = 起始日碼[2];

								else {
									library_namespace.warn(
									//
									'pack_era: 無法辨識紀年 [' + 紀年名稱 + '] '
											+ year_now + '年之年度月分資料 ' + j + '/'
											+ year_data.length + '：起始日碼 [' + 月名
											+ ']，將之逕作為月分名！');
									年名 = 起始日碼 = '';
								}

								// assert: 至此 (年名), (月名), (起始日碼) 皆已設定。

								日數 = 日數[1];

								if (year_now == 年名)
									年名 = '';
								if (month_now == 月名)
									月名 = '';
								if (START_DATE == 起始日碼)
									起始日碼 = '';

								if ((month_name = 月名) || 年名 || 起始日碼) {
									// 可能為: 閏?\d+, illegal.

									if (i === 0 && j === 0 && !起始日碼
											&& (month_name = month_name.match(
											//
											MONTH_NAME_PATTERN))) {
										library_namespace.info(
										//
										'pack_era: 紀年 [' + 紀年名稱 + '] '
										//
										+ (年名 || year_now) + '年：起始的年月分並非 '
												+ year_now + '/' + month_now
												+ '，而為 ' + 年名 + '/' + 月名);

										// 將元年前面不足的填滿。
										// 為了增高壓縮率，對元年即使給了整年的資料，也僅取從指定之日期開始之資料。
										month_data = new Array(
										// reset
										month_now = +month_name[2]
												+ (month_name[1] ? 1 : 0))
												.join('0').split('');
									}

									// 處理簡略表示法: '閏=\d+'
									if (月名 === LEAP_MONTH_PREFIX)
										月名 += month_now - 1;
									// 可壓縮: 必須為閏(month_now - 1)
									if ((month_name = 月名) !== LEAP_MONTH_PREFIX
											+ (month_now - 1)
											|| 年名 || 起始日碼) {
										if ((month_name = 月名)
										//
										!== LEAP_MONTH_PREFIX + (month_now - 1)
												&& (i > 0 || j > 0)) {
											library_namespace.warn(
											//
											'pack_era: 紀年 [' + 紀年名稱 + '] '
											//
											+ year_now + '年：日期非序號或未按照順序。月分資料 '
													+ (j + START_MONTH) + '/'
													+ year_data.length + ' ['
													+ year_now + '/'
													+ month_now + '/'
													+ START_DATE + '] → ['
													+ (年名 || '') + '/'
													+ (月名 || '') + '/'
													+ (起始日碼 || '') + ']');
											month_data = null;
										}

									} else if (leap_month_index_base_2) {
										library_namespace.err(
										//
										'pack_era: 本年有超過1個閏月！');
										month_data = null;

									} else {
										// 處理正常閏月。
										if (month_data) {
											leap_month_index_base_2 =
											// 二進位
											month_data.length
											//
											.toString(RADIX_2);
											// 預防
											// leap_month_index_base_2
											// 過短。
											leap_month_index_base_2
											//
											= LEAP_MONTH_PADDING
											//
											.slice(0, LEAP_MONTH_PADDING.length
											//
											- leap_month_index_base_2.length)
													+ leap_month_index_base_2;
										} else
											leap_month_index_base_2
											//
											= month_now;

										month_now--;
									}

									if (month_name = (年名 ? 年名 + '/' : '')
											+ (月名 || '')
											+ (起始日碼 ? '/' + 起始日碼 : ''))
										month_name += '=';

									if (year_data[j] != (month_name += 日數))
										year_data[j] = month_name;

									if (年名 !== '' && !isNaN(年名)) {
										library_namespace.debug('year: '
												+ year_now + ' → ' + 年名, 2);
										year_now = 年名;
									}

									if (月名 !== ''
											&& !isNaN(月名 = 月名.replace(
													MONTH_NAME_PATTERN, '$2'))
											&& month_now != 月名) {
										library_namespace.debug('month: '
												+ month_now + ' → ' + 月名, 2);
										month_now = 月名;
									}

								} else if (year_data[j] != 日數)
									// 可省略起始日碼的情況。
									year_data[j] = 日數;

							}
						}

						if (month_data)
							if (日數 in MONTH_DAY_INDEX) {
								month_data.push(MONTH_DAY_INDEX[日數]);
							} else {
								library_namespace.warn(
								//
								'pack_era: 錯誤的日數？[' + 日數 + ']日。');
								month_data = null;
							}
					}

					if (month_data) {
						j = MONTH_COUNT + (leap_month_index_base_2 ? 1 : 0);
						if (month_data.length < j) {
							// padding
							Array_push(
							//
							month_data, new Array(j + 1 - month_data.length)
									.join(0).split(''));
						} else if (month_data.length > j) {
							library_namespace.warn('pack_era: 紀年 [' + 紀年名稱
									+ '] ' + year_now + '年：月分資料過長！');
						}

						if (library_namespace.is_debug(2))
							j = '] ← ['
									+ month_data.join('')
									+ (leap_month_index_base_2 ? ' '
											+ leap_month_index_base_2 : '')
									+ '] ← ['
									+ year_data.join(pack_era.month_separator)
									+ ']';
						month_data = parseInt(
						// 為了保持應有的長度，最前面加上 1。
						'1' + month_data.join('') + leap_month_index_base_2,
								RADIX_2)
						//
						.toString(PACK_RADIX);

						if (month_data.length > YEAR_CHUNK_SIZE)
							library_namespace.warn('pack_era: 紀年 [' + 紀年名稱
									+ '] ' + year_now + '年：月分資料過長！');
						else if (month_data.length < YEAR_CHUNK_SIZE
						// 非尾
						&& i < 年度月分資料.length - 1) {
							if (month_data.length < YEAR_CHUNK_SIZE - 1
							// 非首
							&& i > 0)
								// 非首非尾
								library_namespace.warn('pack_era:紀年 [' + 紀年名稱
										+ '] ' + year_now + '年：月分資料過短！');
							// 注意：閏月之 index 是 padding 前之資料。
							month_data += PACKED_YEAR_CHUNK_PADDING.slice(0,
									YEAR_CHUNK_SIZE - month_data.length);
						}
						library_namespace.debug('[' + month_data + j, 2);

						if (i === 0 && /\=./.test(year_data[0]))
							month_data = year_data[0].replace(/[^=]+$/, '')
									+ month_data;
						年度月分資料[i] = month_data;

					} else {
						// 可能只是 to_era_Date() 在作測試，看是否能成功解析。
						if (library_namespace.is_debug())
							library_namespace.warn(
							//
							'pack_era: 無法壓縮紀年 [' + 紀年名稱 + '] ' + year_now
									+ '年資料 ['
									+ year_data.join(pack_era.month_separator)
									+ ']');
						// 年與年以 pack_era.year_separator 分隔。
						// 月與月以 pack_era.month_separator 分隔。
						年度月分資料[i] = (前項已壓縮 ? pack_era.year_separator : '')
								+ year_data.join(pack_era.month_separator)
								+ pack_era.year_separator;
					}

					前項已壓縮 = !!month_data;
				}

				年度月分資料[i - 1] = 前項已壓縮 ? 年度月分資料[i - 1].replace(/\s+$/, '')
						: 年度月分資料[i - 1].slice(0, -1);

				起訖時間[0] = normalize_date(起訖時間[0], 起訖時間[2] || PASS_PARSER);
				if (!持續日數_PATTERN.test(起訖時間[1]))
					// assert: isNaN(起訖時間[1])
					起訖時間[1] = normalize_date(起訖時間[1], 起訖時間[2] || PASS_PARSER);
				// 去掉相同年分。
				// 800/1/1~800/2/1 → 800/1/1~2/1
				if ((i = 起訖時間[0].match(/^[^\/]+\//))
						&& 起訖時間[1].indexOf(i = i[0]) === 0)
					起訖時間[1] = 起訖時間[1].slice(i.length);
				packed_era_data = [ 紀年名稱, (起訖時間[2] ? 起訖時間[2] + ':' : '')
				//
				+ 起訖時間[0] + '~' + 起訖時間[1], 年度月分資料.join('') ];

				// 添加其他附加屬性名稱。
				for (i in plain_era_data)
					if (!(i in to_skip))
						// TODO: 檢查屬性是否有特殊字元。
						packed_era_data.push(i + '=' + plain_era_data[i]);

				return packed_era_data.join(pack_era.field_separator);
			}

			parse_era.inherit = '=';
			pack_era.field_separator = '|';
			// assert: .length === 1
			pack_era.year_separator = '\t';
			// assert: .length === 1
			pack_era.month_separator = ';';
			pack_era.era_name_separator = pack_era.month_separator;

			pack_era.era_name_classifier = '/';
			pack_era.era_name_重複起頭 = new RegExp('^\\'
					+ pack_era.era_name_classifier + '{2,}');
			// 應當用在 "朝代//" 的情況，而非 "/君主/"。
			pack_era.era_name_符號結尾 = new RegExp('\\'
					+ pack_era.era_name_classifier + '+$');

			// ---------------------------------------------------------------------//
			// private 工具函數。

			function create_era_search_pattern() {
				var key, key_list = [];
				for (key in search_index)
					key_list.push(key);

				// 排序:長的排前面。
				key_list.sort(function(key_1, key_2) {
					return key_2.length - key_1.length
							|| era_count_of_key(key_2)
							- era_count_of_key(key_1);
				});
				// 從最後搜尋起。
				// 從後端開始搜尋較容易一開始就取得最少的候選者，能少做點處理，較有效率。
				// 因為採用 /().*?$/ 的方法不一定能 match 到所需（按順序）的 key，只好放棄
				// /.*?$/。
				era_search_pattern = new RegExp('(?:' + key_list.join('|')
				// escape
				.replace(/([()])/g, '\\$1') + ')$');
			}

			// private 工具函數。
			function compare_start_date(era_1, era_2) {
				return era_1.start - era_2.start;
			}

			// 避免覆蓋原有值。
			// object[key] = value
			function add_attribute(object, key, value) {
				var v = object[key];
				if (Array.isArray(v))
					v.push(value);
				else
					object[key] = key in object ? [ v, value ] : value;
			}

			function parse_month_name(月名, 月名_Array) {
				月名 = 月名.split(pack_era.month_separator);
				if (月名.length > 0) {
					if (!Array.isArray(月名_Array))
						月名_Array = [];

					var index = 0, matched;
					月名.forEach(function(名) {
						名 = 名.trim();
						if ((matched = 名.match(/^(\d+)\s*:\s*(.+)$/))
								&& START_MONTH <= matched[1])
							index = matched[1] - START_MONTH, 名 = matched[2];
						if (名)
							月名_Array[index++] = 名;
					});
				}

				return 月名_Array;
			}

			function get_closed_year_start(date) {
				var year = date.getFullYear(),
				//
				前 = new Date(year, 0, 1),
				//
				後 = new Date(year + 1, 0, 1);

				return date - 前 < 後 - date ? 前 : 後;
			}

			// 處理朝代紀年之 main functions。

			// build data (using insertion):
			// parse era data
			function parse_era(era_data_array, options) {

				function pre_parse_紀年資料(index) {
					var i, j, 附加屬性, era_data = era_data_array[index];
					if (typeof era_data === 'string')
						era_data = era_data.split(pack_era.field_separator);

					else if (library_namespace.is_Object(era_data)) {
						附加屬性 = era_data;
						if (era_data.data) {
							era_data = era_data.data
									.split(pack_era.field_separator);
							delete 附加屬性.data;
						} else
							era_data = [];

						for (i in 紀年名稱索引值)
							if (!era_data[j = 紀年名稱索引值[i]] && (i in 附加屬性)) {
								era_data[j] = 附加屬性[i];
								delete 附加屬性[i];
							}
					}

					if (!Array.isArray(era_data) || era_data.length < 2) {
						library_namespace
								.err('parse_era.pre_parse_紀年資料: 無法判別紀年 ['
										+ index + '] 之資料！');
						return;
					}

					if (!era_data.parsed) {

						if (era_data.length < 3) {
							if (library_namespace.is_Object(i = era_data[1]))
								附加屬性 = i;
							else
								i = [ i ];
							era_data = era_data[0]
									.split(pack_era.field_separator);
						} else
							i = era_data.slice(3);

						if (!附加屬性)
							附加屬性 = library_namespace.null_Object();
						i.forEach(function(pair) {
							if (j = pair.match(
							//		
							/^\s*([^=]+)\s*=\s*([^\s].*)\s*$/))
								add_attribute(附加屬性, j[1], j[2]);
							else if (/^[^\s,.;]+$/.test(pair))
								// 預設將屬性定為 true。
								add_attribute(附加屬性, pair, true);
							else
								library_namespace.debug(
								//
								'無法解析屬性值[' + pair + ']！');
						});

						era_data.length = 3;
						era_data[3] = 附加屬性;
						era_data.parsed = true;
						// 回存。
						era_data_array[index] = era_data;
					}
					return era_data;
				}

				// 前置處理。
				if (!library_namespace.is_Object(options))
					options = library_namespace.null_Object();

				if (!Array.isArray(era_data_array))
					era_data_array = [ era_data_array ];

				// 主要功能。
				var 前一紀年名稱 = [],
				//
				國家 = options.國家 || parse_era.default_country,
				// 上一紀年資料 @ era_list。
				last_era_data;

				era_data_array.forEach(function(era_data, index) {

					if (!(era_data = pre_parse_紀年資料(index)))
						return;

					var tmp, i, j, k,
					//
					紀年 = era_data[0], 起訖 = era_data[1], 曆數 = era_data[2],
					//
					附加屬性 = era_data[3];

					// 至此已設定完成 (紀年), (起訖), (曆數), (其他附加屬性)。

					if (紀年 && !Array.isArray(紀年))
						紀年 = String(紀年).split(pack_era.era_name_classifier);
					if (!紀年 || 紀年.length === 0) {
						library_namespace.err('parse_era: 無法判別紀年 [' + index
								+ '] 之名稱資訊！');
						return;
					}

					library_namespace.debug(
					//
					'前期準備：正規化紀年 [' + 紀年 + '] 之名稱資訊。', 2);

					// 紀年 = [ 朝代, 君主(帝王), 紀年 ]
					// 配合 (紀年名稱索引值)
					if (紀年.length === 1 && 紀年[0])
						// 朝代兼紀年：紀年=朝代
						前一紀年名稱 = [ 紀年[2] = 紀年[0] ];

					else {
						if (!紀年[0] && (tmp = 前一紀年名稱.length) > 0) {
							// 填補 inherited 繼承值/預設值。
							// 得允許前一位有紀年，後一位無；以及相反的情況。
							紀年.shift();
							tmp -= 紀年.length;
							// 3 = 最大紀年名稱資料長度 = 紀年名稱索引值.國家
							Array.prototype.unshift.apply(紀年, 前一紀年名稱.slice(0,
									tmp > 1 ? tmp : 1));
						}
						紀年.forEach(function(name, index) {
							if (name === parse_era.inherit) {
								if (!前一紀年名稱[index])
									library_namespace
											.err('parse_era: 前一紀年並未設定 ['
													+ index + ']！');
								紀年[index] = 前一紀年名稱[index] || '';
							}
						});

						// do clone
						前一紀年名稱 = 紀年.slice();
						if (紀年[1] && !紀年[2])
							// 朝代/君主(帝王)：紀年=君主(帝王)
							紀年[2] = 紀年[1];
					}

					紀年.reverse();
					if (國家 && !紀年[3])
						紀年[3] = 國家;

					// assert: 至此
					// 前一紀年名稱 = [ 朝代, 君主(帝王), 紀年 ]
					// 紀年 = [ 紀年, 君主(帝王), 朝代, 國家 ]

					library_namespace.debug(
					//
					'前期準備：正規化紀年 [' + 紀年 + '] 起訖日期。', 2);

					if (!(起訖 = parse_duration(起訖, 紀年)))
						if (options.extract_only)
							起訖 = [ new Date(0), new Date(0) ];
						else {
							library_namespace.err('parse_era: 跳過起訖日期錯誤的紀年資料！');
							return;
						}

					if (!起訖[0])
						if (index > 0)
							// 本一個紀年的起始日期接續上一個紀年。
							起訖[0] = era_data_array[index - 1].end;
						else if (options.extract_only)
							起訖[0] = new Date(0);
						else {
							library_namespace.err('parse_era: 沒有上一紀年以資參考！');
							return;
						}

					if (起訖[1])
						// tmp 於此將設成是否取終點。
						tmp = true;
					else if (tmp = pre_parse_紀年資料(index + 1)) {
						// 下一個紀年的起始日期接續本紀年，因此先分解下一個紀年。
						// assert: tmp[1](起訖) is String
						起訖[1] = tmp[1].replace(/[~～至－](.*?)$/, '');
						// 既然直接採下一個紀年的起始日期，就不需要取終點了。
						tmp = false;
					} else if (options.extract_only)
						起訖[1] = new Date(0);
					else {
						library_namespace.err('parse_era: 無法求得紀年結束時間！');
						return;
					}

					起訖[0] = normalize_date(起訖[0], 起訖[2], false, true);

					if (持續日數_PATTERN.test(起訖[1])) {
						// 訖時間 "+d" : 持續日數
						tmp = +起訖[1];
						(起訖[1] = normalize_date(起訖[0], 起訖[2], true, true))
								.setDate(tmp);

					} else
						// 訖時間 "~y/m/d"
						起訖[1] = normalize_date(起訖[1], 起訖[2], tmp, true);

					// assert: 至此
					// 起訖 = [ 起 Date, 訖 Date, parser ]

					last_era_data = new Era({
						// 紀年名稱資訊（範疇小→大）
						// [ 紀年, 君主(帝王), 朝代, 國家, 其他搜尋 keys ]
						name : 紀年,

						// {Date}起 標準時間(如UTC+8),開始時間.
						start : 起訖[0],
						// {Date}訖 標準時間(如UTC+8), 結束時間.
						end : 起訖[1],

						// 共存紀年/同時存在紀年 []:
						// 在本紀年開始時尚未結束的紀年 list,
						contemporary : [],

						// 年分起始 Date value (搜尋用) [ 1年, 2年, .. ],
						// year_tart:[],

						// 曆數/歷譜資料:
						// 各月分資料 [ [1年之月分資料], [2年之月分資料], .. ],
						// 這邊還不先作處理。
						calendar : 曆數

					// { 其他附加屬性 : .. }
					});

					library_namespace.debug('add period [' + 紀年 + ']。', 2);

					i = 紀年名稱索引值.國家;
					k = undefined;
					tmp = period_root;
					for (var start = 起訖[0].getTime(),
					//
					end = 起訖[1].getTime();;) {
						// 擴張 period 之時間範圍。
						if (!(tmp.start <= start))
							tmp.start = start;
						if (!(end <= tmp.end))
							tmp.end = end;

						if (!(j = 紀年[i--]) || i < 0) {
							if (j || (j = k)) {
								if (!tmp.era)
									tmp.era = library_namespace.null_Object();
								if (j in tmp.era)
									// 有衝突。
									if (Array.isArray(tmp.era[j]))
										tmp.era[j].push(last_era_data);
									else
										tmp.era[j]
										//
										= [ tmp.era, last_era_data ];
								else
									// 一般情況。
									tmp.era[j] = last_era_data;
							}
							break;
						}

						k = j;
						if (j in tmp.sub)
							tmp = tmp.sub[j];
						else
							(tmp = tmp.sub[j] = new Period(start, end))
							//
							.name = j;
					}

					library_namespace.debug('設定紀年[' + 紀年 + ']搜尋用 index。', 2);

					紀年.forEach(function(era_token) {
						add_to_era_by_key(era_token, last_era_data);
					});

					library_namespace.debug(
					//
					'正規化紀年 [' + 紀年 + '] 之其他屬性。', 2);

					for (i in 附加屬性) {
						j = 附加屬性[i];
						if (i in 紀年名稱索引值) {
							i = 紀年名稱索引值[i];

							if (Array.isArray(j)) {
								tmp = [];
								j.forEach(function(name) {
									Array_push(tmp, name
									//
									.split(pack_era.era_name_separator));
								});

							} else
								tmp = j.split(pack_era.era_name_separator);

							tmp.forEach(function(name) {
								if (name && 紀年.indexOf(name) === NOT_FOUND) {
									add_to_era_by_key(name, 紀年[i]);

									// TODO:
									// 對其他同性質的亦能加入此屬性。
									// 例如設定
									// "朝代=曹魏"
									// 則所有曹魏紀年皆能加入此屬性，
									// 如此則不須每個紀年皆個別設定。
									if (i === 0)
										紀年.push(name);
								}
							});

						} else if (i === '月名' || i === MONTH_NAME_KEY) {
							if (j = parse_month_name(j,
									last_era_data[MONTH_NAME_KEY]))
								last_era_data[MONTH_NAME_KEY] = j;
						} else
							add_attribute(last_era_data, i, j);
					}

					if (last_era_data.準確 === '年') {
						if (!last_era_data.calendar)
							last_era_data.calendar
							//
							= ':' + standard_time_parser;
						last_era_data.大月 = CE_MONTH_DAYS;

					} else {
						if (('歲首' in last_era_data)
						//
						&& (i = last_era_data.歲首 | 0) !== START_MONTH
						//
						&& 0 < i && i <= MONTH_COUNT)
							last_era_data.歲首序 = i - START_MONTH;

						if (!(0 < (last_era_data.大月 |= 0))
								|| last_era_data.大月 === 大月)
							delete last_era_data.大月;
					}

					if (options.extract_only)
						return;

					i = era_list.length;
					if (i === 0) {
						era_list.push(last_era_data);
						return;
					}

					var start = 起訖[0],
					//
					contemporary = last_era_data.contemporary;

					// 紀年E 插入演算：
					// 依紀年開始時間，以 binary search 找到插入點 index。
					i -= 4;
					// 因為輸入資料通常按照時間順序，
					// 因此可以先檢查最後幾筆資料，以加快速度。
					if (i < 9)
						i = 0;
					else if (start < era_list[i].start)
						i = era_list.search_sorted(last_era_data, {
							comparator : compare_start_date,
							found : true,
							start : 0
						});

					while (i < era_list.length && era_list[i].start <= start)
						// 預防本紀年實為開始時間最早者，
						// 因此在這邊才處理是否該插入在下一 index。

						// 因為 .search_sorted(, {found : true})
						// 會回傳 <= 的值，
						// 因此應插入在下一 index。

						// 這方法還會跳過相同時間的。
						i++;

					// 以 Array.prototype.splice(插入點 index, 0,
					// 紀年) 插入紀年E，
					// 使本紀年E 之 index 為 (插入點 index)。
					era_list.splice(i, 0, last_era_data);

					// 向後處理"共存紀年" list：
					// 依紀年開始時間，
					// 將所有紀年E 之後(其開始時間 >= 紀年E 開始時間)，
					// 所有開始時間在其結束時間前的紀年，
					// 插入紀年E 於"共存紀年" list。
					for (k = 起訖[1],
					// 從本紀年E 之下個紀年起。
					j = i + 1; j < era_list.length; j++)
						if ((tmp = era_list[j]).start < k) {
							(tmp = tmp.contemporary).push(last_era_data);
							if (tmp.length > 1)
								// 不能保證依照 紀年開始時間 時序，應該插入在最後。
								tmp.sort(compare_start_date);
						} else
							break;

					// 處理同時開始之"共存紀年" list：
					j = [];
					while (i > 0 && (tmp = era_list[--i]).start === start) {
						// 同時開始。
						j.unshift(tmp);
						tmp.contemporary.push(last_era_data);
					}

					// 向前處理"共存紀年" list：
					// 檢查前一紀年，
					// 與其"在本紀年開始時尚未結束的紀年 list"，
					// 找出所有(其結束時間 period_end > 紀年E 開始時間)之紀年，
					// 將之插入紀年E 之"共存紀年" list。
					tmp = era_list[i];
					tmp.contemporary.concat(tmp).forEach(function(era) {
						if (era.end > start)
							contemporary.push(era);
					});
					// 為了按照 紀年開始時間 順序排列。
					if (j.length > 0)
						Array_push(contemporary, j);
				});

				if (last_era_data) {
					if (options.extract_only) {
						last_era_data.initialize();
						return last_era_data;
					}
					// 當有新加入者時，原先的 pattern 已無法使用。
					era_search_pattern = null;
				}
			}

			// ---------------------------------------------------------------------//
			// 工具函數。

			function add_contemporary(date, 指定紀年, options) {
				var tmp, date_index,
				// 沒意外的話，共存紀年應該會照紀年初始時間排序。
				// 共存紀年.start <= date < 共存紀年.end
				共存紀年 = [],
				// 某時間點（時刻）搜尋演算：
				// 查詢某時間點（時刻）存在的所有紀年與資訊：
				// 依紀年開始時間，以 binary search 找到插入點 index。
				era_index = era_list.search_sorted({
					start : date
				}, {
					comparator : compare_start_date,
					found : true
				}),
				//
				紀年 = era_list[era_index];

				if (era_index === 0 && date < 紀年.start) {
					library_namespace.warn('add_contemporary: 日期 ['
							+ date.format(DATE_NAME_FORMAT) + '] 在所有已知紀年之前！');
					return;
				}

				// 至此 (era_list[era_index].start <= date)
				// 除非 date < era_list[0].start，那麼 (era_index===0)。

				// 向前找。
				紀年.contemporary
				//
				.forEach(function(era) {
					// 檢查其"共存紀年" list，
					// 找出所有(所求時間 < 其結束時間 period_end)之紀年，即為所求紀年。
					if (date < era.end && (!era.參照用 || options.含參照用))
						共存紀年.push(era);
				});

				// 本紀年本身+向後找。
				// 為了待會取未交疊的相同國家紀年作為前後紀年，這邊不改變 era_index。
				for (date_index = era_index;
				//
				date_index < era_list.length; date_index++) {
					tmp = era_list[date_index];
					if (date < tmp.start)
						break;
					else if (date < tmp.end && (!tmp.參照用 || options.含參照用))
						共存紀年.push(tmp);
				}

				if (options.era_only)
					return 共存紀年;

				if (指定紀年 && (tmp = 共存紀年.indexOf(指定紀年)) !== NOT_FOUND) {
					// 去除指定紀年本身。
					紀年 = 指定紀年;
					共存紀年.splice(tmp, 1);
				} else
					指定紀年 = null;

				// 取未交疊的相同國家紀年作為前後紀年。
				tmp = era_index;
				while (0 < tmp--)
					if (era_list[tmp].end <= 紀年.start
					// 相同國家
					&& era_list[tmp].name[3] === 紀年.name[3]) {
						date.前紀年 = era_list[tmp].toString();
						break;
					}

				tmp = era_index;
				while (++tmp < era_list.length)
					if (紀年.end <= era_list[tmp].start
					// 相同國家
					&& era_list[tmp].name[3] === 紀年.name[3]) {
						date.後紀年 = era_list[tmp].toString();
						break;
					}

				// 作結尾檢測 (bounds check)。
				if (紀年.end <= date) {
					if (指定紀年) {
						library_namespace.warn(
						//
						'add_contemporary: 日期 ['
								+ date.format(DATE_NAME_FORMAT) + '] 在指定紀年 ['
								+ 指定紀年 + '] 之後！');
						return;
					}
					if (共存紀年.length === 0) {
						library_namespace.warn('add_contemporary: 日期 ['
								+ date.format(DATE_NAME_FORMAT)
								+ '] 在所有已知紀年之後！');
						return;
					}
					紀年 = 共存紀年[0];
				}

				// 至此已確定所使用紀年。
				共存紀年.紀年 = 紀年;

				if (共存紀年.length > 0) {
					tmp = [];
					共存紀年.forEach(function(era) {
						if (date_index = era.Date_to_date_index(date)) {
							// .日名() = [ 日名, 月名, 歲名 ]
							date_index = era.日名(date_index[2], date_index[1],
									date_index[0]).reverse();
							if (options.numeral)
								date_index = numeralize_date_format(date_index,
										options.numeral);

							var name = era + date_index[0] + '年';
							if (era.準確 !== '年')
								name += date_index[1] + '月' + date_index[2]
								//
								+ (options.numeral === 'Chinese' ? '' : '日');
							tmp.push(name);
						}
					});
					if (tmp.length)
						date.共存紀年 = tmp;
				}

				return 共存紀年;
			}

			// ---------------------------------------------------------------------//
			// 應用功能。

			// 轉成具有紀年附加屬性的 Date。
			// date: duration [start_date, end_date]
			// date: era string
			// date: {國家:,朝代:,君主:,紀年:,日期:,..}
			// options: {base:, ..}
			// TODO: options.period_end
			function to_era_Date(date, options) {
				library_namespace.debug('parse (' + typeof date + ') [' + date
						+ ']', 3, 'to_era_Date');

				// 前置處理。
				if (!library_namespace.is_Object(options))
					options = library_namespace.null_Object();

				if (!date)
					date = new Date();

				var 紀年_list, 紀年, origin = true, 指定紀年, tmp, tmp2;
				// 欲改變 紀年_list。
				function check_to_modify() {
					if (origin) {
						// 防止改變原先的 data。
						(紀年_list =
						//
						library_namespace.Set_from_Array(紀年_list)).名 = origin;
						origin = false;
					}
				}

				// 取交集。
				function get_intersection(key) {
					if (key.start && key.end) {
						origin = false;
						(紀年_list = library_namespace.Set_from_Array(
						// or use: (紀年_list = new Set).add(key);
						// 紀年_list.名 = key.name;
						[ key ])).名 = key.name;
						return 紀年_list;
					}

					library_namespace
							.debug('to_era_Date: 取交集 [' + key + ']', 2);
					var list = get_era_Set_of_key(key);
					if (!list ||
					// assert: (Set)list
					list.size === 0)
						return;
					// 初次設定。
					if (!紀年_list) {
						if (key)
							origin = key;
						return 紀年_list = list;
					}

					紀年_list.forEach(function(era) {
						if (!list.has(era))
							check_to_modify(), 紀年_list['delete'](era);
					});
					return 紀年_list;
				}

				// 取得任何一個紀年作為主紀年。
				function get_next_era() {
					if (!紀年_list || 紀年_list.size === 0)
						return 紀年 = null;

					var key = 紀年_list.名 || origin || false;
					if (typeof key === 'string') {
						try {
							紀年_list.forEach(function(era) {
								if (era.name[0] === key) {
									library_namespace
											.debug('to_era_Date: 採用同名紀年 ['
													+ era + ']', 2);
									紀年 = era;
									// TODO: 以更好的方法處理，不用 throw。
									throw 0;
								}
							});
						} catch (e) {
							return 紀年;
						}
					}

					try {
						紀年_list.forEach(function(era) {
							library_namespace.debug('to_era_Date: 採用紀年 [' + era
									+ ']', 2);
							紀年 = era;
							// TODO: 以更好的方法處理，不用 throw。
							throw 0;
						});
					} catch (e) {
					}

					return 紀年;
				}

				if (typeof date === 'number')
					date = Math.abs(date) < 4000
					// 當作年分。
					? new Date(date, 0, 1)
					// 當作 date value。
					: new Date(date);

				else if (library_namespace.is_Object(date)) {
					library_namespace.debug('era information Object → Date', 3,
							'to_era_Date');

					// 從範圍小的開始搜尋。
					// TODO: 搜尋日期?
					for ( var i in 紀年名稱索引值)
						if (i = date[i])
							get_intersection(i);

					date = date.日期 || date.date;
				}

				if (typeof date === 'string') {
					library_namespace.debug('parse 紀年日期 string [' + date + ']',
							3, 'to_era_Date');

					// era information String
					// → era information Object
					var matched, 年, 月, 日, 偵測集 = [],
					// 正規化數字。
					numeralized = normalize_number(date),
					//
					search_era = function search_era() {
						// 通常後方的條件會比較精細。
						while (偵測集.length > 0) {
							var slice = 偵測集.pop();
							while (slice) {
								if (matched = slice.match(era_search_pattern)) {
									if (0 < matched.index)
										偵測集.push(
										//
										slice.slice(0, matched.index));
									if (slice = slice.slice(
									//
									matched.index + matched[0].length))
										偵測集.push(slice);
									return matched;
								}
								slice = slice.slice(0, -1);
							}
						}
					};

					// 前置, 後置 改成 Array (紀年指示詞偵測集)，統一處理。
					if (tmp = numeralized.match(ERA_DATE_PATTERN)
							|| (tmp2 = numeralized
									.match(ERA_DATE_PATTERN_NO_DATE))
							|| (matched = numeralized
									.match(ERA_DATE_PATTERN_YEAR))) {
						library_namespace.debug('to_era_Date: 辨識出紀年+日期之樣式 ['
								+ tmp + ']', 2);

						// 中間多為日期，前後為紀年。
						年 = tmp[2];
						月 = tmp[3];
						日 = tmp[4];

						if (tmp2)
							if (日 && !月
									&& (matched = tmp[5].match(/^\s*([朔晦望])/)))
								// 處理月相
								// e.g.,
								// '寶應二年三月晦日'
								月 = 日, 日 = matched[1];
							else {
								if (!月)
									月 = 日;
								日 = '';
							}
						else if (matched) {
							if (matched = tmp[5].match(/^月(?:([^日]{1,3})日?)?/))
								// e.g., '三月一日'
								月 = 年, 年 = null, 日 = matched[1];
							// e.g., '一日'
							else if (tmp[5].charAt(0) === '日'
									// 僅輸入單一干支，當作日干支而非年干支。
									// e.g.,
									// ('丁亥朔', {base : '寶應二年春正月'})
									|| options.base
									&& 年.length === 2
									&& !isNaN(library_namespace
											.stem_branch_index(年)))
								日 = 年, 年 = null;
							// 不用 numeralized，預防有些紀年名稱包含可數字化資料。
							偵測集.push(date.trim(), null);
						}

						// 依照習慣，前置多為(通常應為)紀年。
						tmp2 = tmp[1].replace(to_era_Date.ignore_pattern, '');
						if (tmp2 = 時刻_to_hour(tmp2))
							偵測集.push(tmp2);
						// 依照習慣，後置多為(通常應為)時間。
						tmp2 = tmp[5].replace(to_era_Date.ignore_pattern, '');
						if (tmp2 = 時刻_to_hour(tmp2))
							偵測集.push(tmp2);

					} else {
						tmp2 = date.trim();
						if (options.base
								&& (tmp = tmp2.match(/([朔晦])日?/)
										|| tmp2.match(/^(望)日?$/)))
							日 = tmp[1];
						if (tmp = tmp2.replace(to_era_Date.ignore_pattern, ''))
							偵測集.push(tmp);
						library_namespace.debug('to_era_Date: 無法辨識出 [' + date
								+ '] 之紀年樣式' + (tmp ? '，直接當紀年名稱處理' : '') + '。',
								2);
					}

					// 首先確定紀年。
					if (偵測集.length > 0) {
						// tmp2 自此當作時間偵測集。
						tmp2 = 偵測集.slice();

						if (!era_search_pattern)
							// 初始化 search pattern。
							create_era_search_pattern();

						if (search_era()
								&& (tmp = get_intersection(matched[0]))
								&& tmp.size > 1) {
							while (紀年_list.size > 1 && search_era())
								get_intersection(matched[0]);
							if (tmp2[1] === null && 偵測集[1] !== null)
								年 = '';
						}
					} else
						tmp2 = null;

					if (date = options.base) {
						if (!Array.isArray(date)
						//
						&& !is_Date(date)) {
							tmp = to_era_Date(date, {
								parse_only : true
							});
							date = tmp[1] && tmp[0] && tmp[0].size > 0 ? tmp
									: numeralize_date_name(date).to_Date(
											standard_time_parser);
						}

						// assert: date(=options.base) 為 Date
						// 或 [ 紀年_list, 紀年, 年, 月, 日 ]。

						if (Array.isArray(date)) {
							// e.g.,
							// options.base 之後，第一個符合 argument(date) 的日期。
							// ('二年春正月丁亥朔', {base : '寶應元年'})
							// ('丁亥朔', {base : '寶應元年二年春正月'})

							tmp = [ 年, 月, 日 ];
							for (matched = 0; matched < tmp.length; matched++)
								if (tmp[matched])
									break;
							switch (matched) {
							// 此處需要與 options.parse_only 之 return 一致。
							case 3:
								日 = date[4];
							case 2:
								月 = date[3];
							case 1:
								年 = date[2];
							case 0:
								origin = true;
								紀年_list = date[0];
							}

						} else if (date && !isNaN(date.getTime())) {
							// e.g.,
							// ('庚辰年庚辰月庚辰日庚辰時', {base : '1850年'})

							// 針對歲次特別做修正。
							// 注意:非泛用方法。
							if (紀年 = library_namespace.stem_branch_index(年)) {
								tmp
								//
								= library_namespace.SEXAGENARY_CYCLE_LENGTH;
								// 計算差距年數。
								if (紀年 = (紀年 - (date.getFullYear()
								//
								- library_namespace.YEAR_STEM_BRANCH_OFFSET))
										% tmp) {
									if (紀年 < 0)
										紀年 += tmp;
									if (紀年 > tmp >> 1)
										紀年 -= tmp;
									// 重設年分。
									date.setFullYear(年 = date.getFullYear()
											+ 紀年);
								}
							}

							// 注意:這邊採用的方法並不完備。
							紀年 = era_list.search_sorted({
								start : date
							}, {
								comparator : compare_start_date,
								found : era_list
							});
							if (紀年)
								紀年_list = library_namespace
										.Set_from_Array(紀年.contemporary
												.concat(紀年));
						}
					}

					// 從紀年、日期篩選可用之紀年，取得 Date。
					date = null;
					// TODO: 篩選*所有*可用之紀年。
					while (get_next_era()
							&& (!(date = 紀年.date_name_to_Date(年, 月, 日))
							//
							|| isNaN(date.getTime()))) {
						check_to_modify();
						// 刪掉不合適的紀年。
						紀年_list['delete'](紀年);
						date = 紀年 = null;
					}

					if (紀年) {
						指定紀年 = 紀年;
						if (紀年_list.size > 1) {
							// 可能是相同紀年之延續。現有元文宗天曆、太平天囯具此情況。
							tmp = [];
							紀年_list.forEach(function(era) {
								if (tmp.indexOf(
								//
								era = era.toString()) !== NOT_FOUND)
									tmp.push(era);
							});
							if (tmp.length > 1)
								// 有超過1個紀年。
								library_namespace.warn('to_era_Date: 共取得 '
										+ tmp.length + ' 個可能的紀年名稱！ ['
										+ tmp.join(', ') + ']');
						}

					} else if (tmp = numeralized.match(
					// assert: !紀年_list || 紀年_list.size === 0 未特定紀年。
					/^JDN?\s*(\d+(?:.\d*)?)$/i)) {
						date = library_namespace.JD_to_Date(tmp[1]);
						// 此時不該當作符合了。

					} else if (library_namespace.is_debug()
					//
					&& arguments[0])
						library_namespace.info([ 'to_era_Date: 無法自 [', {
							b : arguments[0],
							S : 'color:#e92;'
						}, '] 辨識出特殊地域之紀年名稱。（時間不在所求紀年範圍內？）',
								'將視為標準時間（如公元紀年），嘗試以日期解析器 [',
								standard_time_parser, '] 解析。' ]);

					// 警告:請勿隨意更改這些回傳值，因為他們也為 module 內部所用!
					if (options.get_era)
						return 紀年;
					if (options.get_era_list)
						return 紀年_list;
					if (options.parse_only)
						return [ 紀年_list, 紀年, 年, 月, 日 ];

					if (date) {
						if (options.get_range) {
							// shift microseconds
							tmp2 = typeof options.get_range === 'boolean' ? 0
									: options.get_range | 0;
							if (!年 || isNaN(年 = numeralize_date_name(年)))
								tmp = new Date(紀年.end.getTime() + tmp2);
							else {
								// [ 歲序, 月序, 日序 | 0 ]
								tmp = 紀年.Date_to_date_index(date);
								if (!月)
									tmp = new Date(紀年.year_start[tmp[0] + 1]
											+ tmp2);
								else if (!日)
									tmp = new Date(date.getTime() + tmp2
									//
									+ (紀年.calendar[tmp[0]][tmp[1]] - tmp[2])
											* ONE_DAY_LENGTH_VALUE);
								else
									tmp = new Date(date.getTime() + tmp2
											+ ONE_DAY_LENGTH_VALUE);
							}
							// 警告:未處理 options.minute_offset。
							// 警告:跨統治者的紀年，或紀年末的情況可能會出錯。
							return [ date, tmp ];
						}

					} else if (年 && !isNaN(年 = numeralize_date_name(年))) {
						date = ((年 < 0 ? 年 : 年.pad(4)) + '/'
						//
						+ (numeralize_date_name(月) || START_MONTH)
						//
						+ '/' + (numeralize_date_name(日) || START_DATE))
								.to_Date(standard_time_parser);

						if (!date || isNaN(date.getTime())) {
							// 可能到這邊的:如 '1880年庚辰月庚辰日庚辰時'。
							// 從 era_list.search_sorted() 擇出所有可能候選。
							var 候選,
							//
							紀年起序 = era_list.search_sorted({
								// 年初
								start : new Date(年, 0, 1)
							}, {
								comparator : compare_start_date,
								found : true
							}), 紀年迄序 = era_list.search_sorted({
								// 年尾
								start : new Date(年 + 1, 0, 1)
							}, {
								comparator : compare_start_date,
								found : true
							});
							紀年_list = era_list[紀年起序].contemporary
									.concat(era_list.slice(紀年起序, 紀年迄序 + 1));

							for (date = new Date(年, 6, 1), 紀年起序 = 0;
							//
							紀年起序 < 紀年_list.length; 紀年起序++) {
								紀年 = 紀年_list[紀年起序];
								if ((候選 = 紀年.Date_to_date_index(date))
										//
										&& (候選 = 紀年.date_name_to_Date(紀年
												.歲名(候選[0]), 月, 日)))
									break;
							}
							date = 候選;
						}
					}

					if (!date)
						// 死馬當活馬醫。
						// 不可用 DEFAULT_DATE_PARSER，恐造成循環參照。
						date = library_namespace.from_Chinese_numeral(
								numeralized).to_Date(standard_time_parser);

					if (date && tmp2)
						while (0 < tmp2.length)
							if ((tmp = tmp2.pop())
									&& (tmp = library_namespace
											.from_Chinese_numeral(tmp).replace(
													/^[^\d]+/, '').replace(
													/[^\d時分秒]+$/, ''))
									&& (tmp = tmp
									//
									.to_Date(standard_time_parser))
									&& (tmp -= new Date(tmp.getTime())
											.setHours(0, 0, 0, 0))) {
								library_namespace.debug('to_era_Date: 處理時間。 ['
										+ tmp + ']', 3);
								date.setTime(date.getTime() + tmp);
								break;
							}

					// 處理完 {String}Date。
					// -----------------------------
				}

				if (options.get_era || options.get_era_list
						|| options.parse_only || options.get_range)
					return;

				if (!date && get_next_era())
					date = new Date(紀年.start.getTime());

				if (!is_Date(date) || isNaN(date.getTime())) {
					library_namespace.err('to_era_Date: 無法判別紀年 ['
							+ arguments[0] + '] 之時間或名稱資訊！');
					return;
				}

				// 到這裡，date 最起碼是紀年初始時間。

				if (!isNaN(tmp = options.minute_offset))
					date.setMinutes(date.getMinutes() - tmp);

				if (options.date_only)
					return date;

				// 至此 date 應為 Date，並已篩出可能的主要紀年。
				// Date → era information Date (Date += era information)

				tmp = add_contemporary(date, 指定紀年, options);
				if (!tmp)
					return options.era_only ? [] : date;

				// 取得真正使用之紀年。
				紀年 = tmp.紀年;
				delete tmp.紀年;

				if (options.era_only)
					// 此時未設定 (date.共存紀年)
					return tmp;

				紀年.add_comment(date, options);

				return date;
			}

			// TODO: CE, BCE
			to_era_Date.ignore_pattern = /(?:^|\s)[公西][元曆](?:$|\s)/;

			// ---------------------------------------------------------------------//
			// 應用功能。

			/**
			 * 取得指定關鍵字之候選列表。
			 * 
			 * @param {String}key
			 *            指定關鍵字。
			 * 
			 * @returns {Array}指定關鍵字之候選列表。
			 */
			function get_candidate(key) {
				var list;
				if (!key) {
					// 取得所有年代之列表。
					if (!get_candidate.all_list) {
						list = library_namespace.null_Object();
						era_list.forEach(function(era) {
							list[era] = era.toString(SEARCH_STRING);
						});
						get_candidate.all_list = list;
					}
					return get_candidate.all_list;
				}

				if (key in search_index) {
					list = library_namespace.null_Object();
					for_each_era_of_key(key, function(era) {
						list[era] = era.toString(SEARCH_STRING);
					});
				}

				else if (key = to_era_Date(key, {
					era_only : true
				})) {
					list = library_namespace.null_Object();
					key.forEach(function name(era) {
						list[era] = era.toString(SEARCH_STRING);
					});
				}

				return list;
			}

			/**
			 * 取得指定層次/關鍵字之紀年列表。<br />
			 * 
			 * 回傳之列表，會以<b>是否可放在同一時間軸線圖中</b>作為分隔。<br />
			 * e.g.,<code>
			 [
				 [
				 	[ 紀年(1年-2年), 紀年(3年-4年) ]
				 ],
				 [
					 [ 紀年(5年-6年), 紀年(7年-8年) ],
					 [ 紀年(6年-7年), 紀年(8年-9年) ]
				 ]
			 ]
			 * </code>
			 * 
			 * @param {Array|String}hierarchy
			 *            指定層次/關鍵字。
			 * 
			 * @returns {Array}紀年列表。<br /> [ 同階層紀年列表 ]
			 */
			function get_periods(hierarchy, options) {
				var period_now = period_root;

				if (hierarchy)
					if (!Array.isArray(hierarchy))
						if (hierarchy.constructor === Period)
							period_now = hierarchy.sub, hierarchy = null;
						else
							hierarchy = [ hierarchy ];

				// 將 period_now 指到指定層次。
				if (hierarchy && hierarchy.length)
					hierarchy.forEach(function(name) {
						if (period_now)
							period_now = period_now.sub[name];
					});

				if (!period_now) {
					library_namespace.warn('get_periods: 無法取得指定之紀年層次 ['
							+ hierarchy + ']！');
					return;
				}

				if (!period_now.bar) {
					var list = [], name, add = function(object) {
						for (name in object) {
							(Array.isArray(name = object[name]) ? name
									: [ name ]).forEach(function(o) {
								// 去除循環相依。
								if (o === object)
									return;

								if (!options.含參照用 && o.sub) {
									// is Period
									var i;
									// 只要 .sub, .era
									// 有任一個不是"參照用"，那就顯示出來。
									for (i in o.sub)
										if (!o.sub[i].參照用) {
											list.push(o);
											return;
										}
									for (i in o.era)
										if (!o.era[i].參照用) {
											list.push(o);
											return;
										}

								} else if (options.含參照用 || !o.參照用) {
									list.push(o);
									return;
								}

								if (library_namespace.is_debug())
									library_namespace.info([
											'get_dates: ',
											{
												T : [ '跳過 [%1]：本[%2]僅供參照用。', o,
														' period ' ]
											} ]);
							});
						}
					};
					// 前置處理。
					if (!library_namespace.is_Object(options))
						options = library_namespace.null_Object();
					add(period_now.sub);
					add(period_now.era);
					// 作 cache。
					period_now.bar = order_bar(list.sort(compare_start_date));
				}

				return period_now.bar;
			}

			// 文字式曆譜:年曆,朔閏表,曆日譜。
			// 會更改 options!
			function get_dates(era, options) {
				if (!era)
					return;

				// 前置處理。
				if (!library_namespace.is_Object(options))
					options = library_namespace.null_Object();

				// date: 月曆/日曆，非年曆。
				var date = options.月 || options.日, date_list = [], era_list;
				if (typeof era === 'string') {
					// 去掉空白。
					era = era.replace(/\s+/g, '');
					if (era_list = normalize_number(era).match(
					//
					/\d年(.{1,3}月)?/))
						options.月 = 1, options.日 = era_list[1] && 1;

					if (date = date || options.月 || options.日)
						options.get_era = true;
					else
						options.get_era_list = true;
					era_list = to_era_Date(era, options);

				} else
					era_list = era;

				if (!era_list || !date && era_list.size === 0) {
					library_namespace.info([ 'get_dates: ', {
						T : [ '無紀年名稱作 [%1]！', era ]
					} ]);
					return;
				}

				if (era_list.準確 === '年') {
					// 精密度不足。
					delete options.月;
					delete options.日;
					delete options.get_era;
					options.get_era_list = true;
					era_list = to_era_Date(era, options);
					date = null;
				}

				if (date) {
					delete options.get_era;
					// [ 歲序, 月序, 日序 | 0 ];
					date_list.selected = era_list
							.Date_to_date_index(to_era_Date(era, options));
					era = era_list;
					if (!era.year_start)
						era.initialize();
				}

				if (options.月 && !options.日) {
					// 月曆。
					var i = date_list.selected[0], j, calendar = era.calendar,
					//
					start_time;

					if (0 < i)
						date_list.previous = era.toString()
								+ era.歲名(i < 10 ? 0 : i - 10) + '年';

					for (; i < calendar.length
							&& date_list.length < 10 * MONTH_COUNT; i++) {
						start_time = era.year_start[i];
						for (j = 0; j < calendar[i].length
								&& start_time < era.end; j++) {
							date_list.push(
							//
							date = new Date(start_time));
							add_contemporary(date, era, options);
							era.add_comment(date, options);

							start_time += ONE_DAY_LENGTH_VALUE
							//
							* calendar[i][j];
						}
					}

					date_list.type = 1;
					if (i < calendar.length)
						date_list.next = era.toString() + era.歲名(i) + '年';
					return date_list;
				}

				if (date) {
					// 日曆。
					date = date_list.selected;
					var i = 0, start_time = 0,
					//
					this_year_data = era.calendar[date[0]];

					for (; i < date[1]; i++)
						// days of month
						start_time += this_year_data[i];
					start_time = era.year_start[date[0]] + ONE_DAY_LENGTH_VALUE
							* start_time;
					this_year_data = start_time + this_year_data[i]
							* ONE_DAY_LENGTH_VALUE;
					if (this_year_data > era.end)
						this_year_data = era.end;
					for (; start_time < this_year_data;
					//
					start_time += ONE_DAY_LENGTH_VALUE) {
						date = new Date(start_time);
						add_contemporary(date, era, options);
						era.add_comment(date, options);
						date_list.push(date);
					}

					date_list.type = 2;
					date = date_list.selected;
					// [ 日名, 月名, 歲名 ]
					if (i = era.日名(0, date[1] - 1, date[0]))
						date_list.previous = era.toString() + i[2] + '年' + i[1]
								+ '月';
					if (start_time < era.end
							&& (i = era.日名(0, date[1] + 1, date[0])))
						date_list.next = era.toString() + i[2] + '年' + i[1]
								+ '月';
					return date_list;
				}

				// 年曆。

				era_list.forEach(function(era) {
					if (era.參照用 && !options.含參照用) {
						library_namespace.info([ 'get_dates: ', {
							T : [ '跳過 [%1]：本[%2]僅供參照用。', era, '紀年' ]
						} ]);
						return;
					}

					if (!era.year_start)
						era.initialize();

					var year_start = era.year_start,
					//
					i = 0, l = year_start.length - 1, date;

					if (l > 150) {
						library_namespace.warn('get_dates: 跳過 [' + era
								+ ']：跨度過長，共有 ' + l + '個年分！');
						return;
					} else
						for (; i < l; i++) {
							date = new Date(year_start[i]);
							add_contemporary(date, era, options);
							era.add_comment(date, options);
							date_list.push(date);
						}
				});

				return date_list;
			}

			// ---------------------------------------------------------------------//

			// 警告:此函數會更改原輸入之 date_value!
			function Date_to_era_String(date_value, format, locale, options) {
				// 前置處理。
				if (!library_namespace.is_Object(options))
					options = library_namespace.null_Object();
				var config = this || options, 紀年名,
				// 指定紀年。
				紀年 = config.era_object;
				if (!紀年) {
					// 在有綁定時，不考慮 options.era。
					if (紀年名 = config.era)
						if ((紀年 = get_era_Set_of_key(紀年名))
						//
						&& 0 < (紀年 = 紀年.values()).length) {
							if (紀年.length !== 1)
								// assert: 有超過1個紀年。
								library_namespace
										.warn('Date_to_era_String: 共取得 '
												+ 紀年.length + ' 個可能的紀年 [' + 紀年名
												+ ']！');
							紀年 = 紀年[0];
						} else
							紀年 = to_era_Date(紀年名, {
								get_era : true
							});

					if (!紀年) {
						library_namespace
								.warn('Date_to_era_String: 無法取得指定之紀年 [' + 紀年名
										+ ']！');
						return;
					}

					// 紀年之 cache。
					if (this)
						this.era_object = 紀年;
				}

				// 前置處理。
				if (!date_value)
					date_value = new Date;
				if (!('numeral' in options) && ('numeral' in config))
					options.numeral = config.numeral;

				// 警告:此函數會更改原輸入之 date_value!
				紀年.add_comment(date_value, options);

				return strftime(date_value,
				//
				format || config.format,
				//
				locale || config.locale, options);
			}

			(function() {
				var era_name, era_data,
				// 為各特殊曆法特設。
				// 今天是農曆 <code>(new Date).format('Chinese')</code>
				era_to_export = {
					Chinese : {
						era : '中曆',
						format : '%歲次年%月月%日'
					}
				};

				Date_to_String_parser.era = Date_to_era_String;

				for (era_name in era_to_export) {
					Date_to_String_parser[era_name] = Date_to_era_String.bind(
					//
					era_data = era_to_export[era_name]);
					if (!era_data.numeral)
						era_data.numeral = era_name;
					if (!era_data.locale)
						era_data.locale = library_namespace.gettext
								.to_standard(era_name);
				}
			})();

			// ---------------------------------------------------------------------//

			strftime.set_conversion({

				// 注意:依 .format() 之設定，在未設定值時將採本處之預設。
				// 因此對於可能不設定的值，預設得設定為 ''。

				// 講述東周歷史的兩部典籍《春秋》和《戰國策》都是使用帝王紀年。
				// 共伯和/周定公、召穆公
				// 國號
				朝代 : '',
				// 君主(帝王)號
				君主 : '',
				// 共和
				// 君主(帝王)/年號/民國
				紀年 : '',
				紀年名 : '',

				// 陽曆「二十四節氣」中，每月有一個節氣，一個中氣，分別發生在每月的7日和22日前後。
				// 節氣 : '',
				// 此非季節，而為「冬十月」之類用。
				季 : '(季)',

				// 季節:
				// 立春到立夏前為春季，立夏到立秋前為夏季，立秋到立冬前為秋季，立冬到立春前為冬季。

				年 : '(年名)',
				月 : '(月名)',
				日 : '(日名)',

				// 重新定義 (override)
				// 東漢四分曆以前，用歲星紀年和太歲紀年（歲星:木星）。到現在來用干支紀年。
				// 干支紀年萌芽於西漢，始行於王莽，通行於東漢後期。
				歲次 : function(date_value, options) {
					return (options.original_Date || date_value).歲次
							|| library_namespace.guess_year_stem_branch(
									date_value, options);
				},
				// 重新定義 (override) alias
				年干支 : '歲次',
				年柱 : '歲次',

				生肖 : '(十二生肖/屬相)',
				// http://zh.wikipedia.org/wiki/五行#五行與干支表
				五行 : '(陰陽五行)',

				曜日 : '',
				六曜 : '',
				日本月名 : '',

				// 星座 : '',

				// 佔位:會引用 Date object 本身的屬性。
				// see strftime()
				月干支 : '(月干支)',
				// 每年正月初一即改變干支，例如錢益謙在崇禎十五年除夕作「壬午除夕」、隔日作「癸未元日」
				// 日干支:'干支紀日',
				// 月干支:'干支紀月',
				月柱 : '月干支',
				// 把一年十二個月和天上的十二辰聯繫起來。
				// 閏月月建同本月。
				// 子月：大雪(12月7/8日)至小寒前一日，中氣冬至。
				// 因此可以與12月7日最接近的月首，作為子月初一。
				月建 : '(月建)',
				閏月 : '(是否為閏月)',
				大小月 : '(大小月)',

				// 一個月的第一個十天為上旬，第二個十天為中旬，餘下的天數為下旬。
				旬 : '(上中下旬)',

				// 晝夜 : '',
				// 第一個時辰是子時，半夜十一點到一點。
				// 時辰 : '子丑寅卯辰巳午未申酉戌亥',
				// 晚上七點到第二天早上五點平均分為五更（合十個小時），每更合二個小時。
				// 更 : '',

				// 用四柱神算推算之時辰八字
				四柱 : '%年柱%月柱%日柱%時柱',
				八字 : '%年干支%月干支%日干支%時干支',

				// 夏曆 : '%歲次年%月月%日日%辰時',
				// 農民曆 : '',

				// 授時歷即統天歷
				曆法 : '',

				// 注解
				注 : ''

			}, library_namespace.gettext.to_standard('Chinese'));

			library_namespace.extend({
				pack : pack_era,
				set : parse_era,
				extract : extract_calendar_data,
				periods : get_periods,
				get_candidate : get_candidate,
				dates : get_dates,
				numeralize : numeralize_date_name
			}, to_era_Date);

			library_namespace.十二生肖_LIST = 十二生肖_LIST;
			library_namespace.陰陽五行_LIST = 陰陽五行_LIST;

			String_to_Date.parser.era = function(date_string, minute_offset,
					options) {
				if (minute_offset) {
					// 前置處理。
					if (!library_namespace.is_Object(options))
						options = library_namespace.null_Object();
					options.minute_offset = minute_offset;
				}

				library_namespace.debug('parse (' + typeof date_string + ') ['
						+ date_string + ']', 3, 'String_to_Date.parser.era');
				return to_era_Date(date_string, options);
			};

			// ---------------------------------------

			this.finish = function(name_space, waiting) {
				library_namespace.run(
				//
				library_namespace.get_module_path(this.id + '_data'), waiting);
				return waiting;
			};

			return to_era_Date;
		},

		// this is a sub module.
		no_extend : '*'
	});
