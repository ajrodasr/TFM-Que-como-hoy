package com.uoc.tfm.qch.security.service;

import org.apache.ibatis.annotations.Mapper;

import com.uoc.tfm.qch.security.domain.Rol;

@Mapper
public interface RolRepository {
	Rol getRolByNombre(String rolNombre);
}
