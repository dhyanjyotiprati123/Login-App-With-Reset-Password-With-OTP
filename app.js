require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const appRoutes = require("./routes/appRoutes");
const cookieParser = require("cookie-parser")

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = { credentials: true, origin:true};

app.use(express.json({limit: "200mb"}));
app.use(express.urlencoded({extended: true, limit: "200mb"}));
app.use(cors(corsOptions));
app.use(cookieParser());


app.use("/api", appRoutes);

const  connectDB = async()=>{
  try {
     const url = process.env.MONGO_URL;
     mongoose.set('strictQuery', true);

     await mongoose.connect(url);

     console.log("Server Connected To Database");

     app.listen(port, ()=>{
      console.log(`Server Started at port ${port}`);
    });
  } catch (error) {
    console.log(`Cannot Connect To Database ${error}`);
  }
}

connectDB();





