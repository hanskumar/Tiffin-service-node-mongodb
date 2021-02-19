
import { initStripe } from './stripe.js'

initStripe(); 



$('body').on('click', '._3p8Mf', function (){
    const address_id=  $(this).attr("data-id");
    alert(address_id);

    $clicked_btn = $(this);
    $.ajax({
      type: 'POST',
      data: { address_id: address_id},
      //contentType: 'application/json',
      url: '/maket-it-default',						
      success: function(data) {
          
          if(data.success == true){
              window.location.href = '/checkout';
          }
      }
    });
});

/* $('body').on('click', '.payment_option', function (){
    // alert(e.target.dataset);
     //alert(e.target.dataset['option']);
     const address_id=  $(this).attr("data-option");
     alert(address_id);
}); */