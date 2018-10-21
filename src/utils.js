const getEnvironment = (key, defaultValue = null) => process.env[key] || defaultValue;
export default getEnvironment;