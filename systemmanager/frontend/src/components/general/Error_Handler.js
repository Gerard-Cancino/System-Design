import React,{PureComponent } from 'react';

let transition={
  opacity:'1',
  display:'block',
}
class ErrorHandler extends PureComponent{
  componentWillReceiveProps(props){
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    transition = {opacity:'1',display:'block'}
    if(transition.opacity==1){
      setTimeout(()=>{
        transition = {opacity:0.75}
        this.forceUpdate()
      },1000)
      setTimeout(()=>{
        transition = {opacity:0.5}
        this.forceUpdate()
      },5000)
      setTimeout(()=>{
        transition = {opacity:0,display:'none'}
        this.forceUpdate()
      },9000)
    }
  }
  render(){
    let {res} = this.props;
    return(
      res==undefined?(
        <span hidden></span>
      ):(
        res.data!= undefined?(
          res.data.data!=undefined?(
            <div style={transition} className="row alert alert-success alert-dismissible show mb-0" role="alert">
              {res.data.message}
            </div>
          ):(
            <div style={transition} className="row alert alert-success alert-dismissible show mb-0" role="alert">
              {res.data.message}
            </div>
          )
        ):(
          400 <= parseInt(res.response.status) && parseInt(res.response.status) <= 452?(
            res.response.data.non_field_errors!=undefined && res.response.data.non_field_errors.length != 0?(
              <div style={transition} className="row alert alert-danger alert-dismissible show mb-0" role="alert">
                {res.response.data.non_field_errors[0]}
              </div>
            ):(
              <div style={transition} className="row alert alert-danger alert-dismissible show mb-0" role="alert">
                {res.response.data.message}
              </div>
            )
          ):(
            <div style={transition} className="row alert alert-danger alert-dismissible show mb-0" role="alert">
              <p className="mb-0"><strong>Critical Error! </strong> Please Contact the admin</p>
            </div>
          )
        )
      )
    )
  }
}

export default ErrorHandler;