namespace ProjectPlatinumShakeWebAPI.Common
{
    using System;
    using System.Net;
    using System.Net.Http;

    /// <summary>
    /// Represents an exception that is expected to be thrown under specific scenarios.
    /// The content of this exception may be used to generate a proper HTTP response, instead of an Internal
    /// Server Error (500) response, which is normally returned for unhandled exceptions.
    /// Code based on "https://github.com/StephenClearyExamples/FunctionsAuth0".
    /// </summary>
    public class ExpectedException : Exception
    {
        public HttpStatusCode Code { get; }
        
        public ExpectedException(HttpStatusCode code, string message = "", Exception innerException = null)
            : base(message, innerException)
        {
            Code = code;
        }

        public HttpResponseMessage CreateErrorResponseMessage(HttpRequestMessage request)
        {
            var result = request.CreateErrorResponse(Code, Message);
            ApplyResponseDetails(result);
            return result;
        }

        protected virtual void ApplyResponseDetails(HttpResponseMessage response) { }
    }
}
