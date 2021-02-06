import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddBook from './admin/AddBook';
import UpdateBook from './admin/UpdateBook';
import Book from './core/Book';
import Inventory from './admin/Inventory';
import Profile from './user/Profile';
import ManageBooks from './admin/ManageBooks';

const Routes = () => {
    return(
        <BrowserRouter>
         <Switch>
             <Route path="/" exact component={Home} />
             <Route path="/signup" exact component={Signup} />
             <Route path="/signin" exact component={Signin} />
             <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
             <PrivateRoute path="/profile/:userId" exact component={Profile} />
             <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
             <AdminRoute path="/create/category" exact component={AddCategory} />
             <AdminRoute path="/create/book" exact component={AddBook} />
             <AdminRoute path="/admin/book/update/:bookId" exact component={UpdateBook} />
             <AdminRoute path="/admin/orders" exact component={Inventory} />
             <AdminRoute path="/admin/books" exact component={ManageBooks} />
             <Route path="/book/:bookId" exact component={Book} />
         </Switch>
        </BrowserRouter>
    );
}

export default Routes;