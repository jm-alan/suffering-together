const { Model, UUID, UUIDV4, BOOLEAN, DECIMAL, DATE, TEXT, NOW } = require('sequelize');

module.exports = class Item extends Model {
  static setup (sequelize, { User, House }) {
    super.init({
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      userID: {
        type: UUID,
        allowNull: false,
        references: {
          model: User
        }
      },
      houseID: {
        type: UUID,
        allowNull: false,
        references: {
          model: House
        }
      },
      amount: {
        type: DECIMAL(10, 2),
        allowNull: false
      },
      expense: {
        type: BOOLEAN,
        allowNull: false
      },
      description: {
        type: TEXT,
        allowNull: true
      },
      date: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW
      }
    }, {
      modelName: 'Item',
      sequelize
    });
  }

  static associate ({ User, House, DebtEntry }) {
    Item.belongsTo(User, { foreignKey: 'userID', as: 'Creditor' });
    Item.belongsTo(House, { foreignKey: 'houseID', as: 'Residence' });
    Item.belongsToMany(User, {
      through: DebtEntry,
      foreignKey: 'itemID',
      otherKey: 'userID',
      as: 'Debtors'
    });
  }
};
