import React, { useEffect } from "react";
import { useState } from "react";
const CartPage = ({
  cartItems,
  handleRemoveFromCart,
  handleUpdateQuantity,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  //function to calculate total amount for a single item

  const handleTotalAmount = (price, quantity) => {
    const total = price * quantity;
    return Number(total.toFixed(2));
  };
  return (
    <div className="container mt-4">
      <h2 className="mx-auto mb-4 w-25">Cart Product List</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="card mb-3" key={item.id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid rounded-start"
                  />
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <p>
                      <b>Brand:</b> {item.brand}
                    </p>
                    <p>
                      {" "}
                      <b>Warranty Info:</b> {item.warrantyInformation}
                    </p>
                    <p>
                      {" "}
                      <b>Stock Status:</b> {item.availabilityStatus}
                    </p>
                    <p className="text-muted">
                      {" "}
                      <b>Category:</b> {item.category}
                    </p>
                    <p>
                      {" "}
                      <b>Price:</b> ${item.price}
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <label>
                        <b>Quantity:</b>{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control w-25"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4  d-flex flex-column justify-content-center align-items-center gap-3">
                  <button
                    className="btn btn-danger w-50"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove from Cart
                  </button>

                  <button
                    className="btn btn-info   w-50"
                  
                  > <a className="text-decoration-none text-white" href={`/product/${encodeURIComponent(item.id)}`}>View product</a>
                  </button>

                  <button
                    className="btn btn-success w-50"
                  
                  >
                    Buy now
                  </button>

                  <div>
                    <h5>
                      Total Amount :
                      {handleTotalAmount(item.price, item.quantity)}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <br />
          <div className="my-4">
            <h3>Total Cart Amount: ${getTotalAmount().toFixed(2)}</h3>
            <button
              className="btn btn-success w-25"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Buy All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
