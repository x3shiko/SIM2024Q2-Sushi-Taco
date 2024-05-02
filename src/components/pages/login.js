import React, { useState } from 'react';
import SnTLogo from '../../assets/SnTLogo.png';
import { useHistory } from 'react-router-dom';
import { signInController } from '../../controller';

const Alert = ({ type, message }) => {
    // Alert function
    let alertClasses = 'my-2 px-4 py-2 rounded-md';
    switch (type) {
      case 'success':
        alertClasses += ' bg-green-500 text-white';
        break;
      case 'error':
        alertClasses += ' bg-red-500 text-white';
        break;
      default:
        alertClasses += ' bg-gray-500 text-white';
    }
  
    return (
      <div className={alertClasses}>
        <p>{message}</p>
      </div>
    );
  };

const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
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
    
        const handleSubmit = (e) => {
            e.preventDefault();
            //login logic here
            signInController.signIn(email,password).then(() => {
              console.log("Successfully login")
              history.push('/dbhome');
            }).catch((error) => {
              handleShowAlert()
              console.log(error)
            })
        };

    return (
        <div id="login" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 border rounded-md border-10 border-blue-300">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"><a href="/" smooth={true} duration={500}>Welcome
                    <img className="h-12 w-auto mx-auto mt-2 block" src={SnTLogo} alt="Logo" />
                    </a></h2>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700"></label>
                        <input type="email" id="email" placeholder='Email' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={email} onChange={handleEmailChange} required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700"></label>
                        <input type="password" placeholder='Password' id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Login</button>
                </form>
                {showAlert && (
                        <Alert type="error" message="Wrong email/password" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;