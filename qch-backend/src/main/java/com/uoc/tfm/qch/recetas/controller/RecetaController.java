package com.uoc.tfm.qch.recetas.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

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

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.uoc.tfm.qch.recetas.dto.IngredienteRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.LikeRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaConsumidaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaFiltradaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaHistoricoDTO;
import com.uoc.tfm.qch.recetas.dto.TipoRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.UsuarioRecetaDTO;
import com.uoc.tfm.qch.recetas.service.RecetaService;

@RestController
@RequestMapping("/api/recetas")
@CrossOrigin
public class RecetaController {

	@Autowired
	RecetaService recetaService;
	
	@Autowired
	Cloudinary cloudinary;
	
	@GetMapping
	public ResponseEntity<PageInfo<RecetaFiltradaDTO>> getRecetasFiltradas(
			@RequestParam(required = false, defaultValue = "") String tituloReceta,
			@RequestParam(required = false) Integer tipoReceta,
			@RequestParam(required = false) String idCreador,
			@RequestParam(required = false) String dificultad,
			@RequestParam(required = false) Integer comensales,
			@RequestParam(required = false) Integer tiempo,
			@RequestParam(required = false, defaultValue = "", value="ingrediente") Integer[] ingredientes,
			@RequestParam(required = false, defaultValue = "1") Integer pageNum,
			@RequestParam(required = false, defaultValue = "9") Integer pageSize,
			@RequestParam(required = false, defaultValue = "5") Integer order,
			@RequestParam(required = false, defaultValue = "true") Boolean desc) {
		PageHelper.startPage(pageNum, pageSize);
		Page<RecetaFiltradaDTO> recetas = recetaService.getRecetasPublicadasPaginadas(tituloReceta, tipoReceta, idCreador, dificultad, comensales, tiempo, Arrays.asList(ingredientes), order, desc);
		PageInfo<RecetaFiltradaDTO> info = new PageInfo<RecetaFiltradaDTO>(recetas);
		return new ResponseEntity<PageInfo<RecetaFiltradaDTO>>(info, HttpStatus.OK);
	}
	
	@GetMapping("recomendadas")
	public ResponseEntity<PageInfo<RecetaFiltradaDTO>> getRecetasRecomendadas(
			@RequestParam String idUsuario,
			@RequestParam(required = false, defaultValue = "") String tituloReceta,
			@RequestParam(required = false) Integer tipoReceta,
			@RequestParam(required = false) String idCreador,
			@RequestParam(required = false) String dificultad,
			@RequestParam(required = false) Integer comensales,
			@RequestParam(required = false) Integer tiempo,
			@RequestParam(required = false, defaultValue = "", value="ingrediente") Integer[] ingredientes,
			@RequestParam(required = false, defaultValue = "1") Integer pageNum,
			@RequestParam(required = false, defaultValue = "9") Integer pageSize,
			@RequestParam(required = false, defaultValue = "10") Integer order,
			@RequestParam(required = false, defaultValue = "true") Boolean desc) {
		PageHelper.startPage(pageNum, pageSize);
		Page<RecetaFiltradaDTO> recetas = recetaService.getRecetasRecomendadasPaginadas(idUsuario, tituloReceta, tipoReceta, idCreador, dificultad, comensales, tiempo, Arrays.asList(ingredientes), order, desc);
		PageInfo<RecetaFiltradaDTO> info = new PageInfo<RecetaFiltradaDTO>(recetas);
		return new ResponseEntity<PageInfo<RecetaFiltradaDTO>>(info, HttpStatus.OK);
	}
	
	@GetMapping("historico-recetas")
	public ResponseEntity<PageInfo<RecetaHistoricoDTO>> getHistoricoRecetas(
			@RequestParam String idUsuario, 
			@RequestParam(required = false, defaultValue = "1") Integer pageNum,
			@RequestParam(required = false, defaultValue = "9") Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		Page<RecetaHistoricoDTO> recetas = recetaService.getHistoricoRecetas(idUsuario);
		PageInfo<RecetaHistoricoDTO> info = new PageInfo<RecetaHistoricoDTO>(recetas);
		return new ResponseEntity<PageInfo<RecetaHistoricoDTO>>(info, HttpStatus.OK);
	}
	
	@GetMapping("mas-consumidas-usuario")
	public ResponseEntity<List<RecetaFiltradaDTO>> getRecetasMasConsumidasUsuario(@RequestParam String idUsuario) {
		List<RecetaFiltradaDTO> recetas = recetaService.getRecetasMasConsumidasUsuario(idUsuario);
		return new ResponseEntity<List<RecetaFiltradaDTO>>(recetas, HttpStatus.OK);
	}
	
	@GetMapping("usuario")
	public ResponseEntity<PageInfo<RecetaFiltradaDTO>> getRecetasByUsuario(
			@RequestParam(required = false, defaultValue = "") String tituloReceta,
			@RequestParam(required = false) Integer tipoReceta,
			@RequestParam String idCreador,
			@RequestParam(required = false) String dificultad,
			@RequestParam(required = false) Integer comensales,
			@RequestParam(required = false) Integer tiempo,
			@RequestParam(required = false, defaultValue = "", value="ingrediente") Integer[] ingredientes,
			@RequestParam(required = false, defaultValue = "1") Integer pageNum,
			@RequestParam(required = false, defaultValue = "9") Integer pageSize,
			@RequestParam(required = false, defaultValue = "5") Integer order,
			@RequestParam(required = false, defaultValue = "true") Boolean desc) {
		PageHelper.startPage(pageNum, pageSize);
		Page<RecetaFiltradaDTO> recetas = recetaService.getRecetasByUsuario(tituloReceta, tipoReceta, idCreador, dificultad, comensales, tiempo, Arrays.asList(ingredientes), order, desc);
		PageInfo<RecetaFiltradaDTO> info = new PageInfo<RecetaFiltradaDTO>(recetas);
		return new ResponseEntity<PageInfo<RecetaFiltradaDTO>>(info, HttpStatus.OK);
	}
	
