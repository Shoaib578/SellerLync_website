import React from 'react'

class PageNotFound extends React.Component{
    render(){
        return(
            <center>
                <h1 style={{marginTop:120,color:'black'}}>404</h1>
                <br />
                <h2 style={{color:'black'}}>Whoops...Page Not Found</h2>
               <br />
                <button style={{borderWidth:1,borderColor:'#D3D3D3',backgroundColor:'#D3D3D3',borderRadius:12,}} onClick={()=>window.location='/'}>Go to Home</button>
            </center>
        )
    }
}


export default PageNotFound