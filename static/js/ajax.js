var services = {};
services.saveDashboard = function(args){
  console.log(args)
  $.ajax({
    method: 'POST',
    url: '/savedata',
    data: args,
    success: function(response) {
      console.log("Successfully saved data in this response: ",response)
    }
  })
};
