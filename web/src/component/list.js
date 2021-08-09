import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  {
    field: "id",
    headerName: "No",
    width: 100,
    editable: false,
  },
  {
    field: "_id",
    headerName: "DeviceId",
    width: 150,
    editable: false,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "field",
    headerName: "Field",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    editable: true,
  },
  {
    field: "availability",
    headerName: "Availability",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
  },
];

export default function ListTable({
  rows,
  selectHandler,
  resetSelection,
  dataHandler,
  showImage,
  refresh
}) {
  const [loading, setLoading] = React.useState(true);
  const [dataRows, setDataRows] = React.useState(rows);
  const [selectedRows, setSelectedRows] = React.useState([]);

  React.useEffect(() => {
    if (resetSelection) {
      setSelectedRows([]);
    }
  }, [resetSelection]);

  React.useEffect(() => {
    if (rows !== null || typeof rows !== "undefined") {
      setDataRows(rows);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [rows]);

  function selectRow(e) {
    let rowsId = [];
    if (e?.length !== 0) {
      const _idSelected = e.map((idx) => {
        rowsId.push(idx);
        return rows[idx]?._id;
      });
      setSelectedRows(rowsId);
      selectHandler(_idSelected);
    } else {
      setSelectedRows([]);
      selectHandler([]);
    }
  }

  function updateRow(e) {
    let _idRef = e.id;
    let fieldRef = e.field;
    let valueRef = e.value;
    dataHandler({
      func: "PUT",
      _id: dataRows[_idRef]._id,
      body: {
        [fieldRef]: valueRef,
      },
    });
  }

  return (
    <div id="list-table" style={{ height: 400, width: "100%" }} data-testid="list-table">
      <DataGrid
        rows={dataRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
        autoHeight
        onCellEditCommit={updateRow}
        selectionModel={selectedRows}
        onSelectionModelChange={selectRow}
        onRowClick={(val) => showImage(val.row._id)}
        style={{display:"flex"}}
      />
    </div>
  );
}
