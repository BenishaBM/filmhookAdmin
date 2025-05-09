// const Apiconfig = {
//   subadminList: "/admin/getRegister",
//   createSubadmin: "/admin/adminRegister",
//   deleteSubadmin: "/admin/deleteRegister",
//   editSubadmin: "/admin/updateRegister",
//   adminActiveStatus: "/admin/adminPageStatus",
//   resetAdminPassword: "/user/changeUserPassword",
//   unVerifiedIndustrialUser:"/admin/getAllUnverifiedIndustrialUsers",
//   unverifiedUserDetails :"/admin/getAdminIndustryUserPermanentDetails",
//   changeStatusUnverifiedIndustrialUsers:"/admin/changeStatusUnverifiedIndustrialUsers",
//   allpostreport:"/report/getAllReportsByPostId"
// };

// export default Apiconfig;



const Apiconfig = {
  subadminList: "/admin/getRegister",
  createSubadmin: "/admin/adminRegister",
  deleteSubadmin: "/admin/deleteRegister",
  editSubadmin: "/admin/updateRegister",
  adminActiveStatus: "/admin/adminPageStatus",
  resetAdminPassword: "/user/changeUserPassword",
  unVerifiedIndustrialUser: "/admin/getAllUnverifiedIndustrialUsers",
  unverifiedUserDetails: "/admin/getAdminIndustryUserPermanentDetails",
  changeStatusUnverifiedIndustrialUsers: "/admin/changeStatusUnverifiedIndustrialUsers",
  allpostreport: "/report/getAllReportsByPostId",

  // dashboard ApI endpoints
  alldashboardvalue : "/admin/getAllUsersManagerCount",
  
  // User Management API endpoints
  getAllUsers: "/admin/getAllUsers",
  // getUserDetails: "/user/getUserDetails",
  // updateUserStatus: "/user/updateUserStatus",
  // deleteUser: "/user/deleteUser",
  // updateUserProfile: "/user/updateUserProfile",

  getpublicuser: "/admin/getAllUsersByUserType",
  getreportscount : "/admin/getAllReportPostCount",
  getpaymentcount : "/admin/getAllPaymentStatusCount",
  Totalpaymentusers : "/admin/getAllPaymentUserData",
  successusers  : "/admin/getAllPaymentStatus",
  profileinfo : "/user/getUserByUserId"
};

export default Apiconfig;


