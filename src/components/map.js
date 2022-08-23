import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import moment from "moment";
import { IconClock, IconRoute } from "src/components/svg";

const Map = (props) => {
  const [directions, setDirections] = useState(null);
  const directionsService = new window.google.maps.DirectionsService();

  useEffect(() => {
    if (props.values.pickupLocation) {
      directionsService.route(
        {
          origin: props.values.pickupLocation,
          destination: props.values.dropOffLocation ? props.values.dropOffLocation : props.values.pickupLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,
          waypoints: props.values.waypoint,
          unitSystem: window.google.maps.UnitSystem.METRIC,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            const route = result.routes[0];
            let el = 0;
            let elt = 0;
            for (let i = 0; i < route.legs.length; i++) {
              el += route.legs[i].distance.value;
              elt += route.legs[i].duration.value;
            }
            props.setFieldValue("totalDistance", (el / 1000).toFixed(2));
            props.setFieldValue(
              "totalTime",
              moment.utc(moment.duration(elt, "seconds").as("milliseconds")).format("HH:mm:ss")
            );
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    } else {
      // Reset direction
      setDirections(null);
      props.setFieldValue("totalDistance", 0);
      props.setFieldValue("totalTime", "00:00:00");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.values.pickupLocation, props.values.dropOffLocation, props.values.waypoint]);

  const MapWithAMarker = () => (
    <GoogleMap defaultZoom={13}>{directions && <DirectionsRenderer directions={directions} />}</GoogleMap>
  );
  return (
    <Mui.Paper className={`p-0 border-rad-0 shadow-none overflow-hidden`}>
      <MapWithAMarker
        containerElement={<div className="map-item" />}
        mapElement={
          <div
            className="map-item"
            style={{
              height: "30rem",
            }}
          />
        }
      />

      <Mui.Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gridGap="2rem"
        className="p-2 background-color-color1"
      >
        <Mui.Box display="flex" alignItems="center" className="svg-color-primary svg-size-small-2x">
          <IconRoute />
          <Mui.Typography component="h3" variant="h3" className="ml-2 font-weight-medium text-color-primary">
            <Mui.Typography component="span" variant="body1" className="d-block text-color-white">
              Total Distance
            </Mui.Typography>
            {props.values.totalDistance} km
          </Mui.Typography>
        </Mui.Box>

        <Mui.Box display="flex" alignItems="center" className="svg-color-primary  svg-size-small-2x">
          <IconClock />
          <Mui.Typography component="h3" variant="h3" className="ml-2 font-weight-medium text-color-primary">
            <Mui.Typography component="span" variant="body1" className="d-block text-color-white">
              APPROX ETA
            </Mui.Typography>
            {moment(props.values.totalTime, "HH:mm:ss").format("H")}h{" "}
            {moment(props.values.totalTime, "HH:mm:ss").format("m")}m
          </Mui.Typography>
        </Mui.Box>
      </Mui.Box>
    </Mui.Paper>
  );
};
export default Map;
