import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


export default {

   entry : './src/app/index.js',
   output : {
    path : __dirname + '/public',
    filename : 'bundle.js'
   }, 
   module : {
      rules : [
          {
              test: /\.(js|jsx)$/i,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                  ],
                },
            },
          },      // Additional configuration to handle *.css files
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          
      ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
}

}