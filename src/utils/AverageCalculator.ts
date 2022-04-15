export class AverageCalculator {
  public static calculateAverage(array: number[]) {
    if (array.length == 1) return array[0];
    return array.reduce((prev, curr) => prev + curr, 0) / array.length;
  }
}
