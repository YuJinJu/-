package com.ssafy.vue.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "BoardCommentDto : 게시판 답변정보", description = "게시판 답변의 상세 정보를 나타낸다.")
public class BoardCommentDto {
	
	@ApiModelProperty(value = "댓글번호")
	private int commentno;
	@ApiModelProperty(value = "작성자 이름")
	private String userid;
	@ApiModelProperty(value = "댓글내용")
	private String comment;
	@ApiModelProperty(value = "작성일")
	private String comment_time;
	@ApiModelProperty(value = "답변번호")
	private int articleno;
	
	
	public int getCommentno() {
		return commentno;
	}


	public void setCommentno(int commentno) {
		this.commentno = commentno;
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


	public int getArticleno() {
		return articleno;
	}


	public void setArticleno(int articleno) {
		this.articleno = articleno;
	}


	@Override
	public String toString() {
		return "BoardCommentDto [commentno=" + commentno + ", userid=" + userid + ", comment=" + comment + ", comment_time="
				+ comment_time + ", articleno=" + articleno + "]";
	}
	
}