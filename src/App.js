import React from "react";
import * as Mui from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Location from "src/components/waypoint";
import Map from "src/components/map";

function App() {
  const schema = Yup.object().shape({
    pickupLocation: Yup.string().required("Enter a valid location").nullable(),
    dropOffLocation: Yup.string().required("Enter a valid location").nullable(),
    waypoint: Yup.array().of(
      Yup.object().shape({
        location: Yup.string().required("Enter a valid location").nullable(),
      })
    ),
  });
  return (
    <>
      <Mui.Typography className="text-color-white font-weight-normal mb-2" component="h5" variant="h5">
        Please enter waypoints
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
        validationSchema={schema}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => (
          <Form className="default-form pos-relative mt-5">
            <Mui.Grid container spacing={4} wrap="wrap">
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
    </>
  );
}

export default App;
