import { useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import CourseList from "../CourseList/CourseList";
import "../CourseList/CourseList.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Notifications from "../Notifications/Notifications";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import { getLatestNotification } from "../utils/utils";
import { APP_ACTIONS, appReducer, initialState } from "./appReducer";
import "./App.css";

const NOTIFICATIONS_ENDPOINT = "/notifications.json";
const COURSES_ENDPOINT = "/courses.json";

function normalizeListPayload(data) {
    if (Array.isArray(data)) {
        return data;
    }
    if (data && Array.isArray(data.notifications)) {
        return data.notifications;
    }
    if (data && Array.isArray(data.courses)) {
        return data.courses;
    }
    return [];
}

function normalizeNotifications(data) {
    const list = normalizeListPayload(data);
    const seen = new Set();

    return list
        .map((notification, index) => {
            const id =
                notification.id ??
                notification._id ??
                notification.guid ??
                index + 1;
            const value = notification.value ?? "";
            const type = notification.type ?? "default";
            const html =
                id === 3 || id === "3"
                    ? { __html: getLatestNotification() }
                    : notification.html;

            return {
                ...notification,
                id,
                value,
                type,
                html,
            };
        })
        .filter((notification) => {
            const key = `${notification.id}|${notification.type}|${notification.value}|${
                notification.html?.__html || ""
            }`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
}

function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const { displayDrawer, user, notifications, courses } = state;

    useEffect(() => {
        let isMounted = true;

        const fetchNotifications = async () => {
            try {
                const response = await axios.get(NOTIFICATIONS_ENDPOINT);
                if (isMounted) {
                    dispatch({
                        type: APP_ACTIONS.SET_NOTIFICATIONS,
                        payload: normalizeNotifications(response.data),
                    });
                }
            } catch {
                if (isMounted) {
                    dispatch({
                        type: APP_ACTIONS.SET_NOTIFICATIONS,
                        payload: [],
                    });
                }
            }
        };

        fetchNotifications();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchCourses = async () => {
            try {
                const response = await axios.get(COURSES_ENDPOINT);
                if (isMounted) {
                    dispatch({
                        type: APP_ACTIONS.SET_COURSES,
                        payload: normalizeListPayload(response.data),
                    });
                }
            } catch {
                if (isMounted) {
                    dispatch({
                        type: APP_ACTIONS.SET_COURSES,
                        payload: [],
                    });
                }
            }
        };

        fetchCourses();

        return () => {
            isMounted = false;
        };
    }, [user]);

    const handleDisplayDrawer = useCallback(() => {
        dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: true });
    }, []);

    const handleHideDrawer = useCallback(() => {
        dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: false });
    }, []);

    const logIn = useCallback((email, password) => {
        dispatch({
            type: APP_ACTIONS.LOGIN,
            payload: { email, password },
        });
    }, []);

    const logOut = useCallback(() => {
        dispatch({ type: APP_ACTIONS.LOGOUT });
    }, []);

    const markNotificationAsRead = useCallback((id) => {
        dispatch({
            type: APP_ACTIONS.MARK_NOTIFICATION_READ,
            payload: id,
        });
    }, []);

    return (
        <div className="app-container">
            <div className="notifications-header">
                <Header user={user} logOut={logOut} />
                <div className="root-notifications">
                    <Notifications
                        notifications={notifications}
                        displayDrawer={displayDrawer}
                        handleDisplayDrawer={handleDisplayDrawer}
                        handleHideDrawer={handleHideDrawer}
                        markNotificationAsRead={markNotificationAsRead}
                    />
                </div>
            </div>

            {user.isLoggedIn ? (
                <BodySectionWithMarginBottom title="Course list">
                    <CourseList courses={courses} />
                </BodySectionWithMarginBottom>
            ) : (
                <BodySectionWithMarginBottom title="Log in to continue">
                    <Login logIn={logIn} />
                </BodySectionWithMarginBottom>
            )}

            <BodySection title="News from the School">
                <p>Holberton School News goes here</p>
            </BodySection>

            <Footer user={user} />
        </div>
    );
}

export default App;
