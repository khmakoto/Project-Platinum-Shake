namespace ProjectPlatinumShakeWebAPI.Auth.Auth0ManagementAPI
{
    using Newtonsoft.Json;

    public class Auth0TokenRequest
    {
        [JsonProperty("audience")]
        public string Audience { get; set; }

        [JsonProperty("client_id")]
        public string ClientId { get; set; }

        [JsonProperty("client_secret")]
        public string ClientSecret { get; set; }

        [JsonProperty("grant_type")]
        public string GrantType { get; set; }
    }
}
