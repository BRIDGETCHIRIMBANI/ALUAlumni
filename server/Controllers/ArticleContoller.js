const express = require('express');
const router = express.Router();
const Article = require('../Models/Article');

// Get all articles
router.get('/get-articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// Create a new article
router.post('/add-articles', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newArticle = new Article({ title, content });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: 'Error adding article', error: error.message });
  }
});

// Update an article
router.put('/edit-articles/:_id', async (req, res) => {
  const { _id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      _id,
      { title, content },
      { new: true }
    );
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: 'Error updating article', error: error.message });
  }
});

// Delete an article
router.delete('/delete-article/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    await Article.findByIdAndDelete(_id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting article', error: error.message });
  }
});

module.exports = router;
