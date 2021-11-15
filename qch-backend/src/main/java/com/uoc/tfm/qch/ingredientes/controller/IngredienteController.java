package com.uoc.tfm.qch.ingredientes.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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

import com.uoc.tfm.qch.ingredientes.domain.GrupoIngrediente;
import com.uoc.tfm.qch.ingredientes.dto.IngredienteDTO;
import com.uoc.tfm.qch.ingredientes.service.IngredienteService;

@RestController
@RequestMapping("/api/ingredientes")
@CrossOrigin
public class IngredienteController {

	@Autowired
	IngredienteService ingredienteService;
	
	@GetMapping
	public ResponseEntity<List<IngredienteDTO>> getIngredientesByGrupo(@RequestParam(required = false, defaultValue = "-1") int idGrupo) {
		List<IngredienteDTO> ingredientes = new ArrayList<IngredienteDTO>();
		if(idGrupo == -1) {
			ingredientes = ingredienteService.getIngredientes();
		} else {
			ingredientes = ingredienteService.getIngredientesByGrupo(idGrupo);
		}
		return new ResponseEntity<List<IngredienteDTO>>(ingredientes, HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GetMapping("ingrediente")
	public ResponseEntity<IngredienteDTO> getIngredienteById(@RequestParam int idIngrediente) {
		IngredienteDTO ingrediente = ingredienteService.getIngredienteById(idIngrediente);
		if(ingrediente == null) {
			return new ResponseEntity("El ingrediente no existe", HttpStatus.BAD_REQUEST);
		} 
		return new ResponseEntity<IngredienteDTO>(ingrediente, HttpStatus.OK);
	}
	
	@GetMapping("/grupos")
	public ResponseEntity<List<GrupoIngrediente>> getGrupos() {
		List<GrupoIngrediente> grupos = new ArrayList<GrupoIngrediente>();
		grupos = ingredienteService.getGrupos();
		return new ResponseEntity<List<GrupoIngrediente>>(grupos, HttpStatus.OK);
	}
	
	@PostMapping("nuevo")
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ResponseEntity<?> nuevoIngrediente (@RequestBody IngredienteDTO ingrediente) {
		if(ingredienteService.existsIngredienteByNombre(ingrediente.getNombre())) {
			return new ResponseEntity("El ingrediente ya existe", HttpStatus.BAD_REQUEST);
		}
		ingredienteService.saveIngrediente(ingrediente);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Ingrediente creado"), HttpStatus.CREATED);
	}
	
	@PostMapping("actualizar")
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ResponseEntity<?> actualizarIngrediente (@RequestBody IngredienteDTO ingrediente) {
		if(!ingredienteService.existsIngredienteById(ingrediente.getId())) {
			return new ResponseEntity("El ingrediente no existe", HttpStatus.BAD_REQUEST);
		}
		IngredienteDTO ing = ingredienteService.getIngredienteByNombre(ingrediente.getNombre());
		if(ingrediente.getId() != ing.getId()) {
			return new ResponseEntity("El ingrediente ya existe", HttpStatus.BAD_REQUEST);
		}
		ingredienteService.updateIngrediente(ingrediente);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Ingrediente actualizado"), HttpStatus.OK);
	}
}
