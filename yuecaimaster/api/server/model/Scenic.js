const { DataTypes } = require("sequelize")
const db = require("../database")

const Scenic = db.define(
  "scenic",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    cover:DataTypes.STRING,
    townId:DataTypes.INTEGER,
    specificAddress:DataTypes.STRING,
    longitude:DataTypes.STRING,
    latitude:DataTypes.STRING,
    openDate:DataTypes.STRING,
    ticketInfo:DataTypes.STRING,
    tel:DataTypes.STRING,
    intro:DataTypes.TEXT,
    status:{
      type:DataTypes.TEXT,
      defaultValue:'展示中'
    },
    isShow:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    imgList:DataTypes.TEXT
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Scenic
