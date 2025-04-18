import React, { useState } from 'react';
import styles from './NewsCard.module.scss';
import { IData_SnippetNews } from './../../models/data';

interface Props {
  data: IData_SnippetNews;
}

const sentimentLabels = {
  positive: 'Positive',
  negative: 'Negative',
  neutral: 'Neutral',
};

const decodeKwMarkup = (html: string) => {
    const kwClass = styles['kw'];
    return html
      .replace(/&lt;kw&gt;/g, `<span class="${kwClass}">`)
      .replace(/&lt;\/kw&gt;/g, '</span>');
  };

export const NewsCard: React.FC<Props> = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

  const {
    TI, URL, DP, REACH, DOM, FAV, AU, CNTR, TRAFFIC,
    AB, HIGHLIGHTS, KW, SENT
  } = data;

  const highlightsClassName = [
    styles['highlights'],
    isExpanded ? '' : styles['highlights--closed']
  ].join(' ');

  const formattedDay = new Date(DP).toLocaleDateString('en-GB', {
    day: '2-digit',
  });

  const formattedMonth = new Date(DP).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });

  const prettifiedHighlights = HIGHLIGHTS
    .map((el) => decodeKwMarkup(el))
    .join(';');

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    }

    return (
        <div className={styles.card}>
        <div className={styles.headerRow}>
            <span className={styles.date}>
                <span>{formattedDay}</span>
                <span>{formattedMonth}</span>
            </span>
            <span className={styles.reach}>{REACH.toString()} Reach</span>
        </div>

        <a href={URL} target="_blank" rel="noopener noreferrer" className={styles.title}>
            {TI}
        </a>

        <div className={styles.meta}>
            <img src={FAV} alt={DOM} className={styles.favicon} />
            <span className={styles.domain}>{DOM}</span>
            <span className={styles.country}>🌍 {CNTR}</span>
            <span className={styles.author}>👤 {AU.join(', ')}</span>
        </div>

        <div className={styles.content}>
            <div
                className={highlightsClassName}
                dangerouslySetInnerHTML={{
                    __html: decodeKwMarkup(prettifiedHighlights)
                }}
            />
            <button
                className={styles.showMore}
                onClick={toggleExpand}
            >
                {isExpanded ? 'Show less' : 'Show more'}
            </button>
        </div>

        <div className={styles.tags}>
            {KW.map((tag, i) => (
            <span key={i} className={styles.tag}>
                {tag.value} <span className={styles.count}>({tag.count})</span>
            </span>
            ))}
            {KW.length > 5 && (
            <button className={styles.showAll}>Show All +{KW.length - 5}</button>
            )}
        </div>

        <div className={styles.footer}>
            <button className={styles.sourceBtn}>Original Source</button>
            <span className={`${styles.sentiment} ${styles[SENT]}`}>
            {sentimentLabels[SENT]}
            </span>
        </div>
        </div>
    );
}