package com.uoc.tfm.qch.recetas.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uoc.tfm.qch.recetas.domain.Receta;
import com.uoc.tfm.qch.recetas.dto.IngredienteRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.LikeRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaDTO;

@Service
@Transactional
public class RecetaService {
	
	@Autowired
	RecetaRepository recetaRepository;
	
	public RecetaDTO getRecetaById(String idReceta) {
		Receta receta = recetaRepository.getRecetaById(Integer.valueOf(idReceta));
		RecetaDTO dto = new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes());
		return dto;
	}
	
	public List<RecetaDTO> getRecetas(){
		List<Receta> recetas = recetaRepository.getRecetas();
		List<RecetaDTO> dto = new ArrayList<RecetaDTO>();
		for (Receta receta : recetas) {
			dto.add(new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes()));
		}
		return dto;
	}
	
	public List<RecetaDTO> getRecetasByUsuario(String idUsuario){
		List<Receta> recetas = recetaRepository.getRecetasByUsuario(idUsuario);
		List<RecetaDTO> dto = new ArrayList<RecetaDTO>();
		for (Receta receta : recetas) {
			dto.add(new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes()));
		}
		return dto;
	}
	
	public List<RecetaDTO> getRecetasPublicadas(){
		List<Receta> recetas = recetaRepository.getRecetasPublicadas();
		List<RecetaDTO> dto = new ArrayList<RecetaDTO>();
		for (Receta receta : recetas) {
			dto.add(new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes()));
		}
		return dto;
	}
	
	@Transactional
	public void saveReceta(RecetaDTO receta) {
		Receta rec = new Receta(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes());
		recetaRepository.saveReceta(rec);
		recetaRepository.saveIngredientesReceta(rec.getId(), rec.getIngredientes());
	}
	
	public void updateReceta(RecetaDTO receta) {
		Receta rec = new Receta(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes());
		recetaRepository.updateReceta(rec);
	}
	
	public void deleteReceta(String idReceta) {
		recetaRepository.deleteReceta(Integer.valueOf(idReceta));
	}
	
	public void publicarReceta(String idReceta) {
		recetaRepository.publicarReceta(Integer.valueOf(idReceta));
	}
	
	public void despublicarReceta(String idReceta) {
		recetaRepository.despublicarReceta(Integer.valueOf(idReceta));
	}
	
	public void saveIngredienteReceta(String idReceta, IngredienteRecetaDTO ingrediente) {
		recetaRepository.saveIngredienteReceta(Integer.valueOf(idReceta), ingrediente);
	}
	
	public void deleteIngredienteReceta(String idReceta, String idIngrediente) {
		recetaRepository.deleteIngredienteReceta(Integer.valueOf(idReceta), Integer.valueOf(idReceta));
	}
	
	public List<Integer> getLikesByUsuario(String idUsuario){
		return recetaRepository.getLikesByUsuario(idUsuario);
	}
	
	public void saveLike(LikeRecetaDTO like) {
		recetaRepository.saveLike(like.getIdUsuario(), Integer.parseInt(like.getIdReceta()));
	}
	
	public void deleteLike(LikeRecetaDTO like) {
		recetaRepository.deleteLike(like.getIdUsuario(), Integer.parseInt(like.getIdReceta()));
	}
	
}
