package com.uoc.tfm.qch.ingredientes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uoc.tfm.qch.ingredientes.domain.Ingrediente;
import com.uoc.tfm.qch.ingredientes.service.IngredienteService;

@RestController
@RequestMapping("/auth/ingredientes")
@CrossOrigin
public class IngredienteController {

	@Autowired
	IngredienteService ingredienteService;
	
	@GetMapping("/lista")
	public List<Ingrediente> getIngredientes() {
		return ingredienteService.getIngredientes();
	}
}
