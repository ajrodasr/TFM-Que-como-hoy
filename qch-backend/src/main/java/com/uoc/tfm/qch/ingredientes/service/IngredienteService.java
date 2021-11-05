package com.uoc.tfm.qch.ingredientes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uoc.tfm.qch.ingredientes.domain.Ingrediente;

@Service
@Transactional
public class IngredienteService {
	
	@Autowired
	IngredienteRepository ingredienteRepository;
	
	public List<Ingrediente> getIngredientes(){
		return ingredienteRepository.getIngredientes();
	}
	
	
}
