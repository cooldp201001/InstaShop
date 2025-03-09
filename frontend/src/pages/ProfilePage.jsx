import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/cartContext";
const ProfilePage = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
 const{setLoginStatus,loginStatus} = useContext(CartContext);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          withCredentials:true,
        });
        setUser(response.data);
        // console.log(response.data)
        setEditedUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

  
      fetchUserProfile();
    
  },[]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put("http://localhost:3000/user/profile", editedUser, {
        withCredentials:true,
      });
      setUser(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setEditedUser({
        ...editedUser,
        address: {
          ...editedUser.address,
          [addressField]: value,
        },
      });
    } else {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const handleLogout = async () => {
    try {
    const response =  await axios.post("http://localhost:3000/logout", {},{withCredentials:true});
        setLoginStatus(false);
        navigate('/'); // Redirect to home page
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded border-0">
        <div className="text-center">
      
          <h3 className="mt-3">
           
            {  user?.name}
          
          </h3>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6">
            <p>
              <i className="fa-solid fa-envelope"></i> 
            </p>
            <p className="text-muted">
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                user?.email
              )}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <i className="fa-solid fa-phone"></i>
            </p>
            <p className="text-muted">
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phone || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                user?.phone || "Not provided"
              )}
            </p>
          </div>
          <div className="col-md-12 mt-3">
            <p>
              <i className="fa-regular fa-address-card"></i>
            </p>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="address.street"
                  placeholder="Street"
                  value={editedUser.address?.street || ""}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="address.landmark"
                  placeholder="Landmark"
                  value={editedUser.address?.landmark || ""}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="address.city"
                  placeholder="City"
                  value={editedUser.address?.city || ""}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="address.state"
                  placeholder="State"
                  value={editedUser.address?.state || ""}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="address.postalCode"
                  placeholder="Postal Code"
                  value={editedUser.address?.postalCode || ""}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="address.country"
                  placeholder="Country"
                  value={editedUser.address?.country || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            ) : (
              <p className="text-muted">
                {user?.address?.street &&
                  `${user.address.street}, ${user.address.landmark}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}, ${user.address.country}`}
                {!user?.address?.street && "Not provided"}
              </p>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          {isEditing ? (
            <>
              <button className="btn btn-success me-3" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline-primary me-3" onClick={handleEdit}>
                Edit Profile
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;