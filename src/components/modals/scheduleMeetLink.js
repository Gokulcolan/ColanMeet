import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box } from "@mui/system";
import { debouncedSuccessToast } from "../helper";


function ScheduleMeetLink({ meetopen, setMeetopen, meetlinkk }) {

  const handleClose = () => {
    setMeetopen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(` https://meet.colan.in/meetingRoom/?roomid=${meetlinkk?.data?.response?.roomid
      ? meetlinkk?.data?.response?.roomid
      : meetlinkk?.message}`);
    debouncedSuccessToast("you have copied the link");
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(meetlinkk?.data?.response?.roomid
      ? meetlinkk?.data?.response?.roomid
      : meetlinkk?.message)
    debouncedSuccessToast("you have copied the Room ID");
  };

  return (
    <div>
      <Dialog open={meetopen}>
        <Box
          className="popUp"
        >
          <Box>
            <HighlightOffIcon className="close-icon" sx={{ float: "right", cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <DialogTitle
            sx={{
              fontWeight: "700",
              fontSize: "30px",
              color: "#012970",
            }}
          >
            {"Schedule Metting Link"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <table>
                <tbody>
                  <tr>
                    <td style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "black",
                    }}> Link </td>
                    <td className="popup-align">{`https://meet.colan.in/meetingRoom/?roomid=${meetlinkk?.data?.response?.roomid
                        ? meetlinkk?.data?.response?.roomid
                        : meetlinkk?.message}`}
                    </td>
                    <td className="popup-align">
                      <ContentCopyIcon onClick={handleCopyLink} style={{ cursor: "pointer" }} />
                    </td>
                  </tr>
                  <tr><td>&nbsp;</td></tr>
                  <tr>
                    <td style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "black",
                    }}>Room ID</td>
                    <td className="popup-align">{meetlinkk?.data?.response?.roomid
                      ? meetlinkk?.data?.response?.roomid
                      : meetlinkk?.message}</td>
                    <td className="popup-align">
                      <ContentCopyIcon onClick={handleCopyId} style={{ cursor: "pointer" }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}

export default ScheduleMeetLink;
