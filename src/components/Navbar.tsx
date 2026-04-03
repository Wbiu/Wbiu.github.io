import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.nav}>
                <nav className={styles.bar}>
                    <li><span className={styles.author}>Sitthichai Wilet</span></li>
                    <li><a href="#main" className={styles.section}>About</a></li>
                    <li><a href="#project" className={styles.section}>Project</a></li>
                    <li><a href="#skills" className={styles.section}>Skills</a></li>
                    <li><a href="#contact" className={styles.section}>Contact</a></li>
                </nav>
        </div>

    );
}