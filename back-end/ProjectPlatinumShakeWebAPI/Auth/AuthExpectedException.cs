namespace ProjectPlatinumShakeWebAPI.Auth
{
    using System;
    using System.Net.Http.Headers;
    using System.Net.Http;
    using System.Net;
    using ProjectPlatinumShakeWebAPI.Common;

    /// <summary>
    /// Class that represents the expected exception to throw for authentication issues.
    /// Code based on "https://github.com/StephenClearyExamples/FunctionsAuth0".
    /// </summary>
    public class AuthExpectedException : ExpectedException
    {
        public AuthExpectedException(string message = "", Exception innerException = null)
            : base(HttpStatusCode.Forbidden, message, innerException)
        {
        }

        protected override void ApplyResponseDetails(HttpResponseMessage response)
        {
            response.Headers.WwwAuthenticate.Add(new AuthenticationHeaderValue("Bearer", "token_type=\"JWT\""));
        }
    }
}
