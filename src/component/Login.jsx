import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import flimHookLogo from "../assets/logo/flimhookLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectLoginError } from "../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Define validation schema


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector(selectLoginError);





  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = dispatch(loginUser(values)); // Await dispatch result
      if (result.payload) {
        navigate('/layout')
      }
    } catch (error) {
      console.error("LoginFailed", error);
    }
    setSubmitting(false);
  };



  const togglePasswordVisibility = () => {

    setShowPassword((prevState) => !prevState);
    console.log(showPassword)
  };
  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-gray-100 shadow-md rounded px-8 py-9 mb-4">
              <div className="mt-3 mb-7">
                <img src={flimHookLogo} />
              </div>
              <div className=" my-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="p-2 w-full border rounded-md"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}  
                  </div>
                </div>   
                {/* changing 28 */}
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {loginError && <p style={{ color: 'red' }}>{loginError}</p>}


              <div className=" flex">
                {" "}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-auto mx-auto my-2 bg-black text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
