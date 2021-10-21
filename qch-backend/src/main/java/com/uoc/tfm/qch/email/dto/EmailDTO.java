package com.uoc.tfm.qch.email.dto;

public class EmailDTO {
	
	private String mailFrom;
	private String mailTo;
	private String subject;
	private String text;
	
	public EmailDTO() {}
	
	public EmailDTO(String mailForm, String mailTo, String subject, String text) {
		this.mailFrom = mailForm;
		this.mailTo = mailTo;
		this.subject = subject;
		this.text = text;
	}
	
	public String getMailFrom() {
		return mailFrom;
	}
	public void setMailFrom(String mailFrom) {
		this.mailFrom = mailFrom;
	}
	public String getMailTo() {
		return mailTo;
	}
	public void setMailTo(String mailTo) {
		this.mailTo = mailTo;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
}
