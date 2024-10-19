import React, { createContext, useState, useEffect, useContext } from 'react';

const RecordsContext = createContext();

export const ProductProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  console.log({ records });

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
  }, []);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: 'DELETE',
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  return (
    <RecordsContext.Provider value={records}>
      {children}
    </RecordsContext.Provider>
  );
};

// Custom hook to use the records
export const useRecords = () => useContext(RecordsContext);
