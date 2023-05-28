import axios from "axios";

export function getWarehouseList(data) {
    return axios.post("/warehouse/list", data
    ).then((res) => {
        return res
    })
}