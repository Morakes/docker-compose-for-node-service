const { DataTypes } = require("sequelize")
const db = require("../database")

const Season = db.define(
  "season",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    cover:DataTypes.STRING,
    name:DataTypes.STRING,
    townId:DataTypes.INTEGER,
    type:DataTypes.INTEGER,
    ingredients:DataTypes.STRING,
    jumpLink:DataTypes.STRING,
    content:DataTypes.TEXT,
    status:{
        type:DataTypes.TEXT,
        defaultValue:'展示中'
      },
    isShow:{
        type:DataTypes.INTEGER,
        defaultValue:0
      },
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Season
