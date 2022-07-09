export default function random() {
    return (Math.random() + 1).toString(36).substring(3);
}