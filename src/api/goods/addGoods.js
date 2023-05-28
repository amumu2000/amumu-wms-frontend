import axios from "axios";


export function addGoods(data) {
    return axios.post("/goods/add", data)
}