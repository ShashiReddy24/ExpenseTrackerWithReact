import React, { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useAddTransactionMutation,
} from "./features/Api/Apislice";
import { useNavigate } from "react-router-dom";
const PostTransaction = () => {
  const [userId, setuserId] = useState(0);
  const [CategoryId, setCategoryId] = useState(0);
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState("");
  const [Amount, setAmount] = useState(0);
  const [AddTransaction] = useAddTransactionMutation();
  const navigate = useNavigate();
  const GetUserId = () => {
    const storedUserData = sessionStorage.getItem("token");
    const ParsedData = JSON.parse(storedUserData);
    setuserId(ParsedData.userId);
  };
  useEffect(() => {
    GetUserId();
  }, []);
  const { data: Categories = [] } = useGetCategoriesQuery(userId);
  const handleAddTransaction = async (event) => {
    if (Description === "" || CategoryId === 0) {
      console.log("Please Fill all the fields...");
    } else {
      try {
        event.preventDefault();
        await AddTransaction({
          userId: userId,
          transactionId: 0,
          createdTime: Date,
          transactionAmount: Amount,
          transactionDescription: Description,
          categId: CategoryId,
        });
        navigate("/Dashboard/Transactions");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <form
        className="border border-secondarym  w-50 p-4 shadow rounded"
        onSubmit={handleAddTransaction}
      >
        <div className="form-outline mb-4">
          <label className="form-label">Category:</label>
          <div>
            <select
              className=" form-control"
              required
              onChange={(event) => {
                setCategoryId(event.target.value);
              }}
            >
              <option value="0">None</option>
              {Categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Description:</label>
          <input
            type="text"
            id="form2Example1"
            className="form-control"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Date:</label>
          <input
            type="date"
            id="form2Example1"
            className="form-control"
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Amount:</label>
          <input
            type="number"
            id="form2Example1"
            className="form-control"
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
        </div>
        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-outline-info" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default PostTransaction;
