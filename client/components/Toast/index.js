import { toast } from "react-toastify";

const commonStyling = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const _toast = {
  success: (message, extra = {}) => {
    toast.success(message, {
      ...commonStyling,
    });
  },
  error: (message, extra = {}) => {
    toast.error(message, {
      ...commonStyling,
      ...extra
    });
  }
};

export default _toast;