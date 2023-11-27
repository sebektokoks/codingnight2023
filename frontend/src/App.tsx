import React, { useEffect, useState } from 'react';

const App = () => {
  const [dane, setDane] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/dane'); // Endpoint na serwerze
        const data = await response.json();
        setDane(data);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    fetchData();
  }, []); // Pusta zależność, aby efekt był uruchamiany tylko raz podczas zamontowania komponentu

  const renderTable = () => {
    if (!dane || dane.length === 0) {
      return <p>Brak danych do wyświetlenia</p>;
    }

    const headers = Object.keys(dane[0]);

    return (
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dane.map((row, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Dane z serwera:</h1>
      {renderTable()}
    </div>
  );
};

export default App;
