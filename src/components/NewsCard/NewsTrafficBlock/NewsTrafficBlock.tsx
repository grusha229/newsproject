import { IData_TrafficItem } from '../../../models/data';
import styles from './NewsTrafficBlock.module.scss';
import { formatToPercent, getDisplayedTraffic } from './NewsTrafficBlock.utils';

export interface IProps {
    traffic: IData_TrafficItem[];
}

export default function NewsTrafficBlock({
    traffic
}: IProps) {

    const visibleTraffic = getDisplayedTraffic(traffic);

    return (
        <div className={styles['block']}>
                <span>Top Traffic: </span>
                <div className={styles['list']}>
                    {visibleTraffic.map((country) => (
                        <div>
                            <span className={styles['country']}>{country.value}: </span>
                            <span className={'bold'}>{formatToPercent(country.count)}</span>
                        </div>
                    ))}
                </div>
        </div>
    )
}
