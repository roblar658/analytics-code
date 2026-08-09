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
