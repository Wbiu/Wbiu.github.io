import styles from "./mainpage.module.css"
import BorderGlow from "../components/BorderGlow";
import { IoIosSend } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import imgPfp from '../assets/media/pfp.png';


export default function Mainpage() {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="main" className={styles.main}>
            <div className={styles.intro}>
                <div className={styles.greet}>
                    <p className={styles.hero_text}>
                        Hi,<br />
                        I'm Sitthichai Wilet
                    </p>
                    <p className={styles.sub_text}>
                        A software developer driven by curiosity and continuous learning,<br /> striving to make today's and tomorrow's technologies better.
                    </p>

                    <div className={styles.subbuttons} >
                        <button type="button" onClick={() => scrollToSection("project")} className={styles.subbutton}>View My Works <FaCode className={styles.icon} /></button>
                        <button type="button" onClick={() => scrollToSection("contact")} className={styles.subbutton}>Get In Touch <IoIosSend className={styles.icon} /> </button>
                    </div>
                    <div className={styles.subinfos}>
                        <div className={styles.subinfo}>
                            <h1>
                                Bachelor's
                            </h1>
                            <p>
                                Frist Class Degree
                            </p>
                        </div>
                        <div className={styles.subinfo}>
                            <h1>
                                Master's
                            </h1>
                            <p>
                                Distinction Degree
                            </p>
                        </div>
                        <div className={styles.subinfo}>
                            <h1>
                                10+
                            </h1>
                            <p>

                                Projects Completed
                            </p>
                        </div>

                    </div>
                </div>

                <div className={styles.profileCard}>
                    <img className={styles.profilePic} src={imgPfp} alt="Sitthichai Wilet" loading="lazy" />
                    <div>
                        <h1 className={styles.heading}>
                            About me
                        </h1>
                        <p className={styles.profileCardText}>
                            I'm a passionate Software Developer with a Master's degree experienced in developing Application, Rendering Engine,
                            Embedded System, Front and Backend. I love new challenges and turn complex problems into simple, beautyful and
                            intiotive solutions
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}