import React, { useState } from "react";
import "../app.css";
import { db } from "../firebase/config";
import { addDoc, collection,  } from "firebase/firestore";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoader(true);

    const docRef = await addDoc(collection(db, "contact"), {
        name: "",
        message:"",
        phone:"",
      });
      console.log("Document written with ID: ", docRef.id);
    }
  return (
  
    <form className="form" onSubmit={handleSubmit}>
 
      <h1>Contact Us 🤳</h1>

      <label>Name</label>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

<label>Phone Number</label>
      <textarea
        placeholder="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      ></textarea>

      <label>Message</label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>


      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
      >
        Submit
      </button>
   
    </form>
  );
};

export default Contact;