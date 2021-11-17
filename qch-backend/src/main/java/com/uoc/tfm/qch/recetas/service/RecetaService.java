package com.uoc.tfm.qch.recetas.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uoc.tfm.qch.recetas.domain.Receta;
import com.uoc.tfm.qch.recetas.dto.IngredienteRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaDTO;

@Service
@Transactional
public class RecetaService {
	
	@Autowired
	RecetaRepository recetaRepository;
	
	public RecetaDTO getRecetaById(int idReceta) {
		Receta receta = recetaRepository.getRecetaById(idReceta);
		RecetaDTO dto = new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getDescripcion(), receta.getInstrucciones(), receta.getUsuario(), receta.getFechaCreacion(), receta.getLikes(), receta.getTipoReceta(), receta.getIngredientes());
		return dto;
	}
	
	public List<RecetaDTO> getRecetas(){
		List<Receta> recetas = recetaRepository.getRecetas();
		List<RecetaDTO> dto = new ArrayList<RecetaDTO>();
		for (Receta receta : recetas) {
			dto.add(new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getDescripcion(), receta.getInstrucciones(), receta.getUsuario(), receta.getFechaCreacion(), receta.getLikes(), receta.getTipoReceta(), receta.getIngredientes()));
		}
		return dto;
	}
	
	public List<RecetaDTO> getRecetasPublicadas(){
		List<Receta> recetas = recetaRepository.getRecetasPublicadas();
		List<RecetaDTO> dto = new ArrayList<RecetaDTO>();
		for (Receta receta : recetas) {
			dto.add(new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getDescripcion(), receta.getInstrucciones(), receta.getUsuario(), receta.getFechaCreacion(), receta.getLikes(), receta.getTipoReceta(), receta.getIngredientes()));
		}
		return dto;
	}
	
	@Transactional
	public void saveReceta(RecetaDTO receta) {
		Receta rec = new Receta(receta.getId(), receta.getTitulo(), receta.getDescripcion(), receta.getInstrucciones(), receta.getUsuario(), receta.getFechaCreacion(), receta.getLikes(), receta.getTipoReceta(), receta.getIngredientes());
		recetaRepository.saveReceta(rec);
		recetaRepository.saveIngredientesReceta(rec.getId(), rec.getIngredientes());
	}
	
	public void updateReceta(RecetaDTO receta) {
		Receta rec = new Receta(receta.getId(), receta.getTitulo(), receta.getDescripcion(), receta.getInstrucciones(), receta.getUsuario(), receta.getFechaCreacion(), receta.getLikes(), receta.getTipoReceta(), receta.getIngredientes());
		recetaRepository.updateReceta(rec);
	}
	
	public void deleteReceta(int idReceta) {
		recetaRepository.deleteReceta(idReceta);
	}
	
	public void publicarReceta(int idReceta) {
		recetaRepository.publicarReceta(idReceta);
	}
	
	public void despublicarReceta(int idReceta) {
		recetaRepository.despublicarReceta(idReceta);
	}
	
	public void saveIngredienteReceta(int idReceta, IngredienteRecetaDTO ingrediente) {
		recetaRepository.saveIngredienteReceta(idReceta, ingrediente);
	}
	
	public void deleteIngredienteReceta(int idReceta, int idIngrediente) {
		recetaRepository.deleteIngredienteReceta(idReceta, idIngrediente);
	}
	
	public void saveLike(String idUsuario, int idReceta) {
		recetaRepository.saveLike(idUsuario, idReceta);
	}
	
	public void deleteLike(String idUsuario, int idReceta) {
		recetaRepository.deleteLike(idUsuario, idReceta);
	}
	
}
