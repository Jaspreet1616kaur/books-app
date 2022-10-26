import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CartButton from "../components/CartButton";
function WatchCartItem() {
  const { dbUsers } = useAuth();
  const [books, setBooks] = useState(null);

  const getBooks = async () => {
    const booksArray = [];
    try {
      const querySnapshot = await getDocs(collection(db, "books"));

      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        booksArray.push({ ...doc.data(), bookId: doc.id });
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
    setBooks(booksArray);
  };
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="footer">
      {books &&
        books.map(
          (book) =>
            dbUsers.cart.includes(book.bookId) && (
              <Card
                sx={{
                  maxWidth: 370,
                  marginTop: "1em",
                }}
              >
                <CardHeader
                  title={book.title}
                  sx={{ backgroundColor: "#e63946", color: "#3946e6" }}
                />

                <CardMedia
                  component="img"
                  height="300"
                  image={book.image}
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
                    <CartButton bookId={book.bookId} />
                  </Container>
                </Container>
              </Card>
            )
        )}
    </div>
  );
}

export default WatchCartItem;
