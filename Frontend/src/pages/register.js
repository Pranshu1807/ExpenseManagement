import React, { useState, useEffect } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formValues = { name, email, password };
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Please enter a name !";
    }
    if (!values.email) {
      errors.email = "Please enter an email !";
    }
    if (!values.password) {
      errors.password = "Please enter password !";
    }
    if (values.password && values.password.length < 8) {
      errors.password = "Password should be atleast 8 alphabets !";
    }
    return errors;
  };

  useEffect(() => {
    (async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        const user = { name, email, password };
        const res = await axios
          .post("https://expensee-tf9c.onrender.com/users/register", user)
          .catch((err) => {
            if (err.response.data.code === 11000)
              return setFormErrors({
                ...formErrors,
                email: "This email id already exists !",
              });
            if (err.response.data.name === "ValidationError")
              return setFormErrors({
                ...formErrors,
                email: "Please enter a valid email !",
              });
            alert("Failed to register");
            console.log(err.response);
          });
        if (res) {
          alert("Signup Succesfull");
          localStorage.setItem("profile", JSON.stringify(res.data.result));
          navigate("/");
        }
      }
    })();
    setLoading(false);
    setIsSubmit(false);
  }, [formErrors]);
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register">
      <form className="RegisterForm" onSubmit={handleSubmit}>
        <div className="RegisterHeading">Register Form</div>
        <label htmlFor="Name">
          <p>Name</p>
        </label>
        <input
          type="text"
          id="Name"
          name="name"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            let formErr = formErrors;
            delete formErr[`${e.target.name}`];
            setFormErrors(formErr);
            setLoading(false);
          }}
        ></input>
        {formErrors.name && (
          <p className="validation-error">{formErrors.name}</p>
        )}
        <label htmlFor="Email">
          <p>Email</p>
        </label>
        <input
          type="text"
          name="email"
          id="Email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            let formErr = formErrors;
            delete formErr[`${e.target.name}`];
            setFormErrors(formErr);
            setLoading(false);
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
          name="password"
          id="Password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            let formErr = formErrors;
            delete formErr[`${e.target.name}`];
            setFormErrors(formErr);
            setLoading(false);
          }}
        ></input>
        {formErrors.password && (
          <p className="validation-error">{formErrors.password}</p>
        )}
        <button className="RegisterBtn" type="submit">
          {loading ? "Signing you up..." : "Register"}
        </button>
        <div className="alreadyReg">
          <p>Already Registered? Login Here</p>
          <Link to="/login">
            <button className="LoginBtn">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
