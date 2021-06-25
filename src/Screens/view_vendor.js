import React from 'react'
import NormalUserHeader from './normal_user_header'
import Axios from 'axios'
import base_url from './base_url'
let user = localStorage.getItem('user')
let parse = JSON.parse(user)

class ViewVendorNormalUsers extends React.Component {
  state = {
    vendor:[]
  }

  componentDidMount(){
   Axios.get(base_url+'view_vendor?vendor_id='+this.props.match.params.id)
   .then(res=>{
     this.setState({vendor:res.data.vendor})
   })
  }

    render() {
      if(localStorage.getItem('user') && parse.is_admin != 1){

        return (
            <div class="tm-container-fluid">
	
            <center >
          
                  <div class="tm-gallery-section tm-mb-80">
                  
                 <NormalUserHeader />
                 </div>

                 
             
                 

                 <table class="table">
  <thead>
  <br />
  <br/>


    <tr>
      <th scope="col">Vendor Name</th>
      <th scope="col">Phone No</th>
      <th scope="col">Price</th>
      <th scope="col">Adress</th>
     

     

      

      
    </tr>
  </thead>
  <tbody>
    
        <tr>
        
        <td>{this.state.vendor.name}</td>
        <td>{this.state.vendor.phone_no}</td>
        <td>{this.state.vendor.price}</td>
        <td>{this.state.vendor.city_name}</td>
        



       
    </tr>
    
   

  </tbody>
</table>
                 </center>
                 </div>

        )
      }else{
       return window.location = '/'
      }
    }
}

export default ViewVendorNormalUsers