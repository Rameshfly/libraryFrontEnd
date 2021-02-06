import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getBook, getCategories, updateBook } from './apiAdmin';

const UpdateBook = ({ match }) => {
    const [values, setValues] = useState({
        bookName: '',
        description: '',
        categories: [],
        category: '',
        author: '',
        publisher: '',
        photo: '',
        loading: false,
        error: false,
        createdBook: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();
    const {
        bookName,
        description,
        // categories,
        category,
        author,
        publisher,
        loading,
        error,
        createdBook,
        redirectToProfile,
        formData
    } = values;

    const init = bookId => {
        getBook(bookId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // console.log(data);
                // populate the state
                setValues({
                    ...values,
                    bookName: data.bookName,
                    description: data.description,
                    category: data.category._id,
                    author: data.author,
                    publisher: data.publisher,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.bookId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateBook(match.params.bookId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    bookName: '',
                    description: '',
                    author: '',
                    publisher: '',
                    photo: '',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdBook: data.booName
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Book Name</label>
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
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
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

            <button className="btn btn-outline-primary">Update Book</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdBook ? '' : 'none' }}>
            <h2>{`${createdBook}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <Layout title="Update Book" description={`G'day ${user.name}, ready to update a book?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateBook;
