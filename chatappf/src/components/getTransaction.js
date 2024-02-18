// TransactionTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './HomePage';
import './getTransaction.css';

const TransactionTable = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/gettransaction');
        setTransactionData(response.data);
      } catch (error) {
        console.error('Error fetching transaction data:', error.message);
      }
    };

    fetchTransactionData();
  }, []);

  return (
    <div className="main-container">
      <HomePage />
      <div className="content-container">
        <div className="transaction-card">
          <h2>Transaction Data</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Pending Amount</th>
                <th>Total Completed Amount</th>
                <th>Total Failed Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.totalPendingAmount}</td>
                  <td>{data.totalCompletedAmount}</td>
                  <td>{data.totalFailedAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
