import { useEffect } from 'react'
import './App.css'

import AppRoute from './routes/routes'

import { useDispatch } from "react-redux";

import {
  fetchMeRequestStart,
  fetchMeRequestSuccess,
  fetchMeRequestFail
} from "./redux/auth/authSlice";

import { getMeAPI } from "./services/authFunction";

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    fetchCurrentUser();
  }, [dispatch]);

  const fetchCurrentUser = async () => {

    dispatch(fetchMeRequestStart());

    try {

      const res = await getMeAPI();

      if (!res || res.error) {
        dispatch(fetchMeRequestFail(res.message));
       // alert("inside if block of fetchCurrentUser in App.jsx, res = ", res);
        return;
      }

      dispatch(fetchMeRequestSuccess(res));
      //alert("inside try block of fetchCurrentUser in App.jsx, res = ", res);


    } catch (error) {
      dispatch(
        fetchMeRequestFail(error.message));
      alert("inside catch block of fetchCurrentUser in App.jsx, error = ", error.message);

    }

  };

  return (
    <>
      <AppRoute />
    </>
  )
}

export default App
