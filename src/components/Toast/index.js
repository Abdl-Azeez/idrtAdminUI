import React, { useEffect } from "react";
import { Icon } from "../../components/Component";
import { ToastContainer, toast } from "react-toastify";
import { Switch } from "react-router";

const CloseButton = () => {
  return (
    <span className="btn-trigger toast-close-button" role="button">
      <Icon name="cross"></Icon>
    </span>
  );
};
const ReactToastify = ({ type, message, show }) => {
  const execToast = (placement) => {
    toast.info(`This is a note for ${placement} toast`, {
      position: "top-right",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      closeButton: <CloseButton />,
    });
  };

  const successToast = (message) => {
    toast.success(message ? message : "Success", {
      position: "top-right",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      closeButton: <CloseButton />,
    });
  };

  const warningToast = (message) => {
    toast.warning(message ? message : "Warning!!!", {
      position: "top-right",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      closeButton: <CloseButton />,
    });
  };

  const infoToast = (message) => {
    toast.info(message ? message : "Info!!!", {
      position: "top-right",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      closeButton: <CloseButton />,
    });
  };

  const errorToast = (message) => {
    toast.error(message ? message : "Error!!!", {
      position: "top-right",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      closeButton: <CloseButton />,
    });
  };

  useEffect(() => {
    if (show) {
      switch (type) {
        case "success":
          successToast(message);
          break;
        case "error":
          errorToast(message);
          break;
        case "info":
          infoToast(message);
          break;
        case "info":
          warningToast(message);
          break;
      }
    }
  }, [type, message, show]);

  return (
    <React.Fragment>
      <ToastContainer />
    </React.Fragment>
  );
};

export default ReactToastify;
