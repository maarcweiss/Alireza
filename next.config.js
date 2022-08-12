/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

const withTM = require("next-transpile-modules")([
  "react-leaflet",
  "@react-leaflet/core",
]);

module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

// module.exports = {
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         resolve: {
//           fallback: {
//             fs: false,
//           },
//         },
//       };
//     }

//     return config;
//   },
// };
// {
//   resolve: {
//     fallback: {
//       fs: false
//     }
//   }
// }
