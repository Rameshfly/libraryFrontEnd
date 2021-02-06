import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore'; // function
import  Card  from './Card'; // component function, so dont't use curly braces here

const Book = props => {

    const [book, setBook] = useState({});
    const [relatedbook, setRelatedBook] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleBook = bookId => {
        read(bookId).then(data => {
           if(data.error) {
               setError(data.error);
           }
           else{
               setBook(data);
               // then fetch related products
               listRelated(data._id)
               .then(data => {
                   if(data.error){
                       setError(data.error);
                   }
                   else{
                     setRelatedBook(data);
                   }
               })
           }
       })
    }

    useEffect(() => {
     const bookId = props.match.params.bookId;
     loadSingleBook(bookId);
    }, [props]);

    return(
        <Layout
         title={book && book.bookName}
         description={
            book &&
            book.description &&
            book.description.substring(0,100)}
         className="container-fluid"
        >

    
        <div className="row">
          <div className="col-8">
          {
            book &&
            book.description && (
             <Card book={book} showViewProductButton={false} />
            ) 
          }
          </div>
          
          <div className="col-4">
           <h4>Related Books</h4>
           {relatedbook.map((b, i) => (
               <div className="mb-3">
                  <Card key={i} book={b} />
               </div>    
           ))}
          </div>
        </div>  

        </Layout>
    );

}

export default Book;