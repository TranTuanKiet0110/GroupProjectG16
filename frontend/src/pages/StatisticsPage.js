import React, { useState, useEffect} from 'react';
//import sellerData from '../api/sellerdata'; // Update the path to your sellerData file
// import ordersData from '../api/orderproduct'; // Update the path to your ordersData file
import '../css/statistic.css';
import statistic from '../api/statistic';
import Navbar from '../components/Navbar';
function StatisticsPage() {
    const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    // Fetch the statistics data from the statistic array
    setStatistics(statistic);
  }, []);

  return (
    <div class='statisticpage'>
      <Navbar />
        <div class='statistic-container'>
      <h2>Sales Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    
  );
}

export default StatisticsPage;
