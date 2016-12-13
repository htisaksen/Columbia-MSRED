
// ============================================================================================================
// Utility Functions
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
        $("th:contains('NaN')").each(function() {
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

      //credit to: http://stackoverflow.com/questions/15089151/javascript-irr-internal-rate-of-return-formula-accuracy
      myApp.utils.IRRCalc = function(CArray) {
        min = -1.0;
        max = 1.0;
        c = 0;
        do {
          guest = (min + max) / 2;
          NPV = 0;
          for (var j = 0; j < CArray.length; j++) {
                NPV += CArray[j] / Math.pow((1 + guest), j);
          }
          if (NPV > 0) {
            min = guest;
            c++;
          } else {
            max = guest;
            c++;
          }
          if(c >= 15){
            return guest * 100;
          }
        } while(Math.abs(NPV) > 0.000001);
         return guest * 100;
      }

      myApp.utils.debounce = function(func, wait, immediate) {
      	var timeout;
      	return function() {
      		var context = this, args = arguments;
      		var later = function() {
      			timeout = null;
      			if (!immediate) func.apply(context, args);
      		};
      		var callNow = immediate && !timeout;
      		clearTimeout(timeout);
      		timeout = setTimeout(later, wait);
      		if (callNow) func.apply(context, args);
      	};
      };

})();

// ============================================================================================================
// NPV with G Sheet:       12,265,011.36

// -1.01 NPV with UL_IRR:  12,265,374.62
// min 0 NPV with UL_IRR:  12,266,501.39
// -0.8 NPV with UL_IRR:   12,263,034.9
// -0.9 NPV with UL_IRR:   12,262,515.06
// min -1 NPV with UL_IRR: 12,264,767.96 *** closest to G Sheet NPV
// -1.1 NPV with UL_IRR:   12,264,594.64
