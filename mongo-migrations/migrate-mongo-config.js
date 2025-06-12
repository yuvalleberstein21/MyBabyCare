require('dotenv').config();
module.exports = {
  mongodb: {
    url: 'mongodb+srv://yuvalleb24:myBabyCare@cluster0.2ozwchh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    databaseName: "test",
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",

  // הוסף את זה כדי לשנות את "undefined" ל־"commonjs"
  moduleSystem: "commonjs"
};