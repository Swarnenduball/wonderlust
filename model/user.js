

const mongoose=require("mongoose");
const schema= mongoose.Schema;

const passportLocalMongoose=require("passport-local-mongoose").default;
const  userSchema= new schema({
    email:{
        type:String,
        required:true,
    },
    owner:{
        type:schema.Types.ObjectID,
        ref:"User"
    }
});
userSchema.plugin(passportLocalMongoose)

module.exports=mongoose.model("User",userSchema);;