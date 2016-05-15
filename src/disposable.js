export default (disposables, action = () => {}) => () => {
    action();
    disposables.forEach(dispose => {
        dispose();
    });
}