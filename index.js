const app = require("./server")
require("dotenv/config");
app.listen(process.env.PORT ,()=>{
    console.log(`server is listening ${process.env.PORT}`)
})