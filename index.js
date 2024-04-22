//importing several dependencies essential for various aspects of the application.
import express from "express";
import flash from "express-flash";
import session from "express-session";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import "dotenv/config";
import pgPromise from "pg-promise";
import render from "./renderLogic(API)/render.js";

//console.log("Imported Shoe ID in main.js:", Window.shoeIdClick);
// //setting up the PostgreSQL database connection using the pg-promise library and using an environment variable DATABASE_URL for the connection string.
const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise();
const db = pgp(connectionString);

export { db, connectionString };

//setting up the Express application with Handlebars as the view engine. Handlebars templates are expected to be located in the views directory, and i've also configured partialsDir and layoutsDir.
const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});

//Creating an Express Application:
const app = express();

//Setting Up Handlebars as the View Engine:
app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

//Configuring the Views Directory:
app.set("views", "./views");

//Using express-flash Middleware:
app.use(flash());

//Serving Static Files:
app.use(express.static("public"));

//first line is for parsing URL-encoded form data, and the second line is for parsing JSON data. The extended: true option allows for parsing nested objects.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configuring session management using express-session. Sessions are used to maintain user data across requests.
app.use(
  session({
    secret: "waiterApplication",
    resave: false,
    saveUninitialized: true,
  })
);

const mainrender = render()

app.get("/signup", mainrender.signUp)
app.post("/signup", mainrender.signUpLogic)
app.get("/login", mainrender.login)
app.post("/login", mainrender.loginLogic)
app.get("/", mainrender.allShoes)
app.get("/shop/:username", mainrender.allShoes);
app.post("/shop/:username", mainrender.addToCart);
app.post("/filter", mainrender.filterShoes);

app.get("/cart", mainrender.cart)
app.get("/admin", mainrender.admin)

app.get("/api/shoes", mainrender.getAllAPIShoes);
app.get("/api/shoes/brand/:brandname/color/:shoecolor/size/:shoesize", mainrender.filterByBrandColorSizeAPI)
app.get("/api/shoes/brand/:brandname/color/:shoecolor", mainrender.filterByBrandColorAPI)
app.get("/api/shoes/color/:shoecolor/size/:shoesize", mainrender.filterByColorSizeAPI)
app.get("/api/shoes/brand/:brandname/size/:shoesize", mainrender.filterByBrandSizeAPI)
app.get("/api/shoes/brand/:brandname", mainrender.filterByBrandAPI)
app.get("/api/shoes/size/:shoesize", mainrender.filterBySizeAPI)
app.get("/api/shoes/color/:shoecolor", mainrender.filterByColorAPI)
app.get("/api/cart", mainrender.getCartAPI)


const PORT = process.env.PORT || 3033;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});