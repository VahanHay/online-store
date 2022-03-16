import { DataTypes } from "@sequelize/core";
import { sequelize } from '../sequelize_connection.js';

export const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING(200),
  },
}, { freezeTableName: true });
