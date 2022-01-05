package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.vue.model.AnswerDto;

public interface AnswerService {

	List<AnswerDto> list(String qno);

	boolean create(AnswerDto answerDto);

	boolean modify(AnswerDto answerDto);

	boolean delete(int answerNo);
	
}
