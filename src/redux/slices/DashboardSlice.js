import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import privateAPI from '../../api/privateApi';
import Apiconfig from '../../api/Apiconfig';





export const getAllDashboardValue = createAsyncThunk('Dashboard/getAllDashboardValue', async (_, { rejectWithValue }) => {
    try {
        const response = await privateAPI.get(Apiconfig.alldashboardvalue)
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
        
    }

})


const DashboardSlice = createSlice({
    name: "Dashboard",
    initialState: {
        dashboardpiechart: [],
        getAlldashboardLoadingStatus: "idle",
        getAlldashboardLoadingErrorMsg: null,
    },
    reducers :{

    },
    extraReducers : (builder) =>{
        builder
        .addCase(getAllDashboardValue.pending, (state)=> {
            state.getAlldashboardLoadingStatus = "loading";
        })
        .addCase(getAllDashboardValue.fulfilled, (state , action)=>{
            state.getAlldashboardLoadingStatus = "succeed";
            state.dashboardpiechart = action.payload.data;
            console.log(state.dashboardpiechart)
        })
        .addCase(getAllDashboardValue.rejected, (state,action)=>{
            state.getAlldashboardLoadingStatus = "failed"
            state.getAlldashboardLoadingErrorMsg = action.payload;
        })
    }
})

export const dashboardval = (state) => state.Dashboard.dashboardpiechart;
export default DashboardSlice.reducer;