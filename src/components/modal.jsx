const Modal = ({ children, contentStyle }) => {
  return (
    <div className="modal">
      <div className="modal__content" style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
