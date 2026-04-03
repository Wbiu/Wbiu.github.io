import styles from "./skills.module.css"
import BorderGlow from "../components/BorderGlow";

export default function skill() {

    return (
        <section id="skills" className={styles.sectionskill}>
            <BorderGlow
                backgroundColor="transparent"
                edgeSensitivity={20}
                glowColor="210 80 80"
                borderRadius={30}
                glowRadius={20}
                glowIntensity={1.5}
                fillOpacity={0}
                coneSpread = {1}
                colors={['#8000ff', '#ff00ea', '#00ddff']}>

                <div className={styles.skillcard}>
                    <div>
                        <h1 className={styles.skillhero}>Techinical Skills</h1>
                    </div>
                    <ul className={styles.skilllist}>
                        <li className={styles.skillitem}>C++</li>
                        <li className={styles.skillitem}>C#</li>
                        <li className={styles.skillitem}>Java</li>
                        <li className={styles.skillitem}>Python</li>
                        <li className={styles.skillitem}>SQL</li>
                        <li className={styles.skillitem}>JavaScript</li>
                        <li className={styles.skillitem}>TypeScript</li>
                        <li className={styles.skillitem}>HTML</li>
                        <li className={styles.skillitem}>CSS</li>
                        <li className={styles.skillitem}>Vulkan</li>
                        <li className={styles.skillitem}>OpenGL</li>
                        <li className={styles.skillitem}>GLSL</li>
                        <li className={styles.skillitem}>CUDA</li>
                        <li className={styles.skillitem}>Ray Tracing</li>
                        <li className={styles.skillitem}>Embedded Systems</li>
                        <li className={styles.skillitem}>ESP-32</li>
                        <li className={styles.skillitem}>STM-32</li>
                        <li className={styles.skillitem}>CAD</li>
                        <li className={styles.skillitem}>Blender</li>
                        <li className={styles.skillitem}>Cisco</li>
                        <li className={styles.skillitem}>Windows</li>
                        <li className={styles.skillitem}>Linux</li>
                        <li className={styles.skillitem}>RTOS</li>
                        <li className={styles.skillitem}>Unreal Engine 5</li>
                    </ul>
                </div>

            </BorderGlow>

        </section>
    );
}


