/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/Emission-tool",
  redirects: async () => {
    return [
      {
        source: "/api",
        destination: "/Emission-tool/api",
        permanent: true,
      },
    ];
  },
  output: "export",
};

export default nextConfig;
