import typeList from "./list/typeList";

export function getTypeName(id) {
    let name = ""
    let len = typeList.length
    for (let i = 0; i < len; i++) {
        if (typeList[i].type_id === id) {
            name = typeList[i].type_name
            break
        }
    }
    return name
}