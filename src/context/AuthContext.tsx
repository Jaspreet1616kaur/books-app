import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AsyncResource } from "async_hooks";
import { display } from "@mui/system";

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
  // const [openSnackBar, setOpenSnackBar] = useState(false);
  const [dbUsers, setDbUsers] = useState<any>(null);
  const [dbUserId, setDbUserId] = useState<string>("");
  const redirectTo = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  // ------------- Check if User Online / Logged in ------------- ends //

  // -------------  Sign Up  FB & FS) ------------- start //
  const signup = async (email: string, password: string, fullname: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      insertDoc("users", {
        authId: userCredential.user.uid,
        email: userCredential.user.email,
      });
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
    redirectTo("/");
  };

  // ------------- Logout User ------------- ends //

  const insertDoc = async (collect: any, data: any) => {
    try {
      const docRef = await addDoc(collection(db, collect), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // // ------------- insertDoc FS ------------- ends //

  //here i will check likes

  // const handleLike = async (bookId: string) => {
  //   const userRef = doc(db, "users", dbUsers.id);
  //   console.log("dbUsers", dbUsers);
  //   if (dbUsers.liked && !dbUsers.liked.includes(bookId)) {
  //     await updateDoc(userRef, {
  //       liked: arrayUnion(bookId),
  //     });
  //   } else {
  //     await updateDoc(userRef, {
  //       liked: arrayRemove(bookId),
  //     });
  //   }
  //   getDBUsers();
  // };

  const getDBUsers = async () => {
    try {
      const colRef = collection(db, "users");
      // queries
      const q = query(colRef, where("email", "==", user && user.email));

      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setDbUserId(doc.id);
          // console.log("doc.data(): ", doc.data());
          setDbUsers({ ...doc.data(), id: doc.id });
          // setEditedUserData({ ...doc.data(), id: doc.id });
        });
      });
    } catch (err) {
      console.log("error in updateProfile:", err);
    }
  };

  useEffect(() => {
    if (user) getDBUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log("user", user && user);
  console.log("openAlert: ", openAlert);
  console.log("isEmailAlreadyExists: ", isEmailAlreadyExists);
  console.log("UserId: ", dbUserId);
  console.log("dbUsers", dbUsers && dbUsers);

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
        insertDoc,
        getDBUsers,
        dbUsers,
        dbUserId,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
