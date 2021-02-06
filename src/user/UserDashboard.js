import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { getUserHistory } from './apiUser';
import moment from 'moment';

const Dashboard = () => {

  const[history, setHistory] = useState([]);
   
  const {user: {_id, name, email, role}} = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId) => {
    getUserHistory({userId}).then(data => {
      if(data.error){
        console.log(data.error);
      }
      else{
        setHistory(data);
        console.log(data);
      }
    })
  }

  useEffect(() => {
    init(_id);
  }, []);

  const userLinks = () => {
       return(
           <div className="card">
             <h4 className="card-header">User Links</h4>
             <ul className="list-group">
                   <li className="list-group-item">
                       <Link className="nav-Link" to={`/profile/${_id}`}>Update Profile</Link>
                   </li>
                </ul>
           </div>
       );
  }

  const userInfo = () => {
       return (
         <div className="card mb-5">
          <h3 className="card-header">User Information</h3>
          <ul className="list-group">
            <li className="list-group-item">{name}</li>
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">
               {role === 1 ? 'Admin' : 'Registered User'}
            </li>
          </ul>
         </div>
       );
  }


  const inventoryHistory = (history) => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">Your Book History</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history.map((h, i) => {
                        return (
                            <div key={i}>
                                
                                <h6>Book Name: {h.bookName}</h6>
                                <h6>status: {h.status}</h6>
                                <h6>
                                  Picked date:{" "}
                                {moment(h.createdAt).fromNow()}
                                </h6>
                                <hr />
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};

  return (
        <Layout title="Dashboard" description={`G'day ${name}!`} className="container-fluid">
        
          <div className="row">
            <div className="col-3">
               {userLinks()}
            </div>
            <div className="col-9">
               {userInfo()}
               {inventoryHistory(history)}
            </div> 
          </div>
        </Layout>
  )
}

export default Dashboard;