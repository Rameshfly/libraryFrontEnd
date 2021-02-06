import React, {useState, useEffect} from 'react';
import { listByAuthor } from './apiCore'; // function
import  Card  from './Card'; // component function, so dont't use curly braces here

const SearchByAuthor = () => {

    const [data, setData] = useState({
        search: "",
        results: [],
        searched: false
    });

    const { search, results, searched } = data;


    const searchData = () => {
        // console.log(search, category); 
        listByAuthor({search: search || undefined})
        .then(response => {
           if(response.error){
               console.log(response.error);
           }
           else{
               setData({...data, results: response, searched: true});
           }
        })
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    }

    const handleChange = name => event => {
       setData({...data, [name]: event.target.value, searched: false});
    }

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0){
            return `Found ${results.length} books`;
        }
        if(searched && results.length < 1){
            return `No Books found`;
        }
    }

    const searchedBooks = (results = []) => {
        return(
          <div>
            <h2 className="mt-4 mb-4">
                {searchMessage(searched, results)}
            </h2>  
            <div className="row">
           {results.map((book, i) => (
               <Card key={i} book={book} />
           ))}
           </div>
          </div>
        );
    }

    const searchForm = () => {
       return(
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">

                <input type="search"
                 className="form-control"
                 onChange={handleChange("search")}
                 placeholder="Search by Author"
                />
                </div>

                <div className="btn input-group-append" style={{border: 'none'}}>
                  <button className="input-group-text">Search</button>
                </div>
            </span>
          

        </form>
       ) 
    }
  
    return (
      <div className="row">
        <div className="container mb-2">
            {searchForm()}
        </div>
        <div className="container-fluid mb-2">
            {searchedBooks(results)}
        </div>
      </div>
    );

}

export default SearchByAuthor;