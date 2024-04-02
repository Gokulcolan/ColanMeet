import { debounce } from 'lodash';
import { toast, Flip } from "react-toastify";
export const passRegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
export const alphaBets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const phoneRegExp = /^\d{1,20}?$/;
export const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/;
// export const useStyles = makeStyles({
//   root: {
//     "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(255, 255, 255, 0.08)",
//     },
//     "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(255, 255, 255, 0.08)",
//     },
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(255, 255, 255, 0.08)",
//     },
//     "& .MuiOutlinedInput-input": {
//       color: "lightgrey",
//     },
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
//       color: "lightgrey",
//     },
//     "& .MuiInputLabel-outlined": {
//       color: "lightgrey",
//     },
//     "& .MuiInputLabel-outlined.Mui-focused": {
//       color: "lightgrey",
//     },
//   },
// });

export const SuccessToast = (title) => {
  toast.success(title, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "dark",
    transition: Flip,
  });
};

export const ErrorToast = (title) => {
  toast.error(title, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "dark",
    transition: Flip,
  });
};

export const debouncedSuccessToast = debounce(SuccessToast, 1000);
export const debouncedErrorToast = debounce(ErrorToast, 1000);
