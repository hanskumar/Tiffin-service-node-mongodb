const Add_to_wishlist = btn => {
    console.log("Clicked");    
    const restaurant_id = btn.getAttribute('data-id'); 
    console.log(restaurant_id);

    //return false;


    var parameters = { restaurant_id: restaurant_id};
    console.log(parameters);
    //return false;
    $.get( '/add_to_wishlist', parameters, function(data) {
      console.log("whee!")
    });
 
    /* fetch('/add_to_wishlist/'+restaurant_id, {
      method: 'POST',
      headers : new Headers(),
    })
      .then(result => {
          console.log(result);
          return result.json();
      })
      .then((data) =>  console.log(data))
      .catch(err => {
        console.log(err);
        console.log("hellll");
      }); */
  };



  const delete_address = btn => {
    //const prodId = btn.parentNode.querySelector('[name=productId]').value;
    //const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    console.log("Removed");    
    
    if (confirm("Are you sure?")) {
        // do delete; use var id to delete data

    const address_id = btn.getAttribute('address-id'); 
    console.log(address_id);

    const addressElement = document.getElementById("add_repeat_"+address_id)
    console.log(addressElement);
 
    fetch('/delete_address/'+address_id, {
      method: 'DELETE',
      headers : new Headers(),
    })
      .then(result => {
          console.log(result);
          //return result.json();
      })
      .then(data => {
        console.log(data);
        //productElement.parentNode.removeChild(productElement);

        document.getElementById("add_repeat_"+address_id).remove();
      })
      .catch(err => {
        console.log(err);
        console.log("hellll");
      });
    }
  };
  