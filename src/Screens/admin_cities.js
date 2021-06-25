import React from 'react';
import AdminHeader from './admin_header'
import Axios from 'axios'
import base_url from './base_url'

let user = localStorage.getItem('user')
let parse = JSON.parse(user)

class AdminCities extends React.Component {
    state = {
        city_name:'',
        state_name:'',
        cities:[],
        district:''

       

       
    }

 
    componentDidMount(){
    Axios.get(base_url+'get_cities?want_to_search='+'false')
    .then(res=>{
        this.setState({cities:res.data.cities})
        console.log(res.data)
    })
    .catch(res=>{
        console.log('Somethig Went wrong')
    })
    }

    delet_city = (id)=>{
        Axios.get(base_url+'delete_city?id='+id).then(res=>{
            alert(res.data.msg)
            window.location = '/cities'
        })
        .catch(err=>{
            alert('Something Went Wrong')
        })
    }

    add_city = ()=>{
        let formData = new FormData()
        formData.append('city_name',this.state.city_name)
        formData.append('state',this.state.state_name)
        formData.append('district',this.state.district)

        Axios.post(base_url+'/add_city',formData)
        .then(res=>{
            alert(res.data.msg)
            window.location = '/cities'
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
             <button className="btn btn-primary float-right mr-5" data-toggle="modal" data-target="#exampleModal">Add City+</button>


<center>
    <br/>
    <br/>
    <h1 style={{color: 'black'}}>All the Cities</h1>
    <br/>
    <br/>
</center>

             <table class="table">
  <thead>
    <tr>
      <th scope="col">City Name</th>
      <th scope="col">State Name</th>
      <th scope="col">District Name</th>
      

      <th scope="col">#</th>


    </tr>
  </thead>
  <tbody>
   {this.state.cities.map(data=>(<tr>
      
      <td>{data.city}</td>
     

      <td>{data.state}</td>
      <td>{data.district}</td>


      <td>
      <button class="btn btn-danger" onClick={()=>this.delet_city(data.city_id)}>Delete</button>
      </td>

    </tr>))}
    
  </tbody>
</table>














{/* Modal */}
            
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add City</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <center>
      <br/>
            <input type="text" placeholder='City name'  style={{backgroundColor:'#D3D3D3',padding:15,borderRadius:5,height:45,width:'85%',outline:'none'}} onChange={(val)=>{
                this.setState({city_name:val.target.value});
            }}/> 
           

          <br/>
            <input type="text" placeholder='State name'  style={{backgroundColor:'#D3D3D3',padding:15,borderRadius:5,height:45,width:'85%',outline:'none'}} onChange={(val)=>{
                this.setState({state_name:val.target.value});
            }}/> 
           

           <br/>
           <input type="text" placeholder='District'  style={{backgroundColor:'#D3D3D3',padding:15,borderRadius:5,height:45,width:'85%',outline:'none'}} onChange={(val)=>{
                this.setState({district:val.target.value});
            }}/>

           </center>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.add_city}>Add</button>
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

export default AdminCities