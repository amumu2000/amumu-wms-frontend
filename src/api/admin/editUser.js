import axios from "axios";
import md5 from "crypto-js/md5";

export function editUser(data) {
    if (data.password !== "") {
        data.password = md5(data.password).toString()
    } else {
        data.password = undefined
    }
    data.user_id = data.id
    return axios.post("/admin/users/edit", data)
}