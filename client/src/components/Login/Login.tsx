import { useContext, useState } from 'react';
import { Credentials, UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import "./Login.css"

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <button onClick={handleLogin}>Logga in</button>
        <div className="text-wrapper">
        <p>Inte medlem? Skapa konto</p><span><Link to="/register">här</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login