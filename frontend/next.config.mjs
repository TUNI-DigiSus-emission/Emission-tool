/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/Emission-tool",
  redirects: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "/Emission-tool/api/:path*",
        permanent: true,
      },
    ];
  },
  output: "export",
};

export default nextConfig;
