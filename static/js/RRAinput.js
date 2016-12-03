myApp.rra = {}

myApp.rra.rraList = []; //Rental Rate Assumptions list

(function(){
  RRAlist = myApp.rra.rraList;


  // utilities for calculations
  var remSpcChr = myApp.utils.remSpcChr;
  var pInt = myApp.utils.pInt;
  var pFloat = myApp.utils.pFloat;
  var nanCheck = myApp.utils.nanCheck;
  var roundOneDec = myApp.utils.roundOneDec;
  var roundTwoDec = myApp.utils.roundTwoDec;
  var FormatCurrency = myApp.utils.FormatCurrency;
  var FormatPercent = myApp.utils.FormatPercent;

  // Sets variables for column sum data for Rental Rate Assumptions -------------------------------------------
  var $tu = $('#Rental_Rate_Assumptions tbody .total_units');
  var $tsf = $('#Rental_Rate_Assumptions tbody .total_sf');
  var $rsf = $('#Rental_Rate_Assumptions tbody .rent_per_sf')
  var $rrow = $('#Rental_Rate_Assumptions tbody .rent_row');


  myApp.rra.RRAInput = function(){

		// Calculates row data for Rental Rate Assumptions -------------------------------------------
		var totalUnits = parseInt($('.total_units', this).val());
		var avgSFPerUnit = parseInt($(".avg_sf_per_unit", this).val());
		var rentPerUnit = parseInt($(".rent_per_unit", this).val());
		var totalSF = totalUnits*avgSFPerUnit;
		var rentPerSF = rentPerUnit.toFixed(2)/avgSFPerUnit.toFixed(2);

		$('.total_sf', this).text(nanCheck(totalSF).toLocaleString());
		$('.rent_per_sf', this).text(FormatCurrency(nanCheck(rentPerSF.toFixed(2))));

    //initialize sums
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

		//creates an object for all the Projected Rent rows and stores the array in the global "g" object
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
		var RentPerSF = spListRPU.toFixed(3)/sumAvgSFPerUnit.toFixed(3);		//calculates total value: Rent Per SF
		//appends total values to dashboard

		$('#Rental_Rate_Assumptions tfoot .total_units').text(nanCheck(sumTotalUnits).toLocaleString());
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(nanCheck(sumTotalSF).toLocaleString());
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(Math.round(nanCheck(sumAvgSFPerUnit)).toLocaleString());
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(FormatCurrency(nanCheck(RentPerSF.toFixed(3))));
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(FormatCurrency(nanCheck(spListRPU)));

		$("td:contains('NaN')").each(function() {
			$(this).text('0');
		});

	};

  myApp.rra.OnLoad = function(){

    var sumTotalUnits = 0;
    var sumTotalSF = 0;
    var spListRPU = 0;
    var tsfCounter = 1;
    var rsfCounter = 1;
    var total_square_foot = 0;

    //calculates tsf on load
    $tsf.each(function(){
      parseInt($(this).text(nanCheck($('#total_units'+tsfCounter).val()*$('#avg_sf_per_unit'+tsfCounter).val()).toLocaleString()));
      total_square_foot += parseInt(remSpcChr($(this).text()))
      tsfCounter +=1;
    });
    tsfCounter = 0;

    //calculate rsf on load
    $rsf.each(function(){
      parseInt($(this).text(FormatCurrency($('#rent_per_unit'+rsfCounter).val()/$('#avg_sf_per_unit'+rsfCounter).val())));
      rsfCounter +=1;
    });
    rsfCounter = 0;

    //calculate totals
    $('th.total_sf').text(total_square_foot.toLocaleString());
    $('th.avg_sf_per_unit').text(parseInt(remSpcChr($('th.total_sf').text())/$('th.total_units').text()).toLocaleString())
    $('th.rent_per_sf').text(FormatCurrency(remSpcChr($('th.rent_per_unit').text())/remSpcChr($('th.avg_sf_per_unit').text())))
    $('#prop_info_total_sq_ft').text($('th.total_sf').text())
  };
//END RENTAL RATE ASSUMPTIONS Table calculations=======================================================================



})();
