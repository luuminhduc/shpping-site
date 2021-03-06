import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  hideregisterError,
  registerRequest,
} from "../../redux/action/registerAction/actions";
import { useEffect } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const history = useHistory();

  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  useEffect(() => {
    if (uid) history.push("/");
  }, [uid, history]);

  const onSubmit = (data) => {
    dispatch(registerRequest(data, history));
  };

  const registerReducer = useSelector((state) => state.registerReducer);
  const { registerError } = registerReducer;

  return (
    <div className="px-3 flex justify-center bg-gray-100 min-h-screen  items-center flex-col w-full">
      <NavLink className="mb-5 px-3 py-1 bg-gray-200 rounded" to="/">
        Back
      </NavLink>
      <div className="w-full bg-white rounded-2xl px-10 py-16 shadow-lg md:max-w-xl lg:max-w-lg xl:max-w-sm">
        <h1 className="mb-5 text-xl uppercase font-bold">Register</h1>

        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="mb-3 flex flex-col justify-start items-start">
            <label className="text-sm font-semibold">Name</label>

            <input
              {...register("name", { required: true })}
              type="text"
              className={`p-3 focus:border-sky-500 rounded ${
                errors.name
                  ? "border border-solid border-red-500"
                  : "border border-solid border-gray-300"
              } focus:outline-none w-full`}
              placeholder="Email"
            />
            {errors.name && errors.name.type === "required" && (
              <small className="text-red-500 text-sm">
                Name can not be blank
              </small>
            )}
          </div>
          <div className="mb-3 flex flex-col justify-start items-start">
            <label className="text-sm font-semibold">Email</label>

            <input
              {...register("email", { required: true })}
              type="text"
              className={`p-3 focus:border-sky-500 rounded ${
                errors.email
                  ? "border border-solid border-red-500"
                  : "border border-solid border-gray-300"
              } focus:outline-none w-full`}
              placeholder="Email"
            />
            {errors.email && errors.email.type === "required" && (
              <small className="text-red-500 text-sm">
                Email can not be blank
              </small>
            )}
          </div>

          <div className="mb-3 flex flex-col justify-start items-start">
            <label className="text-sm font-semibold">Password</label>

            <input
              {...register("password", { required: true })}
              type="password"
              className={`p-3 focus:border-sky-500 rounded  ${
                errors.password
                  ? "border border-solid border-red-500"
                  : "border border-solid border-gray-300"
              } focus:outline-none  w-full`}
              placeholder="Password"
            />
            {errors.password && errors.password.type === "required" && (
              <small className="text-red-500 text-sm">
                Password can not be blank
              </small>
            )}
          </div>
          <div className="mb-3 text-xs text-trueGray-400">
            Already have an account?{" "}
            <NavLink
              className="text-true text-sky-500 hover:text-sky-600"
              to="/login"
            >
              Login
            </NavLink>
          </div>
          {registerError && (
            <div className="mb-3 bg-red-500 text-white p-4 rounded relative">
              {registerError}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => dispatch(hideregisterError())}
                className="h-5 w-5 absolute top-1 right-1 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 rounded bg-sky-600 text-white cursor-pointer hover:bg-sky-500 focus:outline-none focus:scale-95 transform"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
