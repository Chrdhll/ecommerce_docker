const express = require("express");
const cors = require("cors");

const sequelize = require("./database");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// sync table
(async () => {
  await sequelize.sync();
  console.log("📦 User table ready");
})();

// GET ALL USERS
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// GET USER BY ID
app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// CREATE USER
app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      message: "name, email, role wajib diisi",
    });
  }

  const user = await User.create({ name, email, role });
  res.status(201).json(user);
});

// ---------------------------------------------------------
// UPDATE USER (EDIT) - Endpoint Baru
// ---------------------------------------------------------
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  // 1. Cari user dulu
  const user = await User.findByPk(id);

  // 2. Kalau tidak ada, return 404
  if (!user) return res.status(404).json({ message: "User not found" });

  // 3. Update data (Sequelize otomatis handle field yang tidak dikirim agar tetap data lama jika mau,
  // tapi best practicenya kirim semua data baru atau handle logic di sini)
  await user.update({
    name: name || user.name,   // Pakai data baru, atau tetapkan data lama jika kosong
    email: email || user.email,
    role: role || user.role
  });

  res.json({ message: "User updated", data: user });
});

// ---------------------------------------------------------
// DELETE USER (HAPUS) - Endpoint Baru
// ---------------------------------------------------------
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) return res.status(404).json({ message: "User not found" });

  await user.destroy();

  res.json({ message: "User deleted successfully" });
});

// RUN SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 User service running on port ${PORT}`);
});