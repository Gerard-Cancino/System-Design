import React, { PureComponent } from 'react';
import axios from 'axios';

import PrerequisiteRow from './Prerequisite_Row.js';

class CatalogTable extends PureComponent {
  state = {
    majorList:undefined,
    minorList:undefined
  }
  viewMajor(major){
    return(
      major==undefined?(
        <p></p>
      ):(
        <div>
          {major.type==undefined?(
            <h5 className="col-md-12 text-center">Minor in {major.name}</h5>
          ):(
            major.name=="General Elective"?(
              <h5 className="col-md-12 text-center">{major.name}</h5>
            ):(
              <h5 className="col-md-12 text-center">{major.type} in {major.name}</h5>
            )
          )}
          {major.requirement.length==0?(
            <p>Hey Dan or Haojun. There is no requirements for this class!  Please insert</p>
          ):(
            <table className="table table-striped">
              <thead style={{backgroundColor:"#696969", color:"white"}}>
                <tr>
                  <td>Course ID</td>
                  <td>Course Name</td>
                  <td>Course Description</td>
                </tr>
              </thead>
              <tbody>
                {/* Need to only show the requirements that are in catalog */}
                {major.requirement.map(el=>(
                  el.isInCatalog==false?(
                    null
                  ):(
                    <React.Fragment>
                      <tr style={{"borderTop":"none"}}>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                        <td>{el.description}</td>
                      </tr>
                      <PrerequisiteRow courseID={el.id} />

                    </React.Fragment>
                  )
                ))}
              </tbody>
            </table>
          )}
        </div>
      )
    )
  }
  componentDidMount(){
    axios
    .get('/major-list.json',{
      params:{
        'department':this.props.department.code
      }
    })
    .then(res=>{
      this.setState({majorList:res.data.data})
    })
    axios
    .get('/minor-list.json',{
      params:{
        'department':this.props.department.code
      }
    })
    .then(res=>{
      this.setState({minorList:res.data.data})
    })
  }
  render(){
    const {department} = this.props;
    return(
      <div className="col-md-12">
        <h3 className="col-md-12 text-center">{department.name}</h3>
        {this.state.majorList==undefined?(
          <p></p>
        ):(
          this.state.majorList.map(el=>(
            this.viewMajor(el)
          ))
        )}
        {this.state.minorList==undefined?(
          <p></p>
        ):(
          this.state.minorList.map(el=>(
            this.viewMajor(el)
          ))
        )}
      </div>
    );
  }
}

export default CatalogTable;