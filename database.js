const mongoose = require('mongoose')
const assert = require('assert')
const db_url= process.env.DB_URL


mongoose.connect(db_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
},(error, list)=>{
     assert.equal(error,null,"Error in BD Connection")
     console.log("DB Connected...");
  //   console.log(list)
})