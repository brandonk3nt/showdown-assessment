import config from "../config";
import ENV_CONFIG from "../config/env-config";
import { AUTH_HOST, MODELS_API_URL, MODEL_OPTIONS } from "./constants";

export interface ModelOption {
  key: string;
  name: string;
  provider: string;
}

export interface ModelOptionsResult {
  models: ModelOption[];
  usedFallback: boolean;
}

interface ApiModel {
  name: string;
  provider: string;
  display?: { name?: string };
  is_active: boolean;
  capabilities?: { query?: boolean };
}

export const getModelOptions = async (): Promise<ModelOptionsResult> => {
  try {
    const response = await fetch(MODELS_API_URL, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_DEV_TOKEN}`,
      },
    });

    if (!response.ok) throw new Error(`Models API returned ${response.status}`);

    const data = (await response.json()) as { models: ApiModel[] };
    const models = data.models
      .filter((model) => model.is_active && model.capabilities?.query)
      .map((model) => ({
        key: model.name,
        name: model.display?.name ?? model.name,
        provider: model.provider,
      }));

    if (models.length < 2) throw new Error("Not enough models returned");

    return { models, usedFallback: false };
  } catch (error) {
    console.error("Unable to load models; using fallback list.", error);
    return { models: MODEL_OPTIONS, usedFallback: true };
  }
};

export const shuffle = <T = unknown>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const getTwoRandomModels = (
  modelOptions: ModelOption[] = MODEL_OPTIONS,
): ModelOption[] => {
  const shuffledModels = shuffle([...modelOptions]);
  return shuffledModels.slice(0, 2);
};

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export const getAppEnv = () => {
  const { hostname } = window.location;

  const envMapping: Record<string, typeof ENV_CONFIG.prod> = {
    beta: ENV_CONFIG.beta,
    poc: ENV_CONFIG.poc,
    localhost: ENV_CONFIG[config.environment] // Uses environment from config.ts
  };

  const currentEnv = (Object.keys(envMapping) as Array<keyof typeof envMapping>).find((key) =>
    hostname.includes(key)
  );

  return currentEnv ? envMapping[currentEnv] : ENV_CONFIG.prod;
};

export const navigateToLogin = (redirect?: boolean) => {
  const { href } = window.location;
  let environment = getAppEnv();

  // navigate to login
  const route = `${AUTH_HOST}/login?service=${environment.service}/${environment.appName}/?aid=${environment.appId}%26redirect=${href}`;
  if (!redirect) return route;
  window.location.replace(route);
};
