const { hashSync, compareSync } = require('bcryptjs');
const { UUID, UUIDV4 } = require('sequelize');
const { Model, STRING, ValidationErrorItem, ValidationError } = require('sequelize');

module.exports = class House extends Model {
  validatePass (password) {
    return !this.password || (!!password && compareSync(password, this.password));
  }

  static setup (sequelize, { User }) {
    super.init({
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      name: {
        type: STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 20],
            msg: 'Residence names must be between 5 and 20 characters'
          }
        }
      },
      ownerID: {
        type: UUID,
        allowNull: false,
        references: {
          model: User
        }
      },
      joinCode: {
        type: STRING(10),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [5, 10],
            msg: 'Join codes must be between 5 and 10 characters'
          }
        },
        set (val) {
          val ||= this.name.slice(5).toUpperCase() + String.random.lettersAndNumbers(5);
          this.setDataValue('joinCode', val);
        }
      },
      password: {
        type: STRING,
        allowNull: true,
        set (val) {
          if (!val) return;
          const errors = [];
          if (val.length < 8) {
            errors.push(
              new ValidationErrorItem(
                'Password must be at least 8 characters.'
              )
            );
          }
          if (!val.match(/[A-Z]+/)) {
            errors.push(
              new ValidationErrorItem(
                'Password must contain at least 1 uppercase letter.'
              )
            );
          }
          if (!val.match(/[a-z]+/)) {
            errors.push(
              new ValidationErrorItem(
                'Password must contain at least 1 lowercase letter.'
              )
            );
          }
          if (!val.match(/[0-9]+/)) {
            errors.push(
              new ValidationErrorItem(
                'Password must contain at least 1 of these symbols: !@#$%^&*()`~-'
              )
            );
          }
          if (!val.match(/^[a-zA-Z0-9!@#$%^&*()`~-]+$/)) {
            errors.push(
              new ValidationErrorItem(
                'Password may only contain letters, numbers, and these symbols: !@#$%^&*()`~-'
              )
            );
          }
          if (errors.length) {
            throw new ValidationError('Invalid password.', errors);
          } else {
            this.setDataValue('password', hashSync(val));
          }
        }
      }
    }, {
      modelName: 'House',
      defaultScope: {
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        }
      },
      sequelize
    });
  }

  static associate ({ User, RosterEntry, Item, DebtEntry }) {
    House.hasMany(User, { foreignKey: 'primaryResidenceID', as: 'PrimaryResidents' });
    House.belongsTo(User, { foreignKey: 'ownerID', as: 'Owner' });
    House.hasMany(Item, { foreignKey: 'houseID', as: 'Debts' });
    House.hasMany(DebtEntry, { foreignKey: 'houseID' });
    House.hasMany(RosterEntry, { foreignKey: 'houseID' });
    House.belongsToMany(User, {
      through: RosterEntry,
      foreignKey: 'houseID',
      otherKey: 'userID',
      as: 'Residents'
    });
  }
};
