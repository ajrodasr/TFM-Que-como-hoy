package com.uoc.tfm.qch.security.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uoc.tfm.qch.security.domain.Usuario;
import com.uoc.tfm.qch.security.dto.CambiarPasswordPerfilDTO;
import com.uoc.tfm.qch.security.dto.PerfilUsuarioDTO;
import com.uoc.tfm.qch.security.service.UsuarioService;

@RestController
@RequestMapping("/perfil-usuario")
@CrossOrigin
public class UsuarioController {

	@Autowired
	PasswordEncoder passwordEncoder;
	
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
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("/cambiar-password")
	public ResponseEntity<?> changePassword(@RequestBody CambiarPasswordPerfilDTO dto){
		
		if(!dto.getPassword().equals(dto.getConfirmPassword())) {
			return new ResponseEntity("Las contraseñas no coinciden", HttpStatus.BAD_REQUEST);
		}
		
		Usuario usuario = usuarioService.getUsuarioById(dto.getIdUsuario());
		if(usuario == null) {
			return new ResponseEntity("No existe un usuario con esas credenciales", HttpStatus.BAD_REQUEST);
		}
		
		String newPassword = passwordEncoder.encode(dto.getPassword());
		usuario.setPassword(newPassword);
		usuario.setTokenPassword(null);
		usuarioService.update(usuario);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Contraseña actualizada"), HttpStatus.OK);
	}
}
