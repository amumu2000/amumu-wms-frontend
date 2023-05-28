import axios from "axios";

export function self(data) {
    return axios.post("/users/self", data).then((res) => {
        return res
    })
}