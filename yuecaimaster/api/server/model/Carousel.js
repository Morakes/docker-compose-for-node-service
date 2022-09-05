const { DataTypes } = require("sequelize")
const db = require("../database")

const Carousel = db.define(
  "carousel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    imgUrl: DataTypes.STRING,
    isShow:{
      type:DataTypes.INTEGER(1),
      defaultValue:0
    },
    position:DataTypes.INTEGER(2),
    remark:DataTypes.STRING(30),
    type:DataTypes.INTEGER(1)
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Carousel
