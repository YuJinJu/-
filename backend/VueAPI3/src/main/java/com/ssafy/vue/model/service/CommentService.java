package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.vue.model.CommentDto;

public interface CommentService {

	List<CommentDto> list(String ano);

	boolean create(CommentDto commentDto);

	boolean modify(CommentDto commentDto);

	boolean delete(int commentNo);
	
}
