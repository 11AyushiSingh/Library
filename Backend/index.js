const connection = require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const e = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "SignupKey";
const nodemailer = require("nodemailer");

var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const logauth = (req, res, next)=>{
  var user = req.body;
  if(req.body.email===user.email&& req.body.password===user.password){
    next();
  }
  else{
    res.sendStatus(401);
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ayushisinghrajput96@gmail.com",
    pass: "dbmx cfrs yagg xpgq",
  },
});

app.post("/signup", (req, res) => {
  var user = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  var userData = [user.name, user.email, user.password, otp, user.isVerified];

  bcrypt.hash(user.password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Password hashing error" });
    }

    userData[2] = hashedPassword;

    connection.query(
      "SELECT * FROM signup WHERE email = ?",
      [user.email],
      (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (rows.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }

        connection.query(
          "INSERT INTO signup(name, email, password,otp, isVerified) VALUES(?)",
          [userData],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: "Failed to create user" });
            }
            const token = jwt.sign(
              { email: user.email, id: result.id },
              SECRET_KEY,
              { expiresIn: 60 * 60 * 24 }
            );
            res.status(201).json({ user: userData, token });
          }
        );
      }
    );
  });

    

    let mailOptions = {
      from: "ayushisinghrajput96@gmail.com",
      to: user.email,
      subject: "Your OTP for verification",
      text: `Your OTP is: ${otp} and will expire in 1 minute`,
      html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Pyramidion Book Library</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Pyramidion Book Library. Use the following OTP to complete your Sign Up procedures. OTP is valid for only 1 minute</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Pyramidion Book Library</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Pyramidion Book Library Inc</p>
      <p>Akshaya HQ</p>
      <p>Tamilnadu, India</p>
    </div>
  </div>
</div>
    `,
      
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    setTimeout(() => {
    connection.query(
      "update signup SET otp = ? WHERE email = ?",
    ["000000", req.body.email],)
    },3 * 60 * 1000)
  }
);


// app.post("/signup", (req, res) => {
//   var user = req.body;
//   var userData = [user.name, user.email, user.password];

//   connection.query(
//     "Select * from signup where email = ?",
//     [req.body.email],
//     (err, rows) => {
//       if (rows.length > 0) {
//         return res.status(400).json({ message: "User already exists" });
//       }
//       connection.query(
//         "INSERT INTO signup(name, email, password) VALUES(?)",
//         [userData],
//         (err, rows) => {
//           if (err) {
//             console.log(err);
//           } else {
//             res.send(rows);
//           }
//         }
//       );
//     }
//   );
// });

app.post("/login", (req, res) => {
  console.log(req.body);

  connection.query(
    "SELECT * FROM signup WHERE email = ?",
    [req.body.email],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (rows.length === 0) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const user = rows[0];
      const matchPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      // if (req.body.otp !== user.otp) {
      //   return res.status(400).json({ message: "Invalid OTP" });
      // }
      //  connection.query(
      //   "update signup SET isVerified = ? WHERE email = ?",
      //   [true, req.body.email],

      //  )
      const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY);
      res.status(200).json({ user, token });
    }
  );
});

// app.post("/login", (req, res) => {
//   console.log(req.body);
//   connection.query(
//     "SELECT * FROM signup WHERE email =? AND password = ?",
//     [req.body.email, req.body.password],
//     (err, rows) => {
//       console.log(rows);
//       if (err) {
//         return res.json(err);
//       }
//       if (rows.length > 0) {
//         // console.log('login',res)
//         return res.json("success");
//       } else {
//         console.log(res.body);
//         return res.json("fail");
//       }
//     }
//   );
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/", file.mimetype);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (eq, file, cb) => {
  if (
    file.mimetype === "image/PNG" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage }).any();
//var app = express();
app.use(bodyParser.json());
app.use("/image-view", express.static(path.join(__dirname, "/uploads")));

auth = function(req, res, next) {
  console.log("header", req.headers["authorization"]);
  if(req.headers.authorization != null) {
    next()
  } else {
    return res.sendStatus(401)
  }
}


app.get("/book",auth , (req, res) => {
  connection.query("SELECT * FROM book", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/book/:id", (req, res) => {
  connection.query(
    "SELECT * FROM book WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.delete("/book/:id", (req, res) => {
  connection.query(
    "DELETE FROM book WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/book",(req, res) => {
  console.log(req.body);
  upload(req, res, function (err, data) {
    console.log(req.files);
    console.log(err);
    var book = req.body;
    var bookData = [
      book.Name,
      book.Publisher,
      book.Author,
      book.Availability,
      book.Ledger,
      "http://localhost:8000/image-view/" + req.files[0].filename,
    ];
    connection.query(
      "INSERT INTO book(Name,Publisher,Author,Availability, Ledger,Image) values(?)",
      [bookData],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.send(rows);
        }
      }
    );
  });
  console.log(req.files);
});

app.patch("/book",(req, res) => {
  var book = req.body;

  connection.query(
    "UPDATE book SET ? WHERE id=" + book.id,
    [book],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.put("/book/:id",(req, res) => {
  var book = req.body;
  console.log(book, " book");

  connection.query(
    "UPDATE book SET ? WHERE id=" + book.id,
    [book],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        if (rows.affectedRows == 0) {
          var bookData = [book.Availability, book.Ledger];
          connection.query(
            "INSERT INTO book(Availability,Ledger) values(?)",
            [bookData],
            (err, rows) => {
              if (err) {
                console.log(err);
              } else {
                res.send(rows);
              }
            }
          );
        } else {
          res.send(rows);
        }
      }
    }
  );
});

app.get("/Author", (req, res) => {
  connection.query("SELECT DISTINCT Author FROM book", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/book/author/:Author",(req, res) => {
  console.log(req, "req");
  console.log(res, "res");
  connection.query(
    "SELECT * FROM book WHERE Author=?",
    [req.params.Author],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows, "rows");
        res.send(rows);
      }
    }
  );
});
app.get("/Publisher",(req, res) => {
  connection.query("SELECT DISTINCT Publisher FROM book", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/book/publisher/:Publisher", (req, res) => {
  connection.query(
    "SELECT * FROM book WHERE Publisher = ?",
    [req.params.Publisher],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        res.send(rows);
      }
    }
  );
});

app.listen(8000, () => console.log("Server is running on 8000"));
