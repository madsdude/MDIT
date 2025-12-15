/* Dashboard Widget Animation */
(() => {
  const timeEl = document.getElementById('dashboard-time');
  const graphEl = document.getElementById('live-graph');
  const logsEl = document.getElementById('live-logs');

  if (!timeEl || !graphEl || !logsEl) return;

  // Initialize Graph Bars
  const barCount = 30;
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'graph-bar';
    bar.style.height = `${Math.random() * 80 + 10}%`;
    graphEl.appendChild(bar);
  }

  // Update Time
  setInterval(() => {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('da-DK', { hour12: false });
  }, 1000);

  // Animate Graph
  setInterval(() => {
    const bars = graphEl.children;
    // Shift values logic or random update
    // Let's do random update for "Active" feel
    const randomIdx = Math.floor(Math.random() * barCount);
    const bar = bars[randomIdx];
    const newHeight = Math.random() * 80 + 10;
    bar.style.height = `${newHeight}%`;

    // Highlight spike
    if (newHeight > 70) {
      bar.classList.add('active');
      setTimeout(() => bar.classList.remove('active'), 600);
    }
  }, 100);

  // Mock Logs
  const logMessages = [
    { type: 'log-info', text: 'Packets processed: 14.2M' },
    { type: 'log-success', text: 'Auto-scaling trigger: +2 Nodes' },
    { type: 'log-info', text: 'Latency check: 12ms (Optimal)' },
    { type: 'log-warn', text: 'Unusual traffic detected: Port 443' },
    { type: 'log-success', text: 'Threat blocked: IP 192.168.x.x' },
    { type: 'log-info', text: 'Backup verification running...' },
    { type: 'log-success', text: 'Firmware update scheduled' }
  ];

  const addLog = () => {
    const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
    const li = document.createElement('li');
    const now = new Date().toLocaleTimeString('da-DK', { hour12: false });

    li.innerHTML = `<span class="log-time">${now}</span> <span class="${msg.type}">${msg.text}</span>`;
    logsEl.insertBefore(li, logsEl.firstChild);

    // Keep only 4 logs
    if (logsEl.children.length > 4) {
      logsEl.lastChild.remove();
    }
  };

  // Add random log every 2-5 seconds
  const scheduleLog = () => {
    const delay = Math.random() * 3000 + 2000;
    setTimeout(() => {
      addLog();
      scheduleLog();
    }, delay);
  };

  scheduleLog();
})();
