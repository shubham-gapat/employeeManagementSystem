import React, { Component } from 'react';
import {Elements, CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js/pure";
import {saveStripeURL} from "../constants";
import {authAxios} from '../store/utility';


const stripePromise = loadStripe('pk_test_');
const checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

class CheckoutForm extends Component{
    constructor(props){
        super(props)
        this.state={
            error : null,
            email :''
        }
        const stripe = useStripe();
  const elements = useElements()
    }

    handleEmailChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    

    handleChange = (event) => {
        if (event.error) {
          this.setState({error:event.error.message});
        } else {
          this.setState({error:null});
        }
      }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        const elements = useElements()
        const stripe = useStripe();
        const card = elements.getElement(CardElement);
        const email = this.state.email
 
    const {paymentMethod, error} = await stripe.createPaymentMethod({
     type: 'card',
     card: card
        });

        authAxios
        .post(saveStripeURL, {
            email, payment_method_id: paymentMethod.id})
          .then(response => {
            console.log(response.data);
          }).catch(error => {
            console.log(error)
          })


      };
    
    render(){
        const{error, email}=this.state
        return(
            <form onSubmit={this.handleSubmit} className="stripe-form">
            <div className="form-row">
              <label htmlFor="email">Email Address</label>
              <input className="form-input" id="email" name="name"    type="email" placeholder="jenny.rosen@example.com" required 
        value={email} onChange={this.handleEmailChange} />
            </div>
            <div className="form-row">
              <label for="card-element">Credit or debit card</label> 
              <CardElement id="card-element" onChange={this.handleChange}/>
              <div className="card-errors" role="alert">{error}</div>
            </div>
            <button type="submit" className="submit-btn">
              Submit Payment
            </button>
          </form>
        )
        
    }
}


export default checkout;