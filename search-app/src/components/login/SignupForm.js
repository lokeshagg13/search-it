import { useEffect, useRef, useState } from "react";

import axios from "../../api/axios";
import Notification from "../ui/Notification";

import classes from "./SignupForm.module.css";

const SIGNUP_URL = "/api/user/signup";

// Sign up or registration form
function SignupForm() {
  const nameRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [signupRemarks, setSignupRemarks] = useState("");

  // On load of component, set focus on name input
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // Whenever signupStatus becomes "error" (in case of any failure), make signupStatus and signupRemarks as ""
  // in order to make the error notification disappear after 5 seconds
  useEffect(() => {
    if (
      signupStatus === "error" &&
      !signupRemarks.includes("Passwords do not match")
    ) {
      const timer = setTimeout(() => {
        setSignupStatus("");
        setSignupRemarks("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [signupStatus, signupRemarks]);

  // Whenever signup status or passwords are changed, (Used for telling user whether the password and passwordConfirm field matches or not)
  // It is useful because the password is hidden even while entering
  useEffect(() => {
    if (signupStatus === "success") return;
    if (password.trim() === "" || passwordConfirm.trim === "") {
      setSignupStatus("");
      setSignupRemarks("");
      return;
    }
    if (password === passwordConfirm) {
      setSignupStatus("");
      setSignupRemarks("");
    } else {
      setSignupStatus("error");
      setSignupRemarks("Passwords do not match!");
    }
  }, [signupStatus, password, passwordConfirm]);

  // Handle sign up by sending register request to backend server
  async function handleSignup(event) {
    event.preventDefault();

    // Check if email is correct
    if (
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm.test(email) === false
    ) {
      setSignupStatus("error");
      setSignupRemarks("Invalid email");
      return;
    }

    setSignupStatus("pending");
    setSignupRemarks("Registering your details...");
    try {
      // Axios request to backend server for registration
      await axios.post(
        SIGNUP_URL,
        JSON.stringify({ name, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSignupStatus("success");
      setSignupRemarks("Registration successful ");

      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      // Handling errors from server end 
      setSignupStatus("error");
      if (!error?.response) {
        setSignupRemarks("No server response !!!");
      } else if (error.response?.status === 409) {
        setSignupRemarks("Email is already registered with us !!!");
      } else {
        setSignupRemarks("Registration failed !!!");
      }
    }
  }

  // Signup form
  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            autoComplete="off"
            ref={nameRef}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password2">Reenter Password</label>
          <input
            type="password"
            id="password2"
            value={passwordConfirm}
            autoComplete="off"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        {signupRemarks && (
          <Notification type={signupStatus} message={signupRemarks} />
        )}
        <div className={classes.actions}>
          <button>Create Account</button>
          {/* <Link to="/login">Already Registered? Login here</Link> */}
        </div>
      </form>
    </section>
  );
}

export default SignupForm;
