// ============================================================================================================
// Functions created for dashboard
// ============================================================================================================
//Returns int val of element
myApp.utils = {};

(function(){
  
      var myApp.utils.remSpcChr = function(value){
		    return value.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '')
      };

      var myApp.utils.pFloat = function(value){
    		return parseFloat(remSpcChr($(value).text()) || 0)
    	};

      var myApp.utils.pInt = function(value){
    		return parseInt(remSpcChr($(value).text()) || 0)
    	};

      var myApp.utils.nanCheck = function(value) {
    		if($.isNumeric(value) === false){
    			return 0
    		}
    		else{
    			return value
    		}
    	};

      var myApp.utils.roundOneDec = function(value){
        return Math.round(value * 10) / 10;
      };

      var myApp.utils.roundTwoDec = function(value){
        return Math.round(value * 100) / 100;
      };

      var myApp.utils.FormatCurrency = function(number) {
        return (new Intl.NumberFormat('en-EN', {style: 'currency', currency: 'USD' }).format(number))
      }

      var myApp.utils.FormatPercent = function(number) {
    		return (number.toFixed(2) + " %")
    	}
})()


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
