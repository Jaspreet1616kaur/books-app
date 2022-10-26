import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import CardData from "../components/CardData";

function Data() {
  const { user } = useAuth();
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

  //here is delete BOOKS
  const delBook = async (dbUserId) => {
    // console.log("dbUserId: ", dbUserId);
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        await deleteDoc(doc(db, "books", dbUserId));
        getBooks();
        console.log("book deleted succesfully");
      } catch (err) {
        console.log("only you deleted your upload post  ");
      }
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  //#e63946
  return (
    <div className="footer">
      {books &&
        user &&
        books.map((element) => {
          console.log("element", element);
          return (
            <>
              <CardData
                image={element.image}
                author={element.author}
                bookId={element.bookId}
                writer={element.writer}
                title={element.title}
                price={element.price}
                delBook={delBook}
              />
            </>
          );
        })}
    </div>
  );
}

export default Data;
