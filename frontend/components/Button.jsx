function Button(props) {
  // Extract additional class names from props
  const classNames = [];

  if (props.className) {
    classNames.push(props.className);
  }

  // Join the class names into a single string
  const className = classNames.join(' ');

  return (
    <span className={className} title={props.title} onClick={props.onClick} onMouseLeave={props.onMouseLeave}>
      {props.children}
    </span>
  );
}

export default Button;
