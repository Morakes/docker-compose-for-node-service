const { DataTypes } = require("sequelize")
const db = require("../database")

const EnvDisplay = db.define(
    'envDisplay',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
          },
          restId:DataTypes.INTEGER,
          intro:DataTypes.TEXT,
          imgList:DataTypes.TEXT
    },
    {
        timestamp: true,
        createdAt: "createTime",
        updatedAt: "updateTime",
    }
)

module.exports = EnvDisplay