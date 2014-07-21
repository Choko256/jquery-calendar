/***********************************************************************************
** jQuery Calendar
** 		Version: 		1.0.0
** 		License: 		GPL v3. See LICENSE file.
**		Author: 		Choko <choko@chaksoft.fr>
***********************************************************************************/

var dayNames = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
var dayLongNames = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
var monthLongNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

var CalendarEvent = function(id, title, name, startTime, endTime) {
	this.id = id;
	this.title = title;
	this.name = name;
	this.startTime = startTime;
	this.endTime = endTime;
	this.backColor = '#5882FA';
	this.foreColor = '#fefefe';
};

var Calendar = function($item) {
	// Initializes calendar structure
	// Calendar accepts data from JSON, XML, ICalendar, but can also store/read in/from LocalStorage.
	var events = {};
	var container = $item;
	var currentDate = new Date();
	this.mode = 'daily';
	
	this.setDate = function(date) {
		this.currentDate = date;
	};
	
	this.addEvent = function(date, title, name, startTime, endTime) {
		var key = date.toLocaleDateString();
		var idx = 0;
		if(!(key in events)) {
			events[key] = new Array();
		}
		idx = events[key].length;
		var event = new CalendarEvent(idx, title, name, startTime, endTime);
		events[key].push(event);
		container.trigger('calendar.event.added', [ event ]);
	};
	this.getEventById = function(date, id) {
		var dateEvents = events[date.toLocaleDateString()];
		for(var i = 0; i < dateEvents.length; i++) {
			if(dateEvents[i].id == id) {
				return dateEvents[i];
			}
		}
		return null;
	};
	this.removeEvent = function(date, id) {
		var event = this.getEventById(date, id);
		var key = date.toLocaleDateString();
		events[key].slice(events[key].indexOf(event), 1);
		container.trigger('calendar.event.removed');
	};
	
	this.build = function() {
		if(this.mode == 'daily') {
			buildDaily();
		} else if(this.mode == 'weekly') {
			buildWeekly();
		} else if(this.mode == 'monthly') {
			buildMonthly();
		} else if(this.mode == 'yearly') {
			buildYearly();
		} else {
			throw 'Invalid mode.';
		}
	};
	
	var buildDaily = function() {
		$('<div class="daily-header">').appendTo(container);
		var $dh = $('<table class="daily-hours">');
		$dh.append('<tbody>');
		
		var $de = $('<table class="daily-events">');
		$de.append('<tbody>');
		
		var hour = 0;
		for(var i = 0; i < 48; i++) {
			if(i % 2 == 0) {
				$dh.find('tbody').append('<tr class="daily-hour"><td>' + hour + '</td></tr>');
				hour ++;
			} else {
				$dh.find('tbody').append('<tr class="daily-half-hour"><td></td></tr>');
			}
			$de.find('tbody').append('<tr class="daily-event-cell"><td></td></tr>');
		}
		
		container.append($dh);
		container.append($de);
	};
	var buildWeekly = function() {
	};
	var buildMonthly = function() {
	};
	var buildYearly = function() {
	};
};

(function($) {
	$.fn.calendar = function(action, params) {
		if(typeof(action) == 'object') {
			params = action;
		}
	};
})(jQuery);
