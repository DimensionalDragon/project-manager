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
   const [staffPositionIds] = await queryInterface.sequelize.query('SELECT id from StaffPositions')
   const [staffStatusIds] = await queryInterface.sequelize.query('SELECT id from StaffStatuses')

   const newStaffs = new Array(10).fill(0).map((_, i) => ({
    name: `Staff ${i+1}`,
    address: `Jl. Dummy`,
    phoneNumber: '081234567892',
    whatsappNumber: '081234567892',
    email: `staff${i+1}@gmail.com`,
    StaffPositionId: staffPositionIds[0].id,
    StaffStatusId: staffStatusIds[0].id
   }));
     await queryInterface.bulkInsert('Staffs', newStaffs);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
