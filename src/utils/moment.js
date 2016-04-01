import React from 'react'
import moment from 'moment'

function Moment({date, format, method= "calendar"}) {

    const formated = moment(date, format)[method]()

    return (<span>{formated}</span>)

}

export default Moment