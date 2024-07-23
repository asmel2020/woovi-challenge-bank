import configuration from '../../config/configuration';

export const getApiKey = (apiKey: string) => ({
  isAuthApiKey: apiKey.trim() === configuration.AUTH_SERVICES_API_KEY.trim(),
});
