import axios from "axios";
import { useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import "./Login.css";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [error, setError] = useState({});

  function handleInput(e) {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    setError(Validation(value));

    if (error.email === "" && error.password === "") {
      axios
        .post("http://localhost:8000/login", value)
        .then((res) => {
          if (res.status === 200) {
            navigate("/Books");
          } else {
            alert("NO record exists");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <div className="Container">
        <div className="Header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <form className="inputs" onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              onChange={handleInput}
            />
            {error.email && <span>{error.email}</span>}
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={handleInput}
            />
            {error.password && <span>{error.password}</span>}
            <input
              type="otp"
              name="otp"
              placeholder="Enter The sent otp on your Email"
              onChange={handleInput}
            />
            {error.email && <span>{error.email}</span>}
          </div>
          <div className="Submit-container">
            <button type="submit" className="Submit">
              Login
            </button>
            <button className="Submit" onClick={() => navigate("/")}>
              Create Your account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
