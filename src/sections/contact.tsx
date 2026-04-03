import styles from "./contact.module.css"
import { FiMail, FiGithub, FiLinkedin, FiYoutube } from "react-icons/fi";
import BorderGlow from "../components/BorderGlow";


export default function Contact() {
    return (
        <section id="contact" className={styles.contactSection}>

            <div className={styles.contactcard}>

                <div className={styles.titlecard}>

                    <h1 className={styles.title}>Let's Connect</h1>

                        <BorderGlow
                            backgroundColor="transparent"
                            edgeSensitivity={20}
                            glowColor="210 80 80"
                            borderRadius={30}
                            glowRadius={20}
                            glowIntensity={1.5}
                            fillOpacity={0}
                            coneSpread={1}
                            colors={['#8000ff', '#ff00ea', '#00ddff']}
                            className={styles.sociabox}>
                            <a href="mailto:biu1999@email.com" className={styles.sociallink}>
                                <FiMail className={styles.icon} />
                                <span className={styles.socialFont}>Email</span>
                            </a>
                        </BorderGlow>


                        <BorderGlow
                            backgroundColor="transparent"
                            edgeSensitivity={20}
                            glowColor="210 80 80"
                            borderRadius={30}
                            glowRadius={20}
                            glowIntensity={1.5}
                            fillOpacity={0}
                            coneSpread={1}
                            colors={['#8000ff', '#ff00ea', '#00ddff']}
                            className={styles.sociabox}>
                            <a href="https://github.com/Wbiu" className={styles.sociallink}>
                                <FiGithub className={styles.icon} />
                                <span className={styles.socialFont}>GitHub</span>
                            </a>
                        </BorderGlow>
                        <BorderGlow
                            backgroundColor="transparent"
                            edgeSensitivity={20}
                            glowColor="210 80 80"
                            borderRadius={30}
                            glowRadius={20}
                            glowIntensity={1.5}
                            fillOpacity={0}
                            coneSpread={1}
                            colors={['#8000ff', '#ff00ea', '#00ddff']}
                            className={styles.sociabox}>
                            <a href="https://linkedin.com/in/sitthichai-wilet-a3b541394" className={styles.sociallink}>
                                <FiLinkedin className={styles.icon} />
                                <span className={styles.socialFont}>LinkedIn</span>
                            </a>
                        </BorderGlow>
                        <BorderGlow
                            backgroundColor="transparent"
                            edgeSensitivity={20}
                            glowColor="210 80 80"
                            borderRadius={30}
                            glowRadius={20}
                            glowIntensity={1.5}
                            fillOpacity={0}
                            coneSpread={1}
                            colors={['#8000ff', '#ff00ea', '#00ddff']}
                            className={styles.sociabox}>
                            <a href="https://www.youtube.com/@superanimeotaku7238" className={styles.sociallink}>
                                <FiYoutube className={styles.icon} />
                                <span className={styles.socialFont}>YouTube</span>
                            </a>
                        </BorderGlow>
                </div>
            </div>
        </section >
    );
}