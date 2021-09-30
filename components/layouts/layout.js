import Notification from '../ui/notification';
import MainHeader from './mainheader';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';
export default function Layout(props) {
   const notificationCtx = useContext(NotificationContext);
   const activeNotification = notificationCtx.notification;
    return (
        <>
        <MainHeader />
        <main>
            {props.children}
        </main>
        {activeNotification && (<Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status}/>)}     
        </>
    )
}