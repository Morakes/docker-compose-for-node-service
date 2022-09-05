const { DataTypes, INTEGER } = require("sequelize")
const db = require("../database")

const Restaurant = db.define(
  "restaurant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    userId:DataTypes.INTEGER,
    cover:DataTypes.STRING,
    restName:DataTypes.STRING,
    type:DataTypes.STRING,
    label:DataTypes.STRING,
    townId:DataTypes.INTEGER,
    specificAddress:DataTypes.STRING,
    tel:DataTypes.STRING,
    longitude:DataTypes.FLOAT,
    latitude:DataTypes.FLOAT,
    isShow:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    status:{
        type:DataTypes.TEXT,
        defaultValue:'展示中'
    },
    position:DataTypes.INTEGER
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Restaurant
