import React from 'react'
import moment from 'moment'

window.moment = moment
function Moment({date, format, method= "calendar"}) {

    const formated = moment(date, format)[method]()

    return (<span>{formated}</span>)

}

export default Moment