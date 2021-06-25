import React from 'react'
import NormalUserHeader from './normal_user_header'
import Axios from 'axios'
import Vendorimage from '../images/vendor.png'

import '../css/tooplate-style.css'
import base_url from './base_url';

let user = localStorage.getItem('user')
let parse = JSON.parse(user)

class ViewCategoryByDefaultUserLocation extends React.Component {
  state = {
    all_vendors: [],
    category_info:[]
  }

  componentDidMount(){
   

  Axios.get(base_url+'view_category_by_user_default_location?category_id='+this.props.match.params.id+'&&user_default_location='+parse.user_cityname)
  .then(res=>{
    console.log(res.data.all_vendors)
    this.setState({all_vendors:res.data.all_vendors,category_info:res.data.category})
    
  })




  }

    render() {
      if(localStorage.getItem('user') && parse.is_admin != 1){

        return (
          
          
            <div class="tm-container-fluid">
            <center >
          
             <NormalUserHeader />
               
                  
    
           <br/>
           {this.state.category_info.map(data=>(<div class="tm-gallery-item city portraits" >
           
		            
                
		            	<img src={base_url+'static/category_images/'+data.picture} alt="City Scape" class="img-fluid" />
                 
		          
					<div  class='item-contents-border' >
					<br/>

					<h3 class='float-left' 	style={{marginLeft:20}}>{data.category}</h3>
					<br/>
					<br/>
					<img src={Vendorimage} style={{width:30,height:40}}/>
					<br/>
					<h5 class='float-left' style={{marginLeft: 20}}>
					
					{data.vendors_count} {data.vendors_count>1?'Vendors':'Vendor'} </h5>
				
				
				

                </div>
            </div>))}
     










                 <table class="table">
  <thead>
  <br />
  <br/>


    <tr>
      <th scope="col">Vendor Name</th>
      <th scope="col">Price</th>
      
    </tr>
  </thead>
  <tbody>
    
      {this.state.all_vendors.map(data=>(<tr>
        <a href={`/view_vendor/${data.vendor_id}`} style={{textDecoration:'none'}}> <th scope="row">{data.name}</th>
    </a>

      <td>{data.price}</td>
      
    </tr>))}
    
    
  </tbody>
</table>
                 </center>
                 </div>
                 

        )
      }else{
      return  window.location = '/'
      }
    }
}

export default ViewCategoryByDefaultUserLocation