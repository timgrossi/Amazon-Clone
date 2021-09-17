import React from 'react'
import "./Home.css";
import Product from './Product';


function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home__image" src="https://m.media-amazon.com/images/I/61hXa4DISOL._SX3740_.jpg" />

                <div className="home__row">
                    <Product
                        id="12314213" 
                        title='The Lean Startup'
                        price={29.99}
                        rating={3}
                        image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
                        
                    />
                    <Product
                        id="123132231"
                        title="Kenwood kMix Stand Mixer for Baking"
                        price={239.00}
                        rating={4}
                        image='https://m.media-amazon.com/images/I/61FJtVQh9bL._AC_SL1200_.jpg' />
                </div>

                <div className="home__row">
                    <Product
                        id="132132564"
                        title="Samsung LC 49' Curved LED Gaming Monitor"
                        price={199.99}
                        rating={4}
                        image='https://m.media-amazon.com/images/I/91ubktnbNVL._AC_SL1500_.jpg' />
                    <Product
                        id="455432456"
                        title="Amazon Echo (3rd Generation) | Smart Speaker with Alexa"
                        price={98.00}
                        rating={5}
                        image='https://target.scene7.com/is/image/Target/GUEST_3ae0a3d0-fd48-44fa-a5dc-4490af6c490b?wid=488&hei=488&fmt=pjpeg' />
                    <Product
                        id="131326546"
                        title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver"
                        price={598.99}
                        rating={4}
                        image='https://m.media-amazon.com/images/I/61DsXT1ldtL._AC_SL1500_.jpg' />                
                </div>

                <div className="home__row">
                <Product
                        id="658321554"
                        title="Samsung LC 49' Curved Gaming Monitor - Super Ultra Wide LED Gaming Monitor"
                        price={1094.98}
                        rating={5}
                        image='https://www.thesixthaxis.com/wp-content/uploads/2020/02/SamsungCRG9-Hero500-780x310.jpg' />
                </div>
            </div>
        </div>
    )
}

export default Home
