import Form from './form/Form';
import styles from './Content.module.scss';

function Content() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Form />
      </div>
    </div>
  );
}

export default Content;
