import axios from "axios";


export function editGoods(data) {
    return axios.post("/goods/edit", data)
}