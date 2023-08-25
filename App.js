const express=require('express')
const app = express()
const mongoose=require('mongoose');
const db_connection="mongodb://127.0.0.1:27017/jspider";
async function main(){
    try{
    await mongoose.connect(db_connection)
    }
    catch(err){
        console.log("connection err");
    }
}
main()
.catch(err=>console.log(err))
const courceSchema = new mongoose.Schema({
    courcename:{
        type:String,
        require:true,
        unique:true
    },
    courcefee:{
        type:Number,
        require:true,
    }
},{timestamps:true})
const courceModel=mongoose.model("Jspider",courceSchema)
const port = 4000; 
app.use(express.json())
app.post("/api/addcource",async(req,res)=>{
    const cname = req.body.cname;
    const cfee = req.body.cfee;
    const cource_instance = new courceModel({courcename:cname,courcefee:cfee});
    try{
        await cource_instance.save();
        res.send("product Saved")
    }
    catch(err){
        res.send("prodcut already saved or exists")
    }
})
app.get("/api/getcource",async(req,res)=>{
    try{
       const courceData=await courceModel.find({}) 
       res.send(courceData)
    }
    catch(err){
        res.send("somthing went wrong")
    }
})
app.delete("/api/seleteproduct/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        await courceModel.findByIdAndDelete(id); 
        res.send("Deleated")
     }
     catch(err){
         res.send("somthing went wrong")
     }
})
app.listen(port,()=>console.log(`server wrk on ${port}`))