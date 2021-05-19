'use strict';

const {
  db,
  models: { User, Tag },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'karinananaheyheyheygoodbye',
      password: '123',
      isAdmin: true,
    }),
    User.create({ username: 'kathEEE', password: '1234', isAdmin: false }),
    User.create({ username: 'kaseacreature', password: '12', isAdmin: true }),
    User.create({ username: 'emBEESOHGOD', password: '12345', isAdmin: false }),
  ]);

  //Creating Tags

  const tags = await Promise.all([
    Tag.create({
      title: 'Slippery Goats on the Lake',
      imageUrl:
        'https://scontent-lga3-1.xx.fbcdn.net/v/t1.15752-9/183167546_1395155280846671_2431707204143028292_n.png?_nc_cat=108&ccb=1-3&_nc_sid=ae9488&_nc_ohc=UvNA6nXT-_oAX9laYAo&_nc_ht=scontent-lga3-1.xx&oh=84e7e8ae56d1b36fe21ca1283b89d02b&oe=60BEE600',
    }),
    Tag.create({
      title: 'Never Forget Your Frog Wallet',
      imageUrl:
        'https://scontent-lga3-1.xx.fbcdn.net/v/t1.15752-9/185243626_462632201666033_2535700041821152114_n.png?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_ohc=0SzXKx2Cg5gAX8N0U2s&tn=0Fcaog0On3Z6YF-g&_nc_ht=scontent-lga3-1.xx&oh=08b87bb5298a2aaf0c25e701ef96c272&oe=60BDAFC0',
    }),
    Tag.create({
      title: 'Breadstick Surprise',
      imageUrl:
        'https://scontent-lga3-1.xx.fbcdn.net/v/t1.15752-9/182751327_564225078316382_7077282897400390637_n.png?_nc_cat=108&ccb=1-3&_nc_sid=ae9488&_nc_ohc=CUtNYmH8x90AX_l3Xis&_nc_ht=scontent-lga3-1.xx&oh=e7237e47e1e12a4ea21d746f488e7f5b&oe=60BD666B',
    }),
    Tag.create({
      title: 'Noodle Renaissance',
      imageUrl:
        'https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/183841021_2510139835799033_6325330936607124315_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=wFSdioWBLRoAX8Do4cC&_nc_ht=scontent-lga3-1.xx&oh=5876aa4fd3697a63111698dc9dfe82f7&oe=60BD5E5B',
    }),
    Tag.create({
      title: 'Classic Imagery',
      imageUrl:
        'https://i.postimg.cc/HLH0XYW9/Screen-Shot-2021-05-19-at-12-45-53-PM.webp',
    }),
    Tag.create({
      title: 'Lovely Imagery',
      imageUrl: 'https://tinyurl.com/bv67uxc3',
    }),
    Tag.create({
      title: 'Party!!',
      imageUrl: 'https://tinyurl.com/fdt39395',
    }),
    Tag.create({
      title: 'Ramen',
      imageUrl: 'https://tinyurl.com/56aff4cj',
    }),
  ]);

  await users[0].addTag(tags[0]);
  await users[1].addTag(tags[1]);
  await users[2].addTag(tags[2]);
  await users[3].addTag(tags[3]);
  await users[3].addTag(tags[4]);
  await users[1].addTag(tags[5]);
  await users[2].addTag(tags[6]);
  await users[2].addTag(tags[7]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      karina: users[0],
      kathy: users[1],
      kasey: users[2],
      em: users[3],
    },
    // tags: {
    //   one : tags[0],
    //   two : tags[1],
    //   three : tags[2],
    //   four : tags[3]
    // }
    // await users.karina.addTag(one)
    // await users.kathy.addTag(two)
    // await users.kasey.addTag(three)
    // await users.em.addTag(four)
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
