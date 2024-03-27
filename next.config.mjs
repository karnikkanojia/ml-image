/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.blob.core.windows.net',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '10000',
            }
        ]
    }
};

export default nextConfig;
