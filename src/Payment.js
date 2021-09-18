import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from "react-router-dom";
import axios from "./Axios";
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotal } from './Reducer';
import { useStateValue } from './StateProvider';
import { db } from './firebase';

function Payment() {
    const [{basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    
    const stripe = useStripe();
    const elements = useElements();
    
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProccessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('The SECRET IS >>>>>', clientSecret)

    const handleSubmit = async event => {
        // do all the fancy stripe stuff
        event.preventDefault();
        setProccessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
            .then(({ paymentIntent }) => {
                // paymentIntent = payment confirmation

                db.collection('users')
                    .doc(user?.uid)
                    .collection('orders')
                    .doc(paymentIntent.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created,
                    })

                setSucceeded(true);
                setError(null);
                setProccessing(false);

                dispatch({
                    type: 'EMPTY_BASKET'
                })

                history.replace('/orders')
            })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details

        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to ="/checkout">{basket?.length} items</Link>)
                </h1>

                {/* Payment Section - delivery addresss*/ }
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>

                </div>

                {/* Payment Section - Review Items*/ }
                <div className="payment__section">
                    
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    
                    <div className="payment__items">
                        {basket.map(item => (
                            
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            />

                        ))}
                    </div>

                </div>

                {/* Payment Section - Payment Method*/ }
                <div className="payment__section">
                    <h3>Payment Method</h3>
                
                    <div className="payment__details">
                            {/* Stripe goes here */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className="payment__priceContainer">
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value} </h3>

                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeperator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>
                                            {processing ? <p>Proccessing</p> :  "Buy Now"}
                                        </span>

                                    </button>
                                </div>

                                {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Payment
