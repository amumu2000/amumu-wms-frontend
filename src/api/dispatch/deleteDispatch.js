import axios from "axios";

export function deleteDispatch(dispatch_id) {
    return axios.post("/dispatch/delete", {
        dispatch_id
    })
}