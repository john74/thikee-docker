function EmptyGroups(props) {
    const styles = props.styles;

    return (
        <>
        <p className={styles.message}>
            No bookmark categories found. Click on the <span>menu</span> to add one.
        </p>
        </>
    );
  }

  export default EmptyGroups;