
import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import { Configuration, container } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import * as path from 'path';

export default (config: Configuration, options: CustomWebpackBrowserSchema, targetOptions: TargetOptions) => {

  config.output!.uniqueName = 'contact';
  config.optimization!.runtimeChunk = false;

  const hashMfModule = options.outputHashing === 'all' || options.outputHashing === 'bundles';

  // Create a manifest.json file that links default file names to their hashed names
  config.plugins!.push(new WebpackManifestPlugin({
    filter: (file) => /mfe1(\..+)?.js$/.test(file.name),
    publicPath: '/mfe1/',
    writeFilesToEmit: true
  }));

  config.plugins!.push(
    new container.ModuleFederationPlugin({
      name: "mfe1",
      filename: `mfe1${hashMfModule ? '.[contenthash]' : '.[contenthash]'}.js`,
      exposes: {
        './Module':  path.resolve(__dirname, './src/flights/flights.module.ts'),
      },
      shared: {
        '@angular/animations': {singleton: true, strictVersion: true},
        '@angular/core': {singleton: true, strictVersion: true},
        '@angular/common': {singleton: true, strictVersion: true},
        '@angular/forms': {singleton: true, strictVersion: true},
        '@angular/platform-browser': {singleton: true, strictVersion: true},
        '@angular/router': {singleton: true, strictVersion: true},
        rxjs: {singleton: true, strictVersion: true},
      }
    })
  );


  return config;
};
