package com.uoc.tfm.qch.security.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.github.pagehelper.Page;
import com.uoc.tfm.qch.security.domain.Rol;
import com.uoc.tfm.qch.security.domain.Usuario;
import com.uoc.tfm.qch.security.dto.UsuarioListadoDTO;

@Mapper
public interface UsuarioRepository {
	Usuario getUsuarioById(String idUsuario);
	Usuario getUsuarioByEmail(String email);
	Usuario getUsuarioByIdOrEmail(String idOrEmail);
	Usuario getUsuarioByTokenPassword(String tokenPassword);
	Page<UsuarioListadoDTO> getUsuarios(String term);
	void saveUsuario(Usuario usuario);
	void setAdminUsuario(String idUsuario);
	void updateUsuario(Usuario usuario);
	void saveRolUsuario(String idUsuario, List<Rol> roles);
	void unsetAdminUsuario(String idUsuario);
}
