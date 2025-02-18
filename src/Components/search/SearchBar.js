import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SearchBar() {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          border: "2px solid #0095FF",
          borderRadius: "15px",
          overflow: "hidden",
          height: "40px",
        }}
      >
        <TextField
          variant="standard"
          placeholder="Поиск по объявлениям"
          sx={{
            flex: 1,
            borderRadius: 0,
            "& .MuiInputBase-input": {
              padding: "10px 14px",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0095FF",
            borderRadius: 0,
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          Найти
        </Button>
      </Box>
    </Box>
  );
}
