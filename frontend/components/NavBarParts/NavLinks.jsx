import Link from 'next/link';


function NavLinks(props) {

    const styles = props.styles;

    return (
        <>
        <div className={styles.links}>
            <Link className={styles.link} href="#">Home</Link>
        </div>
        </>
    )
}

export default NavLinks