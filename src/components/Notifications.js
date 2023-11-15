import React, { useState, useEffect } from 'react';

let notifications = new Array();

export function notifyUpdate(type, message = null) {
    var newNotif;
    if (message === null) {
        newNotif = new Date() + ") Your " + type + " have been updated!";
    } else {
        newNotif = new Date() + ") Your " + type + " have been updated to: " + message + "!";
    }
    notifications.push(newNotif);
}

export function notifyPurchase(points) {
    var newNotif = new Date() + ") You have made a purchase of value: " + points;
    notifications.push(newNotif);
}

const Notifications = () => {
    const [notificationList, setNotificationList] = useState([]);

    const updateNotifList = () => {
        setNotificationList(notifications);
    };

    useEffect(() => {
        updateNotifList(); // Call updateNotifList on component mount
    }, []);

    return (
        <div>
            <h1>Notification Page</h1>
            <p>This is the notification page content.</p>
            <ul id='notificationList'>
                {notificationList.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;
