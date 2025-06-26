import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching Data");
        return res.json();
      })
      .then((data) => {
        setPatientData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      })
  }, [])

  const filterPatients = patientData
    .filter((patientData) =>
      patientData.name.toLowerCase().includes(search.toLowerCase()))

    .sort((a, b) =>
      sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name))
  return (
    <div style={{ padding: "20px", fontFamily: "arial" }}>
      <h2>Patient DashBoard</h2>
      <input
        type="text"
        placeholder='Enter name'
        value={search}
        onChange={(e) => { setSearch(e.target.value) }}
        style={{ padding: "6px", marginRight: "10px" }}
      />
      <button onClick={() => setSortAsc(!sortAsc)}>
        Sort{sortAsc ? "up" : "down"}
      </button>

      {loading && <p>Loading Data...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </thead>
          <tbody>
            {filterPatients.map((patientData) => (
              <tr key={patientData.id}>
                <td>{patientData.name}</td>
                <td>{patientData.email}</td>
                <td>{patientData.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App