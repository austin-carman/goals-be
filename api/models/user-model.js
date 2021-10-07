const db = require("../../data/db-config");

async function findUserBy(filter) {
  const [user] = await db("users")
    .where(filter);
  return user;
}

async function createUser({ first_name, last_name, username, password }) {
  const newUser = await db.transaction(async trx => {
    const [result] = await trx("users")
      .insert(
        { first_name, last_name, username, password }, 
        ["user_id", "first_name", "last_name", "username", "password"]
      );
    return result;
  });
  return newUser;
}

module.exports = {
  findUserBy,
  createUser
};
