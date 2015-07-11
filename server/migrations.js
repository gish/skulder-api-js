module.exports = [
    {
        timestamp: 1436286284,
        description: "Create transactions table",
        statement: "CREATE TABLE transactions (id VARCHAR(36) NOT NULL, sender VARCHAR(36) NOT NULL, receiver VARCHAR(36) NOT NULL, amount INTEGER, date TIMESTAMP DEFAULT NOW())"
    },
    {
        timestamp: 1436519752,
        description: "Add description column to transactions",
        statement: "ALTER TABLE transactions ADD COLUMN description VARCHAR(255) NOT NULL"
    },
    {
        timestamp: 1436519891,
        description: "Don't allow null values for amount",
        statement: "ALTER TABLE transactions MODIFY amount INTEGER NOT NULL",
    },
    {
        timestamp: 1436604799,
        description: "Create users table",
        statement: "CREATE TABLE users (id VARCHAR(36) NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW());"
    }
];
