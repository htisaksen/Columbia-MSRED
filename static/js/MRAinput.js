myApp.mra = {}

myApp.mra.MRAlist = [];

(function(){

  //updated all #Rental_Rate_Assumptions_T for Proforma testing
  //updated all #Rental_Rate_Assumptions_T for Proforma testing
  //updated all #Rental_Rate_Assumptions_T for Proforma testing
  //updated all #Rental_Rate_Assumptions_T for Proforma testing
  //updated all #Rental_Rate_Assumptions_T for Proforma testing


  MRAlist = myApp.mra.MRAlist;
  var $tu = $('#Rental_Rate_Assumptions_T tbody .total_units');
  var $tsf = $('#Rental_Rate_Assumptions_T tbody .total_sf');
  var $rrow = $('#Rental_Rate_Assumptions_T tbody .rent_row');
  //MARKET RENTAL ASSUMPTIONS Table calculations=======================================================================
  	myApp.mra.MRAInput = function(){
  		//creates an array of arrays for all the Market Rent Assumption rows and stores the array in the global "g" object
  		var $mraRow = $('#Market_Rental_Assumptions_T tbody .year_row');
  		$rrow.each(function(){
  			tempMktRentRevenue = $(this).find('.mkt_rent_revenue').val();
  			tempMktRentExpenses = $(this).find('.mkt_rent_expenses').val();
  			tempMktRentVacancy = $(this).find('.mkt_rent_vacancy').val();
  			tempMktRentConcessions = $(this).find('.mkt_rent_concessions').val();
  			tempMktRentCreditLoss = $(this).find('.mkt_rent_credit_loss').val();
  			var mraObjTemp = {tempMktRentRevenue,
  							 tempMktRentExpenses,
  							 tempMktRentVacancy,
  							 tempMktRentConcessions,
  							 tempMktRentCreditLoss};
  			MRAlist.push(mraObjTemp);
  		});
  	};
  //END OF MARKET RENTAL ASSUMPTIONS Table calculations=======================================================================




})();
