import { Box } from "@mui/material";
import React from "react";

const FormFieldBox: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box mb={2.5} width="50%">
    {children}
  </Box>
);

FormFieldBox.displayName = "FormFieldBox";

export default FormFieldBox;
