import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import * as Mui from "@mui/material";
import { Formik, Form } from "formik";
import theme from "src/configs/theme";
import Location from "src/components/location";
import Map from "src/components/map";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="main-wrapper">
        <Mui.Box className="section-default">
          <Mui.Container maxWidth="md" className="pos-relative overflow-visible">
            <Mui.Typography className="text-color-white font-weight-normal mb-2" component="h5" variant="h5">
              Enter start/end location with multiple waypoints!
            </Mui.Typography>
            <Formik
              enableReinitialize={true}
              initialValues={{
                pickupLocation: "",
                waypoint: [],
                dropOffLocation: "",
                totalDistance: 0,
                totalTime: "00:00:00",
              }}
              onSubmit={() => {}}
            >
              {({ values, setFieldValue }) => (
                <Form className="default-form pos-relative">
                  <Mui.Grid container spacing={2} wrap="wrap">
                    <Mui.Grid item xs={12} md={6}>
                      <Location values={values} setFieldValue={setFieldValue} />
                    </Mui.Grid>
                    <Mui.Grid item xs={12} md={6}>
                      <Map values={values} setFieldValue={setFieldValue} />
                    </Mui.Grid>
                  </Mui.Grid>
                </Form>
              )}
            </Formik>
          </Mui.Container>
        </Mui.Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
