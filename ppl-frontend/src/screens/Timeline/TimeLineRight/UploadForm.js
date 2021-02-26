import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import configData from "../../../config.json";
import imageUploadAction from "../../../actions";

const UploadForm = (props) => {
  const formData = new FormData();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log("useEffect called in inviteupload");
  }, [image]);
  // onChange event
  const handleChange = (event) => {
    setCaption(event.target.value);
  };

  // Handler for file change
  const handleFile = (event) => {
    setImage(event.target.files[0]);
    console.log(image);
  };

  // Onsubmit event
  const handleSubmit = async (event) => {
    event.preventDefault();

    formData.append("caption", caption);
    formData.append("pet", image);
    let email = localStorage.getItem("email");
    formData.append("email", email);

    axios
      .post(configData.IMAGE_UPLOAD, formData)
      .then((response) => {
        console.log(response);

        // change state in props
        props.dispatch(imageUploadAction());
        document.getElementById("img_upload").reset();
        // props.props((prev) => !prev);
        // alert("upload succeessful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="rght_cate">
      <form
        action=""
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="POST"
        id="img_upload"
      >
        <input type="file" onChange={handleFile} id="pet" required name="pet" />

        <label htmlFor="caption">Caption</label>

        <textarea
          onChange={handleChange}
          name="caption"
          style={{ padding: "4 5 px" }}
          required
        ></textarea>

        <input
          type="submit"
          id="submt"
          style={{ margin: "4px 3px ", color: "white" }}
          className="rght_btn"
          placeholder="Upload"
          value="upload"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { newUpload } = state;
  return { newUpload: newUpload };
};

export default connect(mapStateToProps)(UploadForm);
