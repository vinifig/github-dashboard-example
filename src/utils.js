const getEnvironment = (key, defaultValue = null) => process.env[key] || defaultValue;
const isDev = () => getEnvironment("NODE_ENV", "development") === "production";
export default {
    getEnvironment,
    isDev
};