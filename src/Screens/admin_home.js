import React from 'react'
import AdminHeader from './admin_header'
import Axios from 'axios'
import base_url from './base_url'


let user = localStorage.getItem('user')
let parse = JSON.parse(user)


class AdminHome extends React.Component {
  state = {
    
    city_name:'',
    name:'',
    vendor_category:'',
    phone_no:'',
    price:'',
    all_categories:[],
    all_vendors:[],
    cities:[],

    //errors

    
    city_name_error_state:'',
    name_error_state:'',
    vendor_category_error_state:'',
    phone_no_error_state:'',
    price_error_state:'',
    

  }

  validate = ()=>{
   
   let cityname_error=''
   let name_error = ''
   let vendor_category_error = ''
   let phone_no_error=''
   let price_error = ''
   let phone_number_regex = /^[+#*\(\)\[\]]*([0-9][ ext+-pw#*\(\)\[\]]*){6,45}$/

   if(this.state.name.length < 3){
     name_error = 'Name Must be at least 3 characters'
   }

   

   if(this.state.city_name.length < 5){
   cityname_error = 'City Name Must be at least 5 characters'
   }
   
   if(this.state.vendor_category.length == 0){
     vendor_category_error = 'Please Select a Vendor Category'
   }

   
  if(phone_number_regex.test(this.state.phone_no) == false){
     phone_no_error ='Invalid Phone Number'

    }

  if(this.state.price.length == 0 || this.state.price == 0){
    price_error = 'Please Choose the price and it must be greater than zero'
  }

  if( cityname_error || name_error|| vendor_category_error || phone_no_error || price_error){
    this.setState({
      
      city_name_error_state:cityname_error,
      name_error_state:name_error,
      vendor_category_error_state:vendor_category_error,
      phone_no_error_state:phone_no_error,
      price_error_state:price_error
    })

    return false
  }

  return true


  }

  componentDidMount(){
    Axios.get(base_url+'get_all_categories')
    .then(res=>{
        this.setState({all_categories:res.data.all_categories})
    })

    Axios.get(base_url+'all_vendors')
    .then(res=>{
      this.setState({all_vendors:res.data.all_vendors})
    })


    Axios.get(base_url+'get_cities?want_to_search='+'false')
    .then(res=>{
        this.setState({cities:res.data.cities})
        console.log(res.data)
    })
    .catch(res=>{
        console.log('Somethig Went wrong')
    })

}


add_vendor = ()=>{
  let is_validate = this.validate()
  if(is_validate){
    this.setState({
      
      city_name_error_state:'',
      name_error_state:'',
      vendor_category_error_state:'',
      phone_no_error_state:'',
      price_error_state:''
    })

    let formData = new FormData()
    
    formData.append('city_name',this.state.city_name)
    formData.append('name',this.state.name)
    formData.append('vendor_category',this.state.vendor_category)
    formData.append('phone_no',this.state.phone_no)
    formData.append('price',this.state.price)

    Axios.post(base_url+'add_vendor',formData)
    .then(res=>{
      alert(res.data.msg)
      window.location = '/'
    })
    .catch(err=>{
      alert('Something Went Wrong')
    })
  }else{
    alert('Please Fill All the Fields Properly')
  }
}
  
    render() {
      if(localStorage.getItem('user') && parse.is_admin == 1){

        return (
            <div>
                <AdminHeader/>

                <br/>
                <hr/>
                <br/>
                <center>
<h1 style={{color: 'black'}}>All Vendors</h1>

                <br/>

</center>
        <button className="btn btn-primary float-right mr-5" data-toggle="modal" data-target="#exampleModal">Add Vendor+</button>
 <br/>
 <br/>
 <br/>
 <br/>

                <table class="table">
  <thead>
    <tr>
      <th scope="col">Vendor Name</th>
      <th scope="col">Phone no</th>
      <th scope="col">City name</th>
     
      <th scope="col">Vendor Category</th>
      <th scope="col">Price</th>

      <th scope="col">#</th>


    </tr>
  </thead>
  <tbody>
    {this.state.all_vendors.map(data=>(<tr>
      
      <td>{data.name}</td>
      <td>{data.phone_no}</td>
      <td>{data.vendor_city_name}</td>
      

      <td><img src={base_url+'static/category_images/'+data.picture} style={{borderRadius:12,width:50,height:50}}/>
      {data.category}</td>

      <td>{data.price}</td>

      <td>
      <button class="btn btn-danger" onClick={()=>{
        Axios.get(base_url+'delete_vendor?vendor_id='+data.vendor_id)
        .then(res=>{
          alert(res.data.msg)
          window.location = '/'
        })
        .catch(err=>{
          alert('Something Went Wrong')
        })
      }}>Delete</button>
      </td>

    </tr>))}
    
  </tbody>
</table>





{/* Modal */}
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Vendor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <center>


      

            <br/>
           
            
            <select style={{backgroundColor:this.state.city_name_error_state?'red':'#D3D3D3',borderRadius:5,height:45,width:'85%',outline:'none'}} className="form-control" id="inlineFormInputGroup" onChange={(val)=>{
                this.setState({city_name:val.target.value});
            }}>
              <option>Choose City</option>
              {this.state.cities.map(data=>(
                <option value={data.city}>{data.city} {'>> '} {data.province}</option>
              ))}
            </select>

            {this.state.city_name_error_state?<b style={{color:'red'}}>{this.state.city_name_error_state}</b>:null}

          <br/>
          

            <input type="text" placeholder='Name'  style={{backgroundColor:this.state.name_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:'85%',outline:'none'}} onChange={(val)=>{
                this.setState({name:val.target.value});
            }}/> 
            {this.state.name_error_state?<b style={{color:'red'}}>{this.state.name_error_state}</b>:null}

           <br/>
           <select  style={{backgroundColor:this.state.vendor_category_error_state?'red':'#D3D3D3',backgroundColor:'#D3D3D3',borderColor:this.state.vendor_category_error_state?'red':'#D3D3D3',borderWidth:1,borderRadius:5,height:45,width:'85%',outline:'none'}} onChange={(val)=>{
             this.setState({vendor_category:val.target.value})
             console.log(val.target.value)
            }
            }>
          <option selected >Select Vendor Category</option>
          {this.state.all_categories.map(data=>(<option value={data.vendor_category_id}>
            
            {data.category}

          </option>
         
          ))}
        </select>
        <br/>
        {this.state.vendor_category_error_state?<b style={{color:'red'}}>{this.state.vendor_category_error_state}</b>:null}

        <br/>
        

            <input type="text" placeholder='Phone no'  style={{backgroundColor:this.state.phone_no_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:'85%',outline:'none'}} defaultValue={'+91'} onChange={(val)=>{
                this.setState({phone_no:val.target.value});
                console.log(this.state.phone_no)
               
            }}/>

            
        {this.state.phone_no_error_state?<b style={{color:'red'}}>{this.state.phone_no_error_state}</b>:null}


          <br/>
            <input type="number" placeholder='Price'  style={{backgroundColor:this.state.price_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:'85%',outline:'none'}} onChange={(val)=>{
                this.setState({price:val.target.value});
            }}/>
        {this.state.price_error_state?<b style={{color:'red'}}>{this.state.price_error_state}</b>:null}

          <br/>
         

            </center>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.add_vendor}>Add</button>
      </div>
    </div>
  </div>
</div>

            </div>
        )
      }else{
        return window.location = '/'
      }

    }
}

export default AdminHome