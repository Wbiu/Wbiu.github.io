import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
            <div className={styles.nav}>
                <nav className={styles.bar}>
                    <span className={styles.author}>Sitthichai Wilet</span>
                    <a href="#main" className={styles.section}>About</a>
                    <a href="#project" className={styles.section}>Project</a>
                    <a href="#skills" className={styles.section}>Skills</a>
                    <a href="#contact" className={styles.section}>Contact</a>
                </nav>
            </div>
    );
}