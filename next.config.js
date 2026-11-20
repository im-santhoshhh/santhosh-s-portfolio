/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.19.21.13', '10.19.21.13:3000', 'localhost:3000'],
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'webpack-glsl-loader'
        }
      ]
    });
    return config;
  }
}

module.exports = nextConfig
