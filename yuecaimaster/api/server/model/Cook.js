const { DataTypes } = require("sequelize")
const db = require("../database")

const Cook = db.define(
    'cook',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
          },
          restId:DataTypes.INTEGER,
          name:DataTypes.STRING,
          label:DataTypes.STRING,
          intro:DataTypes.TEXT,
          job:DataTypes.STRING,
          imgUrl:DataTypes.TEXT
    },
    {
        timestamp: true,
        createdAt: "createTime",
        updatedAt: "updateTime",
    }
)

module.exports = Cook