const { DataTypes } = require("sequelize")
const db = require("../database")

const Role = db.define("role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    notNull: true,
    autoIncrement: true,
  },
  alias:DataTypes.STRING(20)
},{
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Role
