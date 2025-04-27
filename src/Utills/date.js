import moment from "moment/moment"

export const formatDateTime = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}