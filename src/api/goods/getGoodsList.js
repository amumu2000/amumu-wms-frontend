import axios from "axios";


export function getGoodsList(data) {
    return axios.post("/goods/list", data)
}