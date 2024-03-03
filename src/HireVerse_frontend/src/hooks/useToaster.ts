import { Bounce, toast, ToastOptions } from "react-toastify";

interface IToast {
    message: string;
    toastOptions?: ToastOptions;
    onCloseActions?: () => void;
    onOpenActions?: () => void;
}

const defaultToastOptions: ToastOptions = {
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
};

export default function useToaster() {
    return {
        errorToast: ({
            message = "",
            toastOptions = defaultToastOptions,
            onCloseActions = () => {},
            onOpenActions = () => {},
        }: IToast) => {
            onOpenActions();
            toast.error(message, toastOptions);

            if (toastOptions.autoClose) {
                setTimeout(() => {
                    onCloseActions();
                }, toastOptions.autoClose);
            }
        },
        warnToast: ({
            message = "",
            toastOptions = defaultToastOptions,
            onCloseActions = () => {},
            onOpenActions = () => {},
        }: IToast) => {
            onOpenActions();
            toast.warn(message, toastOptions);

            if (toastOptions.autoClose) {
                setTimeout(() => {
                    onCloseActions();
                }, toastOptions.autoClose);
            }
        },
        successToast: ({
            message = "",
            toastOptions = defaultToastOptions,
            onCloseActions = () => {},
            onOpenActions = () => {},
        }: IToast) => {
            onOpenActions();
            toast.success(message, toastOptions);

            if (toastOptions.autoClose) {
                setTimeout(() => {
                    onCloseActions();
                }, toastOptions.autoClose);
            }
        },
    };
}
