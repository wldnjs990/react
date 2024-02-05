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
        {
            id : 0,
            title : "White and Black",
            content : "나이스한 신발.",
            price : 120000,
            count : 0
          },
          {
            id : 2,
            title : "Grey Yordan",
            content : "편한 신발",
            price : 130000,
            count : 0
          }
    ],
    reducers : {
        setcount(state, action){
            state.find(a => a.id == state[action.payload].id).count++
        },
        plusobject(state, action){
            state.push(action.payload)
        },
        deletobject(state, action){
            state.splice(action.payload, 1)
        }
    }
})
export let {setcount, plusobject, deletobject} = products.actions


export default configureStore({
    reducer:{
        user : user.reducer,
        stock : stock.reducer,
        products : products.reducer
    }
})