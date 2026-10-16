interface EnvironmentConfig {
  service: string;
  appName: string;
  appId: string;
  socketUrl: string;
}

const ENV_CONFIG: Record<'prod' | 'beta' | 'poc' | 'dev', EnvironmentConfig> = {
  prod: {
    service: 'https://auth-main.aiml.asu.edu',
    appName: 'showdown',
    appId: 'uxBgqHKi2rVUAz6CUTuKKE',
    socketUrl: 'wss://apiws-main.aiml.asu.edu/',
  },
  beta: {
    service: 'https://auth-main-beta.aiml.asu.edu',
    appName: 'showdown',
    appId: 'uxBgqHKi2rVUAz6CUTuKKE',
    socketUrl: 'wss://apiws-main-beta.aiml.asu.edu/',
  },
  poc: {
    service: 'https://auth-main-poc.aiml.asu.edu',
    appName: 'showdown',
    appId: 'uxBgqHKi2rVUAz6CUTuKKE',
    socketUrl: 'wss://apiws-main-poc.aiml.asu.edu/',
  },
  dev: {
    service: 'https://auth-dev-poc.aiml.asu.edu',
    appName: 'showdown',
    appId: 'uxBgqHKi2rVUAz6CUTuKKE',
    socketUrl: 'wss://apiws-dev-poc.aiml.asu.edu/',
  },
};

export default ENV_CONFIG;
