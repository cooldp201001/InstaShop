import axios from "axios";
import React, { useState, useEffect } from "react";
  
const PromotionalSection = () => {

    const [randomProducts,setRandomProducts]= useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

   
    //function to get random products from DB forthe promotional section
    const getRandomProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/random/products');
            const products = response.data;
            setRandomProducts(products);
            setError(false);
            setLoading(false);

        }
        catch{
            setError("failed to fetch products");
            setLoading(false);

        }
    }
   // calling useEffect to get random products
   useEffect(()=>{
    getRandomProducts();
   },
   [])
   
   // show loading while fatching the data
   if (loading) {
    return <h1>Loading...</h1>
   }

  return (
    <section className="promotional-section my-1 mt-5 bg-secondary rounded mx-4 p-3 promotionalSection">
        {/* Showing error */}
        {error && <h3 className="text-dander">{error}</h3>}
      <div className="container">
        <h2 className="text-center ">Exclusive Deals & Offers</h2>
        <div id="promotionCarousel" className="carousel slide" data-bs-interval="false" >
          <div className="carousel-inner">
            {randomProducts.map((product, index) => (
              <div className={` position-relative carousel-item ${index === 0 ? "active" : ""}`} key={index} style={{height:"35rem"}}>
                <img src={product.thumbnail} className="d-block mx-auto " alt={product.title} style={{ height: "30rem",}} />
                <div className="carousel-caption d-none d-md-block position-absolute bottom-0 ">
                  <h5>{product.title}</h5>
                  <p>{product.description}</p>
                  <a href={`/product/${encodeURIComponent(product.id)}`} className="btn btn-primary">Shop Now</a>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#promotionCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#promotionCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <style>{` .promotionalSection {
     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
    
`}</style>
    </section>
  
  );
};

export default PromotionalSection;
