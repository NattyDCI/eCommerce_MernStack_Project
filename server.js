import http from "http";
import app from "./app/app.js";

//create server
const PORT = process.env.PORT || 7863;
const server = http.createServer(app);
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });