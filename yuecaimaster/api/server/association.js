const fs = require("fs")
const lib = fs.readdirSync(__dirname + "/model")
var models = {}
for (let item of lib) {
  let model = item.replace(".js", "")
  models[model] = require("./model/" + item)
}
const association = () => {
  models.Custom.hasOne(models.Merchant,{foreignKey: 'userId'})
  models.Merchant.belongsTo(models.Custom,{foreignKey: 'userId', as:'user'})

  models.Custom.hasOne(models.Restaurant,{foreignKey:'userId'})
  models.Restaurant.belongsTo(models.Custom,{foreignKey:'userId',as:'user'})

  models.Restaurant.hasOne(models.RestView,{foreignKey:'restId'})
  models.RestView.belongsTo(models.Restaurant,{foreignKey:'restId',as:'rest'})

  models.Town.hasMany(models.Restaurant,{foreignKey:'townId'})
  models.Restaurant.belongsTo(models.Town,{foreignKey:'townId',as:'town'})

  models.Custom.hasMany(models.Opinion,{foreignKey:'userId'})
  models.Opinion.belongsTo(models.Custom,{foreignKey:'userId',as:'user'})

}
module.exports = association
