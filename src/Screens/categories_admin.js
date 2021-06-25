import React from 'react'
import Axios from 'axios'
import AdminHeader from './admin_header'
import base_url from './base_url'

let user = localStorage.getItem('user')
let parse = JSON.parse(user)

class Category_Admin extends React.Component {
   
    state ={
        category:'',
        category_image:null,
        all_categories:[],
        //errors

        category_error_state:'',
        category_image_error_state:'',
        
    }

    validate = ()=>{
        let category_error =''
        let category_image_error = ''
        


        if(this.state.category.length <3){
            category_error = 'Category Field Must Be At least 3 characters'
        }

        if(this.state.category_image == null ){
            category_image_error = 'Choose Category Image and it must be jpeg,png or jpg'
        }
        
        

        if(category_error || category_image_error ){
            this.setState({category_image_error_state:category_image_error,category_error_state:category_error,})
            return false
        }
        return true
    }


    add_vendorcategory = ()=>{
      let is_validate = this.validate()
      if(is_validate){
      this.setState({category_image_error_state:'',category_error_state:'',})
          let formData = new FormData()
          formData.append('vendor_category_name',this.state.category)
          formData.append('vendor_category_image',this.state.category_image)
          Axios.post(base_url+'add_vendorcategory',formData)
          .then(res=>{
              
              alert(res.data.msg)

              window.location = '/admin_categories'
          })
          .catch(err=>{
              alert('Something Went Wrong')
          })

          
      }else{
          alert('Please Fill All the Fields Properly')
      }
    }


    delete_category = (id)=>{
      Axios.get(base_url+'delete_category?category_id='+id)
      .then(res=>{
          alert(res.data.msg)
          window.location = '/admin_categories'
      })
      .catch(err=>{
        alert('Something Went Wrong')
      })
    }
 
    componentDidMount(){
        Axios.get(base_url+'get_all_categories')
        .then(res=>{
            this.setState({all_categories:res.data.all_categories})
        })
    }

    render() {
        if(localStorage.getItem('user') && parse.is_admin == 1){
        return(
            <div>
              <AdminHeader />

              <center>
                  <button class='btn btn-primary float-right mr-5' data-toggle="modal" data-target="#exampleModal" style={{marginTop:50}}>Add Category+</button>
              </center>


           <br />
           <br />







              {/* Modal */}
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Category</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <center>


     

            <br/>
            <input type="text" placeholder='Category'  style={{backgroundColor:this.state.category_error_state?'red':'#D3D3D3',padding:15,borderRadius:12,height:45,width:'85%',outline:'none'}} onChange={(val)=>{
                this.setState({category:val.target.value});
            }}/> 
            {this.state.category_error_state?<b style={{color:'red'}}>{this.state.category_error_state}</b>:null}

          <br/>
            <input type="file" title='Category Image'  style={{backgroundColor:this.state.category_image_error_state ?'red':'#D3D3D3',borderRadius:12,width:'85%',outline:'none',padding:5}} onChange={(val)=>{
                this.setState({category_image:val.target.files[0]});
               
               
            }}/> 
            {this.state.category_error_state?<b style={{color:'red'}}>{this.state.category_image_error_state}</b>:null}
            
           
         
         

            </center>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.add_vendorcategory}>Add</button>
      </div>
    </div>
  </div>
</div>


<br/>
<br/>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Category</th>
      <th scope="col">Category Image</th>
     
      <th scope="col">#</th>


    </tr>
  </thead>
  <tbody>

    {this.state.all_categories.map(data=>(<tr>
      
      <td>{data.category}</td>
      <td>
          
          <img src={base_url+'static/category_images/'+data.picture} style={{borderRadius:12,width:50,height:50}}/>
      
      </td>
      <td>
          <button class="btn btn-danger" onClick={()=>{
             this.delete_category(data.vendor_category_id)
          }}>Delete</button>
      </td>
    </tr>))}
    
  </tbody>
</table>


            </div>
        )
        }else{
            window.location = '/'
        }
    }
}

export default Category_Admin