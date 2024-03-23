import Content from 'pages/SignIn/Content/Content';
import AppBarr from 'pages/SignIn/AppBar/AppBar';
import styles from './SignIn.module.scss';

function SignIn() {
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

export default SignIn;
