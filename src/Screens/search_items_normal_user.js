import React from 'react'
import NormalUserHeader from './normal_user_header'
import '../css/tooplate-style.css'
import dropdownimage from '../images/dropdown.svg'
import Vendorimage from '../images/vendor.png'


import Axios from 'axios'
import base_url from './base_url'


let user = localStorage.getItem('user')
let parse = JSON.parse(user)

let dropdown_category_id = ''

class SearchItemsNormalUser extends React.Component {

    state={
    all_categories:[],
    dropdown_vendors:[]
    }

    componentDidMount() {
    Axios.get(base_url+'get_all_category_by_search?location='+this.props.match.params.location+'&&item='+this.props.match.params.item_name)
    .then(res=>{
    this.setState({all_categories:res.data.all_categories})
	console.log(res.data)
    })
    }

    dropdown_vendors = (category_id)=>{
		Axios.get(base_url+'dropdown_vendors?location='+this.props.match.params.location+'&&category_id='+category_id)
								.then(res=>{
                                      this.setState({dropdown_vendors:res.data.all_vendors})
				 

	  })
	}


    render() {
        return (
            <body>
            <div class="tm-container-fluid">
            
          <center >
        
                <div class="tm-gallery-section tm-mb-80" >
               
           <NormalUserHeader />
        <br />


        {this.state.all_categories.map(data=>(
        
        
        <div  class='category-container mt-5' style={{padding:20}}> 
           <a href={`/view_searched_category/${this.props.match.params.location}/${data.vendor_category_id}`}>
                
				       	<img src={base_url+'static/category_images/'+data.picture} alt="City Scape" style={{width:200,height:200,paddingTop:15}} class="float-left ml-5"/>
					 
			       </a>
					
					<br/>
	
				<a href={`/view_searched_category/${this.props.match.params.location}/${data.vendor_category_id}`}><h3 class='float-left' 	style={{marginLeft:20}}>{data.category} </h3></a>
				<br/>
				 		<br/>
					<img src={Vendorimage} class="float-left" style={{width:30,height:40,marginLeft:25}}/>
						
					<h5 class='float-left' style={{padding:13}}>
						
				 		{data.search_page_vendors_count} </h5>
					<img src={dropdownimage} style={{width:30,height:40,float:'right',marginRight:20,cursor:'pointer'}} onClick={()=>{
							this.setState({show_popup:data.vendor_category_id})
	
							if(this.state.show_popup){
				             this.setState({show_popup:''})
                             dropdown_category_id  = ''

							}else{
								this.setState({show_popup:data.vendor_category_id})
                                dropdown_category_id  = data.vendor_category_id
								this.dropdown_vendors(dropdown_category_id)
							}
	
						}}/>
						
                        <div style={{marginTop:120}}>
						{this.state.show_popup && this.state.show_popup == data.vendor_category_id?this.state.dropdown_vendors.map(dropdown_data=>{
							if(this.state.dropdown_vendors.length>0){

							return(
								<div class='border border-secondary' style={{marginTop:30,width:'80%',borderRadius:12}}>
									

									<table class="table">
										<thead>
										


											<tr>
											<th scope="col">Vendor Name</th>
											<th scope="col">Price</th>
											
											</tr>
										</thead>
										<tbody>
											<tr>
											
											<th scope="row"><a href={`/view_vendor/${dropdown_data.vendor_id}`} style={{textDecoration:'none'}}> {dropdown_data.name}</a></th>
											

											<td>{dropdown_data.price}</td>
											
											
											</tr>
											
										</tbody>
										
										</table>
										{this.state.dropdown_vendors.length >4?<a href={`/view_searched_category/${this.props.match.params.location}/${data.vendor_category_id}`}>View More</a>:null}

								</div>
							)
							}else{
								return(
									<div class='border border-secondary' style={{marginTop:30,width:'80%',borderRadius:12}}>
                              <h2 style={{color:'black'}}>Sorry you dont have vendor in this city</h2>
								</div>

						)
							}
						}):null}

					</div>
	
					
					
	
				   
			</div>
            
            
            
            
            ))}


           </div>
           </center>
            </div>
            
            </body>
        )
    }
}


export default SearchItemsNormalUser