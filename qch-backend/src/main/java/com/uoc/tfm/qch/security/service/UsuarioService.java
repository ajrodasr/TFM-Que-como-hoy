package com.uoc.tfm.qch.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.uoc.tfm.qch.security.domain.Usuario;
import com.uoc.tfm.qch.security.dto.PerfilUsuarioDTO;
import com.uoc.tfm.qch.security.dto.UsuarioListadoDTO;

@Service
@Transactional
public class UsuarioService {
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	public Usuario getUsuarioById (String idUsuario) {
		return usuarioRepository.getUsuarioById(idUsuario);
	}
	
	public boolean existsUsuarioById(String idUsuario) {
		return usuarioRepository.getUsuarioById(idUsuario) != null;
	}
	
	public Usuario getUsuarioByEmail (String email) {
		return usuarioRepository.getUsuarioByEmail(email);
	}
	
	public Usuario getUsuarioByIdOrEmail (String idOrEmail) {
		return usuarioRepository.getUsuarioByIdOrEmail(idOrEmail);
	}
	
	public boolean existsUsuarioByEmail(String email) {
		return usuarioRepository.getUsuarioByEmail(email) != null;
	}
	
	public void update(Usuario usuario) {
		usuarioRepository.updateUsuario(usuario);
	}
	
	public Usuario getUsuarioByTokenPassword (String tokenPassword) {
		return usuarioRepository.getUsuarioByTokenPassword(tokenPassword);
	}
	
	public Page<UsuarioListadoDTO> getUsuarios(String term){
		return usuarioRepository.getUsuarios(term);
	}
	
	public PerfilUsuarioDTO getPerfilUsuario(String idUsuario) {
		Usuario usuario = usuarioRepository.getUsuarioById(idUsuario);
		if(usuario == null) {
			return null;
		}
		return new PerfilUsuarioDTO(usuario);
	}
	
	public void save(Usuario usuario) {
		usuarioRepository.saveUsuario(usuario);
		usuarioRepository.saveRolUsuario(usuario.getId(), usuario.getRoles());
	}
	
	public void setAdminUsuario(String idUsuario) {
		usuarioRepository.setAdminUsuario(idUsuario);
	}
	
	public void updatePerfilUsuario(PerfilUsuarioDTO perfilUsuario) {
		Usuario usuario = usuarioRepository.getUsuarioById(perfilUsuario.getId());
		usuario.setNombre(perfilUsuario.getNombre());
		usuario.setApellido1(perfilUsuario.getApellido1());
		usuario.setApellido2(perfilUsuario.getApellido2());
		usuario.setEmail(perfilUsuario.getEmail());
		usuarioRepository.updateUsuario(usuario);
	}
	
	public void unsetAdminUsuario(String idUsuario) {
		usuarioRepository.unsetAdminUsuario(idUsuario);
	}
	
}
