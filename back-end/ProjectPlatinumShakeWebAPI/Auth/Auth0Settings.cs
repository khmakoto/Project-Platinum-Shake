namespace ProjectPlatinumShakeWebAPI.Auth
{
    using System;

    public class Auth0Settings
    {
        public static readonly string Auth0Domain = Environment.GetEnvironmentVariable("AUTH0_DOMAIN_URL");

        public static readonly string Auth0Audience = Environment.GetEnvironmentVariable("AUTH0_AUDIENCE");
    }
}
