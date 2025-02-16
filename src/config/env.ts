interface IConfig {
  API_URL: string
}

const parseConfig = (): IConfig => {
  console.log(import.meta.env);
  return {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  }
}

const config: IConfig = parseConfig()

export default config
