const express=require("express");
const app= express();
const userRout=require("./rout/user");
const postRout=require("./rout/post");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use("/user",userRout);
app.use("/post",postRout);
app.use(session({secret:"dirty little secrate",resave:false,saveUninitialized:true}))

app.use(cookieParser("secrat code"));
app.use(flash());
app.get("/test",(req,res)=>{
     res.send("this is test page")
});
app.use((req,res,next)=>{
  res.locals.successMSg=req.flash("success");
  res.locals.errorMsg=req.flash("error");
  next()
})
app.get("/register",(req,res)=>{
    let {name ="anonymus"}=req.query;
    req.session.name=name;
    if (name ==="anonymus") {
        req.flash("error","user is not registered");
    } else {
         req.flash("success","user is  registered succesfully");
    }
   
    res.redirect("/hello")
});
app.get("/hello",(req,res)=>{
    // res.send(`hello,${req.session.name}`);
    res.render("success",{name:req.session.name})
});

// //  check session
// app.get("/checksession",(req,res)=>{

//     if(req.session.count ){
//         req.session.count++
//     }
//     else{
//        req.session.count=1 
//     }
//     res.send(`you visited this site ${req.session.count} times`);


// });
// app.get("/",(req,res)=>{
//     res.send("THIS IS THE ROOT PAGE");
// });
// app.get("/signedcookies",(req,res)=>{
//     res.cookie("color","red",{signed:true});
//     res.send("saved")
// });
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send(':verifyed');
// });


// app.get("/user",(req,res)=>{
//    let {name="anonimous"}=req.cookies;
//      res.send(`youe name is ${name}`)
// })
// app.get("/getCookies",(req,res)=>{
    
//     res.cookie("name","swarnendu");
//       res.cookie("age","19");
       
//       res.send("the coockies are saved")

// });



app.listen(300,()=>{
    console.log(" the app is listening on port 300")
})