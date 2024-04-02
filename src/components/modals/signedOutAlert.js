import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { debouncedSuccessToast } from '../helper';
import { Box } from '@mui/material';

export default function SignOutAlert({ signOutAlert, setSignOutAlert, logout }) {

    const handleClose = () => {
        setSignOutAlert(false)
    }

    const handleSignedOut = () => {
        setSignOutAlert(false)
        logout()
        debouncedSuccessToast("You have been signed out")
        sessionStorage.clear();
    }

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
            <Dialog open={signOutAlert} sx={{ padding: "1rem" }}  >
                <Box
                    className="sgnout"
                >
                    <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#012970" }}>Sign Out</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ color: "black", fontSize: "16px", fontFamily: "KoHo,sans-serif" }}>
                            Are you sure you want to Signed out
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions sx={{ padding: "0rem 1rem 1rem 1rem" }}>
                        <Button   color="error"
              variant="contained"  onClick={handleClose}>Cancel</Button>
                        <Button  color="success"
              variant="contained" onClick={handleSignedOut}>Yes</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
