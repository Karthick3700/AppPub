import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  let [users, setUsers] = useState([]);

  return (
    <div className="App">
      <button
        onClick={async () => {
          let response = await axios.get("/getuser");
          setUsers(response.data);
          console.log(response);
        }}
      >
        Get Users
      </button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.maritalStatus}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
