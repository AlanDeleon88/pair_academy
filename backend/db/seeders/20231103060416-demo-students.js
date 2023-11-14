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
    const est = [
      {
        firstName: 'john',
        lastName: 'doe',
        email: 'test@email.com',
        cohortId: 1,
        timeZone: "EST",
        status: "present"
      },
      {
        firstName: 'don',
        lastName: 'joe',
        email: 'test22342@email.com',
        cohortId: 1,
        timeZone: "EST",
        status: "present"
      },
      {
        firstName: 'clan',
        lastName: 'berkas',
        email: 'test3@email.com',
        cohortId: 1,
        timeZone: "EST",
        status: "present"
      },
      {
        firstName: 'dnema',
        lastName: 'presta',
        email: 'test4@email.com',
        cohortId: 1,
        timeZone: "EST",
        status: "present"
      },
      {
        firstName: 'xason',
        lastName: 'jofae',
        email: 'test22@email.com',
        cohortId: 1,
        timeZone: "EST",
        status: "present"
      },
      {
        firstName: 'yestr',
        lastName: 'teasf',
        email: 'test234@email.com',
        cohortId: 1,
        timeZone: "EST",
        status: "present"
      },
      {
        firstName: 'alkoer',
        lastName: 'bajotee',
        email: 'test3452@email.com',
        cohortId: 1,
        timeZone: "EST",
        status: "present"
      },
      {
        firstName: 'blangers',
        lastName: 'bankahouit',
        email: 'test2@email.com',
        cohortId: 1,
        timeZone: "EST",
        status: "present"
      }

    ]

    const pst = [
      {
        firstName: 'jane',
        lastName: 'dee',
        email: 'test444@email.com',
        cohortId: 1,
        timeZone: "PST",
        status: "present"
      },
      {
        firstName: 'LonRE',
        lastName: 'reqtan',
        email: 'test78882@email.com',
        cohortId: 1,
        timeZone: "PST",
        status: "present"
      },
      {
        firstName: 'ceran',
        lastName: 'beda2sds',
        email: 'test334223@email.com',
        cohortId: 1,
        timeZone: "PST",
        status: "present"
      },
      {
        firstName: 'dnema',
        lastName: 'preasdwe',
        email: 'test343144@email.com',
        cohortId: 1,
        timeZone: "PST",
        status: "present"
      },
      {
        firstName: 'sadsoasern',
        lastName: 'jofaerae',
        email: 'testsadas2@email.com',
        cohortId: 1,
        timeZone: "PST",
        status: "present"
      },
      {
        firstName: 'yest34er',
        lastName: 'teaa34sf',
        email: 'test23sa4@email.com',
        cohortId: 1,
        timeZone: "PST",
        status: "present"
      },
      {
        firstName: 'blaktoer',
        lastName: 'samepliet',
        email: 'test345werw2@email.com',
        cohortId: 1,
        timeZone: "PST",
        status: "present"
      },
      {
        firstName: 'tyersa',
        lastName: 'bhuiop',
        email: 'test234224@email.com',
        cohortId: 1,
        timeZone: "PST",
        status: "present"
      }
    ]

    return queryInterface.bulkInsert('Students', [...est, ...pst], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Students', null, { truncate: true, cascade: true });
  }
};
