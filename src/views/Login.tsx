import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AlertDialogSlide from "../context/AlertDialogSlide";

const Login = () => {
  const redirectTo = useNavigate();
  const { user, login, alerTxt1 } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    console.log(user);
    try {
      await login(data.email, data.password);
      redirectTo("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log("data: ", data);
  return (
    <div
      style={{
        width: "40%",
        margin: "30px auto",
      }}
    >
      <h2>Log in:</h2>

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>

      <AlertDialogSlide
        dialogTitle="Allert"
        text1={alerTxt1}
        buttonTxt1={"Close"}
      />
      <p>
        Don't have an account yet?{" "}
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "9a031e",
            fontWeight: "bold",
          }}
        >
          <span> Register here</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
