import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";
import {Link} from "react-router-dom"
import queryString from "query-string"
import OptionCB from './optionCB';
class Location5 extends Component {
 state={

 
 }
 filterParams=(arr,queryParams)=>{
    let {department,designation}=queryParams

 arr=this.filterParam(arr,"department",department)
 arr=this.filterParam(arr,"designation",designation)
//  arr=this.filterParam(arr,"status",status)

 return arr;
 }
 filterParam=(arr,name,values)=>{
    if(!values) return arr;
    let valuesArr=values.split(",")
   let arr1= arr.filter(a1=>valuesArr.find(val=>val===a1[name]))
    return arr1;
 }

 handlePage=(incr)=>{
    let querParams=queryString.parse(this.props.location.search)
    let searchStr=this.makeSearchString(querParams)
    const {location}=this.props.match.params;
    let {page="1"}=querParams
console.log("Page",page);
    let newPage=+page+incr;
    console.log("newPage",newPage);
    querParams.page=newPage;
    // this.callUrl(`/emps/${location}`,querParams) 
    // this.callUrl("/emps",querParams) 
 location ?   this.callUrl(`/emps/${location}`,querParams) : this.callUrl("/emps",querParams)
}



 handleOptinChange=(options)=>{
    const {location}=this.props.match.params;
    location ?   this.callUrl(`/emps/${location}`,options) : this.callUrl("/emps",options)
   }
   callUrl=(url,options)=>{
    let searchStr=this.makeSearchString(options);
    this.props.history.push({
      pathname:url,
      search:searchStr,
  })
   }

   makeSearchString=(options)=>{
      let {page,department,designation}=options
      let searchStr="";
      searchStr=this.addToQueryString(searchStr,"page",page)
      searchStr=this.addToQueryString(searchStr,"department",department)
      searchStr=this.addToQueryString(searchStr,"designation",designation)
   
      
      return searchStr
      }
      addToQueryString=(str,parmaName,paramValue)=>
      paramValue ? str ? `${str}&${parmaName}=${paramValue}` : `${parmaName}=${paramValue}`:str;
  
      makeAllOptions=(arr)=>{
          let json={};
          console.log("arr=",arr);
          json.department=this.getDifferentValue(arr,"department");
          json.designation=this.getDifferentValue(arr,"designation");
       
          return json;
  
      }
      getDifferentValue=(arr,name)=>
          arr.reduce((a,c)=>a.find((val)=>val===c[name]) ? a:[...a,c[name]],[]) 




    render(){
 const {location}=this.props.match.params;
  const {Location1}=this.props;
  let queryParams=queryString.parse(this.props.location.search)
  let searchStr=this.makeSearchString(queryParams)
  let Location2=location ?  Location1.filter(lect=>lect.location===location) : Location1;
  let {page="1"}=queryParams
  let Location3=this.filterParams(Location2,queryParams) 
  let pageNum=+page;
  let size=2;

  console.log("pageno=",pageNum);
  let startIndex=(pageNum-1)*size;
  let endIndex=Location3.length> (startIndex+size-1) ? startIndex+size-1 : Location3.length-1
  let Location4= Location3.length>1 ?  Location3.filter((lt,index)=>index>= (startIndex-1/size-1) && index<=endIndex+1/size):Location3
  let allOptions=this.makeAllOptions(Location1)
console.log("Location1",Location1);
console.log("Location2",Location2);
console.log("startIndex",startIndex);
console.log("endIndex",endIndex);
return (
<div className='container'>
    <div className='row'>
<div className='col-3'>
<OptionCB allOptions={allOptions} options={queryParams} onOptionChange={this.handleOptinChange} /> 
</div>
<div className='col-9'>


<div className='row'> 
<h4 className='text-center'>Welcome to Employee Portal</h4>
<h5>You have Chosen</h5>
<div>Location: {location ? location:"all"}<br />
Department: {queryParams.department ? queryParams.department:"all"}<br />
Designation:  {queryParams.designation ? queryParams.designation:"all"}</div><br />
<div className='row'> 
<h5>the number of employees matching the options:{Location3.length}</h5>
{Location4.map((n)=>(
    <div className='col-6 border'>
    <h4>{n.name}</h4>
    {n.email}<br />
    Mobile:{n.mobile}<br />
    Location:{n.location}<br />
    Department:{n.department}<br />
    Designation:{n.designation}<br />
    Salary:{n.salary}<br />
    </div>
))}
</div>

    <div className='row'>
  <div className='col-2'>{startIndex>0 ?  
   <button className='btn btn-primary btn-sm' onClick={()=>this.handlePage(-1)}>Previous</button> : ""  }
   </div>
  <div className='col-8'></div>
  <div className='col-2'>{endIndex<Location3.length-1 ? 
    <button className='btn btn-primary btn-sm' onClick={()=>this.handlePage(1)}> Next</button>: ""  }
    </div>
  
</div>
</div>
</div>
</div>
</div>
)
    }
}
export default Location5;