import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
const client = new SecretManagerServiceClient();
// name - 
async function accessSecretVersion(name) {
    let version;
    [version] = await client.accessSecretVersion({
        name: name,
    });
    // Extract the payload as a string.
    const payload = version.payload.data.toString();
    // WARNING: Do not print the secret in a production environment - this
    // snippet is showing how to access the secret material.
    console.info(`Payload: ${payload}`);
    return payload;
}
const COOKIE_SECRET = await accessSecretVersion('projects/147003015602/secrets/COOKIE_SECRET/versions/1');
const MONGO_URI = await accessSecretVersion('projects/147003015602/secrets/MONGO_URI/versions/1');
export { COOKIE_SECRET, MONGO_URI };
