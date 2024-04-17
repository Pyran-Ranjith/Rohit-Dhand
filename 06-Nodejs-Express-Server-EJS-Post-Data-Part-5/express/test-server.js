let express = require("express");
// let cookieParser = require('cookie-parser');
let bodyParser = require("body-parser");
let cookieSession = require("cookie-session");

var app = new express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    name: "session",
    keys: ["my secret key"],
    maxAge: 24 * 60 * 60 * 1000, //one day
  })
);

let server = app.listen(3000, () => {
  // console.log('Server started and listning on port ${server.address().port}');
  console.log("Server started and listning on port 3000");
});

app.get("/showdepts", (req, res) => {
  res.render("showdepts", {depts});
//   if(req.session.user_id){
// res.json(depts); 

//   } else {
//       res.json({ result: "User not logged in!" });
//   }
}
);


var depts = [
  { id: 1, dname: "Leagal" },
  { id: 2, dname: "Tech" },
  { id: 3, dname: "Software Development" },];

app.get("/getdepts", (req, res) => {
    if(req.session.user_id){
  res.json(depts);

    } else {
        res.json({ result: "User not logged in!" });
    }
});

//Get Route for the showing of the creation of Department
app.get("/createdept", (req, res) => {
  res.render("createdept");
})


app.post("/createdept", (req, res) => {
  let id = req.body.deptid;
  let dname = req.body.deptname;
  let newDept = {
    id: id,
    dname: dname
  };
  depts.push(newDept);
  res.redirect("/showdepts")
  // res.json({ result: "Department Created" });
});

// //For the cookieParser
// app.post("/createcookie", (req, res) => {
//   res.cookie("userid", "rd");
//   res.json({ result: "Cookie Created" });
// });

// //Clear the cookieParser
// app.post("/logout", (req, res) => {
//   res.cookie("userid");
//   res.json({ result: "Loged Out" });
// });

//CookieSession
app.post("/createsession", (req, res) => {
    req.session.user_id = "rd";
    res.json({ result: "Session Created" });
  });
  
  //Clear the CookieSession
  app.post("/logout", (req, res) => {
    req.session = null;
    res.json({ result: "Loged Out!" });
  });
  