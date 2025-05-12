import FingerprintJS from "@fingerprintjs/fingerprintjs";
export async function getDeviceId() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  console.log(result);

  return result.visitorId;
}

export async function getDeviceName() {
  const ua = navigator.userAgent;
  let deviceName = "Unknown Device";
  if (/iPhone/.test(ua)) deviceName = "iPhone";
  else if (/iPad/.test(ua)) deviceName = "iPad";
  else if (/Android/.test(ua)) {
    const match = ua.match(/Android\s[\d.]+;\s([^)]+)/);
    deviceName = match ? match[1].trim() : "Android Device";
  } else if (/Windows NT/.test(ua)) deviceName = "Windows PC";
  else if (/Macintosh/.test(ua)) deviceName = "Mac";
  else if (/Linux/.test(ua)) deviceName = "Linux Device";

  console.log(deviceName);
  
  return deviceName;
}
