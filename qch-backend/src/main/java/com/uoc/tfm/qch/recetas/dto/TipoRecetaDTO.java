package com.uoc.tfm.qch.recetas.dto;

import com.uoc.tfm.qch.recetas.domain.TipoReceta;

public class TipoRecetaDTO {
	
	private int id;
	private String nombre;
	
	public TipoRecetaDTO() {
	}

	public TipoRecetaDTO(int id, String nombre) {
		this.id = id;
		this.nombre = nombre;
	}
	
	public TipoRecetaDTO(TipoReceta tipoReceta) {
		this.id = tipoReceta.getId();
		this.nombre = tipoReceta.getNombre();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	
	
}
