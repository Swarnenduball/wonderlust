let sample_data=require("./data.js");
let listingModel=require("../model/listing");
const mongoose=require("mongoose");
main()
.then(()=> console.log("the connection is success"))
.catch(err=>console.log(err));


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

async function insertData() {
    
    try{
        await listingModel.deleteMany({});
       sample_data.data= sample_data.data.map((data)=>{
        return  {...data,owner:"6967ac7d740e743ade769d56"}
       } );
        await  listingModel.insertMany(sample_data.data);
        console.log("the data is succesfully inserted")
    }
    catch(err){
        console.log("the data is not inserted",err)
    }
   
}
insertData();