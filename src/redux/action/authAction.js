import router from "next/router";
import { debouncedErrorToast, debouncedSuccessToast } from "../../components/helper";
import { AuthAPIService } from "../api/APIService";
import { forgotCodeAction, registerAction, resetPassAction, signInAction, verifycodeAction } from "../slice/authSlice";

export function registerApi(params) {
  return async (dispatch) => {
    dispatch(registerAction({ isloading: true, totalElements: 0 }));
    AuthAPIService("POST", `/register`, params).then((e) => {
      const { status, message } = e.data;
      if (status === 200) {
        debouncedSuccessToast(message);
        dispatch(
          registerAction({
            isloading: false,
            response: e,
          })
        );
        router.push("/auth/login");
      } else {
        debouncedErrorToast(message);
        dispatch(registerAction({ isloading: false, totalElements: 0 }));
      }
    });
  };
}

export function loginApi(params) {
  return async (dispatch) => {
    dispatch(signInAction({ isloading: true, totalElements: 0 }));
    AuthAPIService("POST", `/login`, params).then((e) => {
      if (e?.status == "success") {
        const { status, message } = e.data;
        if (status === 200) {
          sessionStorage.setItem("accessToken", e?.data?.response?.accessToken);
          sessionStorage.setItem("UserId", e?.data?.response?.userId);
          debouncedSuccessToast(message);
          dispatch(
            signInAction({
              isloading: false,
              response: e,
            })
          );
          router.push("/home/user");
        } else {
          debouncedErrorToast(e.message);
          dispatch(signInAction({ isloading: false, totalElements: 0 }));
        }
      } else {
        debouncedErrorToast(e?.message === "UserName Not Found!" ? "please enter a valid Email" : e.message);
        // debouncedErrorToast(e?.message);
      }
    });
  };
}

// export function oAuthApi(params) {
//   return async (dispatch) => {
//     dispatch(oAuthSignInAction({ isloading: true, totalElements: 0 }));
//     AuthAPIService("POST", `/oauth/login`, params)
//       .then((e) => {
//         const { status, message } = e.data;
//         if (status === 200) {
//           debouncedSuccessToast(message);
//           dispatch(
//             oAuthSignInAction({
//               isloading: false,
//               response: e,
//             })
//           );
//           router.push("/home/user");
//         } else {
//           debouncedErrorToast(message);
//           dispatch(oAuthSignInAction({ isloading: false, totalElements: 0 }));
//         }
//       })
//       .catch((e) => {
//         debouncedErrorToast(e.message);
//         dispatch(oAuthSignInAction({ isloading: false, totalElements: 0 }));
//       });
//   };
// }

export function forgotpasApi(uname) {
  return async (dispatch) => {
    dispatch(forgotCodeAction({ isloading: true, totalElements: 0 }));
    AuthAPIService(
      "POST",
      `/send/forgot/password/otp/tomail?username=${uname?.username}`
    )
      .then((e) => {
        // console.log("otp",e.data.response)
        const { status, message } = e.data;
        if (status === 200) {
          debouncedSuccessToast(message);
          dispatch(
            forgotCodeAction({
              isloading: false,
              response: e,
            })
          );
        } else {
          debouncedErrorToast(message);
          dispatch(forgotCodeAction({ isloading: false, totalElements: 0 }));
        }
      })
      .catch((e) => {
        debouncedErrorToast("Email is not Registered");
        dispatch(forgotCodeAction({ isloading: false, totalElements: 0 }));
      });
  };
}

export function verifyOtpApi(code, uname) {
  return async (dispatch) => {
    dispatch(verifycodeAction({ isloading: true, totalElements: 0 }));
    AuthAPIService("POST", `/verify/otp?otp=${code}&username=${uname}`)
      .then((e) => {
        if (e?.data?.status === 200) {
          debouncedSuccessToast(e?.data?.message);
          dispatch(
            verifycodeAction({
              isloading: false,
              response: e,
            })
          );
          router.push("/auth/forgetPassword/ResetPassword");
        } else {
          debouncedErrorToast(e?.message);
          dispatch(verifycodeAction({ isloading: false, totalElements: 0 }));
        }
      })
      .catch((e) => {
        debouncedErrorToast(e?.message);
        dispatch(verifycodeAction({ isloading: false, totalElements: 0 }));
      });
  };
}

export function resetPasswordApi(cpas, npas, uname) {
  return async (dispatch) => {
    dispatch(resetPassAction({ isloading: true, totalElements: 0 }));
    AuthAPIService(
      "POST",
      `/reset/password?confirmpassword=${cpas}&newpassword=${npas}&username=${uname}`
    )
      .then((e) => {
        // const { status, message, response } = e.data;
        if (e?.data?.status === 200 && e?.data?.response !== null) {
          debouncedSuccessToast(e?.data?.message);
          dispatch(
            resetPassAction({
              isloading: false,
              response: e?.data,
            })
          );
          router.push("/auth/login");
        } else {
          debouncedErrorToast(e?.data?.message);
          dispatch(resetPassAction({ isloading: false, totalElements: 0 }));
        }
      })
      .catch((e) => {
        debouncedErrorToast(e?.message);
        dispatch(resetPassAction({ isloading: false, totalElements: 0 }));
      });
  };
}
