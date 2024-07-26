/* eslint-disable prettier/prettier */
import CircularProgress from "@mui/material/CircularProgress";
export default function Fallback() {
  return (
    <CircularProgress
      sx={{
        color: "white",
        fontSize: 200,
      }}
    />
  );
}
