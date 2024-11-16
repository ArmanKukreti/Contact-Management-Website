import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ 
  title, 
  open, 
  onClose, 
  children, 
  actions,
  cross 
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullScreen={cross ? true : false} fullWidth={!cross}>
      <DialogTitle>{title}</DialogTitle>
      {cross && <DialogActions>
        {actions ? (
          actions
        ) : (
          <Button color="error" variant="outlined" onClick={onClose} sx={{marginRight: '4rem'}}>
            <CloseIcon/>
          </Button>
        )}
      </DialogActions>}
      <DialogContent>{children}</DialogContent>
      {!cross && <DialogActions>
        {actions ? (
          actions
        ) : (
          <Button color="error" variant="contained" onClick={onClose}>
            Close
          </Button>
        )}
      </DialogActions>}
    </Dialog>
  );
};

export default CustomModal;
