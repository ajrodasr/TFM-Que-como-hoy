package com.uoc.tfm.qch.recetas.dto;

import java.time.LocalDateTime;

import com.uoc.tfm.qch.recetas.domain.Receta.Dificultad;

public class RecetaHistoricoDTO {
	
	private int id;
	private String titulo;
	private String imagen;
	private String instrucciones;
	private LocalDateTime fechaCreacion;
	private int tiempo;
	private int comensales;
	private Dificultad dificultad;
	private int likes;
	private UsuarioRecetaDTO usuario;
	private TipoRecetaDTO tipoReceta;
	private boolean publicada;
	private LocalDateTime fechaConsumicion;
	
	public RecetaHistoricoDTO() {}
	
	public RecetaHistoricoDTO(int id, String titulo, String imagen, String instrucciones,
			LocalDateTime fechaCreacion, int tiempo, int comensales, Dificultad dificultad, int likes,
			UsuarioRecetaDTO usuario, TipoRecetaDTO tipoReceta, boolean publicada, LocalDateTime fechaConsumicion) {
		this.id = id;
		this.titulo = titulo;
		this.imagen = imagen;
		this.instrucciones = instrucciones;
		this.fechaCreacion = fechaCreacion;
		this.tiempo = tiempo;
		this.comensales = comensales;
		this.dificultad = dificultad;
		this.likes = likes;
		this.usuario = usuario;
		this.tipoReceta = tipoReceta;
		this.publicada = publicada;
		this.fechaConsumicion = fechaConsumicion;
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

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getInstrucciones() {
		return instrucciones;
	}

	public void setInstrucciones(String instrucciones) {
		this.instrucciones = instrucciones;
	}

	public LocalDateTime getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(LocalDateTime fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public int getTiempo() {
		return tiempo;
	}

	public void setTiempo(int tiempo) {
		this.tiempo = tiempo;
	}

	public int getComensales() {
		return comensales;
	}

	public void setComensales(int comensales) {
		this.comensales = comensales;
	}

	public Dificultad getDificultad() {
		return dificultad;
	}

	public void setDificultad(Dificultad dificultad) {
		this.dificultad = dificultad;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public UsuarioRecetaDTO getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioRecetaDTO usuario) {
		this.usuario = usuario;
	}

	public TipoRecetaDTO getTipoReceta() {
		return tipoReceta;
	}

	public void setTipoReceta(TipoRecetaDTO tipoReceta) {
		this.tipoReceta = tipoReceta;
	}
	
	public boolean isPublicada() {
		return publicada;
	}

	public void setPublicada(boolean publicada) {
		this.publicada = publicada;
	}

	public LocalDateTime getFechaConsumicion() {
		return fechaConsumicion;
	}

	public void setFechaConsumicion(LocalDateTime fechaConsumicion) {
		this.fechaConsumicion = fechaConsumicion;
	}
}
