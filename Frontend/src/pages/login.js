import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Alert } from "@mui/material";
const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    (async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        const user = { email, password };
        const res = await axios
          .post("http://localhost:8080/users/login", user)
          .catch((err) => {
            setError(err.response.data.message);
            console.log(err);
          });
        if (res) {
          alert("Login Succesfull");
          localStorage.setItem("profile", JSON.stringify(res.data.result));
          navigate("/");
        }
      }
    })();
    setIsSubmit(false);
  }, [formErrors]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formValues = { email, password };
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Please enter an email !";
    }
    if (!values.password) {
      errors.password = "Please enter password !";
    }
    return errors;
  };

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login">
      <form className="LoginForm" onSubmit={handleSubmit}>
        {error && (
          <Alert
            severity="error"
            onClose={() => {
              setError(null);
            }}
          >
            {error}
          </Alert>
        )}
        <div className="LoginHeading">Login Form</div>
        <label htmlFor="Email">
          <p>Email</p>
        </label>
        <input
          type="text"
          id="Email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
            let formErr = formErrors;
            delete formErr[`email`];
            setFormErrors(formErr);
          }}
        ></input>
        {formErrors.email && (
          <p className="validation-error">{formErrors.email}</p>
        )}
        <label htmlFor="Password">
          <p>Password</p>
        </label>
        <input
          type="password"
          id="Password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
            let formErr = formErrors;
            delete formErr[`password`];
            setFormErrors(formErr);
          }}
        ></input>
        {formErrors.password && (
          <p className="validation-error">{formErrors.password}</p>
        )}
        <button className="LgnBtn" type="submit">
          Login
        </button>
        <div className="NotUser">
          <p>Don't have an account? Register Here</p>
          <Link to="/register">
            <button className="RegBtn">Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
