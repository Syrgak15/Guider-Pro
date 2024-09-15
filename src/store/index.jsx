import React from 'react';
import {configureStore} from '@reduxjs/toolkit'
import mainReducer from './MainPageSlice'

const store = configureStore({
    reducer:{
        mainReducer
    }
})

export default store;