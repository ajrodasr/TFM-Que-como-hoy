package com.uoc.tfm.qch.recetas.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
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
import org.springframework.web.multipart.MultipartFile;

import com.uoc.tfm.qch.recetas.dto.IngredienteRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.LikeRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaDTO;
import com.uoc.tfm.qch.recetas.dto.TipoRecetaDTO;
import com.uoc.tfm.qch.recetas.service.RecetaService;

@RestController
@RequestMapping("/api/recetas")
@CrossOrigin
public class RecetaController {

	@Autowired
	RecetaService recetaService;
	
	@GetMapping
	public ResponseEntity<List<RecetaDTO>> getRecetas() {
		List<RecetaDTO> recetas = recetaService.getRecetasPublicadas();
		return new ResponseEntity<List<RecetaDTO>>(recetas, HttpStatus.OK);
	}
	
	@GetMapping("todas")
	public ResponseEntity<List<RecetaDTO>> getAllRecetas() {
		List<RecetaDTO> recetas = recetaService.getRecetas();
		return new ResponseEntity<List<RecetaDTO>>(recetas, HttpStatus.OK);
	}
	
	@GetMapping("usuario")
	public ResponseEntity<List<RecetaDTO>> getRecetasByUsuario(@RequestParam String idUsuario) {
		List<RecetaDTO> recetas = recetaService.getRecetasByUsuario(idUsuario);
		return new ResponseEntity<List<RecetaDTO>>(recetas, HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GetMapping("receta")
	public ResponseEntity<RecetaDTO> getRecetaById(@RequestParam int idReceta) {
		RecetaDTO receta = recetaService.getRecetaById(idReceta);
		if(receta == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		return new ResponseEntity<RecetaDTO>(receta, HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("nueva")
	public ResponseEntity<?> saveReceta(@RequestBody RecetaDTO receta) {
		if(receta == null) {
			return new ResponseEntity("Error al guardar la receta", HttpStatus.BAD_REQUEST);
		} 
		recetaService.saveReceta(receta);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Receta guardada correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("publicar")
	public ResponseEntity<?> publicarReceta(@RequestParam int idReceta) {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.publicarReceta(idReceta);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Receta publicada correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("despublicar")
	public ResponseEntity despublicarReceta(@RequestParam int idReceta) {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.despublicarReceta(idReceta);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Receta despublicada correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("editar")
	public ResponseEntity<?> updateReceta(@RequestBody RecetaDTO receta) {
		RecetaDTO dto = recetaService.getRecetaById(receta.getId());
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.updateReceta(receta);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Receta actualizada correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("eliminar")
	public ResponseEntity<?> updateReceta(@RequestParam int idReceta) {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.deleteReceta(idReceta);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Receta eliminada correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("anade-ingrediente")
	public ResponseEntity<?> saveIngredienteReceta(@RequestParam int idReceta, @RequestBody IngredienteRecetaDTO ingrediente) {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		
		for(IngredienteRecetaDTO ing : dto.getIngredientes()) {
			if(ing.getId() == ingrediente.getId()) {
				return new ResponseEntity("El ingrediente ya se encuentra en la receta", HttpStatus.BAD_REQUEST);
			}
		}
		recetaService.saveIngredienteReceta(idReceta, ingrediente);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Ingrediente añadido correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("quita-ingrediente")
	public ResponseEntity<?> deleteIngredienteReceta(@RequestParam int idReceta, @RequestParam int idIngrediente) {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.deleteIngredienteReceta(idReceta, idIngrediente);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Ingrediente eliminado correctamente"), HttpStatus.OK);
	}
	
	@GetMapping("likes-usuario")
	public ResponseEntity<List<Integer>> getLikesByUsuario(@RequestParam String idUsuario) {
		List<Integer> likes = recetaService.getLikesByUsuario(idUsuario);
		return new ResponseEntity<List<Integer>>(likes, HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("like")
	public ResponseEntity<?> likeReceta(@RequestBody LikeRecetaDTO like) {
		RecetaDTO dto = recetaService.getRecetaById(like.getIdReceta());
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.saveLike(like);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Like añadido correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("dislike")
	public ResponseEntity<?> dislikeReceta(@RequestBody LikeRecetaDTO like) {
		RecetaDTO dto = recetaService.getRecetaById(like.getIdReceta());
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.deleteLike(like);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Like eliminado correctamente"), HttpStatus.OK);
	}
	
	@GetMapping("tipos")
	public ResponseEntity<List<TipoRecetaDTO>> getTiposReceta() {
		List<TipoRecetaDTO> tipos = recetaService.getTiposReceta();
		return new ResponseEntity<List<TipoRecetaDTO>>(tipos, HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("upload-image")
	public ResponseEntity<?> uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
		Path path = Path.of("src", "main","resources","static","images",file.getOriginalFilename());
		Files.write(path, file.getBytes());
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Imagen subida correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("delete-image")
	public ResponseEntity<?> deleteImage(@RequestParam int idReceta) throws IOException {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		Path path = Path.of("src", "main","resources","static","images",dto.getImagen());
		Files.delete(path);
		return new ResponseEntity(Collections.singletonMap("Mensaje", "Imagen eliminada correctamente"), HttpStatus.OK);
	}
	
	
}
