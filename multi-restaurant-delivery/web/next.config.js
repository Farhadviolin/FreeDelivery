module.exports = {
  async headers() {
    return [
      {
        source: '/api/personal/:path*',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=30, stale-while-revalidate=60' }
        ],
      },
    ];
  },
};
