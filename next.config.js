// const nextConfig = {
//     async headers() {
//       return [
//         {
//           source: "/",
//           headers: [
//             { key: "X-Hi", value: "true" },
//             // { key: "Access-Control-Allow-Origin", value: "*" },
//             // { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
//             // { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//           ],
//         },
//       ];
//     },
//   };
  
//   module.exports = nextConfig;
  
// const nextConfig = {
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           { key: "X-Hi", value: "true" },
//           // other headers if necessary
//         ],
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.toiletmap.org.uk/api/:path*',
      },
    ];
  },
};

// module.exports = {
//   async headers() {
//     return [
//       {
//         // matching all API routes
//         source: "/api/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//         ]
//       }
//     ]
//   }
// };
