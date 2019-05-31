import React,{PureComponent } from 'react';

class ErrorHandler extends PureComponent{
  render(){
    const {res} = this.props;
    return(
      res==undefined?(
        <span hidden></span>
      ):(
        res.data!= undefined?(
          res.data.data!=undefined?(
            <div className="row alert alert-success alert-dismissible fade show mb-0" role="alert">
              {res.data.message}
            </div>
          ):(
            <div className="row alert alert-success alert-dismissible fade show mb-0" role="alert">
              {res.data.message}
            </div>
          )
        ):(
          400 <= parseInt(res.response.status) && parseInt(res.response.status) <= 452?(
            res.response.data.non_field_errors!=undefined && res.response.data.non_field_errors.length != 0?(
              <div className="row alert alert-danger alert-dismissible fade show mb-0" role="alert">
                {res.response.data.non_field_errors[0]}
              </div>
            ):(
              <div className="row alert alert-danger alert-dismissible fade show mb-0" role="alert">
                {res.response.data.message}
              </div>
            )
          ):(
            <div className="row alert alert-danger alert-dismissible fade show mb-0" role="alert">
              <p className="mb-0"><strong>Critical Error! </strong> Please Contact the admin</p>
            </div>
          )
        )
      )
    )
  }
}

export default ErrorHandler;