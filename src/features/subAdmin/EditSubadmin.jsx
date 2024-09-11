import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSubadminByUserID,
  editSubadminAction,
  selectUpdateSubadminFormStatus,
  selectUpdateSubadminErrorMsg,
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

const EditSubadmin = () => {
  const { userId } = useParams();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const errorMsg = useSelector(selectUpdateSubadminErrorMsg);
  const loadingStatus = useSelector(selectUpdateSubadminFormStatus);
  const userDetails = useSelector((state) =>
    selectSubadminByUserID(state, Number(userId))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFormSubmitted) {
      if (loadingStatus === "succeeded") {
        toast.success("Updated Successfully");
        setIsFormSubmitted(false);
      } else if (loadingStatus === "failed") {
        toast.warn(errorMsg);
        setIsFormSubmitted(false);
      }
    }
  }, [loadingStatus, errorMsg, isFormSubmitted]);

  if (!userDetails) {
    return <div className="h-[50%] w-full flex items-center justify-center text-xl">User Details Not Found !!!</div>;
  }

  const initialValues = {
    username: userDetails.name,
    email: userDetails.email,
    password: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const details = {
      userId: userId, // The ID of the user you want to update
      name: values.username,
      email: values.email,
      userType: "SubAdmin",
      password: values.password,
    };

    dispatch(editSubadminAction(details));
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
          {({ isSubmitting }) => (
            <Form className="bg-gray-100 shadow-md rounded px-8 py-9 mb-4">
              <p className="flex items-center justify-center text-xl">
                Update Subadmin
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

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-auto my-2 mr-5 bg-black text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Loading..." : "Update"}
                </button>
                <Link
                  to="/layout"
                  className="w-auto my-2 bg-black text-white font-semibold py-2 px-4 rounded-md"
                >
                  Back
                </Link>
              </div>
              <ToastContainer />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditSubadmin;
