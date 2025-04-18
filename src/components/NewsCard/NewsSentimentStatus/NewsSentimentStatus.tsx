import { TData_SentType } from '../../../models/data';
import styles from './NewsSentimentStatus.module.scss';

const sentimentLabels = {
    positive: 'Positive',
    negative: 'Negative',
    neutral: 'Neutral',
};

export interface IProps {
    sentiment: TData_SentType
}

export default function NewsSentimentStatus({ sentiment }: IProps) {
    const sentimentClassName = [
        styles['sentiment'],
        styles[`sentiment--${sentiment}`],
    ].join(' ');

    return (
            <span className={sentimentClassName}>
                {sentimentLabels[sentiment]}
            </span>
    )
}
