import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Container, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import LikeButton from "../components/LikeButton";



function Data(){
  
  // const { id } = useNavigate();
  const [books, setBooks] = useState(null);

  const {user,id , dbUserId } = useAuth();
  console.log("dbUserId: ", dbUserId);

  const getBooks = async () => {
    const booksArray = [];
    try {
      const querySnapshot = await getDocs(collection(db, "books"));

      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
        booksArray.push(doc.data());
      });
   
    } catch (error) {
      console.log("error :>> ", error);
    }
    setBooks(booksArray);


  };


  useEffect(() => {
    getBooks();
  }, []);




  console.log("books :>> ", books);

;
  return (
    <div>
      {books &&
        books.map((element) => {
          console.log("element", element);
          return (
            <>
            <Card sx={{ maxWidth: 345, marginTop: "2em" }}>
      <CardHeader
        title={element.title}
        sx={{ backgroundColor: "#e63946", color: "white" }}
      />
      <CardMedia
          component="img"
          height="200"
          image={element.image}
          alt="game image"
        />
        <Container
        sx={{
          padding: "1em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
      <Container>
          <Typography variant="h5">{element.moral}</Typography>
          <Typography paragraph>PRICE:{element.price}$</Typography>
          <Typography paragraph>{element.author}</Typography>
          {/* <Container>{!dbUsers && <LikeButton bookId={element.bookId} />}</Container> */}
    
          <Container>  <LikeButton
           id={id} likes={element.likes} />
       
                   
</Container>




          <button type="submit" >Add to cart</button>
        
          </Container>


          </Container>
                    
        </Card>
            
            </>
          );
        })}
      
    </div>
    
    
  );
}


export default Data;
