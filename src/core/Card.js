import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {isAuthenticated} from '../auth';
import { createInventory, inventoryCheck } from './apiCore';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Card = ({ 
    book,
    showViewProductButton = true,
    showAddToCartButton = false,
    showAvailabilityButton = true,
}) => {
    const [data, setData] = useState({
        results: [],
        searched: false,
    });
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState(false);


    const { results, searched } = data;

    useEffect(() => {
        isAuthenticated();
    }, []);


    const { user, token } = isAuthenticated();

    const submit = () => {
        confirmAlert({
          title: 'Confirm to Get Book',
          message: 'Are you sure.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => addToInventory()
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        });
    };

    const showViewButton = (showViewProductButton) => {
        return(
            showViewProductButton && (
                <Link to={`/book/${book._id}`}>
                <button className="btn btn-outline-primary mr-2 mt-2 mb-2">
                    View Book
                </button>
                </Link>
            )
        );
    }


    const addToBag = () => {
           setRedirect(true);
    }



    const shouldRedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/user/dashboard" />
        }
    }


    const showMessage = (searched) => {
        if(searched){
            if(results.length > 0){
                return <h3 className="text-success">
                Not Available.
            </h3>
            }
            else{
                showAddToCartButton = true;
                showAvailabilityButton = false;
                return (<h3 className="text-success">
                Available.
            </h3>
            ) 
            }
        }
    }

    const inventoryCheckByBook = () => {
        inventoryCheck({bookId: book._id})
        .then(response => {
            if(response.error){
                console.log(response.error);
            }
            else{
                setData({...data, results: response, searched: true});
                // console.log("Check your response length");
            }
        })
    }

    const addToInventory = () => {

        const createInventoryData = {
            name: user.name,
            bookName: book.bookName,
            userId: user._id,
            bookId: book._id,
            status: "picked"
        };

            createInventory(user._id, token, createInventoryData)
                .then(response => {
                    if(response){
                        // return <Redirect to="/user/dashboard" />
                        addToBag();
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                }) 
    }

    const getBook = () => {
        inventoryCheckByBook();
    }

    function showAddToBag(showAddToCartButton) {
        return showAddToCartButton ? 
        (
            isAuthenticated() && user.role === 0 ? (
            <button onClick={addToInventory} className="btn btn-outline-warning mt-2 mb-2">
                       Get Book
            </button>
            ) 
            :
            <Link to="/signin">
            <button className="btn btn-outline-warning mt-2 mb-2">
                Signin to Get Book
            </button>
            </Link>
        )  :
        ("");
    }

    const checkAvailabilityButton = (showAvailabilityButton) => {
        return showAvailabilityButton ? (
            <button onClick={getBook}
            className="btn btn-outline-warning mt-2 mb-2">
                       Check Availability
            </button>
            
        ) : ("");
    }


    return (   
            <div className="card">
              <div className="card-header name">{book.bookName}</div>
              <div className="card-body">
               {shouldRedirect(redirect)}   
               <ShowImage item={book} url="book" />
               <p className="lead mt-2">{book.description.substring(0,50)}</p>
               <p className="black-10">Author: {book.author}</p>
               <p className="black-10">Publisher: {book.publisher}</p>
               <p className="black-9">
                Category: {book.category && book.category.name}
               </p>
               <p className="black-8">
                 Added on {moment(book.createdAt).fromNow()}
               </p>
               
               {showMessage(searched)}

               {showViewButton(showViewProductButton)}

               {checkAvailabilityButton(showAvailabilityButton)}
               
               {showAddToBag(showAddToCartButton)}

            
              </div>
              </div>
        
    );
}

export default Card;