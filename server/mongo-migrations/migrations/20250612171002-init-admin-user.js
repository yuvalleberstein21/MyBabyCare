const bcrypt = require('bcryptjs');
module.exports = {
  async up(db, client) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin', salt);
    await db.collection('users').insertOne({
      fullName: 'admin',
      email: 'admin@example.com',
      password: hash,
      createdAt: new Date(),
      updatedAt: null,
    });
    console.log("Migration done");
  },

  async down(db, client) {
    // Rollback logic
    await db.collection('users').deleteOne({ email: 'admin@example.com' });
  }
};