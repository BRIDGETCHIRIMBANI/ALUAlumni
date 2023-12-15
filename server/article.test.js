const mongoose = require("mongoose");
const Article = require("./Models/Article");

beforeAll(async () => {
  // Set up a test MongoDB connection or use a testing database
  await mongoose.connect("mongodb://localhost:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Close the test MongoDB connection
  await mongoose.connection.close();
});

describe("Article Model CRUD Operations", () => {
  beforeEach(async () => {
    // Clear the Article collection before each test
    await Article.deleteMany({});
  });

  it("should create a new article", async () => {
    const newArticle = {
      title: "Test Article",
      content: "Article content goes here.",
    };

    const createdArticle = await Article.create(newArticle);

    expect(createdArticle.title).toBe(newArticle.title);
    expect(createdArticle.content).toBe(newArticle.content);
  });

  it("should read all articles", async () => {
    const articles = [
      { title: "Article 1", content: "Content 1" },
      { title: "Article 2", content: "Content 2" },
    ];

    await Article.create(articles);

    const retrievedArticles = await Article.find();

    expect(retrievedArticles).toHaveLength(articles.length);
    expect(retrievedArticles[0].title).toBe(articles[0].title);
    expect(retrievedArticles[1].content).toBe(articles[1].content);
  });

  it("should update an article", async () => {
    const originalArticle = await Article.create({
      title: "Original Article",
      content: "Original content.",
    });

    const updatedData = {
      title: "Updated Article",
      content: "Updated content.",
    };

    const updatedArticle = await Article.findByIdAndUpdate(
      originalArticle._id,
      updatedData,
      { new: true }
    );

    expect(updatedArticle.title).toBe(updatedData.title);
    expect(updatedArticle.content).toBe(updatedData.content);
  });

  it("should delete an article", async () => {
    const articleToDelete = await Article.create({
      title: "Article to Delete",
      content: "Content to delete.",
    });

    await Article.findByIdAndDelete(articleToDelete._id);

    const deletedArticle = await Article.findById(articleToDelete._id);
    expect(deletedArticle).toBeNull();
  });

});
