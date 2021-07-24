const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ObjectsToCsv = require("objects-to-csv");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const { SENDGRID_API } = require("./config/keys");

const util = require("util");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const connection = mysql.createConnection({
  host: "localhost",
  user: "dzeno",
  password: "dzeno",
  database: "node_crud",
});

const query = util.promisify(connection.query).bind(connection);

app.use(cors());

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use(express.json());

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
);

app.post("/send", (req, res) => {
  const name = req.body.name;

  const message = req.body.message;
  const subject = req.body.subject;

  console.log(name);
  transporter
    .sendMail({
      to: "dzenan.huremovic@outlook.com",
      from: "motoNode@outlook.com",
      subject: subject,
      html: `<h3>${name}</h3>
    <p>${message}</p>`,
    })
    .then((resp) => {
      res.json({ resp });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

/**
 *  NOVO GET DJELOVI
 *  */
app.get("/api/dijelovi", async (req, res) => {
  let data = [];
  let total = 0;
  let page = req.query.page;
  let perPage = req.query.perPage;

  let limitStart = 0;
  if (page && perPage) {
    limitStart = (page - 1) * perPage;
  }
  const sqlSelect =
    "SELECT * FROM dijelovi LIMIT " + limitStart + ", " + perPage;
  data = await query(sqlSelect);

  total = await query("SELECT count(*) as total FROM dijelovi");
  total = JSON.parse(JSON.stringify(total))[0]["total"];

  res.send({
    data: data,
    pagination: { current: page, total: total, pageSize: perPage },
  });
});
/**
 *  NOVO GET NARUDBE
 *  */
app.get("/api/narudbe", async (req, res) => {
  let data = [];
  let total = 0;
  let page = req.query.page;
  let perPage = req.query.perPage;

  let limitStart = 0;
  if (page && perPage) {
    limitStart = (page - 1) * perPage;
  }
  const sqlSelect =
    "SELECT * FROM narucbe LIMIT " + limitStart + ", " + perPage;
  data = await query(sqlSelect);

  total = await query("SELECT count(*) as total FROM narucbe");
  total = JSON.parse(JSON.stringify(total))[0]["total"];

  res.send({
    data: data,
    pagination: { current: page, total: total, pageSize: perPage },
  });
});

/**
 * NOVO GET REVERSI
 *  */
app.get("/api/reversi", async (req, res) => {
  let data = [];
  let total = 0;
  let page = req.query.page;
  let perPage = req.query.perPage;

  let limitStart = 0;
  if (page && perPage) {
    limitStart = (page - 1) * perPage;
  }
  const sqlSelect =
    "SELECT * FROM reversi LIMIT " + limitStart + ", " + perPage;
  data = await query(sqlSelect);

  total = await query("SELECT count(*) as total FROM reversi");
  total = JSON.parse(JSON.stringify(total))[0]["total"];

  res.send({
    data: data,
    pagination: { current: page, total: total, pageSize: perPage },
  });
});

/**
 *
 * PUT ZA DJELOVE
 */

app.put("/api/dijelovi/:id", async (req, res) => {
  let id = req.params.id;
  let brend = req.body.brend;
  let sifra = req.body.sifra;
  let artikal = req.body.artikal;
  let opis = req.body.opis;
  let cijena = req.body.cijena;
  let komada = req.body.komada;

  const sqlInsert =
    "UPDATE dijelovi SET brend = ?, sifra = ?, artikal = ?, opis = ?, cijena = ?, komada = ? WHERE id = ?";
  await connection.query(
    sqlInsert,
    [brend, sifra, artikal, opis, cijena, komada, id],
    (err, result) => {
      if (!err) {
        res.status(200).send();
      }
      console.log(err);
    }
  );
});
/*
 * GET
 * Dijelovi ZA EDIT
 */

app.get("/api/dijelovi/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const sql = "SELECT * FROM dijelovi WHERE id = ?";
  await connection.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

/**
 * NOVA NARUDBA
 */
app.post("/api/newNarudba", (req, res) => {
  const ime = req.body.imePrezime;
  const broj = req.body.broj;
  const datum = req.body.datum;
  const poslovnica = req.body.poslovnica;
  const opis = req.body.narucbaOpis;
  const sifra = req.body.sifra;

  const sqlInsert =
    "INSERT INTO narucbe (imePrezime, broj, datum, poslovnica, narucbaOpis, sifra) VALUES (?,?,?,?,?,?)";
  connection.query(
    sqlInsert,
    [ime, broj, datum, poslovnica, opis, sifra],
    (err, result) => {
      if (!err) {
        res.status(200).send();
      }
      console.log(err);
    }
  );
});
/**
 *
 * NOVI REVERS
 */
app.post("/api/newRevers", (req, res) => {
  const ime = req.body.ime;
  const broj = req.body.broj;
  const datum = req.body.datum;
  const kvar = req.body.kvar;
  const brojRev = req.body.brojRev;
  const statuss = req.body.statuss;

  const sqlInsert =
    "INSERT INTO reversi (ime, broj, datum, kvar, brojRev, status) VALUES (?,?,?,?,?,?)";
  connection.query(
    sqlInsert,
    [ime, broj, datum, kvar, brojRev, statuss],
    (err, result) => {
      if (!err) {
        res.status(200).send();
      }
      console.log(err);
    }
  );
});
/**
 *
 * NOVI DIO
 */
app.post("/api/newDio", (req, res) => {
  const brend = req.body.brend;
  const sifra = req.body.sifra;
  const artikal = req.body.artikal;
  const opis = req.body.opis;
  const cijena = req.body.cijena;
  const komada = req.body.komada;

  const sqlInsert =
    "INSERT INTO dijelovi (brend, sifra, artikal, opis, cijena, komada) VALUES (?,?,?,?,?,?)";
  connection.query(
    sqlInsert,
    [brend, sifra, artikal, opis, cijena, komada],
    (err, result) => {
      if (!err) {
        res.status(200).send();
      }
      console.log(result);
      console.log(err);
    }
  );
});
/**
 *
 * DELETE NARUDBU
 */
app.delete("/api/delNarudbu/:id/", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const sqlDelete = "DELETE FROM narucbe WHERE id = ?";
  await connection.query(sqlDelete, id, (err, result) => {
    if (!err) {
      res.status(200).send();
    }
    console.log(err);
  });
});

/**
 * DELETE REVERS
 */
app.delete("/api/delRevers/:id/", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const sqlDelete = "DELETE FROM reversi WHERE id = ?";
  await connection.query(sqlDelete, id, (err, result) => {
    if (!err) {
      res.status(200).send();
    }
    console.log(err);
  });
});
/**
 * DELETE DIO
 */
app.delete("/api/delDio/:id/", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const sqlDelete = "DELETE FROM dijelovi WHERE id = ?";
  await connection.query(sqlDelete, id, (err, result) => {
    if (!err) {
      res.status(200).send();
    }
    console.log(err);
  });
});

/**
 * SEARCH ZA DJELOVE
 */

app.get("/api/search/:value", (req, res) => {
  const search = req.params.value;
  let data = [];
  console.log(search);
  const sql = "SELECT * FROM dijelovi WHERE sifra = ?";
  connection.query(sql, search, (err, data) => {
    if (err) throw err;
    res.send({
      data: data,
      pagination: { current: 1, total: 1, pageSize: 30 },
    });
  });
});

/**
 * SEARCH ZA REVERSE
 */

app.get("/api/searchR/:value", (req, res) => {
  const search = req.params.value;
  let data = [];
  console.log(search);
  const sql = "SELECT * FROM reversi WHERE brojRev = ?";
  connection.query(sql, search, (err, data) => {
    if (err) throw err;
    res.send({
      data: data,
      pagination: { current: 1, total: 1, pageSize: 30 },
    });
  });
});

/**
 * SEARCH ZA NARUDBE
 */

app.get("/api/searchN/:value", (req, res) => {
  const search = req.params.value;
  let data = [];
  console.log(search);
  const sql = "SELECT * FROM narucbe WHERE imePrezime = ?";
  connection.query(sql, search, (err, data) => {
    if (err) throw err;
    res.send({
      data: data,
      pagination: { current: 1, total: 1, pageSize: 30 },
    });
  });
});

/**
 * NARUCI DIO
 */
app.post("/api/naruci", (req, res) => {
  const ime = req.body.ime;
  const broj = req.body.broj;
  const datum = req.body.datum;
  const poslovnica = req.body.poslovnica;
  const opis = req.body.opis;
  const sifra = req.body.sifra;

  const sqlInsert =
    "INSERT INTO narucbe (imePrezime, broj, datum, poslovnica, narucbaOpis, sifra) VALUES (?,?,?,?,?,?)";
  connection.query(
    sqlInsert,
    [ime, broj, datum, poslovnica, opis, sifra],
    (err, result) => {
      if (!err) {
        res.status(200).send();
      }
      console.log(err);
    }
  );
});

/**
 * EDIT ZA UPDATE FORMU
 */

app.get("/api/edit/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const sql = "SELECT * FROM users WHERE id = ?";
  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const brend = req.body.brend;
  const sifra = req.body.sifra;
  const artikal = req.body.artikal;
  const opis = req.body.opis;
  const cijena = req.body.cijena;
  const komada = req.body.komada;

  const sqlInsert =
    "UPDATE users SET brend = ?, sifra = ?, artikal = ?, opis = ?, cijena = ?, komada = ? WHERE id = ?";
  connection.query(
    sqlInsert,
    [brend, sifra, artikal, opis, cijena, komada, id],
    (err, result) => {
      if (!err) {
        res.status(200).send();
      }
      console.log(err);
    }
  );
});
/**
 * REGISTER
 */
app.post("/api/register", (req, res) => {
  const poslovnica = req.body.poslovnica;
  const mail = req.body.mail;
  const passwordd = req.body.password;
  console.log(passwordd);
  connection.query(
    "SELECT * FROM login WHERE poslovnica = ?",
    poslovnica,
    (err, res1) => {
      if (res1.length >= 1) {
        res.json({ auth: false, message: "User exist, take another name." });
        console.log(res1);
      } else
        bcrypt.hash(passwordd, saltRounds, (err, hash) => {
          connection.query(
            "INSERT INTO login (poslovnica,mail,password) VALUES (?,?,?)",
            [poslovnica, mail, hash],
            (err, result) => {
              if (!err) {
                res.json({ auth: true, message: "Success created new user !" });
              }
              console.log(err);
            }
          );
        });
    }
  );
});

/**
 *
 * LOGIN
 */

app.post("/api/login", (req, res) => {
  const poslovnica = req.body.office;
  const password = req.body.password;
  connection.query(
    "SELECT * FROM login WHERE poslovnica = ? ",
    poslovnica,
    (err, result) => {
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            if (result[0].isAdmin == 1) {
              res.json({ auth: true, isAdmin: true, result: result });
            } else {
              res.json({ auth: true, isAdmin: false, result: result });
              console.log(result);
            }
          } else {
            res.json({
              auth: false,
              isAdmin: false,
              message: "Wrong username/password combination!",
            });
            console.log("Wrong username/password combination!");
          }
        });
      } else {
        res.json({
          auth: false,
          isAdmin: false,
          message: "User doesn't exist",
        });
        console.log("User doesn't exist");
      }
    }
  );
});

