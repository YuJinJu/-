package com.ssafy.vue.model.service;

import java.sql.SQLException;

import com.ssafy.vue.model.MemberDto;

public interface MemberService {

	public MemberDto login(MemberDto memberDto) throws Exception;
	public MemberDto userInfo(String userid) throws Exception;
	public boolean registerMember(MemberDto memberDto) throws SQLException;
	public boolean modifyMember(MemberDto memberDto) throws SQLException;
	public boolean deleteMember(String userid) throws SQLException;
}
