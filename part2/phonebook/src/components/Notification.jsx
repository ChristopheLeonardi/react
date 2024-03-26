import {useState, useEffect} from 'react'

const Notification = ({notificationMessage, setNotificationMessage}) => {
    if (notificationMessage.message === '') { return }
    setTimeout(() => {setNotificationMessage('')}, 3000)
    return (
        <p className={notificationMessage.type}>{notificationMessage.message}</p>
    )
}

export default Notification