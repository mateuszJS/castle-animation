export default (time, endTime, element) => {
    const precent = 1 - (endTime - time) / endTime;
    element.alpha -= 0.05 * precent;
    element.y -= 5 * precent;
}