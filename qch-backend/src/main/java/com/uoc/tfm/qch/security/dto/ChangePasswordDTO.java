package com.uoc.tfm.qch.security.dto;

public class ChangePasswordDTO {
	
	private String password;
	private String confirmPassword;
	private String tokenPassword;
	
	public ChangePasswordDTO() {}
	
	public ChangePasswordDTO(String password, String confirmPassword, String tokenPassword) {
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.tokenPassword = tokenPassword;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getTokenPassword() {
		return tokenPassword;
	}

	public void setTokenPassword(String tokenPassword) {
		this.tokenPassword = tokenPassword;
	}
}
