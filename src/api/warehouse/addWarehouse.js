import axios from "axios";

export function addWarehouse(data) {
    data.manager_id = parseInt(data.manager_id)
    return axios.post("/admin/warehouse/add", data
    ).then((res) => {
        return res
    })
}