
/**
 * @name	CeL function for process
 * @fileoverview
 * 本檔案包含了 process 流程控制的 functions。
 * @since	2012/2/3 19:13:49
 */


if (typeof CeL === 'function')
CeL.setup_module('application.process',
function(library_namespace, load_arguments) {
'use strict';

//	nothing required





/**
 * null module constructor
 * @class	process 的 functions
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





function set_flag(flag_Object) {
	function get_flag(flag) {
		return flag in get_flag ? get_flag[flag] : flag;
	}
	(get_flag.add_flag = function(flag_Object) {
		if (flag_Object)
			for ( var i in flag_Object)
				get_flag[i] = flag_Object[i];
	})(flag_Object);
	return get_flag;
}


/**
 * 設定循序執行(serial execution)程序，並可以作 stop, resume 等流程控制(inter-process communication)。
 * 亦可代替 loop: for(;;);
 * @param {Function}main_thread	main_thread(process_to_index){return (!0): all done, 'SIGABRT':terminated,no pass_across.finish();}
 * @param {Object}[pass_across]	在各 thread 間傳遞的 data. pass_across.id: process id, 有設定 id 才能作流程控制。
 * @returns	accident occurred @ beginning
 * @since	2012/2/3 18:38:02
 */
function serial_execute(main_thread, pass_across) {
	if (typeof main_thread !== 'function')
		return;

	var
	//	signal cache
	SIGABRT = serial_execute.signal.SIGABRT,
	SIGSTOP = serial_execute.signal.SIGSTOP,
	//	process status
	process_data,
	//	start from 哪一序號
	process_to = 0,
	//	執行至哪一序號
	end,
	interval = 0;
	//	外包裹執行緒
	package_thread = function() {
		var status,
		id = 'process [' + (pass_across && pass_across.id) + '] @ ' + process_to + (isNaN(end) ? '' : ' / ' + end),
		stop = function() {
			library_namespace.debug('Stop ' + id);
			status = SIGSTOP;
			process_data.resume = function() {
				library_namespace.debug('Resume ' + id);
				return package_thread();
			};
		};

		if (process_data && ('signal' in process_data)) {
			switch (process_data.signal) {
			case serial_execute.signal.SIGTERM:
				status = SIGABRT;
				break;
			case SIGSTOP:
				stop();
			default:
				// ignore others
				delete process_data.signal;
			}
		}

		if (!status)
			try {
				status = serial_execute.signal(main_thread.call(
						main_thread, process_to++, pass_across));
			} catch (e) {
				library_namespace.warn(id + ' failed');
				library_namespace.err(e);
				if (pass_across && pass_across.stop_on_error)
					stop();
			}

		if (!status && (isNaN(end) || process_to < end))
			setTimeout(package_thread, interval);
		else {
			// 收尾/收拾工作.
			if (status !== SIGABRT && status !== SIGSTOP
					&& typeof pass_across.finish === 'function')
				status = pass_across.finish.call(main_thread, process_to, pass_across);
			else if (status === SIGABRT)
				library_namespace.debug('Terminate process [' + process_data.id
						+ '] @ ' + process_to);
			if (process_data && (status !== SIGSTOP))
				delete serial_execute.process[process_data.id];
			return status;
		}
	};

	if (pass_across) {
		if (typeof pass_across.run_first === 'function' && (process_to = pass_across.run_first()))
			return process_to;

		// start from 哪一序號
		process_to = pass_across.start || 0;
		// 直行至哪一序號
		end = pass_across.end || 0;
		interval = 0;

		// process status
		if (process_data = pass_across.id) {
			if (!serial_execute.process)
				serial_execute.process = {};

			if (serial_execute.process[process_data])
				library_namespace.debug('已有相同 id 之 process 執行中! [' + process_data
						+ ']'), process_data = undefined;
			else
				process_data = serial_execute.process[process_data] = {
					// signal : 0,
					process_to : function(to) {
						if (!isNaN(to))
							process_to = to;
						return process_to;
					},
					// signal handler
					handler : pass_across.handler,
					'function' : main_thread,
					data : pass_across,
					id : process_data
				};
		}
	}

	// setTimeout(package_thread, process_to);
	return package_thread(process_to);
}

// http://en.wikipedia.org/wiki/Unix_signal
serial_execute.signal = set_flag( {
	SIGTERM : 6,
	SIGCONT : 18,
	SIGSTOP : 19,
	SIGABRT : 6
});
serial_execute.send = function(id, signal) {
	var process;
	try {
		if (!(process = serial_execute.process[id]))
			return new Error('Process does not exist');
	} catch (e) {
		return e;
	}

	signal = serial_execute.signal(signal);
	if (signal === serial_execute.signal.SIGCONT) {
		// 喚醒
		if (typeof process.resume === 'function') {
			if (process.signal === serial_execute.signal.SIGSTOP)
				delete process.signal;
			signal = process.resume();
			delete process.resume;
			return signal;
		}
	} else {
		process.signal = signal = serial_execute.signal(signal);
		if (signal === serial_execute.signal.SIGTERM
				&& typeof process.resume === 'function')
			return process.resume();
		else if (typeof process.handler === 'function')
			// signal handler
			return process.handler(signal);
	}
};
// run
serial_execute.resume = function(id) {
	return serial_execute.send(id, serial_execute.signal.SIGCONT);
};
// pause
serial_execute.stop = function(id) {
	return serial_execute.send(id, serial_execute.signal.SIGSTOP);
};
// terminate
serial_execute.abort = function(id) {
	return serial_execute.send(id, serial_execute.signal.SIGTERM);
};


_.serial_execute = serial_execute;



/*

//	for testing
if (1)
CeL.set_run('application.process', function() {
	CeL.serial_execute(function(i) {
		CeL.log(i);
		if (i > 99)
			return 1;
	}, function(i, data) {
		CeL.log(data.id + ' done @ ' + i);
	}, {
		id : 't',
		interval : 1000
	});
	CeL.serial_execute.stop('t');
});
// CeL.serial_execute.resume('t');
// CeL.serial_execute.abort('t');
//CeL.log(CeL.serial_execute.process['t']);

if(0)
CeL.serial_execute(function(i) {
	CeL.log(i);
	if (i > 99)
		return 1;
}, function(i, id) {
	CeL.log('done @ ' + i);
});

*/


return (
	_// JSDT:_module_
);
}


);

