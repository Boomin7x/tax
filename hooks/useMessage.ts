import { toast, ToastContent, ToastOptions } from "react-toastify";
type TData = "success" | "error";
type TNewToast = {
  status: TData;
  message: ToastContent<TData>;
  options?: ToastOptions<TData>;
};
const useMessage = () => {
  const newToast = ({ status, message }: TNewToast) =>
    toast[status](message, {
      className: "rounded-[0.3px]",
    });
  return newToast;
};

export default useMessage;
