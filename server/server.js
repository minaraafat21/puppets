import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import orders from "./routes/orders.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/orders", orders);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


const multer = require("multer");
const path = require("path");

const upload = multer({ dest: "../client/public/assets" }); // Set your desired folder

app.post("/upload", upload.single("image"), (req, res) => {
  const imagePath = path.join(__dirname, "assets", req.file.filename);
  // Return the path where the image is stored
  res.json({ imagePath: `/assets/${req.file.filename}` }); // Adjust the path according to your structure
});

// Other routes and app configurations
