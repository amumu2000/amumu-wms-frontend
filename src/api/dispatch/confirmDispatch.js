import axios from "axios";

export function confirmDispatch(dispatch_id) {
    return axios.post("/dispatch/confirm", {
        dispatch_id
    })
}