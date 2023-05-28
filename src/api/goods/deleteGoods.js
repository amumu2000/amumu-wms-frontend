import axios from "axios";


export function deleteGoods(goods_id) {
    return axios.post("/goods/delete", {
        goods_id
    })
}