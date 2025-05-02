const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['brandah.inote-tech.com'],
        // domains: ['brandah-om.com'],
    }
};

module.exports = withNextIntl(nextConfig);
