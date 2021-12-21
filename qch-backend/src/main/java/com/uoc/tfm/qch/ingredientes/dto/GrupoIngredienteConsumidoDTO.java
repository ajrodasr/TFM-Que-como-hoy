package com.uoc.tfm.qch.ingredientes.dto;

public class GrupoIngredienteConsumidoDTO {
	
	private int id;
	private String nombre;
	private int racionesSemana;
	private int racionesConsumidas;
	private int porcentajeConsumido;
	
	public GrupoIngredienteConsumidoDTO() {}

	public GrupoIngredienteConsumidoDTO(int id, String nombre, int racionesSemana, int racionesConsumidas,
			int porcentajeConsumido) {
		this.id = id;
		this.nombre = nombre;
		this.racionesSemana = racionesSemana;
		this.racionesConsumidas = racionesConsumidas;
		this.porcentajeConsumido = porcentajeConsumido;
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

	public int getRacionesConsumidas() {
		return racionesConsumidas;
	}

	public void setRacionesConsumidas(int racionesConsumidas) {
		this.racionesConsumidas = racionesConsumidas;
	}

	public int getPorcentajeConsumido() {
		return porcentajeConsumido;
	}

	public void setPorcentajeConsumido(int porcentajeConsumido) {
		this.porcentajeConsumido = porcentajeConsumido;
	}
	
}
