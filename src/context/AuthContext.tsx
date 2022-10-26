import { setDoc, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

//just for practicd

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEmailAlreadyExists, setIsEmailAlreadyExists] =
    useState<boolean>(false);
  const [alertText2, setAlertText2] = useState<string>("");
  const [alerTxt1, setAlerTxt1] = useState<string>("");
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dbUsers, setDbUsers] = useState<any>(null);
  const [dbUserId, setDbUserId] = useState<string>("");
  const redirectTo = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          // displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // -------------  Sign Up  FB & FS) ------------- start //
  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("userCredential: ", userCredential);
    } catch (err: any) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setIsEmailAlreadyExists(true);
        setOpenAlert(true);
        setAlerTxt1(
          "This email already registered. Please try with another email."
        );
      }
      console.log("error in signup in Context: ", err);
    }
  };
  // -------------  Sign Up  FB & FS) ------------- ends //

  // // ------------- Login User (FB) ------------- start //
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // setUser(userCredential.user);
    } catch (err: any) {
      if (err.message === "Firebase: Error (auth/user-not-found).") {
        setIsEmailAlreadyExists(false);
        setOpenAlert(true);
        setAlerTxt1("This email is not exists. Please try with another email.");
      }
      console.log(
        "err: ",
        err.message === "Firebase: Error (auth/user-not-found)."
      );
    } finally {
      setLoading(false);
    }
  };
  // // ------------- Login User ------------- ends //

  // // ------------- Logout User ------------- start //
  const logout = async () => {
    setUser(null);
    await signOut(auth);
    redirectTo("/login");
  };

  const getDBUsers = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setDbUsers({ ...docSnap.data(), id: docSnap.id });
      } else {
        setDoc(docRef, {
          authId: user.uid,
          email: user.email,
          likes: [],
          cart: [],
        });
        console.log("No such document!");
      }
    } catch (err) {
      console.log("error in updateProfile:", err);
    }
  };

  useEffect(() => {
    if (user) getDBUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        openAlert,
        setOpenAlert,
        alertText2,
        setAlertText2,
        alerTxt1,
        setAlerTxt1,
        dialogTitle,
        setDialogTitle,
        getDBUsers,
        dbUsers,
        dbUserId,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
