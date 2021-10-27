package com.uoc.tfm.qch.security.dto;

public class CambiarPasswordPerfilDTO {
	
	private String idUsuario;
	private String password;
	private String confirmPassword;
	
	public CambiarPasswordPerfilDTO() {}
	
	public CambiarPasswordPerfilDTO(String idUsuario, String password, String confirmPassword) {
		this.idUsuario = idUsuario;
		this.password = password;
		this.confirmPassword = confirmPassword;
	}
	
	public String getIdUsuario() {
		return idUsuario;
	}
	
	public void setIdUsuario(String idUsuario) {
		this.idUsuario = idUsuario;
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

}
