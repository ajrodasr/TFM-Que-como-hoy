package com.uoc.tfm.qch.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uoc.tfm.qch.security.domain.Rol;

@Service
@Transactional
public class RolService {
	
	@Autowired
	RolRepository rolRepository;
	
	
	public Rol getRolByNombre(String rolNombre) {
		return rolRepository.getRolByNombre(rolNombre);
	}
}
