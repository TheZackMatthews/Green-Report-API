const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 3001;
const host = "localhost";

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(routes);
const server = app.listen(PORT, host, () => {
  console.log(`Server listening on http://${host}:${PORT}`);
});

export { server };
