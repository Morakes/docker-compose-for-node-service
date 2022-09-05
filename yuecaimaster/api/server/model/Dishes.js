const { DataTypes } = require("sequelize")
const db = require("../database")

const Dishes = db.define(
    'dishes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
          },
          restId:DataTypes.INTEGER,
          name:DataTypes.STRING,
          originalPrice:DataTypes.FLOAT,
          discountPrice:DataTypes.FLOAT,
          cover:DataTypes.STRING,
          topImg:DataTypes.STRING,
          content:DataTypes.TEXT,
          position:DataTypes.INTEGER,
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

module.exports = Dishes