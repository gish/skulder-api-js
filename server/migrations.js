module.exports = [
    {
        timestamp: 1436286284,
        description: "Create transactions table",
        statement: "CREATE TABLE transactions (id VARCHAR(36) NOT NULL, sender VARCHAR(36) NOT NULL, receiver VARCHAR(36) NOT NULL, amount INTEGER, date TIMESTAMP DEFAULT NOW())"
    }
];
