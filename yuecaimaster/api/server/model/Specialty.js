const { DataTypes } = require("sequelize")
const db = require("../database")

const Specialty = db.define(
  "specialty",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    cover:DataTypes.STRING,
    topImg:DataTypes.STRING,
    name:DataTypes.STRING,
    townId:DataTypes.INTEGER,
    originalPrice:DataTypes.FLOAT,
    discountPrice:DataTypes.FLOAT,
    type:DataTypes.INTEGER,
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

module.exports = Specialty
