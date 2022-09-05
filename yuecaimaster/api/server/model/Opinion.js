const { DataTypes } = require("sequelize")
const db = require("../database")

const Opinion = db.define(
  "opinion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    userId:DataTypes.INTEGER,
    msg:DataTypes.TEXT,
    status:{
        type:DataTypes.TEXT,
        defaultValue:'待处理'
      },
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Opinion
