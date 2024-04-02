import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from "@mui/system";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRouter } from 'next/router';
import { verifyMeetLink } from "src/redux/action/userAction";
import { debouncedErrorToast, debouncedSuccessToast } from "../helper";

export function ScheduleMeetDetail({ openDetails, setOpenDetails, scheduleDetail }) {
    const MeetIdresponse = useSelector((state) => state.user?.verifyMeetLinkInfo)
     console.log(scheduleDetail,"scheduleDetail")
   
    // console.log(MeetIdresponse,"MeetIdresponse32")

    const dispatch = useDispatch()
    const router = useRouter()

    const handleClose = () => {
        setOpenDetails(false);
    };

    const currentDate = new Date();
    const date = new Date(currentDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const convertedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    // console.log(convertedDateTime, "convertedDateTime")


    // const currentDate = new Date();
    // const utcOffset = 5.5 * 60 * 60 * 1000; // IST offset is UTC+5:30 in milliseconds

    // // Convert current date to IST
    // const istDate = new Date(currentDate.getTime() + utcOffset);

    // const year = istDate.getFullYear();
    // const month = String(istDate.getMonth() + 1).padStart(2, "0");
    // const day = String(istDate.getDate()).padStart(2, "0");
    // const hours = String(istDate.getHours()).padStart(2, "0");
    // const minutes = String(istDate.getMinutes()).padStart(2, "0");
    // const seconds = String(istDate.getSeconds()).padStart(2, "0");

    // const convertedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

    // console.log(convertedDateTime, "convertedDateTime");
    useEffect(() => {
        if (MeetIdresponse?.response && MeetIdresponse.response.length > 0) {
            const meetingStartTime = MeetIdresponse.response[0].meetingstarttime;
            const meetingLink = MeetIdresponse.response[0].meetinglink;
            
            if (convertedDateTime <= meetingStartTime) {
                debouncedErrorToast("Meeting is not started");
            } else {
                debouncedSuccessToast("Meeting is Started");
                // router.push(meetingLink);
            }
        }
    }, [MeetIdresponse]);

    const handleClick = async (meetid) => {

        let link = `https://meet.colan.in/meetingRoom/?roomid=${meetid}`
        if (link) {
            await dispatch(verifyMeetLink(link))
        }



        // if (convertedDateTime <= scheduleDetail?.start) {
        //     debouncedErrorToast("Meeting is not started")
        // }
        // else {
        //     debouncedSuccessToast("Meeting is started")
        //     let link = `https://meet.colan.in/meetingRoom/?roomid=${meetid}`
        //     if (link) {
        //         await dispatch(verifyMeetLink(link))
        //     }
        // }
    }

    // useEffect(() => {
    //     if (MeetIdresponse?.response?.meetinglink) {
    //         router.push(MeetIdresponse?.response?.meetinglink)
    //     }
    // }, [MeetIdresponse])

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`https://meet.colan.in/meetingRoom/?roomid=${scheduleDetail?.roomid}`);
        debouncedSuccessToast("you have copied the link");
    };

    const handleCopyId = () => {
        navigator.clipboard.writeText(scheduleDetail?.roomid);
        debouncedSuccessToast("you have copied the Room ID");
    };

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return (

        <div>

            <Dialog open={openDetails}>
                <Box
                    className="popUp"
                >
                    <Box>
                        <HighlightOffIcon className="close-icon" sx={{ float: "right", cursor: "pointer" }} onClick={handleClose} />
                    </Box>
                    <DialogTitle sx={{
                        fontWeight: "700",
                        fontSize: "24px",
                        color: "#012970",
                    }}>
                        {"Schedule Metting Details "}
                    </DialogTitle>

                    <DialogContent>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        color: "black",
                                    }}> Title </td>
                                    <td className="popup-align">{scheduleDetail?.title}</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        color: "black",
                                    }}> Duration  </td>
                                    <td className="popup-align">{scheduleDetail?.start?.toLocaleString('en-US', options)} <b>-</b> {scheduleDetail?.end?.toLocaleString('en-US', options)} </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        color: "black",
                                    }}> Link </td>
                                    <td className="popup-align">{`https://meet.colan.in/meetingRoom/?roomid=${scheduleDetail?.roomid}`}</td>
                                    <td className="popup-align"><ContentCopyIcon onClick={handleCopyLink} style={{ cursor: "pointer" }} /></td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                        color: "black",
                                    }}>Room ID</td>
                                    <td className="popup-align">{scheduleDetail?.roomid} </td>
                                    <td className="popup-align">
                                        <ContentCopyIcon onClick={handleCopyId} style={{ cursor: "pointer" }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </DialogContent>

                    <DialogActions
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => { handleClick(scheduleDetail?.roomid) }}
                        >
                            Join
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

        </div>
    );
}

