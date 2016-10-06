var services = {};
var object1 = {key:value}
services.saveDashboard = function(args){
  console.log(args)
  $.ajax({
    method: 'POST',
    url: '/savedata',
    data: args,
    success: function(response) {
      console.log(response)
    }
  })
};
