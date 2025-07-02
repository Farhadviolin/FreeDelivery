template RangeCheck() {
  signal input in;
  in --> lessThan(1000);
}
component main = RangeCheck();
