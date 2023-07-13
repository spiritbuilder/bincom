import fs from "fs"
let str = fs.readFileSync("./db.json")
let db = JSON.parse(str)


export default db;