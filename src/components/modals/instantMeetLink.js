import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Router, { useRouter } from "next/router";
import { Box } from "@mui/system";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { verifyMeetLink } from "src/redux/action/userAction";
import { debouncedSuccessToast } from "../helper";


export function InstantMeetLink({ openmeet, setOpenmeet, roomname }) {

  const getMeetingRoom = useSelector((state) => state.user?.getMeetingRoomInfo);
  const MeetIdresponse = useSelector((state) => state.user?.verifyMeetLinkInfo);


  const dispatch = useDispatch();
  const router = useRouter();
  
  const [meetlink, setMeetlink] = useState("");


  useEffect(() => {
    if (getMeetingRoom?.meetingroomid) {
      setMeetlink(getMeetingRoom.meetingroomid);
    } else {
      setMeetlink("");
    }
  }, [getMeetingRoom]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomname);
    debouncedSuccessToast("you have copied the link")
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(meetlink);
    debouncedSuccessToast("you have copied the ID")
  };

  const handleClose = () => {
    setOpenmeet(false);
  };

  useEffect(() => {
    if (MeetIdresponse?.response?.meetinglink) {
        router.push(MeetIdresponse.response.meetinglink)  
    }
  }, [MeetIdresponse])


  const Join = (link) => {
    if (link) {
      dispatch(verifyMeetLink(link))
    }
  };

  return (
    <div>
      <Dialog
        open={openmeet}
      >
        <Box
          className="popUp"
        >
          <Box>
            <HighlightOffIcon className="close-icon" sx={{ float: "right", cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <DialogTitle
            sx={{
              fontWeight: "700",
              fontSize: "24px",
              color: "#012970",
            }}
          >
            {"Colan Instant Meet"}
          </DialogTitle>
          <DialogContent>
            <table>
              <tbody>
                <tr>
                  <td style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "black",
                  }}> Link </td>
                  <td className="popup-align">{roomname}</td>
                  <td className="popup-align"><ContentCopyIcon onClick={handleCopyLink} style={{ cursor: "pointer" }} /></td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                  <td style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "black",
                  }}>Room ID</td>
                  <td className="popup-align">{meetlink}</td>
                  <td className="popup-align">
                    <ContentCopyIcon onClick={handleCopyId} style={{ cursor: "pointer" }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={() => { Join(roomname) }}
              color="success"
              variant="contained"
            >
              Join Now
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
