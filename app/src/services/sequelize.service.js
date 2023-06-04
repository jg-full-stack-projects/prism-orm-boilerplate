import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";
import fs from "fs";
import { dirname } from "../utils/common.js"

const modelFiles = fs
  .readdirSync(dirname.current() + "/../models/")
  .filter((file) => file.endsWith(".js"));

const sequelizeService = {
  init: async () => {
    try {
      let connection = new Sequelize(databaseConfig);

      /*
        Loading models automatically
      */
     
      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        model.default.init(connection);
      }

      modelFiles.map(async (file) => {
        const model = await import(`../models/${file}`);
        model.default.associate && model.default.associate(connection.models);
      });

      console.log("[SEQUELIZE] Database service initialized");
    } catch (error) {
      console.log("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },
};

export default sequelizeService;
