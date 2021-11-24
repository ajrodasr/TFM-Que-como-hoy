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
	
	public RecetaDTO getRecetaById(int idReceta) {
		Receta receta = recetaRepository.getRecetaById(idReceta);
		RecetaDTO dto = new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes(), receta.isPublicada());
		return dto;
	}
	
	public List<RecetaDTO> getRecetas(){
		List<Receta> recetas = recetaRepository.getRecetas();
		List<RecetaDTO> dto = new ArrayList<RecetaDTO>();
		for (Receta receta : recetas) {
			dto.add(new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes(), receta.isPublicada()));
		}
		return dto;
	}
	
	public List<RecetaDTO> getRecetasByUsuario(String idUsuario){
		List<Receta> recetas = recetaRepository.getRecetasByUsuario(idUsuario);
		List<RecetaDTO> dto = new ArrayList<RecetaDTO>();
		for (Receta receta : recetas) {
			dto.add(new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes(), receta.isPublicada()));
		}
		return dto;
	}
	
	public List<RecetaDTO> getRecetasPublicadas(){
		List<Receta> recetas = recetaRepository.getRecetasPublicadas();
		List<RecetaDTO> dto = new ArrayList<RecetaDTO>();
		for (Receta receta : recetas) {
			dto.add(new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes(), receta.isPublicada()));
		}
		return dto;
	}
	
	@Transactional
	public void saveReceta(RecetaDTO receta) {
		Receta rec = new Receta(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes(), receta.isPublicada());
		recetaRepository.saveReceta(rec);
		recetaRepository.saveIngredientesReceta(rec.getId(), rec.getIngredientes());
	}
	
	public void updateReceta(RecetaDTO receta) {
		Receta rec = new Receta(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes(), receta.isPublicada());
		recetaRepository.updateReceta(rec);
	}
	
	public void deleteReceta(int idReceta) {
		recetaRepository.deleteReceta(Integer.valueOf(idReceta));
	}
	
	public void publicarReceta(int idReceta) {
		recetaRepository.publicarReceta(Integer.valueOf(idReceta));
	}
	
	public void despublicarReceta(int idReceta) {
		recetaRepository.despublicarReceta(Integer.valueOf(idReceta));
	}
	
	public void saveIngredienteReceta(int idReceta, IngredienteRecetaDTO ingrediente) {
		recetaRepository.saveIngredienteReceta(Integer.valueOf(idReceta), ingrediente);
	}
	
	public void deleteIngredienteReceta(int idReceta, String idIngrediente) {
		recetaRepository.deleteIngredienteReceta(Integer.valueOf(idReceta), Integer.valueOf(idReceta));
	}
	
	public List<Integer> getLikesByUsuario(String idUsuario){
		return recetaRepository.getLikesByUsuario(idUsuario);
	}
	
	public void saveLike(LikeRecetaDTO like) {
		recetaRepository.saveLike(like.getIdUsuario(), like.getIdReceta());
	}
	
	public void deleteLike(LikeRecetaDTO like) {
		recetaRepository.deleteLike(like.getIdUsuario(), like.getIdReceta());
	}
	
}
