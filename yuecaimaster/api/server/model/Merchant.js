const { DataTypes } = require("sequelize")
const db = require("../database")

const Merchant = db.define(
  "merchant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    restName: DataTypes.STRING,
    code: DataTypes.STRING,
    type: DataTypes.STRING,
    legalRep: DataTypes.STRING,
    licenseImg:DataTypes.STRING,
    status:DataTypes.STRING,
    imgList:DataTypes.TEXT,
    result:DataTypes.STRING,
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Merchant
