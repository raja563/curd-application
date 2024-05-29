import React, { useEffect, useState } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/getAll");
      setUsers(response.data);
    };

    fetchData();
  }, []);

  // delete user
  const deleteUser = async (userId) => {
    await axios
    //ye apke backend se data ko remove karega
      .delete(`http://localhost:8000/api/v1/deleteUser/${userId}`)
      .then((response) => {
        // ye apke frontend se data ko remmove krega
        setUsers((prevUser)=>prevUser.filter((user)=>user._id!==userId));
        console.log(response);
        toast.error(response.data.msg,{position:"top-right"});
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.fname} {user.lname}
                </td>
                <td>{user.email}</td>
                <td className="actionButton">
                  <button onClick={() => deleteUser(user._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/edit/` + user._id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
