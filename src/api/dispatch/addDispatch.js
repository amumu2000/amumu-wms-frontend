import axios from "axios";

export function addDispatch(data) {
    return axios.post("/dispatch/add", data)
}