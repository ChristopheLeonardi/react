import PropTypes from 'prop-types';

const Notification = ({ notificationMessage, setNotificationMessage }) => {
    if (notificationMessage.message === '') { return null; }
    setTimeout(() => { setNotificationMessage('') }, 3000);
    return (
        <p className={notificationMessage.type}>{notificationMessage.message}</p>
    );
};

Notification.propTypes = {
    notificationMessage: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string
    }),
    setNotificationMessage: PropTypes.func
};

export default Notification;
