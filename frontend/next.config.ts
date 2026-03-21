import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@paraspell/sdk-pjs",
    
  ],

  webpack: (config) => {
    config.optimization.splitChunks = false;
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/(@paraspell\/sdk-pjs)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["next/babel"],
          plugins: [
            "@babel/plugin-transform-template-literals"
          ]
        }
      }
    });

    return config;
  }
};

export default nextConfig;