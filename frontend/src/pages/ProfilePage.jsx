import React from 'react'
import axios from 'axios';
const ProfilePage = () => {

  const fetchProtectedData = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Protected data:", response.data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };
  fetchProtectedData();
  return (
    <div>profile page</div>
  )
}

export default ProfilePage