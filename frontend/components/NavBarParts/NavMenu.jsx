import {
    Button, Svg,
} from '@components';

import {
    User,
} from ".";


function NavMenu(props) {

    const styles = props.styles;

    return (
        <>
        <div className={styles.menu}>
            <User styles={styles} {...props} />
            <Button className={styles.themeButton} title="Toggle theme">
                <Svg content={<><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></>}/>
            </Button>
        </div>
        </>
    )
}

export default NavMenu