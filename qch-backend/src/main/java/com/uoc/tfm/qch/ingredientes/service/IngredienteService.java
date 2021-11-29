package com.uoc.tfm.qch.ingredientes.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uoc.tfm.qch.ingredientes.domain.GrupoIngrediente;
import com.uoc.tfm.qch.ingredientes.domain.Ingrediente;
import com.uoc.tfm.qch.ingredientes.dto.IngredienteDTO;

@Service
@Transactional
public class IngredienteService {
	
	@Autowired
	IngredienteRepository ingredienteRepository;
	
	public List<IngredienteDTO> getIngredientes(){
		List<Ingrediente> ing = ingredienteRepository.getIngredientes();
		List<IngredienteDTO> ingredientes = new ArrayList<IngredienteDTO>();
		if(!ing.isEmpty()) {
			for (Ingrediente ingrediente : ing) {
				ingredientes.add(new IngredienteDTO(ingrediente.getId(), ingrediente.getNombre(), ingrediente.getGrupo()));
			}
		}
		return ingredientes;
	}
	
	public IngredienteDTO getIngredienteById(int idIngrediente) {
		Ingrediente ing = ingredienteRepository.getIngredienteById(idIngrediente);
		IngredienteDTO ingrediente = null;
		if(ing != null) {
			ingrediente = new IngredienteDTO(ing.getId(), ing.getNombre(), ing.getGrupo());
		}
		return ingrediente;
	}
	
	public List<IngredienteDTO> getIngredientesFilterNombre(String term){
		List<Ingrediente> ing = ingredienteRepository.getIngredientesFilterNombre(term);
		List<IngredienteDTO> ingredientes = new ArrayList<IngredienteDTO>();
		if(!ing.isEmpty()) {
			for (Ingrediente ingrediente : ing) {
				ingredientes.add(new IngredienteDTO(ingrediente.getId(), ingrediente.getNombre(), ingrediente.getGrupo()));
			}
		}
		return ingredientes;
	}
	
	public List<IngredienteDTO> getIngredientesByGrupo(int idGrupo){
		List<Ingrediente> ing = ingredienteRepository.getIngredientesByGrupo(idGrupo);
		List<IngredienteDTO> ingredientes = new ArrayList<IngredienteDTO>();
		if(!ing.isEmpty()) {
			for (Ingrediente ingrediente : ing) {
				ingredientes.add(new IngredienteDTO(ingrediente.getId(), ingrediente.getNombre(), ingrediente.getGrupo()));
			}
		}
		return ingredientes;
	}
	
	public List<GrupoIngrediente> getGrupos(){
		return ingredienteRepository.getGrupos();
	}
	
	public void saveIngrediente (IngredienteDTO ingrediente) {
		Ingrediente ing = new Ingrediente(-1, ingrediente.getNombre(), ingrediente.getGrupo());
		ingredienteRepository.saveIngrediente(ing);
	}
	
	public void updateIngrediente (IngredienteDTO ingrediente) {
		Ingrediente ing = ingredienteRepository.getIngredienteById(ingrediente.getId());
		ing.setNombre(ingrediente.getNombre());
		ing.setGrupo(ingrediente.getGrupo());
		ingredienteRepository.updateIngrediente(ing);
	}
	
	public IngredienteDTO getIngredienteByNombre(String nombreIngrediente) {
		Ingrediente ing = ingredienteRepository.getIngredienteByNombre(nombreIngrediente);
		IngredienteDTO ingrediente = null;
		if(ing != null) {
			ingrediente = new IngredienteDTO(ing.getId(), ing.getNombre(), ing.getGrupo());
		}
		return ingrediente;
	}
	
	public boolean existsIngredienteByNombre(String nombreIngrediente) {
		Ingrediente ingrediente = ingredienteRepository.getIngredienteByNombre(nombreIngrediente);
		return ingrediente != null;
	}
	
	public boolean existsIngredienteById(int idIngrediente) {
		Ingrediente ingrediente = ingredienteRepository.getIngredienteById(idIngrediente);
		return ingrediente != null;
	}
	
}