	@GetMapping("usuarios")
	public ResponseEntity<List<UsuarioRecetaDTO>> getUsuariosRecetas(@RequestParam String term) {
		List<UsuarioRecetaDTO> usuarios = recetaService.getUsuariosRecetasFilter(term);
		return new ResponseEntity<List<UsuarioRecetaDTO>>(usuarios, HttpStatus.OK);
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
		try {
			recetaService.saveReceta(receta);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity("Error al guardar la receta", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(Collections.singletonMap("mensaje", "Receta guardada correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("receta-consumida")
	public ResponseEntity<?> saveRecetaConsumida(@RequestBody RecetaConsumidaDTO recetaConsumida) {
		RecetaDTO receta = recetaService.getRecetaById(recetaConsumida.getIdReceta());
		if(receta == null) {
			return new ResponseEntity("Esta receta no existe", HttpStatus.BAD_REQUEST);
		} 
		try {
			recetaService.saveRecetaConsumida(recetaConsumida);
		} catch (Exception e) {
			return new ResponseEntity("Esta receta ya se ha añadido a esta fecha", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(Collections.singletonMap("mensaje", "Receta añadida a 'consumidas'"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("receta-consumida/update")
	public ResponseEntity<?> updateRecetaConsumida(@RequestBody RecetaConsumidaDTO recetaConsumida, @RequestParam String nuevaFecha) {
		RecetaDTO receta = recetaService.getRecetaById(recetaConsumida.getIdReceta());
		if(receta == null) {
			return new ResponseEntity("Esta receta no existe", HttpStatus.BAD_REQUEST);
		} 
		try {
			recetaService.updateRecetaConsumida(recetaConsumida, nuevaFecha);
		} catch (Exception e) {
			return new ResponseEntity("Esta receta ya se ha añadido a esta fecha", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(Collections.singletonMap("mensaje", "Fecha de consumición actualizada"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("receta-consumida/delete")
	public ResponseEntity<?> deleteRecetaConsumida(@RequestBody RecetaConsumidaDTO recetaConsumida) {
		RecetaDTO receta = recetaService.getRecetaById(recetaConsumida.getIdReceta());
		if(receta == null) {
			return new ResponseEntity("Esta receta no existe", HttpStatus.BAD_REQUEST);
		} 
		try {
			recetaService.deleteRecetaConsumida(recetaConsumida);
		} catch (Exception e) {
			return new ResponseEntity("No existe esta receta con esta fecha", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(Collections.singletonMap("mensaje", "Receta eliminada del historico de consumición"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("publicar")
	public ResponseEntity<?> publicarReceta(@RequestParam int idReceta) {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.publicarReceta(idReceta);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Receta publicada correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("despublicar")
	public ResponseEntity despublicarReceta(@RequestParam int idReceta) {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.despublicarReceta(idReceta);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Receta despublicada correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("editar")
	public ResponseEntity<?> updateReceta(@RequestBody RecetaDTO receta) {
		RecetaDTO dto = recetaService.getRecetaById(receta.getId());
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		try {
			recetaService.updateReceta(receta);
		} catch (IOException e) {
			return new ResponseEntity("Error al editar la receta", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(Collections.singletonMap("mensaje", "Receta actualizada correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("eliminar")
	public ResponseEntity<?> updateReceta(@RequestParam int idReceta) {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.deleteReceta(idReceta);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Receta eliminada correctamente"), HttpStatus.OK);
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
		return new ResponseEntity(Collections.singletonMap("mensaje", "Ingrediente añadido correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("quita-ingrediente")
	public ResponseEntity<?> deleteIngredienteReceta(@RequestParam int idReceta, @RequestParam int idIngrediente) {
		RecetaDTO dto = recetaService.getRecetaById(idReceta);
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.deleteIngredienteReceta(idReceta, idIngrediente);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Ingrediente eliminado correctamente"), HttpStatus.OK);
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
		return new ResponseEntity(Collections.singletonMap("mensaje", "Like añadido correctamente"), HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("dislike")
	public ResponseEntity<?> dislikeReceta(@RequestBody LikeRecetaDTO like) {
		RecetaDTO dto = recetaService.getRecetaById(like.getIdReceta());
		if(dto == null) {
			return new ResponseEntity("La receta no existe", HttpStatus.BAD_REQUEST);
		} 
		recetaService.deleteLike(like);
		return new ResponseEntity(Collections.singletonMap("mensaje", "Like eliminado correctamente"), HttpStatus.OK);
	}
	
	@GetMapping("tipos")
	public ResponseEntity<List<TipoRecetaDTO>> getTiposReceta() {
		List<TipoRecetaDTO> tipos = recetaService.getTiposReceta();
		return new ResponseEntity<List<TipoRecetaDTO>>(tipos, HttpStatus.OK);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("upload-image")
	public ResponseEntity<?> uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
		Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
				  ObjectUtils.emptyMap());
		String publicId = uploadResult.get("public_id").toString();
		return new ResponseEntity(Collections.singletonMap("publicID", publicId), HttpStatus.OK);
	}
}
