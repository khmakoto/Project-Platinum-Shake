namespace ProjectPlatinumShakeWebAPI
{
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Logging;
    using ProjectPlatinumShakeWebAPI.Auth;
    using ProjectPlatinumShakeWebAPI.Common;

    // TODO: This class and its methods will be renamed and repurposed for providing the actual API method we expect.
    // The current content of this class is just for demo/test purposes.
    public class HttpExample
    {
        private Auth0Authenticator authenticator;

        public HttpExample(Auth0Authenticator authenticator)
        {
            this.authenticator = authenticator;
        }

        [FunctionName("Auth")]
        public async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "auth")] HttpRequestMessage req,
            ILogger log)
        {
            try
            {
                var (user, token) = await authenticator.AuthenticateAsync(req);
                log.LogInformation("User authenticated");

                foreach (var claim in user.Claims)
                    log.LogInformation($"Claim `{claim.Type}` is `{claim.Value}`");

                var result = user.Claims.Select(c => new { type = c.Type, value = c.Value }).ToList();
                return req.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (ExpectedException e)
            {
                return req.CreateErrorResponse(e.Code, e.Message);
            }
        }
    }
}
