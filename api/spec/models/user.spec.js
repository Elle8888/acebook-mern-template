const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  beforeEach(async () => {
    await User.deleteMany({})
  })

  it("has a username", () => {
    const user = new User({
      username: "sharkira",
      email: "sharkira@fish.com",
      password: "12345678Ab*",
    });
    expect(user.email).toEqual("sharkira@fish.com");
  });

  it("has an email address", () => {
    const user = new User({
      username: "sharkira",
      email: "sharkira@fish.com",
      password: "12345678Ab*",
    });
    expect(user.email).toEqual("sharkira@fish.com");
  });

  it("has a password", () => {
    const user = new User({
      username: "sharkira",
      email: "sharkira@fish.com",
      password: "12345678Ab*",
    });
    expect(user.password).toEqual("12345678Ab*");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      username: "sharkira",
      email: "sharkira@fish.com",
      password: "12345678Ab*",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          username: "sharkira",
          email: "sharkira@fish.com",
          password: "12345678Ab*",
        });
        done();
      });
    });
  });
});
