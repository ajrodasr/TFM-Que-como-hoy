package com.uoc.tfm.qch.ingredientes.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.uoc.tfm.qch.ingredientes.domain.GrupoIngrediente;
import com.uoc.tfm.qch.ingredientes.domain.Ingrediente;

@Mapper
public interface IngredienteRepository {
	Ingrediente getIngredienteById(int idIngrediente);
	List<Ingrediente> getIngredientes();
	List<Ingrediente> getIngredientesByGrupo(int idGrupo);
	void saveIngrediente(Ingrediente ingrediente);
	void updateIngrediente(Ingrediente ingrediente);
	
	GrupoIngrediente getGrupoIngredienteById(int idGrupoIngrediente);
	void saveGrupoIngrediente(GrupoIngrediente grupoIngrediente);
	void updateGrupoIngrediente(Ingrediente grupoIngrediente);
}
