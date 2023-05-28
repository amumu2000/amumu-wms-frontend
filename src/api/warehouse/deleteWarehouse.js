import axios from "axios";

export function deleteWarehouse(warehouse_id) {
    return axios.post("/admin/warehouse/delete", {
            warehouse_id,
        }
    ).then((res) => {
        console.log(res)
        return res
    })
}