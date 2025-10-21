export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:scale-105 transition-transform"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
