package com.ssafy.vue.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "CommentDto : 답변정보", description = "답변의 상세 정보를 나타낸다.")
public class CommentDto {
	
	@ApiModelProperty(value = "댓글번호")
	private int cno;
	@ApiModelProperty(value = "작성자 아이디")
	private String userid;
	@ApiModelProperty(value = "댓글내용")
	private String comment;
	@ApiModelProperty(value = "작성일")
	private String comment_time;
	@ApiModelProperty(value = "답변번호")
	private int ano;
	public int getCno() {
		return cno;
	}
	public void setCno(int cno) {
		this.cno = cno;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getComment_time() {
		return comment_time;
	}
	public void setComment_time(String comment_time) {
		this.comment_time = comment_time;
	}
	public int getAno() {
		return ano;
	}
	public void setAno(int ano) {
		this.ano = ano;
	}
	@Override
	public String toString() {
		return "CommentDto [cno=" + cno + ", userid=" + userid + ", comment=" + comment + ", comment_time="
				+ comment_time + ", ano=" + ano + "]";
	}
	


}