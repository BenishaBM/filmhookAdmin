// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createSubadminAction,
//   selectCreateSubadminErrorMsg,
//   selectCreateSubadminFormStatus,
// } from "../../redux/slices/subAdminSlice";

// const validationSchema = Yup.object().shape({
//   username: Yup.string().required("Please enter a username"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Please enter an email"),
//   password: Yup.string()
//     .required("Please enter a password")
//     .min(8, "Password must be at least 8 characters"),
// });

// const initialValues = {
//   username: "",
//   email: "",
//   password: "",
// };

// const CreateSubadmin = () => {
//   const dispatch = useDispatch();
//   const createSubadminErrorMsg = useSelector(selectCreateSubadminErrorMsg);
//   const createSubadminFormStatus = useSelector(selectCreateSubadminFormStatus);
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);

//   useEffect(() => {
//     if (isFormSubmitted) {
//       if (createSubadminFormStatus === "succeeded") {
//         toast.success("Subadmin Created Successfully");
//       } else if (createSubadminFormStatus === "failed") {
//         toast.warn(createSubadminErrorMsg);
//       }
//       setIsFormSubmitted(false); // Reset form submission state
//     }
//   }, [createSubadminFormStatus, createSubadminErrorMsg, isFormSubmitted]);

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     const details = {
//       name: values.username,
//       email: values.email,
//       userType: "SubAdmin",
//       password: values.password,
//       status: true,
//     };

//     await dispatch(createSubadminAction(details)); //This line triggers an asynchronous action createSubadminAction to create a new subadmin.
//     setIsFormSubmitted(true);
//     setSubmitting(false);
//     resetForm();
//   };

//   return (
//     <div className="h-full w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       <div className="w-full max-w-md">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting, errors }) => (
//             <Form className="bg-gray-100 shadow-md rounded px-8 py-9 mb-4">
//               <p className="flex items-center justify-center text-xl">
//                 Create a Subadmin
//               </p>
//               <div className="my-2">
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Username*
//                 </label>
//                 <Field
//                   type="text"
//                   id="username"
//                   name="username"
//                   placeholder="Enter your name"
//                   className="mt-1 p-2 w-full border rounded-md"
//                 />
//                 <ErrorMessage
//                   name="username"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="my-2">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email*
//                 </label>
//                 <Field
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   className="mt-1 p-2 w-full border rounded-md"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div className="my-2">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password*
//                 </label>
//                 <Field
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   className="mt-1 p-2 w-full border rounded-md"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <ToastContainer />

//               <div className="flex items-center justify-center">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-auto my-2 mr-5 bg-black text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? "Loading..." : "Create"}
//                 </button>
//                 <Link
//                   to="/layout"
//                   className="w-auto my-2 bg-black text-white font-semibold py-2 px-4 rounded-md"
//                 >
//                   Back
//                 </Link>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default CreateSubadmin;





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

    await dispatch(createSubadminAction(details));
    setIsFormSubmitted(true);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="h-full w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="w-full max-w-md z-10 relative">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm shadow-xl rounded-lg px-8 py-9 mb-4 border border-blue-100 transition-all duration-300 hover:shadow-2xl">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-blue-800">Create  Subadmin</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-800 mx-auto mt-2 rounded-full"></div>
              </div>
              
              <div className="my-4">
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
                  className="mt-1 p-3 w-full border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              
              <div className="my-4">
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
                  className="mt-1 p-3 w-full border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="my-4">
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
                  className="mt-1 p-3 w-full border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <ToastContainer />

              <div className="flex items-center justify-center mt-6 space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? "Loading..." : "Create"}
                </button>
                <Link
                  to="/layout"
                  className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Back
                </Link>
              </div>
            </Form>
          )}
        </Formik>
        
        {/* Add style for animation */}
        <style jsx>{`
          @keyframes blob {
            0% { transform: scale(1) translate(0px, 0px); }
            33% { transform: scale(1.1) translate(20px, -20px); }
            66% { transform: scale(0.9) translate(-20px, 20px); }
            100% { transform: scale(1) translate(0px, 0px); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CreateSubadmin;
