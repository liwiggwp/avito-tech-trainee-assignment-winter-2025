import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const items = [
  {
    name: "Квартира в центре",
    description: "Просторная квартира в центре города",
    location: "Москва",
    type: "Недвижимость",
    propertyType: "Квартира",
    area: 100,
    rooms: 3,
    price: 15000000,
  },
  {
    name: "Toyota Camry",
    description: "Надежный автомобиль",
    location: "Москва",
    type: "Авто",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 15000,
  },
  {
    name: "Ремонт квартир",
    description: "Качественный ремонт квартир",
    location: "Москва",
    type: "Услуги",
    serviceType: "Ремонт",
    experience: 5,
    cost: 50000,
    workSchedule: "Пн-Пт, 9:00-18:00",
  },
  {
    name: "Toyota Camry",
    description: "Надежный автомобиль",
    location: "Москва",
    type: "Авто",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 15000,
  },
  {
    name: "Ремонт квартир",
    description: "Качественный ремонт квартир",
    location: "Москва",
    type: "Услуги",
    serviceType: "Ремонт",
    experience: 5,
    cost: 50000,
    workSchedule: "Пн-Пт, 9:00-18:00",
  },
];

const ItemList = () => {
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
