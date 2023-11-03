'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Cohorts', [
      {
        cohort: 'MAY-30-2023',
        teacherId: 1
      },
      {
        cohort: 'SEP-18-2023',
        teacherId: 1
      },
      {
        cohort: 'JAN-15-2022',
        teacherId: 2
      },
      {
        cohort: 'NOV-20-2021',
        teacherId: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Cohorts', {
      cohort: { [Op.in]: ['MAY-30-2023', 'SEP-18-2023', 'JAN-15-2022', 'NOV-20-2021'] }
    }, {})
  }
};
