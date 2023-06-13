import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DataDrivenForm from "./DataDrivenForm";

export default function AddMember(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(props.value);
  // const classes =styles();

  return (
    <div>
      <Button onClick={handleOpen}>Add Member</Button>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="scrollable-modal-title"
        aria-describedby="scrollable-modal-description"
      >
        <div
          style={{
            overflow: "auto",
            maxHeight: "90%",
            maxWidth: "90%",
            width: "auto",
            margin: "16px",
            backgroundColor: "white",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
            padding: "16px",
          }}
        >
          <Fade in={open}>
            <Box>
              <DataDrivenForm value={props.value} />
            </Box>
          </Fade>
        </div>
      </Modal>
    </div>
  );
}
