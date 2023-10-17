import { useState, useEffect } from "react";
import "./App.css";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "./FormValidation";
import KUTE from "kute.js";

function App() {
  const [users, setUsers] = useState([]);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  
  const handleLogout = () => {
    setLoginSuccess(false);
  };


  //Function for login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email,password } = user;
    const username = users.find((u) => u.email === email).username;
    const firstname = users.find((u) => u.email === email).firstname;
    const lastname = users.find((u) => u.email === email).lastname;
    console.log(email,username,password);
    console.log(users);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    console.log(email,password,username,firstname,lastname)
    if (!emailValidation.isValid) {
      setLoginErrorMessage(emailValidation.errorMessage);
      return;
    }

    if (!passwordValidation.isValid) {
      setLoginErrorMessage(passwordValidation.errorMessage);
      return;
    }

    setLoginErrorMessage(""); // Clear any previous error messages

    const loggedInUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (loggedInUser) {
      setLoginSuccess(true); // Set login success to true
      setFullName(firstname + " " + lastname);
      setUserName(username);
      setEmail(email);
      setUser({
        email: "",
        password: "",
      });
    } else {
      alert("Login Failed: Invalid email or password");
    }
  };


  //Function for signup
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, username, email, password } = user;
    console.log(firstname,lastname,username,email,password);
    const fullname = firstname + " " + lastname;
    console.log(fullname);
    const firstNameValidation = validateName(firstname);
    const lastNameValidation = validateName(lastname);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    if (!emailValidation.isValid) {
      setSignupErrorMessage(emailValidation.errorMessage);
      return;
    }
  
    if (!passwordValidation.isValid) {
      setSignupErrorMessage(passwordValidation.errorMessage);
      return;
    }
    if (!firstNameValidation.isValid) {
      setSignupErrorMessage(firstNameValidation.errorMessage);
      return;
    }
    if (!lastNameValidation.isValid) {
      setSignupErrorMessage(lastNameValidation.errorMessage);
      return;
    }
  
    setSignupErrorMessage(""); // Clear any previous error messages
  
    const isUserExists = users.some((u) => u.email === email);
  
    if (isUserExists) {
      setSignupErrorMessage("User with this email already exists!");
    } else {
      const newUser = { firstname, lastname, username, email, password };
      setUsers([...users, newUser]);
      alert("User registered successfully!");
    }
    console.log(user);
    setUser({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    });
  };
  
  //Blob Animation
  useEffect(() => {
    const tween = KUTE.fromTo(
      "#blob1",
      { path: "#blob1" },
      { path: "#blob2" },
      { repeat: 999, duration: 5000, yoyo: true }
    );
    tween.start();
  }, []);

  //Scroll to login form if user logs out
  useEffect(() => {
    if (!loginSuccess) {
      const loginForm = document.getElementById("loginForm");
      loginForm.scrollIntoView({ behavior: "smooth" });
    }
  }, [loginSuccess]);

  //Scroll to success message if user logs in
  useEffect(() => {
    if (loginSuccess) {
      // Scroll to the success message
      const successMessage = document.getElementById("loginSuccessMessage");
      successMessage.scrollIntoView({ behavior: "smooth" });
    }
  }, [loginSuccess]);

  return (
    <>
      <section className="blob-content">
        <svg
          className="blob-motion"
          id="visual"
          viewBox="0 0 900 600"
          width="900"
          height="600"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <g transform="translate(448.8719709995089 328.3618421607432)">
            <path
              id="blob1"
              d="M186.3 -174.4C231.1 -141.4 250 -70.7 236.7 -13.3C223.4 44.1 177.8 88.2 133 113.2C88.2 138.2 44.1 144.1 1.2 142.9C-41.7 141.7 -83.4 133.4 -131.9 108.4C-180.4 83.4 -235.7 41.7 -238.5 -2.8C-241.4 -47.4 -191.8 -94.8 -143.3 -127.8C-94.8 -160.8 -47.4 -179.4 11.7 -191C70.7 -202.7 141.4 -207.4 186.3 -174.4"
              fill="#ffeba7"
            ></path>
          </g>
          <g
            transform="translate(435.7697159615436 287.18496562323526)"
            style={{ visibility: "hidden" }}
          >
            <path
              id="blob2"
              d="M117.5 -121.7C146.8 -88.2 161.4 -44.1 174.7 13.3C188 70.7 200.1 141.4 170.8 178.6C141.4 215.8 70.7 219.4 10.3 209.1C-50.2 198.9 -100.4 174.7 -125.4 137.6C-150.4 100.4 -150.2 50.2 -154.8 -4.6C-159.4 -59.4 -168.8 -118.8 -143.8 -152.3C-118.8 -185.8 -59.4 -193.4 -7.7 -185.7C44.1 -178.1 88.2 -155.2 117.5 -121.7"
              fill="#ffeba7"
            />
          </g>
        </svg>
      </section>

      <div className="section" id="loginForm">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <form onSubmit={handleLoginSubmit}>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                value={user.email}
                                onChange={(e) =>
                                  setUser({ ...user, email: e.target.value })
                                }
                                name="logemail"
                                className="form-style"
                                placeholder="Your Email"
                                id="logemail"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                value={user.password}
                                onChange={(e) =>
                                  setUser({ ...user, password: e.target.value })
                                }
                                className="form-style"
                                placeholder="Your Password"
                                id="logpass"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button href="#" className="btn mt-4" type="submit">
                              submit
                            </button>
                            <p
                              className="error-message"
                              style={{ color: "red" }}
                            >
                              {loginErrorMessage}
                            </p>
                          </form>
                          <p
                            className="mb-0 mt-4 text-center"
                            style={{ visibility: "hidden" }}
                          ></p>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <form onSubmit={handleSignupSubmit}>
                            <div className="form-group mt-2">
                            <input
                                type="text"
                                value={user.firstname}
                                onChange={(e) =>
                                  setUser({ ...user, firstname: e.target.value })
                                }
                                name="logname"
                                className="form-style"
                                placeholder="Your First Name"
                                id="signUpFirstName"
                                autoComplete="off"
                              />
                              
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                            <input
                                type="text"
                                value={user.lastname}
                                onChange={(e) =>
                                  setUser({ ...user, lastname: e.target.value })
                                }
                                name="logname"
                                className="form-style"
                                placeholder="Your Last Name"
                                id="signUpLastName"
                                autoComplete="off"
                              />
                              
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            
                            <div className="form-group mt-2">
                            
                              <input
                                type="text"
                                value={user.username}
                                onChange={(e) =>
                                  setUser({ ...user, username: e.target.value })
                                }
                                name="logname"
                                className="form-style"
                                placeholder="Your Username"
                                id="signUpUsername"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                name="logemail"
                                value={user.email}
                                onChange={(e) =>
                                  setUser({ ...user, email: e.target.value })
                                }
                                className="form-style"
                                placeholder="Your Email"
                                id="signUpEmail"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                value={user.password}
                                onChange={(e) =>
                                  setUser({ ...user, password: e.target.value })
                                }
                                className="form-style"
                                placeholder="Your Password"
                                id="signUpPassword"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button href="#" className="btn mt-4">
                              submit
                            </button>
                            <p
                              className="error-message"
                              style={{ color: "red" }}
                            >
                              {signupErrorMessage}
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      {loginSuccess && (
        <div id="loginSuccessMessage" className="success-message">
          <img src="/img/doge.png" alt="doge" style={{ width: "200px" }} />
          <h1>Login Successful!</h1>
          <p>Thank you for logging in, {fullName}!</p>
          <p>Username: {userName}</p>
          <p>Email: {email}</p>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
    </>
  );
}

export default App;
