function Svg(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={props.class} onClick={props.onClick} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {props.content}
        </svg>
    )
}

export default Svg