package com.uoc.tfm.qch.ingredientes.dto;

import com.uoc.tfm.qch.ingredientes.domain.GrupoIngrediente;
import com.uoc.tfm.qch.ingredientes.domain.Ingrediente;

public class IngredienteDTO {
	
	private int id;
	private String nombre;
	private GrupoIngrediente grupo;
	
	public IngredienteDTO() {}
	
	public IngredienteDTO(int id, String nombre, GrupoIngrediente grupo) {
		this.id = id;
		this.nombre = nombre;
		this.grupo = grupo;
	}
	
	public IngredienteDTO(Ingrediente ingrediente) {
		this.id = ingrediente.getId();
		this.nombre = ingrediente.getNombre();
		this.grupo = ingrediente.getGrupo();
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
	public GrupoIngrediente getGrupo() {
		return grupo;
	}
	public void setGrupo(GrupoIngrediente grupo) {
		this.grupo = grupo;
	}
	
	
}
