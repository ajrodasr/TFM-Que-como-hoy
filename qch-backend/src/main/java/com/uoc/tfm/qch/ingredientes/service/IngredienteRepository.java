package com.uoc.tfm.qch.ingredientes.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.github.pagehelper.Page;
import com.uoc.tfm.qch.ingredientes.domain.GrupoIngrediente;
import com.uoc.tfm.qch.ingredientes.domain.Ingrediente;
import com.uoc.tfm.qch.ingredientes.dto.GrupoIngredienteConsumidoDTO;
import com.uoc.tfm.qch.ingredientes.dto.IngredienteDTO;

@Mapper
public interface IngredienteRepository {
	Ingrediente getIngredienteById(int idIngrediente);
	Ingrediente getIngredienteByNombre(String ingredienteNombre);
	List<Ingrediente> getIngredientesFilterNombre(String term);
	Page<IngredienteDTO> getIngredientesFiltrados(Integer idGrupo, String term);
	List<Ingrediente> getIngredientesByGrupo(int idGrupo);
	List<Ingrediente> getIngredientesMasUsadosUsuario(String idUsuario);
	void saveIngrediente(Ingrediente ingrediente);
	void updateIngrediente(Ingrediente ingrediente);
	
	List<GrupoIngrediente> getGrupos();
	GrupoIngrediente getGrupoIngredienteById(int idGrupoIngrediente);
	List<GrupoIngredienteConsumidoDTO> getGruposConsumidos(String idUsuario);
}
