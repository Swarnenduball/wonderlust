const express=require("express");
const app= express();
let router= express.Router();

router.get("/",(req,res)=>{
    res.send(" this is USER page")
});
router.get("/:id",(req,res)=>{
    res.send(" this is user with specific id page")
})
router.patch("/:id/patch",(req,res)=>{
    res.send(" this is userwith patch page")
});
module.exports=router;