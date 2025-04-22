import { useState } from 'react';
import { IData_TagItem } from '../../../models/data';
import styles from './NewsTagsBlock.module.scss';

const TAGS_MAX_COUNT = 5;

export interface IProps {
    key_words: IData_TagItem[],
}

export default function NewsTagsBlock({ key_words } :IProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const slicedKeyWords = isExpanded
        ? key_words
        : key_words.slice(0, TAGS_MAX_COUNT)

    return (
        <div className={styles['tags']}>
            {slicedKeyWords.map((tag) => (
                <div key={tag.value} className={styles['tag']}>
                    <span>{tag.value} </span>
                    <span className={styles['count']}>({tag.count})</span>
                </div>
            ))}
            {(key_words.length > TAGS_MAX_COUNT && !isExpanded) && (
                <button
                    className={styles['showAll']}
                    onClick={() => setIsExpanded(true)}
                >
                    Show All +{key_words.length - TAGS_MAX_COUNT}
                </button>
            )}
        </div>
    )
}
