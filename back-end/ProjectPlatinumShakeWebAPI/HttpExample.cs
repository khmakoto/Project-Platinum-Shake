namespace ProjectPlatinumShakeWebAPI
{
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Auth0.ManagementApi;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Logging;
    using ProjectPlatinumShakeWebAPI.Auth;
    using ProjectPlatinumShakeWebAPI.Auth.Auth0Management;
    using ProjectPlatinumShakeWebAPI.Common;
    using ProjectPlatinumShakeWebAPI.Settings;

    // TODO: This class and its methods will be renamed and repurposed for providing the actual API method we expect.
    // The current content of this class is just for demo/test purposes.
    public class HttpExample
    {
        private readonly Auth0Authenticator authenticator;
        private readonly Auth0Settings auth0Settings;
        private readonly Auth0ManagementTokenUtility auth0ManagementUtility;
        private readonly IManagementConnection auth0ManagementConnection;

        public HttpExample(
            Auth0Authenticator authenticator,
            Auth0Settings auth0Settings,
            Auth0ManagementTokenUtility auth0ManagementUtility,
            IManagementConnection auth0ManagementConnection)
        {
            this.authenticator = authenticator;
            this.auth0Settings = auth0Settings;
            this.auth0ManagementUtility = auth0ManagementUtility;
            this.auth0ManagementConnection = auth0ManagementConnection;
        }

        [FunctionName("Auth")]
        public async Task<HttpResponseMessage> Manage(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "auth")] HttpRequestMessage req,
            ILogger log)
        {
            try
            {
                var (userClaims, userToken) = await authenticator.AuthenticateAsync(req);
                log.LogInformation("User authenticated");
                var userId = userClaims.Claims.Where(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Select(c => c.Value).First();
                
                var managementToken = await auth0ManagementUtility.GetAccessToken();
                var managementClient = new ManagementApiClient(managementToken, auth0Settings.Auth0Domain, auth0ManagementConnection);
                var user = await managementClient.Users.GetAsync(userId);

                return req.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (ExpectedException e)
            {
                return req.CreateErrorResponse(e.Code, e.Message);
            }
        }
    }
}
