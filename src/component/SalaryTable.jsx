import React, { Component } from "react";
// import "./AdminSalaryTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class AdminSalaryTable extends Component {
  state = {
    salaryData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Employee Name",
        field: "EmployeeName",
        sortable: true,
        // filter: true ,
      },
      {
        headerName: "Salary",
        field: "BasicSalary",
        sortable: true,
        type: "numberColumn",
        filter: "agNumberColumnFilter",
        // filter: true ,
      },
      {
        headerName: "GetPaisa Deduction",
        field: "TaxDeduction",
        sortable: true,
        // filter: true ,
      },
      {
        headerName: "Employee Due",
        field: "EmployeeDue",
        sortable: true,
      },
      {
        headerName: "Bank Name",
        field: "BankName",
        sortable: true,
        // filter: true ,
      },
      {
        headerName: "Account No",
        field: "AccountNo",
        sortable: true,
        // filter: true ,
      },

      {
        headerName: "Account Holder Name",
        field: "AccountHolderName",
        sortable: true,
        // width: 117,
        // filter: true ,
      },
      {
        headerName: "IFSC code",
        field: "IFSCcode",
        sortable: true,
        // width: 117,
        // filter: true ,
      },
      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this),
      },
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderButton.bind(this),
      },
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 200,
      filter: "agTextColumnFilter",
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  salaryObj = [];
  rowDataT = [];

  loadSalaryData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/salary", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.salaryObj = response.data;
        console.log("response", response.data);
        this.setState({ salaryData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.salaryObj.map((data) => {
          let temp = {
            EmployeeName:
              data["FirstName"] +
              " " +
              data["MiddleName"] +
              " " +
              data["LastName"],
            BasicSalary: data["salary"][0]["BasicSalary"],
            BankName: data["salary"][0]["BankName"],
            AccountNo: data["salary"][0]["AccountNo"],
            AccountHolderName: data["salary"][0]["AccountHolderName"],
            IFSCcode: data["salary"][0]["IFSCcode"],
            TaxDeduction: data["salary"][0]["TaxDeduction"],
            EmployeeDue:
              data["salary"][0]["BasicSalary"] -
              data["salary"][0]["TaxDeduction"],
            ID: data._id,
            SalaryID: data["salary"][0]._id,
          };
          this.rowDataT.push(temp);
        });
        //push one more row that will contain all aggregated fields
        this.rowDataT.push({
          EmployeeName: "Total:",
          BasicSalary: "",
          BankName: "",
          AccountNo: "",
          AccountHolderName: "",
          IFSCcode: "",
          TaxDeduction: this.rowDataT.reduce(
            (sum, row) => (sum += parseInt(row.TaxDeduction)),
            0
          ),
          EmployeeDue: this.rowDataT.reduce(
            (sum, row) => (sum += parseInt(row.EmployeeDue)),
            0
          ),
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSalaryDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/salary/" + e, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.loadSalaryData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => {
          console.log(params.data.ID);
          this.onSalaryDelete(params.data.ID);
        }}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => {
          console.log(params.data);
          this.props.onEditSalary({ salary: [params.data] });
        }}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Salary Details</h2>

        <input type="file" id="csvupload" style={{ display: "none" }} />
        <Button id="csv-button" onClick={this.props.onUploadCSV}>
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Upload CSV
        </Button>

        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddSalary}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>

        <div id="clear-both" />

        {!this.state.loading ? (
          <div
            id="table-div"
            className="ag-theme-balham"
            //   style={
            //     {
            //     height: "500px",
            //     width: "100%"
            //   }
            // }
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              // floatingFilter={true}
              // onGridReady={this.onGridReady}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            />
          </div>
        ) : (
          <div id="loading-bar">
            <RingLoader
              css={override}
              sizeUnit={"px"}
              size={50}
              color={"#0000ff"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AdminSalaryTable;
