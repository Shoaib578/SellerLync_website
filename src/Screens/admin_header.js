import React from 'react'
import base_url from './base_url'

class AdminHeader extends React.Component {
    render() {
        return (
            <div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">SellerLync Admin</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home </a>
      </li>
     
      <li class="nav-item active">
        <a class="nav-link" href="/admin_categories">Categories</a> 
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/cities">Cities</a> 
      </li>

     


      <li class="nav-item active">
        <a class="nav-link" href="/all_users">All Users</a> 
      </li>

      <li class="nav-item active">
        <a class="nav-link" onClick={()=>{
          localStorage.removeItem('user')
          window.location = '/'
        }} style={{cursor:'pointer'}}>Log out</a> 
      </li>
    </ul>
    
  </div>
</nav>
            </div>
        )
    }
}

export default AdminHeader