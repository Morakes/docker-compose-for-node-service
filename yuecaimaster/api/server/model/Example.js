const { DataTypes } = require("sequelize")
const db = require("../database")

const Example = db.define("exmaple", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    notNull: true,
    autoIncrement: true,
  },
})

module.exports = Example
