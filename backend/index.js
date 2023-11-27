const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
app.use(cors());


// Połączenie z bazą danych MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    port: 3308
});

connection.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
    } else {
        console.log('Połączenie z bazą danych MySQL udane!');
    }
});

// Przykładowy endpoint GET
app.get('/dane', (req, res) => {
    // Przykładowe zapytanie do bazy danych
    connection.query('SELECT * FROM userzy', (error, results, fields) => {
        if (error) {
            console.error('Błąd zapytania do bazy danych:', error);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
        } else {
            res.json(results);
        }
    });
});

// Uruchomienie serwera na porcie 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
});

