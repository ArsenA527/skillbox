export default function numberFormat(value) {
  if (typeof (+value) !== 'number') {
    return 0;
  }
  return new Intl.NumberFormat().format(value);
}
