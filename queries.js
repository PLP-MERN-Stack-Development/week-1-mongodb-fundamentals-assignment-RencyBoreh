// queries.js

use("plp_bookstore");

// Task 2: Basic CRUD Operations
db.books.find({ genre: "Programming" });
db.books.find({ published_year: { $gt: 2010 } });
db.books.find({ author: "Yuval Noah Harari" });
db.books.updateOne({ title: "Atomic Habits" }, { $set: { price: 18.99 } });
db.books.deleteOne({ title: "The Hobbit" });

// Task 3: Advanced Queries
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });
db.books.find({ genre: "Self-help" }, { _id: 0, title: 1, author: 1, price: 1 });
db.books.find().sort({ price: 1 });
db.books.find().sort({ price: -1 });
db.books.find().skip(0).limit(5);
db.books.find().skip(5).limit(5);

// Task 4: Aggregation Pipeline
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// Task 5: Indexing
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: 1 });
db.books.find({ title: "Sapiens" }).explain("executionStats");
