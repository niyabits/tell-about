function parseISOString(s) {
  var b = s && s.split(/\D+/);

  if (!b) {
    return '';
  }

  const dateObj = new Date(
    Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
  );
  const newDate = dateObj.toDateString();
  return newDate;
}

module.exports = parseISOString;
