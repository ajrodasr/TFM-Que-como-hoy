package com.uoc.tfm.qch.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@Configuration
public class TemplateConfig {
	
	@Bean
	public ClassLoaderTemplateResolver templateResolver() {
		ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
		resolver.setPrefix("templates/");
		resolver.setSuffix(".html");
		resolver.setTemplateMode(TemplateMode.HTML);
		resolver.setCharacterEncoding("UTF-8");
		resolver.setOrder(1);
		resolver.setCheckExistence(true);
		
		return resolver;
	}
	
	@Autowired
	protected void configureThymeleafSpringTemplateEngine(SpringTemplateEngine templateEngine) {
		templateEngine.setEnableSpringELCompiler(true);
		ClassLoaderTemplateResolver classLoaderTemplateResolver = new ClassLoaderTemplateResolver();
		classLoaderTemplateResolver.setPrefix("static/frontend/");
		classLoaderTemplateResolver.setCacheable(false);
		classLoaderTemplateResolver.setSuffix(".html");
		classLoaderTemplateResolver.setTemplateMode("HTML5");
		templateEngine.addTemplateResolver(classLoaderTemplateResolver);
	}
	
}
