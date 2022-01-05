package com.ssafy.vue.model.service;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.MemberDto;
import com.ssafy.vue.model.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {

   @Autowired
   private SqlSession sqlSession;
   
   SecurityAlgorithm sc = new SecurityAlgorithm();
   
   @Override
   public MemberDto login(MemberDto memberDto) throws Exception {
      if(memberDto.getUserid() == null || memberDto.getUserpwd() == null)
         return null;
      String hash = sc.createHash(memberDto.getUserpwd());
      //System.out.println("로그인 패스워드 머임 "+memberDto.getUserpwd());
      memberDto.setUserpwd(hash);
      return sqlSession.getMapper(MemberMapper.class).login(memberDto);
   }

   @Override
   public MemberDto userInfo(String userid) throws Exception {
      return sqlSession.getMapper(MemberMapper.class).userInfo(userid);
   }

   @Override
   public boolean registerMember(MemberDto memberDto) throws SQLException {
      String hash = sc.createHash(memberDto.getUserpwd());
      System.out.println("암호화된 비밀번호 : "+hash);
      //System.out.println("평문화 : "+sc.createHash(hash));
      memberDto.setUserpwd(hash);
      return sqlSession.getMapper(MemberMapper.class).registerMember(memberDto) == 1;
   }

   @Override
   public boolean modifyMember(MemberDto memberDto) throws SQLException {
      return sqlSession.getMapper(MemberMapper.class).modifyMember(memberDto) == 1;
   }

   @Override
   public boolean deleteMember(String userid) throws SQLException {
      return sqlSession.getMapper(MemberMapper.class).deleteMember(userid) == 1;
   }

}