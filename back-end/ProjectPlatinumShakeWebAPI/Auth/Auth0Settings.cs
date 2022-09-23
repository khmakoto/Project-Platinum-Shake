namespace ProjectPlatinumShakeWebAPI.Auth
{
    using System;

    public class Auth0Settings
    {
        public readonly string Auth0Domain;

        public readonly string Auth0Audience;

        public readonly string Auth0M2MAppClientId;

        public readonly string Auth0M2MAppClientSecret;
        
        public Auth0Settings()
        {
            Auth0Domain = Environment.GetEnvironmentVariable("AUTH0_DOMAIN_URL");
            Auth0Audience = Environment.GetEnvironmentVariable("AUTH0_AUDIENCE");
            Auth0M2MAppClientId = Environment.GetEnvironmentVariable("AUTH0_M2M_APP_CLIENT_ID");
            Auth0M2MAppClientSecret = Environment.GetEnvironmentVariable("AUTH0_M2M_APP_CLIENT_SECRET");
        }
    }
}
