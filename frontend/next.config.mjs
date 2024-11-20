/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/Emission-tool",
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/Emission-tool",
        permanent: true,
      },
    ];
  },
  output: "export",
};

export default nextConfig;
