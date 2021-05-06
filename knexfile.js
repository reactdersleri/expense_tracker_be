module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "expense_tracker",
      user: "admin",
      password: "admin",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
