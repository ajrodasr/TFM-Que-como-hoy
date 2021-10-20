package com.uoc.tfm.qch.security.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uoc.tfm.qch.security.domain.Rol;
import com.uoc.tfm.qch.security.domain.Usuario;
import com.uoc.tfm.qch.security.dto.JwtDto;
import com.uoc.tfm.qch.security.dto.LoginUsuario;
import com.uoc.tfm.qch.security.dto.NuevoUsuario;
import com.uoc.tfm.qch.security.jwt.JwtProvider;
import com.uoc.tfm.qch.security.service.RolService;
import com.uoc.tfm.qch.security.service.UsuarioService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UsuarioService usuarioService;

	@Autowired
	RolService rolService;

	@Autowired
	JwtProvider jwtProvider;
	
	@PostMapping("/nuevo")
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ResponseEntity<JwtDto> nuevo(@RequestBody NuevoUsuario nuevoUsuario) {
		if (usuarioService.existsUsuarioById(nuevoUsuario.getId())) {
			return new ResponseEntity("El usuario ya existe", HttpStatus.BAD_REQUEST);
		}
		if (usuarioService.existsUsuarioByEmail(nuevoUsuario.getEmail())) {
			return new ResponseEntity("El email ya existe", HttpStatus.BAD_REQUEST);
		}

		Usuario usuario = new Usuario(nuevoUsuario.getId(), nuevoUsuario.getNombre(), nuevoUsuario.getApellido1(),
				nuevoUsuario.getApellido2(), passwordEncoder.encode(nuevoUsuario.getPassword()),
				nuevoUsuario.getEmail());
		
		List<Rol> roles = new ArrayList<Rol>();
		roles.add(rolService.getRolByNombre("ROLE_USER"));
		for(String rolNombre : nuevoUsuario.getRoles()) {
			Rol rol = rolService.getRolByNombre(rolNombre);
			if(rol == null) {
				return new ResponseEntity("El rol: "+rolNombre+" no existe", HttpStatus.BAD_REQUEST);
			}
			roles.add(rol);
		}
		usuario.setRoles(roles);
		usuarioService.save(usuario);
		return new ResponseEntity("Usuario guardado", HttpStatus.CREATED);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@PostMapping("/login")
	public ResponseEntity<JwtDto> login (@RequestBody LoginUsuario loginUsuario){
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUsuario.getId(), loginUsuario.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);
		JwtDto jwtDto = new JwtDto(jwt);
		return new ResponseEntity(jwtDto, HttpStatus.OK);
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<JwtDto> refreshToken (@RequestBody JwtDto jwtDto) throws ParseException{
		String token = jwtProvider.refreshToken(jwtDto);
		JwtDto jwt = new JwtDto(token);
		return new ResponseEntity<JwtDto>(jwt, HttpStatus.OK);
	}
}
