import React from 'react'
import {useEffect} from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const Dashboard = () => {
    useEffect(() => {
        const fetchProtectedData = async() => {
            try{
                const response = await axiosInstance.get('protected-view/');
                console.log('Success: ',response.data);
            }catch(error){
                console.error('Error fetching protected data:', error)
            }
        };
        fetchProtectedData();
    },[])
  return (
    <div className="container">Dashboard</div>
  )
}

export default Dashboard;