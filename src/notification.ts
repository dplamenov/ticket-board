import { NOTIFICATION_TYPE, Store } from 'react-notifications-component'

const showNotifacion = (title: string, message: string, type: NOTIFICATION_TYPE | undefined) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true
    }
  });
};

export default showNotifacion;