function generateGameId() {
  // Generates a unique, short, URL-safe game ID (e.g. 8 chars)
  return Math.random().toString(36).substr(2, 8) + Date.now().toString(36).substr(-4);
}

module.exports = generateGameId;
