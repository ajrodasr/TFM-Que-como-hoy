package com.uoc.tfm.qch.recetas.dto;

public class IngredienteRecetaDTO {
	
	private int id;
	private String nombre;
	private String cantidad;
	private GrupoIngredienteDTO grupo;
	
	public IngredienteRecetaDTO() {}
	
	public IngredienteRecetaDTO(int id, String nombre, String cantidad, GrupoIngredienteDTO grupo) {
		this.id = id;
		this.nombre = nombre;
		this.cantidad = cantidad;
		this.grupo = grupo;
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
	public String getCantidad() {
		return cantidad;
	}

	public void setCantidad(String cantidad) {
		this.cantidad = cantidad;
	}

	public GrupoIngredienteDTO getGrupo() {
		return grupo;
	}
	public void setGrupo(GrupoIngredienteDTO grupo) {
		this.grupo = grupo;
	}
	
	
}
