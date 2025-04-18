import { IData_TrafficItem } from "../../../models/data";

export const getDisplayedTraffic = (traffic: IData_TrafficItem[]) => {
    return traffic
        .sort((a, b) => a.count - b.count)
        .slice(0,3);
}

export const formatToPercent = (value: number, fractionDigits: number = 0): string => {
    return `${(value * 100).toFixed(fractionDigits)}%`;
};

export const formatCompactNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return value.toString();
};