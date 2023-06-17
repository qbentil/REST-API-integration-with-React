import Axios from "../Axios";

export const FETCH_TODOS = async (callback) => {
    try {
        const {data} = await Axios({
            url: "/todo",
            method: "GET"
        })

        callback(data);

        console.log(data);
    }catch(e){
        console.log(e)
    }
}

export const ADD_TODO = async (todo, callback) => {
    try {
        const {data} = await Axios({
            url: "/todo",
            method: "POST",
            data: todo
        })

        callback(data);

        console.log(data);
    }catch(e){
        console.log(e)
    }
}

export const TOGGLE_TODO = async (todo, callback) => {
    try {
        const {data} = await Axios({
            url: `/todo/${todo._id}`,
            method: "PATCH",
            data: {
                checked: !todo.checked
            }
        })

        callback(data);

        console.log(data);
    }catch(e){
        console.log(e)
    }
}