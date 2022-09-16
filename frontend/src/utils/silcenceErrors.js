/** A utility function for silencing expected erroneous output */
export default async function silenceErrors (fn) {
  try {
    return await fn();
  } catch {}
}
