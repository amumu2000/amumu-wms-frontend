import axios from "axios";

export function rejectDispatch(data) {
    return axios.post("/dispatch/reject", data)
}