import axios from "axios";
import md5 from "crypto-js/md5";

export function addUser(data) {
    if (data.password !== "") {
        data.password = md5(data.password).toString()
    }
    return axios.post("/admin/users/add", data)
}