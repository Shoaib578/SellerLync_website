import React from 'react'
import SearchImage from '../images/search.png'
import location_image from '../images/location.png'
import Axios from 'axios'
import base_url from './base_url'

let user = localStorage.getItem('user')
let parse = JSON.parse(user)



class NormalUserHeader extends React.Component {
  
  state = {
    search_box:'',
    location_box:'',
    all_categories:[],
    cities:[]
  }


  componentDidMount(){
    
  Axios.get(base_url+'get_all_categories_for_normal_users?user_default_location='+parse.user_cityname).then(res=>{
    this.setState({all_categories:res.data.all_categories})
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

    render() {
        return(
          <div>


            <center>
            <div style={{width:'60%',float:'left'}}>




<div class="col-auto" >
      
      <div class="input-group mb-2">
        <div class="input-group-prepend" style={{backgroundColor:'#D3D3D3',height:38,marginTop:5,borderRadius:12,}}>
          <div class="input-group-text" style={{backgroundColor:'#D3D3D3',}}>
          <img  src={location_image} style={{width:32,height:32}} />
          </div>

          
        </div>
        <select type="text" class="form-control" id="inlineFormInputGroup"  style={{backgroundColor:'#D3D3D3',outline:'none',height:38.3,marginTop:5}} value={this.state.location_box}  onChange={(val)=>{
   this.setState({location_box:val.target.value})
   
   }}>
  <option value='' selected>Choose a City</option>


  <option value={parse.user_cityname}>{parse.user_cityname} {'>>'} Your Location</option>
 {this.state.cities.map(data=>(
     
  <option value={data.city}> {data.city}</option>
  
  ))}

    </select>
      </div>
    </div>

         
            </div>

            <div style={{width:'40%',float:'right',marginTop:3}}>
            <button class="btn btn-pimary float-right" onClick={()=>{
              localStorage.removeItem('user')
              window.location = '/'
            }} style={{backgroundColor:'#D3D3D3',borderRadius:5,height:40,width:70,color:'white',marginRight:35}}>Logout</button>
          </div>


            <br/>
            
            <br/>
                    
            
            
            
            

  


<div class="col-auto" style={{marginRight:20}}>
      
      <div class="input-group mb-2">
        <div class="input-group-prepend" style={{backgroundColor:'#D3D3D3',height:38,marginTop:5,borderRadius:12,}}>
          <div class="input-group-text" style={{backgroundColor:'#D3D3D3',}}>
          <img  src={SearchImage} style={{width:32,height:32}} onClick={()=>{
     
     if(this.state.search_box.length > 0 && this.state.location_box.length > 0){
     
      window.location.href =  `https://seller-lync.herokuapp.com/search_item/${this.state.location_box}/${this.state.search_box}/`
      
   }else{
    
    alert("Please Give us information about your location and also the item name")
 
   }
   }}/>
          </div>

          
        </div>
        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="item name" style={{backgroundColor:'#D3D3D3',outline:'none'}} value={this.state.search_box}  onChange={(val)=>{
   this.setState({search_box:val.target.value})
   }}/>
      </div>
    </div>



   

    
    
 

  
            
           
         
              <br/>
              
             
               
              <hr/>

<br/> 
<h5 style={{fontWeight:'bold',float:'left'}}>Explore By Category</h5>
     

<br />
<div class="slider">
  


  <div class="slides" style={{padding:20}}>

{/* start slide */}

    {this.state.all_categories.map(data=>(<div style={{height:200,padding:20}}>
    <div style={{height:180,padding:20}}>
    <a href={`/view_category_by_user_default_location/${data.vendor_category_id}`}> <img src={base_url+'static/category_images/'+data.picture} style={{height:'100%',borderRadius:12,width:'100%'}}/></a>

      <br/>
      
      <h5>{data.category}</h5>

      </div>
      
    </div>))}
{/* end slide */}


   



  </div>
</div>
<br/>  

<br/> 
<h5 style={{fontWeight:'bold',float:'left'}}>Quick Shop</h5>
     

<br />
              </center>
              </div>


        )
    }
}

export default NormalUserHeader