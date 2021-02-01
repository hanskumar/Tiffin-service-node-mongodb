const deleteProduct = btn => {
    //const prodId = btn.parentNode.querySelector('[name=productId]').value;
    //const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    console.log("Clicked");    
   // const addres_id = $(this).attr('id');

    const addres_id = btn.getAttribute('data-id'); 
    console.log(addres_id);
 
    fetch('/get_address_data/'+addres_id, {
      method: 'GET',
      headers : new Headers(),
    })
      .then(result => {
          //console.log(result);
          return result.json();
      })
      .then((data) =>  console.log(data))
      .catch(err => {
        console.log(err);
        console.log("hellll");
      });
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

  $(".get_location").click(function () { //user clicks button
    alert("hello");
    console.log("hkhkhkhk");
    return false;
    if ("geolocation" in navigator){ //check geolocation available 
      //try to get user current location using getCurrentPosition() method
          navigator.geolocation.getCurrentPosition(function(position){ 
                  //$("#demo").html("Found your location <br />Lat : "+position.coords.latitude+" </br>Lang :"+ position.coords.longitude);
                  
                  $.ajax({
                      type: 'GET',
                      data: { lat: position.coords.latitude,long: position.coords.longitude},
                      url: '/reverse-geocode',						
                      success: function(response) {
                          //console.log(response);
                          if(response.result == 'success'){
                              
                              d = JSON.parse(response.data);
                              console.log(d.display_name);
  
                              $(".delivery_address").val(d.display_name);
                              window.location.href = '/addresses';
                          }
                      }
                  });
        });
    }else{
      console.log("Browser doesn't support geolocation!");
      }
  });




  