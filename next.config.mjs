/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'google.com'
            }
        ]
    },
    output: 'standalone'

};

export default nextConfig;
