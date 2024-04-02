import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Toolbar,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { router } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { UilAngleLeft } from "@iconscout/react-unicons";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { getScheduleApi, getuseridApi, scheduleMeetingApi } from "src/redux/action/userAction";
import { ScheduleMeetDetail } from "../../components/modals/scheduleMeetDetail";
import ScheduleMeetLink from "../../components/modals/scheduleMeetLink";
import { userSelector } from "src/redux/slice/userSlice";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function ScheduleMeet() {

  const { scheduleMeetInfo, getAllUserInfo, sheduleCalendarInfo } = useSelector(userSelector);

  const [personName, setPersonName] = React.useState([]);
  const [userids, setUserids] = useState("");
  const [usernames, setUsernames] = useState("");
  const [StartDateTime, setStartDateTime] = useState("");
  const [EndDateTime, setEndDateTime] = useState("");
  const [meetopen, setMeetopen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false)
  const [UserItem, SetUserItem] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [scheduleDetail, setScheduleDetails] = useState("")

  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();

  const userid =
    typeof window !== "undefined" ? sessionStorage.getItem("UserId") : "";

  useEffect(() => {
    dispatch(getuseridApi());
  }, []);

  useEffect(() => {
    if (getAllUserInfo?.userId && getAllUserInfo?.username) {
      setUserids(getAllUserInfo?.userId);
      setUsernames(getAllUserInfo?.username);
    } else {
      setUserids("");
      setUsernames("");
    }
  }, [getAllUserInfo]);

  useEffect(() => {
    var item = sessionStorage.getItem("username");
    SetUserItem(item);
  }, []);

  useEffect(() => {
    dispatch(getScheduleApi(userid));
  }, [scheduleMeetInfo]);

  const getValidate = () => {
    if (text.length <= 0) {
      setErrorMessage("please fill out this field");
    } else {
      setErrorMessage(null);
    }
  };

  const getInputVal = (e) => {
    setText(e.target.value);
    getValidate();
  };

  const getFormatedDate = (date) => {
    let data = new Date(date);
    return moment(data).format("YYYY-MM-DDTHH:mm:ss[Z]");
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const currentDate = new Date();

  const events = sheduleCalendarInfo?.response?.map((e) => ({
    title: e.title,
    start: moment(e.timeFrom).subtract(5.5, 'hours').toDate(),
    end: moment(e.timeEnd).subtract(5.5, 'hours').toDate(),
    roomid: e.roomid
  })).filter((event) => event.end >= currentDate);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: text,
      startdate: StartDateTime,
      starttime: StartDateTime,
      enddate: EndDateTime,
      endtime: EndDateTime,
      username: UserItem,
      addguests: personName,
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title  is required *"),
      startdate: Yup.string().required("Start Date & Time is required *"),
      enddate: Yup.string().required("End Date & Time is required *"),
      addguests: Yup.array().min(1, "Please select at least one guest *"),
    }),

    onSubmit: (val) => {
      const req = {
        enddate: EndDateTime,
        endtime: EndDateTime,
        startdate: StartDateTime,
        starttime: StartDateTime,
        title: text,
        username: UserItem,
        addguests: personName,
      };
      formik.resetForm();
      dispatch(scheduleMeetingApi(val, req, userid));
      setMeetopen(true);
    },

  });

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <div>
        <section id="hero" className="hero d-flex align-items-center sch-met">
          <div className="container">
            <IconButton
              className="bck-ico"
              onClick={() => {
                router.push("/home/user");
              }}
              sx={{ backgroundColor: "#013289" }}
            >
              <UilAngleLeft />
            </IconButton>
            <div className="row">
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up" style={{ fontFamily: "math" }} >Schedule Meeting</h1>
                <div className="row">
                  <div className="col-lg-12">
                    <div>
                      <TextField
                        sx={{ width: "90%", mt: 5 }}
                        label="Meeting Title"
                        variant="outlined"
                        name="title"
                        type="text"
                        // id="outlined-error"
                        onBlur={formik.handleBlur}
                        value={text}
                        // error={Boolean(formik.touched.title && formik.errors.title)}
                        // helperText={formik.touched.title && formik.errors.title}
                        onChange={(e) => {
                          getInputVal(e);
                        }}
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <div className="err-nt" >{formik.errors.title}</div>
                      ) : null}
                    </div>
                    <div style={{ paddingTop: "30px" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ display: "flex" }}>
                        <DateTimePicker
                          label="Start Date & Time"
                          onChange={(newValue) => {
                            let FormatedDate = getFormatedDate(newValue?.$d);
                            setStartDateTime(FormatedDate);
                            formik.setFieldValue('startDate', FormatedDate);
                          }}
                          sx={{ width: "90%" }}
                        />
                        {formik.touched.startdate && formik.errors.startdate ? (
                          <div className="err-nt" >{formik.errors.startdate}</div>
                        ) : null}
                        <DateTimePicker
                          label="End Date & Time"
                          onChange={(newValue) => {
                            let FormatedDate = getFormatedDate(newValue?.$d);
                            setEndDateTime(FormatedDate);
                            formik.setFieldValue('enddate', FormatedDate);
                          }}
                          sx={{ marginTop: "30px", width: "90%" }}
                        />
                        {formik.touched.enddate && formik.errors.enddate ? (
                          <div className="err-nt" >{formik.errors.enddate}</div>
                        ) : null}
                      </LocalizationProvider>
                    </div>
                    <div style={{ paddingTop: "30px" }}>
                      <div>
                        <FormControl sx={{ width: "90%" }}>
                          <InputLabel id="demo-multiple-checkbox-label">
                            Add Guest
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            {...formik.getFieldProps("addguests")} // Pass Formik's field props
                            input={<OutlinedInput label="Add Guest" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                          >
                            {getAllUserInfo?.map((name) => (
                              <MenuItem key={name.username} value={name.username}>
                                <Checkbox
                                  checked={formik.values.addguests.includes(
                                    name.username
                                  )}
                                />
                                <ListItemText primary={name.username} />
                              </MenuItem>
                            ))}
                          </Select>
                          {formik.touched.addguests && formik.errors.addguests ? (
                            <div className="err-nt" >
                              {formik.errors.addguests}
                            </div>
                          ) : null}
                        </FormControl>
                      </div>
                      <div style={{ paddingTop: "25px" }}>
                        <Button
                          size="large"
                          onClick={formik.handleSubmit}
                          sx={{
                            backgroundColor: "#012970",
                            mt: 1.3,
                            borderRadius: "8px",
                            pt: 1.5,
                            pb: 1.5,
                          }}
                          className="joinbutton"
                          variant="contained"
                        >
                          Schedule Meeting
                        </Button>
                      </div>
                    </div>
                    <Toolbar />
                    <hr />
                  </div>
                </div>
              </div>
              {/* <div
                class="col-lg-6 hero-img"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <img src="/assets/img/3914790.jpg" class="img-fluid" alt="" />
              </div> */}
              <div className="col-lg-6">
                <Card
                  className="meetdetail"
                  sx={{
                    maxWidth: 650,
                    padding: "15px",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    backgroundColor: "#eceff8",
                    scrollbarWidth: "auto"
                  }}
                >
                  <h2
                    style={{
                      color: "#012970",
                      paddingBottom: "10px",
                      fontSize: "32px",
                      fontFamily: "math",
                      fontWeight: "Bold"
                    }}
                  >
                    Upcoming Meetings
                  </h2>
                  <List
                    sx={{
                      maxWidth: 600,
                      position: "relative",
                      overflow: "auto",
                      maxHeight: 430,
                    }}
                    subheader={<li />}
                  >
                    {events?.map((a) => {
                      return (
                        <>
                          <div style={{ padding: "10px" }}>
                            <Card
                              sx={{
                                borderRadius: "15px",
                                backgroundColor: "#FAFAFB",
                                padding: "1rem"
                              }}
                            >
                              <table>
                                <tbody>
                                  <tr>
                                    <td><FiberManualRecordIcon sx={{ fontSize: "14px", color: "green" }} /> </td>
                                    <td className="popup-align" style={{ fontWeight: "700", fontSize: "20px", color: "#012970" }}>{a?.title}</td>
                                  </tr>
                                  <tr>
                                    <td> <AccessTimeIcon sx={{ fontSize: "14px", color: "#012970" }} />
                                    </td>
                                    <td className="popup-align"> {a?.start?.toLocaleString("en-US", options)}{" "}
                                      <b>-</b>{" "}
                                      {a?.end?.toLocaleString("en-US", options)}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </Card>
                          </div>
                        </>
                      );
                    })}
                  </List>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section id="hero" className="hero d-flex align-items-center sch-met">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div style={{ height: 600, marginBottom: "10rem", width: "100%" }}>
                  <h1 data-aos="fade-up" style={{ fontFamily: "math" }} className="sched-title">Calender</h1>
                  <Calendar
                    style={{ paddingTop: "30px " }}
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={(e) => {
                      setScheduleDetails(e)
                      // alert(e.title + e.start + e.end)
                      setOpenDetails(true)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {scheduleMeetInfo != undefined ?
        <ScheduleMeetLink
          meetopen={meetopen}
          setMeetopen={setMeetopen}
          meetlinkk={scheduleMeetInfo}
        /> : " "}
      <ScheduleMeetDetail
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        scheduleDetail={scheduleDetail}
      />
    </>
  );
}

export default ScheduleMeet;
