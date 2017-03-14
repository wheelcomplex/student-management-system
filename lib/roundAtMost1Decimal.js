function roundAtMost1Decimal(number){
  return (Math.round(number * 10) / 10).toString();
}

module.exports.roundAtMost1Decimal = roundAtMost1Decimal;