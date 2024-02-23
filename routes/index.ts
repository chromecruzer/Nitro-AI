export default eventHandler(() => {
  return { nitro: 'Is Awesome!' }
})


/// Express Server
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { generateResponse } from "./gemini";

dotenv.config();

const app = express();
const port_main = process.env.PORT_MAIN;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug"); // Set up Pug as the view engine
app.use(express.static("views")); // Serve static files (like index.pug) from a 'public' directory

// Define a route to serve the index.pug file
app.get("/", (req, res) => {
    res.render("response");
});

// Define a route to handle POST requests
// app.post("/generate", async (req, res) => {
//     // Assuming generateResponse returns an object with 'prompt' and 'messages'
//     const response = generateResponse(req.body);

//     // Render the response.pug template and pass the response data 
//     res.render("response", response);
// });

app.post("/generate", generateResponse);

//
app.listen(port_main, () => {
    console.log(`Server running on port 💥 http://localhost:${port_main}`);
});
