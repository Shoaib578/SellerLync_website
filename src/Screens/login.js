import React from 'react';
import Axios from 'axios'
import base_url from './base_url'
class Login extends React.Component {

    state = {
        email:'',
        password:'',
      
        //Errors
        email_error_state:'',
        password_error_state:'',
        
    }

 //<--------Start Validation----------->

 validate = () =>{
    let email_error = ''
  
    let password_error = ''
  
    let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email_regex.test(this.state.email) == false){
        email_error = 'Invalid Email'
    }

   
    if(this.state.password.length<8){
        password_error = 'Password Must Be at least 8 characters'
    }

   
    if(email_error  || password_error ){
        this.setState({email_error_state: email_error, password_error_state: password_error})
        return false
    }

    return true


}

//<--------End Validation----------->




//<-------Login---------->

login = ()=>{
    let is_validate = this.validate()
    if(is_validate){
        this.setState({email_error_state:'',password_error_state:''})
       let formData = new FormData()
       formData.append('email',this.state.email)
       formData.append('password',this.state.password)
       Axios.post(base_url+'login',formData)
       .then(res=>{
           
           if(res.data.msg == 'you are successfully logged in'){
               localStorage.setItem('user',JSON.stringify(res.data.user))
               window.location = '/'
           }else{
               alert('Wrong Email or Password')
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

          
          
               <h1 style={{color: 'black'}}>Login</h1>
               <br/>
           



    
    <div class="col-sm-10">
      <input type="email"  placeholder="Email" style={{backgroundColor:this.state.email_error_state.length>0?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:400,outline:'none'}} onChange={(val)=>{
                this.setState({email:val.target.value});
            }}/>
    </div>
 
{this.state.email_error_state?<b style={{color:'red'}}>{this.state.email_error_state}</b>:null}

            <br/>

           
    
    <div class="col-sm-10">
      <input type="password"  placeholder="Password" style={{backgroundColor:this.state.password_error_state.length>0?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:400,outline:'none'}} onChange={(val)=>{
                this.setState({password:val.target.value});
            }}/>
    </div>

{this.state.password_error_state?<b style={{color:'red'}}>{this.state.password_error_state}</b>:null}
            
            
        
        
          <br/>
      
           
             <button class="btn btn-pimary" onClick={()=>{
                 window.location = '/'
             }}style={{backgroundColor:'#D3D3D3',borderRadius:5,height:45,width:110,color:'white',outline:'none'}} onClick={()=>this.login()}>Login</button>
             <br/>
             <br/>

             <a href="/forgot_password" ><b>Forgot Password</b></a>   
             <br/>
           
             <b >Dont Have Any Account Want to <a href='/register'>Register</a></b> 
            

            
            </center>
        )
        }else{
            return window.location = '/'
        }
    }
}

export default Login