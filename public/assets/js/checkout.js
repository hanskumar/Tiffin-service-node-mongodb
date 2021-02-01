$('body').on('click', '._3p8Mf', function (){
    const address_id=  $(this).attr("data-id");
    /* alert(address_id);
    return false; */
    $clicked_btn = $(this);
    $.ajax({
      type: 'POST',
      data: { address_id: address_id},
      //contentType: 'application/json',
      url: '/update_cart_info',						
      success: function(data) {
          
          if(data.success == true){
            window.location.href = '/checkout';
          }

          //console.log(JSON.stringify(data));
      }
    });
});