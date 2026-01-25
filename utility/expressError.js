class ExpressError extends Error{
    constructor(status,message){
        super();
       
        this.status=status;
        this.message=message;
         console.log(this.message)
    }
}
module.exports=ExpressError;