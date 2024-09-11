import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./component/Login";
import Layout from "./component/Layout";
import ProtectedPage from "./router/ProtectedPage";
import PublicPage from "./router/PublicPage";
import SubAdminList from "./features/subAdmin/SubAdminList";
import CreateSubadmin from "./features/subAdmin/CreateSubadmin";
import NotVerifiedUserIndustrialList from "./features/industiralUser/NotVerifiedUserIndustrialList";
import Report from "./features/report/Report";
import ReportPost from "./features/report/ReportPost";
import EditSubadmin from "./features/subAdmin/EditSubadmin";
import ResetPassword from "./features/subAdmin/ResetPassword";
import UnverfiedUserDetails from "./features/industiralUser/UnverfiedUserDetails";

import { useSelector } from "react-redux";
import { getUserType } from "./redux/slices/loginSlice";

const App = () => {
  // const { userType, loading } = useUser();

  const userType = useSelector(getUserType)

 

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <PublicPage>
            <Login />
          </PublicPage>
        }
      />
      <Route
        path="/layout"
        element={
          <ProtectedPage>
            <Layout />
          </ProtectedPage>
        }
      >
        {userType === "SuperAdmin" ? (
          <Route index element={<SubAdminList />} />
        ) : (
          <Route index element={<NotVerifiedUserIndustrialList />} />
        )}

        <Route
          path="industrial_user"
          element={
            <ProtectedPage>
              <NotVerifiedUserIndustrialList />
            </ProtectedPage>
          }
        />
        <Route
          path="create_subadmin"
          element={
            <ProtectedPage>
              <CreateSubadmin />
            </ProtectedPage>
          }
        />
        <Route
          path="report"
          element={
            <ProtectedPage>
              <Report />
            </ProtectedPage>
          }
        />
        <Route
          path="edit_subadmin/:userId"
          element={
            <ProtectedPage>
              <EditSubadmin />
            </ProtectedPage>
          }
        />
        <Route
          path="reset_password"
          element={
            <ProtectedPage>
              <ResetPassword />
            </ProtectedPage>
          }
        />
        <Route
          path="unverified_userdetails/:userId"
          element={
            <ProtectedPage>
              <UnverfiedUserDetails />
            </ProtectedPage>
          }
        />
        <Route
          path="report_post/:postId"
          element={
            <ProtectedPage>
              <ReportPost />
            </ProtectedPage>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
