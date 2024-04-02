import {
  getMeetingAction,
  scheduleMeetAction,
  getAllUserId,
  verifyMeetLinkAction,
  calendarSchedAction,
} from "../slice/userSlice";
import {
  debouncedErrorToast,
  debouncedSuccessToast,
} from "../../components/helper";
import { UserAPIService } from "../api/APIService";

export function meetingRoomApi(req) {
  return async (dispatch) => {
    dispatch(getMeetingAction({ isloading: true, totalElements: 0 }));
    UserAPIService("POST", `/instant/meeting?username=${req?.username}`)
      .then((e) => {
        const { status, message, response, totalElements } = e.data;
        if (status === 200) {
          //  debouncedSuccessToast(message);
          dispatch(
            getMeetingAction({
              isloading: false,
              response: response,
              totalElements: totalElements,
              meetLink: response?.meetinglink,
            })
          );
        } else {
          debouncedErrorToast(message);
          dispatch(getMeetingAction({ isloading: false, totalElements: 0 }));
        }
      })
      .catch((e) => {
        debouncedErrorToast(e?.response?.data?.message);
        dispatch(getMeetingAction({ isloading: false, totalElements: 0 }));
      });
  };
}

export function verifyMeetLink(link) {
  return async (dispatch) => {
    dispatch(verifyMeetLinkAction({ isLoading: true }));
    UserAPIService("get", `/join/meeting?meetinglink=${link}`)
      .then((e) => {
         console.log(e,"sched")
        if (e?.data?.status === 200) {
          // debouncedSuccessToast(e?.data?.message);
          dispatch(
            verifyMeetLinkAction({
              isLoading: false,
              response: e.data,
            })
          );
        } else {
          debouncedErrorToast(e?.message);
          dispatch(verifyMeetLinkAction({ isLoading: false }));
        }
      })
      .catch((e) => {
        debouncedErrorToast(e?.message);
        dispatch(verifyMeetLinkAction({ isLoading: false }));
      });
  };
}

export function scheduleMeetingApi(req) {
  return async (dispatch) => {
    dispatch(scheduleMeetAction({ isloading: true, totalElements: 0 }));
    UserAPIService("POST", `/schedule/meeting`, req)
      .then((e) => {
        // console.log(e, "schedule");
        if (e?.data?.status === 200) {
          debouncedSuccessToast(e.message);
          dispatch(
            scheduleMeetAction({
              isloading: false,
              response: e,
            })
          );
        } else {
          debouncedErrorToast(e?.message);
          dispatch(scheduleMeetAction({ isloading: false, totalElements: 0 }));
        }
      })
      .catch((e) => {
        debouncedErrorToast(e?.message);
        dispatch(scheduleMeetAction({ isloading: false, totalElements: 0 }));
      });
  };
}

export function getuseridApi() {
  // const tokenId =
  //   typeof window !== "undefined" ? sessionStorage.getItem("tokenId") : "";
  return async (dispatch) => {
    dispatch(getAllUserId({ isLoading: true }));
    UserAPIService("get", `https://meet-auth.colan.in/api/auth/getAll`)
      // UserAPIService("get", `http://192.168.2.112:8143/api/auth/getAll`)
      .then((e) => {
        const { status, message, response } = e.data;
        if (status === 200) {
          // debouncedSuccessToast(message);
          dispatch(
            getAllUserId({
              isLoading: false,
              response: response,
            })
          );
        } else {
          debouncedErrorToast(message);
          dispatch(getAllUserId({ isLoading: false }));
        }
      })
      .catch((e) => {
        debouncedErrorToast(e?.response?.data?.message);
        dispatch(getAllUserId({ isLoading: false }));
      });
  };
}

export function getScheduleApi(userid) {
  return async (dispatch) => {
    dispatch(calendarSchedAction({ isLoading: true }));
    UserAPIService("get", `get/schedulemeet/details?userId=${userid}`)
      .then((e) => {
        const { status } = e.data;
        if (status === 200) {
          debouncedSuccessToast(e.message);
          dispatch(
            calendarSchedAction({
              isLoading: false,
              response: e.data,
            })
          );
          // dispatch(getScheduleApi(userid));
        } else {
          debouncedErrorToast(e.message);
          dispatch(calendarSchedAction({ isLoading: false }));
        }
      })
      .catch((e) => {
        debouncedErrorToast(e?.response?.data?.message);
        dispatch(calendarSchedAction({ isLoading: false }));
      });
  };
}
