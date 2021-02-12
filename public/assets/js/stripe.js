//import axios from 'axios';
//import { loadStripe } from '@stripe/stripe-js'

import {loadStripe} from '@stripe/stripe-js';

export async function initStripe() {

        alert("hello");

        //const stripe = await loadStripe('pk_test_51IAvhfIaHrlYfPz87hBXOjCK1W1jQz7gR9q6pwtUR7SpjFA03KphDuriafON4SrAIn9O3dB5JmRL6sqsSQ0ic98E00FvLctr3N');

        const stripe = await loadStripe('pk_test_51IAvhfIaHrlYfPz87hBXOjCK1W1jQz7gR9q6pwtUR7SpjFA03KphDuriafON4SrAIn9O3dB5JmRL6sqsSQ0ic98E00FvLctr3N');

        const elements = stripe.elements();

        card = elements.create('card', { style, hidePostalCode: true });

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

                //if (!card) {
                    // Ajax
                    /* placeOrder(formObject);
                    return; */

                    axios.post('/place-order', formObject).then((res) => {
                        console.log(res);
                    }).catch((err)=> {
                        console.log(err);
                    })

                //}

                const token = await card.createToken()
                formObject.stripeToken = token.id;
                placeOrder(formObject);


                // // Verify card
                // stripe.createToken(card).then((result) => {
                //     formObject.stripeToken = result.token.id;
                //     placeOrder(formObject);
                // }).catch((err) => {
                //     console.log(err)
                // })

            })
        }


}

