import dayjs from 'dayjs';

import durations from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(utc);
dayjs.extend(durations);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export default dayjs;

export const timeDifference = () => {
    return new Date().getTimezoneOffset();
};
