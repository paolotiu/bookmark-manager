const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    future: {
        webpack5: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
        });

        return config;
    },
    // typescript: {
    //     // !! WARN !!
    //     // Dangerously allow production builds to successfully complete even if
    //     // your project has type errors.
    //     // !! WARN !!
    //     ignoreBuildErrors: true,
    // },
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/home/all',
                permanent: true,
            },
        ];
    },
});
