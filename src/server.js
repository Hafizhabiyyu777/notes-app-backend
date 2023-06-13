
const routes = require("./routes");
//Front end : http://notesapp-v1.dicodingacademy.com/
const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  server.route(routes);

  await server.start();
  console.log(`Server sedang berjalan pada port ${server.info.uri}`);
};

init();
