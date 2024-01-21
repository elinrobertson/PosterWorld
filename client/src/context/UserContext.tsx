import { createContext, PropsWithChildren, useState, ReactNode } from "react";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie';

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
  login: (credentials: Credentials) => Promise<void>;
  register: (userData: UserRegistrationData) => Promise<void>;
  logout: () => Promise<void>;
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

  async function login(credentials: Credentials): Promise<void> {
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
        Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Sätt användarcookie
        navigate("/"); // Omdirigera till startsidan efter lyckad inloggning
      }
    } catch (error) {
      console.error("Fel:", error);
      setLoggedinUser(null);
    }
  }

  async function register(userData: UserRegistrationData): Promise<void> {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Valfritt: hantera registreringssuccé här
        const registeredUser: User = await response.json();
        console.log("Användaren har registrerats:", registeredUser);
        // Du kan automatiskt logga in användaren efter registreringen
        login({ email: userData.email, password: userData.password });
      } else {
        // Hantera registreringsfel
        console.error("Registrering misslyckades");
      }
    } catch (error) {
      console.error("Fel:", error);
    }
  }

  async function logout(): Promise<void> {
    try {
      console.log("Loggar ut användaren:", loggedinUser);

      if (loggedinUser) {
        Cookies.remove('user'); // Ta bort användarcookie
        setLoggedinUser(null);
        navigate("/");
        console.log("Användaren har loggats ut");
      } else {
        console.log("Ingen användare är inloggad.");
      }
    } catch (error) {
      console.error("Fel vid utloggning:", error);
    }
  }

  return (
    <UserContext.Provider value={{ login, logout, register, loggedinUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
