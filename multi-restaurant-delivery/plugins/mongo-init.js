db.createCollection("suggestions");
db.suggestions.createIndex({ pageId: 1, createdAt: -1 });
