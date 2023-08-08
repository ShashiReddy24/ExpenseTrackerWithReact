import React, { useEffect, useState } from "react";
import { useGetTransactionsQuery } from "./features/Api/Apislice";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [userId, setuserId] = useState(0);
  const [searchItem, setsearchItem] = useState("");
  const navigate = useNavigate();
  const GetUserId = () => {
    const storedUserData = sessionStorage.getItem("token");
    const ParsedData = JSON.parse(storedUserData);
    setuserId(ParsedData.userId);
  };
  useEffect(() => {
    GetUserId();
  }, []);
  const {
    data: Transactions = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetTransactionsQuery(userId);
  let AllTransactions = [];
  if (isLoading) {
    AllTransactions = <div>Loading...</div>;
  }
  if (isError) {
    AllTransactions = <div>Error:{Error}</div>;
  }
  if (isSuccess) {
    AllTransactions = Transactions.filter((Transaction) => {
      if (searchItem === "") {
        return Transaction;
      } else if (
        Transaction.transactionCategory
          .toLowerCase()
          .includes(searchItem.toLowerCase()) ||
        Transaction.transactionDescription
          .toLowerCase()
          .includes(searchItem.toLowerCase()) ||
        Transaction.transactionAmount.toString().includes(searchItem)
      ) {
        return Transaction;
      }
    }).map((Transaction) => (
      <div
        className="list-group w-25 m-2 shadow rounded"
        key={Transaction.transactionId}
      >
        <button
          className="list-group-item list-group-item-action flex-column align-items-start"
          onClick={() =>
            navigate(
              `/Dashboard/SingleTransaction/${Transaction.transactionId}`,
            )
          }
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{Transaction.transactionCategory}</h5>
            <small>{Transaction.createdTime}</small>
          </div>
          <p className="mb-1">{Transaction.transactionDescription}</p>
          <small>Rs:{Transaction.transactionAmount}</small>
        </button>
      </div>
    ));
  }
  return (
    <div
      style={{
        height: "88vh",
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-earth-transaction-global-trade-data-image_15278.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      |
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary m-3"
          onClick={() => {
            navigate("/Dashboard/NewTransaction");
          }}
        >
          AddTransaction
        </button>
        <div className="m-3">
          <input
            className="form-control"
            placeholder="Search"
            onChange={(event) => {
              setsearchItem(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center">
        {AllTransactions.length > 0 ? (
          AllTransactions
        ) : (
          <div>No Transactions......</div>
        )}
      </div>
    </div>
  );
};
export default Transactions;
