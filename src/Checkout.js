import React from 'react';
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {

    const [{basket}, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://m.media-amazon.com/images/S/sonata-images-prod/US_HHM21_Marketing_Images/d648c3a1-e6a6-49fb-ad67-5e6c7d0c7539._UR3000,600_SX1500_FMwebp_.jpeg" alt="" className="checkout__ad" />
            
                <div>
                    <h2 className="checkout__title">
                        Your Shopping Basket
                    </h2>

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

            <div className="checkout__right">
                <Subtotal />
            </div>

        </div>
    
    );
}

export default Checkout;
