export function resultUtil(data, code = 200, message = "success") {
  return {
    code,
    message,
    data,
  };
}
