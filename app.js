const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');
require("dotenv").config();



const app = express();
const passport = require("passport");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const cors = require("cors");
const port = process.env.PORT || 5000; 



app.use('/images', express.static(path.join(__dirname, 'images')));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null,  new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(cors());
// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(multer({ storage: fileStorage, fileFilter: fileFilter}).single("thumbnail"));



// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


// Routes
app.use("/api/users", usersRouter);
app.use("/products", productsRouter);
app.use('/carts', cartsRouter);

// Listen on the defined port

app.listen(port, () => {
  console.log(`Server up and running on port ${port} !`);
});
