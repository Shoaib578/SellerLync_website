import React from 'react';
import Axios from 'axios'
import base_url from './base_url';
class Register extends React.Component {
    state = {
      email:'',
      password:'',
      phone_no:'',
      name:'',
      cityname:'',

      //error states

      phone_no_error_state:'',
      email_error_state:'',
      password_error_state:'',
      name_error_state:'',
      cityname_error_state:''

      }

      validate = ()=>{
        let email_error = ''
        let password_error = ''
        let phone_no_error = ''
        let name_error = ''
        let cityname_error = ''
        let phone_number_regex = /^[+#*\(\)\[\]]*([0-9][ ext+-pw#*\(\)\[\]]*){6,45}$/
        let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(email_regex.test(this.state.email) == false){
          email_error = 'Invalid Email'
         }
     
         
         if(phone_number_regex.test(this.state.phone_no) == false){
          phone_no_error ='Invalid Phone Number'
     
         }
     
         if(this.state.password.length<8){
             password_error = 'Password Must Be at least 8 characters'
         }

         if(this.state.name.length<5){
          name_error ='Name Must Be at least 5 characters' 
         }

         if(this.state.cityname.length<4){
          cityname_error = 'Please enter  City Name'
         }


         if(email_error || password_error || phone_no_error || name_error || cityname_error){
           this.setState({email_error_state:email_error,
            password_error_state:password_error,
            name_error_state:name_error,
            phone_no_error_state:phone_no_error,
            cityname_error_state:cityname_error,


          
          })

          return false
         }

         return true
      }


      register = ()=>{
        let is_validate =this.validate()

        if(is_validate){
          this.setState({
            email_error_state:'',
            password_error_state:'',
            name_error_state:'',
            phone_no_error_state:'',
            cityname_error_state:'',
          })

          let formData = new FormData()
          formData.append('email',this.state.email)
          formData.append('password',this.state.password)
          formData.append('phone_no',this.state.phone_no)
          formData.append('cityname',this.state.cityname)
          formData.append('name',this.state.name)
          Axios.post(base_url+'register',formData)
          .then(res=>{
           if(res.data.msg == 'You are Successfully Registered'){
             this.setState({email:'',password:'',name:'',phone_no:'',cityname:''})
             alert(res.data.msg)
             window.location = '/login'
           }else{
            alert(res.data.msg)
           }
          })
          .catch(err=>{
            alert('Something Went Wrong')
        })

        }
      }
    render(){
      if(!localStorage.getItem('user')){

        return (
            <center >
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

          
          
               <h1 style={{color: 'black'}}>Register</h1>
               <br/>

               <div class="col-sm-10">
      <input type="text"  placeholder="Name" style={{backgroundColor:this.state.name_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:400,outline:'none',color:'white'}}  value={this.state.name} onChange={(val)=>this.setState({name:val.target.value})}/>
    </div>

      {this.state.name_error_state?<b style={{color:'red'}}>{this.state.name_error_state}</b>:null}

            <br/>


            <div class="col-sm-10">
      <input placeholder='Phone Number' type="text"  style={{backgroundColor:this.state.phone_no_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:400,outline:'none'}} defaultValue={'+91'}   onChange={(val)=>this.setState({phone_no:val.target.value})}/>
    </div>
   {this.state.phone_no_error_state?<b style={{color:'red'}}>{this.state.phone_no_error_state}</b>:null}
            

            <br/>


            <div class="col-sm-10">
      <input placeholder='Email' type="email"  style={{backgroundColor:this.state.email_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:400,outline:'none'}} value={this.state.email} onChange={(val)=>this.setState({email:val.target.value})}/>
    </div>
      {this.state.email_error_state?<b style={{color:'red'}}>{this.state.email_error_state}</b>:null}

            <br/>


            <div class="col-sm-10">
      <input type="password" placeholder='Password' style={{backgroundColor:this.state.password_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:400,outline:'none'}} value={this.state.password} onChange={(val)=>this.setState({password:val.target.value})}/>
    </div>
  
    {this.state.password_error_state?<b style={{color:'red'}}>{this.state.password_error_state}</b>:null}

            <br/>
            
          
            <div class="col-sm-10">
      <input type="text" placeholder='City Name' style={{backgroundColor:this.state.cityname_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:400,outline:'none'}} value={this.state.cityname} onChange={(val) => this.setState({cityname:val.target.value})}/>
    </div>
              
            {this.state.cityname_error_state?<b style={{color:'red'}}>{this.state.cityname_error_state}</b>:null}
        
        
          <br/>
          <br/>
      
           
             <button class="btn btn-pimary" style={{backgroundColor:'#D3D3D3',outline:'none',borderRadius:5,height:45,width:110,color:'white'}} onClick={()=>{this.register()}}>Register</button>
             <br/>
             <br/>

            
           
             <b >Already Have An Account Want to <a href='/login'>Login</a></b> 
            

            
            </center>
        )
            }else{
             return window.location = '/'
            }
    }
}

export default Register