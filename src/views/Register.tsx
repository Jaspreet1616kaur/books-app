// export default Register;
import React, { useContext, useEffect, useState } from "react";

import AlertDialogSlide from "../context/AlertDialogSlide";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { signup, alerTxt1 } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  const redirectTo = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      await signup(data.email, data.password, data.fullname);
      redirectTo("login");
    } catch (err) {
      console.log("error in handleSignup:", err);
    }
  };

  // console.log('data', data);
  return (
    <div
      style={{
        width: "40%",
        margin: "30px auto",
      }}
    >
      <h1 className="text-center my-3 ">Signup</h1>
      <form onSubmit={handleSignup}>
        <label>Full Name</label>
        <input
          onChange={(e: any) =>
            setData({
              ...data,
              fullname: e.target.value,
            })
          }
          value={data.fullname}
          required
          type="fullname"
          placeholder="Enter fullname"
        />
        <label>Email address</label>
        <input
          onChange={(e: any) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          value={data.email}
          required
          type="email"
          placeholder="Enter email"
        />

        <label>Password</label>
        <input
          onChange={(e: any) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
          value={data.password}
          required
          type="password"
          placeholder="Password"
        />
        <button type="submit">SignUp</button>
      </form>
      <AlertDialogSlide
        dialogTitle="Alert"
        text1={alerTxt1}
        buttonTxt1={"Close"}
      />
    </div>
  );
};

export default Register;
