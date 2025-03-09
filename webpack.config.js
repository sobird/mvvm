/* eslint-disable @typescript-eslint/naming-convention */
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env, argv) => {
  return {
    entry: {
      react: [
        './src/index.tsx',
      ],
    },
    output: {
      clean: true,
    },

    module: {
      rules: [{
        test: /\.(ts|tsx)$/i,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // transpileOnly: true,
              happyPackMode: true,
            },

          },
        ],
      }],
    },

    plugins: [
      new HtmlWebpackPlugin({
        // title: pkg.description,
        template: resolve('public/index.html'),
        minify: {
          // collapseWhitespace: isProduction,
          // removeComments: isProduction,
          // minifyJS: isProduction,
          // minifyCSS: isProduction,
        },
      }),
    ],

    resolve: {
      extensions: ['.tsx', '.ts', 'jsx', '.js'],
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
};
