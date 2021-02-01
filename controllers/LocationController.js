//var NodeGeocoder = require('node-geocoder');

const axios = require('axios');

exports.reverse_geocode = async (req,res) => {

    let latitude= req.query.lat;
    let longitude= req.query.long;
   
    //=================Fist method Using node-geocoder Modeule=================//
   /*  var options = {
        provider: 'opencage',
        httpAdapter: 'https', // Default
        apiKey: '1be0b755f7cf4a45ab2e55c8f26b6f06', // for Mapquest, OpenCage, Google Premier
        //apiKey: 'AIzaSyBd-Ls7mEe1fCrjJVd0q3lpqZrH3WMfObA', //google api key
        formatter: 'json' // 'gpx', 'string', ...
    };
  
    var geocoder = NodeGeocoder(options);
    geocoder.reverse({lat:latitude, lon:longitude})
        .then(function(result) {
            res.status(200).json({
                'result': 'success',
                'response_code': 200,
                'data':result
            });
        })
        .catch(function(err) {
            console.log(err);
            res.status(400).json({
                'response': {
                    'result': 'failed',
                    'response_code': 400,
                    'data':err
                }
            });
        }); */

        //Method-2=================Using node Request Modeule=================//

        const response = await axios.get('https://eu1.locationiq.com/v1/reverse.php?key=908c0442946dc8&lat='+latitude+'&lon='+longitude+'&format=json')

            //console.log('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //console.log('body:', body); // Print the HTML for the Google homepage.

            /* .then(function (response) {
                // handle success
                console.log(response);
            })
              .catch(function (error) {
                // handle error
                console.log(error);
            }) */

            try {
                
                console.log(response.data);
 
                let userLocation = { 
                    location : response.data.display_name, 
                    lat : latitude,
                    long : longitude,
                }
                res.cookie("userLocation",userLocation);
    
                res.status(response.status).send({
                    'result': 'success',
                    'statusCode': response.status,
                    'data':response.data
                }); 

              } catch (error) {
                console.error(error);
              }
        
}