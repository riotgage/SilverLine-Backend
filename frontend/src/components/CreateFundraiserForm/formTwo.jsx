import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField } from "@material-ui/core";
import "./formMedia.css";
import PhotoSizeSelectActualRoundedIcon from "@material-ui/icons/PhotoSizeSelectActualRounded";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";

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
    width: "23rem",
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

const FormTwo = (props) => {
  const classes = useStyles();
  let { formValues, handleChange, handleNext, handlePrev, getImage } = props;
  const [errors, setErrors] = useState({});
  const validate = () => {
    let temp = { ...errors };
    temp.city = formValues.city ? "" : "This field is required";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x == "");
  };

  const cont = (e) => {
    e.preventDefault();
    if (validate()) {
      handleNext();
    }
  };

  const back = (e) => {
    e.preventDefault();
    handlePrev();
    console.log(formValues);
  };

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h5" style={{ color: "#999", textAlign: "center" }}>
        Upload Media
      </Typography>
      <div className={classes.formContainer}>
        <form>
          <div className="media-container">
            <div className="media-title">Enter Image or Video</div>
            <div className="media">
              <PhotoSizeSelectActualRoundedIcon
                fontSize="large"
                style={{ color: "white" }}
              />
            </div>
            <div className="media-upload">
              <div className="upload-button">
                <TextField variant="outlined" type="file" onChange={getImage()}>
                  {" "}
                  <PhotoCameraRoundedIcon style={{ marginRight: "0.5rem" }} />
                </TextField>
              </div>
            </div>
          </div>
          <TextField
            label="Enter City"
            variant="outlined"
            className={classes.inputField}
            defaultValue={formValues.city}
            name="city"
            onChange={handleChange("city")}
            error={errors.city ? true : false}
            helperText={errors.city ? "This Field is Required" : ""}
          />
          {!formValues.city ? (
            <>
              <Button className={classes.btn} variant="contained" disabled>
                Save & Continue
              </Button>
            </>
          ) : (
            <>
              <Button
                className={classes.btn}
                variant="contained"
                onClick={cont}
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
      </div>
    </div>
  );
};

export default FormTwo;
