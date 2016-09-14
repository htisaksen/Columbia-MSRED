$(document).ready(function(){
	console.log("Jquery ready to roll!");

	$('#calc_submit').on('submit', function(event){
		console.log('submitted clicked=============')
		('#Purchase_Price').attr(100);
		('#Purchase_Price').val(100);
	});

	var counter = 1;
	var testprint = "<input type='text' name='proj_rents_"+counter+"' id='proj_rents_"+counter+"'>";
	console.log(testprint);
			
	$("#rental_rate_form").on('submit',(function(event) {
		console.log('clicked add_rental_rates button');
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/dashboard',
			success: function(response) {
				$('#Rental_Rate_Assumptions').find('tbody')
					.append($('<tr>')
						.append($('<td>')
							.html("<input type='text' name='proj_rents_"+counter+"' id='proj_rents_"+counter+"'>")
							)
						.append($('<td>')
							.text('Test text here we are!')
							)
					)
			} // end success
		}) //end ajax
	}));

}) //end of doc