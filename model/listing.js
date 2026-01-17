const mongoose=require("mongoose");
const schema= mongoose.Schema;
const reviews= require("./review")

const listSchema= new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        maxlength:250
    },
     image: {
        filename: {
            type: String,
            
        },
        url: {
           type:String,
        default:"https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBhcnRtZW50fGVufDB8fDB8fHww",
        set:(v)=> v===""?v="https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBhcnRtZW50fGVufDB8fDB8fHww":v,
    },
        },
     
     price:{
        type:Number,
        required:true
    },
     location:{
        type:String,
        required:true
    },
     country:{
        type:String,
        required:true
    },
    reviews:[{
        type:schema.Types.ObjectId,
        ref:"Review"
    }]
});
listSchema.post("findOneAndDelete",async (data)=>{
    if(data){
       await  reviews.deleteMany({_id:{$in:data.reviews}})
    }
})
const Listing=mongoose.model("Listing",listSchema);
module.exports=Listing;
