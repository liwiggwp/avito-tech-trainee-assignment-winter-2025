import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ItemListCategory = ({ items }) => {
  return (
    <Grid container spacing={2} padding={2}>
      {items.map((item, index) => (
        <Grid item xs={12} key={index}>
          <Card sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <CardMedia
              component="img"
              sx={{ width: 140 }}
              image={item.imageUrl}
              alt={item.name}
            />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontStyle: "italic" }}>
                    {item.type}
                  </Typography>
                </Box>
                <Box>
                  <Link to={`/item/${item.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary">
                      Открыть
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemListCategory;