import axios from "axios";

export function completeDispatch(dispatch_id) {
    return axios.post("/dispatch/complete", {dispatch_id})
}