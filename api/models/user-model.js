const db = require("../../data/db-config");

async function findUserBy(filter) {
  const [user] = await db("users")
    .where(filter);
  return user;
}

module.exports = {
  findUserBy
};
