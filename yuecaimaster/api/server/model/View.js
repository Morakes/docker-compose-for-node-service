const { DataTypes } = require("sequelize")
const db = require("../database")

const View = db.define(
    'view',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
          },
          view:DataTypes.INTEGER
    },
    {
        timestamp: true,
        createdAt: "createTime",
        updatedAt: "updateTime",
    }
)

module.exports = View