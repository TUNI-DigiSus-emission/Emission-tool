import axios from "axios";
import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

//function to get data from backend
export default function GetData() {
  const [data, setData] = useState();

  const handleOnClick = () => {
    axios
      .get("http://localhost:8000")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOnClick}>Submit</Button>
      <Typography variant="h3">Fetched data:</Typography>
      <Typography variant="body1">{JSON.stringify(data)}</Typography>
    </Box>
  );
}
