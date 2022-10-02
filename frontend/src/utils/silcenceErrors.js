/** A utility function for silencing expected erroneous output */
export const silenceErrors = async fn => {
  try {
    return await fn();
  } catch {}
};

export const silenceErrorsSync = fn => {
  try {
    return fn();
  } catch {}
};
