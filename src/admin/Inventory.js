import React ,{ useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listItems, deleteInventoryItem } from './apiAdmin';
import moment from 'moment';
import { Table } from 'react-bootstrap';

const Inventory = () => {
    
    const [items, setItems] = useState([]);

    const {user, token} = isAuthenticated();

    const loadItems = () => {
       listItems(user._id, token).then(data => {
           if(data.error){
               console.log(data.error);
           }
           else{
            setItems(data);
           }
       })
    }

    useEffect(() => {
        loadItems();
    }, []);

    const showOrdersLength = () => {
        if(items.length > 0){
            return (
                <h1 className="text-danger display-2">Total Books: {items.length}</h1>
            );
        } 
        else{
            return <h1 className="text-danger">No Items</h1>
        }
    };

    const destroy = (id) => {
        deleteInventoryItem(id, user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                loadItems();
            }
        })
    };

    return(
        <Layout 
        title="Issued Books" 
        description={`G'day ${user.name}, you can manage all the issued books here`}
        >
 
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showOrdersLength()}
                
                {items.map((i ,oIndex) => {
                    return (
                       <div
                          className="mt-3"
                          key={oIndex}
                          style={{ borderBottom: "5px solid indigo" }}>

<Table striped bordered hover>
  <thead>
    <tr>
      <th>Item ID</th>
      <th>Person Name</th>
      {/* <th>Person ID</th> */}
      <th>Book Name</th>
      {/* <th>Book ID</th> */}
      <th>Picked On</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{i._id}</td>
      <td>{i.name}</td>
      {/* <td>{i.userId}</td> */}
      <td>{i.bookName}</td>
      {/* <td>{i.bookId}</td> */}
      <td>{moment(i.createdAt).fromNow()}</td>
      <td>{i.status}</td>
      <td><button onClick={() => destroy(i._id)}
           className="btn btn-outline-danger mt-1 mb-1">
              Delete
         </button>
      </td>
    </tr>
  </tbody>
</Table>    
                          {/* <h2 className="mb-5">
                           <span className="bg-primary">
                             Item ID: {i._id}
                           </span> 
                          </h2>

                          <ul className="list-group mb-2">
                           
                           <li className="list-group-item">
                               name: {i.name}
                           </li>
                           <li className="list-group-item">
                               User ID: {i.userId}
                           </li>
                           <li className="list-group-item">
                               Book Name: {i.bookName}
                           </li> 
                           <li className="list-group-item">
                               Book ID: {i.bookId}
                           </li> 
                           <li className="list-group-item">
                               Picked on: {moment(i.createdAt).fromNow()}
                           </li> 
                           <li className="list-group-item">
                               status: {i.status}
                           </li>

                           <button onClick={() => destroy(i._id)}
                            className="btn btn-outline-danger mt-2 mb-2">
                              Delete
                           </button>
                                 

                          </ul> */}
                          

                        </div>           
                    );
                })}

            </div>
        </div>
 
        </Layout>
    );

}

export default Inventory;