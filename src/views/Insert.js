import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { v4 } from "uuid";

import { collection, addDoc } from "firebase/firestore";



// type DataArr = {
//   title: string;
//   author: string;
//   price: number;
//   moral: string;
//   id: number;
// };
// type DatasArr = DataArr[];

function Insert() {
  //image upload
  const [imageUpload, setImageUpload] = useState(null);
  console.log("IMAGEUPLOAD :>> ", imageUpload);
  //insert data in firebase

  const [contact, setContact] = useState({
    title: "",
    author: "",
    moral: "",
    price: "",
    image: "",
  });

  const handeleChange = async (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  const addBook = async (e) => {
    e.preventDefault();

    if (imageUpload == null) {
      return;
    }
    const imageRef = ref(storage, `book-images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((res) => {
      console.log("res", res);
      getDownloadURL(res.ref).then((url) => setImageUpload(url));
      alert("image uploaded");
    });

    console.log("upload in firestore");
    console.log("IMAGEUPLOAD :>> ", imageUpload);

    const newContact = {
      ...contact,
      image: imageUpload,
      id: Math.random()
    };

    try {
      const docRef = await addDoc(collection(db, "books"), newContact);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (


    <div className="border p-3 mt-3 bg-light" style={{ position: "fixed" }}>

<>
<div>

 <label htmlFor="">Image</label>

      <input
          type="file"
          onChange={(e) => {
             setImageUpload(e.target.files[0])
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
              onChange={ handeleChange}
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
        <label htmlFor="">Author</label>
<input
          type="text"
          name="moral"
          value={contact.moral}
          onChange={handeleChange}
          placeholder="moral"
        />
      <button onClick={addBook}>Submit</button>

      </div>

      </>

</div>

 )
}
export default Insert;
