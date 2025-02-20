import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const ItemList = ({ items }) => {
  return (
    <Grid container spacing={2} padding={2}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              alt={item.name}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.price || item.cost}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.location}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;
