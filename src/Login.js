import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [, setUserDetails] = useState({ userId: "", token: "" });
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7148";
  const handleEmail = (e) => {
    setemail(e.target.value);
  };
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };
  const handleLogin = async () => {
    if (email === "") {
      toast.warn("enter email");
    } else if (password === "") {
      toast.warn("enter password");
    } else {
      try {
        const result = await axios.post(`${baseUrl}/api/User/login`, {
          email: email,
          password: password,
        });
        setUserDetails({
          userId: result.data.userId,
          token: result.data.token,
        });
        sessionStorage.setItem("token", JSON.stringify(result.data));
        toast.success("Login Successful");
        navigate("/Dashboard");
      } catch {
        toast.error("Wrong Credentials,Please try Again");
      }
    }
  };
  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-3">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control"
                        placeholder="Email"
                        onChange={handleEmail}
                      />
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control"
                        placeholder="password"
                        onChange={handlePassword}
                      />
                    </div>
                    <p className="small mb-2 pb-lg-2 ">
                      <a className="text-white">Forgot password?</a>
                    </p>
                    <button
                      className="btn btn-outline-light btn-lg px-5 mb-5 mt-3"
                      type="submit"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    <p className="mb-0">
                      Dont have an account?{" "}
                      <a
                        className="text-white-50 fw-bold"
                        role="button"
                        onClick={() => {
                          navigate("/Register");
                        }}
                      >
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
