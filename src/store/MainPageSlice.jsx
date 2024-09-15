import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const getBooksList = createAsyncThunk(
    'getBooksList',
    async function (info,{dispatch}){
        try{
            const response = await fetch('/data.json')
            const data = await response.json();
            dispatch(getList(data))
        }
        catch(error){
            console.log(error)
        }
    }
)
const MainPageSlice = createSlice({
    name: "MainPage",
    initialState: {
        books:[]
    },
    reducers:{
        getList:(state,action)=>{
            state.books = action.payload;
        }
    }
})

export const{getList} = MainPageSlice.actions;
export default MainPageSlice.reducer
