const express = require("express");
const app = express();
const residentRoute = express.Router();
const multer = require("multer");

//  Resident model
let Resident = require("../models/Resident");

// Multer File upload settings
const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    const fileName = "image-" + Date.now() + "." + filetype;
    cb(null, fileName);
  },
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype === "image/gif" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// Add resident
residentRoute.post("/create", upload.single("imageFile"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const {
    first_name,
    middle_name,
    last_name,
    sex,
    email,
    phone_number,
    birth_date,
    civil_status,
    address,
    occupation } = req.body;

  const newResident = {
    first_name,
    middle_name,
    last_name,
    sex,
    email,
    phone_number,
    birth_date,
    civil_status,
    address,
    occupation,
    imageFile: url + "/public/" + req.file.filename,
  };

  const addResident = new Resident(newResident);
  addResident
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Residents added successfully!",
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

// Get All
residentRoute.get("/", (req, res, next) => {
  Resident.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single resident
residentRoute.get("/read/:id", (req, res) => {
  Resident.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update resident
residentRoute.put("/update/:id", (req, res, next) => {
  //   const updates = {first_name, middle_name, last_name, sex, email, phone_number, birth_date, civil_status, address, occupation};

  //   if (req.file) {
  //     const imagePath = req.file.filename;
  //     updates.imagePath = imagePath;
  // }

  Resident.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
});

// Delete resident
residentRoute.delete("/delete/:id", (req, res, next) => {
  Resident.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Delete residents
residentRoute.delete("/delete", (req, res, next) => {
  Resident.deleteMany((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = residentRoute;
