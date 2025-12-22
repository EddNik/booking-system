import css from "./Footer.module.css";

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>{new Date().getFullYear()} All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Eduard Vyskrebtsov</p>
          <p>
            Contact us:
            <a href="mailto:evyskrebtsov@gmail.com">evyskrebtsov@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
