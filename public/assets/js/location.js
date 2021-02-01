
/* var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}
 */

$(".locate-me").click(function () { //user clicks button

	if ("geolocation" in navigator){ //check geolocation available 
		//try to get user current location using getCurrentPosition() method
		    navigator.geolocation.getCurrentPosition(function(position){ 
                //$("#demo").html("Found your location <br />Lat : "+position.coords.latitude+" </br>Lang :"+ position.coords.longitude);
                
                $.ajax({
                    type: 'GET',
                    data: { lat: position.coords.latitude,long: position.coords.longitude},
                    url: '/reverse-geocode',						
                    success: function(response) {
                        console.log(response);
                        //return false;
                        if(response.result == 'success'){
                            
                            //d = JSON.parse(response.data);
                            console.log(response.data.display_name);

                            $(".complete_address").val(response.data.display_name);
                            window.location.href = '/restaurants';
                        }
                    }
                });
			});
	}else{
		console.log("Browser doesn't support geolocation!");
    }
});