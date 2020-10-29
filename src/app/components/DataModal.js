import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import { FiltersContext } from "../context/FiltersContext";
import { DataGrid } from "@material-ui/data-grid";
import ApiCall from "../fetch-components/RestCountries";

const DataModal = () => {
  const { countries } = React.useContext(FiltersContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "population", headerName: "Population", width: 200 },
  ];

  return (
    <ApiCall endpoint="all">
      {({ isLoading, json }) => {
        if (isLoading) {
          return "";
        }

        const rows = countries.map((code) => {
          const data = json.filter((item) => item.alpha2Code === code)[0];
          return {
            id: data.name,
            name: data.name,
            population: data.population,
          };
        });

        return (
          <div>
            <button type="button" onClick={toggle} className={classes.pill}>
              <DataUsageIcon />
            </button>
            <Modal open={open} onClose={handleClose}>
              <div className={classes.paper}>
                <h2>The numbers...</h2>
                <div style={{ height: "100%" }}>
                  <DataGrid rows={rows} columns={columns} pageSize={30} />
                </div>
              </div>
            </Modal>
          </div>
        );
      }}
    </ApiCall>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  pill: {
    border: "none",
    backgroundColor: "transparent",
    padding: "3px 10px",
    float: "left",
    clear: "both",
    cursor: "pointer",
  },
}));

export default DataModal;
