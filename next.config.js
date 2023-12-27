module.exports = {
    webpack: (config, { webpack }) => {
      config.plugins.push(new webpack.IgnorePlugin({
        resourceRegExp: /\/__tests__\//,
      }));
  
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
  };
  