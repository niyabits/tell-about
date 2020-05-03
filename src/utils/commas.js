function numberWithCommas(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = numberWithCommas;
