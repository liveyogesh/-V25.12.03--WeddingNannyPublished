
// Default SHA-256 hash for "admin"
export const DEFAULT_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

export async function hashString(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error("Web Crypto API not supported");
  }

  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, targetHash: string = DEFAULT_HASH): Promise<boolean> {
  if (!password) return false;
  
  try {
    const computedHash = await hashString(password);
    
    // Debugging: Remove in production if needed
    // console.log("Input Hash:", computedHash);
    // console.log("Target Hash:", targetHash);

    return computedHash === targetHash;
  } catch (e) {
    console.error("Password verification error:", e);
    return false;
  }
}
