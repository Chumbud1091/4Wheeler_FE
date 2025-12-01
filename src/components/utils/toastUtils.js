import { toast, ToastContainer } from 'react-toastify';

export const toastSuccess = (message, options = {}) =>
  toast.success(message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...options,
  });

export const toastError = (message, options = {}) =>
  toast.error(message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...options,
  });