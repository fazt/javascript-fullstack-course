import app from "./app.js";
import { PORT } from "./config.js";

// Initializations
import "./database.js";

// start the server
app.listen(PORT);
console.log(`Server started on port ${PORT}`);
