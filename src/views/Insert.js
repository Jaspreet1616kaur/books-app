import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { v4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import { Container } from "@mui/system";
// type DataArr = {
//   title: string;
//   author: string;
//   price: number;
//   moral: string;
//   id: number;
// };
// type DatasArr = DataArr[];

function Insert() {
  const { user } = useAuth();
  const redirectTo = useNavigate();

  //image upload
  const [imageUpload, setImageUpload] = useState(null);

  //insert data in firebase

  const [contact, setContact] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    writer: "",
  });

  const handeleChange = async (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  const addBook = async (e) => {
    e.preventDefault();

    try {
      if (imageUpload == null) {
        console.log("please upload Image");

        return;
      } else {
        const imageRef = ref(storage, `book-images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((res) => {
          getDownloadURL(res.ref).then((url) => {
            console.log("upload in firestore");
            const newContact = {
              ...contact,
              author: user.uid,
              image: url,
              id: Math.random(),
            };

            const docRef = addDoc(collection(db, "books"), newContact);
            redirectTo("/");
            console.log("Document written with ID: ", docRef.id);
          });
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="border p-8 mt-8 bg-light" style={{ height: "500" }}>
      <>
        <CardHeader sx={{ backgroundColor: "#e63946", color: "white" }} />
        <Container>
          <div>
            <label htmlFor="">Image</label>

            <input
              type="file"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
          </div>

          <h2>Add Book</h2>

          <div className="form-group">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={contact.title}
              onChange={handeleChange}
            />
          </div>

          <div>
            <label htmlFor="">price</label>

            <input
              type="text"
              name="price"
              value={contact.price}
              onChange={handeleChange}
              placeholder="price"
            />
          </div>

          <div>
            <label htmlFor="">writer</label>
            <input
              type="text"
              name="writer"
              value={contact.writer}
              onChange={handeleChange}
              placeholder="writer"
            />

            <button onClick={addBook}>Submit</button>
          </div>
          <Button color="warning" href="/">
            go to back Home
          </Button>
        </Container>
      </>
    </div>
  );
}
export default Insert;
