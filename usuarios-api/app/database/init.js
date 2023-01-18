import mongoose from "mongoose";
import config from "../config/index.js";

const init = () => {
  mongoose.connect(`mongodb://${config.HOST}:${config.PORT}/${config.DB}`, {});

  mongoose.connection.on("error", () => console.log("Falha na conexão!"));

  mongoose.connection.once("open", () =>
    console.log("Conexão aberta com o BD!")
  );
};

export default init;
