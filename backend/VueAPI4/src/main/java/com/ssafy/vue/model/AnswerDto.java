package com.ssafy.vue.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "AnswerDto : 답변정보", description = "답변의 상세 정보를 나타낸다.")
public class AnswerDto {
	
	@ApiModelProperty(value = "답변번호")
	private int ano;
	@ApiModelProperty(value = "작성자 아이디")
	private String userid;
	@ApiModelProperty(value = "답변내용")
	private String answer;
	@ApiModelProperty(value = "작성일")
	private String answertime;
	@ApiModelProperty(value = "질문번호")
	private int qno;
	public int getAno() {
		return ano;
	}
	public void setAno(int ano) {
		this.ano = ano;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getAnswertime() {
		return answertime;
	}
	public void setAnswertime(String answertime) {
		this.answertime = answertime;
	}
	public int getQno() {
		return qno;
	}
	public void setQno(int qno) {
		this.qno = qno;
	}
	@Override
	public String toString() {
		return "AnswerDto [ano=" + ano + ", userid=" + userid + ", answer=" + answer + ", answertime=" + answertime
				+ ", qno=" + qno + "]";
	}



}