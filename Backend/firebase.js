import fs from "fs";
import { JWT } from "google-auth-library";

const SERVICE_ACCOUNT_FILE =
  "./management-app-8740f-firebase-adminsdk-wjpbt-799026af84.json";
const SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"];

export const serviceAccount = JSON.parse(
  fs.readFileSync(SERVICE_ACCOUNT_FILE, "utf8")
);

const client = new JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: SCOPES,
});

export const getAccessToken = async () => {
  try {
    const tokenResponse = await client.authorize();
    return tokenResponse.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};
