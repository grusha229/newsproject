import React, { useState } from 'react';
import styles from './NewsCard.module.scss';
import { IData_SnippetNews } from './../../models/data';
import NewsTrafficBlock from './NewsTrafficBlock/NewsTrafficBlock';
import { formatCompactNumber } from './NewsTrafficBlock/NewsTrafficBlock.utils';
import NewsSentimentStatus from './NewsSentimentStatus/NewsSentimentStatus';
import NewsTagsBlock from './NewsTagsBlock/NewsTagsBlock';

interface Props {
  data: IData_SnippetNews;
}

const decodeKwMarkup = (html: string) => {
    const kwClass = styles['kw'];
    return html
      .replace(/&lt;kw&gt;/g, `<span class="${kwClass}">`)
      .replace(/&lt;\/kw&gt;/g, '</span>');
  };

export const NewsCard: React.FC<Props> = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

  const {
    TI, URL, DP, REACH, DOM, FAV, AU, CNTR, 
    TRAFFIC, HIGHLIGHTS, KW, SENT
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
        <div className={styles['card']}>
            <div className={styles['headerRow']}>
                <div className={styles['headerRow__stat']}>
                    <div className={styles['date']}>
                        <span className="bold">{formattedDay} </span>
                        <span>{formattedMonth}</span>
                    </div>
                    <div className={styles['reach']}>
                        <span className="bold">{formatCompactNumber(REACH)}</span> Reach
                    </div>
                    {TRAFFIC && TRAFFIC.length > 0 && (
                        <NewsTrafficBlock traffic={TRAFFIC} />
                    )}
                </div>
                <NewsSentimentStatus sentiment={SENT} />
            </div>

            <h2 className={styles['title']}>{TI}</h2>

            <div className={styles['meta']}>
                <div className={styles['meta__item']}> 
                    <img src={FAV} alt={DOM} className={styles['favicon']} />
                    <span className={styles['domain']}>{DOM}</span>
                </div>
                {CNTR &&
                    <div className={styles['meta__item']}>
                        <span className={styles['domain']} >🌍</span>
                        <span className={styles['domain']}>{CNTR}</span>
                    </div>
                }
                {AU.length > 0  &&
                    <div className={styles['meta__item']}>
                        <span className={styles['author']} >👤</span>
                        <span className={styles['author']}>{AU.join(', ')}</span>
                    </div>
                }
            </div>

            <div className={styles['content']}>
                <div
                    className={highlightsClassName}
                    dangerouslySetInnerHTML={{
                        __html: decodeKwMarkup(prettifiedHighlights)
                    }}
                />
                <button
                    className={styles['showMore']}
                    onClick={toggleExpand}
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            </div>

           <NewsTagsBlock key_words={KW} />

            <div className={styles['footer']}>
                <a href={URL} target='_blank' rel="noreferrer">
                    <button className={styles['sourceBtn']}>Original Source</button>
                </a>
            </div>
        </div>
    );
}