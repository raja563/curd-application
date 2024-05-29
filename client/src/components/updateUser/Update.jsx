import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../addUser/add.css";
import axios from "axios";
import toast from "react-hot-toast";

const Update = () => {
  const users = {
    fname: "",
    lname: "",
    email: ""
  };

  const navigate=useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(users);

  const inputHander = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/getUser/${id}`)
      .then((response) => {
        // console.log(response);
        setUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  },[id]);

//   to handle the submit after getting the value from backend
const submitHandler=async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/v1/update/${id}`,user)
    .then((response)=>{
      toast.success(response.data.msg,{position:"top-right"})
      console.log(response);
      navigate('/')

    }).catch(error=>console.log(error));

}

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitHandler}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            value={user.fname}
            onChange={inputHander}
            placeholder="Enter first name"
            id="fname"
            autoComplete="off"
            name="fname"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            value={user.lname} // ye update karte smay value ko from me show karta hai 
            onChange={inputHander}
            placeholder="Enter last name"
            id="lname"
            autoComplete="off"
            name="lname"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={inputHander}
            placeholder="Enter email"
            id="email"
            autoComplete="off"
            name="email"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
};

export default Update;
