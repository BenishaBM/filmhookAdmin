import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubadminAction,
  selectCreateSubadminErrorMsg,
  selectCreateSubadminFormStatus,
} from "../../redux/slices/subAdminSlice";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter a username"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter an email"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const CreateSubadmin = () => {
  const dispatch = useDispatch();
  const createSubadminErrorMsg = useSelector(selectCreateSubadminErrorMsg);
  const createSubadminFormStatus = useSelector(selectCreateSubadminFormStatus);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      if (createSubadminFormStatus === "succeeded") {
        toast.success("Subadmin Created Successfully");
      } else if (createSubadminFormStatus === "failed") {
        toast.warn(createSubadminErrorMsg);
      }
      setIsFormSubmitted(false); // Reset form submission state
    }
  }, [createSubadminFormStatus, createSubadminErrorMsg, isFormSubmitted]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const details = {
      name: values.username,
      email: values.email,
      userType: "SubAdmin",
      password: values.password,
      status: true,
    };

    await dispatch(createSubadminAction(details)); //This line triggers an asynchronous action createSubadminAction to create a new subadmin.
    setIsFormSubmitted(true);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="bg-gray-100 shadow-md rounded px-8 py-9 mb-4">
              <p className="flex items-center justify-center text-xl">
                Create a Subadmin
              </p>
              <div className="my-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username*
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your name"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email*
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
                  Password*
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <ToastContainer />

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-auto my-2 mr-5 bg-black text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Loading..." : "Create"}
                </button>
                <Link
                  to="/layout"
                  className="w-auto my-2 bg-black text-white font-semibold py-2 px-4 rounded-md"
                >
                  Back
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateSubadmin;
