namespace ProjectPlatinumShakeWebAPI.Auth.Auth0ManagementAPI
{
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Newtonsoft.Json;
    using ProjectPlatinumShakeWebAPI.Auth;

    public class Auth0ManagementAPIUtility
    {
        private HttpClient httpClient;

        public Auth0ManagementAPIUtility(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        public async Task<string> GetAccessToken()
        {

            var request = new Auth0TokenRequest
            {
                ClientId = Auth0Settings.Auth0M2MAppClientId,
                ClientSecret = Auth0Settings.Auth0M2MAppClientSecret,
                Audience = $"https://{Auth0Settings.Auth0Domain}/api/v2/",
                GrantType = "client_credentials"
            };
            var jsonModel = JsonConvert.SerializeObject(request);
            var stringContent = new StringContent(jsonModel, Encoding.UTF8, "application/json");
            var httpRequest = new HttpRequestMessage(HttpMethod.Post, $"https://{Auth0Settings.Auth0Domain}/oauth/token")
            {
                Content = stringContent
            };

            var httpResponse = await httpClient.SendAsync(httpRequest);

            httpResponse.EnsureSuccessStatusCode();

            var httpResponseContentString = await httpResponse.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<Auth0TokenResponse>(httpResponseContentString);

            return response.AccessToken;
        }
    }
}
