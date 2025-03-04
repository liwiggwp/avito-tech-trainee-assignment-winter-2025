import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import Header from "../Components/header/Header";
import SubHeader from "../Components/header/SubHeader";
import Api from "../Services/ApiServices";
import MultiStepForm from "../Components/MultiStepForm";

function Item() {
  const { id } = useParams();
  const { getItemById, item } = Api();
  const user = JSON.parse(localStorage.getItem("user"));
  const [formOpen, setFormOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState(null);

  useEffect(() => {
    getItemById(id);
  }, [id]);

  if (!item) {
    return <Typography>пупупу</Typography>;
  }

  const handleEdit = () => {
    const formattedData = {
      ...item,
      imageUrl: item.imageUrl, 
      additional: {
        propertyType: item.propertyType,
        area: item.area,
        rooms: item.rooms,
        price: item.price,
        brand: item.brand,
        model: item.model,
        year: item.year,
        mileage: item.mileage,
        serviceType: item.serviceType,
        experience: item.experience,
        cost: item.cost,
        workSchedule: item.workSchedule,
      },
    };

    setFormOpen(true);
    setInitialFormData(formattedData); 
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  return (
    <>
      <Header />
      <SubHeader />
      <Container maxWidth="lg">
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold">
              {item.name}
            </Typography>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={item.imageUrl || "default.jpg"}
                alt={item.name}
              />
            </Card>
            <Box marginTop={2}>
              <Typography variant="h5" fontWeight="bold">
                Характеристики
              </Typography>
              <Typography variant="body2">
                Местоположение: {item.location}
              </Typography>
              {item.type === "Недвижимость" && (
                <>
                  <Typography variant="body2">
                    Тип: {item.propertyType}
                  </Typography>
                  <Typography variant="body2">
                    Площадь: {item.area} м²
                  </Typography>
                  <Typography variant="body2">Комнат: {item.rooms}</Typography>
                </>
              )}
              {item.type === "Авто" && (
                <>
                  <Typography variant="body2">Марка: {item.brand}</Typography>
                  <Typography variant="body2">Модель: {item.model}</Typography>
                  <Typography variant="body2">Год: {item.year}</Typography>
                  <Typography variant="body2">
                    Пробег: {item.mileage} км
                  </Typography>
                </>
              )}
              {item.type === "Услуги" && (
                <>
                  <Typography variant="body2">
                    Тип услуги: {item.serviceType}
                  </Typography>
                  <Typography variant="body2">
                    Опыт: {item.experience} лет
                  </Typography>
                  <Typography variant="body2">
                    График работы: {item.workSchedule}
                  </Typography>
                </>
              )}
            </Box>
            <Box marginTop={2}>
              <Typography variant="h5" fontWeight="bold">
                Описание
              </Typography>
              <Typography variant="body2">{item.description}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold">
              {item.price || item.cost || ""}
            </Typography>
            <Box display="flex" gap={2} marginTop={2}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  p: 2,
                }}
              >
                Купить
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  p: 2,
                }}
              >
                В корзину
              </Button>
            </Box>
            <Box marginTop={2}>
              <Typography variant="h6" fontWeight="bold">
                {item.userEmail}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">5</Typography>
                <Rating value={5} readOnly />
                <Typography variant="body2">(18 отзывов)</Typography>
              </Box>
              <Typography sx={{ color: "#0095FF" }}>Подписаться</Typography>
            </Box>
            {user && user.email === item.userEmail && (
              <Box marginTop={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "16px",
                    p: 2,
                  }}
                >
                  Редактировать
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
      <MultiStepForm
        open={formOpen}
        onClose={handleFormClose}
        initialData={initialFormData} 
      />
    </>
  );
}

export default Item;