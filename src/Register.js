import React, { useState } from "react";
import { useRegisterMutation } from "./features/Api/Apislice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Register() {
  const [userName, setuserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirm, setConfirmPassword] = useState("");
  const [Email, setemail] = useState("");
  const [Age, setAge] = useState(0);
  const [Phone, setPhone] = useState("");
  const [Register] = useRegisterMutation();
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      await Register({
        id: 0,
        userName: userName,
        password: Password,
        confirmPassword: Confirm,
        email: Email,
        age: Age,
        phoneNumber: Phone,
      });
      navigate("/");
      toast.success(`Welcome ${userName}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <section className="mt-3">
        <div className="mask d-flex align-items-center h-75 gradient-custom-3">
          <div className="container h-75">
            <div className="row d-flex justify-content-center align-items-center h-75">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body h-75 p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form onSubmit={handleRegister}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          placeholder="UserName"
                          onChange={(event) => {
                            setuserName(event.target.value);
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          id="form3Example1cg"
                          placeholder="Age"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setAge(event.target.value);
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          placeholder="Phone"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setPhone(event.target.value);
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          placeholder="Email"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setemail(event.target.value);
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          placeholder="Password"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cdg"
                          placeholder="Confirm Password"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setConfirmPassword(event.target.value);
                          }}
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-2 mb-0">
                        Have already an account?{" "}
                        <a
                          role="button"
                          onClick={() => {
                            navigate("/");
                          }}
                          className="fw-bold text-body"
                        >
                          <u>Login here</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
