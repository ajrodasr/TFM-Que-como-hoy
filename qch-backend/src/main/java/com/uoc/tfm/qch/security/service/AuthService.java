package com.uoc.tfm.qch.security.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	String urlFront = "http://localhost:4200/";
	String emailPasswordTemplate = "email/email-password";
	String urlCambiarPasswordFront = "cambiar-password/";
	
	public void enviarEmailBienvenida(String correoElectronico) {
		EmailDTO email = new EmailDTO();
		email.setMailTo(correoElectronico);
		email.setSubject("Bienvenido");
		email.setText("Le damos la bienvenida a la plataforma");
		
		emailService.sendEmail(email);
	}
	
	public void enviarEmailPassword(EmailPasswordDTO dto) {
		EmailDTO email = new EmailDTO();
		email.setMailTo(dto.getEmail());
		email.setSubject("Cambio de contraseña");
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("idUsuario", dto.getIdUsuario());
		model.put("url", urlFront + urlCambiarPasswordFront + dto.getTokenPassword());
		
		emailService.sendEmailTemplate(email, model, emailPasswordTemplate);
	}
	
}
