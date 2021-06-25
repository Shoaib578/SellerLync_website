import React from 'react'

class Login_or_not extends React.Component {
    render() {
        if(localStorage.getItem('user')){
            window.location = '/home'
        }else{
          window.location = '/login'
        }
       return(
           <center>
            <h1 style={{marginTop:200}}>Loading...</h1>
           </center>
       )
    }
}

export default Login_or_not