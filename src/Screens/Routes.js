import React from 'react'
import NormalUserHome from './normal_user_Home'
import ViewCategoryByDefaultUserLocation from './view_category_by_default_user_location'
import ViewVendorNormalUsers from './view_vendor'
import Login from './login'
import Register from './register'
import ForgotPassword from './forgot_password'
import AdminHome from './admin_home'
import Login_or_not from './login_or_not'
import PageNotFound from './404'
import Category_Admin from './categories_admin'
import AllUsers from './all_users_admin'
import SearchItemsNormalUser from './search_items_normal_user'
import ViewSearchedCategory from './view_searched_category'
import AdminCities from './admin_cities'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class Routes extends React.Component {
    
render() {
    let user = localStorage.getItem('user')
    let parse = JSON.parse(user)
    return (
        <Router>
          
            <Switch>
                <Route exact path='/' component={Login_or_not}/>
               

               <Route exact path='/home' component={localStorage.getItem('user')&&parse.is_admin == 1?AdminHome:NormalUserHome}/>
              
               
                <Route exact path='/view_category_by_user_default_location/:id' component={ViewCategoryByDefaultUserLocation}/>

                <Route exact path='/view_searched_category/:location/:id' component={ViewSearchedCategory}/>

                <Route exact path='/view_vendor/:id' component={ViewVendorNormalUsers}/>
                <Route exact path='/search_item/:location/:item_name' component={SearchItemsNormalUser}/>
                

                <Route exact path='/admin_categories/' component={Category_Admin}/>
                <Route exact path='/all_users' component={AllUsers}/>
                <Route exact path='/cities' component={AdminCities}/>
                

                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/forgot_password' component={ForgotPassword}/>

                <Route  component={PageNotFound}/>
              

            </Switch>
        </Router>
    )
}
}

export default Routes