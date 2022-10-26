import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function LikeButton({ bookId }) {
  const { user, dbUsers, getDBUsers } = useAuth();

  const handleLike = () => {
    const likesRef = doc(db, "users", user.uid);

    if (dbUsers?.likes && !dbUsers.likes.includes(bookId)) {
      updateDoc(likesRef, {
        likes: arrayUnion(bookId),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayRemove(bookId),
      })
        .then(() => {
          console.log("unliked");
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
      <IconButton onClick={handleLike}>
        {dbUsers?.likes && dbUsers.likes.includes(bookId) ? (
          <FavoriteOutlinedIcon color="error" />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </IconButton>
    </div>
  );
}
