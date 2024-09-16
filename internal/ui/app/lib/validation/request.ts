interface validateResponseProps {
  dict: any;
  response: {
    code: number;
    message: string;
    data?: any;
  };
}

export default function validateResponse({
  dict,
  response
}: validateResponseProps) {
  const result = {
    message: dict.success.ok,
    error: true,
  };

  if (response.code === 200) {
    result.message = dict.success.ok;
    result.error = false;
    return result;
  }
  if (response.code === 201) {
    result.message = dict.success.created;
    result.error = false;
    return result;
  }

  if (response.code === 401) {
    result.message = dict.errors.auth;
    return result;
  }
  if (response.code === 404) {
    result.message = dict.errors.not_found;
    return result;
  }
  if (response.code === 400) {
    result.message = dict.errors.request;
    return result;
  }
  if (response.code === 500) {
    result.message = dict.errors.server;
    return result;
  }

  result.message = dict.errors.unknown;
  return result;
}
