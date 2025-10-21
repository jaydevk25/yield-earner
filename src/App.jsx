import { useEffect, useState } from 'react';
import { fetchAPYs } from './api/defiLlama';
import { motion } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [pools, setPools] = useState([]);
  const [amount, setAmount] = useState(1000);
  const [timeframe, setTimeframe] = useState('week');
  const [theme, setTheme] = useState('dark');
  const [asset, setAsset] = useState('USDT'); // added asset selector

  useEffect(() => {
    fetchAPYs().then(setPools);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const calculateEarnings = (amount, apy) => {
    const rate = apy / 100;
    let weekly, monthly, yearly;

    yearly = amount * rate;
    monthly = yearly / 12;
    weekly = amount * (Math.pow(1 + rate / 52, 1) - 1);

    if (timeframe === 'week') return weekly.toFixed(2);
    if (timeframe === 'month') return monthly.toFixed(2);
    return yearly.toFixed(2);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white' : 'bg-gray-100 text-gray-900'} min-h-screen transition-colors duration-500`}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="max-w-6xl mx-auto py-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Yieldearner 💧
        </motion.h1>

        <div className="flex justify-center mb-6 gap-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2 w-48 text-center"
            placeholder="Enter amount"
          />

          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2"
          >
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
            <option value="ETH">ETH</option>
          </select>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2"
          >
            <option value="week">1 Week (Auto-compound)</option>
            <option value="month">1 Month</option>
            <option value="year">1 Year</option>
          </select>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {pools
            .filter(p => p.symbol === asset) // filter by selected asset
            .slice(0, 6)
            .map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-2">{p.project.toUpperCase()}</h2>
                <p className="text-sm opacity-80 mb-1">Chain: {p.chain}</p>
                <p className="text-sm opacity-80 mb-2">APY: {p.apy?.toFixed(2)}%</p>
                <p className="text-lg font-bold text-blue-400">
                  Est. Earn: ${calculateEarnings(amount, p.apy)}
                </p>
              </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}