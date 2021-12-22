package com.uoc.tfm.qch.security.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uoc.tfm.qch.email.dto.EmailDTO;
import com.uoc.tfm.qch.email.service.EmailService;
import com.uoc.tfm.qch.security.dto.EmailPasswordDTO;

@Service
@Transactional
public class AuthService {
	
	@Autowired
	EmailService emailService;
	
	@Value("${url.frontend}")
	private String urlFront;
	
	String emailBienvenidaTemplate = "email/email-bienvenida";
	String emailPasswordTemplate = "email/email-password";
	String urlCambiarPasswordFront = "cambiar-password/";
	
	public void enviarEmailBienvenida(String correoElectronico) throws Exception {
		EmailDTO email = new EmailDTO();
		email.setMailTo(correoElectronico);
		email.setSubject("Mensaje bienvenida a QCH");
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("url", urlFront);
		
		emailService.sendEmailTemplate(email, model, emailBienvenidaTemplate);
	}
	
	public void enviarEmailPassword(EmailPasswordDTO dto) throws Exception {
		EmailDTO email = new EmailDTO();
		email.setMailTo(dto.getEmail());
		email.setSubject("Cambio de contraseña");
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("idUsuario", dto.getIdUsuario());
		model.put("url", urlFront + urlCambiarPasswordFront + dto.getTokenPassword());
		
		emailService.sendEmailTemplate(email, model, emailPasswordTemplate);
	}
	
}
