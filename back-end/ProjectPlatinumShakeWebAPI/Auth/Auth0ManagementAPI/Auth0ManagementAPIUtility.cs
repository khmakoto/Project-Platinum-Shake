namespace ProjectPlatinumShakeWebAPI.Auth.Auth0ManagementAPI
{
    using System;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Azure;
    using Azure.Security.KeyVault.Secrets;
    using Newtonsoft.Json;
    using ProjectPlatinumShakeWebAPI.Auth;
    using ProjectPlatinumShakeWebAPI.Settings;

    public class Auth0ManagementAPIUtility
    {
        private const string ACCESS_TOKEN_SECRET_EXPIRE_TAG_NAME = "ExpiresOn";
        private const int SECONDS_TO_REMOVE_FROM_ACCESS_TOKEN_EXPIRE_DATE = 300;
        
        private readonly Auth0Settings auth0Settings;
        private readonly HttpClient httpClient;
        private readonly SecretClient keyVaultSecretsClient;
        private readonly KeyVaultSettings keyVaultSettings;

        public Auth0ManagementAPIUtility(
            Auth0Settings auth0Settings,
            HttpClient httpClient,
            SecretClient keyVaultSecretsClient,
            KeyVaultSettings keyVaultSettings)
        {
            this.auth0Settings = auth0Settings;
            this.httpClient = httpClient;
            this.keyVaultSecretsClient = keyVaultSecretsClient;
            this.keyVaultSettings = keyVaultSettings;
        }

        public async Task<string> GetAccessToken()
        {
            string accessToken = await GetAccessTokenFromKeyVault();
            if (accessToken != null)
            {
                return accessToken;
            }
            
            var accessTokenInfo = await GetAccessTokenByCallingAuth0();
            await SetAccessTokenInKeyVault(accessTokenInfo);
            return accessTokenInfo.AccessToken;
        }

        private async Task<string> GetAccessTokenFromKeyVault()
        {
            try
            {
                var response = await keyVaultSecretsClient.GetSecretAsync(keyVaultSettings.Auth0ManagementAPIAccessTokenSecretName);
                var secretObject = response.Value;
                if (secretObject.Properties.Tags.TryGetValue(ACCESS_TOKEN_SECRET_EXPIRE_TAG_NAME, out var expirationDateString)
                    && DateTimeOffset.TryParse(expirationDateString, out var expirationDate)
                    && DateTimeOffset.UtcNow < expirationDate)
                {
                    return secretObject.Value;
                }
                return null;
            }
            catch (RequestFailedException _)
            {
                return null;
            }
        }

        private async Task<Auth0TokenResponse> GetAccessTokenByCallingAuth0()
        {
            var request = new Auth0TokenRequest
            {
                ClientId = auth0Settings.Auth0M2MAppClientId,
                ClientSecret = auth0Settings.Auth0M2MAppClientSecret,
                Audience = $"https://{auth0Settings.Auth0Domain}/api/v2/",
                GrantType = "client_credentials"
            };

            var jsonModel = JsonConvert.SerializeObject(request);
            var stringContent = new StringContent(jsonModel, Encoding.UTF8, "application/json");
            var httpRequest = new HttpRequestMessage(HttpMethod.Post, $"https://{auth0Settings.Auth0Domain}/oauth/token")
            {
                Content = stringContent
            };

            var httpResponse = await httpClient.SendAsync(httpRequest);
            httpResponse.EnsureSuccessStatusCode();

            var httpResponseContentString = await httpResponse.Content.ReadAsStringAsync();
            var accessTokenInfo = JsonConvert.DeserializeObject<Auth0TokenResponse>(httpResponseContentString);

            return accessTokenInfo;
        }

        private async Task SetAccessTokenInKeyVault(Auth0TokenResponse accessTokenInfo)
        {
            var secretToUpload = new KeyVaultSecret(keyVaultSettings.Auth0ManagementAPIAccessTokenSecretName, accessTokenInfo.AccessToken);
            var expiresOn = DateTimeOffset.UtcNow.AddSeconds(accessTokenInfo.ExpiresIn - SECONDS_TO_REMOVE_FROM_ACCESS_TOKEN_EXPIRE_DATE);
            secretToUpload.Properties.Tags[ACCESS_TOKEN_SECRET_EXPIRE_TAG_NAME] = expiresOn.ToString();
            await keyVaultSecretsClient.SetSecretAsync(secretToUpload);
        }
    }
}
