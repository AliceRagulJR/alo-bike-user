const mongoose = require("mongoose");

const DatabaseConfig = (() => {
  return {
    mongoDbConnect: (databaseName) => {
      try {
        return mongoose.createConnection(
          `mongodb+srv://guru:guru@cluster0.dk2paiw.mongodb.net/?retryWrites=true&w=majority`
        );
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };
})();

module.exports = DatabaseConfig;
