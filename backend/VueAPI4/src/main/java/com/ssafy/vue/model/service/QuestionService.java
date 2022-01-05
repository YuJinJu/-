package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.util.PageNavigation;
import com.ssafy.vue.model.QuestionDto;
import com.ssafy.vue.model.QuestionParameterDto;

public interface QuestionService {
	public boolean writeQuestion(QuestionDto questionDto) throws Exception;
	public List<QuestionDto> listQuestion(QuestionParameterDto questionParameterDto) throws Exception;
	public PageNavigation makePageNavigation(QuestionParameterDto questionParameterDto) throws Exception;
	
	public QuestionDto getQuestion(int qno) throws Exception;
	public void updateHit(int qno) throws Exception;
	public boolean modifyQuestion(QuestionDto questionDto) throws Exception;
	public boolean deleteQuestion(int qno) throws Exception;
}
