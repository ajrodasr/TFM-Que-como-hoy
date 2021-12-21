package com.uoc.tfm.qch.recetas.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RecetaConsumidaDTO {
	
	private String idUsuario;
	private Integer idReceta;
	private LocalDate fechaConsumicion;
	
	public RecetaConsumidaDTO() {}
	
	@JsonCreator
	public RecetaConsumidaDTO(@JsonProperty ("idUsuario") String idUsuario, @JsonProperty ("idReceta") Integer idReceta, @JsonProperty ("fechaConsumicion") String fechaConsumicion) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate date = LocalDate.parse(fechaConsumicion, formatter);
		
		this.idUsuario = idUsuario;
		this.idReceta = idReceta;
		this.fechaConsumicion = date;
	}

	public RecetaConsumidaDTO(String idUsuario, Integer idReceta, LocalDate fechaConsumicion) {
		this.idUsuario = idUsuario;
		this.idReceta = idReceta;
		this.fechaConsumicion = fechaConsumicion;
	}

	public String getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(String idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Integer getIdReceta() {
		return idReceta;
	}

	public void setIdReceta(Integer idReceta) {
		this.idReceta = idReceta;
	}

	public LocalDate getFechaConsumicion() {
		return fechaConsumicion;
	}

	public void setFechaConsumicion(LocalDate fechaConsumicion) {
		this.fechaConsumicion = fechaConsumicion;
	}
	
}