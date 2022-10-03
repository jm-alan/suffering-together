const { Model, UUID } = require('sequelize');

module.exports = class RosterEntry extends Model {
  static setup (sequelize, { User, House }) {
    super.init({
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
      }
    }, {
      modelName: 'RosterEntry',
      sequelize
    });
  }

  static associate ({ User, House }) {
    RosterEntry.belongsTo(User, { foreignKey: 'userID', as: 'Resident' });
    RosterEntry.belongsTo(House, { foreignKey: 'houseID' });
  }
};
