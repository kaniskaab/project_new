import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Title from "../Title";
import AllergyForm from "./AllergyForm";
import PastConsultation from "../PastConsultation";
import UpcomingConsultation from "../UpcomingConsulatation";
import { useNavigate } from "react-router-dom";

export default function DetailPage(props) {
  const navigate = useNavigate();
  const mainId = props.mainId,
    fmId = props.fmId;
  const Handle = () => {
    navigate("/getC", { state: { mainId, fmId } });
  };
  return (
    <>
      <Box
        sx={{ width: "100%", backgroundColor: "#C9D1D5", borderRadius: "8px" }}
        marginTop={5}
        padding={2}
      >
        {console.log(props)}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <div style={{ height: "100%" }}>
              <Title>Allergies</Title>
              <AllergyForm
                value={props.mainId}
                fmId={props.fmId}
                new={props.id}
              />
              {console.log(props.id)}
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div style={{ height: "100%" }}>
              <PastConsultation />
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div style={{ height: "100%" }}>
              <UpcomingConsultation />
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div style={{ height: "100%" }}>
              <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: 40 }}
                  onClick={Handle}
                >
                  Book Consultation
                </Button>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
