import React, { useState, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
} from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import FormOne from "./formOne";
import FormTwo from "./formTwo";
import FormThree from "./formThree";
import "./editorStyle.css";
var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");

class CreateFundraiser extends Component {
  state = {
    step: 0,
    editorState: EditorState.createEmpty(),
    category: "",
    target: "",
    title: "",
    desc: "",
    benefeciaryType: "",
    benefeciaryName: "",
    cause: "",
    media: "",
    city: "",
  };
  handleNext = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  handlePrev = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = (input) => (e) => {
    console.log(input);
    this.setState({ [input]: e.target.value });
  };

  handleSubmit = () => {
    const {
      category,
      target,
      title,
      desc,
      benefeciaryType,
      benefeciaryName,
      cause,
      media,
      city,
    } = this.state;
    var data = new FormData();
    data.append("avatar", media);
    data.append("title", title);
    data.append("email", "rohit@gmail.com");
    data.append("desc", desc);
    data.append("purpose", category);
    data.append("target", target);
    data.append("beneficiary", benefeciaryType);
    data.append("city", city);
    var config = {
      method: "post",
      url: "https://silverline-crowdfunding.herokuapp.com/api/v1/fundraisers/create",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTk2ZTY0NDNlNmI2NmEyNmZmZmU0ZCIsImlhdCI6MTYyMDgwMDUxOCwiZXhwIjoxNjIzMzkyNTE4fQ.kMurIq5v885Gh17M65bcl2sUVgsSFMWTx7Ewc9PNQvI",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      step: 0,
      editorState: EditorState.createEmpty(),
      category: "",
      target: "",
      title: "",
      desc: "",
      benefeciaryType: "",
      benefeciaryName: "",
      cause: "",
      media: "",
      city: "",
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({ editorState: editorState });
    let check;
    check = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    //console.log(check);
    this.setState({ desc: check });
    //this.state.desc = check;
  };

  render() {
    const { step } = this.state;
    const { editorState } = this.state;
    console.log(this.state);
    const {
      category,
      target,
      title,
      desc,
      benefeciaryType,
      benefeciaryName,
      cause,
      media,
      city,
    } = this.state;

    let formValues = {
      category,
      target,
      title,
      desc,
      benefeciaryType,
      benefeciaryName,
      cause,
      media,
      city,
    };

    function getSteps() {
      return ["BASIC INFO", "MEDIA", "STORY"];
    }

    const steps = getSteps();

    const getStepsContent = (stepIndex) => {
      switch (stepIndex) {
        case 0:
          return (
            <FormOne
              formValues={formValues}
              handleNext={this.handleNext}
              handleChange={this.handleChange}
            />
          );
        case 1:
          return (
            <FormTwo
              formValues={formValues}
              handleNext={this.handleNext}
              handlePrev={this.handlePrev}
              handleChange={this.handleChange}
            />
          );
        case 2:
          return (
            <>
              <Typography
                variant="h5"
                style={{ color: "#999", textAlign: "center" }}
              >
                Add Your Story
              </Typography>
              <Editor
                editorState={editorState}
                toolbar={{
                  options: ["inline", "list", "colorPicker"],
                  inline: { options: ["bold", "italic", "underline"] },
                  list: { options: ["unordered", "ordered"] },
                }}
                placeholder="Write a story that does justice to your cause and makes the supporter click the donate button.
                
                Follow these steps:
• Talk about who you're raising funds for, be it yourself or your loved one.
• Explain why you're raising funds.
• Make an appeal to your supporters.
"
                onEditorStateChange={this.onEditorStateChange}
              />
              <FormThree
                formValues={formValues}
                handleSubmit={this.handleSubmit}
                handlePrev={this.handlePrev}
              />
            </>
          );
        default:
          return "Unknown";
      }
    };

    return (
      <div style={styles.root}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {step === steps.length ? (
            "The Steps Completed"
          ) : (
            <>
              {getStepsContent(step)}
              <Button onClick={this.handleNext}>
                {step === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </>
          )}
        </>
        <>
          {step > 0 ? (
            <>
              <Button onClick={this.handlePrev}>Back</Button>
            </>
          ) : (
            ""
          )}
        </>
      </div>
    );
  }
}

const styles = {
  root: {
    width: "50%",
    margin: "auto",
    border: "1px solid #999",
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "green",
    },
  },
  editorcontainer: {
    display: "flex",
    minHeight: "9em",
    borderRadius: "0 0 3px 3px",
    padding: "5px",
    fontSize: "17px",
    fontWeight: "300",
    boxShadow: "0px 0px 3px 1px rgba(15, 15, 15, 0.17)",
  },
};

export default CreateFundraiser;
