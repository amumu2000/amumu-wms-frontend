import axios from "axios";

export function edit(form) {
    return axios.post("/users/edit", form
    ).then((res) => {
        console.log(res)
    })
}