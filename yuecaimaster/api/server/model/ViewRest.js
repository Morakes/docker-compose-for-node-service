const { DataTypes } = require("sequelize")
const db = require("../database")

const ViewRest = db.define(
    'viewRest',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
          },
          restId:DataTypes.INTEGER,
          view:DataTypes.INTEGER
    },
    {
        timestamp: true,
        createdAt: "createTime",
        updatedAt: "updateTime",
    }
)

module.exports = ViewRest