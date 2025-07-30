import { useEffect, useState } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const isDark = saved === 'dark' || (!saved && (prefersDark || true));

        setTheme(isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDark);
    }, [])

    function toggleTheme() {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    }

    return <Component {...pageProps} theme={theme} toggleTheme={toggleTheme} />
}
