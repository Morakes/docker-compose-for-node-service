const { DataTypes } = require("sequelize")
const db = require("../database")

const ChiefMenu = db.define(
  "chiefMenu",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    chefId:DataTypes.INTEGER,
    cover:DataTypes.STRING,
    title:DataTypes.STRING,
    ingredients:DataTypes.STRING,
    type:DataTypes.INTEGER,
    jumpLink:DataTypes.STRING,
    content:DataTypes.STRING,
    status:{
        type:DataTypes.TEXT,
        defaultValue:'展示中'
      },
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = ChiefMenu
