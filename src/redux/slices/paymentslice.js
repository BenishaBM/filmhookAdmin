import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import privateAPI from "../../api/privateApi";
import Apiconfig from "../../api/Apiconfig";

export const paymentTotalCount = createAsyncThunk("Dashboard/paymentTotalCount", async (_, { rejectWithValue }) => {
    try {
        const response = await privateAPI.get(Apiconfig.getpaymentcount)
        console.log(response.data)
        return response.data


    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);

    }

})
export const paymentsuccess = createAsyncThunk("Dashboard/paymentsuccess", async (status, { rejectWithValue }) => {
    try {
        const response = await privateAPI.get(Apiconfig.successusers, { params: status });
        console.log(response.data)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)

    }

})


export const paymentfailed = createAsyncThunk("Dashboard/paymentfailed", async (status, { rejectWithValue }) => {
    try {
        const response = await privateAPI.get(Apiconfig.successusers, { params: status });
        console.log(response.data)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)

    }

})

export const paymentexpired = createAsyncThunk("Dashboard/paymentexpired", async (status, { rejectWithValue }) => {
    try {
        const response = await privateAPI.get(Apiconfig.successusers, { params: status });
        console.log(response.data)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)

    }

})


export const paymentpending = createAsyncThunk("Dashboard/paymentpending", async (status, { rejectWithValue }) => {
    try {
        const response = await privateAPI.get(Apiconfig.successusers, { params: status });
        console.log(response.data)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)

    }

})

export const getAllTotalUsers = createAsyncThunk(
    "Dashboard/getAllTotalUsers",
    async (pageDetails, { rejectWithValue }) => {
        try {
            const response = await privateAPI.get(Apiconfig.Totalpaymentusers, {
                params: pageDetails,
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);






const paymentslice = createSlice({
    name: "paymentdetails",
    initialState: {
        getallpaymentcountlist: [],
        getallpaymentloadingstatus: "idle",
        getallpaymenterrormessage: null,
        getalltotalcountlist: [],
        getalltotalloadingstatus: "idle",
        getalltotalerrormessage: null,
        getsuccessloadingstatus : "idle",
        getsuccesserrormessage : null,
        getsuccessdatalist : [],
        getfailedloadingstatus : "idle",
        getfailederrormessage : null,
        getfaileddatalist : [],
        getexpiredloadingstatus : "idle",
        getexpirederrormessage : null,
        getexpireddatalist : [],
        getpendingloadingstatus : "idle",
        getpendingerrormessage : null,
        getpendingdatalist : []

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(paymentTotalCount.pending, (state) => {
                state.getallpaymentloadingstatus = "pending"
                state.getallpaymenterrormessage = null



            })
            .addCase(paymentTotalCount.fulfilled, (state, action) => {
                state.getallpaymentloadingstatus = "succeed"
                state.getallpaymentcountlist = action.payload.data;
                console.log(state.getallpaymentcountlist)

            })
            .addCase(paymentTotalCount.rejected, (state, action) => {
                state.getallpaymentloadingstatus = "failed";
                state.getallpaymenterrormessage = action.payload;

            })

            .addCase(getAllTotalUsers.pending, (state) => {
                state.getalltotalloadingstatus = "pending"
                state.getalltotalerrormessage = null



            })
            .addCase(getAllTotalUsers.fulfilled, (state, action) => {
                state.getalltotalloadingstatus = "succeed"
                state.getalltotalcountlist = action.payload.data;
                console.log(state.getalltotalcountlist)

            })
            .addCase(getAllTotalUsers.rejected, (state, action) => {
                state.getalltotalloadingstatus = "failed";
                state.getalltotalerrormessage = action.payload;

            })


            .addCase(paymentsuccess.pending, (state) => {
                state.getsuccessloadingstatus = "pending"
                state.getsuccesserrormessage = null



            })
            .addCase(paymentsuccess.fulfilled, (state, action) => {
                state.getsuccessloadingstatus = "succeed"
                state.getsuccessdatalist = action.payload.data;
                console.log(state.getsuccessdatalist)

            })
            .addCase(paymentsuccess.rejected, (state, action) => {
                state.getsuccessloadingstatus = "failed";
                state.getsuccesserrormessage = action.payload;

            })

            .addCase(paymentfailed.pending, (state) => {
                state.getfailedloadingstatus = "pending"
                state.getfailederrormessage = null



            })
            .addCase(paymentfailed.fulfilled, (state, action) => {
                state.getfailedloadingstatus = "succeed"
                state.getfaileddatalist = action.payload.data;
                console.log(state.getfaileddatalist)

            })
            .addCase(paymentfailed.rejected, (state, action) => {
                state.getfailedloadingstatus = "failed";
                state.getfailederrormessage = action.payload;

            })

            .addCase(paymentexpired.pending, (state) => {
                state.getexpiredloadingstatus = "pending"
                state.getexpirederrormessage = null



            })
            .addCase(paymentexpired.fulfilled, (state, action) => {
                state.getexpiredloadingstatus = "succeed"
                state.getexpireddatalist = action.payload.data;
                console.log(state.getexpireddatalist)

            })
            .addCase(paymentexpired.rejected, (state, action) => {
                state.getexpiredloadingstatus = "failed";
                state.getexpirederrormessage = action.payload;

            })

            .addCase(paymentpending.pending, (state) => {
                state.getpendingloadingstatus = "pending"
                state.getpendingerrormessage = null



            })
            .addCase(paymentpending.fulfilled, (state, action) => {
                state.getpendingloadingstatus = "succeed"
                state.getpendingdatalist = action.payload.data;
                console.log(state.getpendingdatalist)

            })
            .addCase(paymentpending.rejected, (state, action) => {
                state.getpendingloadingstatus = "failed";
                state.getpendingerrormessage = action.payload;

            })


    }
})


export const paymentcount = (state) => state.paymentdetails.getallpaymentcountlist;
export const totalpayment = (state) => state.paymentdetails.getalltotalcountlist;
export const successdata = (state) => state.paymentdetails.getsuccessdatalist;
export const faildata = (state) => state.paymentdetails.getfaileddatalist; 
export const expiredata = (state) => state.paymentdetails.getexpireddatalist;
export const pendingdata = (state) => state.paymentdetails.getpendingdatalist;

export default paymentslice.reducer;