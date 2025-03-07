import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import Api from "../../Services/ApiServices";
import MultiStepForm from "../../Components/MultiStepForm";
import ItemContent from "../ItemPage/component/ItemContent";

function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, item, deleteItem } = Api();
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
  const handleDelete = async () => {
    try {
      await deleteItem(id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleFormClose = () => {
    setFormOpen(false);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold" sx={{ m: 1 }}>
              {item.name}
            </Typography>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={item.imageUrl}
                alt={item.name}
              />
            </Card>
            <Box marginTop={2}>
              <ItemContent item={item} />
            </Box>
            <Box marginTop={2}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", color: "#000", mb: 2 }}
              >
                Описание
              </Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold", color: "#000", m: 1 }}
            >
              {item.price || item.cost || ""}
            </Typography>
            <Box marginTop={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#4CAF50",
                      textTransform: "none",
                      fontSize: "16px",
                      p: 2,
                      "&:hover": {
                        backgroundColor: "#388E3C",
                      },
                    }}
                  >
                    Показать телефон
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      p: 2,
                      backgroundColor: "#0095FF",
                      textTransform: "none",
                      fontSize: "16px",
                      "&:hover": {
                        backgroundColor: "#007ACC",
                      },
                    }}
                  >
                    Написать сообщение
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box marginTop={2}>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                Контактное лицо
              </Typography>
              <Typography variant="body" sx={{ mt: 2 }}>
                {item.userEmail}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                <Typography variant="body2">5</Typography>
                <Rating value={5} readOnly />
                <Typography variant="body2">(18 отзывов)</Typography>
              </Box>
              <Typography sx={{ color: "#0095FF" }}>Подписаться</Typography>
            </Box>
            {user && user.email === item.userEmail && (
              <Box marginTop={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEdit}
                      sx={{
                        width: "50%",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontSize: "16px",
                      }}
                    >
                      Редактировать
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDelete}
                      sx={{
                        width: "50%",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontSize: "16px",
                      }}
                    >
                      Удалить
                    </Button>
                  </Grid>
                </Grid>
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
