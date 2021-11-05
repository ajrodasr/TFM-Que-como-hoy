package com.uoc.tfm.qch.ingredientes.domain;

public class Ingrediente {
	
	private int id;
	private String nombre;
	private GrupoIngrediente grupo;
	
	public Ingrediente() {}
	
	public Ingrediente(int id, String nombre, GrupoIngrediente grupo) {
		this.id = id;
		this.nombre = nombre;
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
	public GrupoIngrediente getGrupo() {
		return grupo;
	}
	public void setGrupo(GrupoIngrediente grupo) {
		this.grupo = grupo;
	}
	
	
}
