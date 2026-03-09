export class Utils {
  public static async setTimeoutAsync(delayInMs: number): Promise<void> {
    return new Promise<void>((res, rej) => {
      try {
        setTimeout(() => {
          res();
        }, delayInMs);
      } catch (err) {
        rej();
      }
    });
  }
}
