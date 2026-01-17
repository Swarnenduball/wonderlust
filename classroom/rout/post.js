const express=require("express");
const app= express();
let router= express.Router();

router.get("/",(req,res)=>{
    res.send(" this is post page")
});
router.get("/:id",(req,res)=>{
    res.send(" this is post with specific id page")
})
router.patch("/:id/patch",(req,res)=>{
    res.send(" this is post with patch page")
});
module.exports=router;