package com.messager.payload;

import com.messager.payload.user.UserResponse;

public class JwtAuthenticationResponse
{
		private String accessToken;

		private String tokenType = "Bearer";

		private UserResponse userResponse;

		public JwtAuthenticationResponse(String accessToken, UserResponse userResponse)
		{
				this.accessToken = accessToken;
				this.userResponse = userResponse;
		}

		public JwtAuthenticationResponse(String accessToken)
		{
				this.accessToken = accessToken;
		}

		public String getAccessToken()
		{
				return accessToken;
		}

		public void setAccessToken(String accessToken)
		{
				this.accessToken = accessToken;
		}

		public String getTokenType()
		{
				return tokenType;
		}

		public void setTokenType(String tokenType)
		{
				this.tokenType = tokenType;
		}

    public UserResponse getUserResponse()
    {
        return userResponse;
    }

    public void setUserResponse(UserResponse userResponse)
    {
        this.userResponse = userResponse;
    }
}
