import Svg from '../Svg';


function CategoryHead(props) {
    const {
        toggleMenu,
    } = props.toggleMenuHook;

    const styles = props.styles;
    const category = props.category;

    return (
        <div className={styles.head} >
            <h1 className={styles.title} style={{ backgroundColor: category.color }}>{category.name}</h1>
            <span className={styles.menuToggler} onClick={(event) => toggleMenu(event, category.id)}>
                <Svg content={<><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></>}/>
            </span>
        </div>
    );
  }

export default CategoryHead;