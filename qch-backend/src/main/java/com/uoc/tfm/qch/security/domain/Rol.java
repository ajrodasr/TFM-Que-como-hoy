package com.uoc.tfm.qch.security.domain;

public class Rol {
	
	public enum RolNombre {
		ROLE_ADMIN,
		ROLE_USER
	}
	
	private int id;
	private RolNombre rolNombre;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public RolNombre getRolNombre() {
		return rolNombre;
	}
	public void setRolNombre(RolNombre rolNombre) {
		this.rolNombre = rolNombre;
	}
	
}
