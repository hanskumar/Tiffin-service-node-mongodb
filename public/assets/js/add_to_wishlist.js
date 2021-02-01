
$('body').on('click', '.add_to_wishlist', function (){
    const restaurant_id=  $(this).attr("data-id");
    $clicked_btn = $(this);
    $.ajax({
      type: 'POST',
      data: { restaurant_id: restaurant_id},
      //contentType: 'application/json',
      url: '/add_to_wishlist',						
      success: function(data) {
          
          if(data.success == true){
            $clicked_btn.removeClass('add_to_wishlist');
            $clicked_btn.addClass('remove_from_wishlist');
            $clicked_btn.children('.icofont-heart').addClass('text-danger');
            //$clicked_btn.children('.icofont-heart').html('Favourited');
            toastr.success("Added To wishlist Successfully", "Success!", {timeOut: 5e3,showMethod:"slideDown",hideMethod:"slideUp"});
          }

          //console.log(JSON.stringify(data));
      }
    });
});


$('body').on('click', '.remove_from_wishlist', function (){
  const restaurant_id=  $(this).attr("data-id");
  $clicked_btn = $(this);
  $.ajax({
    type: 'POST',
    data: { restaurant_id: restaurant_id},
    //contentType: 'application/json',
    url: '/remove_from_wishlist',						
    success: function(data) {
        console.log(data.success);
        if(data.success == true){
          $clicked_btn.removeClass('remove_from_wishlist');
          $clicked_btn.addClass('add_to_wishlist');
          $clicked_btn.children('.icofont-heart').removeClass('text-danger');
          //$clicked_btn.children('.icofont-heart').html('Favourite');
          toastr.success("Remove from wishlist Successfully", "Success!", {timeOut: 5e3,showMethod:"slideDown",hideMethod:"slideUp"});
        }
    }
  });
});