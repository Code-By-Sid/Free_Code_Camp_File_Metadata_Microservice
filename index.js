// Required modules
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Serve HTML file
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// File upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API endpoint for file analysis
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded" });
  }
  const { originalname: name, mimetype: type, size } = req.file;
  res.json({ name, type, size });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});