import axios from "axios";


export function deleteGoods(data) {
    return axios.post("/goods/delete", data)
}