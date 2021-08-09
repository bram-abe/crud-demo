import React from "react";
import ListTable from "./component/list";
import Form from "./component/form";
import Axios from "axios";
import Upload from "./component/upload";
import {Button, Grid, Container} from "@material-ui/core";
import { act } from "@testing-library/react";

export function test(){
  return "HALLO"
}
export default function App() {
  const [selected_Id, setSelected_Id] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [resetSelected, setResetSelected] = React.useState(false);
  async function DataHandler(opt) {
    if (opt.func === "GET") {
      const response = await Axios.get("http://localhost:4000/api/v1");
      const rows = response.data.map((currentVal, idx) => ({
        id: idx,
        ...currentVal,
      }));
      return rows;
    } else if (opt.func === "ADD") {
      const reader = new FileReader();
      reader.addEventListener("load", async (event) => {
        const newBody = { ...opt?.body };
        newBody.file = event.target.result;
        const response = await Axios.post(
          "http://localhost:4000/api/v1/inventory",
          newBody
        );
        if (response.status >= 299)  {
          alert("Failed to add new data!")
        }else{
          setRefresh(true);
          alert("Added new data success.")
        }
      });
      reader.readAsBinaryString(opt.body.file);
    } else if (opt.func === "PUT") {
        async function CallUpdate() {
          const response = await Axios.put(
            `http://localhost:4000/api/v1/inventory/?_id=${opt?._id}`,
            opt?.body
          );
          if(response.status >= 299){
            alert("Failed to update! Please check your connection and retry.")
          } else {
            SetImage(opt?._id);
            setRefresh(true);
            alert("Data has been updated successfully.")
          }
        }
        if (opt?.body?.file) {
          const reader = new FileReader();
          reader.addEventListener("load", async (event) => {
            opt.body.file = event.target.result;
            CallUpdate();
          });
          reader.readAsBinaryString(opt?.body?.file);
        } else {
          CallUpdate();
        }
    } else if (opt.func === "DELETE") {
      if (opt._id.length !== 0) {
        const QueryParams = opt._id
          .map((val) => {
            return `_id=${val}&`;
          })
          .join("");

        const response = await Axios.delete(
          `http://localhost:4000/api/v1/inventory/?${QueryParams}`
        );
        if (response.status >=299) {
          alert("Delete data failed!")
        }else{
          setResetSelected(true);
          setRefresh(true);
          setResetSelected(false);
          setSelected_Id([]);
          alert("Delete data success.")
        }
      } else {
        alert("Please select the data you want to delete !");
      }
    }
  }
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    DataHandler({ func: "GET" }).then((resp) => {
      act(()=>{
        setData(resp);
        setRefresh(false);
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const [openForm, setOpenForm] = React.useState(false);
  function FormToggle() {
    setOpenForm(!openForm);
  }

  const [openUploadForm, setUploadForm] = React.useState(false);
  function UploadFormToggle() {
    setUploadForm(!openUploadForm);
  }

  const [srcImage, setSrcImage] = React.useState(null);
  const [_id, set_id] = React.useState(null);
  async function SetImage(_id) {
    if (_id) {
      set_id(_id);
      const result = await Axios.get(
        `http://localhost:4000/api/v1/inventory/${_id}`
      );
      setSrcImage(result.data.file);
    } 
  }

  return (
    <Container maxWidth="xl">
    <Grid container spacing={0} justifyContent="center" >
      <Grid item xs={12}>
      <header className="App-header">
        <h1>CRUD Operation</h1>
        <h3>How to use :</h3>
        <h5>
          <li>Read operation are auto-update</li>
          <li>Click any cell to show image</li>
          <li>Click image to change picture</li>
          <li>For create operation click add item button</li>
          <li>
            For delete operation select the data you want to remove then click delete button
          </li>
          <li>
            For update operation please double click the field that need to be
            updated
          </li>
        </h5>
        <img
          src={`data:image/*;base64,${srcImage}`}
          alt="sensor-img"
          style={{
            float: "right",
            display: "grid",
            position: "absolute",
            top: "0",
            right: "0",
            maxWidth: "240px",
          }}
          onClick={UploadFormToggle}
        />
      </header>
      </Grid>
      <Grid item xs={12} >
      <Button color="primary"
              variant="contained"
              onClick={() => FormToggle()}
              style={{bottom:"10px"}}
              >
        Add Item
      </Button>
      <Button color="primary"
              variant="contained"
              onClick={() => DataHandler({ func: "DELETE", _id: selected_Id })}
              style={{float:"right", bottom:"10px"}}
              >
        Delete Item
      </Button>
      </Grid>
      <Grid item xs={12}>
      <Form
        openForm={openForm}
        closeForm={FormToggle}
        dataHandler={DataHandler}
      />
      <ListTable
        rows={data}
        selectHandler={setSelected_Id}
        resetSelection={resetSelected}
        dataHandler={DataHandler}
        showImage={SetImage}
      />
      <Upload
        _id={_id}
        openUploadForm={openUploadForm}
        closeUploadForm={UploadFormToggle}
        dataHandler={DataHandler}
      />
      </Grid>
    </Grid>
    </Container>
  );
}


