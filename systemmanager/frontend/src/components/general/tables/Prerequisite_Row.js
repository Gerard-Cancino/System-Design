import React, { PureComponent } from 'react';
import axios from 'axios';

class PrerequisiteRow extends PureComponent {
  state = {
    prerequisiteList:undefined
  }
  componentDidMount(){
    axios
    .get('/prerequisite-list.json',{
      params:{
        'course':this.props.courseID
      }
    })
    .then(res=>{
      this.setState({prerequisiteList:res.data.data})
    })
  }
  render(){
    return(
      this.state.prerequisiteList==undefined?(
        null
      ):(
        <tr>
          <td className="text-right">Prerequisites:</td>
          <td colspan="2">
            {this.state.prerequisiteList.map(el=>(
              el.prereq.id + " " 
            ))}
            </td>
        </tr>
      )
    );
  }
}

export default PrerequisiteRow;