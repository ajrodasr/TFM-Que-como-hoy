package com.uoc.tfm.qch.ingredientes.domain;

public class GrupoIngrediente {
	
	private int id;
	private String nombre;
	private int racionesSemana;
	
	public GrupoIngrediente() {}
	
	public GrupoIngrediente(int id, String nombre, int racionesSemana) {
		this.id = id;
		this.nombre = nombre;
		this.racionesSemana = racionesSemana;
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
	public int getRacionesSemana() {
		return racionesSemana;
	}
	public void setRacionesSemana(int racionesSemana) {
		this.racionesSemana = racionesSemana;
	}
	
	
}
