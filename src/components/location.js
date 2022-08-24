import React from "react";
import * as Mui from "@mui/material";
import { Field, FieldArray } from "formik";
import { IconAdd, IconTrash } from "src/components/svg";
import GoogleAutocomplete from "src/components/autocomplete";

const Location = (props) => {
  return (
    <Mui.Card className="default-card-dark-card pos-relative">
      <Mui.Grid container spacing={3}>
        <Mui.Grid item xs={12} md={12} className="form-group-dark">
          <Field name="pickupLocation">
            {({ field, meta }) => (
              <GoogleAutocomplete
                label={"Start Location"}
                variant={"outlined"}
                placeholder="Enter a Location"
                defaultValue={props.values?.pickupLocation || ""}
                touched={meta.touched}
                error={meta.error}
                callback={(description) => {
                  props.setFieldValue("pickupLocation", description || "");
                }}
              />
            )}
          </Field>
        </Mui.Grid>

        <Mui.Grid item xs={12} md={12} className={`w-100`}>
          <FieldArray
            name="waypoint"
            render={(arrayHelpers) => (
              <>
                <Mui.Box display="flex" alignItems="center" className="mb-2">
                  <Mui.IconButton
                    className="btn-icon-square mr-2"
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={() => {
                      if (props.values.waypoint?.length < 5) {
                        arrayHelpers.push({ location: "" });
                      }
                    }}
                  >
                    <IconAdd />
                  </Mui.IconButton>
                  <Mui.Typography className="text-color-primary font-weight-normal" component="h5" variant="h5">
                    Add your waypoint / Add stops
                  </Mui.Typography>
                </Mui.Box>

                {props.values.waypoint?.map((item, index) => (
                  <Mui.Grid container spacing={3} key={index}>
                    <Mui.Grid item xs={12} md={10} className="mt-0 form-group-dark">
                      <Field name={`waypoint.${index}.location`}>
                        {({ field, meta }) => (
                          <GoogleAutocomplete
                            variant={"outlined"}
                            placeholder="Enter a Waypoint"
                            callback={(description) => {
                              props.setFieldValue(`waypoint.${index}.location`, description || "");
                            }}
                          />
                        )}
                      </Field>
                    </Mui.Grid>
                    <Mui.Grid item xs={12} md={2} className="text-right">
                      <Mui.IconButton
                        size="small"
                        className={`svg-color-white`}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <IconTrash />
                      </Mui.IconButton>
                    </Mui.Grid>
                  </Mui.Grid>
                ))}
              </>
            )}
          />
        </Mui.Grid>

        <Mui.Grid item xs={12} md={12} className={`form-group-dark`}>
          <Field name="dropOffLocation">
            {({ field, meta }) => (
              <GoogleAutocomplete
                label={"End Location"}
                variant={"outlined"}
                placeholder="Enter a Location"
                defaultValue={props.values?.dropOffLocation || ""}
                touched={meta.touched}
                error={meta.error}
                callback={(description) => {
                  props.setFieldValue("dropOffLocation", description || "");
                }}
              />
            )}
          </Field>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Card>
  );
};
export default Location;
