import mongoose from "mongoose"
const connection ={};
 const connectToDb= async()=>{
    try{
        if(connection.isConnected){
            console.log("Using existing connection");
            return;
        }
        // console.log(process.env.MONGO);
        // console.log("heyyyyyyyyyy")
        const db= await mongoose.connect(process.env.MONGO);
        // console.log(db.connections)
        connection.isConnected=db.connections[0].readyState;
    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}
export default connectToDb