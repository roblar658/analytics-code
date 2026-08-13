
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

    // Clear all Google Analytics cookies from the browser
    purgeAnalyticsCookies();

    // Send Consent Mode v2 update to window.gtag / dataLayer
    updateGtagConsent(false);
  }

  // Update  Analytics consent state
  setConsent({
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    security_storage: 'granted',
  });

  analyticsInstance = null;
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
