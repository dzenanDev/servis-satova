export const CONFIG = {
  // get API url either from window during runtime or env during build
  apiGatewayUrl: window.REACT_APP_API_URL || process.env.REACT_APP_API_URL,
  csvDownloadUrl: 'http://localhost:3001/csv',
};
