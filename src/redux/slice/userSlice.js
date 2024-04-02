import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    getMeetingRoomInfo: [],
    meetingRoomisLoading: false,
    meetLink: "",
    scheduleMeetInfo: {},
    scheduleMeetisLoading: false,
    getAllUserInfo: [],
    getAllUserLoading: false,
    verifyMeetLinkInfo: [],
    verifyMeetLinkisLoading: [],
    sheduleCalendarInfo: [],
    calendarScheduleLoading: false,
  },
  reducers: {
    getMeetingAction: (state, { payload }) => {
      state.getMeetingRoomInfo = payload.response;
      state.meetingRoomisLoading = payload.isloading;
      state.meetLink = payload.meetLink;
    },
    verifyMeetLinkAction: (state, { payload }) => {
       console.log("payload",payload)
      state.verifyMeetLinkInfo = payload.response;
      state.verifyMeetLinkisLoading = payload.isloading;
    },
    scheduleMeetAction: (state, { payload }) => {
      // console.log("schedulepayload", payload);
      state.scheduleMeetInfo = payload.response;
      state.scheduleMeetisLoading = payload.isloading;
    },
    getAllUserId: (state, { payload }) => {
      state.getAllUserInfo = payload.response;
      state.getAllUserLoading = payload.isloading;
    },
    calendarSchedAction: (state, { payload }) => {
      state.sheduleCalendarInfo = payload.response;
      state.calendarScheduleLoading = payload.isloading;
    },
  },
});

export const {
  getMeetingAction,
  scheduleMeetAction,
  getAllUserId,
  verifyMeetLinkAction,
  calendarSchedAction,
} = userSlice.actions;

export const userSelector = (state) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
