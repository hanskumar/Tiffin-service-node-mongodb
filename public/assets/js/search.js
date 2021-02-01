



$(document).on('change','.filter',function(){

      
    $("#filter_rest").submit();
      return false;

      console.log($("input[type='checkbox']").val());


      

      $.ajax({
        type: 'GET',
        url: '/search',
         data: {

        }, 
        dataType: 'application/x-www-form-urlencoded',
        success: function(response) { 
          //window.location.reload(true);
        },
        error: function(errorThrown) {
          //window.location.reload(true);
        },
    });

	
});