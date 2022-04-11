export class AverageCalculator {
  public static calculateAverage(
    length: number,
    average: number,
    newNumber: number
  ) {
    return (average * length + newNumber) / length;
  }
}
