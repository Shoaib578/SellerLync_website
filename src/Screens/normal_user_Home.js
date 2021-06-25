import React from 'react';
import Vendorimage from '../images/vendor.png'
import NormalUserHeader from './normal_user_header'
import dropdownimage from '../images/dropdown.svg'
import Axios from 'axios'
import base_url from './base_url';
let user = localStorage.getItem('user')
let parse = JSON.parse(user)


let dropdown_category_id = ''

class NormalUserHome extends React.Component {

    state = {
		all_categories:[],
		show_popup:'',
		dropdown_vendors:[],
		
		
	}
	componentDidMount(){
		console.log(parse.user_cityname)
		Axios.get(base_url+'get_all_categories_for_normal_users?user_default_location='+parse.user_cityname).then(res=>{
		  this.setState({all_categories:res.data.all_categories})
		})



	}


	dropdown_vendors = (category_id)=>{
		Axios.get(base_url+'dropdown_vendors?location='+parse.user_cityname+'&&category_id='+category_id)
								.then(res=>{
                                      this.setState({dropdown_vendors:res.data.all_vendors})
									  console.log(res.data.all_vendors)

								})
	}



    render() {
		if(localStorage.getItem('user') && parse.is_admin != 1){

        return (
            <body>
	<div class="tm-container-fluid">
	
  <center >

		<div class="tm-gallery-section tm-mb-80" >
		
       <NormalUserHeader />
			<br/>	

      
           
      
			<div  >
     	
			{this.state.all_categories.map(data=>(
			
			
		
			



			<div   style={{padding:20}} class='category-container mt-5'> 
           <a href={`/view_category_by_user_default_location/${data.vendor_category_id}`}>
                
				       	<img src={base_url+'static/category_images/'+data.picture} alt="City Scape" style={{width:200,height:200,paddingTop:15}} class="float-left ml-5"/>
					 
			       </a>
					
					<br/>
	
				<a href={`/view_category_by_user_default_location/${data.vendor_category_id}`}><h3 class='float-left' 	style={{marginLeft:20}}>{data.category} </h3></a>
				<br/>
				 		<br/>
					<img src={Vendorimage} class="float-left" style={{width:30,height:40,marginLeft:25}}/>
						
					<h5 class='float-left' style={{padding:13}}>{data.home_page_vendors_count} </h5>

					<img src={dropdownimage} style={{width:30,height:40,float:'right',marginRight:20,cursor:'pointer',transform:this.state.show_popup}} onClick={()=>{
							
	                        
							if(this.state.show_popup){
				             this.setState({show_popup:''})
							 dropdown_category_id = ''
							}else{
								this.setState({show_popup:data.vendor_category_id})
                                dropdown_category_id  = data.vendor_category_id
								
								this.dropdown_vendors(dropdown_category_id)

								
							}
	
						}}/>



						<div style={{marginTop:150}}>
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
                                   {this.state.dropdown_vendors.length >4?<a href={`/view_category_by_user_default_location/${data.vendor_category_id}`}>View More</a>:null}
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
		

     
		</div>
		

    </center>			
	</div>

	<script src="js/jquery.min.js"></script>
	<script src="js/imagesloaded.pkgd.min.js"></script>
	<script src="js/isotope.pkgd.min.js"></script>
	<script src="js/jquery.magnific-popup.min.js"></script>
	
</body>
        )
		}else{
			return window.location = '/'
		}
    }
}

export default NormalUserHome