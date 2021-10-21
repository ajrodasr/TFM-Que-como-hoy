package com.uoc.tfm.qch.security.dto;

public class EmailPasswordDTO {
	
	private String email;
	private String idUsuario;
	private String tokenPassword;
	
	public EmailPasswordDTO() {}
	
	public EmailPasswordDTO(String email, String idUsuario, String tokenPassword) {
		this.email = email;
		this.idUsuario = idUsuario;
		this.tokenPassword = tokenPassword;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(String idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getTokenPassword() {
		return tokenPassword;
	}

	public void setTokenPassword(String tokenPassword) {
		this.tokenPassword = tokenPassword;
	}
	
}
