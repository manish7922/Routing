import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";

class OptionCB extends Component {
handleChange=(e)=>{
let {currentTarget:input}=e
let options ={...this.props.options}
options[input.name]=this.updateCBs(options[input.name],input.checked,input.value)
options[input.name]=input.value
this.props.onOptionChange(options)
}
updateCBs=(inpValue,checked,value)=>{
    let inputArr= inpValue ?  inpValue.split(","):[];
    if(checked) inputArr.push(value)
    else{
        let index=inputArr.findIndex((ele)=>ele===value)
        if(index>=0) inputArr.splice(index,1);
    }
    return inputArr.join(",");
}
// 

makeCheckboxes=(arr,values,name,label)=>(
    <React.Fragment>
            <label className="form-check-label font-weight-bold">{label}</label>
    {arr.map((opt,index)=>(
        <div className='form-check' key={opt}>
    <input  className="form-check-input"  type="checkbox" name={name} value={opt} checked={values.findIndex(val=>val===opt)>=0} onChange={this.handleChange} />   
   <label className="form-check-label">{opt}</label>
    </div>
    )

    )}
    </React.Fragment>
   ) 
   showRadios=(arr,values,name,label)=>(

    <React.Fragment>
       <label className="form-check-label font-weight-bold">{label}</label>
           {arr.map((opt)=>(
    <div className='form-check '>
<input  className="form-check-input" type="radio" name={name} value={opt} checked={values===opt} onChange={this.handleChange} />   
<label className="form-check-label">{opt}</label>
</div>
))} 
    </React.Fragment>
)


    render(){
const{department="",designation}=this.props.options
let {allOptions}=this.props;
console.log("allOptions=",allOptions);

return (
 <div className="row border bg-light w-100%">
     <div className="col-12 m-1">
        { this.showRadios(allOptions.designation,designation,"designation","Designation")}
        </div>
        <div className="col-12 m-1">
        { this.makeCheckboxes(allOptions.department,department.split(","),"department","Department")}
        </div>
      
    
   
 </div>
)
    }



}
export default OptionCB;