import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "./features/Api/Apislice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleCategory() {
  const { id } = useParams();
  const [UserId, setUserId] = useState(0);
  const [Categ, setCateg] = useState("");
  const [isedit, setisedit] = useState(false);
  const [edit] = useEditCategoryMutation();
  const [newCategory, setnewCategory] = useState("");
  const [deletecategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();
  const GetUserId = () => {
    const storedUserData = sessionStorage.getItem("token");
    const ParsedData = JSON.parse(storedUserData);
    setUserId(ParsedData.userId);
  };
  const { data: Categories = [], isSuccess } = useGetCategoriesQuery(UserId);
  const GetCategory = () => {
    if (isSuccess) {
      for (let i = 0; i < Categories.length; i++) {
        if (Categories[i].id.toString() === id) {
          setCateg(Categories[i].categoryName);
        }
      }
    }
  };
  useEffect(() => {
    GetUserId();
  }, []);
  useEffect(() => {
    GetCategory();
  }, [UserId]);
  const handleisedit = () => {
    setisedit(true);
  };
  const handleClose = () => {
    setisedit(false);
  };
  const handleSave = async (event) => {
    if (newCategory.length == 0) {
      event.preventDefault();
      toast.warn("Please Fill the CategoryName");
    } else {
      try {
        event.preventDefault();
        setisedit(false);
        await edit({ userId: id, categoryName: newCategory }).unwrap();
        toast.success("Category Updated");
        setCateg(newCategory);
      } catch (err) {
        toast.error("Error in Adding");
      }
    }
  };
  const handlechangenewcategory = (e) => {
    setnewCategory(e.target.value);
  };
  const handledelete = async () => {
    try {
      await deletecategory({ id: id });
      navigate("/Dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        height: "88vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1559963043-3d19915bec6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="d-flex justify-content-center m-3">
        <div
          className="d-flex justify-content-center align-items-center border border-secondary flex-column p-2 w-25 shadow rounded"
          style={{ backgroundColor: "lightpink" }}
        >
          <div className="d-flex justify-content-center">{Categ}</div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-secondary m-1" onClick={handleisedit}>
            Edit
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-danger m-1" onClick={handledelete}>
            Delete
          </button>
        </div>
      </div>
      <div>
        {isedit && (
          <div className="d-flex justify-content-center m-5">
            <form
              className="border border-secondarym p-4 w-50"
              onSubmit={handleSave}
            >
              <div className="form-outline mb-4">
                <label className="form-label text-white">
                  {" "}
                  New CategoryName
                </label>
                <input
                  type="text"
                  id="form2Example1"
                  className="form-control"
                  onChange={handlechangenewcategory}
                  value={newCategory}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary m-1">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-dark m-1"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
export default SingleCategory;
