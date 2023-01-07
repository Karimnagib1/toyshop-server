const sqlQuery = require("../config/db");
exports.getProducts = (req, res, next) => {
  sqlQuery("SELECT * FROM products ORDER BY id ASC")
    .then((products) => {
      res.json({ products: products, total: products.length });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductsByCategory = (req, res, next) => {
  const category = req.params.category;
  sqlQuery(`SELECT * FROM products WHERE category = '${category}'`)
    .then((products) => {
      console.log(products);
      res.json({
        products: products,
        total: products.length,
      });
    })
    .catch((error) => console.log(error));
};

exports.getProductById = (req, res, next) => {
  const id = req.params.id;
  sqlQuery(`SELECT * FROM products WHERE id = '${id}'`)
    .then((products) => products[0])
    .then((product) => {
      if (!product) {
        throw Error("Product not found!");
      }
      res.json({
        products: product,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong!");
    });
};
exports.getSearchProducts = (req, res, next) => {
  const term = req.query.q;
  const cTerm = term.charAt(0).toUpperCase() + term.slice(1);
  sqlQuery(
    `SELECT * FROM products WHere title Like '%${term}%' OR description LIKE '%${term}%' OR title LIKE '%${cTerm}%' OR description LIKE '%${cTerm}%' OR brand LIKE '%${term}%' OR category LIKE '%${term}%';`
  )
    .then((products) => {
      res.json({ products: products, total: products.length });
    })
    .catch((e) => console.log(e));
};

exports.postAddProduct = (req, res, next) => {
  const thumbnail = req.file;
  if (!thumbnail) {
    console.log("No file picked");
    return res.status(422).send("Choose a jpeg or png File!");
  }
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const discount = req.body.discount;
  const stock = req.body.stock;
  const brand = req.body.brand;
  const category = req.body.category;
  const userID = req.user.id;
  console.log(req.user);
  const thumbnailURL = process.env.BACKEND_URL  + thumbnail.path.replace("\\", "/");
  sqlQuery(
    `INSERT INTO products (title, description, price, discountPercentage,stock, brand, category, thumbnail, seller_id) VALUES ('${title}', '${description}', ${price}, ${Number(discount)}, ${stock},'${brand}', '${category}', '${thumbnailURL}', ${userID})`
  )
  .then(r => {
    res.send();
  })
  .catch(err => {
    console.log(err);
    res.status(422).send();
  })
};
