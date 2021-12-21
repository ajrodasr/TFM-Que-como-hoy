package com.uoc.tfm.qch.ingredientes.controller;

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

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.uoc.tfm.qch.ingredientes.domain.GrupoIngrediente;
import com.uoc.tfm.qch.ingredientes.dto.GrupoIngredienteConsumidoDTO;
import com.uoc.tfm.qch.ingredientes.dto.IngredienteDTO;
import com.uoc.tfm.qch.ingredientes.service.IngredienteService;

@RestController
@RequestMapping("/api/ingredientes")
@CrossOrigin
public class IngredienteController {

	@Autowired
	IngredienteService ingredienteService;
	
	@GetMapping
	public ResponseEntity<PageInfo<IngredienteDTO>> getIngredientesByGrupo(
			@RequestParam(required = false) Integer idGrupo,
			@RequestParam(required = false, defaultValue = "") String term,
			@RequestParam(required = false, defaultValue = "1") int pageNum,
			@RequestParam(required = false, defaultValue = "16") int pageSize) {
		
		PageHelper.startPage(pageNum, pageSize);
		Page<IngredienteDTO> ingredientes = ingredienteService.getIngredientesFiltrados(idGrupo, term);
		PageInfo<IngredienteDTO> info = new PageInfo<IngredienteDTO>(ingredientes);
		return new ResponseEntity<PageInfo<IngredienteDTO>>(info, HttpStatus.OK);
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
	
	@GetMapping("/filter")
	public ResponseEntity<List<IngredienteDTO>> getIngredientesFilterNombre(@RequestParam String term) {
		List<IngredienteDTO> ingredientes = ingredienteService.getIngredientesFilterNombre(term);
		return new ResponseEntity<List<IngredienteDTO>>(ingredientes, HttpStatus.OK);
	}
	
	@GetMapping("/mas-usados-usuario")
	public ResponseEntity<List<IngredienteDTO>> getIngredientesMasUsadosUsuario(@RequestParam String idUsuario) {
		List<IngredienteDTO> ingredientes = ingredienteService.getIngredientesMasUsadosUsuario(idUsuario);
		return new ResponseEntity<List<IngredienteDTO>>(ingredientes, HttpStatus.OK);
	}
	
	@GetMapping("/grupos")
	public ResponseEntity<List<GrupoIngrediente>> getGrupos() {
		List<GrupoIngrediente> grupos = ingredienteService.getGrupos();
		return new ResponseEntity<List<GrupoIngrediente>>(grupos, HttpStatus.OK);
	}
	
	@GetMapping("/grupos-consumidos")
	public ResponseEntity<List<GrupoIngredienteConsumidoDTO>> getGruposConsumidos(@RequestParam String idUsuario) {
		List<GrupoIngredienteConsumidoDTO> grupos = ingredienteService.getGruposConsumidos(idUsuario);
		return new ResponseEntity<List<GrupoIngredienteConsumidoDTO>>(grupos, HttpStatus.OK);
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
		if(ing != null && ingrediente.getId() != ing.getId()) {
			return new ResponseEntity("El ingrediente ya existe", HttpStatus.BAD_REQUEST);
		}
		ingredienteService.updateIngrediente(ingrediente);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Ingrediente actualizado"), HttpStatus.OK);
	}
}
