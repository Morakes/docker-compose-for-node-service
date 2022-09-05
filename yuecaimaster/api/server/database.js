const { Sequelize } = require("sequelize")
module.exports = db = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: "mysql",
  timezone: "+08:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  define: {
    freezeTableName: true, //Model名与表名相同
    charset: 'utf8',
  },
  logging: true,
})
async function sync() {
  console.log("正在同步模型")
  try{
    await db.sync({
      alter: true,
    })
  }
  catch(err){
    console.log(err)
  };
  
  const association = require("./association")
  association()
  console.log("同步模型完成")
}
sync()
