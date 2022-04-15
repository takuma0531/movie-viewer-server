export class AverageCalculator {
  public static calculateAverage(array: number[]) {
    return array.reduce((prev, curr) => prev + curr, 0) / array.length;
  }
}
