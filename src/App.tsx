import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AuthContextProvider } from "./context/AuthContext";
import Contact from "./views/Contact";

import Data from "./views/Data";

import Insert from "./views/Insert";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Data />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
