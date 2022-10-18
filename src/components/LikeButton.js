

// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import { IconButton } from "@mui/material";
// import { useAuth } from "../context/AuthContext";

// function LikeButton({ id}) {
//   console.log("props", bookId);
//   const { dbUsers, handleLike } = useAuth();
//   console.log("dbUsers", dbUsers?.liked);

//   const handleOnClick = () => {
//     handleLike(bookId);
//   };

//   return (
//     <div>
//       <IconButton onClick={handleOnClick}>
      //   {!dbUsers.liked && !dbUsers.liked.includes(bookId) ? (
      //     <FavoriteOutlinedIcon color="error" />
      //   ) : (
      //     <FavoriteBorderOutlinedIcon />
      //   )}
      // </IconButton>
//     </div>
//   );
// }

// export default LikeButton;

import React from "react";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import {  db } from "../firebase/config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function LikeButton({ id, likes }) {
  const {user } = useAuth();
 console.log('user', user)

  const likesRef = doc(db, "books", id);

  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      }).then(() => {
          console.log("unliked");
      }).catch((e) => {
            console.log(e);
      });
    }
    else{
        updateDoc(likesRef,{
            likes:arrayUnion(user.uid)
        }).then(() => {
            console.log("liked");
        }).catch((e) => {
              console.log(e);
        });
    }
  };


  return (
      <div>
      <IconButton onClick={handleLike}>
     !likes?includes(user.uid) ? (
          <FavoriteOutlinedIcon color="error" />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )
       
      </IconButton>
    </div>
  );
}