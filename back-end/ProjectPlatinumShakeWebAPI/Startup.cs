using System.Net.Http;
using Auth0.ManagementApi;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using ProjectPlatinumShakeWebAPI.Auth;
using ProjectPlatinumShakeWebAPI.Auth.Auth0ManagementAPI;
using ProjectPlatinumShakeWebAPI.Settings;

[assembly: FunctionsStartup(typeof(ProjectPlatinumShakeWebAPI.Startup))]

namespace ProjectPlatinumShakeWebAPI
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var keyVaultSettings = new KeyVaultSettings();
            var keyVaultSecretsClient = new SecretClient(keyVaultSettings.KeyVaultUri, new DefaultAzureCredential());
            
            builder.Services.AddSingleton(keyVaultSecretsClient);

            var httpClient = new HttpClient();
            var authSettings = new Auth0Settings();
            var auth0Authenticator = new Auth0Authenticator(authSettings);
            var auth0ManagementAPIUtility = new Auth0ManagementAPIUtility(authSettings, httpClient, keyVaultSecretsClient, keyVaultSettings);
            
            builder.Services.AddSingleton(authSettings);
            builder.Services.AddSingleton(auth0Authenticator);
            builder.Services.AddSingleton(auth0ManagementAPIUtility);
            builder.Services.AddSingleton<IManagementConnection>(new HttpClientManagementConnection(httpClient));
        }
    }
}
