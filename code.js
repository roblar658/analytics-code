    const fullUrl = req.url || req.originalUrl || "";
    
    // Check if it's the analytics deletion route
    if (fullUrl.includes("/delete-analytics-user")) {
      const { userId, propertyId = "541696789" } = req.body || {};
      if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
      }
      try {
        const { GoogleAuth } = require("google-auth-library");
        const auth = new GoogleAuth({ scopes: ["https://www.googleapis.com/auth/analytics.edit"] });
        const client = await auth.getClient();
        const tokenRes = await client.getAccessToken();
        const accessToken = typeof tokenRes === "string" ? tokenRes : (tokenRes && tokenRes.token ? tokenRes.token : null);

        const url = `https://analyticsadmin.googleapis.com/v1alpha/properties/${propertyId}:submitUserDeletion`;
        const gaRes = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ userId }),
        });

        const rawText = await gaRes.text();
        let resData;
        try { resData = JSON.parse(rawText); } catch(e) { resData = rawText; }
        
        return res.status(200).json({ status: gaRes.status, ok: gaRes.ok, response: resData });
      } catch (err) {
        console.error("Error in delete-analytics-user:", err);
        return res.status(500).json({ error: err.message });
      }
    }
