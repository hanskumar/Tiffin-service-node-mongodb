
import { placeOrder } from './ApiService.js'

export async function initStripe() {

        //alert("hello");

        var stripe = Stripe("pk_test_51IAvhfIaHrlYfPz87hBXOjCK1W1jQz7gR9q6pwtUR7SpjFA03KphDuriafON4SrAIn9O3dB5JmRL6sqsSQ0ic98E00FvLctr3N");
        const elements = stripe.elements();
        var style = {
            base: {
              color: "#32325d",
              fontFamily: 'Arial, sans-serif',
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "#32325d"
              }
            },
            invalid: {
              fontFamily: 'Arial, sans-serif',
              color: "#fa755a",
              iconColor: "#fa755a"
            }
          };

        var card = elements.create('card', { style, hidePostalCode: true });

        card.mount('#card-element'); 

        //=============Place order function using ajax IN Javascript=====================
        const paymentForm = document.querySelector('#payment-form');
        if(paymentForm) {
            paymentForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                let formData = new FormData(paymentForm);
                let formObject = {}
                for(let [key, value] of formData.entries()) {
                    formObject[key] = value
                    //console.log(key);
                }

                console.log(formObject);
                
                //if (!card) {
                    // Ajax
                    /* placeOrder(formObject);
                    return; */
                
                //=====verify Card============
                stripe.createToken(card).then(function(result) {
                    // Handle result.error or result.token
                    console.log(result);

                    formObject.stripeToken = result.token.id;
                    placeOrder(formObject);

                }).catch((error) => {

                    console.log(error);

                });
                
            })
        }


}

