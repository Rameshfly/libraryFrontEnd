import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getBooks } from './apiCore'; // function
import  Card  from './Card'; // component function, so dont't use curly braces here
import Search from './Search';
import SearchByAuthor from './searchByAuthor';
import SearchByPublisher from './searchByPublisher';

const Home = () => {

    const [booksByArrival, setBooksByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadBooksByArrival = () => {
        getBooks('createdAt').then(data => {
            if(data.error){
                setError(data.error);
            } 
            else{
                setBooksByArrival(data);
            }
        })
    }

    useEffect(() => {
     loadBooksByArrival();
    }, []);

    return (
    <Layout title="Have a Great Day" description="Library Management System" className="container-fluid">
 
    <Search />
    <SearchByAuthor />
    <SearchByPublisher />


     <h2 className="mb-4">New Arrivals</h2>
     <div className="row">  
        {booksByArrival.map((book, i) => (
           <div key={i} className="col-4 mb-3"> 
             <Card book={book} />
           </div>
        ))}
     </div>
    
    </Layout>
);
};

export default Home;