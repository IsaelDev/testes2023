const Sequelize = require('sequelize')
const sequelize = new Sequelize('test', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})



async function conn() {
sequelize.authenticate().then(()=>{
    console.log('db connected')
}).catch((error)=>{
    console.log('bad auth: '+error)
})
}



module.exports = conn