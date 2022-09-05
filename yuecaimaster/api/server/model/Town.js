const { DataTypes } = require("sequelize")
const db = require("../database")

const Town = db.define(
  "town",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Town
