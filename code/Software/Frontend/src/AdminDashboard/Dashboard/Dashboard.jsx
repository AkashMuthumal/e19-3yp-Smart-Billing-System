import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faDollarSign, faChartBar } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'; 
import TopProducts from './TopProducts'; 
import TopSellingProducts from './TopSellingProducts';


const Dashboard = () => {

  const [totalSaleToday, setTotalSaleToday] = useState(0);
  const [totalSaleYesterday, setTotalSaleYesterday] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  const [billCountToday, setTotalBillToday] = useState(0);
  const [totalBillYesterday, setTotalBillYesterday] = useState(0);
  const [percentageChangeBills, setPercentageChangeBills] = useState(0);

  const [totalProductQuantities, setTotalProductQuantities] = useState(0);
  const fetchURL = "https://4e9eq7iw62.execute-api.ap-southeast-1.amazonaws.com/v1/";

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchSalesData = async () => {
      try {
        const response = await axios.get("https://4e9eq7iw62.execute-api.ap-southeast-1.amazonaws.com/v1/bill/");
        const data = response.data;
        console.log(data);  

        // Destructure data and set state
        const { totalSaleToday, totalSaleYesterday, percentageChange } = data;
        setTotalSaleToday(totalSaleToday);
        setTotalSaleYesterday(totalSaleYesterday);
        setPercentageChange(percentageChange);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

     // Fetch bill data when the component mounts
     const fetchBillData = async () => {
      try {
        const response = await axios.get("http://localhost:5555/bill/today");
        const data = response.data;
        console.log(data);

        // Destructure data and set state for bills
        const { billCountToday, totalBillYesterday, percentageChange } = data;
        setTotalBillToday(billCountToday);
        setTotalBillYesterday(totalBillYesterday);
        setPercentageChangeBills(percentageChange);
        
      } catch (error) {
        console.error('Error fetching bill data:', error);
      }
    };

    const fetchProductQuantities = async () => {
      try {
        const response = await axios.get("http://localhost:5555/itemPurchased/quantity/t");
        const data = response.data;
        console.log(data);

        // Update the state with total product quantities
        setTotalProductQuantities(data);
      } catch (error) {
        console.error('Error fetching total product quantities:', error);
      }
    };
    

    // Call both fetch functions
    fetchSalesData();
    fetchBillData();
    fetchProductQuantities();

  
  }, []);



  return (
    <div>
    <div >
      <h2>Today’s Sales</h2>
      <p>Sales Summary</p>
      <br />
      <div className="container_for_sales bg-white">
        <div className="row row-1 row-3-md-2 g-4">
          <div className="col">
            <div className="card square-card" style={{ backgroundColor: '#db8cd6'}}>
              <div className="card-body">
                <h5 className="card-title text-center">
                  <FontAwesomeIcon icon={faDollarSign} size="2x" color="#75136f" /> <br /><br/>
                  <p className="card-text">LKR {totalSaleToday}</p>
                  Total Sales
                </h5>
                <p>{percentageChange.toFixed(0)}%  from yesterday</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card square-card" style={{ backgroundColor: '#FFE4B5' }}>
              <div className="card-body">

                <h5 className="card-title text-center">
                  <FontAwesomeIcon icon={faShoppingCart} size="2x" color="#754c09" /><br /><br />
                  <p className="card-text">{billCountToday}</p>
                  Total Bills
                </h5>
                <p>{percentageChangeBills.toFixed(0)}% from yesterday</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card square-card" style={{ backgroundColor: '#90EE90', marginRight:'140px' }}>
              <div className="card-body">
                <h5 className="card-title text-center">
                  <FontAwesomeIcon icon={faChartBar} size="2x" color="#1f6306" /><br /><br/>
                  <p className="card-text">0</p>
                  Product Sold
                </h5>
                
                <p> 0% from yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div><br/><br/>
<TopSellingProducts/>
<br/><br/>
<TopProducts/></div>
  );
};

export default Dashboard;
