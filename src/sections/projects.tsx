import styles from "./projects.module.css"
import { FiGithub } from "react-icons/fi";
import GitHubStar from "../components/GitHubStar";
import clustergif from "../assets/media/cluster.gif";
import trianglegif from "../assets/media/triangle.gif";
import raytracinggif from "../assets/media/raytracing.gif";

export default function projects() {

    return (
        <section id="project">

            <div className={styles.rederer}>

                <div className={styles.projectoverview}>

                    <div className={styles.redererdsc}>
                        <h1>
                            Virtualized Geometry Renderer
                        </h1>
                        <p>
                            A custom Virtualized Geometry LOD Rendering Engine : cluster-based real-time mesh simplification and LOD streaming system inspired by UE5's Nanite. This engine dynamically switches between multiple Levels of Detail using a virtualized geometry hierarchy, supporting view-dependent streaming and cluster-based simplification.
                        </p>
                    </div>
                    <div className={styles.viewproj}>
                        <div>
                            <a href="https://github.com/Wbiu/Custom-Virtualized-Geometry-Renderer" type="button" className={styles.viewrenderer} > View Project in <FiGithub /></a>
                            <GitHubStar owner="wbiu" repo="Custom-Virtualized-Geometry-Renderer" />
                        </div>
                    </div>
                </div>

                <div className={styles.media}>
                    <div className={styles.mediacard} >
                        <div className={styles.mediacontainer}>
                            <img
                                className={styles.mediaItem}
                                src={clustergif}
                                data-media="cluster"
                                loading="lazy" />

                        </div>
                        <div className={styles.mediahero}>
                            <p>Clusters</p>
                        </div>
                    </div>

                    <div className={styles.mediacard} >
                        <div className={styles.mediacontainer}>
                            <img
                                className={styles.mediaItem}
                                src={trianglegif}
                                data-media="triangle"
                                loading="lazy" />
                        </div>
                        <div className={styles.mediahero}>
                            <p>Triangles</p>
                        </div>
                    </div>


                    <div className={styles.mediacard} >
                        <div className={styles.mediacontainer}>
                            <img
                                className={styles.mediaItem}
                                src={raytracinggif}
                                data-media="raytracing"
                                loading="lazy" />
                        </div>
                        <div className={styles.mediahero}>
                            <p>Ray Tracing</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.glove}>

                <div className={styles.projectoverview}>

                    <div className={styles.glovedsc}>
                        <h1>
                            VR Force Feedback Glove
                        </h1>
                        <p>
                            A Custom developed VR Force Feedback Glove, for Simulations • VR-Games • Training • Medical • Robotic • etc.
                        </p>
                    </div>
                    <div className={styles.viewproj}>
                        <a href="https://github.com/Wbiu/WVR-Glove-Wiki" type="button" className={styles.viewrenderer} > View Project in <FiGithub /></a>
                    </div>
                </div>

                <div className={styles.shortsRow}>
                    <div className={styles.short}>
                        <iframe
                            className={styles.ytEmbed}
                            src="https://www.youtube-nocookie.com/embed/g4SqNAd-m4E"
                            title="Project 02 demo (YouTube Short 1)"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                        </iframe>
                    </div>

                    <div className={styles.short}>
                        <iframe
                            className={styles.ytEmbed}
                            src="https://www.youtube-nocookie.com/embed/yh9J8AZn1ps"
                            title="Project 02 demo (YouTube Short 2)"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}