import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Button } from "@mui/material";

export default function CartButton({ bookId }) {
  const { user, dbUsers, getDBUsers } = useAuth();

  const handleCart = () => {
    const cartRef = doc(db, "users", user.uid);

    if (dbUsers?.cart && !dbUsers.cart.includes(bookId)) {
      updateDoc(cartRef, {
        cart: arrayUnion(bookId),
      })
        .then(() => {
          console.log("books add in cart");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(cartRef, {
        cart: arrayRemove(bookId),
      })
        .then(() => {
          console.log("removed");
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getDBUsers();
  };

  console.log("dbUsers", dbUsers);
  return (
    <div>
      <Button
        variant="contained"
        style={{ width: "50%", marginBottom: "20px" }}
        onClick={handleCart}
      >
        {dbUsers?.cart && dbUsers.cart.includes(bookId) ? (
          <RemoveShoppingCartIcon />
        ) : (
          <AddShoppingCartIcon />
        )}
      </Button>
    </div>
  );
}
