package com.uoc.tfm.qch.security.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uoc.tfm.qch.security.dto.PerfilUsuarioDTO;
import com.uoc.tfm.qch.security.service.UsuarioService;

@RestController
@RequestMapping("/perfil-usuario")
@CrossOrigin
public class UsuarioController {

	@Autowired
	UsuarioService usuarioService;
	
	@GetMapping
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ResponseEntity<PerfilUsuarioDTO> getPerfilUsuario(@RequestParam String idUsuario) {
		PerfilUsuarioDTO perfil = usuarioService.getPerfilUsuario(idUsuario);
		if (perfil == null) {
			return new ResponseEntity("El usuario no existe", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<PerfilUsuarioDTO>(perfil, HttpStatus.OK);
	}
	
	@PostMapping("/actualizar-datos")
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ResponseEntity<?> getPerfilUsuario(@RequestBody PerfilUsuarioDTO perfilUsuario) {
		if (!usuarioService.existsUsuarioById(perfilUsuario.getId())) {
			return new ResponseEntity("El usuario no existe", HttpStatus.BAD_REQUEST);
		}
		usuarioService.updatePerfilUsuario(perfilUsuario);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Datos actualizados"), HttpStatus.OK);
	}
}
