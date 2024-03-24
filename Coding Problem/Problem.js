function countOverlap(time_stamps) {
    // Sort the time stamps based on the starting time
    time_stamps.sort((a, b) => a[0] - b[0]);

    let overlapCount = 0;
    let prevEndTime = time_stamps[0][1];

    for (let i = 1; i < time_stamps.length; i++) {
        const startTime = time_stamps[i][0];
        const endTime = time_stamps[i][1];

        // Check for overlap with previous end time
        if (startTime < prevEndTime) {
            overlapCount++;
            // Update previous end time if necessary
            prevEndTime = Math.min(prevEndTime, endTime);
        } else {
            // No overlap, update previous end time
            prevEndTime = endTime;
        }
    }
    return overlapCount;
}

const time_stamps = [[900, 1230], [1000, 1200], [1400, 1800], [2000, 2100]];
const overlapCount = countOverlap(time_stamps);