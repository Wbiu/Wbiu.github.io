import styles from "./footer.module.css";

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.outro}>
                <h2 className={styles.thanks}>Thanks for stopping by.</h2>

            </div>

            <div className={styles.glassBar}>
                <div className={styles.barContent}>
                    <span>© 2026 — Designed & Built by Sitthichai Wilet</span>
                </div>
            </div>
        </footer>
    );
}