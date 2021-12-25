require('dotenv').config()
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  async redirects() {
    return [
      {
        source: '/works',
        destination: '/',
        permanent: false,
      },
      {
        source: '/rick',
        destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        permanent: false,
      },
    ]
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
}