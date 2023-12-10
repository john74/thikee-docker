import Svg from '../Svg';


function DefaultEngine(props) {
    const styles = props.styles;
    const defaultEngine = props.defaultEngine;

    return (
        <>
        <div className={styles.defaultEngine}>
            <p key={`${defaultEngine.name}${defaultEngine.id}`}>{defaultEngine.name}</p>
            <Svg content={<><path d="m6 9 6 6 6-6"/></>}/>
        </div>
        </>
    );
  }

export default DefaultEngine;