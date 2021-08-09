import React from "react";
import { useFormik } from "formik";
import { Dialog, DialogContent, Button, TextField } from "@material-ui/core";

export default function AddForm({ openUploadForm, closeUploadForm, dataHandler, _id }) {
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: (val) => {
      dataHandler({
        func: "PUT",
        _id: _id,
        body: val,
      });
    },
  });

  return (
    <div data-testid="upload-form">
    <Dialog open={openUploadForm} onClose={closeUploadForm} data-testid="upload-form">
      <DialogContent>
        <div>
          <h1>Upload your image</h1>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="image"
              name="image"
              label="Image"
              type="file"
              onChange={(e) => {
                formik.setFieldValue("file", e.target.files[0]);
              }}
            />
            <Button
              fullWidth
              color="primary"
              type="submit"
              variant="contained"
              style={{ marginTop: "12px", marginBottom: "12px" }}
              onClick={closeUploadForm}
            >
              Save Image
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  );
}
