package in.umbrellaR1.GreenMist.dto;

public class AuthenticationResponse {
	
	private String email;
	/**
	 * @param email
	 * @param token
	 */
	public AuthenticationResponse(String email, String token) {
		this.email = email;
		this.token = token;
	}
	private String token;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}

}
