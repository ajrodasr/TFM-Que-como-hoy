package com.uoc.tfm.qch.security.dto;

import com.uoc.tfm.qch.security.domain.Usuario;

public class PerfilUsuarioDTO {
	
	private String id;
	private String nombre;
	private String apellido1;
	private String apellido2;
	private String email;
	
	public PerfilUsuarioDTO() {}

	public PerfilUsuarioDTO(String id, String nombre, String apellido1, String apellido2, String email) {
		this.id = id;
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		this.email = email;
	}
	
	public PerfilUsuarioDTO(Usuario usuario) {
		this.id = usuario.getId();
		this.nombre = usuario.getNombre();
		this.apellido1 = usuario.getApellido1();
		this.apellido2 = usuario.getApellido2();
		this.email = usuario.getEmail();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido1() {
		return apellido1;
	}

	public void setApellido1(String apellido1) {
		this.apellido1 = apellido1;
	}

	public String getApellido2() {
		return apellido2;
	}

	public void setApellido2(String apellido2) {
		this.apellido2 = apellido2;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
