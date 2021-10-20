package com.uoc.tfm.qch.security.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.uoc.tfm.qch.security.domain.Rol;
import com.uoc.tfm.qch.security.domain.Usuario;

@Mapper
public interface UsuarioRepository {
	
	Usuario getUsuarioById(String idUsuario);
	Usuario getUsuarioByEmail(String email);
	Usuario getUsuarioByIdOrEmail(String idOrEmail);
	Usuario getUsuarioByTokenPassword(String tokenPassword);
	void saveUsuario(Usuario usuario);
	void updateUsuario(Usuario usuario);
	void saveRolUsuario(String idUsuario, List<Rol> roles);
}
