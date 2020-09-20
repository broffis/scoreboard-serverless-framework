import React from 'react';

import Backdrop from './Backdrop';

const Modal = (props) => {


  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className="modal"
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}>
        <div className="modal__header">
          <span className="modal__label">{props.header}</span>
          <span className="modal__close-button" onClick={props.modalClosed}><img src={`${window.location.origin}/icons/close.svg`} alt=""/></span>
        </div>
        <div className="modal__body">
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;