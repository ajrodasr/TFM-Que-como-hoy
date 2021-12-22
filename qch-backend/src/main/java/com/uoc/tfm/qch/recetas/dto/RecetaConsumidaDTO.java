package com.uoc.tfm.qch.recetas.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RecetaConsumidaDTO {
	
	private String idUsuario;
	private Integer idReceta;
	private LocalDateTime fechaConsumicion;
	
	public RecetaConsumidaDTO() {}
	
	@JsonCreator
	public RecetaConsumidaDTO(@JsonProperty ("idUsuario") String idUsuario, @JsonProperty ("idReceta") Integer idReceta, @JsonProperty ("fechaConsumicion") String fechaConsumicion) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
		LocalDateTime date = LocalDateTime.parse(fechaConsumicion, formatter);
		
		this.idUsuario = idUsuario;
		this.idReceta = idReceta;
		this.fechaConsumicion = date;
	}

	public RecetaConsumidaDTO(String idUsuario, Integer idReceta, LocalDateTime fechaConsumicion) {
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

	public LocalDateTime getFechaConsumicion() {
		return fechaConsumicion;
	}

	public void setFechaConsumicion(LocalDateTime fechaConsumicion) {
		this.fechaConsumicion = fechaConsumicion;
	}
	
}