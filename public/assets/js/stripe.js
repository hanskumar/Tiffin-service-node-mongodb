
import { placeOrder } from './ApiService.js'
import { CardWidget } from './cardWidget.js'

export async function initStripe() {

        var stripe = Stripe("pk_test_51IAvhfIaHrlYfPz87hBXOjCK1W1jQz7gR9q6pwtUR7SpjFA03KphDuriafON4SrAIn9O3dB5JmRL6sqsSQ0ic98E00FvLctr3N");

        let card = null;

        //=============Place order function using ajax IN Javascript=====================
        const paymentForm = document.querySelector('#payment-form');
        const payment_option = document.querySelector('.payment_option');

        if(!payment_option) {
            return;
        }
        payment_option.addEventListener('click' , (e)=> {
          if(payment_option.getAttribute('data-option') == 'Card') {
                // Display Widget
              card = new CardWidget(stripe);
              card.mount();
          } else {
              alert("COD Selected");
              card.destroy();
              let card = null;
          } 
        })

        if(paymentForm) {
            paymentForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                let formData = new FormData(paymentForm);
                let formObject = {}
                for(let [key, value] of formData.entries()) {
                    formObject[key] = value
                    //console.log(key);
                }
                
                if (!card) {
                    // Ajax call
                    placeOrder(formObject);
                    return; 
                }

                //=====Create Token============
                const token = await card.createToken()
                formObject.stripeToken = token.id;
                placeOrder(formObject);
                
            })
        }


}

