using System.Net.Http;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using ProjectPlatinumShakeWebAPI.Auth;
using ProjectPlatinumShakeWebAPI.Auth.Auth0ManagementAPI;

[assembly: FunctionsStartup(typeof(ProjectPlatinumShakeWebAPI.Startup))]

namespace ProjectPlatinumShakeWebAPI
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var authSettings = new Auth0Settings();
            var auth0Authenticator = new Auth0Authenticator(authSettings);
            var auth0ManagementAPIUtility = new Auth0ManagementAPIUtility(authSettings, new HttpClient());

            builder.Services.AddSingleton(authSettings);
            builder.Services.AddSingleton(auth0Authenticator);
            builder.Services.AddSingleton(auth0ManagementAPIUtility);
        }
    }
}
