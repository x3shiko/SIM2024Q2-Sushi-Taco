import React, { useState, useEffect } from "react";
import SnTLogo from "../../assets/SnTLogo.png";
import { useHistory } from "react-router-dom";
import { signInController } from "../../controller";

const Alert = ({ type, message }) => {
  // add or remove visibility of alert
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [type, message]);

  if (!isVisible) return null;
  // Alert function
  let alertClasses = "my-2 px-4 py-2 rounded-md";
  switch (type) {
    case "success":
      alertClasses += " bg-green-500 text-white";
      message = "Successfully logged in!";
      break;
    case "error":
      alertClasses += " bg-red-500 text-white";
      message = "Wrong email/password";
      break;
    case "Suspend":
      alertClasses += " bg-red-500 text-white";
      message = "Your account has been suspended.";
      break;
    default:
      alertClasses += " bg-gray-500 text-white";
      message = "Unknown account";
  }

  return (
    <div className={alertClasses}>
      <p>{message}</p>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //login logic here
    try {
      // Attempt to sign in
      const userData = await signInController.signIn(email, password);
      if (userData.role == "admin" || userData.role == "Admin") {
        if (userData.status == "Suspend") {
          //check for suspend
          setLoginState("Suspend");
          handleShowAlert();
        } else {
          history.push("/dbhome");
        }
      } else if (userData.role == "buyer" || userData.role == "Buyer") {
        if (userData.status == "Suspend") {
          //check for suspend
          setLoginState("Suspend");
          handleShowAlert();
        } else {
          history.push("/DBBuyerHome");
        }
      } else if (userData.role == "seller" || userData.role == "Seller") {
        if (userData.status == "Suspend") {
          //check for suspend
          setLoginState("Suspend");
          handleShowAlert();
        } else {
          history.push("/dbsellerhome");
        }
      } else if (userData.role == "Real Estate Agent") {
        if (userData.status == "Suspend") {
          //check for suspend
          setLoginState("Suspend");
          handleShowAlert();
        } else {
          history.push("/dbrealhome");
        }
      } else {
        setLoginState("");
        handleShowAlert();
      }
      // If sign-in is successful, do something with userCredential
    } catch (error) {
      setLoginState("error");
      handleShowAlert();
      console.error("Sign-in failed:", error.message);
    }
  };

  return (
    <div
      id="login"
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8 p-10 border rounded-md border-10 border-blue-300">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            <a href="/" smooth={true} duration={500}>
              Welcome
              <img
                className="h-12 w-auto mx-auto mt-2 block"
                src={SnTLogo}
                alt="Logo"
              />
            </a>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Login
            </button>
          </form>
          {/* add datatype into Alert type={data} as of now theres only success/error/Suspend */}
          {/* please change the alert function type on top */}
          {showAlert && <Alert type={loginState} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
