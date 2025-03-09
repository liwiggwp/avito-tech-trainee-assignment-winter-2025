import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Api from "../Services/ApiServices";

const categories = ["Недвижимость", "Авто", "Услуги"];
const propertyTypes = ["Квартира", "Дом", "Коттедж"];
const carBrands = ["Toyota", "BMW", "Mercedes", "Audi", "Ford"];
const serviceTypes = ["Ремонт", "Уборка", "Доставка", "Обучение"];

const MultiStepForm = ({ open, onClose, initialData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    type: "",
    imageUrl: "",
    additional: {},
  });
  const { postItem, getUserRequest, updateItem } = Api();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUserRequest();
      if (!currentUser) {
        onClose();
      }
    };
    if (open) {
      fetchUser();
    }
  }, [open, onClose, getUserRequest]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  useEffect(() => {
    console.log(initialData);
    if (initialData) {
      setFormData({
        ...initialData,
        additional: initialData.additional || {},
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      setFormData({
        ...formData,
        type: value,
        additional: {},
      });
    } else if (activeStep === 0) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        additional: { ...formData.additional, [name]: value },
      });
    }
  };

  const handleNumericInput = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.,]/g, "");
    setFormData({
      ...formData,
      additional: { ...formData.additional, [name]: numericValue },
    });
  };

  const isStepOneComplete = () => {
    return (
      formData.name &&
      formData.description &&
      formData.location &&
      formData.type
    );
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      description: formData.description,
      location: formData.location,
      type: formData.type,
      imageUrl: formData.imageUrl,
      ...formData.additional,
    };

    if (payload.type === "Недвижимость") {
      payload.area = parseFloat(payload.area);
      payload.rooms = parseInt(payload.rooms, 10);
      payload.price = parseFloat(payload.price);
    } else if (payload.type === "Авто") {
      payload.year = parseInt(payload.year, 10);
      if (payload.mileage) {
        payload.mileage = parseInt(payload.mileage, 10);
      }
    } else if (payload.type === "Услуги") {
      payload.experience = parseInt(payload.experience, 10);
      payload.cost = parseFloat(payload.cost);
    }
    try {
      if (initialData && initialData.id) {
        const response = await updateItem(initialData.id, payload);
        console.log("Обновлено", response);
      } else {
        const response = await postItem(payload);
        // console.log("Успешно", response);
      }
      setFormData({
        name: "",
        description: "",
        location: "",
        type: "",
        imageUrl: "",
        additional: {},
      });
      setActiveStep(0);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const renderCategoryFields = () => {
    switch (formData.type) {
      case "Недвижимость":
        return (
          <>
            <TextField
              select
              fullWidth
              margin="dense"
              label="Тип недвижимости"
              name="propertyType"
              value={formData.additional.propertyType || ""}
              onChange={handleChange}
              required
            >
              {propertyTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              margin="dense"
              label="Площадь"
              name="area"
              value={formData.additional.area || ""}
              onChange={handleNumericInput}
              required
              inputProps={{
                inputMode: "decimal",
                pattern: "[0-9]*[.,]?[0-9]*",
              }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Количество комнат"
              name="rooms"
              value={formData.additional.rooms || ""}
              onChange={handleNumericInput}
              required
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Цена"
              name="price"
              value={formData.additional.price || ""}
              onChange={handleNumericInput}
              required
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*[.,]?[0-9]*",
              }}
            />
          </>
        );
      case "Авто":
        return (
          <>
            <TextField
              select
              fullWidth
              margin="dense"
              label="Марка"
              name="brand"
              value={formData.additional.brand || ""}
              onChange={handleChange}
              required
            >
              {carBrands.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              margin="dense"
              label="Модель"
              name="model"
              value={formData.additional.model || ""}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Год выпуска"
              name="year"
              value={formData.additional.year || ""}
              onChange={handleNumericInput}
              required
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Пробег (км)"
              name="mileage"
              value={formData.additional.mileage || ""}
              onChange={handleNumericInput}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </>
        );
      case "Услуги":
        return (
          <>
            <TextField
              select
              fullWidth
              margin="dense"
              label="Тип услуги"
              name="serviceType"
              value={formData.additional.serviceType || ""}
              onChange={handleChange}
              required
            >
              {serviceTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              margin="dense"
              label="Опыт работы (лет)"
              name="experience"
              value={formData.additional.experience || ""}
              onChange={handleNumericInput}
              required
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Стоимость"
              name="cost"
              value={formData.additional.cost || ""}
              onChange={handleNumericInput}
              required
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*[.,]?[0-9]*",
              }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="График работы"
              name="workSchedule"
              value={formData.additional.workSchedule || ""}
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Редактировать объявление" : "Разместить объявление"}
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Основное</StepLabel>
          </Step>
          <Step>
            <StepLabel>Детали</StepLabel>
          </Step>
        </Stepper>

        {activeStep === 0 && (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Название"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Описание"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Локация"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <TextField
              select
              fullWidth
              margin="dense"
              label="Категория"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

        {activeStep === 1 && renderCategoryFields()}
      </DialogContent>
      <DialogActions>
        {activeStep > 0 && <Button onClick={handleBack}>Назад</Button>}
        {activeStep < 1 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            color="primary"
            disabled={!isStepOneComplete()}
          >
            Далее
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0095FF" }}
            onClick={handleSubmit}
          >
            Опубликовать
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MultiStepForm;
