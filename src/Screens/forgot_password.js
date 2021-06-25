import React from 'react'
import Axios from 'axios'
import base_url from './base_url'

class ForgotPassword extends React.Component {
    state ={
        email:'',
        new_password:'',
        check_email: false,

        //error states
        email_error_state:'',
        password_error_state:''
    }

    validate_email = ()=>{
        let email_error = ''
        let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email_regex.test(this.state.email) == false){
            email_error = 'Invalid Email'
        }

        if(email_error){
            this.setState({email_error_state:email_error})
            return false
        }

        return true
    }


    validate_password = ()=>{
       let password_error = ''

        if(this.state.new_password.length<8){
            password_error = 'Password Must Be at least 8 characters'
        }

        if(password_error){
            this.setState({password_error_state:password_error})
            return false
        }

        return true
    }

    render() {
         


            if(!localStorage.getItem('user')){

        return(
            <center >
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

      
      
           <h1 style={{color: 'black'}}>Forgot Password</h1>
           <br/>

           
        {!this.state.check_email?
        
        
        <div class="col-sm-10">
      <input placeholder='Email' type="email"  style={{backgroundColor:this.state.email_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:400,outline:'none'}} onChange={(val)=>{
            this.setState({email:val.target.value})
            
        }}/>
        {this.state.email_error_state?<b style={{color:'red',marginTop:20}}>{this.state.email_error_state}</b>:null}
    </div>
       
        
        :
        
       

        <div class="col-sm-10">
        <input type="password" placeholder='New Password' autocomplete='off' style={{backgroundColor:this.state.password_error_state?'red':'#D3D3D3',padding:15,borderRadius:5,height:45,width:400,}} onChange={(val)=>{
            this.setState({new_password:val.target.value})
        }}/>
        {this.state.password_error_state?<b style={{color:'red',marginTop:20}}>{this.state.password_error_state}</b>:null}
      </div>

        }
        
        
        
        
    
    
      <br/>
  
       
      {!this.state.check_email?<button class="btn btn-pimary" style={{backgroundColor:'#D3D3D3',borderRadius:5,height:45,width:110,color:'white'}} onClick={()=>{
          
           let is_validate = this.validate_email()
           if(is_validate){
               this.setState({email_error_state:''})
               let formData = new FormData()
               formData.append('email',this.state.email)
               formData.append('check_password','false')
               formData.append('check_email','true')

               Axios.post(base_url+'forgot_password',formData)
               .then(res=>{
                   
                   if(res.data.msg == 'found'){
                       this.setState({check_email:true})
                   }else{
                       alert(res.data.msg)
                   }
               })
               .catch(err=>{
                alert('Somethind Went Wrong')
            })
           }
          
      }}>Check</button>:
      
      <button class="btn btn-pimary" style={{backgroundColor:'#D3D3D3',borderRadius:5,height:45,width:110,color:'white'}} onClick={()=>{
          let is_validate =this.validate_password()

          if(is_validate){
            this.setState({password_error_state:''})
            let formData = new FormData()
            formData.append('email',this.state.email)
            formData.append('check_password','true')
            formData.append('check_email','false')
            formData.append('password',this.state.new_password)

            Axios.post(base_url+'forgot_password',formData)
               .then(res=>{
                   alert(res.data.msg)
                   window.location = '/'
               })
               .catch(err=>{
                alert('Something Went Wrong')
                })

          }

      }}>Reset</button>}
         <br/>
         <br/>
</center>
        )
    }else{
        return window.location ='/'
    }
    }
}

export default ForgotPassword