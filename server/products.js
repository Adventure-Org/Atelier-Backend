const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");


let stream = fs.createReadStream("products.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();
    // create a new connection to the database
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "products",
      password: "",
      port: 5432
    });
    const query =


    id int NOT NULL PRIMARY KEY,
    product_name VARCHAR(255),
    slogan VARCHAR(255),
    product_description VARCHAR(255),
    category VARCHAR(255),
    default_price int,

      "INSERT INTO products (id, product_name, slogan,description, category, default_price) VALUES (...id, ...name, ...slogan, ...description, ...category, ...default_price)";
    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });
stream.pipe(csvStream);