import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ItemList = ({ items }) => {
  return (
    <Grid container spacing={2} padding={2}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Link to={`/item/${item.id}`} style={{ textDecoration: "none" }}>
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
                <Typography variant="body2" >
                  {item.location}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontStyle: "italic" }}
                >
                  {item.type}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;
