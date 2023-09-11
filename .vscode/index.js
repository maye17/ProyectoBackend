const http = require("http");

const server = http.createServer((req,res)=> {
  
    res.end("que vaina este mundo")
})

const port= 3002;
server.listen(port,()=> {
    console.log(`Server is running on http://localhost:${port}`);
})