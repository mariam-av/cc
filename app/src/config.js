export const getBaseURL = () => {
  return (
    process.env.REACT_APP_BASE_URL ||
    window?._env_?.BASE_URL ||
    "http://localhost:5000"
  );
};
