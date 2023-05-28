import statusList from "./list/statusList";

export function getStatusName(id) {
    let name = ""
    let len = statusList.length
    for (let i = 0; i < len; i++) {
        if (statusList[i].status_id === id) {
            name = statusList[i].status_name
            break
        }
    }
    return name
}