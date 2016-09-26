// ============================================================================================================
// Functions created for dashboard
// ============================================================================================================
//Returns int val of element


	var remSpcChr = function(value){
		return value.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
	}

	var roundOneDec = function(value){
		return Math.round(value * 10) / 10;
	};

	var roundTwoDec = function(value){
		return Math.round(value * 100) / 100;
	};

	var pFloat = function(value){
		return parseFloat(remSpcChr($(value).text()) || 0)
	}

	var pInt = function(value){
		return parseInt(remSpcChr($(value).text()) || 0)
	};

//runs function on a set time delay
	var debouncer = function(func, time) {
		var timeWindow = 500; //time in ms. waits this amount of time after the final click before running function
		var timeout;
		return function() {
			// var context = this;
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				func();
			}, timeWindow)
		} //end function
	}; //end debouncer

	var nanCheck = function(value) {
		if($.isNumeric(value) === false){
			return 0
		}
		else{
			return value
		}
	};

	var FormatCurrency = function(number) {
		return (new Intl.NumberFormat('en-EN', {style: 'currency', currency: 'USD' }).format(number))
	}

	var FormatPercent = function(number) {
		return (number.toFixed(2) + " %")
	}
// ============================================================================================================
