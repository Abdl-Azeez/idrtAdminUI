import React, { useCallback, useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from "./route/PublicRoute";
import { publicRoutesData } from "./route/Index";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { Toast as CustomToast } from "./components/Component";
import { Spinner } from "reactstrap";
import { RedirectAs404 } from "./utils/Utils";

import Layout from "./layout/Index";
import { useSelector, useDispatch } from "react-redux";
import { loadMerchant, generalToastError, errorChecker } from "./store/actions";


const App = () => {
  const { Auth } = useSelector((state) => state);
  const { errorMessage, error, toastMessage, toastType } = useSelector((state) => state.General);
  const [show, setShow] = useState(true);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [messageData, setMessageData] = useState({
    id: null,
    topic: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (errorMessage) {
        setShow(true);
        setNotification({
          title: "Error Message",
          body: errorMessage.toString(),
        });
        setMessageData({
          id: null,
          topic: errorMessage,
        });
      }
    })
  }, [errorMessage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggle = useCallback(() => setShow(!show));

  useEffect(() => {
    if (show && !messageData.id) {
      const hideToast = setTimeout(() => toggle(), 10000);
      return () => clearInterval(hideToast);
    }
    if (show && messageData.topic) {
      const hideToast = setTimeout(() => {
        toggle();
      }, 50000);
      return () => clearInterval(hideToast);
    }
  }, [show, toggle, messageData.id, messageData.topic]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(generalToastError());
      }, 2000);
    }
  }, [error]);


  return (
    <div>
      <CustomToast type={toastType} message={toastMessage} show={error} />

      {notification.title || notification.body ? (
        <Toast
          isOpen={show}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            minWidth: 200,
            zIndex: 9999,
          }}
        >
          <ToastHeader toggle={toggle}>
            <strong
              className="font-weight-bold text-uppercase"
              style={{
                color: `${messageData.topic === "Network Error" ? "red" : "#312f2f"
                  }`,
                marginRight: "20px",
                fontSize: `${messageData.topic === "Network Error" ? "15px" : "14px"
                  }`,
              }}
            >
              {notification.title}
            </strong>
          </ToastHeader>

          <ToastBody className="d-flex flex-column text-dark">
            <div

              className="text-dark"

            >
              {notification.body}
            </div>

          </ToastBody>
        </Toast>
      ) : null}
      {Auth.isAuthenticated !== null ? (
        <>
          <Switch>
            {publicRoutesData.map((route, idx) => (
              <PublicRoute path={route.path} component={route.component} auth={Auth.isAuthenticated} key={idx} />
            ))}

            <PrivateRoute exact auth={Auth.isAuthenticated} path={``} component={Layout}></PrivateRoute>
            <Route component={RedirectAs404}></Route>
          </Switch>
        </>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center text-center">
          <Spinner style={{ width: "10rem", height: "10rem" }} type="grow" color="success" />
        </div>
      )}
    </div>

  );
};
export default withRouter(App);
