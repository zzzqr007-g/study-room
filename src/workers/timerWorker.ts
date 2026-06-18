let intervalId: ReturnType<typeof setInterval> | null = null;

self.onmessage = (e: MessageEvent) => {
  const { type } = e.data;

  if (type === 'start') {
    const startTime = Date.now();
    // Clear any existing interval
    if (intervalId !== null) clearInterval(intervalId);

    intervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      self.postMessage({ type: 'tick', elapsed });
    }, 250); // Tick every 250ms for smooth updates
  }

  if (type === 'stop') {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};
