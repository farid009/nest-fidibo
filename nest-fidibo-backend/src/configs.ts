export default (_env: any = null): any => {
  const env: any = _env ? _env : process.env;

  return {
    constants: {
      appEndpoint: env.APP_MAIN_ENDPOINT,
      serverHost: env.SERVER_HOST,
      httpServerPort: env.HTTP_SERVER_PORT,
    },
  };
};
