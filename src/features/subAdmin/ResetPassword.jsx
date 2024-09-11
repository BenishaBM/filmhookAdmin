import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserEmail,
  resetUserPasswordAction,
} from "../../redux/slices/loginSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const email = useSelector(getUserEmail);
  const initialValues = {
    email: email,
    currentPassword: "",
    newPassword: "",
  };

  const { resetAdminPasswordStatus, resetAdminPasswordErrorMsg } = useSelector(
    (state) => state.login // Corrected slice access
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter an email"),
    currentPassword: Yup.string()
      .required("Please enter your current password")
      .min(8, "Password must be at least 8 characters"),
    newPassword: Yup.string()
      .required("Please enter a new password")
      .min(8, "Password must be at least 8 characters"),
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      if (resetAdminPasswordStatus === "succeeded") {
        toast.success("Password Updated Successfully");
        setIsFormSubmitted(false);
      } else if (resetAdminPasswordStatus === "failed") {
        toast.error(resetAdminPasswordErrorMsg);
        setIsFormSubmitted(false);
      }
    }
  }, [resetAdminPasswordStatus, resetAdminPasswordErrorMsg, isFormSubmitted]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const details = {
      email: values.email,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };

    dispatch(resetUserPasswordAction(details));
    setIsFormSubmitted(true);
    setSubmitting(false);
    resetForm();
    if (resetAdminPasswordStatus === "succeeded") {
      resetForm();
    }
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
                Reset Password
              </p>
              {/* Form Fields */}
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="text"
                  id="email"
                  name="email" // Ensure the name matches initialValues and validationSchema
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
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <Field
                  type="password"
                  id="currentPassword"
                  name="currentPassword" // Corrected name
                  placeholder="Enter your current password"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword" // Corrected name
                  placeholder="Enter your new password"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Other Form Fields and Submit Button */}
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

export default ResetPassword;
