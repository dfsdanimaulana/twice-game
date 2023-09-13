/* eslint-disable no-undef */
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'eslint-config-prettier',
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: {
        react: { version: '18.2' },
        'import/resolver': {
            alias: {
                map: [
                    ['@assets', './src/assets'],
                    ['@components', './src/components'],
                    ['@config', './src/config'],
                    ['@data', './src/data'],
                    ['@pages', './src/pages'],
                    ['@utils', './src/utils'],
                    ['@hooks', './src/hooks']
                ],
                extensions: ['.js', '.jsx', '.json'],
            },
        },
    },
    plugins: ['react-refresh', 'import'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    ['parent', 'sibling', 'index'],
                ],
                alphabetize: {
                    order: 'asc',
                },
            },
        ],
        'import/no-unresolved': 'error',
    },
}
