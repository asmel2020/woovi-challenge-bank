import configuration from '../../config/configuration';

export const getApiKey = (apiKey: string | undefined) => ({
  isAuthApiKey: apiKey === configuration.AUTH_SERVICES_API_KEY,
});
