import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ConfirmDialog from "./confirmDialog";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const useStyles = makeStyles({
  mainContainer: {
    display: "grid",
    justifyContent: "center",
    position: "relative",
    zIndex: 5,
  },
  formContainer: {
    minWidth: "24rem",
    position: "relative",
    width: "24rem",
    height: "auto",
    padding: "2rem",
  },
  inputField: {
    width: "100%",
    marginBottom: "1rem",
  },
  btn: {
    width: "100%",
    height: "3rem",
    background: "blue",
    marginBottom: "1rem",
    color: "#fff",
    "&:hover": {
      background: "green",
    },
  },
});

const FormThree = (props) => {
  const classes = useStyles();
  let { formValues, handleSubmit, handlePrev } = props;
  const [errors, setErrors] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  const validate = () => {
    let temp = { ...errors };
    temp.desc = formValues.desc === "<p></p>" ? "" : "This field is required";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x == "");
  };

  const cont = (e) => {
    e.preventDefault();
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    handleSubmit();
  };

  const back = (e) => {
    e.preventDefault();
    handlePrev();
    console.log(formValues);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <form>
          {!formValues.desc ? (
            <>
              <Button
                className={classes.btn}
                variant="contained"
                onClick={cont}
                disabled
              >
                Save & Continue
              </Button>
            </>
          ) : (
            <>
              <Button
                style={{ width: "23rem" }}
                className={classes.btn}
                variant="contained"
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "Hello",
                    onConfirm: cont,
                  });
                }}
              >
                Save & Continue
              </Button>
            </>
          )}
          <br />
          <>
            <Button className={classes.btn} variant="contained" onClick={back}>
              Back
            </Button>
          </>
        </form>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </div>
    </div>
  );
};

export default FormThree;
