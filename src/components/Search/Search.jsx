import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Search({ handleSearch }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
      }}
    >
      <TextField
        label="search"
        variant="outlined"
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <Button variant="contained" onClick={() => handleSearch(searchValue)}>
        Search
      </Button>
    </Box>
  );
}
