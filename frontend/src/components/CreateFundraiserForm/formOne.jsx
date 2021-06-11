import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField, MenuItem } from "@material-ui/core";

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

const FormOne = (props) => {
  const classes = useStyles();
  let { formValues, handleChange, handleNext } = props;
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = { ...errors };
    temp.title = formValues.title ? "" : "This field is required";
    if (!formValues.target) {
      temp.target = "This field is required";
    } else {
      temp.target = /[0-9]{4,}/.test(formValues.target)
        ? ""
        : "Should be atleast Rs1000";
    }
    temp.category =
      formValues.category.length != 0 ? "" : "This field is required";
    temp.benefeciaryType =
      formValues.benefeciaryType.length != 0 ? "" : "This field is required";
    if (formValues.benefeciaryType == "Myself") temp.benefeciaryName = "";
    else
      temp.benefeciaryName = formValues.benefeciaryName
        ? ""
        : "This field is required";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x == "");
  };

  const cont = (e) => {
    e.preventDefault();
    if (validate()) {
      handleNext();
    }
  };

  const categories = [
    {
      value: "Medical",
      label: "Medical",
    },
    {
      value: "Education",
      label: "Education",
    },
    {
      value: "Social",
      label: "Social",
    },
    {
      value: "Creative Projects",
      label: "Creative Projects",
    },
  ];
  const benefit = [
    {
      value: "Myself",
      label: "Myself",
    },
    {
      value: "Family Member",
      label: "Family Member",
    },
    {
      value: "Friend",
      label: "Friend",
    },
    {
      value: "Pet or Animal",
      label: "Pet or Animal",
    },
    {
      value: "Colleague",
      label: "Colleague",
    },
    {
      value: "Community",
      label: "Community",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];
  return (
    <div className={classes.mainContainer}>
      <Typography variant="h5" style={{ color: "#999", textAlign: "center" }}>
        Basic Information
      </Typography>
      <div className={classes.formContainer}>
        <form>
          <TextField
            select
            label="Category"
            variant="outlined"
            name="category"
            defaultValue={formValues.category}
            className={classes.inputField}
            onChange={handleChange("category")}
            error={errors.category ? true : false}
            helperText={errors.category}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            label="How much money do you want to raise?"
            defaultValue={formValues.target}
            type="number"
            name="target"
            className={classes.inputField}
            onChange={handleChange("target")}
            error={errors.target ? true : false}
            helperText={
              errors.target ? errors.target : "Should be atleast Rs1000"
            }
          />
          <TextField
            label="Fundraiser Title"
            placeholder="Enter Title"
            variant="outlined"
            className={classes.inputField}
            defaultValue={formValues.title}
            name="title"
            onChange={handleChange("title")}
            error={errors.title ? true : false}
            helperText={errors.title}
          />
          <TextField
            select
            label="Whom are you raising funds for?"
            variant="outlined"
            className={classes.inputField}
            defaultValue={formValues.benefeciaryType}
            name="benefeciaryType"
            onChange={handleChange("benefeciaryType")}
            error={errors.benefeciaryType ? true : false}
            helperText={errors.benefeciaryType}
          >
            {benefit.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {formValues.benefeciaryType === "Myself" ||
          formValues.benefeciaryType === "" ? (
            ""
          ) : (
            <TextField
              label="Enter Benficiary Name"
              variant="outlined"
              className={classes.inputField}
              defaultValue={formValues.benefeciaryName}
              name="benefeciaryName"
              onChange={handleChange("benefeciaryName")}
              error={errors.benefeciaryName ? true : false}
              helperText={errors.benefeciaryName}
            />
          )}

          {!formValues.category ||
          !formValues.benefeciaryType ||
          !formValues.target ||
          !formValues.title ? (
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
        </form>
      </div>
    </div>
  );
};

export default FormOne;
