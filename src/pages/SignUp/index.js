import AppBarr from './AppBar/AppBarr';
import Content from './Content';
import styles from './Signup.module.scss';

function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.appbar}>
        <AppBarr />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  );
}

export default SignUp;
