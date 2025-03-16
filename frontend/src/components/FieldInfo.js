import React, { useState } from "react";
import "./FieldInfo.css";
import infoSendMiddleware from "../middlewares/infoSendMiddleware";

const FieldInfo = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await response.json();
    setUserData(data);

    infoSendMiddleware((set) => {
      set({ type: "user-fetching", payload: data });
    })(() => ({ userId, userData: data }));
  };

  return (
    <div className="input-container">
      <h1>Mayer Check</h1>
      <p style={{ fontSize: 16 }}>Get full info about any person you want</p>
      <input
        type="text"
        className="input-field"
        placeholder="Enter the ID of the person you're looking for..."
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      {userData && (
        <div>
          <p>User ID: {userData.id}</p>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>Address: {userData.address}</p>
        </div>
      )}
      <button className="input-button" onClick={handleGetUser}>
        Get person information
      </button>
    </div>
  );
};

export default FieldInfo;
