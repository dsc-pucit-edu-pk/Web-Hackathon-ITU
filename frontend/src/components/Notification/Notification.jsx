import NotificationMessage from "./NotificationMessage"
import React from 'react'
import Styles from "./Notification.module.css"

const Notification = ({setOpenModal}) => {
    const Notifications = [];

    return (
        <div className={`w-full ${Styles.scr} h-full overflow-y-auto p-4`}>
            <h1 className="font-medium text-2xl mb-2">Notifications</h1>
            {Notifications.length > 0 ? (
                Notifications.map((notification) => (
                    <NotificationMessage key={notification._id} notification={notification} setOpenModal={setOpenModal} />
                ))
            ) : (
                <div key={1} className="flex items-center justify-center h-full">
                    <h1 className="text-gray-500 font-medium text-lg">No Notifications</h1>
                </div>
            )
            }
        </div>
    )
}

export default Notification;