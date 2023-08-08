import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "./features/Api/Apislice";
import { useNavigate } from "react-router-dom";
import { usePostCategoryMutation } from "./features/Api/Apislice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Categories() {
  const [userData, setUserData] = useState({ userId: 0, token: "" });
  const navigate = useNavigate();
  const [Cat, setCat] = useState("");
  const [addCategory] = usePostCategoryMutation();
  const getUserDataFromSessionStorage = () => {
    const storedUserData = sessionStorage.getItem("token");
    const ParsedData = JSON.parse(storedUserData);
    setUserData({ userId: ParsedData.userId, token: ParsedData.token });
  };
  useEffect(() => {
    getUserDataFromSessionStorage();
  }, []);
  const { data: Categories = [] } = useGetCategoriesQuery(userData.userId);
  const handleCategory = (id) => {
    navigate(`Category/${id}`);
  };
  const handleAddCategory = async (event) => {
    if (Cat === "") {
      event.preventDefault();
      toast.warn("Empty Values are not accepted");
    } else {
      try {
        event.preventDefault();
        await addCategory({ userId: userData.userId, categoryName: Cat });
        setCat("");
        toast.success(`${Cat} Added`);
      } catch (err) {
        toast.error("Category Not Added");
      }
    }
  };
  const handleAdding = (e) => {
    setCat(e.target.value);
  };
  return (
    <>
      <div
        style={{
          height: "88vh",
          backgroundImage: `url('https://images.unsplash.com/photo-1559963043-3d19915bec6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div>
          <div className="d-flex justify-content-center mt-3">
            <form
              className="border border-secondarym p-4 w-50 shadow rounded"
              onSubmit={handleAddCategory}
            >
              <div className="form-outline mb-4">
                <label className="form-label text-white">Category Name</label>
                <input
                  type="text"
                  id="form2Example1"
                  className="form-control shadow"
                  onChange={handleAdding}
                  value={Cat}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
        {Categories.length > 0 ? (
          <div className="d-flex justify-content-center">
            <ul>
              {Categories.map((category) => (
                <button
                  className="m-3 btn btn-light  shadow"
                  key={category.id}
                  onClick={() => handleCategory(category.id)}
                >
                  {category.categoryName}
                </button>
              ))}
            </ul>
          </div>
        ) : (
          <div className="d-flex justify-content-center m-5">
            <div>No Categories. Try to Add Some</div>
          </div>
        )}
      </div>
    </>
  );
}
