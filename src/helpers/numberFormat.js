export default function numberFormat(value) {
  if (typeof value !== 'number') {
    return new Intl.NumberFormat().format(0);
  }
  return new Intl.NumberFormat().format(value);
}
