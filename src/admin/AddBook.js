import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createBook, getCategories } from './apiAdmin';

const AddBook = () => {

   const [values, setValues] = useState({
       bookName: '',
       description: '',
       categories: [],
       category: '',
       author: '',
       publisher: '',
       photo: '',
       loading: false,
       error: '',
       createdBook: '',
       redirectToProfile: false,
       formData: ''
   })

   const {
      bookName,
      description,
      categories,
      category,
      author,
      publisher,
      loading,
      error,
      createdBook,
      redirectToProfile,
      formData
    } = values;

    // Load Categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error:data.error})
            } else{
                setValues({
                ...values, 
                categories: data,
                formData: new FormData()
                })
            }
        })
    }

    const {user, token} = isAuthenticated();

    useEffect(() => {
        init();
      }, []);

    const handleChange = name => event => { //higher order function(Function is retuning another function)
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: "",loading: true });

        createBook(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({
                    ...values,
                    bookName: "",
                    description: "",
                    author: "",
                    publisher: "",
                    photo: "",
                    loading: false,
                    createdBook: data.bookName
                });
            }
        });
    }
     
    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
         <h4>Post Photo</h4>
         <div className="form-group">
             <label className="btn btn-secondary">
             <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
             </label>
         </div>

         <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('bookName')} type="text" className="form-control" value={bookName} />   
         </div>

         <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea onChange={handleChange('description')} className="form-control" value={description} />   
         </div>

         <div className="form-group">
            <label className="text-muted">Category</label>
            <select onChange={handleChange('category')} className="form-control">
                <option>Please select</option>
                {categories && categories.map((c, i) => (
                  <option key={i} value={c._id}>
                      {c.name}
                  </option>  
                )) }
            </select>       
         </div>

         <div className="form-group">
            <label className="text-muted">author</label>
            <input onChange={handleChange('author')} type="text" className="form-control" value={author} />   
         </div>

         <div className="form-group">
            <label className="text-muted">publisher</label>
            <input onChange={handleChange('publisher')} type="text" className="form-control" value={publisher} />   
         </div>

         <button className="btn btn-outline-primary">Create Book</button>

        </form>
    );

   const showError = () => (
     <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
         {error}
     </div>
   );

   const showSuccess = () => (
    <div className="alert alert-info" style={{display: createdBook ? '' : 'none'}}>
        <h2>{`${createdBook}`} is created!</h2>
    </div>
  );

  const showLoading = () => (
    loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    )
  );

   return(
    <Layout 
    title="Add a new product" 
    description={`G'day ${user.name}, ready to add a new product?`}
    >

    <div className="row">
        <div className="col-md-8 offset-md-2">
         {showLoading()}
         {showSuccess()}
         {showError()}
         {newPostForm()}
        </div>
    </div>

    </Layout>
);

}

export default AddBook;