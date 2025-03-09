const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { initialUsers } = require("./data");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "supersecret";

// Генерация токена
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "7d",
  });
};

// Проверка токена
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Нет доступа" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Неверный токен" });
  }
};

// Регистрация пользователя
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Заполните все поля" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: initialUsers.length + 1, email, password: hashedPassword };
  initialUsers.push(user);

  console.log("Зарегистрирован пользователь:", user);

  res.status(201).json({ message: "Пользователь зарегистрирован" });
});

// Авторизация пользователя
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = initialUsers.find((u) => u.email === email);
  if (!user) return res.status(400).json({ error: "Неверные данные" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Неверные данные" });

  const token = generateToken(user);
  res.json({ token, user });
});

// Получение данных о пользователе
router.get("/me", authenticate, (req, res) => {
  const user = initialUsers.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "Пользователь не найден" });

  res.json({
    id: user.id,
    email: user.email,
  });
});

// Поиск email по id пользователя
const getUserEmailById = (userId) => {
  const user = initialUsers.find((u) => u.id === userId);
  return user ? user.email : "Неизвестный пользователь";
};

module.exports = { router, authenticate, getUserEmailById };
