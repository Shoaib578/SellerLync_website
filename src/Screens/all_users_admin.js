import React from 'react'
import Axios from 'axios'
import AdminHeader from './admin_header'
import base_url from './base_url'

let user = localStorage.getItem('user')
let parse = JSON.parse(user)

class AllUsers extends React.Component {
    state = {
        all_users:[]
    }
    

    componentDidMount(){
    Axios.get(base_url+'get_allusers')
    .then(res=>{
        this.setState({all_users:res.data.all_users})
    })
    }


    delete_user = (id)=>{
        Axios.get(base_url+'delete_user?user_id='+id)
        .then(res=>{
            alert(res.data.msg)
            window.location = '/all_users'
        })
        .catch(err=>{
            alert('Something Went Wrong')
        })
    }

    render(){
      
        if(localStorage.getItem('user') && parse.is_admin == 1){
        return (
            <div>
                <AdminHeader />
                <br/>
                <br/>

                <center>
                    <h1 style={{color: 'black'}}>All Users</h1>
                </center>
                <br/>
                <br/>
 
                <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Phone no</th>
      <th scope="col">City name or Zipcode</th>
      <th scope="col">Email</th>
      

      <th scope="col">#</th>


    </tr>
  </thead>
  <tbody>
    {this.state.all_users.map(data=>(<tr>
      
      <td>{data.name}</td>
      <td>{data.phone_no}</td>
      <td>{data.user_zipcode_or_cityname}</td>
      <td>{data.email}</td>

      <td>
          <button class="btn btn-danger" onClick={()=>this.delete_user(data.user_id)}>Delete</button>
      </td>

    </tr>))}
    
  </tbody>
</table>
            </div>
        )
    }else{
        window.location='/'
    }
    }
}

export default AllUsers