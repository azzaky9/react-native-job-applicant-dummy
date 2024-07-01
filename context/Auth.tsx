import { useContext, createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "@/config/firebase";

export type TDataRegisterUser = {
  email: string;
  password: string;
  displayName: string;
};

interface User extends Omit<TDataRegisterUser, "password"> {
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  signup: (data: TDataRegisterUser) => Promise<User | null>;
  checkUserAvailable: () => User | null;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  // make state for keeping user credential
  const [user, setUser] = useState<User | null>(null);

  console.log("logged user: ", user);

  const logError = (code: number, message: string) => {
    console.log(`[${code}]: ${message}`);
  };

  const updateUser = (user: User) => {
    setUser({
      id: user.id,
      email: user.email,
      displayName: user.displayName
    });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser({
          id: user.uid,
          email: email,
          displayName: user.displayName || ""
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logError(errorCode, errorMessage);
      });

    return user;
  };

  const logout = async () => {
    console.log("logout");
  };

  const signup = async ({ email, password, ...rest }: TDataRegisterUser) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, {
          displayName: rest.displayName // Set the displayName or any other profile information here
        })
          .then(() => {
            console.log("Profile updated with displayName: ", rest.displayName);

            setUser({
              id: user.uid,
              email,
              displayName: rest.displayName
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            logError(errorCode, errorMessage);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logError(errorCode, errorMessage);
      });

    return user;
  };

  const checkUserAvailable = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const userData = {
          id: uid,
          email: user.email || "",
          displayName: user.displayName || ""
        };

        setUser(userData);
      }

      setUser(null);
    });

    return user;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, checkUserAvailable, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContext };
