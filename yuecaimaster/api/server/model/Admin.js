const { DataTypes } = require("sequelize")
const db = require("../database")

const Admin = db.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    avatar: DataTypes.STRING,
    username: DataTypes.STRING,
    account: {
      type: DataTypes.STRING,
      primaryKey: true,
      notNull: true,
    },
    password: DataTypes.STRING,
    tel: DataTypes.STRING,
    level: DataTypes.STRING,
    roleId:DataTypes.STRING
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Admin
