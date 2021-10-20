package com.uoc.tfm.qch.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.uoc.tfm.qch.security.domain.Usuario;
import com.uoc.tfm.qch.security.domain.UsuarioPrincipal;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	UsuarioService usuarioService;

	@Override
	public UserDetails loadUserByUsername(String idOrEmail) throws UsernameNotFoundException {
		Usuario usuario = usuarioService.getUsuarioByIdOrEmail(idOrEmail);
		return UsuarioPrincipal.build(usuario);
	}

}
