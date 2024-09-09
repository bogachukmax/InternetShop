import express from "express"

const app = express()
const PORT = 3000
app.use(express.static("public"))

// app.get("/test", (req, res) => {
//     res.end('hello express')
// })

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})