const fs = require("fs");
const YAML = require("yaml");
const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel");
const bcrypt = require("bcrypt");
const { USER_TYPE } = require("../config/config");

const seedAdmin = async () => {
  try {
    const file = fs.readFileSync("./swagger.yaml", "utf8");
    const swaggerDocument = YAML.parse(file);

    // Navigate to the sign-in example to get admin credentials
    const signInPath = swaggerDocument.paths["/auth/sign-in"];
    if (!signInPath || !signInPath.post || !signInPath.post.requestBody) {
      console.log("Could not find /auth/sign-in in swagger.yaml");
      return;
    }

    const example = signInPath.post.requestBody.content["application/json"].example;
    if (!example || !example.email || !example.password) {
      console.log("Could not find admin credentials in swagger.yaml");
      return;
    }

    const { email, password } = example;

    const adminExist = await userModel.findOne({ email: email });
    if (!adminExist) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const admin = new userModel({
        userName: "admin",
        name: "Admin",
        email: email,
        password: hashedPassword,
        role: USER_TYPE.ADMIN,
        contact: 1234567890
      });

      await admin.save();
      console.log(`Admin auto-created with email: ${email}`);
    }
  } catch (error) {
    console.log("Error seeding admin :>> ", error);
  }
};

const seedBooks = async () => {
  try {
    const bookCount = await bookModel.countDocuments();
    if (bookCount > 0) {
      // console.log("Books already seeded");
      return;
    }

    const books = [];
    const authors = ["George Orwell", "J.K. Rowling", "J.R.R. Tolkien", "Ernest Hemingway", "F. Scott Fitzgerald", "Jane Austen", "Mark Twain", "Charles Dickens", "Leo Tolstoy", "Fyodor Dostoevsky"];
    const genres = ["Fiction", "Mystery", "Sci-Fi", "Fantasy", "Biography", "History", "Classic", "Adventure", "Romance", "Thriller"];

    for (let i = 1; i <= 55; i++) {
      const author = authors[Math.floor(Math.random() * authors.length)];
      const genre = genres[Math.floor(Math.random() * genres.length)];
      books.push({
        name: `${genre} Book ${i}`,
        author: `${author}`,
        currentAvailability: true
      });
    }

    await bookModel.insertMany(books);
    console.log("50+ books auto-created successfully");
  } catch (error) {
    console.log("Error seeding books :>> ", error);
  }
};

const runSeeder = async () => {
  await seedAdmin();
  await seedBooks();
};

module.exports = runSeeder;
