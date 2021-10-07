const db = require("../../data/db-config");

async function findUserBy(filter) {
  const [user] = await db("users")
    .where(filter);
  return user;
}

async function createUser({username, password}) {
  const newUser = await db.transaction(async trx => {
    const [result] = await trx("users")
      .insert(
        { username, password }, 
        ["user_id", "username", "password"]
      );
    return result;
  });
  return newUser;
}

module.exports = {
  findUserBy,
  createUser
};
