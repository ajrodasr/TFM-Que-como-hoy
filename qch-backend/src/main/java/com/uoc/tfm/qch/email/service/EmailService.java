package com.uoc.tfm.qch.email.service;

import java.io.File;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.uoc.tfm.qch.email.dto.EmailDTO;

@Service
public class EmailService {
	
	@Autowired
	JavaMailSender javaMailSender;
	
	@Autowired
	TemplateEngine templateEngine;
	
	@Value("${spring.mail.username}")
	private String mailFrom;
	
	public void sendEmail(EmailDTO dto) {
		MimeMessage message = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			helper.setFrom(mailFrom);
			helper.setTo(dto.getMailTo());
			helper.setSubject(dto.getSubject());
			helper.setText(dto.getText(), true);
			
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void sendEmailTemplate(EmailDTO dto, Map<String, Object> model, String template) throws Exception {
		
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		Context context = new Context();
		context.setVariables(model);
		String htmlText = templateEngine.process(template, context);
		helper.setFrom(mailFrom);
		helper.setTo(dto.getMailTo());
		helper.setSubject(dto.getSubject());
		helper.setText(htmlText, true);
		FileSystemResource res = new FileSystemResource(new File("src/main/resources/static/images/default.jpg"));
		helper.addInline("logo", res);
		
		javaMailSender.send(message);
		
	}
}
