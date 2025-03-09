const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const {
  router: authRoutes,
  authenticate,
  getUserEmailById,
} = require("./auth");
const { initialItems, ItemTypes, initialUsers } = require("./data");

const app = express();

// Разрешаем CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// In-memory хранилище для объявлений
let items = [];
let users = [];

const makeCounter = () => {
  let count = 0;
  return () => count++;
};

const itemsIdCounter = makeCounter();
const usersIdCounter = makeCounter();

// Заполнение данных при запуске
const seedData = () => {
  users = initialUsers.map((user) => ({
    id: usersIdCounter(),
    ...user,
  }));

  items = initialItems.map((item) => ({
    id: itemsIdCounter(),
    ...item,
  }));
};
seedData();

// Получение всех категорий
app.get("/categories", (req, res) => {
  res.json(Object.values(ItemTypes));
});

// Создание нового объявления
app.post("/items", authenticate, (req, res) => {
  const { name, description, location, type, imageUrl, ...rest } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Пользователь не авторизован" });
  }

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Missing required common fields" });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Real estate" });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Auto" });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Services" });
      }
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const defaultImageUrl = "/uploads/placeholder.jpg";
  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    imageUrl: imageUrl || defaultImageUrl,
    userId,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get("/items", (req, res) => {
  const itemsFull = items.map((item) => ({
    ...item,
    userEmail: getUserEmailById(item.userId),
  }));

  res.json(itemsFull);
});

// Получение объявления по его id
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    const itemsFull = {
      ...item,
      userEmail: getUserEmailById(item.userId),
    };
    res.json(itemsFull);
  } else {
    res.status(404).send("Item not found");
  }
});

// Обновление объявления по его id
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Удаление объявления по его id
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Item not found");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
