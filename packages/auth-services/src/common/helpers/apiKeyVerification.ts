import configuration from '../../config/configuration';

export const apiKeyVerification = (apiKey: string) => apiKey.trim() === configuration.AUTH_SERVICES_API_KEY.trim();
