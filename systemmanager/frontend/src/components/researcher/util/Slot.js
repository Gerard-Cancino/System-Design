import React, {PureComponent} from 'react';

export class ViewSlot extends PureComponent {
  render(){
    return(
      <div className="col-md-12">
      <h5 className="col-md-12 text-center">Slot </h5>
      {this.props.slotList!=undefined && this.props.slotList.length != 0?(
        <table className="table table-striped">
          <thead>
            <tr><td>Day</td><td>Time</td><td>Number of Course Sections</td></tr>
          </thead>
          <tbody>
            {Object.keys(this.props.slotList).map((key)=>(
              <tr key={this.props.slotList[key].slot.id}>
                <td>{this.props.slotList[key].slot.day.name}</td>
                <td>{this.props.slotList[key].slot.time.start} - {this.props.slotList[key].slot.time.end}</td>
                <td>{this.props.slotList[key].amount}</td>
              </tr>
            ))}

          </tbody>
        </table>
      ):(
        <p></p>
      )} 
    </div>
    )
  }
}