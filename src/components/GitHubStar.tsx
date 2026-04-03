import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import styles from './GitHubStar.module.css';

interface Repo{
    owner: string;
    repo: string;
}

export default function GitHubStar({ owner, repo } : Repo) {

  const [stars, setStars] = useState(null);

  useEffect(() => {
    // Fetch data from GitHub's Public API
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((response) => response.json())
      .then((data) => {
        setStars(data.stargazers_count);
      })
      .catch((err) => console.error("Error fetching stars:", err));
  }, [owner, repo]);

  return (
    <a 
      href={`https://github.com/${owner}/${repo}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.starLink}
    >
      <div className={styles.starButton}>
        <FiStar className={styles.icon} />
        <span>Star</span>
        {stars !== null && <span className={styles.count}>{stars}</span>}
      </div>
    </a>
  );
}