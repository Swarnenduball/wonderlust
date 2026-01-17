module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.user){
        
        req.session.currUrl=req.originalUrl
        console.log(req.session.currUrl)
        req.flash("error","You need to login first");
        return res.redirect("/login")
    }
    next()
}
module.exports.redirectUrl=(req,res,next)=>{
    
       if(req.session.currUrl){
        res.locals.redirectURl=req.session.currUrl
        console.log("2222",res.locals.redirectURl)
       }
       next()
}