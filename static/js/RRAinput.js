myApp.rra = {}

myApp.rra.rraList = []; //Rental Rate Assumptions list

(function(){
  RRAlist = myApp.rra.rraList;

  myApp.rra.RRAInput = function(){
		var remSpcChr = myApp.utils.remSpcChr;
		var pInt = myApp.utils.pInt;
		var pFloat = myApp.utils.pFloat;
		var nanCheck = myApp.utils.nanCheck
		var roundOneDec = myApp.utils.roundOneDec
		var roundTwoDec = myApp.utils.roundTwoDec
		var FormatCurrency = myApp.utils.FormatCurrency
		var FormatPercent = myApp.utils.FormatPercent
		// Calculates row data for Rental Rate Assumptions -------------------------------------------
		var totalUnits = parseInt($('.total_units', this).val());
		var avgSFPerUnit = parseInt($(".avg_sf_per_unit", this).val());
		var rentPerUnit = parseInt($(".rent_per_unit", this).val());
		var totalSF = totalUnits*avgSFPerUnit;
		var rentPerSF = rentPerUnit/avgSFPerUnit;
		$('.total_sf', this).text(nanCheck(totalSF).toLocaleString());
		$('.rent_per_sf', this).text(FormatCurrency(nanCheck(rentPerSF)));



		// Calculates column sum data for Rental Rate Assumptions -------------------------------------------
		var $tu = $('#Rental_Rate_Assumptions tbody .total_units');
		var $tsf = $('#Rental_Rate_Assumptions tbody .total_sf');
		var $rrow = $('#Rental_Rate_Assumptions tbody .rent_row');

		var sumTotalUnits = 0;
		var sumTotalSF = 0;
		var spListRPU = 0;

		//calculates total value: Total Units
		$tu.each(function(){
			sumTotalUnits = sumTotalUnits + parseInt(remSpcChr($(this).val()));
		});

		//calculates total value: Total SF
		$tsf.each(function(){
			sumTotalSF = sumTotalSF + parseInt(remSpcChr($(this).text()));
		});

		//calculates total value: Rent Per Unit
		$rrow.each(function(){
			var numUnits = $(this).find('.total_units').val();
			var rentUnits = $(this).find('.rent_per_unit').val();
			spListRPU = spListRPU + (numUnits * rentUnits);
		});

		//creates an array of arrays for all the Projected Rent rows and stores the array in the global "g" object
		$rrow.each(function(){
			var tempProjectRents = $(this).find('.proj_rents').val();
			var tempNumUnits = $(this).find('.total_units').val();
			var tempAvgSFPerUnit = $(this).find('.avg_sf_per_unit').val();
			var tempRentUnits = $(this).find('.rent_per_unit').val();
			var rraObjTemp = {tempProjectRents: tempProjectRents,
							 tempNumUnits: tempNumUnits,
							 tempAvgSFPerUnit: tempAvgSFPerUnit,
							 tempRentUnits: tempRentUnits
						 	};
			RRAlist.push(rraObjTemp);
		});

		var sumAvgSFPerUnit = sumTotalSF/sumTotalUnits; 	//calculates total value: Avg SF Per Unit
		spListRPU = spListRPU/sumTotalUnits; 				//calculates total value: Rent Per Unit
		var sumRentPerSF = spListRPU/sumAvgSFPerUnit;		//calculates total value: Rent Per SF

		//appends total values to dashboard

		$('#Rental_Rate_Assumptions tfoot .total_units').text(nanCheck(sumTotalUnits).toLocaleString());
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(nanCheck(sumTotalSF).toLocaleString());
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(Math.round(nanCheck(sumAvgSFPerUnit)).toLocaleString());
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(FormatCurrency(nanCheck(sumRentPerSF)));
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(FormatCurrency(nanCheck(spListRPU)));

		$("td:contains('NaN')").each(function() {
			$(this).text('0');
		});

	};
//END RENTAL RATE ASSUMPTIONS Table calculations=======================================================================



})();
