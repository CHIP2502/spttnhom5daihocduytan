var prettyDate = function(dateString) {
	// old date string: 2012-10-24 15:47:04.694
	// new date string (ISO 8601): 2012-10-23T16:22:21+07:00

	if (typeof dateString == 'undefined') {
		return '';
	}

	dateString1 = dateString.replace(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}).\d{0,4}/gim, '$1T$2+07:00');

	var date = new Date(dateString1);
	if (isNaN(date)) {
		try {
			var dateArray = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})([+\-])(\d{2}):(\d{2})/.exec(dateString1);

			if (dateArray[1]) {
				date = dateArray[1].split(/\D/);

				for (var i = 0, L = date.length; i < L; i++) {
					date[i]= parseInt(date[i], 10) || 0;
				}

				date[1] -= 1;
				date = new Date(Date.UTC.apply(Date, date));

				if(!date.getDate()) {
					date = NaN;
				}
				else if (dateArray[3]) {
					var tz = (parseInt(dateArray[3], 10) * 60);
					if (dateArray[4]) tz += parseInt(dateArray[4], 10);
					if (dateArray[2] == '+') tz *= -1;
					if (tz) date.setUTCMinutes(date.getUTCMinutes()+ tz);
				}
			}
		}
		catch (e) {
			date = NaN;
		}
	}

	if (isNaN(date)) {
		return ''; //dateString incorrect
	}

	var now = new Date();
	var diff = (now.getTime() - date.getTime()) / 1000;
	var day_diff = Math.floor(diff / 86400);
	console.log(date.getMinutes());

		return 'hh:mm dd/MM/yyyy'
			.replace(/hh/, ("0" + date.getHours()).slice(-2))
			.replace(/mm/, ("0" + date.getMinutes()).slice(-2))
			.replace(/dd/, ("0" + date.getDate()).slice(-2))
			.replace(/MM/, ("0" + (date.getMonth() + 1)).slice(-2))
			.replace(/yyyy/, date.getFullYear())
		;
}


$.fn.trimLine = function(a, b) {

    return this.each(function() {
        var f = $(this).text().length;
		var textFull = $(this).text();
        var d = parseFloat($(this).css("line-height")) * a;
        if (isNaN(d)) {
            d = parseFloat($(this).css("font-size").replace("px", "")) * a
        }
        var e = ($(this).height() > d && f > 0);
        while ($(this).height() > d && f > 0) {
            f--;
            var g = $(this).html().toSubString(f);
            $(this).html(g)
        }
        if (e) {
			$(this).attr('title', textFull)
            $(this).html($(this).html().substring(0, $(this).html().lastIndexOf(" ")) + " ...")
        }
        if (true === b) {
            $(this).css({
                "min-height": d + "px"
            })
        }
    })
};

String.prototype.toSubString = function(b) {
    var c = this;
    if (c == "" || c.Length <= b) {
        return c
    }
    var a = c.lastIndexOf(" ");
    c = c.substring(0, Math.min(c.length, b));
    if (c.length > a) {
        c = c.substring(0, a)
    }
    return c
};

	function myFunction() {
	var dummy = document.createElement('input'),
		text = window.location.href;

	document.body.appendChild(dummy);
	dummy.value = text;
	dummy.select();
	document.execCommand('copy');
	document.body.removeChild(dummy);
}


function getUrlParam(name) {
	var str =  (new URL(window.location.href)).searchParams.get(name);
	if(str == null) {
		str = "";
	} else {
			str = str.replace(/[^a-zA-Z0-9 ]/g,'');
	}
  return str;
}
Date.prototype.yyyymmdd = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = this.getDate().toString();
	return  (dd[1] ? dd : "0" + dd[0])+ '/'  + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy; // padding
};

Date.prototype.ddmmyyyy = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = this.getDate().toString();
	return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' +  yyyy ; // padding
};
Date.prototype.ddmm = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = this.getDate().toString();
	return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) ; // padding
};
Date.prototype.yyyymm = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	return yyyy+(mm[1] ? mm : "0" + mm[0]) ; // padding
};

	Date.prototype.format = function (config) {
		this.formatString = config.format;
		this.lang = (config.lang) ? config.lang : 'vi';
		this.day = this.getDay();
		this.langText = {
			vi: [
			'Chủ nhật',
			'Thứ 2',
			'Thứ 3',
			'Thứ 4',
			'Thứ 5',
			'Thứ 6',
			'Thứ 7'
			],
			en: [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
			]
		};
		switch (this.lang) {
			case 'vi':
			case 'en':
			break;
			default:
			this.lang = 'vi';
		}
		this.day = this.langText[this.lang][this.day];
		return this.formatString
        .replace(/DAY/, this.day)
        .replace(/DD/, ("0" + this.getDate()).slice(-2))
        .replace(/MM/, ("0" + (this.getMonth() + 1)).slice(-2) )
        .replace(/YYYY/, this.getFullYear())
        .replace(/HH/, ("0" + this.getHours()).slice(-2))
        .replace(/MI/,  ("0" + this.getMinutes()).slice(-2))
        .replace(/SS/, this.getSeconds())

	};