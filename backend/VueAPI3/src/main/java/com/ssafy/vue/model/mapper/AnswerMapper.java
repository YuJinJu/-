package com.ssafy.vue.model.mapper;

import java.util.List;

import com.ssafy.vue.model.AnswerDto;

public interface AnswerMapper {

	List<AnswerDto> list(String qno);

	int create(AnswerDto answerDto);

	int modify(AnswerDto answerDto);

	int delete(int answerNo);
	
}
