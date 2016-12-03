var services = {};
services.saveDashboard = function(args){
  $.ajax({
    method: 'POST',
    url: '/savedata',
    data: args,
    success: function(response) {
    }
  })
};

services.updateDashboard = function(args){
  $.ajax({
    method: 'POST',
    url: '/updatedata',
    data: args,
    success: function(response) {
    }
  })
};
