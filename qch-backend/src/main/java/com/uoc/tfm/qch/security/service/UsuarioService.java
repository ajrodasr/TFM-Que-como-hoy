package com.uoc.tfm.qch.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uoc.tfm.qch.security.domain.Usuario;

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
	
	public void save(Usuario usuario) {
		usuarioRepository.saveUsuario(usuario);
		usuarioRepository.saveRolUsuario(usuario.getId(), usuario.getRoles());
	}
	
}
