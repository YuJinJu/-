package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.SidoGugunCodeDto;


public interface HappyHouseMapService {

	List<SidoGugunCodeDto> getSido() throws SQLException;
	
	List<SidoGugunCodeDto> getGugunInSido(String sido) throws SQLException;
	
	List<HouseInfoDto> getDongInGugun(String gugun) throws SQLException; 
	
	List<HouseInfoDto> getAptInDong(String dong) throws SQLException;
}
