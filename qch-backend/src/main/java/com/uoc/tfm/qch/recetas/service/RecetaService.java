package com.uoc.tfm.qch.recetas.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.github.pagehelper.Page;
import com.uoc.tfm.qch.recetas.domain.Receta;
import com.uoc.tfm.qch.recetas.domain.TipoReceta;
import com.uoc.tfm.qch.recetas.dto.IngredienteRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.LikeRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaConsumidaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaFiltradaDTO;
import com.uoc.tfm.qch.recetas.dto.RecetaHistoricoDTO;
import com.uoc.tfm.qch.recetas.dto.TipoRecetaDTO;
import com.uoc.tfm.qch.recetas.dto.UsuarioRecetaDTO;

@Service
@Transactional
public class RecetaService {
	
	@Autowired
	RecetaRepository recetaRepository;
	
	@Autowired
	Cloudinary cloudinary;
	
	public RecetaDTO getRecetaById(int idReceta) {
		Receta receta = recetaRepository.getRecetaById(idReceta);
		RecetaDTO dto = new RecetaDTO(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes(), receta.isPublicada());
		return dto;
	}
	
	public Page<RecetaFiltradaDTO> getRecetasByUsuario(String tituloReceta, 
			Integer tipoReceta,
			String idCreador,
			String dificultad,
			Integer comensales,
			Integer tiempo,
			List<Integer> ingredientes,
			Integer order,
			Boolean desc){
		return recetaRepository.getRecetasByUsuario(tituloReceta, tipoReceta, idCreador, dificultad, comensales, tiempo, ingredientes, order, desc);
	}
	
	public Page<RecetaFiltradaDTO> getRecetasPublicadasPaginadas(
			String tituloReceta, 
			Integer tipoReceta,
			String idCreador,
			String dificultad,
			Integer comensales,
			Integer tiempo,
			List<Integer> ingredientes,
			Integer order,
			Boolean desc){
		return recetaRepository.getRecetasFiltradas(tituloReceta, tipoReceta, idCreador, dificultad, comensales, tiempo, ingredientes, order, desc);
	}
	
	public Page<RecetaFiltradaDTO> getRecetasRecomendadasPaginadas(
			String idUsuario,
			String tituloReceta, 
			Integer tipoReceta,
			String idCreador,
			String dificultad,
			Integer comensales,
			Integer tiempo,
			List<Integer> ingredientes,
			Integer order,
			Boolean desc){
		return recetaRepository.getRecetasRecomendadas(idUsuario, tituloReceta, tipoReceta, idCreador, dificultad, comensales, tiempo, ingredientes, order, desc);
	}
	
	public Page<RecetaHistoricoDTO> getHistoricoRecetas(String idUsuario){
		return recetaRepository.getHistoricoRecetas(idUsuario);
	}
	
	public List<RecetaFiltradaDTO> getRecetasMasConsumidasUsuario(String idUsuario){
		return recetaRepository.getRecetasMasConsumidasUsuario(idUsuario);
	}
	
	public List<UsuarioRecetaDTO> getUsuariosRecetasFilter(String term){
		return recetaRepository.getUsuariosRecetasFilter(term);
	}
	
	public void saveRecetaConsumida(RecetaConsumidaDTO recetaConsumida) {
		recetaRepository.saveRecetaConsumida(recetaConsumida);
	}
	
	public void updateRecetaConsumida(RecetaConsumidaDTO recetaConsumida, String nuevaFecha) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
		LocalDateTime date = LocalDateTime.parse(nuevaFecha, formatter);
		recetaRepository.updateRecetaConsumida(recetaConsumida, date);
	}
	
	public void deleteRecetaConsumida(RecetaConsumidaDTO recetaConsumida) {
		recetaRepository.deleteRecetaConsumida(recetaConsumida);
	}
	
	@Transactional
	public void saveReceta(RecetaDTO receta) throws Exception {
		Receta rec = new Receta(receta.getId(), receta.getTitulo(), receta.getImagen(), receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(),receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes(), receta.isPublicada());
		recetaRepository.saveReceta(rec);
		if(!rec.getIngredientes().isEmpty()) {
			recetaRepository.saveIngredientesReceta(rec.getId(), rec.getIngredientes());
		}
	}
	
	public void updateReceta(RecetaDTO receta) throws IOException {
		Receta recBD = recetaRepository.getRecetaById(receta.getId());
		String publicId = recBD.getImagen(); 
		if(receta.getImagen() != null) {
			cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
			publicId = receta.getImagen();
		}
		
		
		Receta rec = new Receta(receta.getId(), receta.getTitulo(), publicId, receta.getInstrucciones(), receta.getFechaCreacion(), receta.getTiempo(), receta.getComensales(), receta.getDificultad(), receta.getLikes(), receta.getUsuario(), receta.getTipoReceta(),receta.getIngredientes(), receta.isPublicada());
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
	
	public List<Integer> getLikesByUsuario(String idUsuario){
		return recetaRepository.getLikesByUsuario(idUsuario);
	}
	
	public void saveLike(LikeRecetaDTO like) {
		recetaRepository.saveLike(like.getIdUsuario(), like.getIdReceta());
	}
	
	public void deleteLike(LikeRecetaDTO like) {
		recetaRepository.deleteLike(like.getIdUsuario(), like.getIdReceta());
	}
	
	public List<TipoRecetaDTO> getTiposReceta(){
		List<TipoReceta> tiposReceta = recetaRepository.getTiposReceta();
		List<TipoRecetaDTO> tipos = new ArrayList<TipoRecetaDTO>();
		for (TipoReceta tipoReceta : tiposReceta) {
			tipos.add(new TipoRecetaDTO(tipoReceta));
		}
		return tipos;
	}
	
}
