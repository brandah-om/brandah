// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['brandah.inote-tech.com'],
//     },
// };

// module.exports = nextConfig;


const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true, // تأكد أن appDir مفعّل
    },
    images: {
        domains: ['brandah.inote-tech.com'],
    },
};

module.exports = withNextIntl(nextConfig);