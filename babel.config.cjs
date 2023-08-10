module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets:
                {
                    esmodules: true,
                    jest: true
                }
            }
        ],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic'
            }
        ],
    ],
};