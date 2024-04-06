import AppBarr from 'component/AppBar';
import Content from './Content';
import styles from './Signup.module.scss';

function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.appbar}>
        <AppBarr name="Đăng ký" />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  );
}

export default SignUp;
