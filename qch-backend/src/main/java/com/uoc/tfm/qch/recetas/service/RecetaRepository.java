package com.uoc.tfm.qch.recetas.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.github.pagehelper.Page;
import com.uoc.tfm.qch.recetas.domain.Receta;
import com.uoc.tfm.qch.recetas.domain.TipoReceta;
import com.uoc.tfm.qch.recetas.dto.IngredienteRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaConsumidaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaFiltradaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaHistoricoDTO;
import com.uoc.tfm.qch.recetas.dto.UsuarioRecetaDTO;

@Mapper
public interface RecetaRepository {
	Receta getRecetaById(int idReceta);
	List<Receta> getRecetas();
	List<Receta> getRecetasPublicadas();
	Page<RecetaFiltradaDTO> getRecetasFiltradas(
			String tituloReceta, 
			Integer tipoReceta,
			String idUsuario,
			String dificultad,
			Integer comensales,
			Integer tiempo,
			List<Integer> ingredientes,
			Integer orderBy,
			Boolean desc);
	Page<RecetaHistoricoDTO> getHistoricoRecetas(String idUsuario);
	List<RecetaFiltradaDTO> getRecetasMasConsumidasUsuario(String idUsuario);
	List<Receta> getRecetasByTipo(int idTipoReceta);
	List<Receta> getRecetasByUsuario(String idUsuario);
	void saveReceta(Receta receta);
	void saveRecetaConsumida(RecetaConsumidaDTO recetaConsumida);
	void publicarReceta(int idReceta);
	void despublicarReceta(int idReceta);
	void updateReceta(Receta receta);
	void deleteReceta(int idReceta);
	
	List<IngredienteRecetaDTO> getIngredientesReceta(int idReceta);
	void saveIngredientesReceta(int idReceta, List<IngredienteRecetaDTO> ingredientes);
	void saveIngredienteReceta(int idReceta, IngredienteRecetaDTO ingrediente);
	void deleteIngredienteReceta(int idReceta, int idIngrediente);
	
	List<UsuarioRecetaDTO> getUsuariosRecetasFilter(String term);
	
	int getLikesByIdReceta(int idReceta);
	List<Integer> getLikesByUsuario(String idUsuario);
	void saveLike(String idUsuario, int idReceta);
	void deleteLike(String idUsuario, int idReceta);
	
	List<TipoReceta> getTiposReceta();
}
