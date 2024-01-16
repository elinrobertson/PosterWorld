import { createContext, PropsWithChildren, useState, ReactNode } from "react";
import { useNavigate } from "react-router";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}

interface UserContextProps {
  loggedinUser: User | null;
  login: (credentials: Credentials) => void;
}

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

function UserProvider({ children }: PropsWithChildren<ReactNode>) {
  const [loggedinUser, setLoggedinUser] = useState<User | null>(null);
  const navigate = useNavigate();

  async function login(credentials: Credentials) {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const user: User = await response.json();
        setLoggedinUser(user);
        console.log("Användaren har loggats in:", user);
        navigate("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function register(userData: UserRegistrationData) {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Optionally, you can handle the registration success here
        const registeredUser: User = await response.json();
        console.log("Användaren har registrerats:", registeredUser);
        // You might want to automatically log in the user after registration
        login({ email: userData.email, password: userData.password });
      } else {
        // Handle registration failure
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <UserContext.Provider value={{ login, register, loggedinUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
