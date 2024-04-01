import { useState, useEffect } from "react";

const NotificationBox = ({ message, success = true }) => {
    const [isVisible, setIsVisible] = useState(true);

    const closeNotification = () => setIsVisible(false);

    const bgColor = success ? "bg-green-500" : "bg-red-500";

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return message ? (
        <div
            className={`fixed bottom-4 right-4 text-white text-sm py-2 px-5 rounded-lg shadow-lg flex justify-between items-center ${bgColor}`}
        >
            <p>{message}</p>
            <button
                onClick={closeNotification}
                className="ml-4 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm p-1 focus:outline-none"
            >
                x
            </button>
        </div>
    ) : null;
};

export default NotificationBox;
