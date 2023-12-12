import "./App.css";

import Books from "./Pages/Books";
import Author from "./Pages/Author";
import Publisher from "./Pages/Publisher";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Registration />}></Route>
          <Route path="/Login" exact element={<Login />}></Route>
          <Route path="/Books" exact element={<Books />}></Route>
          <Route path="/Author" exact element={<Author />}></Route>

          <Route path="/Publisher" exact element={<Publisher />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
