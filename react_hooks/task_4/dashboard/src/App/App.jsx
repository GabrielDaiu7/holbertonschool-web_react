import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import CourseList from "../CourseList/CourseList";
import "../CourseList/CourseList.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Notifications from "../Notifications/Notifications";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import AppContext from "../Context/context";
import { getLatestNotification } from "../utils/utils";
import "./App.css";

const contextUser = { email: "", password: "", isLoggedIn: false };
const isDev =
  typeof process !== "undefined" &&
  process.env &&
  process.env.NODE_ENV !== "production";

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [user, setUser] = useState(contextUser);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/notifications.json", {
          signal: controller.signal,
        });
        const data = response.data || [];
        const normalizedNotifications = data.map((notification) => {
          if (notification.id === 3) {
            return {
              ...notification,
              html: { __html: getLatestNotification() },
            };
          }
          return notification;
        });
        if (!controller.signal.aborted) {
          setNotifications(normalizedNotifications);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setNotifications([]);
        }
        if (isDev) {
          console.error(error);
        }
      }
    };

    fetchNotifications();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/courses.json", {
          signal: controller.signal,
        });
        if (!controller.signal.aborted) {
          setCourses(response.data || []);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setCourses([]);
        }
        if (isDev) {
          console.error(error);
        }
      }
    };

    fetchCourses();

    return () => {
      controller.abort();
    };
  }, [user]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const logOut = useCallback(() => {
    setUser({ ...contextUser });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  const contextValue = useMemo(() => ({ user, logOut }), [user, logOut]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="notifications-header">
        <Header />
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

      <Footer />
    </AppContext.Provider>
  );
}

export default App;
