import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from './apiAdmin';

const ManageBooks = () => {

    const [books, setBooks] = useState([]);

    const {user, token} = isAuthenticated();

    const loadBooks = () => {
        getBooks().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setBooks(data);
            }
        })
    }

    const destroy = bookId => {
        deleteBook(bookId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                loadBooks();
            }
        })
    }

    useEffect(() => {
      loadBooks();
    }, []);

    return (
        <Layout 
         title="Manage Books"
         description="Perform crud on books"
         className="container-fluid"
        >
        
        <div className="row">
            <div className="col-12">
                <h2 className="text-center">Total {books.length} books</h2>
                <hr />
                <ul className="list-group">
                 
                  {books.map((b,i) => (
                   <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                       <strong>{b.bookName}</strong>
                       <Link to={`/admin/book/update/${b._id}`}>
                        <span className="badge badge-warning badge-pill">
                          Update
                        </span>
                       </Link>
                       <span onClick={() => destroy(b._id)} style={{cursor:'pointer'}} className="badge badge-danger badge-pill">
                           Delete
                       </span>
                   </li>
                   ))} 
                  
                </ul>
            </div>
        </div>

        </Layout>
    );

}

export default ManageBooks;