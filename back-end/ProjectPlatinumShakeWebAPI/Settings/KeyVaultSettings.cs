namespace ProjectPlatinumShakeWebAPI.Settings
{
    using System;

    public class KeyVaultSettings
    {
        public readonly Uri KeyVaultUri;

        public readonly string Auth0ManagementAPIAccessTokenSecretName;

        public KeyVaultSettings()
        {
            KeyVaultUri = new Uri(Environment.GetEnvironmentVariable("KEYVAULT_URI"));
            Auth0ManagementAPIAccessTokenSecretName = Environment.GetEnvironmentVariable("AUTH0_MANAGEMENT_API_ACCESS_TOKEN_SECRET_NAME");
        }
    }
}
