import React from "react";
import { Typography, Grid } from "@mui/material";

const ItemContent = ({ item }) => {
  return (
    <>
      {item.type === "Недвижимость" && (
        <>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "#000", mb: 2, mt: 2 }}
          >
            О квартире
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Тип:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.propertyType}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Количество комнат:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.rooms}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Общая площадь:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.area} м²
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "#000", mb: 2, mt: 2 }}
          >
            Расположение
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Местоположение:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.location}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
      {item.type === "Авто" && (
        <>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "#000", mb: 2, mt: 2 }}
          >
            Характеристики
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Марка:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.brand}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Модель:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.model}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Год:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.year}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Пробег:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.mileage} км
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
      {item.type === "Услуги" && (
        <>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "#000", mt: 2 }}
          >
            Расположение
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" >
                {item.location}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "#000", mb: 2, mt: 2 }}
          >
            Подробности
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Тип услуги:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.serviceType}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Опыт:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.experience}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "#000", mb: 2, mt: 2 }}
          >
            График работы
          </Typography>
          <Grid container spacing={2}>
            
            <Grid item xs={6}>
              <Typography variant="body1">
                {item.workSchedule}
              </Typography>
            </Grid>
          </Grid>
 
        </>
      )}
    </>
  );
};

export default ItemContent;
