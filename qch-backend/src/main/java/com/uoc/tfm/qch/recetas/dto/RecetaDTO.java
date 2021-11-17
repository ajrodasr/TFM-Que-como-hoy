package com.uoc.tfm.qch.recetas.dto;

import java.time.LocalDateTime;
import java.util.List;

public class RecetaDTO {
	
	private int id;
	private String titulo;
	private String descripcion;
	private String instrucciones;
	private LocalDateTime fechaCreacion;
	private UsuarioRecetaDTO usuario;
	private TipoRecetaDTO tipoReceta;
	List<IngredienteRecetaDTO> ingredientes;
	private List<String> likes;
	
	public RecetaDTO() {}
	
	public RecetaDTO(int id, String titulo, String descripcion, String instrucciones, UsuarioRecetaDTO usuario,
			LocalDateTime fechaCreacion, List<String> likes, TipoRecetaDTO tipoReceta, List<IngredienteRecetaDTO> ingredientes) {
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.instrucciones = instrucciones;
		this.usuario = usuario;
		this.fechaCreacion = fechaCreacion;
		this.likes = likes;
		this.tipoReceta = tipoReceta;
		this.ingredientes = ingredientes;
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getInstrucciones() {
		return instrucciones;
	}

	public void setInstrucciones(String instrucciones) {
		this.instrucciones = instrucciones;
	}

	public UsuarioRecetaDTO getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioRecetaDTO usuario) {
		this.usuario = usuario;
	}

	public LocalDateTime getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(LocalDateTime fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public List<String> getLikes() {
		return likes;
	}

	public void setLikes(List<String> likes) {
		this.likes = likes;
	}

	public TipoRecetaDTO getTipoReceta() {
		return tipoReceta;
	}

	public void setTipoReceta(TipoRecetaDTO tipoReceta) {
		this.tipoReceta = tipoReceta;
	}

	public List<IngredienteRecetaDTO> getIngredientes() {
		return ingredientes;
	}

	public void setIngredientes(List<IngredienteRecetaDTO> ingredientes) {
		this.ingredientes = ingredientes;
	}
}
