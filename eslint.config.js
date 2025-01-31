module.exports = [
    {
        languageOptions: {
            ecmaVersion: 12,
            globals: {
                window: 'readonly',
                document: 'readonly',
            },
        },
        files: ["dist/**/*.js"], // Применяется только к JavaScript файлам
    }
];