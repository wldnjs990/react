import { configureStore, createSlice } from "@reduxjs/toolkit";


let user = createSlice({
    name : 'user',
    initialState : [{name : 'kim', count : 0}, {name : 'kim', count : 1}],
    reducers : {
        changeName(state){
            state.name = "john"
        },
        changeCount(state){
            state[0].count++
        }
    }
})

export let {changeName, changeCount} = user.actions


let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})


let products = createSlice({
    name : 'products',
    initialState : [
        {id : 0, name : 'White and black', count : 2},
        {id : 2, name : 'grey yordan', count : 1}
    ],
    reducers : {
        setcount(state, action){
            state[action.payload].count++
        },
        plusobject(state, action){
            state.push(action.payload)
        }
    }
})
    export let {setcount, plusobject} = products.actions


export default configureStore({
    reducer:{
        user : user.reducer,
        stock : stock.reducer,
        products : products.reducer
    }
})