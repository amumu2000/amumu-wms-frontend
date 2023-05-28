import axios from "axios";

export function editWarehouse(data) {
    data.warehouse_id = data.id
    return axios.post("/admin/warehouse/edit", data)
}