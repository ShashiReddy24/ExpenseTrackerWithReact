import "./App.css";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Categories from "./Categories";
import Transactions from "./Transactions";
import SingleCategory from "./SingleCategory";
import SingleTransaction from "./SingleTransaction";
import PostTransaction from "./PostTransaction";
import Register from "./Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Register" element={<Register />}></Route>
      <Route path="/Dashboard" element={<Navbar />}>
        <Route index element={<Categories />}></Route>
        <Route
          path="/Dashboard/Category/:id"
          element={<SingleCategory />}
        ></Route>
        <Route
          path="/Dashboard/NewTransaction"
          element={<PostTransaction />}
        ></Route>
        <Route
          path="/Dashboard/Transactions"
          element={<Transactions />}
        ></Route>
        <Route
          path="/Dashboard/SingleTransaction/:TransactionID"
          element={<SingleTransaction />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
