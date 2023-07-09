import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { db } from '../../Firebase';
import { doc, getDoc } from "firebase/firestore";
import Card from '../ui/Card';
const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const location = useLocation();
    const { userId } = location.state;
    const [cryptoList, setCryptoList] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(db, "users", userId);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
                );
                const data = await response.json();
                setCryptoList(data);
                console.log(cryptoList);
            } catch (error) {
                console.error('Error fetching dataa:', error);
            }
        };

        fetchData();
        fetchUserData();
    }, [userId]);
    return (

        <Card>
            <div style={{
                padding: '10px',
                border: '1px solid #ccc',
                marginBottom: '10px',
                borderRadius: '4px',
            }}>
                <h2>Welcome to the Dashboard</h2>
                {userData ? (
                    <div>
                        {userData.name && <p>Name: {userData.name}</p>}
                        {userData.branch && <p>Branch: {userData.branch}</p>}
                        {userData.account_number && (
                            <p>Account Number: {userData.account_number}</p>
                        )}
                        {userData.bank_name && <p>Bank Name: {userData.bank_name}</p>}
                        {userData.bank_ifsc && <p>IFSC: {userData.bank_ifsc}</p>}
                        {userData.amount && <p>Amount: {userData.amount}</p>}
                        <h4>Transcation Detail</h4>
                        {userData.date && <p> {userData.date}:         {userData.withdrawamount}</p>}

                    </div>
                ) : (
                    <p>Loading....</p>
                )}
                <h2>Cryptocurrency Data</h2>
                {cryptoList.map((crypto) => (
                    <div key={crypto.id}>
                        <h3>{crypto.name}</h3>
                        <p>Symbol: {crypto.symbol}</p>
                        <p>Current Price: ${crypto.current_price}</p>
                    </div>
                ))}
            </div>
        </Card>



    )
}



export default Dashboard
