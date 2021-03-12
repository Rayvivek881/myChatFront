import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

function MyApp({ variant, message }) {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar({ message }, { variant });

  return <React.Fragment></React.Fragment>;
}

export default function RightAlert(props) {
  console.log(props);
  return (
    <SnackbarProvider maxSnack={4}>
      {props.alrt[0] ? <MyApp variant={props.alrt[1]} message={props.alrt[2]} /> : ""}
    </SnackbarProvider>
  );
}
