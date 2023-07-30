import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';


export const Message = ({ variant, children, timeout }) => {
  // the alert is displayed by default
  const [alert, setAlert] = useState(true);
      
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    if(timeout){
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }, []);     

  if(!alert)
    return

  function getChilder(){
    if(Array.isArray(children)){
      return <ul>
        {children.map((child) => {
							return (
								<li style={{color: "brown"}}>{child}</li>
							);}
        )}
      </ul>
    }
    return children;
  }
    
  return (
    variant === 'danger' ?
        <div class="alert alert-danger d-flex align-items-center" role="alert">
           <span><Icon.ExclamationTriangleFill style={{marginRight: "1em"}} size="40" color='brown'/></span>
          <div style={{color: 'brown' }}>
            {getChilder()}
          </div>
        </div>
      : 
      (
        variant === 'success' ?
          <div class="alert alert-success d-flex align-items-center" role="alert">
           <span><Icon.CheckCircleFill style={{marginRight: "1em"}} size="40" color='green'/></span>
            <div style={{color: 'green' }}>
              {getChilder()}
            </div>
          </div>
        : ''
      )
  )
}

export const DangerMsg = ({children}) => {
  return <Message variant={'danger'} children={children} timeout={false}></Message>
}

export const DangerMsgTimeout = ({children}) => {
  return <Message variant={'danger'} children={children} timeout={true}></Message>
}

export const SuccessMsg = ({children}) => {
  return <Message variant={'success'} children={children} timeout={true}></Message>
}

// export default Message;