import axios from "axios";

export function deleteUser(user_id) {
    return axios.post("/admin/users/delete", {user_id})
}