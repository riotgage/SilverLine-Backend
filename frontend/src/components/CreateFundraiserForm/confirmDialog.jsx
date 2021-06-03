import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
    padding: theme.spacing(2),
    top: theme.spacing(20),
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
  },
  titleIcon: {
    color: "green",
    fontSize: "8rem",
    "& :hover": {
      cursor: "default",
    },
    "& .MuiSvgIcon-root ": { cursor: "default" },
    ".MuiButtonBase-root": { cursor: "default" },
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <CheckCircleOutlinedIcon className={classes.titleIcon} />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">
          Thank you for providing us the information.
          <br />
          Our Team will soon get back to you.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          color="primary"
          variant="contained"
          onClick={confirmDialog.onConfirm}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
