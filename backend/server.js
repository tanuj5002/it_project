const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv").config()
const connectDB = require("../backend/config/dbConnection")
const app = express();
const port = process.env.PORT || 5000

app.use(cors())
connectDB();
app.use("/uploads", express.static("uploads"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/listing", require("./routes/listingRoutes"))
app.use("/api/user/", require("./routes/userRoutes"))
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})