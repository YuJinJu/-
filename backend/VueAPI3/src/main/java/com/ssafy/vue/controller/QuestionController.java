package com.ssafy.vue.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.vue.model.QuestionDto;
import com.ssafy.vue.model.QuestionParameterDto;
import com.ssafy.vue.model.service.QuestionService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

//http://localhost:9999/vue/swagger-ui.html
//@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.POST} , maxAge = 6000)
@RestController
@RequestMapping("/question")
@Api("QnA 컨트롤러  API V1")
public class QuestionController {

	private static final Logger logger = LoggerFactory.getLogger(QuestionController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private QuestionService questionService;

	@ApiOperation(value = "QnA 글작성", notes = "새로운 QnA 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping
	public ResponseEntity<String> writeQuestion(@RequestBody @ApiParam(value = "QnA 정보.", required = true) QuestionDto questionDto) throws Exception {
		logger.info("writeQuestion - 호출");
		if (questionService.writeQuestion(questionDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "QnA 글목록", notes = "모든 QnA의 정보를 반환한다.", response = List.class)
	@GetMapping
	public ResponseEntity<List<QuestionDto>> listQuestion(@ApiParam(value = "QnA을 얻기위한 부가정보.", required = true) QuestionParameterDto questionParameterDto) throws Exception {
		logger.info("listQuestion - 호출");
		return new ResponseEntity<List<QuestionDto>>(questionService.listQuestion(questionParameterDto), HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 글보기", notes = "글번호에 해당하는 QnA의 정보를 반환한다.", response = QuestionDto.class)
	@GetMapping("/{qno}")
	public ResponseEntity<QuestionDto> getQuestion(@PathVariable("qno") @ApiParam(value = "얻어올 글의 글번호.", required = true) int qno) throws Exception {
		logger.info("getQuestion - 호출 : " + qno);
		questionService.updateHit(qno);
		return new ResponseEntity<QuestionDto>(questionService.getQuestion(qno), HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 글수정", notes = "새로운 QnA 정보를 입력한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PutMapping
	public ResponseEntity<String> modifyQuestion(@RequestBody @ApiParam(value = "수정할 글정보.", required = true) QuestionDto questionDto) throws Exception {
		logger.info("modifyQuestion - 호출");
		
		if (questionService.modifyQuestion(questionDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 글삭제", notes = "글번호에 해당하는 QnA의 정보를 삭제한다. 그리고 DB삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/{qno}")
	public ResponseEntity<String> deleteQuestion(@PathVariable("qno") @ApiParam(value = "살제할 글의 글번호.", required = true) int qno) throws Exception {
		logger.info("deleteQuestion - 호출");
		if (questionService.deleteQuestion(qno)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
}