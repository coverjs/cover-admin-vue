export function waittingFor(conditions: () => boolean, callbackfn: (...args: any[]) => void, timeout: number = 100) {
  const interval = setInterval(() => {
    if (conditions()) {
      callbackfn()
      clearInterval(interval)
    }
  }, timeout)
}
