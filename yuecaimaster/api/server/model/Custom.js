const { DataTypes } = require("sequelize")
const db = require("../database")

const Custom = db.define(
  "custom",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    openid:DataTypes.STRING,
    nickname:DataTypes.STRING,
    avatarUrl:DataTypes.STRING,
    name:DataTypes.STRING,
    gender:DataTypes.INTEGER,
    loginTel:DataTypes.STRING,
    email:DataTypes.STRING,
    provideTel:DataTypes.STRING,
    identityCard:DataTypes.STRING,
    status:DataTypes.INTEGER,
  },
  {
    timestamp: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
  }
)

module.exports = Custom
