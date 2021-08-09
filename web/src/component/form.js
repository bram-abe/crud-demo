import React from "react";
import { useFormik } from "formik";
import { Dialog, DialogContent, Button, TextField } from "@material-ui/core";

export default function AddForm({ openForm, closeForm, dataHandler }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      field: "",
      description: "",
      availability: "",
      status: "healthy",
    },
    onSubmit: (val) => {
      dataHandler({
        func: "ADD",
        body: { ...val },
      });
    },
  });

  return (
    <div data-testid="add-form">
    <Dialog open={openForm} onClose={closeForm} >
      <DialogContent>
        <div>
          <h1>Let's add your item!</h1>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              required
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="field"
              name="field"
              label="Field"
              required
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              required
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="image"
              name="image"
              label="Image"
              type="file"
              required
              onChange={(e) => {
                formik.setFieldValue("file", e.target.files[0]);
              }}
            />
            <TextField
              fullWidth
              id="availability"
              name="availability"
              label="Availability"
              type="number"
              required
              onChange={formik.handleChange}
            />
            <Button
              fullWidth
              color="primary"
              type="submit"
              variant="contained"
              style={{ marginTop: "12px", marginBottom: "12px" }}
              onClick={closeForm}
            >
              Save
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  );
}

