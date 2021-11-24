package com.uoc.tfm.qch.recetas.dto;

public class LikeRecetaDTO {
	
	private int idReceta;
	private String idUsuario;
	
	public LikeRecetaDTO() {}

	public LikeRecetaDTO(int idReceta, String idUsuario) {
		this.idReceta = idReceta;
		this.idUsuario = idUsuario;
	}

	public int getIdReceta() {
		return idReceta;
	}

	public void setIdReceta(int idReceta) {
		this.idReceta = idReceta;
	}

	public String getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(String idUsuario) {
		this.idUsuario = idUsuario;
	}
}
