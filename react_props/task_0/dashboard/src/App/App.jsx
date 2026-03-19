/* eslint-disable */
import { Fragment } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import './App.css'

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>
      <Header />
      <Login />
      <Footer />
    </>
  );
}

export default App;