package com.uoc.tfm.qch.recetas.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.uoc.tfm.qch.recetas.domain.Receta;
import com.uoc.tfm.qch.recetas.dto.IngredienteRecetaDTO;

@Mapper
public interface RecetaRepository {
	Receta getRecetaById(int idReceta);
	List<Receta> getRecetas();
	List<Receta> getRecetasPublicadas();
	List<Receta> getRecetasByTipo(int idTipoReceta);
	void saveReceta(Receta receta);
	void publicarReceta(int idReceta);
	void despublicarReceta(int idReceta);
	void updateReceta(Receta receta);
	void deleteReceta(int idReceta);
	
	List<IngredienteRecetaDTO> getIngredientesReceta(int idReceta);
	void saveIngredientesReceta(int idReceta, List<IngredienteRecetaDTO> ingredientes);
	void saveIngredienteReceta(int idReceta, IngredienteRecetaDTO ingrediente);
	void deleteIngredienteReceta(int idReceta, int idIngrediente);
	
	int getLikesByIdReceta(int idReceta);
	List<Integer> getLikesByUsuario(String idUsuario);
	void saveLike(String idUsuario, int idReceta);
	void deleteLike(String idUsuario, int idReceta);
}
