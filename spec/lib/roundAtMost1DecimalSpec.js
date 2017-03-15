const RoundAtMost1DecimalModule = require('./../../lib/roundAtMost1Decimal');

describe('RoundAtMost1DecimalModule', () => {
  it('#roundAtMost1Decimal should round a number to 1 decimal when many dicimals ', () =>{
    expect(RoundAtMost1DecimalModule.roundAtMost1Decimal(19.23412341)).toEqual('19.2');
  });

  it('#roundAtMost1Decimal should round a number to 0 dicimal when integer', () =>{
    expect(RoundAtMost1DecimalModule.roundAtMost1Decimal(19)).toEqual('19');
  });
});
