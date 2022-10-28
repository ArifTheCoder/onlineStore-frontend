import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SNACKBAR_TIMEOUT = 10000;

export type SnackbarMessageProps = {
  text: string;
  severity: "error" | "success";
  isOpen?: boolean;
};

const SnackbarMessage: React.FunctionComponent<SnackbarMessageProps> = ({
  isOpen,
  severity,
  text,
}) => (
  <Snackbar
    open={isOpen}
    autoHideDuration={SNACKBAR_TIMEOUT}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert
      severity={severity}
      variant="filled"
      iconMapping={{ success: <CheckCircleOutlineOutlinedIcon /> }}
    >
      {text}
    </Alert>
  </Snackbar>
);

SnackbarMessage.displayName = "SnackbarMessage";

export default SnackbarMessage;
