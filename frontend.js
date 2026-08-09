export const submitAnalyticsUserDeletion = async (userId: string, propertyId: string = "541696789", recaptchaToken?: string | null): Promise<void> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (recaptchaToken) {
      headers["x-recaptcha-token"] = recaptchaToken;
    }

    const response = await fetch("https://api-vfjzpgg5za-uc.a.run.app/delete-analytics-user", {
      method: "POST",
      headers,
      body: JSON.stringify({ userId, propertyId }),
    });
    const result = await response.json();
    console.log("Analytics Admin User Deletion response:", result);
  } catch (error) {
    console.error("Failed to submit Analytics User Deletion:", error);
  }
};

export const revokeConsent = () => {
  if (typeof window !== 'undefined') {
    // Disable Google Analytics tracking immediately in browser window
    (window as any)[`ga-disable-${MEASUREMENT_ID}`] = true;

    // Clear any Google Analytics cookies from the browser
    document.cookie.split(";").forEach((c) => {
      const cookieName = c.split("=")[0].trim();
      if (cookieName.startsWith("_ga")) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  }

  setConsent({
    analytics_storage: 'denied',
  });
};

//Firebase related

import { getInstallations, getId, deleteInstallations } from "firebase/installations";

export const getCurrentFid = async (): Promise<string | null> => {
  if (installations) {
    return await getId(installations);
  }
  return null;
};

export const deleteCurrentFidData = async (): Promise<void> => {
  if (installations) {
    await deleteInstallations(installations);
  }
};
