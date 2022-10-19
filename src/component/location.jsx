import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";
import {Link} from "react-router-dom"
import queryString from "query-string"
import OptionCB from './optionCB';
class Location extends Component {
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
 handleOptinChange=(options)=>{
    this.callUrl("/emps/1",options)
   }
   callUrl=(url,options)=>{
    let searchStr=this.makeSearchString(options);
    this.props.history.push({
      pathname:url,
      search:searchStr,
  })
   }
   makeSearchString=(options)=>{
      let {department,designation}=options
      let searchStr="";
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

let a=location;
  let Location2=location ?  Location1.filter(lect=>lect.location===location) : Location1;
  console.log(Location2);
  const queryParams=queryString.parse(this.props.location.search)
  const {page="1"}=queryParams
  let searchString=this.makeSearchString(queryParams)
  
  let Location3=this.filterParams(Location1,queryParams) 
  let pageNum=+page;
  let size=2;
  console.log("pageno=",pageNum);
  let startIndex=(pageNum-1)*size;
  let endIndex=Location2.length> (startIndex+size-1) ? startIndex+size-1 : Location2.length-1
  let Location4= Location3.length>3 ?  Location2.filter((lt,index)=>index>= startIndex && index<=endIndex):Location3
  let allOptions=this.makeAllOptions(Location1)
return (
<div className='container'>
    <div className='row'>
<div className='col-3'>
<OptionCB allOptions={allOptions} options={queryParams} onOptionChange={this.handleOptinChange} /> 
</div>
<div className='col-9'>
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
 
  <div className='col-2'>{startIndex>0 ? <Link to={ `/emps/${location}/${pageNum-1}?${searchString}`}>   <button className='btn btn-primary btn-sm'>Previous</button></Link> : ""  }</div>
  <div className='col-8'></div>
  <div className='col-2'>{endIndex<Location2.length-1 ? <Link  to={ `/emps/${location}/${pageNum+1 }?${searchString}`}>   <button className='btn btn-primary btn-sm'> Next</button></Link> : ""  }</div>
</div>
</div>
</div>
</div>
)
    }
}
export default Location;