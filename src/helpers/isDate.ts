import moment from "moment"

const isDate = (value:any, rest:any) => {
    if (!value) return false

    console.log(value)
    const date = moment(value)

    if (date.isValid()) return true

    return false
}

export default isDate