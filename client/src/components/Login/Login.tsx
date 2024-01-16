import { useContext, useState } from 'react';
import { Credentials, UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import "./Login.css"
import { motion } from 'framer-motion';

const Login = () => {
  const userContext = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!userContext) {
    return <div>Loader...</div>;
  }

  const { login } = userContext;

  const handleLogin = () => {
    const credentials: Credentials = {
      email,
      password,
    };
    login(credentials);
  }

  return (
    <div className='login-wrapper'>
      <h3>Logga in</h3>
      <div className="form-wrapper">
        <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Lösenord' onChange={(e) => setPassword(e.target.value)}/>
        <motion.button 
          onClick={handleLogin}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>Logga in
        </motion.button>
        <div className="text-wrapper">
          <p>Inte medlem? Skapa konto</p>
          <span><Link to="/register">här</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login;
