export default function devlog (...args) {
  if (process.env.NODE_ENV === 'devlopment') {
    devlog(...args);
  }
}
