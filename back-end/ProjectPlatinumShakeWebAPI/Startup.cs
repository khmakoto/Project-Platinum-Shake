﻿using System.Net.Http;
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
            var auth0Authenticator = new Auth0Authenticator(Auth0Settings.Auth0Domain, Auth0Settings.Auth0Audience);
            builder.Services.AddSingleton(auth0Authenticator);

            var auth0ManagementAPIUtility = new Auth0ManagementAPIUtility(new HttpClient());
            builder.Services.AddSingleton(auth0ManagementAPIUtility);
        }
    }
}