/**
 * CSV ZA DIJELOVE
 *
 */

app.get("/api/generateCsvDi", (req, res) => {
  const sqlSelect = "SELECT * FROM dijelovi";
  connection.query(sqlSelect, (err, result) => {
    (async () => {
      const csv = new ObjectsToCsv(result);

      await csv.toDisk("./../web/public/csv/test.csv");

      res.status(200).send();
    })();
  });
});

/**
 *
 * CSV ZA REVERSE
 */
app.get("/api/generateCsvRe", (req, res) => {
  const sqlSelect = "SELECT * FROM reversi";
  connection.query(sqlSelect, (err, result) => {
    (async () => {
      const csv = new ObjectsToCsv(result);

      await csv.toDisk("./../web/public/csv/test.csv");

      res.status(200).send();
    })();
  });
});
/**
 *
 * CSV ZA NARUDBE
 */
app.get("/api/generateCsvNa", (req, res) => {
  const sqlSelect = "SELECT * FROM narucbe";
  connection.query(sqlSelect, (err, result) => {
    (async () => {
      const csv = new ObjectsToCsv(result);

      await csv.toDisk("./../web/public/csv/test.csv");

      res.status(200).send();
    })();
  });
});

app.listen(3002, () => {
  console.log("running on port 3002");
});
