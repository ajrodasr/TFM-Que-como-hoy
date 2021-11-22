package com.uoc.tfm.qch.recetas.dto;

public class LikeRecetaDTO {
	
	private String idReceta;
	private String idUsuario;
	
	public LikeRecetaDTO() {}

	public LikeRecetaDTO(String idReceta, String idUsuario) {
		this.idReceta = idReceta;
		this.idUsuario = idUsuario;
	}

	public String getIdReceta() {
		return idReceta;
	}

	public void setIdReceta(String idReceta) {
		this.idReceta = idReceta;
	}

	public String getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(String idUsuario) {
		this.idUsuario = idUsuario;
	}
}
