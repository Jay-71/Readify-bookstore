const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./openapi.yaml");
const logger = require("./logger");
const express = require("express");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: duration + "ms"
    });
  }
  );

  next();
}); 


let books = [];
let nextId = 1;

/* GET /books */
app.get("/books", (req, res) => {
  res.json(books);
});

/* POST /books */
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author required" });
  }

  const book = {
    id: nextId++,
    title,
    author
  };

  books.push(book);
  res.status(201).json(book);
});

/* GET /books/:id */
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

/* PUT /books/:id */
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author required" });
  }

  book.title = title;
  book.author = author;

  res.json(book);
});

/* DELETE /books/:id */
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(index, 1);
  res.status(204).send();
});


/* GET /authors */
app.get("/authors", (req, res) => {
  const uniqueAuthors = [...new Set(books.map(book => book.author))];
  res.json(uniqueAuthors);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => {
  logger.info("Server running on port 3000");
});

app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack
  });
  res.status(500).json({ error: "Internal server error" });
});