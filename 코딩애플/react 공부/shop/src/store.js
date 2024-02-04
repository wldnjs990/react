import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState : 'kim'
})
let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})
let products = createSlice({
    name : 'products',
    initialState : [
        {id : 0, name : 'White and black', count : 2},
        {id : 2, name : 'grey yordan', count : 1}
    ]
})

export default configureStore({
    reducer:{
        user : user.reducer,
        stock : stock.reducer,
        products : products.reducer
    }
})