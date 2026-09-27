import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    res.send("server is working ")
})


app.listen(8000, () => {
    console.log("server is listening on http://localhost:8000")
})