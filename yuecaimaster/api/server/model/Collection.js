const { DataTypes } = require("sequelize")
const db = require("../database")

const Collection = db.define(
  "collection",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    restId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
    chefId:DataTypes.INTEGER,
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Collection
