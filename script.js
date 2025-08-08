document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.menu-link');
    const contents = document.querySelectorAll('.feature-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => {
                t.classList.remove('bg-indigo-600', 'text-white', 'font-medium');
                t.classList.add('text-slate-300', 'hover:bg-slate-700', 'hover:text-white');
            });
            contents.forEach(c => c.classList.add('hidden'));

            // Add active class to the clicked tab and corresponding content
            const targetId = e.currentTarget.id.replace('tab-', '');
            e.currentTarget.classList.add('bg-indigo-600', 'text-white', 'font-medium');
            e.currentTarget.classList.remove('text-slate-300', 'hover:bg-slate-700', 'hover:text-white');
            document.getElementById('content-' + targetId).classList.remove('hidden');
        });
    });

    // --- Mock API Simulation for Live Data ---
    const stocks = ['RELIANCE', 'HDFCBANK', 'INFY', 'TCS', 'BAJFINANCE', 'ICICIBANK', 'HCLTECH', 'LT', 'ASIANPAINT'];
    const niftyData = [];
    const sectorData = [
        { sector: 'IT', value: 1.2 },
        { sector: 'Financials', value: -0.5 },
        { sector: 'FMCG', value: 0.8 },
        { sector: 'Pharma', value: 2.1 },
        { sector: 'Energy', value: -1.3 },
    ];
    const tradingSignals = [];
    const MAX_SIGNALS = 10;

    function getRandomValue(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }

    // New function to simulate fetching live data from a real API
    async function fetchLiveData() {
        const apiKey = "YOUREHWH70HNB2HB7YJI"; // Replace with your actual API key
        const niftyApiUrl = `https://api.example.com/live/nifty?apikey=${apiKey}`;
        const sectorApiUrl = `https://api.example.com/live/sectors?apikey=${apiKey}`;

        try {
            // Fetch Nifty data
            const niftyResponse = await fetch(niftyApiUrl);
            const niftyResult = await niftyResponse.json();
            // Assuming the API returns a number
            const niftyValue = niftyResult.value;
            niftyData.push(niftyValue.toFixed(2));
            if (niftyData.length > 50) niftyData.shift();

            // Fetch Sector data
            const sectorResponse = await fetch(sectorApiUrl);
            const sectorResult = await sectorResponse.json();
            // Assuming the API returns an array of sector objects
            sectorResult.sectors.forEach(s => {
                const existingSector = sectorData.find(e => e.sector === s.name);
                if (existingSector) {
                    existingSector.value = s.value;
                }
            });

            // Update charts after fetching
            updateCharts();
        } catch (error) {
            console.error("Error fetching live data:", error);
            // Fallback to mock data if API call fails
            generateMockData();
            updateCharts();
        }
    }

    function generateMockData() {
        // Nifty data simulation
        const lastValue = niftyData.length > 0 ? niftyData[niftyData.length - 1] : 17000;
        const newValue = parseFloat(lastValue) + parseFloat(getRandomValue(-50, 50));
        niftyData.push(newValue.toFixed(2));
        if (niftyData.length > 50) niftyData.shift();

        // Sector data simulation
        sectorData.forEach(s => {
            s.value = parseFloat(s.value) + parseFloat(getRandomValue(-0.2, 0.2));
            s.value = s.value > 5 ? 5 : s.value < -5 ? -5 : s.value;
            s.value = parseFloat(s.value.toFixed(2));
        });
    }

    function generateTradingSignal() {
        const stock = stocks[Math.floor(Math.random() * stocks.length)];
        const action = Math.random() > 0.5 ? 'BUY' : 'SELL';
        const price = (Math.random() * 1000 + 1000).toFixed(2);
        const timestamp = new Date().toLocaleTimeString();

        const newSignal = { symbol: stock, action, price, timestamp };
        tradingSignals.unshift(newSignal);

        if (tradingSignals.length > MAX_SIGNALS) {
            tradingSignals.pop();
        }

        showNotification(`${action} signal for ${stock} at ₹${price}`, action.toLowerCase());
        updateSignalTable();
    }

    function showNotification(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        let icon = '';
        
        if (type === 'buy') {
            icon = 'fa-solid fa-arrow-up text-green-500';
            toast.classList.add('success');
        } else if (type === 'sell') {
            icon = 'fa-solid fa-arrow-down text-red-500';
            toast.classList.add('danger');
        } else {
            icon = 'fa-solid fa-bell text-blue-500';
            toast.classList.add('warning');
        }

        toast.classList.add('toast', 'transform', 'transition-transform', 'duration-500', 'ease-in-out', 'translate-x-full');
        
        toast.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="${icon}"></i>
                <div class="flex-1">
                    <p class="font-semibold">${type.charAt(0).toUpperCase() + type.slice(1)} Signal</p>
                    <p class="text-xs text-slate-400">${message}</p>
                </div>
            </div>
            <button class="ml-auto text-slate-400 hover:text-white" onclick="this.parentElement.remove()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Show the toast with a slight delay for the animation
        setTimeout(() => toast.classList.remove('translate-x-full'), 100);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    // Chart rendering functions
    let niftyChart, sectorChart;

    function renderCharts() {
        const niftyCtx = document.getElementById('niftyChart').getContext('2d');
        niftyChart = new Chart(niftyCtx, {
            type: 'line',
            data: {
                labels: Array(50).fill(''),
                datasets: [{
                    label: 'NIFTY 50 Index',
                    data: niftyData,
                    borderColor: '#4a6cf7',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(74, 108, 247, 0.2)',
                    pointRadius: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        display: false,
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                            color: '#94a3b8',
                        }
                    }
                }
            }
        });

        const sectorCtx = document.getElementById('sectorChart').getContext('2d');
        sectorChart = new Chart(sectorCtx, {
            type: 'bar',
            data: {
                labels: sectorData.map(s => s.sector),
                datasets: [{
                    label: '% Change',
                    data: sectorData.map(s => s.value),
                    backgroundColor: sectorData.map(s => s.value >= 0 ? '#10b981' : '#ef4444'),
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#94a3b8' }
                    }
                }
            }
        });
    }

    function updateCharts() {
        if (niftyChart) {
            niftyChart.data.datasets[0].data = niftyData;
            niftyChart.update();
        }
        if (sectorChart) {
            sectorChart.data.labels = sectorData.map(s => s.sector);
            sectorChart.data.datasets[0].data = sectorData.map(s => s.value);
            sectorChart.data.datasets[0].backgroundColor = sectorData.map(s => s.value >= 0 ? '#10b981' : '#ef4444');
            sectorChart.update();
        }
    }

    function updateSignalTable() {
        const tableBody = document.getElementById('signal-table-body');
        tableBody.innerHTML = ''; // Clear table

        tradingSignals.forEach(signal => {
            const row = document.createElement('tr');
            const colorClass = signal.action === 'BUY' ? 'text-green-500' : 'text-red-500';
            const iconClass = signal.action === 'BUY' ? 'fa-arrow-up' : 'fa-arrow-down';
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">${signal.symbol}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${colorClass}">
                    <i class="fa-solid ${iconClass} mr-2"></i>
                    ${signal.action}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">₹${signal.price}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-400">${signal.timestamp}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Initial rendering
    renderCharts();
    generateTradingSignal(); // Generate first signal on load

    // Update data every 5 seconds
    setInterval(() => {
        // You would uncomment this line and comment out generateMockData()
        // fetchLiveData();
        generateMockData();
    }, 5000);

    // Generate a new signal every 15 seconds
    setInterval(() => {
        generateTradingSignal();
    }, 15000);
});
