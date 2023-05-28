import axios from "axios";

export function editDispatch(data) {
    return axios.post("/dispatch/edit", data)
}