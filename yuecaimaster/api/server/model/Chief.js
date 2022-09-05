const { DataTypes } = require("sequelize")
const db = require("../database")

const Chief = db.define(
  "chief",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    imgUrl:DataTypes.STRING,
    name:DataTypes.STRING,
    job:DataTypes.STRING,
    label:DataTypes.STRING,
    restaurant:DataTypes.STRING,
    intro:DataTypes.STRING,
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

module.exports = Chief
