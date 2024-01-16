import React, { useContext, useState } from 'react';
import { motion } from "framer-motion"
import { UserContext, UserRegistrationData } from '../../context/UserContext';

const Register: React.FC = () => {
    const { register } = useContext(UserContext);
    const [userData, setUserData] = useState<UserRegistrationData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value}));
    }

    const handleRegister = () => {
        register(userData);
    }

    return (
        <div className="login-wrapper">
          <h3>Registrera</h3>
          <div className="form-wrapper">
            <input type="text" name="firstName" placeholder="Förnamn" onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Efternamn" onChange={handleChange} />
            <input type="text" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Lösenord" onChange={handleChange} />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRegister}
            >
              Skapa
            </motion.button>
          </div>
        </div>
      );
    };


export default Register