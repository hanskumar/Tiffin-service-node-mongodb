$('body').on('click', '.add-to-cart', function (){
    const item_id=  $(this).attr("data-id");
    alert(item_id);
    $clicked_btn = $(this);
    $.ajax({
      type: 'POST',
      data: { id: item_id},
      //contentType: 'application/json',
      url: '/add-to-cart',						
      success: function(data) {

          if(data.success == true){
            //$clicked_btn.removeClass('add_to_wishlist');
            //$clicked_btn.addClass('remove_from_wishlist');
            $('.badge-success').html(data.TotalQty);

            toastr.success("Item Added in Cart Successfully", "Success!", {timeOut: 5e3,showMethod:"slideDown",hideMethod:"slideUp"});
            /* setTimeout(function(){// wait for 5 secs(2)
              location.reload(); // then reload the page.(3)
            },2000);  */

          }

          //console.log(JSON.stringify(data));
      }
    });
});