import React, { createContext, useState, PropsWithChildren } from "react";
import { useNavigate } from "react-router";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserContext {
  login: (credentials: Credentials) => void;
}

export interface Credentials {
  email: string;
  password: string;
}

export const UserContext = createContext<UserContext | undefined>(undefined);

function UserProvider({ children }: PropsWithChildren<React.ReactNode>) {
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

  return (
    <UserContext.Provider value={{ login }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
