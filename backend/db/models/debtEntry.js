const { Model, UUID } = require('sequelize');

module.exports = class DebtEntry extends Model {
  static setup (sequelize, { User, Item, House }) {
    super.init({
      userID: {
        type: UUID,
        allowNull: false,
        references: {
          model: User
        }
      },
      itemID: {
        type: UUID,
        allowNull: false,
        references: {
          model: Item
        }
      },
      houseID: {
        type: UUID,
        allowNull: false,
        references: {
          model: House
        }
      }
    }, {
      modelName: 'DebtEntry',
      sequelize
    });
  }

  static associate ({ User, Item, House }) {
    DebtEntry.belongsTo(User, { foreignKey: 'userID', as: 'Debtor' });
    DebtEntry.belongsTo(Item, { foreignKey: 'itemID', as: 'Debt' });
    DebtEntry.belongsTo(House, { foreignKey: 'houseID' });
  }
};
