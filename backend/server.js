const app = require("./app");
const dotenv = require("dotenv");
const connectDatabse = require("./config/database");
// handling uncought exeption
process.on("uncaughtException",(err)=>{
  
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to  uncaught Exception`);
process.exit(1)
    
})



//config
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabse();

const server= app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost: ${process.env.PORT}`);
});
 


// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
});
