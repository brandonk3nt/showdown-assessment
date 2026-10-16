interface Config {
  environment: "prod" | "beta" | "poc" | "dev";
}

const config: Config = {
  environment: "dev", // Change this to 'prod', 'beta', 'poc', or 'dev'
};

export default config;
