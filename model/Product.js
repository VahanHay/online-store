import { DataTypes } from "@sequelize/core";
import { sequelize } from '../sequelize_connection.js';
import { Category } from './Category.js';

export const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING(200),
  },
  price: {
    type: DataTypes.DOUBLE,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, { freezeTableName: true });

Product.belongsTo(Category);
