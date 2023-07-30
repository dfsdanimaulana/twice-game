/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true
        },

        extend: {
            colors: {
                'semi-transparent': 'rgba(255,255,255,.2)',
                primary: '#ff5fa2',
                secondary: '#fe97a4',
                dark: '#040407',
                brown: '#503d3f',
                navy: '#231857',
                rose: '#864136',
                gray: '#7e9081',
                'dark-blue': '#5044a0',
                light: '#f1f5f9',
                tw: {
                    1: '#fccfa6',
                    2: '#fdb3a5',
                    3: '#fe97a4',
                    4: '#fe7ba3',
                    5: '#ff5fa2'
                },
                ny: '#49c0ec',
                jy: '#a3cc54',
                mm: '#e67ea3',
                sn: '#8c79b4',
                jh: '#f9cc85',
                mn: '#71c7d4',
                dh: '#fefefe',
                cy: '#e62722',
                ty: '#2253a3'
            }
        },
        fontFamily: {
            bn: ['Bebas Neue', 'sans-serif']
        }
    },
    plugins: [],
    darkMode: 'class'
}
