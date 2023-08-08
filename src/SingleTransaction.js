import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useGetCategoriesQuery,
  useEditTransactionMutation,
} from "./features/Api/Apislice";
import { toast } from "react-toastify";

const SingleTransaction = () => {
  const { TransactionID } = useParams();
  const [UserId, setUserId] = useState(0);
  const [SingleTransaction, setSingleTransaction] = useState({
    transactionCategory: "",
    transactionDescription: "",
    transactionCreatedTime: "",
    transactionAmount: 0,
  });
  const [isedit, setisedit] = useState(false);
  const [TransactionCategory, setTransactionCategory] = useState(0);
  const [TransactionDescription, settransactionDescription] = useState("");
  const [TransactionAmount, setTransactionAmount] = useState(0);
  const [TransactionDate, settransactionDate] = useState("");
  const [DeleteTransaction] = useDeleteTransactionMutation();
  const [EditTransaction] = useEditTransactionMutation();
  const navigate = useNavigate();
  const GetUserId = () => {
    const storedUserData = sessionStorage.getItem("token");
    const ParsedData = JSON.parse(storedUserData);
    setUserId(ParsedData.userId);
  };
  const { data: Transactions = [], isSuccess } =
    useGetTransactionsQuery(UserId);
  const { data: Categories = [] } = useGetCategoriesQuery(UserId);
  const GetSingleTransaction = () => {
    if (isSuccess) {
      for (let i = 0; i < Transactions.length; i++) {
        if (Transactions[i].transactionId.toString() === TransactionID) {
          setSingleTransaction({
            transactionCategory: Transactions[i].transactionCategory,
            transactionDescription: Transactions[i].transactionDescription,
            transactionCreatedTime: Transactions[i].createdTime,
            transactionAmount: Transactions[i].transactionAmount,
          });
          settransactionDate(Transactions[i].createdTime);
        }
      }
    }
  };
  useEffect(() => {
    GetUserId();
  }, []);
  useEffect(() => {
    GetSingleTransaction();
  }, [UserId]);
  const GetUpdatedTransactionCategory = (Id) => {
    for (let i = 0; i < Categories.length; i++) {
      if (Categories[i].id.toString() === Id) {
        return Categories[i].categoryName;
      }
    }
  };
  const handleDelete = async () => {
    try {
      await DeleteTransaction(TransactionID);
      toast.success("Successfully Deleted");
      navigate("/Dashboard/Transactions");
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditTransaction = async (event) => {
    if (TransactionCategory === 0) {
      event.preventDefault();
      toast.warn("Please Select a Category");
      console.log("Select a Category");
    } else if (TransactionDescription === "") {
      event.preventDefault();
      toast.warn("Description Cannot be Empty");
      console.log("Please add valid Description");
    } else {
      try {
        event.preventDefault();
        await EditTransaction({
          id: TransactionID,
          transactionAmount: TransactionAmount,
          transactionDescription: TransactionDescription,
          categId: TransactionCategory,
        });
        setSingleTransaction({
          transactionCategory:
            GetUpdatedTransactionCategory(TransactionCategory),
          transactionCreatedTime: TransactionDate,
          transactionAmount: TransactionAmount,
          transactionDescription: TransactionDescription,
        });
        setisedit(false);
        toast.success("Transaction Updated Successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div
      style={{
        height: "88vh",
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-earth-transaction-global-trade-data-image_15278.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div>
        <div className="d-flex justify-content-center mt-3 ">
          <ul className="list-group">
            <li className="list-group-item list-group-item-action">
              Transaction Category :{SingleTransaction.transactionCategory}
            </li>
            <li className="list-group-item list-group-item-action">
              Transaction Description:{SingleTransaction.transactionDescription}
            </li>
            <li className="list-group-item list-group-item-action">
              Transaction Date :{SingleTransaction.transactionCreatedTime}
            </li>
            <li className="list-group-item list-group-item-action">
              Transaction Amount :{SingleTransaction.transactionAmount}Rs
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-center m-2">
          <button className="btn btn-danger m-1" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="btn btn-secondary m-1"
            onClick={() => {
              setisedit(true);
            }}
          >
            Edit
          </button>
        </div>
        <div>
          {isedit && (
            <div className="d-flex justify-content-center m-3">
              <form
                className="border border-secondarym p-4 w-50"
                onSubmit={handleEditTransaction}
              >
                <div className="form-outline mb-4">
                  <label className="form-label">Category:</label>
                  <div>
                    <select
                      className="form-control"
                      required
                      onChange={(event) => {
                        setTransactionCategory(event.target.value);
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
                  <label className="form-label">TransactionDescription:</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      settransactionDescription(event.target.value);
                    }}
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">TransactionAmount:</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(event) => {
                      setTransactionAmount(event.target.value);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary m-1">
                    Save
                  </button>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      setisedit(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleTransaction;
