'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cohort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //TODO create a many to many relationship so users can be a part of the same cohort.
      Cohort.belongsTo(models.User, {
        foreignKey: 'teacherId',
        onDelete: 'cascade',
        hooks: true
      })

      Cohort.hasMany(
        models.Student,
        {
          foreignKey: 'cohortId',
          onDelete: 'CASCADE',
          hooks: true
        }
      )
    }
  }
  Cohort.init({
    cohort: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cohort',
  });
  return Cohort;
};
