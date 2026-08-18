/**
 * Secure Steg API service layer.
 *
 * All HTTP communication with the Spring Boot backend lives here so that
 * UI components never touch fetch/HTTP details directly.
 *
 * Backend endpoints (see SteganographyController.java):
 *   POST /api/steg/hide    -> multipart/form-data { imageFile, message, key }  => image/png bytes
 *   POST /api/steg/reveal  -> multipart/form-data { imageFile, key }           => plain text message
 *
 * NOTE: /api/steg/reveal was originally mapped as @GetMapping in the backend.
 * A GET request cannot carry a multipart body (the Fetch API rejects a body
 * on GET/HEAD requests, and it isn't valid per the HTTP spec either), so it
 * was changed to @PostMapping to be reachable from the browser. See the
 * accompanying summary for details.
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "http://localhost:2011";

export class SecureStegApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "SecureStegApiError";
    this.status = status;
  }
}

/**
 * Turns a failed Response into a clean, user-safe error message.
 * Never surfaces raw server/stack-trace text to the UI.
 */
async function toApiError(response: Response): Promise<SecureStegApiError> {
  let detail = "";
  try {
    detail = (await response.text()).trim();
  } catch {
    // ignore — body may be empty or unreadable
  }

  if (response.status === 400) {
    return new SecureStegApiError(
      detail && detail.length < 200 ? detail : "That request wasn't valid. Please check your image, message, and key.",
      response.status,
    );
  }
  if (response.status === 413) {
    return new SecureStegApiError("That image is too large to upload.", response.status);
  }
  if (response.status >= 500) {
    return new SecureStegApiError("The server ran into a problem processing your request. Please try again.", response.status);
  }
  return new SecureStegApiError("Something went wrong talking to the server. Please try again.", response.status);
}

/**
 * Encodes (hides) a secret message inside an image.
 * Returns the resulting PNG as a Blob the UI can preview/download.
 */
export async function hideMessage(imageFile: File, message: string, key: string): Promise<Blob> {
  const formData = new FormData();
  formData.append("imageFile", imageFile);
  formData.append("message", message);
  formData.append("key", key);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/steg/hide`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new SecureStegApiError("Couldn't reach the server. Is the backend running?");
  }

  if (!response.ok) {
    throw await toApiError(response);
  }

  return response.blob();
}

/**
 * Decodes (reveals) a secret message previously hidden inside an image.
 * Returns the extracted message text.
 */
export async function revealMessage(imageFile: File, key: string): Promise<string> {
  const formData = new FormData();
  formData.append("imageFile", imageFile);
  formData.append("key", key);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/steg/reveal`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new SecureStegApiError("Couldn't reach the server. Is the backend running?");
  }

  if (!response.ok) {
    throw await toApiError(response);
  }

  return response.text();
}
