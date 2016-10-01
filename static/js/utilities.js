
// ============================================================================================================
// Functions created for dashboard
// ============================================================================================================
myApp.utils = {};


(function(){
      myApp.utils.remSpcChr = function(value){
		    return value.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '')
      };

      myApp.utils.pFloat = function(value){
    		return parseFloat(myApp.utils.remSpcChr($(value).text()) || 0)
    	};

      myApp.utils.pInt = function(value){
    		return parseInt(myApp.utils.remSpcChr($(value).text()) || 0)
    	};

      myApp.utils.nanCheck = function(value) {
    		if($.isNumeric(value) === false){
    			return 0
    		}
    		else{
    			return value
    		}
    	};

      myApp.utils.nanReplace = function(event){
      $("td:contains('NaN')").each(function() {
        $(this).text('0');
      })
    };

      myApp.utils.roundOneDec = function(value){
        return Math.round(value * 10) / 10;
      };

      myApp.utils.roundTwoDec = function(value){
        return Math.round(value * 100) / 100;
      };

      myApp.utils.FormatCurrency = function(number) {
        return (new Intl.NumberFormat('en-EN', {style: 'currency', currency: 'USD' }).format(number))
      }

      myApp.utils.FormatPercent2 = function(number) {
    		return (number.toFixed(2) + " %")
    	}

      myApp.utils.FormatPercent1 = function(number) {
        return (number.toFixed(1) + " %")
      }
})();


// //runs function on a set time delay
// 	var debouncer = function(func, time) {
// 		var timeWindow = 500; //time in ms. waits this amount of time after the final click before running function
// 		var timeout;
// 		return function() {
// 			// var context = this;
// 			clearTimeout(timeout);
// 			timeout = setTimeout(function() {
// 				func();
// 			}, timeWindow)
// 		} //end function
// 	}; //end debouncer


// ============================================================================================================
